# 03 — Audit Methodology

Le diagnostic est ce qui sépare un professionnel d'un exécutant. Cette méthodologie est fixe : tu l'appliques identiquement avant et après, sinon ta comparaison ne vaut rien.

---

## A. La distinction qui structure tout : terrain vs labo

| | **Terrain (field / RUM)** | **Labo (lab)** |
|---|---|---|
| Source | Vrais visiteurs, vrais appareils | Ta machine, simulation |
| Outils | Web Performance Dashboard Shopify, CrUX (haut de PageSpeed Insights), Search Console | Lighthouse, DevTools, WebPageTest |
| Ce que ça mesure | La réalité vécue | Une hypothèse reproductible |
| Latence | Jusqu'à ~36 h de délai, fenêtre de 28–30 jours | Immédiat |
| Sert à | **Prouver** un problème et un résultat | **Trouver** la cause |
| Ce que Google utilise pour le classement | ✅ | ❌ |

**La règle :** le terrain décide *s'il y a un problème*. Le labo décide *d'où il vient*. Un score Lighthouse qui monte pendant que le RUM stagne signifie que tu as optimisé pour l'outil, pas pour l'utilisateur.

**À dire au client, mot pour mot :** *« Les données terrain sont calculées sur une fenêtre glissante de 30 jours. Après publication, il faut attendre plusieurs semaines pour voir le déplacement complet. Les mesures que je vous livre le jour de la livraison sont des mesures de laboratoire, dans des conditions identiques avant et après. »*

---

## B. Les métriques

### Core Web Vitals — mesurées au **75ᵉ centile** des sessions réelles

| Métrique | Ce que c'est | Bon | À améliorer | Mauvais |
|---|---|---|---|---|
| **LCP** — Largest Contentful Paint | Instant où le plus gros élément visible est peint | ≤ 2,5 s | 2,5–4 s | > 4 s |
| **INP** — Interaction to Next Paint | Latence de la pire interaction de la session | ≤ 200 ms | 200–500 ms | > 500 ms |
| **CLS** — Cumulative Layout Shift | Instabilité visuelle cumulée | ≤ 0,1 | 0,1–0,25 | > 0,25 |

Le P75 signifie : **c'est ton quart de visiteurs les plus lents qui fixe ton score.** Une moyenne correcte peut cacher un désastre mobile. C'est un excellent argument commercial et c'est vrai.

### Métriques secondaires (diagnostic, pas objectifs)

| Métrique | Utilité pour toi |
|---|---|
| **TTFB** — Time To First Byte | Sur Shopify tu ne le contrôles quasiment pas. Sert à écarter une cause. Un TTFB très élevé peut venir d'un Liquid lourd → `shopify theme profile` |
| **FCP** — First Contentful Paint | Détecte le render-blocking CSS/JS |
| **TBT** — Total Blocking Time | Proxy labo de l'INP. C'est TBT que tu optimises en labo |
| **Speed Index** | Perception de vitesse de remplissage |
| **Poids total / nombre de requêtes** | Argument visuel imparable dans un rapport |

---

## C. Le protocole de mesure (à respecter à la lettre)

### Étape 1 — Terrain, avant tout

Admin Shopify → **Online Store → Themes** → bannière de performance en haut de page.
Ou : **Analytics → Reports → Web performance**.

Prérequis : permission staff `Reports`, et la protection par mot de passe de la boutique doit être retirée pour que le RUM se remplisse.

Relève, et **fais une capture d'écran horodatée** :
- P75 LCP / INP / CLS sur 30 jours
- La même chose ventilée **par type de page** (home / product / collection)
- Si possible : par appareil

Puis : PageSpeed Insights sur les 3 URLs → le bloc du haut (« Découvrez ce que vivent vos utilisateurs réels ») est la donnée CrUX. Elle est publique, indépendante de Shopify, et elle fait un excellent effet dans un rapport.

### Étape 2 — Labo, conditions figées

Écris ces conditions dans le rapport et ne les change **jamais** entre le before et le after :

```
Navigateur   : Chrome vX, fenêtre de navigation privée, aucune extension
Outil        : Lighthouse (DevTools), mode Navigation
Device       : Mobile
Throttling   : Simulated Slow 4G, CPU 4× slowdown (réglage par défaut)
Runs         : 3 par URL → on retient la MÉDIANE
Cache        : vidé entre chaque run
Heure        : notée
URLs         : home / une collection représentative / un produit représentatif
```

Archive les JSON Lighthouse dans `01_audit/baseline/`. Ils sont ta preuve.

```bash
npx lighthouse https://store.com/ \
  --preset=desktop=false --form-factor=mobile \
  --output=json --output-path=./01_audit/baseline/home-run1.json
```

### Étape 3 — Trouver l'élément LCP

C'est l'étape la plus rentable de tout l'audit. Trois méthodes, par ordre de rapidité :

1. **Lighthouse** → section « Largest Contentful Paint element » : il te donne le sélecteur.
2. **DevTools → Performance** → enregistrer un chargement → dans la timeline, le marqueur **LCP** ; clic dessus → « Related Node ».
3. **Console**, sans outil :

