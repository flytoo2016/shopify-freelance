# PHASE 2 — FIX SHOPIFY THEME / LIQUID BUGS

> Document maître. Statut : **PHASE 2 uniquement**. Les phases 3 à 5 ne sont pas ouvertes.
> Prérequis : le workspace, le CLAUDE.md et les règles Git de la Phase 1 s'appliquent ici sans modification.

| Fichier | Rôle |
|---|---|
| `00-intake-and-triage.md` | Recevoir un problème, le trier, gérer l'urgence |
| `01-service-definition.md` | Ce que tu vends, à qui, avec quelles limites |
| `02-client-questionnaire.md` | Formulaire de rapport de bug + demande d'accès |
| `03-bug-taxonomy.md` | Les 15 familles de bugs et leurs signatures |
| `04-debugging-methodology.md` | REPRODUCE → ISOLATE → TRACE → ROOT CAUSE → FIX |
| `05-claude-code-workflow.md` | 12 prompts de debug + agents |
| `06-shopify-mcp-workflow.md` | MCP, CLI, REPL Liquid : quoi utiliser quand |
| `07-fix-playbook.md` | Le cœur technique : correctifs par famille |
| `08-safety-and-git.md` | Ne jamais casser la production. Rollback. Git bisect |
| `09-testing-and-regression.md` | Tests, non-régression, Quality Gate |
| `10-report-templates.md` | Les 5 livrables client |
| `11-fiverr-offer.md` | Gig, 3 packages, FAQ |
| `12-upwork-offer.md` | Positionnement, proposals, red flags |
| `13-pricing.md` | Tarification d'un travail à durée inconnue |
| `14-practice-project.md` | 5 jours d'entraînement sur bugs fabriqués |
| `claude/` | CLAUDE.md addendum + 3 agents |
| `templates/bug-log.md` | Journal de mission |

---

## 01 — Business Understanding

**Le client n'achète pas une correction. Il achète la fin d'une hémorragie et la fin de son angoisse.**

Différence fondamentale avec la Phase 1 : en optimisation, le client veut *mieux*. En correction de bug, il veut *que ça s'arrête*. Cela change tout :

| | Phase 1 (Speed) | Phase 2 (Bug) |
|---|---|---|
| État émotionnel | Curieux, comparateur | Stressé, parfois paniqué |
| Sensibilité au prix | Élevée | **Faible** |
| Sensibilité au délai | Faible | **Extrême** |
| Critère de succès | Chiffres mesurés | Binaire : ça marche ou non |
| Risque principal | Ne pas impressionner | **Casser autre chose** |
| Récurrence | Faible | **Élevée** — un client qui a un bug en aura d'autres |

Le bug est le meilleur produit d'appel du freelance Shopify : marge horaire supérieure, cycle de vente très court (souvent moins d'une heure entre le message et l'accord), et il ouvre la porte à tout le reste. Un client dont tu as réparé le panier un dimanche soir ne consultera pas la concurrence pour sa prochaine mission.

**Le piège symétrique :** un bug mal corrigé, ou une correction qui en crée un autre, détruit la relation instantanément. En Phase 1 une erreur coûte un score. Ici elle coûte des commandes.

### Ce que le client ne sait pas et que tu dois savoir

- La majorité des « bugs de thème » ne viennent pas du thème mais d'un **conflit d'application**, ou d'une modification faite par quelqu'un dans l'éditeur de code sans historique.
- Liquid **échoue silencieusement** dans la plupart des cas : un objet inexistant rend une chaîne vide, pas une erreur. Le symptôme apparaît donc loin de la cause.
- Une boucle `for` s'arrête à 50 itérations sans prévenir. Le client voit « il manque des produits », pas une erreur.
- Il n'existe pas de journal d'erreurs serveur accessible sur Shopify. Ton seul terrain d'observation, c'est le navigateur et le code.

---

## 02 — Service Definition

**Nom de la prestation :** Shopify Theme & Liquid Bug Fixing

