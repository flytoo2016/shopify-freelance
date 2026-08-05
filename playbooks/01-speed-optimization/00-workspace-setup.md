# 00 — Workspace Setup

Objectif : passer d'une machine vide à un poste de travail capable de recevoir une mission Shopify le jour même.

---

## 1. Prérequis machine

| Outil | Version | Vérification |
|---|---|---|
| Node.js | **22.12+** (requis par Shopify CLI 4.0, mai 2026) | `node -v` |
| Git | **2.28+** | `git --version` |
| Shopify CLI | dernière | `shopify version` |
| Chrome | dernière (pour Lighthouse/DevTools) | — |
| VS Code | dernière | — |

```bash
npm install -g @shopify/cli
shopify version
```

Extensions VS Code utiles : **Shopify Liquid** (officielle, inclut le Language Server + Theme Check), **GitLens**, **EditorConfig**.

---

## 2. Arborescence

```bash
mkdir -p D:\shopify-freelance\{clients,shopify-system}
cd D:\shopify-freelance\shopify-system
mkdir -p freelance/{offers,pricing,proposals,questionnaires,delivery}
mkdir -p knowledge/{performance,liquid,shopify}
```

Puis copie dans `.claude/` le `CLAUDE.md` et les agents fournis dans `claude/` de ce dossier.

### Créer un client

```bash
CLIENT=acme-store
mkdir -p clients/$CLIENT/{00_brief,01_audit/{baseline,after},04_development,07_delivery,docs}
```

---

## 3. Récupérer le thème du client

**Étape 1 — obtenir un accès.** Deux options, par ordre de préférence :

- **Theme Access App** : le client installe l'app *Theme Access* depuis l'App Store, crée un mot de passe à ton nom, te l'envoie. Cet accès ne donne que les fichiers du thème via le CLI. C'est l'option la plus propre et la plus rassurante pour le client.
- **Compte collaborateur** (via ton Partner Dashboard) : nécessaire si tu dois voir le dashboard performance ou la liste des apps. Demande uniquement `Themes`, `Apps`, `Reports`. Note : un collaborateur inactif 90 jours perd automatiquement son accès.

**Étape 2 — dupliquer avant de toucher.** Dans l'admin : Online Store → Themes → ⋯ → Duplicate. Nomme la copie `BACKUP — YYYY-MM-DD — avant optimisation`. Ce backup ne sera jamais modifié.

**Étape 3 — pull en local.**

```bash
cd clients/acme-store/04_development
shopify theme pull --store acme-store.myshopify.com
# avec Theme Access App :
shopify theme pull --store acme-store.myshopify.com --password shptka_xxx
```

**Étape 4 — Git tout de suite.**

```bash
cd theme
git init
git add .
git commit -m "chore: baseline — theme as received $(date +%F)"
git tag baseline
```

Ce tag est ton filet de sécurité absolu. `git diff baseline` te donnera à tout moment l'intégralité de ce que tu as changé.

### `.gitignore` minimal

```gitignore
.shopify/
node_modules/
*.log
.DS_Store
# settings_data.json intentionnellement absent -- voir SECURITY.md
```

> Si tu choisis de le versionner (utile pour comparer), fais-le dans un commit isolé et ne le pousse **jamais** vers le store : `shopify theme push --ignore config/settings_data.json`.

---

## 4. Commandes CLI du quotidien

```bash
# serveur local + hot reload (outil de dev, jamais dans un pipeline)
shopify theme dev --store acme-store.myshopify.com

# lister les thèmes et leurs IDs
shopify theme list

# pousser vers un NOUVEAU thème non publié (le mode par défaut du freelance)
shopify theme push --unpublished --json

# pousser vers un thème de dev existant
shopify theme push --theme 123456789 --ignore config/settings_data.json

# pousser un seul fichier
shopify theme push --theme 123456789 --only sections/hero.liquid

# bloquer le push si Theme Check remonte une erreur
shopify theme push --theme 123456789 --strict

# lint
shopify theme check --fail-level error

# profiling du rendu Liquid d'une page — sous-utilisé, très utile
shopify theme profile --url /products/exemple

# lien de preview partageable
shopify theme share

# publier (promeut un thème DÉJÀ poussé — jamais du code local)
shopify theme publish --theme 123456789
```

**Trois pièges à mémoriser :**
- `--nodelete` protège les fichiers **distants** sur un push, et les fichiers **locaux** sur un pull.
- `theme publish` ne publie pas ton code local : il promeut un thème déjà présent sur le store. La séquence est toujours *push puis publish par ID*.
- `--strict` ne bloque que sur les **erreurs**, pas sur les warnings.
- `--allow-live` existe. Ne l'utilise pas en Phase 1.

---

## 5. Brancher le Shopify Dev MCP sur Claude Code

Crée `.mcp.json` à la racine du workspace (scope projet, versionnable) :

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

Lance Claude Code depuis la racine du workspace, puis vérifie avec `/mcp`. Tu dois voir les outils `learn_shopify_api`, `search_docs_chunks`, `validate_theme`, `validate_graphql_codeblocks`.

Ce serveur ne touche pas au store du client : il donne la documentation et valide le Liquid généré. Détails dans `05-shopify-mcp-workflow.md`.

---

## 6. Permissions Claude Code

`.claude/settings.json` — le principe : autoriser la lecture largement, encadrer l'écriture, interdire la production.

```json
{
  "permissions": {
    "allow": [
      "Read", "Grep", "Glob",
      "Bash(git status:*)", "Bash(git diff:*)", "Bash(git log:*)",
      "Bash(shopify theme check:*)",
      "Bash(shopify theme dev:*)"
    ],
    "ask": [
      "Edit", "Write",
      "Bash(git commit:*)",
      "Bash(shopify theme push:*)"
    ],
    "deny": [
      "Bash(shopify theme push --allow-live:*)",
      "Bash(shopify theme publish:*)",
      "Bash(shopify theme delete:*)",
      "Bash(git push --force:*)",
      "Read(./**/.env)",
      "Read(./**/*credentials*)"
    ]
  }
}
```

Les règles `deny` sont évaluées en premier et gagnent toujours. C'est ce qui rend impossible une publication accidentelle en production, même si tu travailles vite ou en mode automatique.

---

## 7. Slash commands utiles

`.claude/commands/audit-perf.md` :

```markdown
---
description: Audit performance complet du thème courant (lecture seule)
allowed-tools: Read, Grep, Glob, Bash(shopify theme check:*)
---
Réalise un audit performance en LECTURE SEULE du thème dans ce répertoire.
Ne modifie aucun fichier.
Suis la méthodologie de knowledge/performance/audit-methodology.md.
Produis clients/$ARGUMENTS/01_audit/performance-audit.md avec :
1. Inventaire (layout, templates JSON, assets, scripts tiers détectés)
2. Hypothèses LCP / CLS / INP par template, chaque hypothèse liée à un fichier:ligne
3. Tableau des correctifs classés P0→P3 avec impact estimé et risque
4. Ce qui NE PEUT PAS être corrigé côté thème
Marque toute affirmation non vérifiable par la lecture du code comme « À CONFIRMER PAR MESURE ».
```

Utilisation : `/audit-perf acme-store`

---

## 8. Vérification finale

```
[ ] node -v ≥ 22.12
[ ] shopify version répond
[ ] shopify theme list fonctionne sur un store de test
[ ] /mcp affiche shopify-dev dans Claude Code
[ ] .claude/CLAUDE.md en place
[ ] .claude/settings.json avec les règles deny
[ ] un dossier client créé avec git init + tag baseline
```
