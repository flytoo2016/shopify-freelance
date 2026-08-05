# 14 — Practice Project

Objectif : **une** section, complète, documentée, du niveau exact que tu vendrais 600 €. Pas trois sections bâclées. Une seule, finie.

**Durée : 5 jours, 3 à 4 h par jour.** Utilise ton development store, sur un thème Dawn ou Skeleton propre.

---

## Choisir le composant

Prends-en un qui **remplace une application payante courante** — c'est là qu'est le marché, et c'est ce qui rendra ton portfolio vendable :

| Composant | App remplacée typique | Difficulté |
|---|---|---|
| Barre de réassurance configurable | Trust badges | ⭐ |
| FAQ produit par metafield | FAQ apps | ⭐⭐ |
| Table de tailles conditionnelle par collection | Size chart apps | ⭐⭐ |
| Comparateur de deux variantes | Product compare | ⭐⭐⭐ |
| Bloc « bénéfices » avec icônes et blocks | Icon/feature apps | ⭐ |
| Onglets produit alimentés par metafields | Tabs apps | ⭐⭐ |

**Recommandation pour un premier :** la **FAQ produit par metafield**. Elle couvre tout ce qui compte — blocks, metafields, gardes sur donnée absente, `<details>` natif sans JS, accessibilité, presets — et elle est réellement vendable.

---

## Jour 1 — Spécification, sans écrire une ligne de code

```
[ ] Rédiger component-spec.md ENTIER (gabarit dans templates/)
[ ] Tous les cas limites décrits, y compris « aucun contenu renseigné »
[ ] Décision d'architecture tranchée et justifiée : section / theme block
[ ] Emplacement des données décidé, type de metafield choisi
[ ] Croquis texte mobile 375 px et desktop
[ ] Liste des réglages, avec labels rédigés pour un marchand
[ ] Ce que le marchand NE pourra PAS modifier, et pourquoi
```

**Interdiction absolue de coder aujourd'hui.** C'est l'exercice principal du jour : la discipline de spécifier avant de construire est ce qui distingue cette phase des trois autres, et c'est celle qui protège ta marge.

**Contrôle de fin de journée :** fais lire ta spec à quelqu'un qui ne connaît pas le sujet. S'il ne peut pas dire ce que fera le composant, la spec n'est pas prête.

---

## Jour 2 — Le schéma seul

```
[ ] Écrire le {% schema %} complet
[ ] Vérifier CHAQUE type de réglage via le Dev MCP
[ ] Valeurs par défaut cohérentes partout
[ ] presets défini, avec blocs pré-remplis
[ ] enabled_on renseigné
[ ] max_blocks réaliste
[ ] Créer la définition de metafield dans l'admin
[ ] Renseigner la donnée sur 3 produits, la laisser vide sur 2 autres
```

**Exercice imposé.** Charge la section dans le Theme Editor **avec un Liquid minimal** (un simple `<div>` vide). Vérifie que :
- la section apparaît dans le sélecteur d'ajout
- tous les réglages s'affichent
- les labels sont compréhensibles

Si la section n'apparaît pas, tu viens de rencontrer le problème le plus courant de cette phase — cherche du côté de `presets`, d'un type de réglage inventé, ou d'un JSON invalide. **Résous-le maintenant, pas dans trois jours au milieu du Liquid.**

---

## Jour 3 — Liquid et CSS, sans JavaScript

```
[ ] Le composant se rend entièrement côté serveur
[ ] Garde {% if %} sur chaque donnée
[ ] {{ block.shopify_attributes }} sur chaque wrapper
[ ] <details>/<summary> natifs pour l'accordéon
[ ] CSS mobile-first, scopé, dans {% stylesheet %}
[ ] Variables CSS pour les réglages numériques
[ ] Textes via les fichiers de traduction
```

**Trois tests obligatoires en fin de journée :**
1. Section ajoutée, **aucun réglage renseigné** → que voit-on ?
2. Un produit **sans le metafield** → la zone disparaît-elle proprement ?
3. Un texte de **300 caractères** dans un champ prévu pour 30

Si l'un des trois produit un résultat laid ou une erreur, corrige avant d'aller plus loin. Ce sont exactement les trois cas qui casseront chez un client.

---

## Jour 4 — Theme Editor et JavaScript

```
[ ] Ajouter, déplacer, dupliquer, supprimer la section
[ ] Déplacer en 1re position
[ ] Ajouter, réordonner, supprimer des blocs
[ ] Supprimer TOUS les blocs
[ ] Modifier chaque réglage et vérifier son effet
[ ] Cliquer sur un bloc → est-il surligné dans l'aperçu ?
```

