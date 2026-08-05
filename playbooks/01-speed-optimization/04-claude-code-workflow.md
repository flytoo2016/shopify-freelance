# 04 — Claude Code Workflow

---

## A. Le principe directeur

> **Claude Code lit beaucoup, écrit peu, et jamais sans plan validé.**

Un thème Shopify n'est pas un projet greenfield. C'est du code que tu n'as pas écrit, sur un site qui gagne de l'argent, avec des dépendances invisibles (apps qui ciblent des classes CSS, Theme Editor qui dépend des `schema`, JSON templates qui référencent des IDs de sections). Une refonte automatique « pour la performance » est la meilleure façon de casser un site en silence.

Les trois règles à mettre dans le CLAUDE.md et à ne jamais assouplir :

1. **Une modification = un fichier = un commit.** Jamais de refactor multi-fichiers en une passe.
2. **Aucune suppression de code sans preuve d'inutilisation.** « Ça a l'air inutilisé » n'est pas une preuve. Coverage + `grep` + test manuel le sont.
3. **Le `{% schema %}` est un contrat public.** Modifier un `id` de setting détruit les réglages du marchand. Interdit sans instruction explicite.

---

## B. Le pipeline en 7 étapes

```
1. INDEX     Claude cartographie le thème                    (lecture seule)
2. MEASURE   TOI : baseline terrain + labo                   (Claude ne mesure pas)
3. DIAGNOSE  Claude corrèle mesures ↔ code                   (lecture seule)
4. PLAN      Claude écrit un plan atomique  →  TU VALIDES     (aucune écriture)
5. IMPLEMENT un correctif → un commit → un test              (écriture encadrée)
6. VERIFY    TOI : mesure identique à la baseline
7. REPORT    Claude rédige, TU vérifies chaque chiffre
```

L'étape 2 ne peut pas être déléguée : Claude Code ne charge pas de pages dans un navigateur réel et ne voit pas ton dashboard RUM. **Tu es le capteur.** Claude est l'analyste et l'exécutant.

---

## C. Les 12 prompts

### 1 — Indexation (première commande sur tout nouveau thème)

```
Tu travailles sur un thème Shopify en LECTURE SEULE. Ne modifie aucun fichier.

Cartographie ce thème et écris clients/{{client}}/01_audit/theme-map.md :

1. Nom, version, base (Dawn/Skeleton/premium/custom ?) — cite settings_schema.json
2. layout/theme.liquid : liste ordonnée de TOUT ce qui est chargé dans <head> et en
   fin de <body> — pour chaque entrée : fichier, type, attribut (defer/async/aucun),
   et ligne exacte
3. Templates JSON : quelles sections sont utilisées sur index, product, collection
4. assets/ : les 15 fichiers les plus lourds, avec taille
5. Traces d'apps : blocs de code injectés, commentaires "app", scripts distants,
   snippets orphelins
6. Bibliothèques tierces détectées (jQuery, slick, swiper, lodash…) et leur point
   d'inclusion
7. Les 10 fichiers Liquid les plus longs

Format tableau. Chaque affirmation référencée par fichier:ligne.
Termine par « ZONES À RISQUE » : ce qui semble fragile ou custom et mérite prudence.
```

### 2 — Chasse au render-blocking

```
En LECTURE SEULE, analyse layout/theme.liquid et les sections utilisées sur la home.

Liste toute ressource bloquant le rendu initial :
- <script> sans defer ni async
- <link rel="stylesheet"> non critique chargé de façon synchrone
- @import CSS
- scripts inline lourds dans <head>

Pour chacun : fichier:ligne, poids si local, ce qu'il fait (déduis-le du code, dis-le
si tu n'es pas sûr), et si defer/async est SÛR ou RISQUÉ — justifie le risque
(dépendance à un ordre d'exécution, usage de document.write, etc.).

Ne propose aucune modification à ce stade. Classe par gain estimé.
```

### 3 — Diagnostic LCP (après ta mesure)

```
Contexte mesuré :
- LCP mobile : {{X}} s (P75 terrain : {{Y}} s)
- Élément LCP identifié par Lighthouse : {{sélecteur}}
- Page : {{URL}}

Trouve dans le thème le code exact qui rend cet élément.
Analyse ensuite :
1. Comment l'image est-elle générée ? (image_tag / image_url / <img> brut / CSS background)
2. Attributs loading, fetchpriority, width, height, srcset, sizes présents ?
3. Y a-t-il un preload ? Où ?
4. L'élément est-il dans un carrousel/slider ? Si oui, le JS retarde-t-il son affichage ?
5. La section est-elle en première position ? (section.index / section.location)

Produis un diagnostic « cause probable » avec niveau de confiance et ce qu'il faut
mesurer pour confirmer. NE MODIFIE RIEN.
```

