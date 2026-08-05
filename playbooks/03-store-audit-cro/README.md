# PHASE 3 — SHOPIFY STORE AUDIT + CONVERSION REPORT

> Document maître. Statut : **PHASE 3 uniquement**. Les phases 4 et 5 ne sont pas ouvertes.
> Prérequis : workspace, CLAUDE.md et règles Git de la Phase 1. Les méthodes de mesure de la Phase 1 et la discipline de preuve de la Phase 2 sont réutilisées ici.

| Fichier | Rôle |
|---|---|
| `00-audit-setup.md` | Accès, données à collecter, préparation |
| `01-service-definition.md` | Ce que tu vends, à qui, avec quelles limites |
| `02-client-questionnaire.md` | Questionnaire business + accès |
| `03-audit-framework.md` | Les 29 zones d'audit, écran par écran |
| `04-cro-analysis.md` | Friction, hésitation, confiance, objections |
| `05-competitive-research.md` | Comparer sans copier |
| `06-scoring-system.md` | Notation sur 100, défendable |
| `07-prioritization.md` | Fiche de constat, P0→P3, ICE |
| `08-claude-code-workflow.md` | Prompts et agents |
| `09-data-and-mcp.md` | Analytics, ShopifyQL, MCP, ce qu'on peut et ne peut pas savoir |
| `10-report-templates.md` | Les 8 livrables |
| `11-fiverr-offer.md` | Gig et packages |
| `12-upwork-offer.md` | Positionnement et proposals |
| `13-pricing.md` | Tarification d'un produit intellectuel |
| `14-delivery-and-upsell.md` | Restitution, conversion en mission de dev |
| `15-practice-project.md` | Entraînement sur boutiques réelles |
| `claude/` | Addendum CLAUDE.md + 3 agents |
| `templates/` | Fiche de constat + journal de mission |

---

## 01 — Business Understanding

**Le client n'achète pas un rapport. Il achète une décision.**

Il a un budget limité et dix idées contradictoires. Son agence lui dit une chose, son associé une autre, un influenceur LinkedIn une troisième. Ce qu'il achète, c'est **l'ordre dans lequel dépenser son prochain euro.**

Différence structurelle avec les phases 1 et 2 :

| | Phase 1 (Speed) | Phase 2 (Bug) | Phase 3 (Audit) |
|---|---|---|---|
| Nature du livrable | Code + mesures | Code + explication | **Document seul** |
| Preuve du résultat | Chiffres avant/après | Le bug a disparu | **Aucune preuve immédiate** |
| Risque principal | Ne pas impressionner | Casser autre chose | **Produire du générique** |
| Ce qui fait la valeur | La méthode de mesure | La cause racine | **La spécificité et la preuve** |
| Marge | Moyenne | Élevée | **Très élevée** |
| Débouché naturel | Retainer | Retainer | **Mission de développement** |

**Le danger central de cette prestation :** un audit sans preuve est une opinion, et une opinion se vend une fois. Le marché est saturé de rapports générés automatiquement qui recommandent « ajouter des avis clients » et « améliorer votre proposition de valeur » à toutes les boutiques du monde. Le client les reconnaît immédiatement.

Ton unique différenciateur : **chaque constat est adossé à une preuve observable, localisée, et vérifiable par le client lui-même.**

### Ce que tu dois savoir avant de parler à un client

- Un audit n'augmente aucune conversion. Ce qui l'augmente, c'est ce qui est **implémenté** ensuite. Vends l'audit comme une carte, pas comme un traitement.
- Sans accès aux analytics, tu audites une interface, pas une performance. Dis-le, et fais-en un argument pour obtenir l'accès.
- La plupart des « problèmes de conversion » ne sont pas des problèmes d'interface : offre inadaptée, trafic non qualifié, prix hors marché. Un auditeur qui ne sait pas dire ça est un décorateur.
- **Actualité (août 2026) :** les boutiques non-Plus ont jusqu'au **26 août 2026** pour migrer leurs personnalisations de checkout (`checkout.liquid`, Additional Scripts, script tags sur les pages Merci et Suivi de commande) vers Checkout Extensibility. Passée cette date, Shopify migre automatiquement et **les personnalisations et pixels non migrés cessent de fonctionner**. Shopify Scripts s'est déjà arrêté le 30 juin 2026. Vérifie la situation exacte de chaque boutique — c'est un constat P0 immédiat sur une grande partie du marché en ce moment, et un argument d'urgence légitime.

