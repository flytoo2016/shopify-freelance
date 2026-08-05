# 06 — Optimization Playbook

Le cœur technique. Organisé par métrique, dans l'ordre de rentabilité. Chaque correctif suit le même format : **symptôme → diagnostic → correctif → risque → test**.

> Tous les exemples Liquid doivent être validés avec `validate_theme` (Dev MCP) puis `shopify theme check` avant commit. Rappel : Liquid n'a **pas d'opérateur ternaire** et **pas de parenthèses** dans les conditions.

---

# 1. LCP — Largest Contentful Paint

C'est le premier chantier. Sur une boutique Shopify, l'élément LCP est presque toujours une image (bannière home, image produit) ou un titre positionné par-dessus.

## 1.1 L'image au-dessus de la ligne de flottaison est en lazy loading

**Symptôme.** LCP > 4 s, waterfall montrant l'image hero démarrée tardivement.

**Diagnostic.** `grep -rn 'loading="lazy"' sections/` puis vérifier laquelle rend l'élément LCP identifié par Lighthouse.

**Contexte Shopify important.** Depuis septembre 2023, `image_tag` applique automatiquement `loading="lazy"` aux images des sections situées **plus bas dans la page**. Le comportement par défaut est donc raisonnable — mais il se trompe dès que la position d'une section est variable (sections déplaçables dans le Theme Editor). C'est pour ça que Shopify a introduit `section.index` et `section.location`.

**Correctif.**

```liquid
{% liquid
  assign is_priority = false
  if section.location == 'template' and section.index == 1
    assign is_priority = true
  endif

  assign img_loading = 'lazy'
  if is_priority
    assign img_loading = 'eager'
  endif
%}

{% if is_priority %}
  {{ section.settings.image
     | image_url: width: 1600
     | image_tag:
         loading: 'eager',
         preload: true,
         sizes: '100vw',
         widths: '400, 600, 800, 1000, 1200, 1600',
         class: 'hero__image' }}
{% else %}
  {{ section.settings.image
     | image_url: width: 1600
     | image_tag:
         loading: 'lazy',
         sizes: '100vw',
         widths: '400, 600, 800, 1000, 1200, 1600',
         class: 'hero__image' }}
{% endif %}
```

Sur `fetchpriority="high"` : `image_tag` répercute les paramètres qu'il ne connaît pas en attributs HTML. Vérifie le HTML rendu ; si l'attribut n'apparaît pas dans ta version de thème, construis l'image en `<img>` brut avec `image_url` et pose l'attribut à la main.

**Risque.** Faible. **Test.** Recharger, vérifier dans Network que l'image hero part dans les toutes premières requêtes.

## 1.2 Preload mal utilisé

**La contrainte Shopify :** tu peux poser au maximum **2 resource hints par template**, via le filtre `preload_tag` ou le paramètre `preload: true` sur `stylesheet_tag` / `image_tag`. Shopify les envoie ensuite en en-tête HTTP `Link` sur les requêtes suivantes.

**Anti-pattern courant :** précharger 6 polices + 3 images + un JS. Tout entre en concurrence, rien n'arrive plus vite, et le LCP se dégrade.

**Correctif.** Choisis **deux** ressources maximum, et uniquement des ressources qui bloquent réellement le rendu initial : la feuille de style critique, et l'image LCP.

```liquid
{{ 'critical.css' | asset_url | stylesheet_tag: preload: true }}
```

## 1.3 L'élément LCP est dans un carrousel

**Symptôme.** LCP tardif alors que l'image est légère : le JS du slider doit s'exécuter avant que la première diapositive soit visible.

**Correctif** (par ordre de préférence) :
1. Recommander au client une bannière statique au-dessus de la ligne de flottaison (souvent meilleure en conversion, pas seulement en vitesse)
2. Rendre la **première diapositive** visible en CSS pur, sans attendre le JS, le slider ne prenant le relais qu'ensuite
3. Charger le JS du slider en `defer` et non de façon bloquante

**Risque.** Moyen — touche au rendu visuel. À valider avec le client par capture avant/après.

## 1.4 Image LCP surdimensionnée

**Symptôme.** Une image de 3 000 px affichée dans un conteneur de 800 px.

**Diagnostic.** Lighthouse « Properly size images » + DevTools : survol de l'`<img>` → dimensions intrinsèques vs affichées.