**Définition en une phrase :**
> Je reproduis votre problème, j'en identifie la cause exacte, je corrige sur un thème de développement, je vérifie que rien d'autre n'a bougé, et je vous explique ce qui s'était passé.

**Dans le scope**
- Erreurs Liquid, sections cassées, snippets manquants
- Bugs de panier (AJAX, drawer, quantités, prix, redirections)
- Bugs de page produit (variantes, images, prix, disponibilité, formulaire)
- Bugs de collection (filtres, tri, pagination, produits manquants)
- Bugs JavaScript et erreurs console
- Problèmes de responsive et d'affichage mobile
- Sections indisponibles ou cassées dans le Theme Editor
- Erreurs de `{% schema %}` et de templates JSON
- Metafields et sources dynamiques non affichés
- Conflits entre applications (identification + contournement côté thème)
- Régressions après mise à jour de thème ou intervention d'un tiers

**Hors scope**
- Correction du code d'une application tierce (tu ne peux pas l'éditer)
- Bugs de checkout hors Shopify Plus
- Développement de fonctionnalités nouvelles (→ Phase 4)
- Problèmes d'infrastructure Shopify
- Récupération de données perdues
- « Rendre le site conforme à cette maquette » — c'est du développement, pas du debug

**La distinction critique à faire signer :** *corriger un bug* ≠ *ajouter ce qui n'a jamais existé*. C'est la première source de dérive de périmètre dans cette prestation.

---

## 03 — Target Clients

| Segment | Signal | Urgence | Prix | Récurrence |
|---|---|---|---|---|
| **Marchand en panne** | « Le panier ne marche plus » | Maximale | 80–400 € | Élevée |
| **Marchand après mise à jour de thème** | « Depuis la mise à jour, ma page produit est cassée » | Haute | 150–600 € | Moyenne |
| **Marchand abandonné par son dev** | « Mon développeur ne répond plus » | Variable | 200–1 500 € | **Très élevée** |
| **Agence débordée** | Ticket précis, brief propre | Haute | 60–120 €/h | **Excellente** |
| **Marchand qui a bricolé** | « J'ai touché au code et… » | Haute | 80–300 € | Élevée |

Le segment **agence** est le plus rentable en Phase 2 : le brief est déjà écrit, l'accès est déjà en place, le paiement est fiable, et le flux est continu. Trois agences clientes valent mieux que trente marchands.

**À refuser**
- Client sans accès, qui veut que tu devines
- Client qui refuse la duplication du thème
- « Corrige tous les bugs du site » sans liste
- Bug non reproductible et client qui ne peut ni le décrire ni le filmer

---

## 04 — Client Requirements

Sans ces six éléments, tu ne démarres pas :

1. **L'URL exacte** où le bug se produit
2. **Les étapes pour le reproduire**, dans l'ordre
3. **Une capture ou une vidéo** (l'écran d'enregistrement du téléphone suffit)
4. **Appareil, navigateur, version** où le problème apparaît
5. **Depuis quand**, et ce qui s'est passé juste avant
6. **L'accès** (Theme Access App de préférence)

Le point 5 est le plus rentable : dans la majorité des cas, la réponse contient la cause. « Depuis qu'on a installé l'app X » ou « depuis la mise à jour du thème » supprime des heures de recherche.

Formulaire complet → `02-client-questionnaire.md`

---

## 05 — Tools

| Outil | Usage en Phase 2 |
|---|---|
| **Chrome DevTools — Console** | Erreurs JS, première chose à ouvrir, toujours |
| **DevTools — Network** | Requêtes AJAX en échec, statuts 4xx/5xx, payload |
| **DevTools — Elements** | Ce que Liquid a réellement rendu vs ce qui est attendu |
| **`shopify theme console`** | **REPL Liquid sur données réelles du store.** L'outil le plus sous-utilisé du métier |
| **`shopify theme check`** | Erreurs de syntaxe, schémas invalides, filtres dépréciés |
| **`shopify theme dev`** | Reproduire en local avec rechargement à chaud |
| **`git bisect`** | Trouver le commit fautif quand il y a un historique |
| **`git diff`** | Comparer thème cassé vs thème sain |
| **Theme Editor** | Reproduire les bugs qui n'existent que dans l'éditeur |
| **Shopify Dev MCP** | Vérifier objets, filtres, endpoints, valider le Liquid corrigé |
| **Claude Code** | Recherche dans le code, hypothèses, correctif, non-régression |
| **Un iPhone réel** | Les bugs Safari iOS ne se reproduisent pas dans l'émulateur |

