# 07 — Fix Playbook

Le cœur technique. Format constant : **symptôme → diagnostic → correctif → risque → test**.

> Tout Liquid produit ou modifié passe par `validate_theme` (Dev MCP) puis `shopify theme check --fail-level error`. Rappels : pas de parenthèses dans les conditions Liquid, pas d'opérateur ternaire, `{% render %}` a un scope isolé.

---

# 1. Scope de `{% render %}`

**Symptôme.** Un snippet affiche du vide alors que la variable existe dans la page appelante.

**Diagnostic.** En haut du snippet, temporairement :
```liquid
<pre>{{ product | json }}</pre>
```
Vide → c'est le scope.

**Correctif.**
```liquid
{%- comment -%} Cassé : le snippet ne voit rien {%- endcomment -%}
{% assign featured = collection.products.first %}
{% render 'product-card' %}

{%- comment -%} Correct {%- endcomment -%}
{% render 'product-card', product: featured, show_price: true %}
```

Et documente les paramètres attendus dans le snippet :
```liquid
{% doc %}
  Affiche une carte produit.
  @param {product} product - Le produit à afficher
  @param {boolean} [show_price] - Afficher le prix (défaut : true)
{% enddoc %}
```

**Cas particulier.** Si le bug est apparu après qu'un `{% include %}` a été remplacé par `{% render %}` : toutes les variables implicitement héritées doivent devenir des paramètres explicites. Vérifie **chaque** variable du snippet, pas seulement celle qui a été signalée.

**Risque.** Faible. **Test.** La zone s'affiche partout où le snippet est appelé — pas seulement sur la page signalée.

---

# 2. Boucle tronquée à 50

**Symptôme.** Exactement 50 éléments affichés, ou « il manque des produits ».

**Correctif.**
```liquid
{% paginate collection.products by 24 %}
  {% for product in collection.products %}
    {% render 'card-product', product: product %}
  {% endfor %}
  {{ paginate | default_pagination }}
{% endpaginate %}
```

Si la liste doit rester sur une seule page et dépasse 50 éléments, le `paginate` reste obligatoire — c'est une limite du moteur, pas un choix de présentation.

**Risque.** Moyen : l'ajout d'une pagination change la structure de la page. Prévenir le client, montrer un avant/après visuel.

---

# 3. Cart AJAX

## 3.1 URL non localisée

**Symptôme.** Le panier fonctionne sur le marché principal et casse en /fr, /de, ou sur un autre marché.

**Cause.** Les requêtes de l'API AJAX doivent utiliser des URL conscientes de la locale. Un chemin codé en dur ignore le préfixe de langue ou de marché.

```js
// Cassé
fetch('/cart/add.js', { ... })

// Correct
fetch(window.Shopify.routes.root + 'cart/add.js', { ... })
```

`window.Shopify.routes.root` renvoie `/` sur le marché principal et `/fr/` (par exemple) ailleurs — d'où l'absence de barre oblique initiale dans la concaténation.

**Test.** Reproduire sur chaque marché actif, pas seulement le principal.

## 3.2 Mauvais endpoint

| Besoin | Endpoint | Piège |
|---|---|---|
| Ajouter une ou plusieurs variantes | `POST /{locale}/cart/add.js` | Attend un tableau `items` avec `id` (ID de variante) et `quantity` |
| Modifier **une** ligne existante | `POST /{locale}/cart/change.js` | Attend la **clé de ligne**, pas l'ID de variante, dès qu'un produit apparaît plusieurs fois |
| Mise à jour groupée | `POST /{locale}/cart/update.js` | Si l'ID de variante correspond à **plusieurs** lignes, seule la **première** est modifiée |

C'est la cause classique de « la quantité ne change pas » sur les paniers contenant des produits avec propriétés (gravure, personnalisation, bundles) : le même ID de variante apparaît sur plusieurs lignes.

```js
// Ajouter
const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
});

// Modifier une ligne précise : utiliser sa clé
await fetch(window.Shopify.routes.root + 'cart/change.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: lineItemKey, quantity: 2 })
});

// Supprimer : quantité 0
```

La clé de ligne se récupère depuis `{{ item.key }}` en Liquid ou depuis la réponse JSON du panier.

