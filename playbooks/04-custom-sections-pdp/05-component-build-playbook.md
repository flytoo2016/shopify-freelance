# 05 — Component Build Playbook

Le cœur technique. L'ordre de construction n'est pas un confort : c'est ce qui garantit qu'un composant fonctionne partout et se maintient.

```
SCHEMA → LIQUID (sans JS) → CSS (mobile-first) → JS (amélioration) → A11Y → PERF
```

> Tout Liquid produit passe par `validate_theme` (Dev MCP) puis `shopify theme check --fail-level error`.
> Rappels : pas de parenthèses dans les conditions Liquid, pas d'opérateur ternaire, `{% render %}` a un scope isolé, une boucle `for` s'arrête à 50 itérations sans `{% paginate %}`.

---

# 1. Le schéma d'abord

Voir `04-shopify-architecture.md` pour la référence complète. Trois principes de rédaction souvent négligés :

**Les labels s'écrivent pour un marchand, pas pour un développeur.**

| ❌ | ✅ |
|---|---|
| « Enable lazy loading » | « Charger les images au défilement » |
| « Max blocks » | « Nombre maximum d'éléments » |
| « CTA text » | « Texte du bouton » |
| « Padding block start » | « Espace au-dessus » |

**Le champ `info` sert à prévenir, pas à décrire.**
```json
{ "type": "range", "id": "columns", "label": "Colonnes",
  "info": "Au-delà de 4 colonnes, le texte devient difficile à lire sur ordinateur.",
  "min": 1, "max": 6, "step": 1, "default": 3 }
```

**Les `header` structurent le panneau.** Un panneau de quinze réglages sans regroupement est un panneau que le marchand n'utilisera pas.

---

# 2. Liquid — le rendu complet sans JavaScript

```liquid
{%- liquid
  assign items = section.blocks
  assign has_items = false
  if items.size > 0
    assign has_items = true
  endif
-%}

{%- if has_items -%}
  <div
    class="trust-bar trust-bar--{{ section.settings.layout }}"
    style="--trust-pt: {{ section.settings.padding_top }}px;"
    data-trust-bar
  >
    <ul class="trust-bar__list" role="list">
      {%- for block in items -%}
        <li class="trust-bar__item" {{ block.shopify_attributes }}>
          {%- if block.settings.icon != blank -%}
            {{ block.settings.icon
               | image_url: width: 96
               | image_tag: loading: 'lazy', class: 'trust-bar__icon', alt: '' }}
          {%- endif -%}

          {%- if block.settings.title != blank -%}
            <span class="trust-bar__title">{{ block.settings.title }}</span>
          {%- endif -%}

          {%- if block.settings.text != blank -%}
            <span class="trust-bar__text">{{ block.settings.text }}</span>
          {%- endif -%}
        </li>
      {%- endfor -%}
    </ul>
  </div>
{%- endif -%}
```

## Les huit règles du Liquid de composant

1. **Une garde `{% if %}` sur chaque donnée.** Sans exception. C'est ce qui rend le composant présentable quand rien n'est renseigné.
2. **`{{ block.shopify_attributes }}` sur le wrapper de chaque bloc.**
3. **`image_url` + `image_tag`** — `img_url` et `img_tag` sont dépréciés.
4. **`alt=''` sur une image décorative**, `alt` renseigné sur une image porteuse d'information.
5. **Une variable CSS pour transmettre un réglage numérique**, plutôt que du style en dur — plus lisible et modifiable en CSS.
6. **HTML sémantique** : `<button>` pour ce qui est cliquable, `<ul>` pour une liste, `<details>`/`<summary>` pour un accordéon, hiérarchie de titres cohérente avec la page hôte.
7. **Un attribut `data-` racine** pour l'accroche JavaScript, jamais une classe CSS — les classes changent au gré du style.
8. **Aucun texte en dur.** Tout passe par un réglage ou par `{{ 'clé' | t }}`.

## Le blanc, `blank`, et le piège du zéro

```liquid
{%- if block.settings.text != blank -%}      {# correct #}
{%- if block.settings.count > 0 -%}          {# pour un nombre #}
```

`blank` couvre la chaîne vide, `nil` et les tableaux vides. Mais **`0` n'est pas `blank`** : un réglage numérique à 0 passe le test `!= blank`. Traite les nombres séparément.

