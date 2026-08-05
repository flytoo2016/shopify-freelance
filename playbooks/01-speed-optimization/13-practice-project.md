# 13 — Practice Project

Tu ne t'entraînes pas sur un client. Tu construis un store que tu dégrades volontairement, puis tu le répares avec la méthode complète. À la fin, tu as deux choses : la compétence, et le rapport qui te servira de portfolio.

**Durée : 5 jours, 3 à 4 h par jour.**

---

## Préparation

1. Crée un **development store** depuis ton Partner Dashboard (gratuit).
2. Ajoute du contenu réaliste : 20 produits avec de vraies images, 3 collections, une home complète. Un store vide donne des mesures qui ne veulent rien dire.
3. Installe un thème gratuit (Dawn, ou le thème Skeleton via `shopify theme init`).
4. `shopify theme pull`, `git init`, `git tag clean`.

---

## Jour 1 — Mesurer un thème sain

Objectif : savoir à quoi ressemble « normal ».

```
[ ] Lighthouse mobile, 3 runs, sur home / collection / produit
[ ] Noter les médianes : score, LCP, TBT, CLS, poids, requêtes
[ ] Identifier l'élément LCP de chaque page
[ ] Exporter les HAR
[ ] Coverage : % de CSS et JS inutilisés
[ ] shopify theme profile sur une page produit
```

**Livrable :** `baseline-clean.md`. C'est ton étalon. Tu y reviendras pendant des mois.

---

## Jour 2 — Casser le store, méthodiquement

Reproduis les pathologies réelles. Un commit par dégradation, pour pouvoir les isoler.

```
[ ] Mettre loading="lazy" sur l'image hero
[ ] Retirer width et height de toutes les images d'une section
[ ] Ajouter jQuery en <script src> bloquant dans <head>
[ ] Ajouter un carrousel avec une bibliothèque tierce lourde
[ ] Charger 4 graisses de police depuis Google Fonts
[ ] Uploader une image de 4 000 px pour la bannière
[ ] Ajouter un script inline de 30 KB dans <head>
[ ] Injecter un faux widget qui s'insère après 800 ms sans espace réservé
[ ] Ajouter une boucle Liquid non paginée sur une grande collection
[ ] Précharger 6 ressources
```

**Livrable :** `damage-log.md` — quelle dégradation, quelle métrique elle devrait affecter, ta prédiction chiffrée.

---

## Jour 3 — Auditer comme si c'était un client

Interdiction absolue de consulter `damage-log.md`. Tu appliques `03-audit-methodology.md` de bout en bout.

```
[ ] Lighthouse 3 runs × 3 pages
[ ] Élément LCP identifié via l'observer
[ ] Sources de CLS identifiées via l'observer
[ ] Long tasks tracées jusqu'au fichier source
[ ] Inventaire réseau par origine et par poids
[ ] Coverage
[ ] theme profile
[ ] Claude Code : indexation + diagnostic en lecture seule
[ ] Tableau des constats, un par ligne, chacun sourcé fichier:ligne
[ ] Plan P0→P3 avec impact / effort / risque
```

**Livrable :** `performance-audit.md` complet.

**Le moment d'apprentissage :** compare ensuite ton audit à ton `damage-log.md`.

- Quelles dégradations as-tu **manquées** ? → ta méthode a un angle mort. Corrige-la dans `03-audit-methodology.md`.
- Quelles ont eu **moins d'impact que prévu** ? → tu surestimeras leurs corrections face à un client.
- Quelles ont eu **plus d'impact que prévu** ? → ce sont tes futurs arguments de vente.

Cet exercice de calibration vaut plus que les quatre autres journées réunies.

---

## Jour 4 — Réparer

```
[ ] Une branche par correctif : perf/xxx
[ ] Un commit par correctif, message au format de 12-delivery-checklist.md
[ ] shopify theme check --fail-level error après chaque commit
[ ] validate_theme (Dev MCP) sur chaque fichier Liquid modifié
[ ] Test fonctionnel après chaque commit
[ ] Mesure intermédiaire après les 3 correctifs P0
```

**Exercice imposé :** implémente le pattern **import-on-interaction** sur le widget lourd du jour 2, et vérifie dans Network que le fichier n'est **pas** chargé tant que tu ne cliques pas.

**Deuxième exercice imposé :** casse volontairement quelque chose (retire une bibliothèque dont un script dépend), constate la panne, puis exécute un `git revert`. Tu dois avoir fait ce geste au moins une fois **avant** d'en avoir besoin chez un client.

---

## Jour 5 — Mesurer, rédiger, vendre

```
[ ] Mesures after, conditions strictement identiques au jour 3
[ ] Quality Gate complet
[ ] performance-before-after.md
[ ] performance-report.md
[ ] Conversion en PDF
[ ] Rédaction du message de livraison
```

**Livrable final :** un dossier complet, présentable, anonymisable. C'est ce PDF qui vend ton gig Fiverr, pas ta description.

---

## Auto-évaluation

Tu es prêt pour un vrai client si tu peux répondre **oui** à tout :

```
[ ] Je sais identifier l'élément LCP d'une page en moins de 3 minutes
[ ] Je sais distinguer données terrain et données labo, et je sais l'expliquer
    à un non-technicien en deux phrases
[ ] Je sais retrouver la section d'origine d'un élément dans un thème inconnu
[ ] Je sais ce qui casse quand j'ajoute defer à un script, et comment le vérifier
[ ] J'ai déjà fait un git revert sous pression
[ ] Je sais dire à un client ce que je NE PEUX PAS corriger, sans m'excuser
[ ] Mon rapport ne contient aucun chiffre que je n'ai pas mesuré
[ ] Je sais expliquer pourquoi un score PageSpeed de 95 peut coexister avec
    des Core Web Vitals en échec
```

---

## Les 5 exercices suivants (quand les 5 jours sont bouclés)

1. **Recommence sur un thème premium** acheté ou sur un thème d'essai. Le code y est radicalement différent de Dawn — c'est ce que tu rencontreras en mission.
2. **Audite 5 boutiques réelles** trouvées publiquement, sans les contacter. Uniquement des données publiques (PageSpeed/CrUX + code source visible). Objectif : vitesse de diagnostic.
3. **Écris tes propres slash commands** dans `.claude/commands/` à partir des prompts que tu utilises le plus.
4. **Chronomètre-toi.** Note le temps réel de chaque étape. C'est la base de ton pricing.
5. **Fais relire un de tes rapports** par quelqu'un de non technique. Si une phrase le bloque, elle bloquera un client.

---

# PHASE 1 COMPLETE

Le système de la Phase 1 est complet : diagnostic, exécution, sécurité, livraison, vente et entraînement.

Envoie **`START PHASE 2`** pour ouvrir *Fix Shopify Theme / Liquid Bugs*.