---

## 02 — Service Definition

**Nom :** Shopify Store Audit + Conversion Report

**Définition en une phrase :**
> J'examine votre boutique écran par écran comme le fait un acheteur, je confronte ce que je vois à vos données quand j'y ai accès, et je vous remets une liste de constats sourcés, notés et classés par ordre de rentabilité — avec ce que chacun coûte à corriger.

**Dans le scope**
- Audit des 29 zones (voir `03-audit-framework.md`) sur desktop et mobile
- Analyse CRO : friction, hésitation, confiance, objections, clarté de l'offre
- Analyse SEO technique et on-page observable
- Analyse performance (méthodologie Phase 1, version audit)
- Audit d'accessibilité de niveau constat
- Analyse concurrentielle sur 3 à 5 boutiques
- Vérification du suivi analytique et des pixels
- Notation sur 100, ventilée en 10 dimensions
- Feuille de route priorisée avec effort et impact estimés

**Hors scope — à écrire noir sur blanc**
- Toute implémentation (c'est la mission suivante, et c'est là qu'est ton chiffre d'affaires)
- Audit du checkout au-delà de ce qui est observable et configurable
- Audit de la stratégie produit, du prix ou du positionnement de marque
- Analyse de campagnes publicitaires
- Test A/B ou validation statistique des recommandations
- Garantie d'un gain de conversion chiffré

---

## 03 — Target Clients

| Segment | Signal | Budget | Conversion en dev |
|---|---|---|---|
| **DTC 100k–1M €/an** | Trafic correct, conversion décevante | 500–2 000 € | **Élevée** |
| **Marchand avant refonte** | « On va tout refaire, par où commencer ? » | 800–3 000 € | Très élevée |
| **Marchand qui scale l'acquisition** | Budget ads en hausse, ROAS en baisse | 1 000–3 000 € | Élevée |
| **Agence / consultant** | A besoin d'un audit technique pour son client | 400–1 200 € | Moyenne |
| **Investisseur / repreneur** | Due diligence avant rachat | 1 500–5 000 € | Faible mais très bien payé |

