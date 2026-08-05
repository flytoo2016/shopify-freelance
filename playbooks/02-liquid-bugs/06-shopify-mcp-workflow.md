# 06 — Shopify MCP Workflow (Debug)

Les règles de la Phase 1 s'appliquent : **seul le Dev MCP est autorisé sur un store client.** Ce qui change en Phase 2, c'est l'usage — et l'apparition d'un outil décisif que la Phase 1 n'utilisait presque pas : le **REPL Liquid**.

---

## A. Le trio du debug

| Outil | Ce qu'il te dit | Ce qu'il ne peut pas dire |
|---|---|---|
| **Dev MCP** | Ce que Shopify **autorise** : objets, filtres, propriétés, contrats d'API | Ce que contient le store |
| **`shopify theme console`** | Ce que le store **contient réellement**, dans le contexte d'une page | Ce qui se passe côté navigateur |
| **DevTools** | Ce que le **navigateur** exécute et reçoit | Ce que Liquid a évalué côté serveur |

La plupart des bugs se résolvent en confrontant ces trois vues. Un développeur qui n'utilise que DevTools est aveugle sur la moitié de la chaîne.

---

## B. Le Dev MCP en Phase 2

Trois usages, tous décisifs :

### 1. Trancher l'existence d'un objet, d'une propriété ou d'un filtre

Beaucoup de bugs viennent de code écrit par quelqu'un — humain pressé ou assistant IA — qui a inventé une propriété Liquid plausible. `product.stock`, `collection.count`, `variant.image_url` : ça se lit bien, ça ne casse pas visiblement, ça rend simplement du vide.

Le Dev MCP tranche en dix secondes, sur la documentation à jour.

```
Utilise le Dev MCP (API "liquid") et vérifie si {{objet.propriété}} existe.
Si non, quelle est la propriété correcte pour obtenir {{ce que le code cherchait}} ?
```

### 2. Vérifier le contrat d'une API

Les endpoints Cart AJAX et la Section Rendering API ont des comportements documentés précis que le code des thèmes viole souvent : URL conscientes de la locale, distinction `add.js` / `change.js` / `update.js`, sections retournées `null` dans une réponse 200. Vérifier le contrat avant de corriger évite de « réparer » quelque chose qui suivait déjà la spécification.

### 3. Valider le Liquid corrigé

`validate_theme` avant chaque commit. Il détecte les objets, filtres et balises inventés — l'erreur la plus silencieuse quand un LLM écrit du Liquid, et la plus embarrassante à livrer.

---

## C. Le REPL Liquid — l'outil le plus sous-utilisé du métier

```bash
shopify theme console
shopify theme console --url /products/le-produit-qui-bugue
shopify theme console --url /collections/toutes --store maboutique.myshopify.com
```

