# 04 — Shopify Architecture

Les cinq décisions à trancher **avant** d'écrire une ligne de code. Se tromper ici coûte une reconstruction complète ; les autres erreurs se corrigent.

> Vérifie chaque type de réglage et chaque objet Liquid avec le Dev MCP avant de l'écrire. C'est le terrain où un modèle invente des choses plausibles qui n'existent pas.

---

# Décision 1 — Section, theme block, ou snippet ?

```
Le marchand doit-il pouvoir l'ajouter / le déplacer dans l'éditeur ?
├─ NON → SNIPPET          fragment appelé par {% render %}
└─ OUI
   ├─ Module autonome de page, occupe une zone entière → SECTION
   └─ Élément vivant À L'INTÉRIEUR d'une section, réutilisable
      dans plusieurs sections → THEME BLOCK (dossier blocks/)
```

## Ce qui a changé, et que beaucoup de tutoriels ignorent

Il existe désormais **deux natures de blocks** :

| | **Block local** | **Theme block** |
|---|---|---|
| Où il est défini | Dans l'attribut `blocks` du schéma d'une section | Fichier propre dans `blocks/` |
| Réutilisable ailleurs | ❌ Non | ✅ Dans n'importe quelle section |
| Rendu | Boucle `{% for block in section.blocks %}` | `{% content_for 'blocks' %}` |
| Imbrication | ❌ | ✅ jusqu'à 8 niveaux (hors niveau section) |
| Peut définir ses propres blocks locaux | — | ❌ **Non** — il ne peut que référencer `@theme`, `@app`, ou des types précis |

Une section, elle, **peut** définir des blocks locaux dans son schéma. C'est la contrainte structurante de toute architecture de composant complexe.

## Accepter les theme blocks et les app blocks

```liquid
{%- comment -%} sections/custom-section.liquid {%- endcomment -%}
<div class="custom-section color-{{ section.settings.color_scheme }}">
  {% content_for 'blocks' %}
</div>

{% schema %}
{
  "name": "Section sur mesure",
  "blocks": [{ "type": "@theme" }, { "type": "@app" }],
  "settings": [
    { "type": "color_scheme", "id": "color_scheme", "label": "Palette", "default": "scheme-1" }
  ],
  "presets": [{ "name": "Section sur mesure" }]
}
{% endschema %}
```

- `"@theme"` : accepte tous les theme blocks du dossier `blocks/`
- `"@app"` : accepte les app blocks, permettant aux applications d'insérer du contenu sans éditer le thème
- Pour restreindre, référence des types précis : `"blocks": [{"type": "@app"}, {"type": "slide"}]`

**Deux règles à connaître :**
- `"@app"` **n'accepte pas** le paramètre `limit` — l'inclure produit une erreur
- Les app blocks ne sont **pas supportés dans les sections rendues statiquement**

## Theme block imbriquant d'autres blocks

```liquid
{%- comment -%} blocks/slide.liquid {%- endcomment -%}
<div class="slide" {{ block.shopify_attributes }}>
  {% content_for 'blocks' %}
</div>

{% schema %}
{
  "name": "Diapositive",
  "blocks": [{ "type": "@app" }, { "type": "@theme" }]
}
{% endschema %}
```

Chaque bloc enfant est rendu par `{% content_for 'blocks' %}`, dans l'ordre enregistré dans le template JSON.

## Quand choisir quoi — cas concrets

| Besoin | Choix | Pourquoi |
|---|---|---|
| Barre de réassurance sous le prix | Section avec blocks locaux | Autonome, contenu structuré |
| Carte de bénéfice réutilisable dans 4 sections | **Theme block** | Écrit une fois, utilisé partout |
| Formatage d'un prix avec badge promo | **Snippet** | Fragment technique, invisible pour le marchand |
| FAQ produit | Section + blocks | Le marchand ajoute des questions |
| Bloc « texte riche » utilisable partout | **Theme block** | La brique de base d'un thème moderne |
| Icône SVG | Snippet | Aucune raison d'être éditable |

---

# Décision 2 — Où vivent les données ?

