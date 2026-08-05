# 14 — Practice Project

Tu fabriques les bugs, tu les oublies, tu les retrouves. C'est le seul moyen d'apprendre le debug sans facturer ton apprentissage à un client.

**Durée : 5 jours, 3 à 4 h par jour.** Utilise le même development store que celui de la Phase 1, remis à neuf.

---

## Préparation

```bash
shopify theme pull --store {{dev-store}}.myshopify.com --path ./theme-lab
cd theme-lab && git init && git add . && git commit -m "chore: état sain" && git tag sain
```

Ajoute du contenu réaliste : 20 produits dont plusieurs à variantes multiples, un produit sans metafield renseigné, une collection de plus de 50 produits, deux marchés si possible. **Un store vide ne produit pas de bugs réalistes.**

---

## Jour 1 — Maîtriser les outils avant d'en avoir besoin

Le pire moment pour découvrir un outil, c'est pendant une urgence client.

```
[ ] shopify theme console --url /products/xxx
    → inspecter product.metafields, options_with_values, variants, cart.items
[ ] shopify theme check sur le thème sain : noter ce qu'il remonte déjà
[ ] Relever la baseline de la console navigateur : quelles erreurs existent DÉJÀ ?
[ ] Ouvrir le Theme Editor, observer les événements shopify:section:*
    (écouter et logger tous les événements dans la console)
[ ] Provoquer volontairement une erreur Liquid et observer ce que Shopify affiche
[ ] Provoquer une requête cart/add.js en erreur et lire la réponse dans Network
[ ] Faire un git bisect complet sur un historique fabriqué de 20 commits
```

**Livrable :** `outils.md` — ce que chaque outil montre, ce qu'il ne montre pas.

Le dernier point est essentiel : **fais un `git bisect` au moins une fois avant d'en avoir besoin.** Sous pression, on n'apprend pas une commande.

---

## Jour 2 — Fabriquer les bugs

Un commit par bug, avec un message neutre (`chore: modification 07`) pour ne pas te donner la réponse. Note-les dans un fichier **que tu ne rouvriras pas avant le jour 4**.

```
[ ] Remplacer un {% include %} par {% render %} sans passer les variables
[ ] Retirer un {% paginate %} sur une collection de 60+ produits
[ ] Coder en dur '/cart/add.js' au lieu de window.Shopify.routes.root
[ ] Utiliser update.js là où change.js est nécessaire (produit en double au panier)
[ ] Supprimer la gestion d'erreur d'une réponse Cart AJAX
[ ] Introduire une virgule en trop dans un {% schema %}
[ ] Référencer dans un template JSON une section renommée
[ ] Initialiser un carrousel uniquement sur DOMContentLoaded
[ ] Retirer {{ block.shopify_attributes }} d'un wrapper de bloc
[ ] Afficher un metafield sans garde {% if %}, sur un produit où il est absent
[ ] Afficher l'objet metafield au lieu de sa valeur
[ ] Poser un écouteur sur un élément injecté après le chargement
[ ] Ajouter overflow: hidden qui masque un bouton en dessous de 480 px
[ ] Utiliser 100vh sur une section plein écran (à tester sur iPhone réel)
[ ] Renommer une classe CSS utilisée par le JavaScript
```

**Livrable :** `bugs-fabriques.md` — pour chaque bug : ce que tu as changé, le symptôme attendu, et ta prédiction du temps de diagnostic.

Puis **ferme ce fichier**. Idéalement, laisse passer 48 h avant le jour 3.

---

## Jour 3 — Diagnostiquer à l'aveugle

Interdiction absolue de rouvrir `bugs-fabriques.md`.

Pour chaque symptôme trouvé en parcourant le site, applique la méthodologie complète et **chronomètre-toi** :

```
[ ] Reproduction écrite (étapes, environnement, fréquence)
[ ] Les 5 tests d'isolation
[ ] Trois hypothèses avec un test de discrimination pour chacune
[ ] Cause racine formulée en une phrase
[ ] Vérification : je peux recréer le bug volontairement
```

**Livrable :** un `bug-report.md` + `root-cause-analysis.md` par bug, et le temps réel de chacun.

### La séance de calibration

Rouvre `bugs-fabriques.md` et compare.

