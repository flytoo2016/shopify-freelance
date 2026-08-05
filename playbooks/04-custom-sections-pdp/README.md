# PHASE 4 — CUSTOM SHOPIFY SECTION / HIGH-CONVERTING PRODUCT PAGE

> Document maître. Statut : **PHASE 4 uniquement**. La phase 5 n'est pas ouverte.
> Prérequis : workspace, CLAUDE.md et règles Git de la Phase 1. La discipline de preuve de la Phase 2 et la grille CRO de la Phase 3 sont réutilisées ici.

| Fichier | Rôle |
|---|---|
| `00-discovery.md` | Ce qu'il faut savoir avant d'écrire une ligne de code |
| `01-service-definition.md` | Ce que tu vends, à qui, avec quelles limites |
| `02-client-questionnaire.md` | Brief composant + accès |
| `03-ux-and-content-spec.md` | Hiérarchie, mobile-first, hiérarchie des actions |
| `04-shopify-architecture.md` | Sections, theme blocks, schema, metafields, sources dynamiques |
| `05-component-build-playbook.md` | Le cœur technique : Liquid, schema, CSS, JS, a11y |
| `06-product-page-structure.md` | La page produit bloc par bloc, avec le motif de chacun |
| `07-claude-code-workflow.md` | 8 prompts + agents |
| `08-mcp-and-validation.md` | Dev MCP, Theme Check, validation |
| `09-quality-checklist.md` | Tests, Theme Editor, Quality Gate |
| `10-documentation-and-handoff.md` | Les 7 livrables + le guide marchand |
| `11-fiverr-offer.md` | Gig et packages |
| `12-upwork-offer.md` | Positionnement et proposals |
| `13-pricing.md` | Tarification d'un développement sur mesure |
| `14-practice-project.md` | Entraînement : construire une section vendable |
| `claude/` | Addendum CLAUDE.md + 3 agents |
| `templates/component-spec.md` | La fiche de spécification |

---

## 01 — Business Understanding

**Le client n'achète pas une section. Il achète une capacité qu'il n'avait pas.**

C'est la première phase où tu **construis** au lieu de mesurer, réparer ou analyser. Trois conséquences :

| | Phases 1–3 | Phase 4 |
|---|---|---|
| Point de départ | Quelque chose existe | **La page blanche** |
| Risque principal | Casser, mesurer faux, être générique | **Livrer ce qui n'était pas demandé** |
| Ce qui échoue | Une régression | **Un malentendu sur le besoin** |
| Ce qui protège | Git et les tests | **La spécification validée avant le code** |
| Marge | Moyenne à élevée | **Élevée si le périmètre tient** |
| Réutilisabilité | Nulle | **Très forte — ta bibliothèque** |

Le dernier point est décisif. Une section bien conçue se revend cinq, dix, vingt fois avec des adaptations mineures. C'est la seule phase où ton travail passé réduit réellement ton temps futur — à condition de la concevoir réutilisable **dès la première construction**.

### Ce qu'il y a derrière la demande

Personne ne commande « une section personnalisée » par goût technique. Toujours l'une de ces quatre situations :

1. **Son thème ne sait pas faire quelque chose** dont il a besoin (configurateur, comparateur, bundle, table de tailles conditionnelle)
2. **Il paie une application** pour une fonction simple — 29 $/mois font 348 $/an contre une section payée une fois
3. **Il veut modifier lui-même** un contenu qui exige aujourd'hui un développeur
4. **Sa page produit ne convertit pas** et on lui a dit de la refaire

Les cas 2 et 3 se vendent sur un argument économique, pas technique. Et une section bien faite rend le contenu éditable dans le personnalisateur, ce qui supprime **tes propres interventions futures non facturables**. Dis-le : ça se vend, et c'est vrai.

---

## 02 — Service Definition

**Deux prestations distinctes, à ne jamais confondre.**

