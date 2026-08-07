# Shopify PageSpeed Pipeline

Mesure de performance reproductible pour missions Shopify freelance.
Un script, une tâche : collecter, normaliser, comparer — plus deux scripts de
secours pour les sites qui bloquent l'API PSI (parser HTML, médiane).

## Prérequis

- **Node.js ≥ 22.0.0**
- **Une clé API Google PageSpeed Insights** — PageSpeed Insights API activée dans
  Google Cloud Console. La même clé couvre aussi CrUX.

## Installation

```bash
cp .env.example .env
# Ouvre .env et renseigne PAGESPEED_API_KEY=ta_clé
npm install
```

---

## Les scripts

### 1. `collect.js` — collecter les données brutes

```bash
node collect.js {{URL}}
```

Exemple :

```bash
node collect.js https://www.exemple-client.com/
```

Produit dans `snapshots/` :

```
YYYYMMDD-HHMMSS-slug-psi-mobile.json    ← lab data, mobile
YYYYMMDD-HHMMSS-slug-psi-desktop.json   ← lab data, desktop
YYYYMMDD-HHMMSS-slug-crux.json          ← terrain (available:false si trafic insuffisant)
```

**Durée** : 30 à 60 secondes (Lighthouse fait une analyse complète).

**Médiane sur plusieurs runs (recommandé pour une baseline fiable)**

```bash
node collect.js {{URL}} --runs 3
```

Lance 3 mesures PSI consécutives et calcule la médiane champ par champ. Produit en plus
des bruts individuels un fichier `*-psi-mobile-median.json` et `*-psi-desktop-median.json`
à utiliser directement dans `compare.js`.

**Limite** : PSI peut servir des réponses depuis son cache entre deux runs rapprochés.
3 runs ne garantissent pas 3 mesures indépendantes — ils réduisent l'effet des pics
ponctuels sans les éliminer complètement.

**Maximum** : 5 runs (`--runs 5`).

**Quota** : 2 appels PSI + 1 appel CrUX par exécution.
PSI : 25 000/jour · CrUX : 1 500/jour.