---

## 06 — VS Code Workspace

Même racine qu'en Phase 1. Structure par mission :

```
clients/{client}/
├── 00_brief/
│   ├── bug-report.md            ← ce que le client a décrit
│   └── evidence/                ← captures, vidéos, HAR, logs console
├── 01_diagnosis/
│   ├── reproduction.md          ← étapes fiables de reproduction
│   ├── root-cause-analysis.md
│   └── hypotheses.md            ← testées et écartées : garde-les
├── 04_development/
│   └── theme/                   ← git init + tag baseline
├── 05_testing/
│   └── regression-report.md
└── 07_delivery/
```

Deux dossiers spécifiques à cette phase :
- **`evidence/`** — tu y déposes tout ce que le client envoie, horodaté. En cas de désaccord (« ce bug existait déjà »), c'est ta seule preuve.
- **`hypotheses.md`** — les pistes écartées. Elles valent autant que la bonne : elles t'évitent de tourner en rond, et elles nourrissent le rapport final.

---

## 07 — Claude Code Workflow

Le principe change par rapport à la Phase 1 :

> **Claude Code ne devine pas la cause. Il réduit l'espace de recherche.**

Un LLM face à un bug produit spontanément une explication plausible. C'est exactement le danger : plausible n'est pas vrai, et une correction appliquée à une fausse cause fait disparaître le symptôme sans régler le problème — il reviendra, ailleurs, plus tard.

```
1. REPRODUIRE   toi, dans le navigateur       (Claude ne voit pas ton écran)
2. COLLECTER    console, network, HTML rendu   (toi)
3. LOCALISER    Claude cherche dans le code    (lecture seule)
4. HYPOTHÈSES   Claude en produit 3, classées par probabilité, avec un test pour chacune
5. TESTER       toi + REPL Liquid : tu valides ou tu écartes
6. CORRIGER     un correctif minimal, un commit
7. NON-RÉGRESSION  Claude relit le diff, toi tu testes les parcours
8. EXPLIQUER    Claude rédige la cause racine pour le client
```

L'étape 4 est la seule qui compte. **Exige toujours trois hypothèses avec un test de discrimination pour chacune** — jamais une réponse unique et affirmative.

12 prompts prêts → `05-claude-code-workflow.md`

---

## 08 — Shopify MCP Workflow

Rappel Phase 1 : seul le **Dev MCP** est autorisé sur une mission client.

En Phase 2, il sert à trois choses précises :
1. **Vérifier qu'un objet, une propriété ou un filtre existe vraiment.** Beaucoup de bugs viennent de code écrit par quelqu'un (humain ou IA) qui a inventé une propriété Liquid. Le Dev MCP tranche en dix secondes.
2. **Vérifier le contrat d'une API** — Cart AJAX, Section Rendering — parce que ces endpoints ont des comportements précis et documentés que le code du client viole souvent.
3. **Valider le Liquid corrigé** (`validate_theme`) avant commit.

Ce qu'il ne fait pas : voir le store, reproduire le bug, lire l'état du panier. Pour l'état réel des données, l'outil c'est **`shopify theme console`** — un REPL Liquid connecté aux vraies données du store, avec contexte de page via `--url`.

Détail → `06-shopify-mcp-workflow.md`

---

## 09 — Technical Workflow