**Correctif.** `image_url: width: N` avec un N réaliste, `widths` et `sizes` cohérents avec la mise en page réelle. Un `sizes: '100vw'` sur une image qui n'occupe que la moitié de l'écran fait télécharger le double du nécessaire.

**Attention.** Tu corriges le *rendu*. Si le marchand re-uploade une image de 8 Mo la semaine suivante, le problème revient. → argument de retainer.

---

# 2. CLS — Cumulative Layout Shift

Le plus rapide à corriger, le plus visible pour le client (il *voit* le site sauter).

## 2.1 Images sans dimensions

**Correctif.** `image_tag` ajoute `width` et `height` automatiquement à partir de l'URL. Le problème vient donc presque toujours de `<img>` écrits à la main ou de `img_url` (déprécié).

```bash
grep -rn "<img" sections/ snippets/ blocks/ | grep -v "width=" | grep -v "height="
grep -rn "img_url\|img_tag" .   # filtres dépréciés à remplacer
```

Complète côté CSS pour que le ratio soit tenu même en responsive :

```css
.card__image { aspect-ratio: 1 / 1; width: 100%; height: auto; }
```

## 2.2 Contenu injecté par une app

**Symptôme.** Bannière d'annonce, badge de stock, widget d'avis qui apparaît après le rendu et pousse le contenu.

**Ce que tu ne peux pas faire.** Réécrire le script de l'app.
**Ce que tu peux faire.** Réserver l'espace :

```css
.app-reviews-placeholder { min-height: 180px; }
@media (max-width: 749px) { .app-reviews-placeholder { min-height: 240px; } }
```

Mesure la hauteur réelle du widget une fois monté, sur mobile **et** desktop, avant de figer la valeur. Documente-la : si l'app change, il faudra la réajuster.

## 2.3 Polices web

**Symptôme.** Le texte change de taille/graisse pendant le chargement.

**Correctif.**
- Polices Shopify Font Library (`font_face`) : servies depuis le CDN Shopify, généralement le meilleur choix.
- Polices auto-hébergées : `font-display: swap` (ou `optional` si tu acceptes de perdre la police sur connexion lente au profit de zéro shift), format `woff2` uniquement, et réduction du nombre de graisses. Chaque graisse est un fichier.
- Vérifie qu'aucune police n'est chargée depuis Google Fonts : c'est une origine tierce supplémentaire, et souvent un doublon avec la police du thème.

## 2.4 Contenu conditionnel Liquid

Un bloc `{% if %}` qui change la hauteur (badge promo, message de stock) crée un shift si le rendu final dépend du JS. Réserve la hauteur en CSS ou rends la variante dès le serveur quand c'est possible.

---

# 3. INP / TBT — Interactivité

## 3.1 Scripts bloquants

**Règle Shopify explicite :** les scripts parser-blocking bloquent la construction du DOM, congestionnent le réseau et dégradent FCP et LCP. Utilise `defer` ou `async`.

```bash
grep -rn "<script" layout/ sections/ snippets/ \
  | grep -v "defer\|async\|application/json\|application/ld+json"
```

**Correctif.** `defer` par défaut (garantit l'ordre d'exécution et attend le DOM). `async` uniquement pour des scripts totalement indépendants (analytics).

**Risque.** ⚠️ **Moyen à élevé.** Un script qui utilise `document.write`, ou du code inline qui dépend d'une variable globale définie par le script, cassera. Teste chaque script individuellement, un commit par script.

## 3.2 Bibliothèques tierces

Position officielle de Shopify : réduire la dépendance aux frameworks et bibliothèques externes, préférer les API navigateur natives. jQuery, React, Vue et les grosses bibliothèques utilitaires ont un coût significatif — aggravé quand plusieurs apps chargent la même chose en double.

**Cibles habituelles :**

| Bibliothèque | Remplacement natif |
|---|---|
| jQuery (sélecteurs, events) | `querySelector`, `addEventListener` |
| jQuery `.ajax()` | `fetch()` |
| Slick / Owl carousel | CSS `scroll-snap` |
| Lazy loading libs (lazysizes) | attribut `loading="lazy"` natif |
| `lazysizes` bgset | CSS `image-set()` |
| Polyfills navigateurs anciens | supprimer (cible : navigateurs > 1 % de part de marché) |
| Bibliothèques d'animation | CSS animations, `IntersectionObserver` |

