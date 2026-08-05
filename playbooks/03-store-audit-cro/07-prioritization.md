# 07 — Prioritization

Le tableau priorisé est le document que le client utilisera réellement. Le rapport se lit une fois ; la feuille de route se rouvre chaque semaine pendant trois mois.

---

## A. La fiche de constat

Chaque constat suit exactement ce format. Aucune exception — c'est ce qui rend le rapport exploitable par un tiers.

```markdown
### {{ID}} — {{Titre en une ligne, factuel}}

**Zone** : {{parmi les 29}}
**Dimension** : {{parmi les 10 du scoring}}
**Priorité** : P0 / P1 / P2 / P3

**Constat.**
{{Ce qui est observé, factuellement, sans interprétation. 1 à 3 phrases.}}

**Preuve.**
{{evidence/P0-01-product-mobile.png}} · {{donnée analytics}} · {{fichier:ligne}}

**Pourquoi c'est un problème.**
{{Le mécanisme : ce que ça produit chez le visiteur, et pourquoi ça coûte.
2 à 4 phrases. C'est ici que se trouve ta valeur ajoutée.}}

**Impact estimé** : Élevé / Moyen / Faible
**Base de l'estimation** : {{données du client, ampleur de l'exposition,
mécanisme. Dire honnêtement si c'est une hypothèse.}}

**Effort** : {{n}} h — {{qui peut le faire : moi / votre agence / vous-même}}

**Recommandation.**
{{Quoi faire, précisément. Assez précis pour qu'un développeur puisse l'exécuter
sans te rappeler.}}

**Résultat attendu.**
{{Ce qui devrait changer, et comment le vérifier. Une métrique observable.}}

**Comment le mesurer.**
{{Où regarder pour savoir si ça a marché, et au bout de combien de temps.}}
```

### Exemple rempli

```markdown
### P0-02 — Le prix n'est pas visible sans défilement sur mobile

**Zone** : 10 — Titre, prix, disponibilité
**Dimension** : Page produit
**Priorité** : P0

**Constat.**
Sur iPhone 13 (Safari), la galerie produit occupe la totalité du premier écran.
Le prix apparaît après 1,5 défilement, le bouton d'ajout au panier après 2,5.
Vérifié sur les 3 pages produit du périmètre.

**Preuve.**
evidence/P0-02-product-firstscreen-ios.png
evidence/P0-02-scroll-sequence.mp4
sections/main-product.liquid:45 — la galerie est en hauteur 100vh

**Pourquoi c'est un problème.**
81 % de vos sessions sont mobiles, et 68 % de votre trafic publicitaire arrive
directement sur une page produit. Ces visiteurs voient une image et rien
d'autre : ni le prix, ni la possibilité d'acheter. Le prix est un critère de
qualification — un visiteur qui ne peut pas l'évaluer immédiatement doit fournir
un effort avant d'avoir la moindre raison de le faire.

**Impact estimé** : Élevé
**Base de l'estimation** : exposition de 81 % du trafic ; l'étape vue produit →
ajout au panier est votre plus faible (2,1 % contre 4 à 6 % typiquement observés
sur des catalogues comparables). Le lien de causalité reste une hypothèse
jusqu'à mesure après correction.

**Effort** : 2 h — moi ou votre agence

**Recommandation.**
Limiter la hauteur de la galerie à 60vh sur mobile, et remonter le bloc
titre + prix + note d'avis au-dessus. Ajouter une barre d'achat collante
apparaissant après le premier défilement, avec prix, variante sélectionnée et
bouton d'ajout.

**Résultat attendu.**
Prix visible sans défilement, action d'achat accessible en permanence.

**Comment le mesurer.**
Taux d'ajout au panier sur mobile (Analytics → taux de conversion, segmenté par
appareil), comparé sur 14 jours avant / 14 jours après, à trafic comparable.
```

**Ce qui rend cette fiche vendable :** elle contient une preuve, une donnée du client, un mécanisme explicité, un chiffrage d'effort, une réserve honnête sur la causalité, et un moyen de vérifier. Un constat écrit ainsi ne peut pas avoir été copié-collé depuis un autre audit.

---

## B. Les niveaux de priorité

| Niveau | Définition | Critère de décision |
|---|---|---|
| **P0 — Critique** | Coûte des ventes maintenant, ou expose à un risque (données fausses, échéance réglementaire, parcours cassé) | À traiter sous 2 semaines |
| **P1 — Élevé** | Friction significative sur un volume important de trafic | Sous 4 à 8 semaines |
| **P2 — Moyen** | Amélioration réelle, effet mesurable mais limité | Quand le budget le permet |
| **P3 — Faible** | Correction mineure, ou dépend d'une décision du client | Regroupé dans un lot ultérieur |

**Un P0 doit être rare.** Quatre à six sur un audit complet. Vingt P0 signifient qu'il n'y a plus de priorité — et le client ne fera rien du tout.

**Cas particuliers rangés en P0 :**
- Suivi analytique faux ou absent — tout le reste devient invérifiable
- Personnalisations de checkout non migrées avec une échéance datée
- Parcours d'achat cassé sur un appareil majoritaire
- Frais surprises découverts au checkout

---

## C. Calculer la priorité sans se mentir

Utilise ICE, en assumant sa subjectivité.

