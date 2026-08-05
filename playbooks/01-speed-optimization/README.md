# PHASE 1 — SHOPIFY SPEED OPTIMIZATION

> Document maître. Chaque section renvoie vers un fichier de travail détaillé.
> Statut : **PHASE 1 uniquement**. Les phases 2 à 5 ne sont pas ouvertes.

| Fichier | Rôle |
|---|---|
| `00-workspace-setup.md` | Installer et configurer VS Code + Claude Code + CLI + MCP + Git |
| `01-service-definition.md` | Ce que tu vends exactement, à qui, avec quelles limites |
| `02-client-questionnaire.md` | Questionnaire d'onboarding + demande d'accès |
| `03-audit-methodology.md` | Diagnostic : métriques, outils, protocole de mesure |
| `04-claude-code-workflow.md` | Prompts, agents, CLAUDE.md, règles de sécurité |
| `05-shopify-mcp-workflow.md` | MCP vs CLI vs Admin vs API — quoi utiliser quand |
| `06-optimization-playbook.md` | Catalogue des corrections (le cœur technique) |
| `07-testing-and-qa.md` | Protocole de test + Quality Gate bloquant |
| `08-report-templates.md` | Les 5 livrables client, prêts à remplir |
| `09-fiverr-offer.md` | Gig complet, 3 packages, FAQ, tags |
| `10-upwork-offer.md` | Positionnement, proposals, red flags |
| `11-pricing.md` | Grille beginner → expert, modèles de facturation |
| `12-delivery-checklist.md` | Checklist de livraison + rollback |
| `13-practice-project.md` | Mini-projet d'entraînement, sans client |
| `claude/CLAUDE.md` | Le CLAUDE.md du workspace |
| `claude/agents/*.md` | Les 4 sous-agents de la Phase 1 |
| `templates/*` | Fichiers vierges à copier par mission |

---

## 01 — Business Understanding

**Le client n'achète pas de la vitesse. Il achète du revenu qui fuit.**

La chaîne de valeur réelle, dans l'ordre où le client la ressent :

1. **Argent publicitaire brûlé.** Une boutique qui paie 1,20 € le clic et perd 20 % des sessions avant le premier rendu jette 20 % de son budget Meta/Google. C'est la douleur la plus vive et la plus facile à chiffrer.
2. **Taux de conversion mobile.** Le mobile représente typiquement 65–80 % du trafic d'une boutique DTC et convertit 2 à 3× moins bien que le desktop. Une partie de cet écart est de la friction technique.
3. **SEO.** Google évalue les Core Web Vitals sur des données terrain réelles au 75ᵉ centile. Ce n'est pas un facteur de classement dominant, mais c'est un différenciateur à égalité de contenu — et c'est un argument que les clients comprennent.
4. **Perception de marque.** Un site lent est perçu comme peu fiable. Cela affecte le panier moyen sur les produits chers.
5. **Panique déclenchée.** Le client vient te voir parce que : son score dans l'admin Shopify est passé au rouge, une agence lui a envoyé un audit alarmiste, ou ses ventes ont chuté après l'installation de trois apps.

**Ce que tu dois savoir avant de parler à un client**

- Le vieux « Shopify Speed Score » (Lighthouse simulé) a été remplacé en janvier 2024 par le **Web Performance Dashboard**, basé sur du RUM (données visiteurs réels). C'est cette donnée-là qui compte, pas PageSpeed Insights.
- Un score PageSpeed de 100/100 sur un store vide ne prouve rien. Le client ne le sait pas. Toi si.
- Tu ne contrôles ni le checkout Shopify, ni le CDN, ni le TTFB serveur. Ce que tu contrôles : le thème, les images, le JS, les apps, l'ordre de chargement.

Détail complet → `01-service-definition.md`

---

## 02 — Service Definition

**Nom de la prestation :** Shopify Store Speed Optimization (Core Web Vitals)

**Définition en une phrase (à utiliser partout) :**
> J'audite votre thème Shopify, j'identifie ce qui ralentit réellement le rendu pour vos visiteurs, je corrige le code sur un thème de développement, je mesure avant/après sur une méthodologie identique, et je vous livre un rapport que vous pouvez relire ligne par ligne.