| Le contenu… | Emplacement | Pourquoi |
|---|---|---|
| est identique partout | **Réglages de section** | Le plus simple, le plus rapide |
| diffère par produit | **Metafield produit** | Un composant, N contenus |
| diffère par variante | **Metafield variante** | Lecture sur `variant`, pas `product` |
| est une entité réutilisable (matière, label, certification) | **Metaobject** | Modifiable en un endroit, référencé partout |
| est structurel et composé par le marchand | **Blocks** | Le marchand compose lui-même |

## Le piège des sources dynamiques

Pour qu'un marchand puisse connecter un metafield à un réglage depuis l'éditeur, **le type du réglage doit être compatible avec le type du metafield**. Un metafield `rich_text` ne se connecte pas à un réglage `text`.

Vérifie l'appariement **avant** de figer le schéma. Sinon le client ne pourra rien connecter, et tu reprendras tout.

```liquid
{%- comment -%} Lecture défensive d'un metafield {%- endcomment -%}
{%- assign care = product.metafields.custom.care -%}
{%- if care != blank -%}
  <div class="product-care">{{ care.value }}</div>
{%- endif -%}
```

Deux erreurs classiques : afficher l'objet metafield au lieu de `.value` (produit `[object Object]` sur certains types), et oublier la garde `{% if %}` — la zone reste alors vide et bancale sur tous les produits où la donnée n'a pas été saisie.

## Vérifier la réalité avant de coder

```bash
shopify theme console --url /products/un-produit-qui-a-la-donnee
> {{ product.metafields.custom | json }}

shopify theme console --url /products/un-produit-qui-ne-l-a-pas
> {{ product.metafields.custom.care | json }}
```

Trente secondes qui évitent une demi-journée. Tu **vois** la structure au lieu de la supposer.

## Metaobjects — quand ils valent la peine

Une définition de metaobject « Certification » avec nom, icône et description, référencée par les produits concernés : le marchand modifie la description une fois, elle change partout. C'est le bon choix dès qu'une même entité apparaît sur plusieurs produits.

Coût : la mise en place demande du temps, et il faut documenter la saisie pour le marchand. À chiffrer explicitement.

---

# Décision 3 — Blocks ou pas ?

**Blocks** si le marchand doit pouvoir en ajouter plusieurs, les réordonner, ou en varier le nombre.
**Réglages simples** si le nombre d'éléments est fixe et connu.

**Limite plateforme : 50 blocks par section.** Abaissable avec `max_blocks`. Les blocks statiques ne comptent pas dans cette limite.

Impose toujours un `max_blocks` réaliste. Un composant conçu pour 3 éléments et rempli de 20 par un marchand enthousiaste finit cassé — et c'est toi qu'on appelle.

---

# Décision 4 — Sur quels templates ?

```json
"enabled_on": { "templates": ["product"] }
```
ou
```json
"disabled_on": { "groups": ["header", "footer"] }
```

`enabled_on` et `disabled_on` **remplacent l'ancien attribut `templates`**. Tu peux utiliser **l'un ou l'autre, jamais les deux** — c'est une erreur bloquante et fréquente.

`enabled_on` doit contenir au moins `templates` ou `groups`. `"templates": ["*"]` signifie tous les templates.

```json
"enabled_on": { "templates": ["*"], "groups": ["footer"] }
```

---

# Décision 5 — Réutilisable ailleurs ?

Si oui, dès la **première** construction :

```
[ ] Aucune couleur en dur → variables CSS ou palette du thème
[ ] Aucun texte en dur → réglages + fichiers de traduction
[ ] Aucun nom de classe lié au client
[ ] Tous les espacements paramétrables
[ ] Aucune dépendance à une classe utilitaire propre au thème
[ ] Aucune supposition sur la structure de la page hôte
[ ] Documentation générique, sans nom de client
```

Surcoût : environ 20 %. Retour : plusieurs centaines de pour cent dès la deuxième vente.

**Le test :** peux-tu déposer ce fichier dans un thème vierge et qu'il fonctionne ? Si non, il n'est pas prêt pour ta bibliothèque.

---

# Le schéma de section — référence

