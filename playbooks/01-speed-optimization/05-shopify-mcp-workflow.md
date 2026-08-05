# 05 — Shopify MCP Workflow

Explication pratique. Ce fichier existe parce que « Shopify MCP » désigne plusieurs choses différentes et que les confondre te fera perdre du temps — ou casser quelque chose.

---

## A. MCP = quoi ?

**MCP (Model Context Protocol)** est un standard ouvert qui permet à un assistant IA d'appeler des outils externes. Ce n'est pas une technologie Shopify. Shopify se contente de publier des **serveurs** MCP.

À ce jour, l'écosystème Shopify comprend :

| Serveur | À qui il sert | Auth | Utile en Phase 1 |
|---|---|---|---|
| **Dev MCP** (`@shopify/dev-mcp`, dans le Shopify AI Toolkit) | Développeurs. Doc, schémas GraphQL, validation Liquid/thème | Aucune | ✅ **C'est celui que tu installes** |
| **Storefront MCP** | Agents d'achat. Endpoint public sur chaque store : recherche produit, panier, politiques | Aucune | 🟡 Marginal |
| **Customer Account MCP** | L'acheteur connecté : suivi de commande, retours | OAuth client | ❌ |
| **Checkout MCP** | Paiement agentique | — | ❌ |
| **Catalog MCP** | Découverte produit inter-marchands | — | ❌ |
| Serveurs **Admin** communautaires (`npx shopify-mcp`, etc.) | Wrappers non officiels de l'Admin API | Token Admin | ❌ **Interdit sur un store client** |

**La règle Phase 1 : tu installes le Dev MCP, et rien d'autre.**

---

## B. MCP = quand ?

Le Dev MCP sert dans exactement quatre situations :

1. **Vérifier une balise, un filtre ou un objet Liquid** avant de l'utiliser — au lieu de faire confiance à la mémoire du modèle.
2. **Valider du Liquid généré** (`validate_theme`) : détecte les hallucinations, la syntaxe invalide, les références incorrectes.
3. **Lire la doc à jour** sur un point précis (`search_docs_chunks`) : comportement de `image_tag`, propriétés de `section`, règles de Theme Check.
4. **Valider une requête GraphQL** si tu touches à l'Admin API (rare en Phase 1, utile si tu veux extraire les métriques de performance).

---

## C. MCP ≠ quoi ?

Ce que le Dev MCP **ne fait pas**, et que beaucoup croient :

- ❌ Il **ne lit pas le thème du client**. C'est le rôle du CLI (`theme pull`).
- ❌ Il **ne pousse rien** sur un store.
- ❌ Il **ne mesure aucune performance**. Aucun Lighthouse, aucun RUM.
- ❌ Il **n'accède ni aux commandes, ni aux clients, ni aux apps installées**.
- ❌ Il **ne remplace pas ta lecture du code**.

Corollaire de sécurité : le Dev MCP est intrinsèquement sûr sur une mission client, parce qu'il ne peut rien atteindre. C'est précisément pour ça qu'il est le seul autorisé.

---

## D. Tableau comparatif

| | **Shopify Dev MCP** | **Shopify CLI** | **Shopify Admin** | **Admin API (GraphQL)** | **Claude Code** |
|---|---|---|---|---|---|
| Nature | Serveur de doc/validation pour IA | Outil ligne de commande | Interface web marchand | API programmatique | Agent de codage |
| Lit le thème | ❌ | ✅ `theme pull` | ✅ éditeur de code | ✅ ressource Asset | ✅ fichiers locaux |
| Écrit le thème | ❌ | ✅ `theme push` | ✅ | ✅ | ✅ en local |
| Voit les apps installées | ❌ | ❌ | ✅ | ✅ | ❌ |
| Voit le RUM / Core Web Vitals | ❌ | ❌ | ✅ Web Performance | 🟡 partiel (versions unstable) | ❌ |
| Doc & schémas à jour | ✅ | 🟡 | ❌ | ❌ | 🟡 mémoire |
| Valide le Liquid | ✅ | ✅ `theme check` | ❌ | ❌ | via les deux |
| Risque en production | Nul | **Élevé** si mal utilisé | Élevé | Élevé | Dépend des permissions |
| Auth requise | Aucune | Theme Access / collaborateur | Compte | Token | — |

**Lecture du tableau :** le CLI est ton bras, l'Admin est tes yeux sur le business, le Dev MCP est ta documentation, Claude Code est ton exécutant. Aucun ne remplace un autre.

---

## E. Workflows concrets

### Cas 1 — « Mon site est lent sur mobile »