**Dans le scope**
- Audit terrain (RUM Shopify) + labo (Lighthouse/PSI) sur 3 templates : home, collection, produit
- Optimisation images (dimensions, format, `loading`, `fetchpriority`, `srcset`, ratio réservé)
- CSS : suppression du render-blocking non critique, réduction du CSS mort
- JS : `defer`/`async`, suppression de librairies inutiles, import-on-interaction
- Fonts : `font-display`, preload maîtrisé, réduction du nombre de familles/graisses
- Audit des apps : identification du coût réel de chaque script tiers + recommandation
- Nettoyage du code mort laissé par des apps désinstallées
- Liquid : boucles coûteuses, appels redondants, rendu de sections
- Rapport avant/après + documentation des changements

**Hors scope (à écrire noir sur blanc dans chaque proposal)**
- Refonte design ou changement de thème
- Suppression d'apps (c'est une décision business du client — je recommande, il décide)
- Optimisation du checkout (contrôlé par Shopify)
- Garantie d'un score chiffré (voir « Common Mistakes »)
- Optimisation de l'hébergement / TTFB serveur (Shopify)
- Migration de thème vers Online Store 2.0

---

## 03 — Target Clients

| Segment | Signaux | Budget typique | Difficulté |
|---|---|---|---|
| **DTC mono-produit / dropshipping** | Thème premium (Shrine, Impulse), 15+ apps, gros budget ads | 150–500 € | Facile techniquement, client impatient |
| **Marque DTC en croissance** | 50k–500k €/an, thème customisé, dev précédent parti | 600–2 000 € | Le meilleur segment. Récurrence possible |
| **Agences en sous-traitance** | Cherchent un exécutant fiable, brief déjà écrit | 400–1 500 €/mission | Excellent flux, marge plus faible |
| **Boutique B2B / catalogue lourd** | 5 000+ SKU, collections lentes, filtres | 1 000–3 000 € | Technique, bien payé |

**À éviter au début**
- Shopify Plus avec Hydrogen / headless (autre métier)
- Client qui exige « score 90+ garanti »
- Boutique avec 40 apps et zéro budget pour en retirer
- Client sans accès admin (« mon développeur a disparu »)

---

## 04 — Client Requirements

Les 8 informations sans lesquelles tu ne démarres pas :