## 3.3 Erreurs non gérées

**Symptôme.** Rien ne se passe au clic, ou le drawer s'ouvre vide, alors que la vraie cause est un stock insuffisant.

**Cause.** Le code suppose toujours un succès. L'API renvoie un statut d'erreur avec une description exploitable (stock insuffisant, quantité maximale déjà au panier…), qui n'est jamais lue.

```js
const res = await fetch(window.Shopify.routes.root + 'cart/add.js', { ... });
const data = await res.json();

if (!res.ok) {
  // data.description / data.message contiennent le message Shopify
  afficherErreur(data.description || data.message);
  return;
}
```

**Risque.** Faible, gain élevé. C'est souvent la correction qui transforme « ça bugue » en « ah, c'était juste une rupture de stock ».

## 3.4 Rendu groupé de sections

Les endpoints du panier acceptent un paramètre `sections` qui retourne le HTML rendu de sections, pour mettre à jour le drawer ou le compteur sans rechargement.

Deux pièges :
- Quand `sections_url` n'est pas précisé, les sections sont rendues **dans le contexte de la page appelante** (via l'en-tête `Referer`). Une section absente de ce contexte ne rendra rien.
- Une section qui échoue est retournée `null` **dans une réponse 200**.

```js
const data = await res.json();
const html = data.sections && data.sections['cart-drawer'];
if (!html) {
  // ne pas injecter du vide : conserver l'état actuel ou recharger
  return;
}
document.querySelector('#cart-drawer').innerHTML = html;
```

## 3.5 Double écouteur

**Symptôme.** Deux articles ajoutés en un clic, ou deux requêtes visibles dans Network.

**Diagnostic.** Network : compter les requêtes par clic.

**Correctif.** Identifier qui écoute — thème et application. Ne jamais supprimer l'écouteur de l'application depuis le thème sans comprendre : préférer empêcher la propagation, ou retirer la liaison du thème si l'application prend le relais.

```js
button.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();   // à utiliser en connaissance de cause
  ...
});
```

**Risque.** Élevé. Documente précisément ce que tu neutralises.

---

# 4. Sections cassées / schéma invalide

**Symptôme.** « This section is not available », section absente du personnalisateur, réglages vides.

**Diagnostic.**
```bash
shopify theme check
# extraire le schéma et le valider isolément
sed -n '/{% schema %}/,/{% endschema %}/p' sections/ma-section.liquid \
  | sed '1d;$d' | python3 -m json.tool
```

**Causes et correctifs**

| Cause | Correctif |
|---|---|
| Virgule finale ou guillemet manquant | Corriger le JSON |
| Deux réglages avec le même `id` | Renommer **le nouveau**, jamais l'ancien |
| Type de réglage inexistant | Vérifier le type via le Dev MCP |
| `type` du template JSON sans fichier correspondant | Restaurer le fichier ou corriger le template |
| Bloc utilisé mais non déclaré dans le schéma | Ajouter la déclaration |
| Entrée de `order` absente de `sections` | Nettoyer le template JSON |
| `{{ block.shopify_attributes }}` manquant | L'ajouter sur le wrapper du bloc |

⚠️ **Règle absolue.** Ne jamais renommer ou supprimer un `id` de réglage existant : les valeurs saisies par le marchand y sont attachées et seraient perdues. Si le renommage est inévitable, arrête-toi, préviens le client, et prévois la ressaisie.

---

# 5. Templates JSON

**Symptôme.** Page blanche, contenu disparu, sections dans le désordre.

**Diagnostic.**
```bash
for f in templates/*.json; do python3 -m json.tool "$f" > /dev/null \
  || echo "JSON INVALIDE : $f"; done
```

Puis vérifier que chaque `"type"` correspond à un fichier réel :
```bash
grep -ho '"type": *"[^"]*"' templates/*.json | sort -u
ls sections/
```

**Cause fréquente et sournoise.** Un `theme push` sans `--ignore config/settings_data.json` a écrasé les réglages du marchand. Le fichier est valide, le contenu est perdu. La seule récupération possible passe par un thème de sauvegarde — d'où l'importance du réflexe de duplication.

---

# 6. Bugs propres au Theme Editor