### A. Custom Shopify Section
> Je conçois et développe un composant sur mesure pour votre thème, entièrement configurable depuis le personnalisateur, sans dépendance à une application, documenté et réutilisable.

C'est une commande d'exécution : le client sait ce qu'il veut.

### B. High-Converting Product Page
> Je restructure votre page produit à partir d'une analyse de vos objections clients réelles, je développe les composants manquants, et vous pouvez ensuite modifier chaque élément vous-même.

Celle-ci **commence par de l'analyse**. Sans elle, tu construis une belle page qui ne convertit pas mieux que l'ancienne — et le client le constatera.

**Dans le scope** : conception UX et spécification, développement Liquid/CSS/JS natif, schéma complet (réglages, blocks, presets, défauts), intégration metafields et sources dynamiques, compatibilité Theme Editor, responsive, accessibilité, documentation marchand, tests navigateurs et appareils.

**Hors scope** : refonte du design global, création du contenu (textes, photos), fonctionnalités exigeant une application ou une logique serveur, modification du checkout, migration de thème, garantie de gain de conversion.

Détail et formulations contractuelles → `01-service-definition.md`

---

## 03 — Target Clients

| Segment | Demande type | Budget | Réutilisabilité |
|---|---|---|---|
| **DTC qui veut supprimer une app** | « Je paie 39 $/mois pour ça » | 400–1 200 € | **Très élevée** |
| **Marchand après audit** (Phase 3) | « Le Lot 1 dit de refaire la page produit » | 1 500–5 000 € | Élevée |
| **Marque avec maquette** | Fichier design à intégrer | 800–3 000 € | Moyenne |
| **Agence en sous-traitance** | Spec écrite, exécution attendue | 60–120 €/h | Élevée |
| **Produit complexe** | Configurateur, bundle, comparateur | 2 000–8 000 € | Faible, très bien payé |

**À éviter au début**
- « Refais ma boutique comme celle-ci » — c'est une refonte, pas une section
- Maquette non finalisée, ou client qui redessine en cours de route
- Fonctionnalité exigeant une logique serveur (Shopify Functions, app privée)
- Thème instable — construis toujours sur une base saine

---

## 04 — Client Requirements

Dix points, mais un seul compte vraiment : **ce que le marchand doit pouvoir modifier lui-même**. Un composant dont le client doit t'appeler pour changer un mot est un composant raté, et il te fera perdre de l'argent en interventions non facturables.

1. Le problème business, pas la solution demandée
2. Le comportement attendu, **y compris les cas limites**
3. Ce que le marchand doit pouvoir modifier
4. Ce qu'il ne doit **pas** pouvoir casser
5. Où vivent les données (produit, variante, metafield, metaobject)
6. Nombre d'occurrences minimum et maximum
7. Comportement mobile, explicitement
8. Templates où le composant doit être disponible
9. Thème, version, et s'il utilise déjà les theme blocks
10. Contraintes de marque

Questionnaire complet → `02-client-questionnaire.md`

---

## 05 — Tools

| Outil | Usage |
|---|---|
| **`shopify theme dev`** | L'outil central : tu construis en voyant le résultat |
| **`shopify theme console`** | Vérifier la structure réelle des données avant de coder |
| **`shopify theme check`** | Lint Liquid, schémas, accessibilité, performance |
| **Dev MCP** | Vérifier types de réglages, objets, filtres. `validate_theme` |
| **Theme Editor** | Le vrai terrain de test : c'est là que le marchand vivra |
| **Chrome DevTools** | Responsive, accessibilité, performance |
| **Lighthouse** | Contrôle de non-régression |
| **Un iPhone réel** | Obligatoire avant livraison |
| **Git** | Une branche par composant |

---

## 06 — VS Code Workspace