### 4 — Chasse au CLS

```
Sources de CLS observées en production (layout-shift observer) :
{{coller les nodes relevés}}

Pour chacune, trouve le code responsable et classe la cause :
(a) image/iframe/video sans dimensions ou sans aspect-ratio réservé
(b) contenu injecté par JS au-dessus de contenu existant (app, bannière, widget avis)
(c) police web : FOUT/FOIT — vérifie font-display et les font-face
(d) contenu conditionnel Liquid qui change de hauteur

Pour chaque cause, donne le correctif MINIMAL et le risque visuel associé.
Précise ce qui vient d'une app tierce et n'est donc pas corrigeable dans le thème
(dans ce cas : quelle réservation d'espace est possible côté thème).
```

### 5 — Audit JavaScript

```
En lecture seule, audite tout le JavaScript du thème.

Pour chaque fichier de assets/ et chaque bloc inline :
- taille
- chargé sur quelles pages
- attribut de chargement
- ce qu'il fait
- est-il nécessaire au rendu initial ou au parcours d'achat ?

Signale spécifiquement :
- toute bibliothèque tierce et si une API navigateur native peut la remplacer
- les polyfills pour navigateurs obsolètes
- les fichiers > 10 KB compressés (seuil de la règle Theme Check AssetSizeJavascript)
- les candidats à l'import-on-interaction (widget chargé même sans interaction)
- le code qui n'est jamais appelé (croise avec le rapport Coverage ci-dessous)

{{coller l'extrait Coverage}}

Classe par (poids × probabilité d'inutilité). Ne supprime rien.
```

### 6 — Plan d'action (l'étape que tu valides)

```
À partir de theme-map.md, du rapport d'audit et des mesures baseline, écris
clients/{{client}}/01_audit/performance-action-plan.md.

Format : un tableau, une ligne par correctif.
Colonnes : ID | Fichier(s) | Correctif | Métrique visée | Gain attendu (fourchette)
| Effort | Risque | Priorité (P0-P3) | Comment tester

Règles :
- Un correctif = un fichier autant que possible. Si plusieurs fichiers, découpe.
- Ordre : impact décroissant / risque croissant.
- Sépare explicitement : CORRECTIFS THÈME (je fais) / DÉCISIONS CLIENT (apps, contenu)
  / NON CORRIGEABLE.
- Pour chaque gain attendu, donne une fourchette honnête et dis sur quoi elle repose.
  N'invente aucun chiffre.
- Aucune modification maintenant. J'approuverai ligne par ligne.
```

### 7 — Implémentation d'un correctif unique

```
Applique UNIQUEMENT le correctif {{P-01}} du plan.

Avant :  montre-moi le code actuel et ce que tu vas changer, puis attends mon "GO".
Après le GO :
1. modifie le strict minimum
2. lance `shopify theme check --fail-level error`
3. montre-moi `git diff`
4. propose un message de commit au format : perf(scope): description
5. liste ce que je dois tester manuellement pour valider

Ne touche à aucun autre correctif. Ne "profite pas" du passage pour nettoyer autre chose.
```

### 8 — Contrôle de sécurité avant commit

```
Analyse `git diff` et réponds à ces questions, une par une :
1. Y a-t-il une modification hors du périmètre du correctif annoncé ?
2. Une clé de setting {% schema %} a-t-elle été modifiée, renommée ou supprimée ?
3. Une classe CSS ou un ID a-t-il disparu ? Est-il référencé ailleurs (JS, app) ?
4. config/settings_data.json est-il touché ?
5. Un secret, token ou identifiant apparaît-il ?
6. Une balise Liquid a-t-elle été supprimée alors qu'une app pourrait en dépendre ?
Si l'un de ces points est positif : STOP, explique, propose une correction.
```

### 9 — Refactor d'images

```
Analyse la façon dont les images sont rendues dans {{fichier}}.

Objectifs : pas de CLS, LCP rapide, poids minimal.
Contraintes :
- utiliser image_url + image_tag (jamais img_url / img_tag, dépréciés)
- width et height toujours présents
- au-dessus de la ligne de flottaison : loading="eager" + fetchpriority="high"
- en dessous : loading="lazy"
- srcset et sizes cohérents avec la largeur réelle d'affichage
- ne PAS déterminer "au-dessus de la ligne de flottaison" au jugé : utiliser
  section.index / section.location quand la position est variable

Montre l'avant/après commenté, puis attends validation.
```