**Symptôme.** Le site fonctionne en ligne ; dans le personnalisateur, un carrousel ne s'initialise pas, un accordéon reste inerte.

**Cause.** L'éditeur recharge les sections dynamiquement, sans rechargement de page. Un script initialisé uniquement au chargement initial ne se relance jamais.

**Correctif.**
```js
(function () {
  function init(container) {
    const el = (container || document).querySelector('[data-carousel]');
    if (!el || el.dataset.initialized === 'true') return;
    el.dataset.initialized = 'true';
    // initialisation
  }

  function destroy(container) {
    // retirer écouteurs, timers, observers
  }

  document.addEventListener('DOMContentLoaded', () => init());

  if (Shopify.designMode) {
    document.addEventListener('shopify:section:load', (e) => init(e.target));
    document.addEventListener('shopify:section:unload', (e) => destroy(e.target));
    document.addEventListener('shopify:section:select', (e) => { /* garder visible */ });
  }
})();
```

Événements disponibles : `shopify:section:load`, `shopify:section:unload`, `shopify:section:select`, `shopify:section:deselect`, `shopify:section:reorder`, `shopify:block:select`, `shopify:block:deselect`.

Détection du contexte : `{% if request.design_mode %}` en Liquid, `Shopify.designMode` en JavaScript.

⚠️ Ces variables servent à adapter le **comportement du code** (ne pas envoyer d'événements de tracking depuis l'éditeur, par exemple), jamais à afficher au marchand un rendu différent de celui que verront ses clients.

**Le `dataset.initialized`** évite la double initialisation quand l'événement se déclenche plusieurs fois. C'est le correctif d'une classe entière de bugs « le carrousel défile deux fois plus vite dans l'éditeur ».

---

# 7. Metafields et sources dynamiques

**Symptôme.** Champ vide sur certains produits, `[object Object]`, ou impossibilité de connecter une source dynamique.

**Diagnostic — REPL obligatoire.**
```bash
shopify theme console --url /products/produit-qui-marche
> {{ product.metafields.custom | json }}
shopify theme console --url /products/produit-qui-bugue
> {{ product.metafields.custom | json }}
```

**Correctifs**

| Cause | Correctif |
|---|---|
| Metafield absent sur certains produits | Garde `{% if %}` — le vrai bug est l'absence de garde |
| Objet affiché au lieu de la valeur | Afficher `.value`, ou utiliser `metafield_tag` / `metafield_text` |
| Défini au niveau variante, lu au niveau produit | Lire sur `variant.metafields` |
| Type incompatible avec le réglage | Aligner le type du réglage sur celui du metafield |
| Metaobject non publié | Le publier côté admin — ce n'est pas un bug de thème |

```liquid
{% if product.metafields.custom.care != blank %}
  <div class="product__care">{{ product.metafields.custom.care.value }}</div>
{% endif %}
```

**Message client type :** *« Le champ était bien codé. Il est vide sur 14 de vos produits parce que la donnée n'a jamais été renseignée pour eux. J'ai ajouté une protection pour que la zone disparaisse proprement au lieu de casser la mise en page, et je vous ai listé les produits à compléter. »*

Cette réponse est fréquente, et elle transforme un « bug » en service.

---

# 8. JavaScript

## 8.1 Sélecteur obsolète

**Symptôme.** Rien ne se passe au clic ; aucune erreur console, ou `Cannot read properties of null`.

**Diagnostic.** Dans la console : `document.querySelector('.la-classe')` → `null` ?

**Correctif.** Corriger le sélecteur. Puis vérifier **pourquoi** il a changé : un thème mis à jour ? une application qui remplace le HTML ? Si le HTML est remplacé dynamiquement, la correction du sélecteur ne suffira pas — il faut une délégation.

## 8.2 Élément injecté après coup

```js
// Cassé : l'élément n'existe pas encore au moment de la liaison
document.querySelector('.atc').addEventListener('click', handler);

// Correct : délégation sur un conteneur stable
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.atc');
  if (!btn) return;
  handler(e, btn);
});
```

C'est le correctif universel des bugs « ça marche au chargement puis ça casse après un filtre / un changement de variante / l'ouverture du drawer ».

## 8.3 Erreur en cascade

**Symptôme.** Plusieurs choses cassées d'un coup.