Un terminal interactif qui évalue du Liquid **sur les données réelles du store**, avec le contexte de la page fournie par `--url` (indispensable, car beaucoup d'objets sont contextuels).

### Pourquoi c'est décisif

Sans lui, tu **supposes** ce que contient `product.metafields.custom.care`. Avec lui, tu le **vois**. La différence entre supposer et voir, c'est deux heures de recherche.

### Les requêtes qui règlent le plus de bugs

```liquid
{{ product.metafields.custom | json }}          # le metafield existe-t-il vraiment ?
{{ product.variants | map: 'title' | json }}    # quelles variantes existent
{{ product.selected_or_first_available_variant | json }}
{{ product.options_with_values | json }}        # structure des options
{{ collection.products | size }}                # combien de produits réellement
{{ cart.items | json }}                         # état du panier, clés de lignes
{{ shop.metafields | json }}
{{ localization | json }}                       # marché et devise actifs
{{ template | json }}                           # quel template est réellement rendu
{{ request | json }}                            # dont design_mode, host, path
```

### Trois scénarios types

**« Le champ d'entretien est vide sur certains produits »**
```bash
shopify theme console --url /products/produit-ok
> {{ product.metafields.custom.care | json }}
shopify theme console --url /products/produit-casse
> {{ product.metafields.custom.care | json }}
```
Si le second renvoie `null`, ce n'est pas un bug de code : la donnée n'existe pas. Le correctif est une garde `{% if %}`, et une information au client sur les produits à compléter.

**« Il manque des produits dans la collection »**
```bash
> {{ collection.products | size }}
```
Si la valeur est bien supérieure à ce qui s'affiche et que l'affichage plafonne à 50 → limite de boucle Liquid.

**« Le prix ne se met pas à jour »**
```bash
shopify theme console --url /products/xxx
> {{ product.options_with_values | json }}
> {{ product.variants | json }}
```
Tu compares la structure réelle avec ce que le JavaScript du thème attend.

⚠️ Le REPL nécessite un accès au store (Theme Access App ou compte collaborateur), comme les autres commandes CLI.

---

## D. Les commandes CLI du debug

```bash
# lint complet : syntaxe, schémas, filtres dépréciés
shopify theme check
shopify theme check --fail-level error

# reproduire en local avec rechargement à chaud
shopify theme dev --store maboutique.myshopify.com

# REPL Liquid avec contexte de page
shopify theme console --url /products/xxx

# lister les thèmes (retrouver une sauvegarde, un ancien thème)
shopify theme list

# récupérer un ANCIEN thème pour comparaison
shopify theme pull --theme {{id_ancien}} --path ./theme-sain

# pousser uniquement le fichier corrigé sur le thème de dev
shopify theme push --theme {{id_dev}} --only sections/product-form.liquid

# lien de preview à envoyer au client
shopify theme share
```

La commande `pull --theme {{id_ancien}} --path ./theme-sain` est celle qui résout le plus vite les régressions post-mise à jour : tu obtiens deux répertoires comparables, et `diff` fait le reste.

```bash
diff -rq ./theme-sain ./theme-casse | head -40
diff -u ./theme-sain/sections/main-product.liquid ./theme-casse/sections/main-product.liquid
```

---

## E. Workflows complets

### Cas 1 — « Le panier ne fonctionne plus »

```
1. Navigateur (toi)   → reproduire, ouvrir Network, filtrer "cart"
2. Network            → statut, payload, réponse. Souvent la cause est visible ici
3. Dev MCP            → vérifier le contrat de l'endpoint utilisé
4. CLI                → theme pull, git init, tag baseline
5. Claude Code        → localiser le code du panier, 3 hypothèses
6. REPL               → {{ cart.items | json }} : les clés de lignes correspondent-elles ?
7. Test d'isolation   → le bug existe-t-il sur Dawn en preview ?
8. Correction         → un commit
9. Dev MCP            → validate_theme
10. CLI               → theme check, push --unpublished, share
11. Toi               → test complet du parcours d'achat, appareil réel
```

### Cas 2 — « Depuis la mise à jour, ma page produit est cassée »

```
1. shopify theme list                        → l'ancien thème existe-t-il encore ?
2. pull des deux thèmes dans deux répertoires
3. diff -rq                                  → périmètre des différences
4. Claude Code (prompt 7)                    → différences classées par pertinence
5. Identification des personnalisations perdues
6. Réapplication une par une, un commit chacune
7. Test après chaque commit
```

Si l'ancien thème a été supprimé du store : dis-le immédiatement au client. Il ne s'agit plus d'une restauration mais d'une reconstruction, le temps n'est pas le même, et le prix non plus.

### Cas 3 — « Ajoute une nouvelle collection » (encore)

Même réponse qu'en Phase 1 : ce n'est pas une tâche de thème. C'est une opération d'administration que le client fait en trente secondes. Tu ne branches pas un serveur MCP Admin non officiel sur le store d'un client pour ça.

---

## F. Sécurité — rappels non négociables

1. Theme Access App par défaut ; compte collaborateur limité si tu dois voir les applications.
2. Aucun serveur MCP Admin communautaire sur un store client.
3. Aucune désinstallation d'application pour tester — la neutralisation se fait sur la copie de dev.
4. Le code de débogage (`{{ x | json }}`, `console.log`, blocs `<pre>`) sort du thème avant le commit final. Un dump d'objet oublié en production est une fuite de données.
5. Rien n'est publié sans accord écrit.