## Sécurité du contenu

```liquid
{{ block.settings.title }}                {# richtext / inline_richtext : HTML autorisé #}
{{ block.settings.title | escape }}       {# text saisi libre affiché dans un attribut #}
{{ product.title | escape }}              {# dans un attribut HTML, toujours #}
```

Dans un attribut HTML, `| escape` est systématique. Un titre de produit contenant une apostrophe casse l'attribut sans lui.

---

# 3. CSS — mobile-first, scopé

```css
.trust-bar {
  padding-block-start: var(--trust-pt, 24px);
}
.trust-bar__list {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.trust-bar--row .trust-bar__list {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.trust-bar--column .trust-bar__list {
  flex-direction: column;
}
.trust-bar__item {
  display: flex;
  align-items: center;
  gap: .5rem;
  min-height: 44px;
  scroll-snap-align: start;
}
.trust-bar__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

@media (min-width: 750px) {
  .trust-bar__list { justify-content: center; overflow: visible; }
}
@media (prefers-reduced-motion: reduce) {
  .trust-bar__list { scroll-behavior: auto; }
}
```

## Les sept règles du CSS de composant

1. **Mobile-first** : media queries en `min-width` uniquement.
2. **Scopé par une classe racine unique.** Aucune règle sur `div`, `ul`, `p` nus.
3. **BEM** : `.bloc__element--modificateur`. Prévisible et lisible par le développeur suivant.
4. **Zéro `!important`**, sauf pour neutraliser un style d'application — avec un commentaire expliquant pourquoi.
5. **`width`/`height` ou `aspect-ratio` sur tout média** → zéro décalage visuel.
6. **Cibles tactiles ≥ 44 px.**
7. **`prefers-reduced-motion` respecté** dès qu'il y a un mouvement.

## `{% stylesheet %}` ou fichier d'asset ?

`{% stylesheet %}` dans une section ou un theme block scope le CSS au composant, et Shopify agrège ces styles. C'est le bon choix pour un composant autonome.

⚠️ **Liquid n'est pas interprété dans `{% stylesheet %}`.** Tout ce qui dépend d'un réglage passe par une variable CSS posée dans le HTML :

```liquid
<div class="trust-bar" style="--trust-pt: {{ section.settings.padding_top }}px;">
```

```liquid
{% stylesheet %}
  .trust-bar { padding-block-start: var(--trust-pt, 24px); }
{% endstylesheet %}
```

Pour un composant destiné à ta bibliothèque, `{% stylesheet %}` est préférable : le fichier est autonome, rien à copier dans `assets/`.

---

# 4. JavaScript — amélioration, jamais condition

```js
(function () {
  function init(scope) {
    var root = (scope || document).querySelector('[data-trust-bar]');
    if (!root) return;
    if (root.dataset.init === 'true') return;
    root.dataset.init = 'true';

    // amélioration uniquement — le composant fonctionne déjà sans ceci
  }

  function destroy(scope) {
    var root = (scope || document).querySelector('[data-trust-bar]');
    if (!root) return;
    root.dataset.init = 'false';
    // retirer écouteurs, timers, observers
  }

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', function () { init(); });
  }

  if (window.Shopify && Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (e) { init(e.target); });
    document.addEventListener('shopify:section:unload', function (e) { destroy(e.target); });
  }
})();
```

## Les six règles du JS de composant

1. **IIFE systématique.** Shopify recommande d'encapsuler tout script injecté dans un thème : la minification renomme les variables et provoque des collisions dans le scope global.
2. **Garde `dataset.init`** contre la double initialisation. Sans elle, un carrousel défile deux fois plus vite dans l'éditeur.
3. **Écoute de `shopify:section:load` / `unload`.** Sans elle, le composant est inerte dans le personnalisateur — la livraison ratée n°1 de cette phase.
4. **Nettoyage au `unload`** : écouteurs, timers, `IntersectionObserver`.
5. **Délégation d'événement** dès que le DOM peut être remplacé (application, filtre AJAX, changement de variante).
6. **JS natif.** Aucune bibliothèque, aucun polyfill pour navigateurs obsolètes.

Événements du Theme Editor disponibles : `shopify:section:load`, `shopify:section:unload`, `shopify:section:select`, `shopify:section:deselect`, `shopify:section:reorder`, `shopify:block:select`, `shopify:block:deselect`.