**Cause.** Une erreur JS non rattrapée interrompt l'exécution du reste du script.

**Méthode.** Toujours traiter **la première** erreur de la console. Les suivantes sont souvent des conséquences. Corrige, recharge, réévalue.

## 8.4 Collision de variables globales

Shopify recommande d'encapsuler tout script injecté dans un thème en IIFE : la minification renomme les variables et peut provoquer des collisions dans le scope global.

```js
(function () {
  var config = { ... };   // isolé
})();
```

---

# 9. Responsive et Safari iOS

| Symptôme | Cause fréquente | Correctif |
|---|---|---|
| Débordement horizontal | Largeur fixe, image sans `max-width`, `100vw` avec barre de défilement | `max-width: 100%`, isoler l'élément coupable avec un contour de test |
| Bouton inatteignable | `overflow: hidden`, `z-index`, élément invisible par-dessus | Inspecter les couches |
| `100vh` incorrect sur iOS | La barre d'adresse modifie la hauteur | `100dvh` avec repli `100vh` |
| Champ qui saute au focus (iOS) | Clavier virtuel + `position: fixed` | Éviter `fixed` sur les conteneurs de formulaire |
| Style d'application qui écrase le thème | Spécificité CSS | Augmenter la spécificité côté thème plutôt que `!important` |
| Bug uniquement sur iPhone | Syntaxe JS/CSS non supportée par la version de Safari | Vérifier la compatibilité, tester sur appareil réel |

**Pour trouver un débordement horizontal :**
```js
document.querySelectorAll('*').forEach(el => {
  if (el.getBoundingClientRect().right > document.documentElement.clientWidth) {
    console.log(el);
  }
});
```

**Non négociable :** un bug mobile se teste sur un appareil réel. L'émulateur ne reproduit ni le moteur Safari, ni le clavier virtuel, ni le comportement de la barre d'adresse.

---

# 10. Conflit d'application

**Ce que tu peux faire**
- Identifier précisément l'origine (fichier, domaine, ligne)
- Rendre le thème résistant : délégation d'événement, sélecteurs stables, gardes
- Contourner : réserver l'espace, retarder une initialisation, ne pas dépendre d'un élément que l'application remplace
- Fournir au client un rapport transmissible à l'éditeur de l'application

**Ce que tu ne peux pas faire**
- Modifier le code de l'application
- Garantir la durabilité d'un contournement

**Formulation obligatoire dans le rapport :**
> Le comportement provient du script de l'application {{X}}, chargé depuis {{domaine}}. Je ne peux pas modifier ce code. J'ai mis en place un contournement côté thème qui rétablit le fonctionnement attendu. Ce contournement peut cesser d'être efficace si l'application est mise à jour. Je vous recommande de transmettre les éléments ci-joints à son support.

Cette transparence te protège juridiquement et commercialement. Sans elle, tu deviens responsable du code d'un tiers.

---

# 11. Régression après mise à jour de thème

**Méthode**

```bash
shopify theme list
shopify theme pull --theme {{id_ancien}} --path ./theme-sain
shopify theme pull --theme {{id_nouveau}} --path ./theme-casse
diff -rq ./theme-sain ./theme-casse
```

Puis : réappliquer les personnalisations **une par une**, un commit chacune, en testant entre chaque.

**Ne réapplique jamais en bloc.** Une personnalisation écrite pour l'ancienne version peut être incompatible avec la nouvelle structure, et tu ne sauras plus laquelle a cassé quoi.

**Si l'ancien thème a été supprimé du store :** informe le client immédiatement. Il ne s'agit plus d'une restauration mais d'une reconstruction à partir de sa description et de captures. Le temps et le prix ne sont pas les mêmes, et cela doit être écrit avant de commencer.

---

# 12. Nettoyage avant commit

Systématique, à chaque fois :

```bash
grep -rn "console.log\|debugger" assets/ sections/ snippets/ blocks/
grep -rn "| json }}" sections/ snippets/ blocks/ templates/
grep -rn "TODO\|FIXME\|TEST" --include="*.liquid" .
git diff --stat
```

Un `{{ product | json }}` oublié en production expose des données structurées du store dans le HTML public. C'est la faute la plus embarrassante de cette prestation, et elle est évitable en une commande.