```
1. Admin (toi)      → Web Performance Dashboard : P75 LCP/INP/CLS par type de page
2. Chrome (toi)     → Lighthouse ×3 + DevTools : élément LCP, long tasks, HAR
3. CLI              → shopify theme pull   +  git init + tag baseline
4. Claude Code      → indexation + diagnostic (lecture seule)
5. Dev MCP          → vérifier le comportement exact de image_tag / preload / section.index
6. Claude Code      → plan P0→P3, que TU valides
7. Claude Code      → correctifs un par un, commits atomiques
8. Dev MCP          → validate_theme sur chaque fichier modifié
9. CLI              → theme check --fail-level error, puis push --unpublished
10. Chrome (toi)    → mesure after, conditions identiques
11. Claude Code     → rédaction du rapport à partir de TES chiffres
```

Le Dev MCP intervient à deux moments seulement : **avant** d'écrire (vérifier) et **après** avoir écrit (valider). Il n'est jamais le point d'entrée.

### Cas 2 — « Ajoute une nouvelle collection »

Demande fréquente en cours de mission, révélatrice du bon usage des outils.

- Ce n'est **pas** une tâche de thème → ni CLI, ni Claude Code, ni Dev MCP.
- C'est une opération **Admin**. Le client la fait en 30 secondes, ou tu la fais si tu as la permission `Products`.
- Un serveur MCP Admin communautaire pourrait techniquement le faire — mais tu lui donnerais un token Admin sur le store d'un client pour économiser 30 secondes. **Non.**

Réponse à formuler : *« Ça se fait dans l'admin, je vous montre. Si vous voulez que je le fasse, il me faut la permission Produits — mais pour ma mission actuelle, je n'en ai pas besoin. »*

Ce genre de refus construit ta réputation plus que n'importe quel correctif.

### Cas 3 — « Le panier ne fonctionne plus depuis ta modification »

- **Étape 1** : `git diff baseline..HEAD -- assets/ sections/` → qu'ai-je touché qui concerne le panier ?
- **Étape 2** : console navigateur → erreur JS ? Requête AJAX en échec ?
- **Étape 3** : Dev MCP `search_docs_chunks` sur la Cart AJAX API pour vérifier la forme attendue de la requête
- **Étape 4** : si le doute persiste → `git revert` du commit suspect, push, vérification
- **Étape 5** : seulement ensuite, correction propre

Le rollback passe avant le diagnostic quand un parcours d'achat est cassé. Le client perd de l'argent pendant que tu réfléchis.

### Cas 4 — Extraire les métriques de performance par API

Shopify expose des données de performance via l'Admin API GraphQL (`PerformanceMetrics`, `PerformanceEvents`), mais ces requêtes ont d'abord été disponibles en version `unstable`. C'est une piste pour automatiser du reporting sur un retainer — vérifie la disponibilité de la version stable avant de la vendre. Utilise `validate_graphql_codeblocks` du Dev MCP avant d'écrire quoi que ce soit.

---

## F. Sécurité et permissions — les règles

1. **Le principe du moindre privilège.** Theme Access App par défaut. Compte collaborateur limité si tu as besoin de voir le dashboard. Jamais « full permissions ».
2. **Aucun serveur MCP non officiel sur un store client.** Un wrapper Admin communautaire tourne avec un token qui peut créer des remises, modifier des prix, rembourser. Le risque n'est pas hypothétique.
3. **Jamais d'écriture automatique.** Même si un jour tu utilises un MCP capable d'écrire, aucune action d'écriture ne doit s'exécuter sans validation humaine explicite.
4. **Les credentials ne sont jamais dans le dépôt.** Variables d'environnement ou gestionnaire de mots de passe. La règle `deny` sur `Read(./**/.env)` dans `.claude/settings.json` est une seconde barrière.
5. **Révocation en fin de mission.** Tu envoies au client un message lui demandant de révoquer ton accès Theme Access une fois la garantie écoulée. Ça surprend, ça marque, et c'est la bonne pratique.
6. **Confidentialité.** Le code et les données du client ne sortent pas de son dossier. Un dépôt Git par client, jamais public.

---

## G. Installation (rappel)

`.mcp.json` à la racine du workspace :

```json
{
  "mcpServers": {
    "shopify-dev": {
      "command": "npx",
      "args": ["-y", "@shopify/dev-mcp@latest"]
    }
  }
}
```

Vérification dans Claude Code : `/mcp`. Outils attendus : `learn_shopify_api`, `search_docs_chunks`, `validate_theme`, `validate_graphql_codeblocks`.

Note : `learn_shopify_api` doit être appelé en premier — il retourne un `conversationId` requis par les autres outils. En pratique, dis simplement à Claude Code : *« utilise le Dev MCP, API `liquid` »* et il enchaînera correctement.