**Méthode de suppression sûre :**
1. `grep -rn '\$(' assets/ sections/ snippets/` → recenser **tous** les usages
2. Réécrire chaque usage en natif, **un commit par usage**
3. Ne supprimer la bibliothèque qu'au dernier commit
4. Vérifier qu'aucune **app** ne dépend de la globale (une app peut appeler `window.jQuery`)

Si une app en dépend : tu ne supprimes pas. Tu le documentes et tu le remontes au client.

**Cibles chiffrées de référence :** bundle JS de thème minifié ≤ **16 KB** (recommandation Shopify) ; Theme Check signale par défaut tout fichier JS > **10 KB compressé** (`AssetSizeJavascript`).

## 3.3 Import on interaction

Le bon pattern pour un widget lourd que la majorité des visiteurs n'ouvrent jamais (chat, sélecteur de taille, comparateur) :

```html
<script>
  (function () {
    const trigger = document.getElementById('size-guide-trigger');
    if (!trigger) return;
    let loaded = false;
    trigger.addEventListener('click', function (e) {
      if (loaded) return;
      loaded = true;
      e.preventDefault();
      import("{{ 'size-guide.js' | asset_url }}")
        .then(m => m.default)
        .then(SizeGuide => SizeGuide.init())
        .catch(err => { loaded = false; console.error(err); });
    });
  })();
</script>
```

Note le `(function(){...})()` : Shopify recommande d'encapsuler systématiquement les scripts injectés dans un thème en IIFE, parce que la minification renomme les variables et provoque des collisions dans le scope global.

## 3.4 Long tasks issues du thème

- Boucles sur de grandes collections côté client → paginer ou déplacer côté serveur
- Handlers `scroll` / `resize` non throttlés → `requestAnimationFrame` ou `IntersectionObserver`
- Parsing d'un gros JSON produit inline sur les pages à nombreuses variantes → ne sérialiser que ce qui est nécessaire

---

# 4. Scripts tiers et apps

C'est ici que se trouve le plus gros gisement, et c'est ici que tu ne décides pas seul.

## 4.1 Produire le tableau

| App | Fichier(s) | Poids | Pages | Bloquant | Utilisé ? | Recommandation |
|---|---|---|---|---|---|---|
| Reviews X | `cdn.x.com/w.js` | 210 KB | toutes | oui | oui | Charger uniquement sur produit + réserver l'espace |
| Popup Y | `cdn.y.com/p.js` | 95 KB | toutes | non | ? | Aucune popup active → **désinstaller** |
| Ancien tracker | `assets/old.js` | 40 KB | toutes | oui | non | Code résiduel → **supprimer** |

Colonnes obligatoires : **poids**, **pages impactées**, **bloquant**, **recommandation**. Le client doit pouvoir décider sans toi.

## 4.2 Code résiduel d'apps désinstallées

C'est le gain le plus fréquent et le moins risqué. Quand une app est désinstallée, ses snippets et ses appels dans `theme.liquid` restent souvent.

```bash
grep -rn "cdn\.\|https://" layout/theme.liquid sections/ snippets/ | grep -i "script src"
```

Pour chaque origine tierce : l'app est-elle encore dans la liste des apps installées (Q13 du questionnaire) ? Si non → suppression, un commit par app, avec le nom de l'app dans le message de commit.

## 4.3 Ce que tu peux faire sans toucher aux apps

- Charger un script tiers **uniquement sur les templates concernés** (`{% if template.name == 'product' %}`)
- Passer les scripts d'analytics en `async`
- Réserver l'espace des widgets pour éliminer le CLS
- Retarder les scripts non essentiels jusqu'à la première interaction

## 4.4 Ce que tu ne fais jamais

Désinstaller une app sans accord écrit. Tu recommandes, tu chiffres, le client décide, et tu notes qui a décidé quoi dans le rapport.

---

# 5. CSS

## 5.1 CSS bloquant

Une feuille de style critique en synchrone est **normale et souhaitable**. Le problème, ce sont les 4 autres.

**Correctif.** Feuille critique en synchrone (`stylesheet_tag`, éventuellement `preload: true`), le reste chargé de manière non bloquante :

```liquid
<link rel="stylesheet" href="{{ 'component-slider.css' | asset_url }}" media="print" onload="this.media='all'">
<noscript>{{ 'component-slider.css' | asset_url | stylesheet_tag }}</noscript>
```

⚠️ Ce pattern peut créer du CLS s'il concerne du CSS de mise en page au-dessus de la ligne de flottaison. Réserve-le au CSS de composants situés plus bas.