**À éviter**
- Boutique à moins de 50 sessions/jour : aucune donnée exploitable, tout est spéculatif
- Client qui veut « juste savoir si son site est bien »
- Client qui refuse l'accès aux analytics **et** attend des conclusions sur la conversion
- Boutique en pré-lancement (rien à auditer, c'est du conseil de conception)

---

## 04 — Client Requirements

1. Accès en lecture à **Shopify Analytics** (permission `Reports`)
2. Accès en lecture à **Google Analytics 4** si installé
3. Accès en lecture à **Search Console** si disponible
4. Accès collaborateur limité : `Thèmes`, `Applications`, `Reports`
5. Les 3 pages produit qui font le chiffre d'affaires
6. Le taux de conversion actuel et son évolution sur 6 mois
7. Les sources de trafic et leur répartition
8. 3 à 5 concurrents que le client considère comme des références
9. Le budget d'implémentation envisagé après l'audit
10. Ce qui a déjà été essayé et n'a pas marché

**Le point 9 est le plus important commercialement.** Un audit qui recommande 40 000 € de travaux à un client qui a 3 000 € est un audit raté, même s'il est juste. La priorisation doit être calibrée sur le budget réel.

Questionnaire complet → `02-client-questionnaire.md`

---

## 05 — Tools

| Outil | Usage |
|---|---|
| **Shopify Analytics** | Taux de conversion, entonnoir, par appareil, par page |
| **ShopifyQL / rapports personnalisés** | Requêtes agrégées que l'API Admin ne calcule pas |
| **Web Performance Dashboard** | Core Web Vitals terrain (méthodologie Phase 1) |
| **GA4** | Comportement, parcours, événements — si correctement installé |
| **Search Console** | Requêtes, pages indexées, Core Web Vitals, couverture |
| **Chrome DevTools** | Réseau, console, responsive, accessibilité |
| **Lighthouse** | Performance, accessibilité, SEO, bonnes pratiques |
| **Rich Results Test (Google)** | Validation des données structurées produit |
| **WAVE / axe DevTools** | Accessibilité |
| **Un téléphone réel** | La moitié des constats mobiles n'apparaissent pas en émulation |
| **Shopify Dev MCP** | Vérifier ce que le thème peut faire, valider les affirmations techniques |
| **Claude Code** | Analyse du thème, structuration des constats, rédaction |
| **Enregistrement d'écran** | Ta propre session d'achat = preuve la plus convaincante du rapport |

---

## 06 — VS Code Workspace

```
clients/{client}/
├── 00_brief/
│   ├── questionnaire.md
│   └── business-context.md
├── 01_audit/
│   ├── evidence/                 ← captures horodatées, nommées par ID de constat
│   │   ├── P0-01-cart-mobile.png
│   │   └── session-recording.mp4
│   ├── data/                     ← exports analytics, Lighthouse JSON, HAR
│   ├── findings/                 ← une fiche par constat
│   └── competitors/
├── 02_research/
├── 07_delivery/                  ← les 8 livrables
└── docs/
```

**La règle de nommage des preuves :** chaque capture porte l'ID du constat qu'elle prouve. `P0-01-cart-mobile.png`. Sans cette discipline, tu te retrouves à la rédaction avec 80 captures anonymes et tu réécris tout de mémoire — c'est-à-dire que tu produis du générique.

---

## 07 — Claude Code Workflow

> **Claude Code ne juge pas l'expérience utilisateur. Il structure, vérifie et rédige.**

L'audit CRO repose sur une observation humaine : ce que tu ressens en parcourant la boutique comme un acheteur. Ça, aucun outil ne le fait à ta place. En revanche, une fois l'observation faite, Claude Code est excellent pour la vérifier dans le code, la structurer, la chiffrer et la rédiger.

```
1. OBSERVER      toi, en acheteur, sur mobile réel, enregistrement à l'appui
2. COLLECTER     données analytics, mesures, captures
3. VÉRIFIER      Claude confronte chaque observation au code du thème
4. STRUCTURER    Claude transforme les observations en fiches de constat normalisées
5. NOTER         scoring, avec justification de chaque note
6. PRIORISER     impact × effort, calibré sur le budget du client
7. RÉDIGER       Claude rédige, tu vérifies chaque chiffre et chaque preuve
```

L'étape 3 est ce qui distingue ton audit d'un audit d'agence marketing : quand tu écris « les avis ne se chargent que 2 s après le rendu », tu peux montrer le fichier et la ligne.

Prompts → `08-claude-code-workflow.md`

---

## 08 — Shopify MCP Workflow

Le Dev MCP sert ici à **empêcher les affirmations fausses**. Un audit contient beaucoup d'affirmations techniques (« ce thème ne supporte pas les sources dynamiques », « cette fonctionnalité nécessite une app »). Une seule affirmation fausse détruit la crédibilité de tout le document, et le client la découvrira en la montrant à un développeur.

Usage : vérifier ce qu'un thème Online Store 2.0 peut nativement faire, ce qui relève des metafields, ce qui exige une application, et ce que Shopify a déprécié.

Ce qu'il ne fait pas : voir la boutique, lire les analytics, juger une expérience.

Détail et sources de données → `09-data-and-mcp.md`

---

## 09 — Technical Workflow

```
CONTEXTE BUSINESS        ce que la boutique vend, à qui, à quel prix
      ↓
DONNÉES                  conversion, entonnoir, appareils, sources
      ↓
PARCOURS ACHETEUR        toi, mobile réel, session enregistrée, sans a priori
      ↓
AUDIT ÉCRAN PAR ÉCRAN    les 29 zones
      ↓
VÉRIFICATION CODE        chaque constat confronté au thème
      ↓
CONCURRENCE              3 à 5 boutiques, sur les mêmes 29 zones
      ↓
NOTATION                 10 dimensions, /100
      ↓
PRIORISATION             impact × effort, calibrée sur le budget
      ↓
RÉDACTION                8 livrables
      ↓
RESTITUTION              appel de 45 à 60 min
      ↓
PROPOSITION              devis d'implémentation
```

L'ordre compte : **le parcours acheteur se fait avant l'audit analytique**, pour que tes impressions ne soient pas contaminées par ce que tu sais déjà. Tu ne peux découvrir une friction qu'une seule fois.

---

## 10 — Step-by-Step Execution

Détail dans `03-audit-framework.md` (les 29 zones) et `04-cro-analysis.md` (la grille CRO). Les six passes, dans l'ordre :

1. **Passe acheteur** — mobile réel, enregistrement, aucune note technique. Tu achètes. Tu notes ce que tu ressens.
2. **Passe données** — entonnoir, conversion par appareil, pages de sortie, recherche interne
3. **Passe écran par écran** — les 29 zones, desktop puis mobile, captures nommées
4. **Passe technique** — performance, SEO, accessibilité, tracking, code
5. **Passe concurrentielle** — les mêmes zones sur 3 à 5 boutiques
6. **Passe de synthèse** — notation, priorisation, rédaction

---

## 11 — Testing

Un audit ne se teste pas, il se **falsifie**. Avant de livrer, chaque constat doit passer trois questions :

1. **La preuve existe-t-elle ?** Une capture, une donnée, une ligne de code. Sinon, le constat est une opinion → il est étiqueté comme tel, ou il sort.
2. **Le client peut-il le vérifier lui-même ?** S'il ne peut pas reproduire ton observation en trois clics, elle est trop abstraite.
3. **Est-ce vrai pour cette boutique spécifiquement ?** Test décisif : si le constat pourrait être copié-collé dans l'audit d'une autre boutique, c'est du remplissage. Supprime-le.

La troisième question est le filtre anti-générique. Applique-la à chaque ligne.

---

## 12 — QA

Quality Gate spécifique, bloquant :

- [ ] Chaque constat a un ID, une preuve nommée, et un fichier de preuve qui existe
- [ ] Chaque affirmation technique est vérifiable dans le code ou la doc Shopify
- [ ] Aucun chiffre non mesuré ou non sourcé
- [ ] Aucune recommandation qui pourrait s'appliquer à n'importe quelle boutique
- [ ] Chaque note du scoring est justifiée par des constats précis
- [ ] La feuille de route est calibrée sur le budget déclaré du client
- [ ] Les limites de l'audit sont explicitées (ce que je n'ai pas pu voir)
- [ ] Aucune promesse de gain de conversion chiffré

