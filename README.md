# shopify-system

Système de travail freelance Shopify. Ce dépôt contient la méthode, les modèles et les composants réutilisables. **Il ne contient aucune donnée client.**

---

## 1. Deux racines, deux dépôts

```
D:\shopify-freelance\
├── shopify-system\      ← dépôt n°1 : le système. Aucune donnée client.
└── clients\             ← n dépôts : un par client. Strictement privés.
    ├── .gitignore
    └── _TEMPLATE-CLIENT\
```

`clients\` n'est pas un dépôt. C'est un simple répertoire parent : **chaque dossier client est son propre dépôt Git**, initialisé à sa racine.

### Pourquoi elles sont séparées

| Raison | Conséquence si on les mélangeait |
|---|---|
| **Nature des données.** Le système est générique. Un dossier client contient un thème, des exports marchand, parfois des identifiants d'apps. | Une donnée client entrerait dans l'historique du système. |
| **Un `.gitignore` n'a aucun effet rétroactif.** Un secret déjà suivi reste dans l'historique. | Un seul commit maladroit contaminerait un dépôt destiné à durer des années. |
| **Cycle de vie.** Le système s'enrichit mission après mission. Un dossier client est figé à la livraison, puis archivé. | Deux rythmes incompatibles dans un même historique. |
| **Portée du partage.** Le système peut être montré, repris, réutilisé. Un dépôt client ne sort jamais. | Plus aucune possibilité de montrer son travail sans exposer un client. |
| **Isolation entre clients.** Un dépôt par client. | Un `git log` chez le client A révélerait le nom du client B. |

Le `.gitignore` placé dans `clients\` est un filet de sécurité pour les manipulations à ce niveau. **Il ne protège pas un dépôt enraciné dans `clients\<nom>\`** : un `.gitignore` situé au-dessus de la racine d'un dépôt est ignoré par Git. D'où la règle **R7** de `SECURITY.md`.

---

## 2. Où trouver quoi

### `shopify-system\`

| Chemin | Contenu |
|---|---|
| `README.md` | Ce fichier. Point d'entrée. |
| `SECURITY.md` | Accès client, secrets, isolation, production. Règles R1 à R7. |
| `config\tech-stack.md` | Versions d'outils relevées, et comment les revérifier. |
| `playbooks\` | Les cinq méthodes de mission, complètes et autonomes. |
| `component-library\` | Sections, blocks et snippets réutilisables. **Anonymisés avant versement.** |
| `knowledge\` | Notes techniques transversales, hors mission. |
| `freelance\` | Offres, tarifs, propositions, questionnaires. |
| `tools\` | Utilitaires locaux. |
| `.env.example` | Modèle. Copier en `.env`, remplir localement. `.env` est ignoré. |

### `clients\_TEMPLATE-CLIENT\`

Squelette à copier pour chaque nouvelle mission.

| Dossier | Contenu |
|---|---|
| `00_brief\` | Demande initiale, questionnaire rempli, périmètre accepté. |
| `01_audit\baseline\` | Mesures **avant** intervention. |
| `01_audit\after\` | Mesures **après** intervention. |
| `04_development\` | Le thème (`theme\`), et lui seul. |
| `05_testing\` | Résultats de tests et de non-régression. |
| `07_delivery\` | Livrables finaux et message de livraison. |
| `docs\` | Documents client, rédigés pour un lecteur non technique. |
| `.gitignore` | À copier **avant** le premier `git add`. Voir R7. |

Les agents (`shopify-auditor`, `performance-engineer`, `liquid-reviewer`, `report-writer`) et le `CLAUDE.md` global sont dans `%USERPROFILE%\.claude\`, hors des deux racines : ils sont chargés par Claude Code quel que soit le répertoire de travail.

---

## 3. Démarrer une mission

1. **Obtenir l'accès.** Theme Access App de préférence, sinon compte collaborateur limité. Voir `SECURITY.md` §1.
2. **Dupliquer le thème dans l'admin du client**, avant toute chose. Nommer la copie `BACKUP — AAAA-MM-JJ — avant intervention`. Elle ne sera jamais modifiée. Pas de sauvegarde, pas d'intervention.
3. **Créer le dossier client** en copiant `clients\_TEMPLATE-CLIENT\` vers `clients\<nom-client>\`.
4. **Vérifier qu'aucun dépôt Git parent n'existe** au-dessus du nouveau dossier :
   ```powershell
   git -C clients\<nom-client> rev-parse --show-toplevel
   ```
   Un `fatal: not a git repository` est le résultat attendu.
5. **Copier le `.gitignore`** à l'intérieur de `clients\<nom-client>\`, **avant** le premier `git add`. C'est R7, et elle n'a pas de rattrapage.
6. **Récupérer le thème** dans `04_development\`, puis figer l'état reçu :
   ```
   git init
   git add .
   git commit -m "chore: baseline — thème tel que reçu"
   git tag baseline
   ```
   Le tag `baseline` n'est jamais supprimé. `git diff baseline` donne à tout moment l'intégralité des changements.
7. **Ouvrir le playbook** correspondant au type de mission et le suivre.

---

## 4. Les cinq playbooks

Chaque playbook est un document autonome : définition du service, questionnaire client, méthode, workflow Claude Code, workflow MCP, tests, modèles de rapport, offres et tarifs.

| Playbook | Mission |
|---|---|
| `01-speed-optimization\` | Optimisation des performances d'un thème. |
| `02-liquid-bugs\` | Diagnostic et correction de bugs Liquid. |
| `03-store-audit-cro\` | Audit de boutique et analyse CRO. |
| `04-custom-sections-pdp\` | Sections sur mesure et pages produit. |
| `05-migration-shopify\` | Migration vers Shopify. |

`01-speed-optimization\agents-reference\` contient une **copie de référence** des quatre agents. Les agents réellement chargés sont ceux de `%USERPROFILE%\.claude\agents\` : toute modification se fait là-bas, puis est reportée ici.

---

## 5. Divergence connue

La divergence de racine et de .gitignore signalée ici a été résolue à l'étape 5 du Prompt A. Ce README et SECURITY.md font désormais foi.