```
PROBLÈME CLIENT
      ↓
TRIAGE          urgence ? production cassée ? → protocole d'urgence
      ↓
REPRODUCE       étapes fiables, sinon rien ne commence
      ↓
ISOLATE         thème ? app ? navigateur ? données ? éditeur ?
      ↓
TRACE           du symptôme jusqu'à la ligne
      ↓
ROOT CAUSE      formulée en une phrase, testable
      ↓
FIX             minimal, un commit
      ↓
TEST            le bug est mort
      ↓
REGRESSION      rien d'autre n'est mort
      ↓
DELIVERY        preview + explication + rollback
```

L'étape que tout le monde saute est **ISOLATE**. C'est celle qui distingue un professionnel : avant de chercher *où* dans le thème, tu détermines *si* c'est le thème.

---

## 10 — Step-by-Step Execution

Détail complet dans `04-debugging-methodology.md` et `07-fix-playbook.md`. Les cinq tests d'isolation, dans l'ordre, avant toute lecture de code :

1. **Thème par défaut** — installer Dawn en non publié, reproduire. Si le bug disparaît → thème. S'il persiste → app ou données.
2. **Mode navigation privée** — si le bug disparaît → cache, extension, ou session.
3. **Console** — une erreur JS ? Quel fichier, quelle origine ?
4. **Theme Editor** — le bug existe-t-il aussi dans l'éditeur, ou seulement là ?
5. **Un autre produit / une autre page** — bug global ou lié à une donnée précise ?

Cinq minutes qui économisent trois heures.

---

## 11 — Testing

Trois cercles concentriques :

1. **Le bug** — reproduire les étapes exactes du client. Ne pas se contenter de « ça a l'air de marcher ».
2. **La zone** — tout ce qui touche au fichier modifié.
3. **Le parcours d'achat complet** — systématiquement, même pour une correction CSS d'une ligne.

Protocole → `09-testing-and-regression.md`

---

## 12 — QA

Quality Gate spécifique Phase 2, bloquant :

- [ ] Le bug est reproductible **avant** le correctif et introuvable **après**
- [ ] Testé sur l'appareil/navigateur exact signalé par le client
- [ ] `shopify theme check --fail-level error` → 0 erreur
- [ ] Aucune nouvelle erreur en console
- [ ] Parcours d'achat complet OK
- [ ] Theme Editor fonctionnel
- [ ] `git diff` minimal et relu
- [ ] La cause racine est formulée et écrite

Le dernier point est bloquant lui aussi : **si tu ne sais pas expliquer pourquoi ça marchait pas, tu ne sais pas si tu l'as réparé.** Un symptôme qui disparaît sans cause identifiée est un bug en sommeil.

---

## 13 — Documentation

Cinq livrables, décrits dans `10-report-templates.md` :

`bug-report.md` · `root-cause-analysis.md` · `fix-plan.md` · `testing-report.md` · `delivery-report.md`

Sur une petite mission (60 €, une heure), tu ne produis pas cinq documents : tu produis un seul message de livraison contenant *symptôme → cause → correctif → ce qui a été testé*. La structure reste la même, le format s'adapte au prix.

---

## 14 — Client Delivery

```
Preview du thème corrigé
      ↓
Explication de la cause racine, en français simple
      ↓
Liste de ce qui a été testé
      ↓
Validation du client sur le preview
      ↓
Publication après accord écrit
      ↓
Vérification immédiate + suivi 48 h
      ↓
Recommandation de prévention (→ upsell)
```

Le paragraphe « voici pourquoi c'est arrivé » est ce qui transforme une correction en relation durable. Le client comprend qu'il a affaire à quelqu'un qui a compris, pas à quelqu'un qui a bricolé jusqu'à ce que ça marche.

---

## 15 — Fiverr Offer

→ `11-fiverr-offer.md`
Résumé : **Basic 45 $** (1 bug simple, 24 h), **Standard 120 $** (bug complexe ou 3 petits, 48 h), **Premium 299 $** (bugs multiples + rapport + 7 jours de garantie).

---

## 16 — Upwork Offer