Détail → `06-scoring-system.md` et `07-prioritization.md`

---

## 13 — Documentation

Huit livrables :

`store-audit.md` · `ux-audit.md` · `cro-audit.md` · `seo-audit.md` · `performance-audit.md` · `competitor-analysis.md` · `prioritized-roadmap.md` · `conversion-report.md`

**Attention au piège du volume.** Un audit de 80 pages n'est pas lu. La structure recommandée : un **rapport de synthèse de 8 à 12 pages** que le client lit vraiment, et des annexes détaillées qu'il consulte au besoin. Le `conversion-report.md` est le document principal ; les sept autres sont ses annexes.

Gabarits → `10-report-templates.md`

---

## 14 — Client Delivery

```
Envoi du rapport 48 h avant l'appel
      ↓
Appel de restitution 45–60 min, enregistré
      ↓
Réponses aux objections, ajustement des priorités avec le client
      ↓
Envoi de la feuille de route ajustée
      ↓
Devis d'implémentation sous 48 h        ← c'est ici qu'est ton chiffre d'affaires
      ↓
Relance à J+14 si sans réponse
```

**L'appel de restitution n'est pas optionnel.** Un rapport envoyé sans restitution est lu à 30 % et suivi à 10 %. L'appel double le taux de conversion vers la mission d'implémentation, et c'est là que se joue la vraie rentabilité de cette phase.

Détail → `14-delivery-and-upsell.md`

---

## 15 — Fiverr Offer

→ `11-fiverr-offer.md`
**Basic 149 $** (audit express, 15 constats, 1 page type) · **Standard 449 $** (audit complet, scoring, feuille de route) · **Premium 899 $** (+ concurrence, appel, vidéo commentée).

Fiverr est un canal secondaire pour cette prestation : la valeur perçue d'un audit y est plafonnée. Le vrai canal, c'est Upwork et le direct.

---

## 16 — Upwork Offer

→ `12-upwork-offer.md`
C'est le meilleur canal. Un audit est exactement ce qu'un client Upwork sait acheter : un livrable défini, un prix fixe, un expert externe.

---

## 17 — Pricing

→ `13-pricing.md`
Le principe : **tu vends un document, donc tu vends du jugement, pas du temps.** L'audit se facture au forfait, jamais à l'heure. Et il se calibre sur la taille de la boutique, pas sur le nombre de pages du rapport.

---

## 18 — Upsells