| Question | Ce que ça t'apprend |
|---|---|
| Quels bugs n'ai-je **pas trouvés** en parcourant le site ? | Ton parcours de vérification a des angles morts. Corrige ta checklist |
| Quels ont pris **beaucoup plus longtemps** que prévu ? | Ce sont ceux qu'il ne faut jamais vendre au forfait |
| Quels ont pris **moins longtemps** ? | Tes bugs simples : ton produit d'appel |
| Sur lesquels ai-je diagnostiqué la **mauvaise cause** ? | Les plus importants. Note pourquoi la fausse piste était crédible |
| Quel test d'isolation m'a fait gagner le plus de temps ? | À placer en premier dans ta méthode |

Cette séance vaut plus que les quatre autres journées. C'est elle qui transforme une méthode théorique en réflexe, et qui te donne les données réelles pour ton pricing.

---

## Jour 4 — Corriger

```
[ ] Une branche par bug : fix/xxx
[ ] Un commit par correctif, message complet (symptôme, cause, testé)
[ ] shopify theme check après chaque commit
[ ] validate_theme (Dev MCP) sur chaque fichier Liquid modifié
[ ] Contrôle de causalité : git stash → le bug revient ? → git stash pop
[ ] Parcours d'achat complet testé après chaque correctif
```

**Exercice imposé 1.** Corrige le bug de panier multi-marché et vérifie sur les **deux** marchés. Si tu n'as qu'un marché, crée-en un second : c'est une catégorie de bugs que tu rencontreras et que tu ne peux pas apprendre autrement.

**Exercice imposé 2.** Corrige le bug du Theme Editor avec les événements `shopify:section:load` / `unload`, et vérifie qu'ajouter, déplacer, puis supprimer la section fonctionne sans double initialisation.

**Exercice imposé 3.** Casse volontairement quelque chose pendant une correction, constate la régression via ton parcours de test, puis exécute un `git revert`. Tu dois avoir fait ce geste **avant** d'en avoir besoin chez un client.

---

## Jour 5 — Livrer et vendre

```
[ ] Quality Gate complet sur l'ensemble
[ ] testing-report.md
[ ] delivery-report.md rédigé pour un lecteur non technique
[ ] Version courte (4 blocs) pour un bug simple
[ ] Conversion en PDF
[ ] Anonymisation → portfolio
```

**Exercice de rédaction.** Prends ton bug le plus technique et explique-le en quatre paragraphes à quelqu'un qui ne code pas. Fais-le lire à une personne réelle. Si elle bloque sur une phrase, un client bloquera aussi.

**Exercice commercial.** Rédige le message de pré-commande Fiverr et la proposal Upwork correspondant à **un** de ces bugs, comme s'il s'agissait d'une vraie annonce.

---

## Auto-évaluation

Tu es prêt pour un vrai client si tu peux répondre **oui** à tout :

```
[ ] J'exécute les 5 tests d'isolation par réflexe, avant de lire du code
[ ] Je sais lire une requête Cart AJAX en échec dans Network et en tirer la cause
[ ] Je connais la différence entre add.js, change.js et update.js, et quand
    change.js exige une clé de ligne
[ ] Je sais utiliser le REPL Liquid pour vérifier une donnée en 30 secondes
[ ] Je sais faire un git bisect sans relire la documentation
[ ] Je formule trois hypothèses avant de corriger, systématiquement
[ ] Je vérifie ma cause en recréant le bug volontairement
[ ] Je sais dire à un client « c'est une application, je ne peux pas la corriger »
    sans m'excuser et sans perdre la mission
[ ] Je sais distinguer un bug d'une fonctionnalité inexistante, et le dire
[ ] Je n'ai jamais publié sans accord écrit
[ ] Je sais expliquer une cause technique en français simple
```

---

## Les exercices suivants

1. **Recommence sur un thème premium.** La structure y est radicalement différente de Dawn. C'est ce que tu rencontreras en mission.
2. **Réponds à 10 discussions du forum Shopify Community** décrivant des bugs. Diagnostic uniquement, sans accès au store. Excellent entraînement à la formulation d'hypothèses avec peu d'information.
3. **Fabrique un scénario de régression post-mise à jour** : personnalise un thème, mets-le à jour, perds tes modifications, puis restaure-les par comparaison de deux `theme pull`.
4. **Chronomètre chaque étape de chaque bug.** C'est la base de ta classification simple/moyen/complexe, donc de ton pricing.
5. **Écris tes propres slash commands** dans `.claude/commands/` à partir des prompts que tu réutilises le plus.

---

# PHASE 2 COMPLETE

Le système est complet : triage, diagnostic, correction, sécurité, tests, livraison, vente et entraînement.

Envoie **`START PHASE 3`** pour ouvrir *Shopify Store Audit + Conversion Report*.