Attributs disponibles : `name`, `tag`, `class`, `limit`, `settings`, `blocks`, `max_blocks`, `presets`, `default`, `locales`, `enabled_on`, `disabled_on`.

```liquid
{% schema %}
{
  "name": "Barre de réassurance",
  "tag": "section",
  "class": "section-trust-bar",
  "max_blocks": 4,
  "settings": [
    { "type": "header", "content": "Mise en page" },
    {
      "type": "select",
      "id": "layout",
      "label": "Disposition mobile",
      "info": "En colonne, chaque élément occupe toute la largeur.",
      "options": [
        { "value": "row", "label": "En ligne (défilement horizontal)" },
        { "value": "column", "label": "En colonne" }
      ],
      "default": "row"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "Marge haute",
      "min": 0, "max": 80, "step": 4, "unit": "px",
      "default": 24
    }
  ],
  "blocks": [
    {
      "type": "trust_item",
      "name": "Élément de réassurance",
      "settings": [
        { "type": "text", "id": "title", "label": "Titre", "default": "Livraison en 48 h" },
        { "type": "text", "id": "text", "label": "Texte", "default": "Expédié depuis la France" },
        { "type": "image_picker", "id": "icon", "label": "Icône" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Barre de réassurance",
      "blocks": [
        { "type": "trust_item" },
        { "type": "trust_item" },
        { "type": "trust_item" }
      ]
    }
  ],
  "enabled_on": { "templates": ["product", "index"] }
}
{% endschema %}
```

## Les six règles absolues du schéma

1. **Un seul `{% schema %}` par fichier**, et uniquement dans `sections/` ou `blocks/`. Le tag ne rend rien et n'interprète pas le Liquid qu'il contiendrait.
2. **Sans `presets`, le marchand ne peut pas ajouter la section.** Elle n'existe que si un développeur la place dans un template JSON. C'est l'une des trois causes les plus fréquentes de « je ne trouve pas la section ».
3. **Chaque réglage a un `default`.** Sans quoi la section paraît cassée dès son ajout.
4. **Les `id` sont définitifs.** Les renommer détruit les valeurs saisies par le marchand.
5. **`enabled_on` XOR `disabled_on`.**
6. **`{{ block.shopify_attributes }}` sur chaque wrapper de bloc**, sinon les blocs ne sont pas sélectionnables dans l'éditeur.

## Les presets pré-remplis

Un `presets` contenant déjà des blocs produit l'effet « ça marche tout de suite » : le marchand ajoute la section et voit immédiatement un résultat exploitable, au lieu d'une zone vide à configurer.

Les presets peuvent aussi imbriquer des theme blocks :

```json
"presets": [
  {
    "name": "Titre et texte",
    "blocks": [
      {
        "type": "group",
        "settings": { "color_scheme": "scheme-3" },
        "blocks": [
          { "type": "text", "settings": { "text": "<h2>Titre</h2>" } },
          { "type": "text", "settings": { "text": "<p>Description.</p>" } }
        ]
      }
    ]
  }
]
```

C'est le détail qui distingue une section professionnelle d'une section fonctionnelle.

---

# Ce que le thème ne peut pas faire

À dire au client **avant** de chiffrer, pas après :

| Besoin | Faisable dans le thème ? |
|---|---|
| Afficher, mettre en forme, filtrer côté navigateur | ✅ |
| Lire produits, variantes, metafields, metaobjects, panier | ✅ |
| Modifier le panier via l'API AJAX | ✅ |
| Calculer une remise personnalisée | ❌ Shopify Functions |
| Modifier le checkout | ❌ Extensions de checkout |
| Écrire une donnée produit depuis la boutique | ❌ App |
| Appeler une API externe avec des identifiants | ❌ App (les clés seraient exposées) |
| Envoyer un e-mail | ❌ App ou Shopify Flow |
| Gérer des abonnements | ❌ App |
| Stocker une saisie visiteur durablement | ❌ App |

Quand la demande tombe dans la colonne droite, dis-le immédiatement et propose l'alternative. Un développeur qui pose cette limite au premier échange gagne en crédibilité ; celui qui la découvre au troisième jour perd la mission et sa réputation.