```
clients/{client}/
├── 00_brief/
│   ├── discovery.md
│   └── design/                     ← maquettes, références
├── 03_design/
│   ├── ux-spec.md
│   ├── component-spec.md           ← LE document validé avant tout code
│   └── conversion-strategy.md
├── 04_development/theme/
│   ├── sections/  blocks/  snippets/  assets/
├── 05_testing/
└── 07_delivery/

shopify-components/                 ← TON actif, hors dossier client
├── sections/  blocks/  snippets/
└── README.md                       ← catalogue + prix de vente indicatif
```

**`shopify-components/` est l'actif le plus important de cette phase.** Chaque composant y entre **anonymisé et documenté**, avec le temps réel de réinstallation sur un thème différent. Au bout d'un an, un devis à 1 200 € peut représenter trois heures de travail réel.

Règle : rien n'entre dans la bibliothèque sans anonymisation ni documentation.

---

## 07 — Claude Code Workflow

> **Claude Code n'invente pas le besoin. Il exécute une spécification validée.**

```
1. DISCOVERY      toi + client : le problème, pas la solution
2. UX SPEC        hiérarchie, contenu, comportement mobile
3. COMPONENT SPEC réglages, blocks, données, cas limites → VALIDÉ PAR ÉCRIT
4. ARCHITECTURE   section ? theme block ? snippet ? où vivent les données ?
5. SCHEMA         écrit en premier — c'est le contrat
6. LIQUID         structure et rendu, sans JS
7. CSS            scopé, mobile-first
8. JS             natif, progressif, en IIFE
9. A11Y           sémantique, clavier, contraste
10. PERF          images, chargement, poids
11. TEST          navigateurs, appareils, Theme Editor
12. DOC           marchand et développeur suivant
```

**L'ordre 5 avant 6 n'est pas négociable.** Le schéma est le contrat entre ton code et le marchand. Écrire le Liquid d'abord produit systématiquement un schéma bricolé après coup, avec des réglages qui ne correspondent pas à ce que le marchand veut réellement changer.

8 prompts prêts → `07-claude-code-workflow.md`

---

## 08 — Shopify MCP Workflow

Le Dev MCP est **plus utile ici que dans toutes les phases précédentes** : tu écris beaucoup de Liquid neuf, et c'est exactement le terrain où un modèle invente des types de réglages, des objets et des filtres parfaitement plausibles qui n'existent pas.

Trois usages systématiques :
1. **Vérifier un type de réglage** avant de l'écrire dans un schéma
2. **Vérifier un objet ou un filtre Liquid** avant de l'utiliser
3. **`validate_theme` avant chaque commit**

Un type de réglage inventé rend la section indisponible dans l'éditeur **sans message d'erreur explicite** — un des bugs les plus pénibles à diagnostiquer.

Détail → `08-mcp-and-validation.md`

---

## 09 — Technical Workflow

```
SPEC VALIDÉE
     ↓
BRANCHE feature/nom-du-composant
     ↓
SCHEMA écrit et validé          ← le contrat
     ↓
LIQUID structure                ← rendu serveur, sans JS
     ↓
CSS mobile-first                ← scopé au composant
     ↓
JS progressif                   ← le composant fonctionne sans lui
     ↓
THEME EDITOR                    ← ajout, déplacement, suppression, chaque réglage
     ↓
A11Y + RESPONSIVE + PERF
     ↓
QUALITY GATE
     ↓
DOC MARCHAND
     ↓
LIVRAISON preview + le client manipule + accord écrit
```

**Le principe qui structure tout : le composant doit fonctionner sans JavaScript.** Le JS améliore, il ne conditionne pas. Un carrousel dégrade en liste défilante, un accordéon en contenu ouvert, un filtre en navigation par liens. C'est meilleur pour le référencement, la performance et l'accessibilité — et ça évite la moitié des bugs du Theme Editor.

---

## 10 — Step-by-Step Execution

Les cinq décisions d'architecture à trancher **avant** de coder (arbres de décision dans `04-shopify-architecture.md`) :

