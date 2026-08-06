# Shopify PageSpeed Pipeline

Mesure de performance reproductible pour missions Shopify freelance.
Trois scripts, une tâche chacun : collecter, normaliser, comparer.

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

## Les trois scripts

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