**Sites qui peuvent bloquer PSI** : certains sites protègent leurs pages contre les
crawlers automatisés. Si tu obtiens un timeout ou un score nul, vérifie d'abord sur
[pagespeed.web.dev](https://pagespeed.web.dev) — si PSI n'y fonctionne pas non plus,
le script ne pourra pas analyser ce site.

### 2. `normalize.js` — extraire les métriques utiles

```bash
node normalize.js snapshots/YYYYMMDD-HHMMSS-slug-psi-mobile.json
```

Produit :

```
YYYYMMDD-HHMMSS-slug-normalized-mobile.json
```

Contient : scores (performance, accessibilité, bonnes pratiques, SEO), Core Web Vitals
(LCP, TBT, CLS, FCP, TTI), poids et requêtes.

**Les valeurs absentes ressortent à `null`, jamais à `0`.**

### 3. `compare.js` — rapport avant/après

```bash
node compare.js {{baseline-normalized.json}} {{after-normalized.json}}
```

Exemple :

```bash
node compare.js \
  snapshots/20260801-090000-slug-normalized-mobile.json \
  snapshots/20260808-090000-slug-normalized-mobile.json
```

Produit :

```
snapshots/compare-slug-YYYYMMDD-HHMMSS.md
```

Le rapport est en français, lisible par un client non technique. Il inclut une section
« Lecture honnête » qui rappelle que ces données sont de laboratoire, pas des données
terrain.

**Règle** : comparer deux snapshots de la même URL et de la même stratégie. Le script
avertit si les stratégies ou les URLs diffèrent.

### 4. `parse-psi-html.js` — sites qui bloquent l'API PSI

Quand `collect.js` retourne un timeout, utiliser ce workflow manuel.

**Convention de nommage obligatoire :**

```
{slug}-{stratégie}-{YYYYMMDD-HHMM}.html

exemple-mobile-20260807-0954.html
exemple-desktop-20260807-0953.html
```

Le parser lit la stratégie et le timestamp depuis le nom de fichier — le DOM charge les
deux rapports de façon asynchrone et n'est pas fiable pour ça. Un nom non conforme
produit `stratégie: null` et des fichiers `*-unknown-*.json`.

**Sauvegarder la page depuis Chrome :**

1. Ouvrir pagespeed.web.dev, entrer l'URL, attendre les résultats complets
2. `F12 → Console → copy(document.documentElement.outerHTML)`
3. Coller dans un fichier `.html` selon la convention ci-dessus
4. Basculer Mobile ↔ Bureau, recommencer pour l'autre stratégie

**Parser :**

```bash
node parse-psi-html.js snapshots\exemple-mobile-20260807-0954.html --out snapshots\
node parse-psi-html.js snapshots\exemple-desktop-20260807-0953.html --out snapshots\
```

**Produit 3 fichiers JSON par capture**, soit 6 pour les deux stratégies :

```
exemple-com-psi-lab-mobile-20260807-0954.json
exemple-com-crux-url-mobile-20260807-0954.json
exemple-com-crux-origin-mobile-20260807-0954.json

exemple-com-psi-lab-desktop-20260807-0953.json
exemple-com-crux-url-desktop-20260807-0953.json
exemple-com-crux-origin-desktop-20260807-0953.json
```

Une page PSI sauvegardée après bascule d'onglet contient **les deux** stratégies : le
parser isole le panneau demandé (rapport Lighthouse **et** bloc CrUX). Le CrUX est
spécifique au form factor — d'où le suffixe de stratégie sur ces fichiers aussi.

Les fichiers `*-psi-lab-*.json` se donnent directement à `compare.js` (structure
`meta` / `scores` / `vitals` identique à une sortie de `normalize.js`). Deux réserves :
**TTI**, **poids total** et **nombre de requêtes** ne sont pas extractibles du HTML et
ressortiront à `—` dans le rapport, tout comme la date de collecte.

**Note sur la variance PSI.** Un seul run n'est pas fiable pour un livrable client — le
LCP peut varier de ±50 % entre deux runs sans aucune modification du site. Faire 3 runs
et calculer la médiane avec `median-html.js`.

### 5. `median-html.js` — médiane sur N runs HTML

```bash
node median-html.js snapshots\exemple-com-psi-lab-mobile-*.json
```

Ou en listant les fichiers explicitement :

```bash
node median-html.js \
  snapshots\exemple-com-psi-lab-mobile-20260807-0954.json \
  snapshots\exemple-com-psi-lab-mobile-20260807-1230.json \
  snapshots\exemple-com-psi-lab-mobile-20260807-1800.json
```

Produit :

```
exemple-com-psi-lab-mobile-median.json
```

Minimum 2 fichiers requis. Stratégie déduite du premier fichier. Affiche les valeurs
brutes de chaque run avant la médiane.

### Workflow complet pour un site qui bloque l'API

```bash
# 3 runs mobile (espacés dans le temps)
node parse-psi-html.js snapshots\exemple-mobile-{ts1}.html --out snapshots\
node parse-psi-html.js snapshots\exemple-mobile-{ts2}.html --out snapshots\
node parse-psi-html.js snapshots\exemple-mobile-{ts3}.html --out snapshots\

# Médiane
node median-html.js snapshots\exemple-com-psi-lab-mobile-*.json

# Même chose pour desktop
# Rapport avant/après
node compare.js snapshots\exemple-com-psi-lab-mobile-median.json \
                snapshots\exemple-com-psi-lab-mobile-median-APRES.json
```

---

## Workflow typique sur une mission

```bash
# Avant optimisation — baseline
node collect.js https://www.client.com/products/produit-phare
node normalize.js snapshots/AVANT-slug-psi-mobile.json

# ... optimisation ...

# Après optimisation
node collect.js https://www.client.com/products/produit-phare
node normalize.js snapshots/APRES-slug-psi-mobile.json

# Rapport
node compare.js snapshots/AVANT-slug-normalized-mobile.json \
                snapshots/APRES-slug-normalized-mobile.json
```

## Sources de données

| Source | Ce qu'elle mesure | Quand l'utiliser |
|---|---|---|
| PSI / Lighthouse | Lab data — simulation contrôlée | Avant/après, diagnostic |
| CrUX (`crux.json`) | Terrain — vrais utilisateurs 28j | Confirmation terrain |

Les données lab et terrain **ne se comparent pas directement**.

CrUX est absent (`available:false`) si le trafic Chrome est insuffisant.

Les données terrain CrUX se mettent à jour une fois par jour — appeler l'API plusieurs
fois le même jour retourne le même résultat.

## Sécurité

La clé API est dans `.env`, ignoré par Git. **Ne jamais la commiter. Ne jamais la
partager dans un rapport.** Voir `.env.example` pour la structure attendue.

`snapshots/` est également ignoré par Git : il contient des URLs et des mesures de
stores clients, qui ne quittent pas le poste.
