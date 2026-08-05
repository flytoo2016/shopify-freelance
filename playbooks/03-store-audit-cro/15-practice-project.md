# 15 — Practice Project

Contrairement aux phases 1 et 2, tu ne t'entraînes pas sur un store fabriqué : les vrais problèmes de conversion viennent de vraies boutiques avec de vraies contraintes. Tu t'entraînes donc sur des boutiques **publiques**, sans les contacter et sans jamais publier ce que tu produis.

**Durée : 5 jours, 3 à 4 h par jour.**

---

## Règles de déontologie

```
[ ] Tu n'utilises que ce qui est publiquement accessible
[ ] Tu ne contactes pas les boutiques auditées
[ ] Tu ne publies aucun audit nominatif
[ ] Tu anonymises tout extrait de portfolio (nom, logo, URL, produits identifiables)
[ ] Tu n'envoies pas d'audit non sollicité à une boutique pour vendre tes services
```

Le dernier point mérite d'être explicite : l'audit non sollicité envoyé à froid est une pratique courante et généralement mal reçue. Elle positionne d'emblée l'expéditeur comme quelqu'un qui critique un travail qu'il ne comprend pas encore, et elle brûle le prospect. Si tu veux prospecter, envoie **une observation**, pas un audit.

---

## Jour 1 — Le parcours acheteur

Choisis **une** boutique DTC de taille moyenne, dans un secteur que tu ne connais pas.

```
[ ] Téléphone réel, données mobiles, enregistrement d'écran
[ ] Arrivée directe sur une page produit (comme depuis une publicité)
[ ] Aller jusqu'à l'écran de paiement, sans payer
[ ] Recommencer depuis l'accueil
[ ] Chercher un produit précis via la recherche interne
[ ] Chercher la politique de retour
[ ] AUCUNE note technique — uniquement ce que tu ressens
```

Puis revois l'enregistrement et note :
- les moments d'hésitation (tu t'arrêtes, tu relis, tu cherches des yeux)
- les moments de recul (tu remontes, tu reviens en arrière)
- les questions que tu t'es posées sans trouver de réponse
- le moment exact où tu aurais abandonné si tu n'étais pas en exercice

**Livrable :** `journey-notes.md`. C'est la matière première de tout audit CRO, et c'est la seule qu'aucun outil ne produit.

---

## Jour 2 — La grille technique

Même boutique.

```
[ ] Les 29 zones, mobile puis desktop
[ ] Chaque observation → une capture nommée
[ ] Lighthouse mobile, 3 runs, 3 pages types
[ ] Élément LCP de la page produit identifié
[ ] Vérification SEO : title, meta, canonical, h1, données structurées
[ ] Rich Results Test sur une page produit
[ ] Accessibilité : contraste, clavier, focus, alt
[ ] Réseau : poids, requêtes, origines tierces
[ ] Recensement des applications visibles depuis le code source
[ ] Vérification du tracking : quels pixels, déclenchés quand
```

**Exercice de discipline :** chaque capture est nommée immédiatement, jamais « plus tard ». C'est l'habitude qui détermine si la rédaction du jour 4 prendra 3 h ou 9 h.

**Livrable :** `evidence/` peuplé et nommé, plus une liste brute d'observations.

---

## Jour 3 — La concurrence et la calibration

```
[ ] 3 concurrents identifiés : 2 directs, 1 hors secteur
[ ] Les 10 zones de comparaison sur chacun
[ ] Le tableau des blocs de page produit rempli
[ ] Les 7 mesures comparatives
[ ] Section « ce que la boutique fait mieux qu'eux »
[ ] Section « les angles morts du secteur »
```

**Le moment d'apprentissage.** Reprends `journey-notes.md` du jour 1 et compare avec ce que tu as trouvé aux jours 2 et 3 :

| Question | Ce que ça t'apprend |
|---|---|
| Quelles frictions ressenties au jour 1 se sont confirmées techniquement ? | Ton instinct est calibré sur ces points |
| Quelles frictions n'avaient aucune cause technique ? | C'était du contenu ou de l'offre — apprends à faire la distinction |
| Quels problèmes techniques du jour 2 ne t'avaient pas gêné en tant qu'acheteur ? | **Ce sont probablement des constats P2 ou P3, pas des priorités.** L'erreur classique du débutant est de prioriser ce qui est techniquement laid |
| Qu'as-tu vu chez les concurrents que tu n'avais pas pensé à chercher ? | Ajoute-le à ta grille des 29 zones |