## 5.2 CSS mort

Coverage donne le pourcentage. Sur un thème premium, 60–80 % de CSS non utilisé sur une page donnée est courant — mais **une page ≠ le site**. Une règle inutilisée sur la home peut être vitale sur la page compte client.

**Règle de prudence :** ne supprime du CSS que si (a) Coverage le confirme sur plusieurs templates, (b) `grep` de la classe ne renvoie rien dans le thème, (c) aucune app ne la cible. Sinon, tu ne supprimes pas : tu charges conditionnellement.

## 5.3 CSS par composant

Sur les thèmes modernes, `{% stylesheet %}` dans une section/block/snippet permet de scoper le CSS au composant. Shopify agrège ces styles. C'est la bonne direction pour un thème que tu fais évoluer — pas un chantier à ouvrir sur une mission d'optimisation à 250 €.

---

# 6. Liquid (rendu serveur)

Impacte le TTFB, donc tout le reste. Diagnostic via `shopify theme profile --url ...`.

## 6.1 Boucles

Rappel : une boucle `for` Liquid est limitée à **50 itérations** par défaut. Au-delà, il faut `{% paginate %}`. Une boucle non paginée sur une grande collection est un double problème : coût de rendu et résultat tronqué silencieusement.

```liquid
{% paginate collection.products by 12 %}
  {% for product in collection.products %}
    {% render 'card-product', product: product %}
  {% endfor %}
  {{ paginate | default_pagination }}
{% endpaginate %}
```

## 6.2 Travail répété dans une boucle

```liquid
{%- comment -%} Coûteux : recalculé à chaque itération {%- endcomment -%}
{% for product in collection.products %}
  {% assign badge = settings.badge_text | upcase %}
  ...
{% endfor %}

{%- comment -%} Correct : calculé une fois {%- endcomment -%}
{% assign badge = settings.badge_text | upcase %}
{% for product in collection.products %}
  ...
{% endfor %}
```

## 6.3 Filtres plutôt que conditions dans les boucles

```liquid
{% assign available = collection.products | where: 'available', true %}
```

Plus rapide et plus lisible qu'un `{% if product.available %}` dans une boucle de 50 itérations.

## 6.4 Pièges connus

- `all_products` dans une boucle → très coûteux
- Boucles imbriquées (produits × variantes × metafields)
- `{% render %}` d'un snippet lourd dans une boucle longue
- Rendre le JSON complet de chaque produit d'une collection alors qu'il n'est utilisé que sur la page produit

---

# 7. Ordre d'exécution recommandé

| Ordre | Chantier | Effort | Risque | Gain typique |
|---|---|---|---|---|
| 1 | Code résiduel d'apps désinstallées | Faible | Faible | Élevé |
| 2 | Image LCP (loading, dimensions, preload) | Faible | Faible | Élevé |
| 3 | Dimensions d'images / réservation d'espace (CLS) | Faible | Faible | Élevé |
| 4 | `defer` sur les scripts | Moyen | **Moyen** | Élevé |
| 5 | Chargement conditionnel des scripts tiers | Moyen | Moyen | Moyen-élevé |
| 6 | Polices (nombre, format, `font-display`) | Faible | Faible | Moyen |
| 7 | Import-on-interaction | Moyen | Moyen | Moyen |
| 8 | Suppression des bibliothèques tierces | **Élevé** | **Élevé** | Élevé |
| 9 | CSS non bloquant / CSS mort | Moyen | Moyen | Moyen |
| 10 | Optimisation Liquid | Élevé | Moyen | Variable |

Sur une formule Basic, tu fais 1 à 3. Sur une Standard, 1 à 7. Le 8 ne se vend qu'en Premium, avec du temps de test.

---

# 8. Ce qui ne marche pas (et que la concurrence vend)

- **Les apps « speed booster »** — ajoutent un script pour dire qu'elles en retirent. Certaines préchargent agressivement toutes les pages, ce qui gonfle la bande passante sans améliorer le P75.
- **Minifier ce qui l'est déjà** — Shopify minifie automatiquement le JavaScript servi depuis le storefront.
- **Supprimer massivement le JS** — le score monte, le panier casse.
- **Optimiser un store en mode mot de passe** — le RUM ne se remplit pas tant que la protection est active, et le comportement de chargement diffère.
- **Une seule mesure avant / une seule après** — la variance dépasse souvent le gain. Trois runs, médiane.