**Exercice imposé 1.** Ajoute une amélioration JavaScript (ouverture automatique du premier élément, ou ancre vers une question depuis l'URL). Puis **casse-la volontairement** : retire l'écoute de `shopify:section:load`, recharge l'éditeur, constate que le composant devient inerte. Remets-la. Tu dois avoir vu ce symptôme au moins une fois pour le reconnaître instantanément chez un client.

**Exercice imposé 2.** Teste sur un **iPhone réel**. Vérifie l'absence de débordement horizontal à 320 px, la taille des cibles tactiles, et le comportement de l'accordéon au doigt.

**Exercice imposé 3.** Désactive JavaScript dans le navigateur. Le composant doit rester entièrement utilisable.

---

## Jour 5 — Documentation, bibliothèque, calibration

```
[ ] Quality Gate complet (09-quality-checklist.md)
[ ] qa-report.md rempli
[ ] implementation.md rédigé
[ ] Guide marchand : 1 page, avec captures réelles
[ ] Anonymisation : grep sur tout nom, toute URL, toute marque
[ ] Versement à shopify-components/
[ ] README du composant : réglages, dépendances, prix de vente indicatif
```

**L'exercice de calibration — le plus important des cinq jours.**

Installe ton propre composant sur **un thème différent** (si tu as construit sur Dawn, installe sur un thème premium d'essai ou sur Skeleton). Chronomètre.

| Résultat | Ce que ça signifie |
|---|---|
| < 30 min | Composant réellement réutilisable. C'est ta marge future |
| 30 min – 1 h 30 | Acceptable. Note ce qui a coincé et corrige |
| > 2 h | **Il n'est pas réutilisable.** Trouve ce qui dépend du thème d'origine et paramètre-le |

Les causes habituelles d'un temps long : dépendance à une classe utilitaire du thème d'origine, couleur ou police en dur, supposition sur la structure de la page hôte, nom de classe trop générique entrant en collision.

**Corrige-les maintenant**, pendant que tu as le composant en tête. Dans six mois, tu ne le feras pas — tu réécriras.

---

## Auto-évaluation

Tu es prêt pour un vrai client si tu peux répondre oui à tout :

```
[ ] Je rédige une spécification complète avant de coder, systématiquement
[ ] Je sais choisir entre section, theme block et snippet, et le justifier
[ ] Je sais quand une donnée doit être un metafield plutôt qu'un réglage
[ ] Je vérifie la compatibilité type de réglage / type de metafield
[ ] Je vérifie chaque type de réglage via le Dev MCP avant de l'écrire
[ ] Mes sections se rendent proprement avec AUCUN réglage renseigné
[ ] Mes composants fonctionnent entièrement sans JavaScript
[ ] Je teste le Theme Editor avant chaque livraison, sans exception
[ ] J'ai déjà vu un composant devenir inerte dans l'éditeur, et je sais pourquoi
[ ] J'écris un guide marchand qu'une personne non technique comprend
[ ] Ma bibliothèque grossit à chaque mission, anonymisée et documentée
[ ] Je connais le temps de réinstallation de chacun de mes composants
[ ] Je sais dire « ce n'est pas une section, c'est une refonte »
[ ] Je sais dire « une application est le bon choix ici »
```

---

## Les exercices suivants

1. **Construis le même composant en theme block** plutôt qu'en section, et compare. Tu comprendras concrètement quand chaque forme est pertinente — et notamment pourquoi un theme block ne peut pas définir ses propres blocks locaux.

2. **Reprends un composant existant du thème et étends-le.** Modifier du code que tu n'as pas écrit sans casser les réglages du marchand est une compétence distincte, et c'est ce que la moitié de tes missions demanderont.

3. **Construis un composant qui lit un metaobject.** C'est le niveau au-dessus, celui qui justifie les tarifs experts, et très peu de freelances le maîtrisent.

4. **Chronomètre chaque étape de chaque composant.** Spec, schéma, Liquid, CSS, JS, tests, doc. C'est la base de ton pricing, et c'est ce qui te dira où tu perds réellement du temps.

5. **Fais relire ton guide marchand par un non-technicien** et regarde-le essayer de configurer le composant sans ton aide. Chaque hésitation est une ligne à réécrire.

6. **Construis trois variantes du même composant** (minimaliste, standard, riche) et vends-les comme trois niveaux de prestation. C'est ainsi qu'une bibliothèque devient une offre.

---

# PHASE 4 COMPLETE

Le système est complet : discovery, spécification, architecture, construction, tests, documentation, livraison, vente et bibliothèque réutilisable.

Envoie **`START PHASE 5`** pour ouvrir *WooCommerce / Other Ecommerce → Shopify Migration*.