1. URL du store + mot de passe de preview si protégé
2. Nom exact du thème + version + s'il a été modifié
3. Liste des apps installées (capture d'écran de la page Apps)
4. Existence d'un thème de sauvegarde / duplication
5. Répartition du trafic mobile vs desktop (Analytics)
6. Les 3 pages qui comptent réellement pour le business
7. Accès : **Theme Access App** (préféré) ou compte collaborateur limité
8. Contraintes : promo en cours, période de pic, apps intouchables

Questionnaire complet → `02-client-questionnaire.md`

**Sur les accès — règle non négociable.**
Demande le **Theme Access App** de Shopify : elle génère un mot de passe qui ne donne accès qu'aux fichiers du thème via le CLI, rien d'autre. Pas de commandes, pas de clients, pas de finances. Si le client a besoin que tu voies l'admin (dashboard performance, liste des apps), demande un **compte collaborateur** avec uniquement : `Themes`, `Apps`, `Reports`. Ne demande jamais « full permissions ». Un freelance qui demande tout est un signal d'alarme connu côté marchand — ne sois pas ce freelance.

---

## 05 — Tools

| Outil | Usage exact | Type |
|---|---|---|
| **Web Performance Dashboard** (Admin → Online Store → Themes) | La vérité terrain : P75 LCP/INP/CLS sur 30 jours, par type de page | Terrain (RUM) |
| **PageSpeed Insights** | Diagnostic labo + CrUX terrain public | Mixte |
| **Lighthouse (DevTools)** | Reproductible en local, mode mobile throttlé | Labo |
| **Chrome DevTools — Performance** | Trouver l'élément LCP, les long tasks, le layout shift | Labo |
| **DevTools — Network** | Ordre de chargement, poids, waterfall, tiers | Labo |
| **DevTools — Coverage** | % de CSS/JS jamais exécuté | Labo |
| **WebPageTest** | Comparaison avant/après crédible, filmstrip | Labo |
| **Shopify CLI** | `theme dev`, `pull`, `push --unpublished`, `check`, `profile` | Dev |
| **`shopify theme profile`** | Profiling du rendu **Liquid** d'une page | Dev |
| **Theme Check** | Lint Liquid + règles de perf (`AssetSizeJavascript`) | Dev |
| **Shopify Dev MCP** | Docs, schémas GraphQL, validation Liquid dans Claude Code | IA |
| **Claude Code** | Analyse du thème, exécution des correctifs, rédaction | IA |
| **Git / GitHub** | Historique, diff, rollback, preuve de travail | Dev |

⚠️ Shopify CLI 4.0 (mai 2026) requiert **Node 22.12+** et **Git 2.28+**. `shopify theme init` clone désormais le thème **Skeleton** par défaut, plus Dawn.

---

## 06 — VS Code Workspace

```
shopify-freelance-system/
├── .claude/
│   ├── CLAUDE.md                    # règles globales (voir claude/CLAUDE.md)
│   ├── agents/                      # sous-agents spécialisés
│   ├── commands/                    # slash commands: /audit-perf, /before-after
│   └── settings.json                # permissions Claude Code
├── .mcp.json                        # Shopify Dev MCP (scope projet)
├── clients/
│   └── acme-store/
│       ├── 00_brief/
│       ├── 01_audit/
│       │   ├── baseline/            # JSON Lighthouse, captures, HAR
│       │   └── after/
│       ├── 04_development/
│       │   └── theme/               # ← le thème, dépôt Git propre
│       ├── 07_delivery/
│       └── docs/                    # 00 → 11, la doc finale
├── freelance/
│   ├── offers/  pricing/  proposals/  questionnaires/
└── knowledge/
    └── performance/                 # ton playbook qui grossit à chaque mission
```

**Deux améliorations par rapport à l'arborescence de départ :**
1. **`.gitignore` par client obligatoire** — `config/settings_data.json` contient les réglages marchands et parfois des identifiants d'apps. Il ne doit jamais partir dans un dépôt public.
2. **Un dépôt Git par client, pas un mono-repo.** Confidentialité, et tu peux donner l'accès au client sans exposer les autres.

Setup pas à pas → `00-workspace-setup.md`

---

## 07 — Claude Code Workflow

Le principe qui gouverne tout : **Claude Code lit beaucoup, écrit peu, et jamais sans plan validé.**

```
1. INDEX      → Claude cartographie le thème (aucune modification)
2. MEASURE    → toi : baseline manuelle, données terrain + labo
3. DIAGNOSE   → Claude corrèle métriques ↔ code, produit des hypothèses classées
4. PLAN       → Claude écrit un plan atomique. TU LE VALIDES.
5. IMPLEMENT  → un correctif = un commit = un test
6. VERIFY     → mesure identique à la baseline
7. REPORT     → Claude rédige, toi tu vérifies les chiffres
```

Les 12 prompts prêts à l'emploi, les 4 agents et les règles anti-catastrophe → `04-claude-code-workflow.md`

---

## 08 — Shopify MCP Workflow

Il existe plusieurs « Shopify MCP » et les confondre est l'erreur la plus fréquente :

| Serveur | Ce que c'est | Utile en Phase 1 ? |
|---|---|---|
| **Dev MCP** (`@shopify/dev-mcp`) | Docs, schémas GraphQL, validation Liquid/thème | ✅ **Oui, c'est celui-là** |
| **Storefront MCP** | Endpoint public de chaque store : recherche produit, panier | Marginal (vérifier un catalogue) |
| **Customer Account / Checkout MCP** | Côté acheteur | ❌ Non |
| **Admin MCP communautaires** | Wrappers non officiels de l'Admin API | ❌ Non — risque d'écriture |

**Ce que le Dev MCP ne fait pas :** il ne lit pas le thème du client, ne mesure rien, ne pousse rien. Il évite les hallucinations Liquid et te donne la doc à jour. La lecture/écriture du thème passe par le **CLI**, pas par MCP.

Tableau comparatif complet + workflows concrets → `05-shopify-mcp-workflow.md`

---

## 09 — Technical Workflow

```
ACCESS ──▶ theme pull ──▶ git init + tag baseline
   │
   ▼
BASELINE ─▶ RUM (30j) + Lighthouse ×3 + HAR + Coverage + theme profile
   │
   ▼
DIAGNOSE ─▶ élément LCP identifié / sources CLS / long tasks / poids par origine
   │
   ▼
PLAN ────▶ P0 → P3, effort × impact, un ticket par correctif
   │
   ▼
FIX ─────▶ branche perf/xxx ──▶ theme dev ──▶ commit atomique
   │
   ▼
VERIFY ──▶ push --unpublished ──▶ mesure identique ──▶ QA fonctionnelle
   │
   ▼
GATE ────▶ Quality Gate (bloquant)
   │
   ▼
DELIVER ─▶ preview link + rapport + demande de publication
```

---

## 10 — Step-by-Step Execution

Le détail de chaque correctif (quoi chercher, quoi changer, quel gain attendre, quel risque) est dans `06-optimization-playbook.md`. Les 6 blocs, dans l'ordre de rentabilité :

1. **LCP** — image hero : dimensions correctes, `loading="eager"` + `fetchpriority="high"`, preload ciblé, suppression du carrousel au-dessus de la ligne de flottaison
2. **CLS** — `width`/`height` sur toutes les images, `min-height` sur les zones injectées par apps, `font-display: optional|swap` cohérent
3. **JS** — `defer` partout, suppression jQuery/librairies doublons, import-on-interaction pour les widgets lourds
4. **Apps tierces** — quantifier chaque script, produire le tableau « app → poids → page → recommandation »
5. **CSS** — critique inline minimal, reste asynchrone, suppression du CSS mort mesuré via Coverage
6. **Liquid** — boucles > 50 itérations, `paginate`, appels répétés à `all_products`, sections rendues inutilement

---

## 11 — Testing

Trois niveaux, dans cet ordre :

1. **Fonctionnel** — le site marche-t-il toujours ? (ajout panier, variantes, filtres, recherche, menu mobile, drawer, checkout jusqu'à l'écran de paiement)
2. **Performance** — même appareil, même connexion, même heure, 3 runs, médiane retenue
3. **Non-régression** — Theme Editor : les sections sont-elles toujours éditables, déplaçables, supprimables ?

Protocole complet et pièges de mesure → `07-testing-and-qa.md`

---

## 12 — QA

Le **Quality Gate** est bloquant. 6 conditions critiques : si une seule échoue → **STOP DELIVERY**.

- [ ] `shopify theme check --fail-level error` passe
- [ ] Aucun parcours d'achat cassé (desktop + mobile réels)
- [ ] Theme Editor pleinement fonctionnel
- [ ] `git diff` relu ligne par ligne, zéro changement non intentionnel
- [ ] Aucun secret / token / clé d'app dans le dépôt
- [ ] `config/settings_data.json` non écrasé

Checklist complète (18 points) → `07-testing-and-qa.md`

---

## 13 — Documentation

Structure `/docs` produite à chaque mission :

```
00-project-overview.md    05-implementation.md    10-delivery.md
01-client-brief.md        06-testing.md           11-maintenance.md
02-discovery.md           07-performance.md
03-audit.md               08-seo.md
04-plan.md                09-qa.md
```

En Phase 1, les fichiers réellement lus par le client sont `03`, `04`, `07` et `10`. Les autres sont ta preuve de travail — et ta protection si le client conteste.

Templates remplissables → `08-report-templates.md` et `templates/`

---

## 14 — Client Delivery

Ne publie jamais toi-même sans autorisation écrite. La séquence :

1. Push sur un thème **non publié** → `shopify theme share` → lien de preview
2. Envoi du rapport avant/après + du plan de rollback
3. Fenêtre de relecture client (48 h)
4. Publication à une heure creuse, après accord écrit
5. Surveillance 48 h : dashboard RUM + un message de contrôle à J+7

Message de livraison rédigé → `12-delivery-checklist.md`

---

## 15 — Fiverr Offer

Gig, titre, 3 packages, FAQ, tags, requirements → `09-fiverr-offer.md`

Résumé : **Basic 89 $** (audit + quick wins), **Standard 249 $** (optimisation complète 3 templates), **Premium 549 $** (+ audit apps, suivi 14 jours, appel).

---

## 16 — Upwork Offer

Positionnement, mots-clés, 2 modèles de proposal, questions de qualification, red flags → `10-upwork-offer.md`

---

## 17 — Pricing

Grille beginner / intermediate / expert × 3 formules, et quand facturer au forfait, à l'heure ou à la valeur → `11-pricing.md`

---

## 18 — Upsells

Par ordre de taux d'acceptation observé dans ce métier :

1. **Retainer performance mensuel** (150–400 €/mois) — la perf se dégrade à chaque app installée. C'est l'upsell le plus naturel et le plus rentable.
2. **Audit apps approfondi** (200–500 €) — quantifier le coût de chaque app, proposer des remplacements
3. **Optimisation des templates secondaires** (blog, pages, recherche)
4. **Rebuild d'une section lourde** en Liquid natif (pont vers la Phase 4)
5. **Optimisation du catalogue images** en masse
6. **Monitoring + alerting** sur les Core Web Vitals

---

## 19 — Common Mistakes

| Erreur | Pourquoi c'est grave | À faire |
|---|---|---|
| Promettre « 90+ » ou « 2× plus rapide » | Non tenable, dépend des apps du client. C'est le premier motif de litige | Promettre une **méthode** et des **mesures**, jamais un chiffre |
| Optimiser pour PageSpeed | Score labo ≠ expérience réelle. Tu peux améliorer le score et dégrader le RUM | Piloter au **P75 RUM**, PSI en diagnostic |
| Travailler sur le thème publié | Un `theme push` malheureux = boutique cassée en prod | `--unpublished` toujours, `--allow-live` jamais |
| Lazy-loader l'image hero | Dégrade le LCP au lieu de l'améliorer. Erreur de débutant très courante | `loading="eager"` + `fetchpriority="high"` au-dessus de la ligne de flottaison |
| Précharger 10 ressources | Le preload en excès met tout en concurrence et ralentit | Max 2 hints par template (limite Shopify) |
| Supprimer une app sans accord | Tu casses un flux business (avis, abonnements, taxes) | Tu recommandes, le client décide, tu écris qui a décidé |
| Écraser `config/settings_data.json` | Tous les réglages du marchand perdus | `--ignore config/settings_data.json` |
| Une seule mesure avant/après | Le bruit de mesure dépasse souvent le gain | 3 runs, médiane, mêmes conditions |
| Livrer sans tester le Theme Editor | Le client ne peut plus éditer son site. Litige garanti | Test éditeur obligatoire dans le Gate |

---

## 20 — Professional Checklist

Version courte, à cocher pour chaque mission :

```
[ ] Accès reçu via Theme Access App / collaborateur limité
[ ] Thème dupliqué + tag Git "baseline"
[ ] Baseline RUM 30 jours capturée (screenshot horodaté)
[ ] Baseline labo : 3 templates × 3 runs, JSON archivés
[ ] Élément LCP identifié sur chaque template
[ ] Sources de CLS identifiées et localisées dans le code
[ ] Inventaire des scripts tiers avec poids
[ ] Plan P0→P3 validé par le client
[ ] Un correctif = un commit
[ ] Theme Check sans erreur
[ ] Parcours d'achat testé sur mobile réel
[ ] Theme Editor vérifié
[ ] Mesure after identique à la mesure before
[ ] Rapport avant/après avec méthodologie explicite
[ ] Plan de rollback écrit
[ ] Autorisation écrite avant publication
[ ] Suivi J+7 planifié
```

---

## 21 — Practice Project

Tu ne t'entraînes pas sur un client. Tu t'entraînes sur un store de développement que tu casses volontairement, puis que tu répares.
Programme en 5 jours → `13-practice-project.md`

---

## 22 — Deliverables

Les 5 documents que le client reçoit :

| Fichier | Longueur | Lu par |
|---|---|---|
| `performance-audit.md` | 3–6 pages | Le client, une fois |
| `performance-action-plan.md` | 1–2 pages | Le client, avant validation |
| `performance-before-after.md` | 1–2 pages | Le client **et son futur dev** |
| `performance-report.md` | 4–8 pages | Le client, archivé |
| `client-delivery.md` | 1 page | Le client, à la livraison |

Contenu et gabarits → `08-report-templates.md`

---

# PHASE 1 COMPLETE

Envoie `START PHASE 2` quand tu veux ouvrir **Fix Shopify Theme / Liquid Bugs**.