### 10 — Import-on-interaction

```
Le fichier {{assets/xxx.js}} pèse {{N}} KB et n'est utile que lorsque l'utilisateur
{{clique sur / ouvre / scrolle vers}} {{élément}}.

Propose une implémentation en import dynamique déclenché par l'interaction, avec :
- un fallback si le module échoue à charger
- aucune régression si l'utilisateur interagit avant la fin du chargement
- pas de framework, JS natif uniquement
Explique ce qui casse si l'utilisateur a JS désactivé.
```

### 11 — Optimisation Liquid

```
Profil de rendu obtenu via `shopify theme profile --url {{url}}` :
{{coller le résultat}}

Identifie dans le code les causes du coût de rendu serveur. Cherche notamment :
- boucles for dépassant 50 itérations (limite Liquid) sans paginate
- boucles imbriquées
- accès répétés à all_products, collections, ou linklists dans une boucle
- {% render %} appelé dans une boucle longue
- calculs recalculés à chaque itération au lieu d'être assignés avant

Pour chaque cause : le correctif, et la garantie que le rendu HTML final est IDENTIQUE.
```

### 12 — Rédaction du rapport

```
Rédige clients/{{client}}/07_delivery/performance-report.md à partir de :
- baseline : {{données}}
- after : {{données}}
- commits : `git log --oneline baseline..HEAD`

Contraintes de rédaction :
- Public : un marchand non technique. Tout terme technique expliqué à sa première
  occurrence, en une phrase.
- N'affirme AUCUN chiffre qui ne figure pas dans les données que je t'ai fournies.
- Distingue explicitement mesures labo et données terrain, et rappelle le délai
  de 30 jours du terrain.
- Aucune promesse de conversion ou de revenu.
- Inclure une section « ce qui reste à faire et pourquoi je ne l'ai pas fait ».
- Inclure le plan de rollback.
Suis le gabarit de 08-report-templates.md.
```

---

## D. Les 4 sous-agents

Fichiers prêts dans `claude/agents/`. Rappel de fonctionnement : un sous-agent tourne dans son propre contexte, avec sa propre liste d'outils. Un sous-agent **ne peut pas** afficher de demande de permission interactive — si son outil déclenche une règle `ask`, l'appel est refusé. D'où la règle : **les agents d'analyse sont en lecture seule, l'écriture reste à l'agent principal.**

| Agent | Rôle | Outils | Écriture |
|---|---|---|---|
| `shopify-auditor` | Cartographie et diagnostic | Read, Grep, Glob | ❌ |
| `performance-engineer` | Implémente un correctif à la fois | Read, Edit, Bash(theme check) | ✅ encadrée |
| `liquid-reviewer` | Relit le diff, cherche les régressions | Read, Grep, Bash(git diff) | ❌ |
| `report-writer` | Rédige les livrables client | Read, Write(docs/ uniquement) | ✅ docs |

---

## E. Les erreurs à ne jamais commettre avec Claude Code sur un thème client

| Anti-pattern | Conséquence réelle |
|---|---|
| « Optimise la performance de ce thème » | Refactor massif, site cassé, `git diff` de 3 000 lignes illisible |
| Laisser Claude supprimer du CSS « inutilisé » | Le CSS est souvent utilisé par une app ou une page rarement visitée |
| Renommer des `id` dans `{% schema %}` | Les réglages du marchand sont perdus, les sections se vident |
| Accepter un diff sans le lire | C'est ton nom sur la facture, pas celui de l'IA |
| Lancer `theme push` depuis Claude sans `--unpublished` | Production modifiée. `deny` dans settings.json est là pour ça |
| Demander un rapport avant d'avoir les chiffres | Le modèle produira des chiffres plausibles. **Ils seront faux.** Fournis toujours les données mesurées |
| Utiliser MCP pour lire le thème | Le Dev MCP ne lit pas le store. Utilise le CLI |

---

## F. Vérifier ce que produit Claude Code

Sur du Liquid généré ou modifié, utilise l'outil `validate_theme` du Shopify Dev MCP : il détecte les objets, filtres et balises Liquid inventés — l'erreur la plus fréquente et la plus silencieuse quand un LLM écrit du Liquid.

```
Valide les fichiers que tu viens de modifier avec l'outil validate_theme du Dev MCP,
puis lance shopify theme check --fail-level error. Corrige et revalide jusqu'à zéro erreur.
```

Et par-dessus : `git diff` lu par toi, ligne par ligne. Sans exception.