→ `12-upwork-offer.md`
Positionnement à l'heure recommandé sur cette phase, contrairement à la Phase 1.

---

## 17 — Pricing

→ `13-pricing.md`
Le problème central de cette prestation : **tu vends un travail dont tu ignores la durée**. La réponse est le diagnostic payant à prix fixe, puis la correction chiffrée.

---

## 18 — Upsells

Le bug est la porte d'entrée la plus efficace de tout ton catalogue.

1. **Audit de santé du thème** (150–400 €) — « pendant que j'y étais, j'ai vu trois autres choses »
2. **Retainer support** (200–600 €/mois) — le plus naturel après une urgence bien gérée
3. **Mise en place d'un système de sauvegarde et de versionnage** (200–500 €) — vends-le après avoir constaté qu'il n'y en avait aucun
4. **Optimisation performance** (→ Phase 1)
5. **Nettoyage du code d'apps désinstallées**
6. **Mise à jour de thème encadrée** — mission redoutée par les marchands, très bien payée

Le meilleur moment pour proposer : **juste après la confirmation que le bug est réglé.** Le contraste émotionnel entre l'angoisse et le soulagement est à son maximum.

---

## 19 — Common Mistakes

| Erreur | Conséquence |
|---|---|
| Corriger sans avoir reproduit | Tu corriges autre chose, le bug revient, tu perds le client |
| Accepter la cause proposée par le client | « C'est sûrement l'app X » est faux une fois sur deux |
| Croire la première hypothèse de l'IA | Plausible ≠ vrai. Toujours trois hypothèses et un test |
| Corriger le symptôme (`display:none`) | Le vrai problème reste et ressortira ailleurs |
| Toucher au thème publié « juste pour tester » | Bug visible par les clients pendant que tu cherches |
| Corriger plusieurs bugs dans un commit | Impossible d'annuler l'un sans l'autre |
| Ne pas tester le parcours d'achat après un correctif CSS | Un `overflow` mal placé peut rendre un bouton inatteignable sur mobile |
| Oublier le Theme Editor | Le site marche, le client ne peut plus rien éditer |
| Facturer au forfait un bug non diagnostiqué | Tu travailles gratuitement quand ça dérape |
| Promettre un délai avant d'avoir reproduit | Tu ne connais pas encore le problème |
| Ne pas documenter la cause | Le client rappelle dans trois mois, tu ne te souviens de rien |

---

## 20 — Professional Checklist

```
[ ] Bug reproduit par moi, étapes écrites
[ ] Preuves archivées dans evidence/ avec horodatage
[ ] Cinq tests d'isolation effectués
[ ] Thème dupliqué + git init + tag baseline
[ ] Trois hypothèses formulées, chacune avec son test
[ ] Cause racine identifiée et formulée en une phrase
[ ] Correctif minimal, un seul commit
[ ] Theme Check sans erreur
[ ] Bug introuvable sur l'appareil exact du client
[ ] Parcours d'achat complet testé
[ ] Theme Editor testé
[ ] git diff relu ligne par ligne
[ ] Cause racine expliquée au client en langage simple
[ ] Accord écrit avant publication
[ ] Vérification post-publication + suivi 48 h
[ ] Prévention proposée
```

---

## 21 — Practice Project

Tu fabriques les bugs, tu les oublies, tu les retrouves. Programme de 5 jours → `14-practice-project.md`

---

## 22 — Deliverables

| Fichier | Quand | Lecteur |
|---|---|---|
| `bug-report.md` | Après reproduction | Toi + client |
| `root-cause-analysis.md` | Après diagnostic | Client (et son futur dev) |
| `fix-plan.md` | Avant correction, si mission > 300 € | Client |
| `testing-report.md` | Après correction | Client |
| `delivery-report.md` | À la livraison | Client |

Gabarits → `10-report-templates.md`

---

# PHASE 2 COMPLETE

Envoie `START PHASE 3` pour ouvrir **Shopify Store Audit + Conversion Report**.