1. **Section, theme block, ou snippet ?**
2. **Où vivent les données ?** Réglages, metafields produit/variante, ou metaobjects ?
3. **Blocks nécessaires ?** Locaux à la section, ou theme blocks réutilisables ?
4. **Sur quels templates ?** `enabled_on` ou `disabled_on` — jamais les deux
5. **Réutilisable ailleurs ?** Si oui, conçois-le pour ta bibliothèque dès le départ

Playbook de construction complet → `05-component-build-playbook.md`

---

## 11 — Testing

Trois cercles :

1. **Fonctionnel** — le composant fait ce que la spec dit, **y compris dans les cas limites** : réglages vides, texte très long, image absente, produit sans le metafield, une seule occurrence, nombre maximum
2. **Theme Editor** — ajout, déplacement, duplication, suppression, chaque réglage, aperçu en direct
3. **Non-régression** — reste de la page, parcours d'achat, performance

Le niveau 2 est celui où se produisent la majorité des livraisons ratées de cette phase.

Protocole → `09-quality-checklist.md`

---

## 12 — QA

Quality Gate bloquant. Une seule condition critique en échec → **STOP DELIVERY**.

```
[ ] C1  shopify theme check --fail-level error → 0 erreur
[ ] C2  Rendu correct avec TOUS les réglages vides
[ ] C3  presets présent
[ ] C4  Chaque réglage a un default
[ ] C5  {{ block.shopify_attributes }} sur chaque wrapper de bloc
[ ] C6  Theme Editor : ajout, déplacement, duplication, suppression OK
[ ] C7  Le composant se rend sans JavaScript
[ ] C8  Aucune nouvelle erreur console
[ ] C9  Parcours d'achat intact
[ ] C10 Aucun id de réglage existant modifié
[ ] C11 Testé sur iPhone réel
```

**C2 mérite une attention particulière.** C'est le test que personne ne fait et qui casse le plus souvent : le marchand ajoute la section, aucun réglage n'est renseigné, et il voit une page blanche ou une erreur Liquid.

---

## 13 — Documentation

Sept livrables :

`ux-spec.md` · `component-spec.md` · `technical-spec.md` · `conversion-strategy.md` · `implementation.md` · `qa-report.md` · `delivery.md`

**Le plus important n'est aucun de ceux-là.** C'est le **guide d'utilisation marchand** : une page, avec des captures, expliquant où trouver le composant et ce que chaque réglage fait. C'est lui qui détermine si le client utilise réellement ce que tu as construit — donc s'il revient.

Gabarits → `10-documentation-and-handoff.md`

---

## 14 — Client Delivery

```
Composant poussé sur un thème NON PUBLIÉ
      ↓
Lien de preview + guide marchand
      ↓
LE CLIENT MANIPULE LUI-MÊME LES RÉGLAGES   ← l'étape décisive
      ↓
Ajustements
      ↓
Publication après accord écrit
      ↓
Vérification + suivi 7 jours
```

**Fais manipuler le client pendant l'appel.** Un composant validé sur capture révèle ses défauts trois semaines plus tard, quand la garantie est écoulée. Un composant que le client a lui-même configuré est validé pour de bon — et c'est à ce moment précis qu'il mesure la valeur de ce que tu as construit, donc qu'il commande le suivant.

---

## 15 — Fiverr Offer

→ `11-fiverr-offer.md`
**Basic 149 $** (section simple configurable) · **Standard 399 $** (section + blocks + metafields) · **Premium 899 $** (page produit restructurée).

---

## 16 — Upwork Offer

→ `12-upwork-offer.md`
Le meilleur canal pour les missions de page produit et la sous-traitance d'agence.

---

## 17 — Pricing

→ `13-pricing.md`
Principe : **tu factures la première construction, pas les suivantes.** Ta bibliothèque transforme progressivement un forfait en marge.

---

## 18 — Upsells

