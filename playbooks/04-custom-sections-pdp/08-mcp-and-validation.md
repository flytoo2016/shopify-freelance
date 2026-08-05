# 08 — MCP & Validation

Le Dev MCP est **plus utile ici que dans toutes les phases précédentes**. La raison est simple : tu écris beaucoup de Liquid neuf, et c'est exactement le terrain où un modèle de langage produit des types de réglages, des objets et des filtres parfaitement plausibles — qui n'existent pas.

---

## A. Pourquoi c'est critique en Phase 4

En Phase 2, une erreur casse quelque chose de visible. En Phase 4, une erreur produit souvent un **échec silencieux** :

| Erreur | Symptôme |
|---|---|
| Type de réglage inexistant | La section n'apparaît pas dans l'éditeur, **sans message clair** |
| Propriété d'objet inventée | La zone reste vide, aucune erreur |
| Filtre inexistant | `Liquid error` affiché sur la page publique |
| Attribut de schéma inventé | Ignoré silencieusement, ou schéma rejeté |
| `enabled_on` + `disabled_on` | Schéma invalide |

Les deux premiers sont les plus coûteux : tu passes une heure à chercher pourquoi ta section ne s'affiche pas, alors qu'une vérification de dix secondes l'aurait évité.

---

## B. Les trois usages systématiques

### 1. Vérifier un type de réglage avant de l'écrire

```
Utilise le Dev MCP (API "liquid") et confirme que le type de réglage
"{{type}}" existe pour un schéma de section, et donne-moi ses attributs
obligatoires et optionnels.
```

À faire pour **chaque** type que tu n'as pas utilisé récemment. Les types courants sont stables ; les types spécialisés apparaissent, changent, et certains ne sont disponibles que dans certains contextes.

### 2. Vérifier un objet ou un filtre Liquid

```
Vérifie via le Dev MCP si {{objet.propriété}} existe.
Si non, quelle est la propriété correcte pour obtenir {{ce que je cherche}} ?
```

Cas typiques où un modèle invente : `product.stock`, `collection.count`, `variant.image_url`, `cart.total`, `product.metafield`. Toutes plausibles, toutes fausses.

### 3. Valider le fichier produit

```
Valide les fichiers que tu viens de créer avec l'outil validate_theme du
Dev MCP, puis lance shopify theme check --fail-level error.
Corrige et revalide jusqu'à zéro erreur.
```

À faire **avant chaque commit**, sans exception.

---

## C. La chaîne de validation complète

```
1. Dev MCP — vérifier types, objets, filtres AVANT d'écrire
2. Écrire le code
3. Dev MCP — validate_theme sur les fichiers modifiés
4. shopify theme check --fail-level error
5. shopify theme dev — vérification visuelle
6. Theme Editor — le test qui compte vraiment
7. git diff relu ligne par ligne
```

Chaque maillon attrape des erreurs que les autres laissent passer :

| Outil | Ce qu'il attrape | Ce qu'il laisse passer |
|---|---|---|
| Dev MCP | Objets, filtres, types inventés | Erreurs de logique |
| `validate_theme` | Syntaxe, références Liquid invalides | Comportement |
| `theme check` | Lint, schémas, perf, accessibilité de base | Rendu réel |
| `theme dev` | Rendu visuel | Comportement dans l'éditeur |
| **Theme Editor** | **Tout le reste** | — |

Le Theme Editor est le seul juge final. Un composant qui passe les quatre premiers contrôles et casse dans l'éditeur est un composant non livrable.

---

## D. Theme Check — les règles qui comptent ici

```bash
shopify theme check
shopify theme check --fail-level error
```

Règles particulièrement pertinentes en Phase 4 :

| Règle | Ce qu'elle protège |
|---|---|
| `ValidSchema` | JSON du schéma valide |
| `ValidHTMLTranslation` | Traductions bien formées |
| `AssetSizeJavascript` | Fichiers JS trop lourds (seuil par défaut : 10 KB compressés) |
| `AssetSizeCSS` | CSS trop lourd |
| `ImgLazyLoading` | Attribut de chargement présent |
| `DeprecatedFilter` | `img_url`, `img_tag` et consorts |
| `MissingTemplate` | Snippet appelé mais inexistant |
| `UnusedAssign` | Variables assignées et jamais utilisées |
| `RequiredLayoutThemeObject` | Objets obligatoires du layout |
| `TranslationKeyExists` | Clé de traduction manquante |

`--fail-level error` ne bloque que sur les erreurs, pas sur les avertissements. Lis quand même les avertissements : sur du code neuf, ils signalent presque toujours quelque chose de réel.

---

## E. Le REPL, avant de coder

```bash
shopify theme console --url /products/exemple
```

Trois requêtes qui évitent des heures :

```liquid
{{ product.metafields.custom | json }}          # ce qui existe réellement
{{ product.options_with_values | json }}        # structure des options
{{ product.selected_or_first_available_variant | json }}
```

**Le principe :** tu **vois** la structure au lieu de la supposer. C'est particulièrement décisif avant de construire un composant qui lit des metafields — tu découvres immédiatement si la donnée existe, sous quel type, et à quel niveau (produit ou variante).

Teste toujours sur **deux** produits : un qui possède la donnée, un qui ne la possède pas. Le second te dit quelle garde `{% if %}` écrire.

---

## F. Sécurité et permissions — rappels

Les règles des phases précédentes s'appliquent intégralement :

1. **Theme Access App** par défaut. Compte collaborateur limité si tu dois créer des définitions de metafields (permission `Produits`).
2. **Aucun serveur MCP Admin non officiel** sur un store client.
3. **Jamais de `theme push --allow-live`**, jamais de `theme publish` sans accord écrit.
4. **Sauvegarde datée** du thème avant tout travail.
5. **Aucun code de débogage** dans le commit final.
6. **Anonymisation** avant tout versement à `shopify-components/`.

Le point 6 est spécifique à cette phase et mérite une vérification explicite :

```bash
grep -rni "nomduclient\|marqueclient\|monclient" shopify-components/{{composant}}/
grep -rn "myshopify.com" shopify-components/{{composant}}/
```

Un nom de classe ou un texte par défaut oublié qui traverse d'un client à l'autre est un incident sérieux, et il est entièrement évitable par une commande.