Détection de contexte : `{% if request.design_mode %}` en Liquid, `Shopify.designMode` en JavaScript. Ces variables servent à **adapter le comportement** du code (ne pas déclencher un événement de suivi depuis l'éditeur, par exemple), jamais à afficher au marchand un rendu différent de celui que verront ses clients.

## Dégradation — à écrire dans la spec

| Sans JS, le composant… | Acceptable ? |
|---|---|
| Carrousel → liste défilante horizontale | ✅ |
| Accordéon → contenu ouvert, ou `<details>` natif | ✅ |
| Onglets → sections empilées avec titres | ✅ |
| Filtre → liens de navigation | ✅ |
| Modale → ancre vers une section de la page | ✅ |
| **Affiche du vide** | ❌ Reconception nécessaire |

---

# 5. Accessibilité

```
[ ] HTML sémantique : <button>, <ul>, <details>, hiérarchie de titres
[ ] Ordre de tabulation logique
[ ] Focus VISIBLE (ne jamais supprimer l'outline sans remplacement)
[ ] Contraste du texte et des boutons vérifié
[ ] alt renseigné, ou alt='' si décoratif
[ ] Libellés associés aux champs de formulaire
[ ] aria-expanded sur les éléments repliables
[ ] Aucune information portée uniquement par la couleur
[ ] Cibles tactiles ≥ 44 px
[ ] prefers-reduced-motion respecté
```

Un accordéon en `<details>`/`<summary>` natif est accessible, fonctionne sans JavaScript et se style entièrement. Il n'y a presque jamais de raison d'en construire un en JavaScript.

---

# 6. Performance

```
[ ] Images via image_url + image_tag, avec width et height
[ ] loading="lazy" sur les images sous la ligne de flottaison
[ ] loading="eager" au-dessus (utiliser section.index / section.location si la
    position peut varier)
[ ] Aucun script bloquant ajouté
[ ] Aucune bibliothèque tierce
[ ] Aucune police web supplémentaire
[ ] aspect-ratio ou dimensions sur tout média → zéro décalage visuel
[ ] Lighthouse avant/après : aucune dégradation
```

**Mesure toujours avant et après ajout du composant.** Un composant qui fait perdre 0,4 s de LCP annule le bénéfice qu'il apportait, et c'est le genre de chose qu'un client découvre trois mois plus tard.

---

# 7. Traductions

```liquid
<span class="trust-bar__label">{{ 'sections.trust_bar.default_title' | t }}</span>
```

```json
// locales/fr.default.json
{
  "sections": {
    "trust_bar": {
      "default_title": "Livraison offerte"
    }
  }
}
```

Les labels du schéma se traduisent aussi, via les fichiers `locales/*.schema.json` et la syntaxe `"t:sections.trust_bar.name"`.

Pour un composant de bibliothèque destiné à être revendu, c'est indispensable. Pour un composant mono-langue, c'est une bonne habitude qui coûte cinq minutes et évite une reprise complète le jour où le client ouvre un second marché.

---

# 8. Nettoyage avant commit

```bash
grep -rn "console.log\|debugger" sections/ blocks/ snippets/ assets/
grep -rn "| json }}" sections/ blocks/ snippets/
grep -rn "TODO\|FIXME\|lorem" --include="*.liquid" .
shopify theme check --fail-level error
git diff --stat
```

Un `{{ product | json }}` oublié en production expose des données structurées dans le HTML public. Une commande, à chaque fois.

---

# 9. Le message de commit

```
feat(trust-bar): ajouter la barre de réassurance produit

Composant demandé pour afficher livraison, retours et paiement sous le prix.
Section avec blocks locaux, max 4, presets pré-rempli à 3 éléments.
Rendu entièrement côté serveur — aucune dépendance JS.
Disposition mobile paramétrable (ligne défilante ou colonne).
Testé : réglages vides, 1 bloc, 4 blocs, texte de 300 caractères, image
absente, Theme Editor (ajout/déplacement/duplication/suppression),
Safari iOS 17 réel, Chrome Android, Chrome et Firefox desktop.
Lighthouse : aucune variation mesurable.
```

Ce niveau de détail alimente directement `implementation.md` et le rapport de QA. Tu n'écris pas deux fois.