1. **Composant complémentaire** (300–800 €) — le client en veut toujours un deuxième
2. **Suppression de l'app remplacée + mesure du gain de performance** (200–600 €) — deux missions, une seule cause
3. **Optimisation performance** (→ Phase 1) après ajout de composants
4. **Déclinaison sur d'autres templates** (collection, accueil)
5. **Maintenance et évolutions** (200–500 €/mois)
6. **Formation du marchand** (150–300 €) — une heure pour qu'il exploite ce que tu as livré

L'upsell n°2 est le plus élégant : tu as construit la section qui remplace l'application, tu factures ensuite le retrait de l'application et le gain de performance mesuré.

---

## 19 — Common Mistakes

| Erreur | Conséquence |
|---|---|
| Coder avant spec validée | Tu construis deux fois, sans le facturer |
| Trop peu de réglages | Le client t'appelle pour changer un mot |
| Trop de réglages | Le marchand est perdu et n'utilise rien |
| Oublier `presets` | Le marchand ne peut pas ajouter la section |
| Oublier `{{ block.shopify_attributes }}` | Blocs non sélectionnables dans l'éditeur |
| Aucune valeur par défaut | La section paraît cassée à l'ajout |
| Ne pas tester avec réglages vides | Erreur Liquid en production |
| Rendu dépendant du JavaScript | SEO, performance et bugs d'éditeur |
| `enabled_on` **et** `disabled_on` ensemble | Erreur de schéma |
| Type de réglage inventé | Section indisponible, sans message clair |
| Texte en dur | Non traduisible, non modifiable |
| Renommer un `id` de réglage | Contenu du marchand détruit |
| Ne pas tester le Theme Editor | La livraison ratée n°1 de cette phase |
| Verser un composant non anonymisé à la bibliothèque | Fuite d'un client vers un autre |
| Promettre un gain de conversion | Non tenable |

---

## 20 — Professional Checklist

```
[ ] Discovery : problème business compris, pas seulement la demande
[ ] component-spec.md rédigé et VALIDÉ PAR ÉCRIT avant tout code
[ ] Architecture tranchée : section / theme block / snippet
[ ] Emplacement des données décidé, compatibilité des types vérifiée
[ ] Schéma écrit avant le Liquid, chaque type vérifié via le Dev MCP
[ ] Valeurs par défaut partout · presets défini
[ ] enabled_on OU disabled_on
[ ] {{ block.shopify_attributes }} sur chaque wrapper
[ ] Textes via les fichiers de traduction
[ ] Rendu correct avec réglages vides et contenus extrêmes
[ ] Fonctionne sans JavaScript
[ ] Theme Editor : ajout, déplacement, duplication, suppression, chaque réglage
[ ] Accessibilité : sémantique, clavier, focus, contraste, cibles 44 px
[ ] Testé sur iPhone réel
[ ] Aucune régression de performance
[ ] Theme Check sans erreur · validate_theme OK
[ ] Guide marchand avec captures
[ ] Composant anonymisé versé à shopify-components/
[ ] Accord écrit avant publication
```

---

## 21 — Practice Project

Tu construis **une** section réutilisable, complète, documentée, du niveau de qualité que tu vendrais. → `14-practice-project.md`

---

## 22 — Deliverables

| Fichier | Quand | Lecteur |
|---|---|---|
| `ux-spec.md` | Avant le code | Client |
| `component-spec.md` | **Avant le code, validé par écrit** | Client |
| `conversion-strategy.md` | Avant le code (page produit) | Client |
| `technical-spec.md` | Pendant | Développeur suivant |
| `implementation.md` | À la livraison | Développeur suivant |
| `qa-report.md` | À la livraison | Client |
| `delivery.md` + **guide marchand** | À la livraison | **Le marchand, en pratique** |

---

# PHASE 4 COMPLETE

Envoie `START PHASE 5` pour ouvrir **WooCommerce / Other Ecommerce → Shopify Migration**.