```
Score = (Impact × Confiance) / Effort

Impact    1 à 5   — combien de visiteurs concernés × gravité pour eux
Confiance 1 à 5   — à quel point je suis sûr que ça change quelque chose
Effort    1 à 5   — 1 = moins d'1 h, 5 = plus de 20 h
```

**La colonne Confiance est celle qui compte.** Elle t'oblige à distinguer ce que tu sais de ce que tu supposes. Un constat à confiance 2 n'a rien à faire en P0, même si son impact potentiel est élevé — et le dire honnêtement en restitution renforce ta crédibilité au lieu de l'affaiblir.

| ID | Constat | I | C | E | Score | Priorité |
|---|---|---|---|---|---|---|
| P0-01 | Suivi GA4 déclenche l'achat deux fois | 5 | 5 | 1 | 25,0 | P0 |
| P0-02 | Prix invisible sans scroll mobile | 5 | 4 | 2 | 10,0 | P0 |
| P1-05 | Délai de livraison absent | 4 | 4 | 2 | 8,0 | P1 |
| P2-11 | Avis sans photos | 3 | 2 | 4 | 1,5 | P2 |

---

## D. Calibrer sur le budget réel

C'est l'étape que presque personne ne fait, et c'est elle qui détermine si ton audit servira à quelque chose.

Tu connais le budget du client (Q32). Construis la feuille de route **par paliers de budget** :

```markdown
## Feuille de route

### Lot 1 — Priorité absolue ({{X}} h — environ {{Y}} €)
Ce que je ferais avec le premier tiers de votre budget.
| ID | Constat | Effort | Pourquoi en premier |

### Lot 2 — Gains suivants ({{X}} h — environ {{Y}} €)

### Lot 3 — Quand le budget le permet ({{X}} h — environ {{Y}} €)

### Non retenu pour l'instant
| ID | Constat | Pourquoi je ne le priorise pas maintenant |
```

**La section « non retenu » est essentielle.** Elle montre que tu as arbitré plutôt qu'énuméré. Et elle évite que le client se sente obligé de tout faire — ce qui, en pratique, le conduit à ne rien faire.

Si le budget déclaré ne couvre même pas les P0, dis-le franchement :

> Les quatre constats P0 représentent environ 14 heures de travail, soit {{X}} €. C'est au-dessus du budget que vous avez indiqué. Deux options : traiter P0-01 et P0-02 maintenant, qui représentent à eux seuls l'essentiel de l'exposition, et reporter les deux autres — ou décaler le chantier de quelques semaines pour le traiter d'un bloc. Je recommande la première : P0-01 vous coûte de l'argent tous les jours.

---

## E. Le tableau final

`prioritized-roadmap.md` — le document le plus utilisé de tout l'audit. Il tient sur deux pages.

| ID | Constat | Zone | Priorité | Impact | Effort | Qui | Lot | Statut |
|---|---|---|---|---|---|---|---|---|
| P0-01 | Suivi GA4 en double comptage | Analytics | P0 | Élevé | 1 h | Moi | 1 | À faire |
| P0-02 | Prix invisible sans scroll mobile | Page produit | P0 | Élevé | 2 h | Moi | 1 | À faire |
| P0-03 | Personnalisations checkout non migrées | Checkout | P0 | Élevé | 4 h | Moi | 1 | À faire |
| P1-05 | Délai de livraison absent | Page produit | P1 | Moyen | 2 h | Moi | 2 | À faire |
| P1-08 | Politique de retour introuvable | Confiance | P1 | Moyen | 1 h | Vous | 2 | À faire |

**Ajoute la colonne « Statut ».** Elle transforme ton rapport en outil de suivi que le client rouvre — et chaque fois qu'il le rouvre, il voit ton nom.

**La colonne « Qui »** est celle qui génère ton chiffre d'affaires : elle montre au client, sans rien vendre explicitement, quelle part du travail nécessite quelqu'un comme toi.

---

## F. Le filtre anti-générique

Avant d'intégrer un constat au rapport, une seule question :

> **Ce constat pourrait-il être copié-collé dans l'audit d'une autre boutique ?**

Si oui : soit tu le rends spécifique en y ajoutant une preuve et une donnée propres à ce client, soit tu le supprimes.

| Générique ❌ | Spécifique ✅ |
|---|---|
| « Ajoutez des avis clients » | « Vos 3 produits les plus vus (68 % des vues produit) n'ont aucun avis, alors que 4 autres en ont plus de 40. Le widget est installé et fonctionne — il s'agit d'une collecte à mettre en place, pas d'un développement. » |
| « Améliorez votre proposition de valeur » | « En lisant uniquement ce qui est écrit sur votre page d'accueil, je ne peux pas déterminer si vos produits sont fabriqués en France. Cette information apparaît uniquement dans la page À propos, au troisième paragraphe — alors que c'est l'argument que vous citez en premier dans votre questionnaire. » |
| « Optimisez pour le mobile » | « Sur iPhone 13, le bouton d'ajout au panier se trouve à 2,5 défilements du haut de page, et 81 % de vos sessions sont mobiles. » |
| « Réduisez le nombre d'applications » | « 6 de vos 19 applications chargent un script sur toutes les pages ; 2 d'entre elles (Popup X, Reviews Y) n'ont aucun contenu actif configuré. » |

Applique ce filtre à chaque ligne, sans exception. C'est le travail le moins agréable de l'audit et c'est celui qui détermine si le client te rappelle.