Cette confrontation est l'exercice central de la phase. Elle t'apprend à séparer **ce qui gêne un acheteur** de **ce qui gêne un développeur** — la confusion entre les deux est ce qui rend la plupart des audits techniques inutiles commercialement.

---

## Jour 4 — Fiches, notation, priorisation

```
[ ] Chaque observation transformée en fiche de constat complète
[ ] Filtre anti-générique passé sur chaque fiche, sans indulgence
[ ] Constats sans preuve : soit tu vas chercher la preuve, soit tu supprimes
[ ] Notation des 10 dimensions, avec le calcul détaillé
[ ] ICE sur chaque constat
[ ] Feuille de route en 3 lots, sur un budget hypothétique de 2 500 €
[ ] Section « ce que le marchand peut faire lui-même »
```

**Exercice imposé.** Compte tes constats après le filtre anti-générique. Si tu en as supprimé moins de 20 %, tu n'as pas été assez sévère : refais la passe. Le taux normal en début de pratique est de 30 à 50 %.

**Deuxième exercice imposé.** Chiffre l'effort de chaque constat en heures, **sans regarder le code**, puis vérifie sur les cinq plus importants en ouvrant réellement le thème. L'écart entre ton estimation et la réalité est ta marge d'erreur — connais-la avant de la facturer.

---

## Jour 5 — Rédaction et restitution

```
[ ] conversion-report.md, 10–12 pages maximum
[ ] prioritized-roadmap.md, 2 pages
[ ] Une annexe complète (au choix)
[ ] Conversion en PDF
[ ] Anonymisation d'un extrait pour le portfolio
```

**Exercice de restitution.** Prépare l'appel de 45 minutes et **fais-le à voix haute**, seul, chronomètre en main, en partageant ton écran comme si le client était là. Enregistre-toi.

En te réécoutant, cherche :
- les moments où tu affirmes sans preuve
- les moments où tu emploies un terme technique non expliqué
- les moments où tu dépasses ce que ton rapport soutient
- le temps réel passé sur les trois constats majeurs (cible : 17 min)

**Le test décisif.** Relis la page 1 seule et demande-toi : *si le client ne lit que cette page, sait-il quoi faire lundi matin ?* Si non, réécris la page 1 — pas le reste.

---

## Auto-évaluation

Tu es prêt pour un vrai client si tu peux répondre oui à tout :

```
[ ] Je fais un parcours acheteur complet sans prendre de note technique
[ ] Je distingue ce qui gêne un acheteur de ce qui gêne un développeur
[ ] Chacun de mes constats cite une preuve nommée qui existe réellement
[ ] Je supprime sans regret un constat que je ne peux pas prouver
[ ] Je sais dire « votre problème n'est pas votre boutique »
[ ] Je sais dire « je n'ai pas pu vérifier ceci »
[ ] Je chiffre l'effort de chaque recommandation, et mon estimation est honnête
[ ] Ma notation se déduit de constats, pas d'une impression
[ ] Je calibre ma feuille de route sur le budget réel du client
[ ] Mon rapport principal tient en 12 pages
[ ] Aucun de mes constats ne pourrait être copié-collé dans un autre audit
[ ] Je sais mener une restitution de 45 min sans dépasser ce que le rapport dit
```

---

## Les exercices suivants

1. **Refais l'exercice sur 5 boutiques d'un même secteur.** Tu construiras une grille sectorielle — c'est ce qui te permettra plus tard de facturer au prix expert.
2. **Audite une boutique que tu trouves excellente.** Trouver 15 constats sur une boutique bien faite est l'exercice le plus formateur qui soit.
3. **Fais lire un de tes rapports à un non-technicien.** Note chaque phrase qui le bloque.
4. **Chronomètre chaque étape.** C'est la base de ton pricing et la seule protection contre la dérive de rédaction.
5. **Constitue ta bibliothèque de constats.** À chaque audit, ajoute à `knowledge/cro/` les constats qui se sont révélés justes et ceux que le client a implémentés. Au bout de vingt audits, tu sauras ce qui compte réellement.
6. **Prospecte avec une observation, pas un audit.** Un message de trois lignes contenant une observation vérifiable sur la boutique du prospect convertit mieux qu'un rapport de dix pages non sollicité — et il ne brûle pas le contact.

---

# PHASE 3 COMPLETE

Le système est complet : cadrage, données, framework des 29 zones, analyse CRO, concurrence, notation, priorisation, rédaction, restitution, conversion en mission d'implémentation et entraînement.

Envoie **`START PHASE 4`** pour ouvrir *Custom Shopify Section / High-Converting Product Page*.