L'audit est le meilleur générateur de missions de tout ton catalogue, parce qu'il **produit lui-même son propre devis**.

1. **Implémentation des P0** (1 000–5 000 €) — l'upsell naturel, à proposer dans les 48 h
2. **Implémentation par lots mensuels** (800–2 500 €/mois) — la feuille de route devient un contrat
3. **Optimisation performance** (→ Phase 1)
4. **Refonte de la page produit** (→ Phase 4)
5. **Ré-audit à 3 mois** (40 % du prix initial) — mesure des effets, nouvelle feuille de route
6. **Accompagnement de refonte** — tu deviens le référent technique du projet

Taux de conversion audit → implémentation observable dans ce métier : **40 à 60 %** quand la restitution est faite en appel, nettement moins sans.

---

## 19 — Common Mistakes

| Erreur | Conséquence |
|---|---|
| Constats génériques applicables à toute boutique | Le client reconnaît le modèle et ne revient pas |
| Recommander sans chiffrer l'effort | Le rapport est inutilisable pour décider |
| Ignorer le budget du client | Feuille de route irréaliste, rien n'est fait |
| Auditer sans accès aux analytics et conclure quand même sur la conversion | Affirmations invérifiables, crédibilité détruite |
| Rapport de 80 pages | Non lu |
| Livrer sans appel de restitution | Divise par deux la conversion vers l'implémentation |
| Confondre esthétique et conversion | « Le design est daté » n'est pas un constat |
| Copier les concurrents sans comprendre | Leurs choix répondent à leur trafic, pas au tien |
| Promettre « +25 % de conversion » | Non tenable, et détruit la relation au premier bilan |
| Auditer une boutique à 20 visiteurs/jour comme une boutique à 5 000 | Les priorités n'ont rien à voir |
| Ne pas dire ce qu'on n'a pas pu voir | Le client le découvrira |
| Oublier de vérifier l'échéance checkout du 26 août 2026 | Tu passes à côté du constat le plus urgent du moment |

---

## 20 — Professional Checklist

```
[ ] Contexte business compris (produit, panier moyen, marge, trafic, sources)
[ ] Accès analytics obtenu, ou limite explicitée par écrit
[ ] Parcours acheteur enregistré sur mobile réel, avant toute analyse
[ ] Entonnoir de conversion relevé et daté
[ ] Les 29 zones auditées, desktop et mobile
[ ] Chaque constat : ID, preuve nommée, fichier de preuve existant
[ ] Chaque affirmation technique vérifiée dans le code ou la doc
[ ] Statut de la migration checkout vérifié
[ ] Performance mesurée (méthodologie Phase 1)
[ ] SEO technique vérifié (titres, descriptions, canonical, données structurées)
[ ] Accessibilité vérifiée au niveau constat
[ ] Tracking et pixels vérifiés
[ ] 3 à 5 concurrents audités sur les mêmes zones
[ ] Notation /100 avec justification par dimension
[ ] Feuille de route priorisée, chiffrée, calibrée sur le budget
[ ] Section « limites de cet audit » rédigée
[ ] Filtre anti-générique passé sur chaque ligne
[ ] Appel de restitution planifié
[ ] Devis d'implémentation prêt sous 48 h
```

---

## 21 — Practice Project

Tu t'entraînes sur des boutiques réelles, publiquement accessibles, sans les contacter. → `15-practice-project.md`

---

## 22 — Deliverables

| Fichier | Pages | Rôle |
|---|---|---|
| `conversion-report.md` | 8–12 | **Le document principal.** Synthèse, score, top constats, feuille de route |
| `store-audit.md` | 10–20 | Annexe : tous les constats, écran par écran |
| `ux-audit.md` | 5–10 | Annexe : parcours, navigation, mobile |
| `cro-audit.md` | 5–10 | Annexe : friction, confiance, objections |
| `seo-audit.md` | 4–8 | Annexe : technique et on-page |
| `performance-audit.md` | 3–6 | Annexe : Core Web Vitals |
| `competitor-analysis.md` | 4–8 | Annexe : comparatif |
| `prioritized-roadmap.md` | 2–4 | **Le document le plus utilisé.** Tableau unique, chiffré |

Gabarits → `10-report-templates.md`

---

# PHASE 3 COMPLETE

Envoie `START PHASE 4` pour ouvrir **Custom Shopify Section / High-Converting Product Page**.