```js
new PerformanceObserver((list) => {
  const e = list.getEntries().at(-1);
  console.log('LCP', e.startTime.toFixed(0)+'ms', e.element, e.url || '');
}).observe({type:'largest-contentful-paint', buffered:true});
```

Note dans ton audit : *quel* élément, *depuis quel fichier Liquid* il est rendu, et *comment* il est chargé (lazy ? preload ? dimensions ?).

### Étape 4 — Trouver les sources de CLS

```js
new PerformanceObserver((list) => {
  for (const e of list.getEntries()) {
    if (!e.hadRecentInput && e.value > 0.01) {
      console.log('shift', e.value.toFixed(3), e.sources.map(s => s.node));
    }
  }
}).observe({type:'layout-shift', buffered:true});
```

Les 4 coupables habituels sur Shopify : image sans `width`/`height`, bannière d'annonce injectée par une app, widget d'avis (Judge.me, Loox) qui se monte après coup, et le swap de police web.

### Étape 5 — Trouver ce qui bloque le thread principal (INP / TBT)

DevTools → **Performance** → recharger → repérer les **Long Tasks** (barres rouges > 50 ms). Clic droit sur une tâche → « Show in Call Tree » → tu remontes au fichier source. Note l'origine : ton thème ? une app ? un pixel marketing ?

### Étape 6 — Inventaire réseau

DevTools → **Network**, cache désactivé, throttling Slow 4G :
- Trie par **Size** → les 10 plus grosses ressources
- Trie par **Domain** → sépare ce qui vient de `cdn.shopify.com` (toi) et du reste (tiers)
- Exporte le **HAR** dans `01_audit/baseline/`

Produis ce tableau — c'est le plus percutant de tout le rapport :

| Origine | Fichier | Poids | Bloquant ? | Page(s) | App associée |
|---|---|---|---|---|---|

### Étape 7 — Code mort

DevTools → `Cmd/Ctrl+Shift+P` → **Coverage** → recharger → interagir.
Tu obtiens le % de CSS et de JS jamais exécuté. Sur un thème premium chargé d'apps, 60–80 % de CSS inutilisé est courant. À citer tel quel dans le rapport.

### Étape 8 — Profiling Liquid

```bash
shopify theme profile --url /products/exemple
```

Sous-utilisé par la concurrence. Révèle les sections dont le **rendu serveur** coûte cher : boucles sur `all_products`, `for` imbriqués, appels de snippets dans des boucles longues. Directement relié au TTFB.

### Étape 9 — Lecture du code

Commande à Claude Code (voir `04-claude-code-workflow.md`), mais tu vérifies toi-même :

```bash
grep -rn "<script" layout/ sections/ snippets/ | grep -v "defer\|async\|type=\"application/ld+json\"\|type=\"application/json\""
grep -rn "loading=\"lazy\"" sections/ | head -30      # lazy au-dessus de la ligne de flottaison ?
grep -rn "jquery\|slick\|owl\|bootstrap" assets/ layout/
grep -rn "img_url\|img_tag" .                          # filtres dépréciés
grep -rn "all_products\|for product in collections" sections/ snippets/
ls -lhS assets/ | head -20                             # les plus gros assets
```

---

## D. Le tableau de synthèse de l'audit

Chaque constat produit **une ligne**, jamais un paragraphe :

| ID | Constat | Preuve | Métrique touchée | Impact | Effort | Priorité | Risque |
|---|---|---|---|---|---|---|---|
| P-01 | Image hero en `loading="lazy"` | `sections/image-banner.liquid:34` + capture Lighthouse | LCP | Élevé | 15 min | **P0** | Faible |
| P-02 | jQuery 3.6 chargé, utilisé par 1 fonction | Network + `grep` | TBT/INP | Élevé | 3 h | P1 | Moyen |
| P-03 | Widget avis sans hauteur réservée | Layout-shift observer | CLS | Moyen | 30 min | P1 | Faible |

**Règles de priorisation :**
- **P0** : casse une Core Web Vital, correction < 1 h, risque faible → à faire tout de suite
- **P1** : gain mesurable, risque maîtrisé
- **P2** : gain réel mais effort important ou risque de régression
- **P3** : cosmétique, ou dépend d'une décision du client (retirer une app)

Une ligne sans preuve n'entre pas dans le rapport. Si tu ne peux pas la sourcer, elle est marquée **« À CONFIRMER PAR MESURE »**.

---

## E. Ce que tu ne pourras pas corriger

Section obligatoire dans chaque audit. Elle te protège et elle rassure.

- Le **checkout** Shopify (sauf Plus + scripts, hors scope)
- Le **TTFB** infrastructure Shopify
- Le **code chargé à distance** par une app tierce (tu peux différer son injection, pas réécrire son contenu)
- Les **pixels marketing** que le client refuse de retirer
- Le contenu généré par un **page builder**
- Les images uploadées par le marchand dans des dimensions absurdes — tu peux le corriger une fois, pas empêcher que ça recommence (→ upsell retainer)
