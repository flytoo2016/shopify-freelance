# 13 — Pricing

**Le principe qui gouverne cette phase : tu factures la première construction, pas les suivantes.**

C'est la seule prestation de ton catalogue où ton travail passé réduit ton temps futur. Un composant construit une fois, versé à ta bibliothèque, se réinstalle en vingt minutes sur une autre boutique — et se facture au même prix. Toute la stratégie de pricing consiste à ne pas répercuter ce gain sur le client.

---

## A. Grille par niveau

### BEGINNER — 0 à 10 composants livrés

| Composant | Min | Cible | Premium | Durée réelle |
|---|---|---|---|---|
| Section simple (réglages seuls) | 120 € | 200 € | 300 € | 4–8 h |
| Section + blocks | 250 € | 400 € | 600 € | 8–14 h |
| Section + metafields | 400 € | 600 € | 900 € | 12–20 h |
| Composant interactif | 700 € | 1 100 € | 1 600 € | 20–35 h |
| Page produit restructurée | 800 € | 1 400 € | 2 200 € | 30–50 h |
| Taux horaire | 25 €/h | 35 €/h | 45 €/h | — |

### INTERMEDIATE — 10 à 40 composants, bibliothèque constituée

| Composant | Min | Cible | Premium | Durée réelle |
|---|---|---|---|---|
| Section simple | 300 € | 450 € | 700 € | 3–5 h |
| Section + blocks | 500 € | 800 € | 1 200 € | 5–9 h |
| Section + metafields | 800 € | 1 200 € | 1 800 € | 8–14 h |
| Composant interactif | 1 500 € | 2 400 € | 3 500 € | 14–25 h |
| Page produit restructurée | 2 000 € | 3 200 € | 4 800 € | 20–35 h |
| Taux horaire | 50 €/h | 70 €/h | 90 €/h | — |

### EXPERT — 40+ composants, bibliothèque mature, spécialisation

| Composant | Min | Cible | Premium | Durée réelle |
|---|---|---|---|---|
| Section + blocks | 900 € | 1 500 € | 2 200 € | 3–6 h |
| Section + metafields | 1 500 € | 2 400 € | 3 500 € | 6–10 h |
| Composant interactif | 3 000 € | 5 000 € | 8 000 € | 12–20 h |
| Page produit restructurée | 4 000 € | 7 000 € | 12 000 € | 18–30 h |
| Bibliothèque de composants pour une marque | 6 000 € | 12 000 € | 25 000 € | — |
| Taux horaire | 90 €/h | 130 €/h | 180 €/h | — |

**Observe la colonne « durée réelle » entre les trois niveaux :** elle est divisée par deux ou trois pendant que le prix triple. Ce n'est pas de l'abus, c'est la nature d'un travail intellectuel accumulé. Le client paie une solution éprouvée, pas des heures.

---

## B. Modulateurs

| Facteur | × |
|---|---|
| Thème Dawn / Skeleton peu modifié | ×0,9 |
| Thème premium modifié | ×1,25 |
| Thème custom sans documentation | ×1,5 |
| Page builder installé | ×1,3 |
| Multi-marché / multi-langue | ×1,3 |
| Metafields à créer et documenter | ×1,4 |
| Metaobjects | ×1,5 |
| Maquette Figma précise, avec états | ×0,85 |
| Maquette approximative, sans états | ×1,3 |
| Agence avec spec écrite | ×0,85 |
| **Composant déjà dans ta bibliothèque** | **×0,7** |
| Shopify Plus | ×1,4 |
| Délai serré (< 72 h) | ×1,5 |
| Accessibilité de niveau conformité exigée | ×1,4 |

**Sur le ×0,7 de la bibliothèque.** Tu baisses un peu — assez pour être compétitif et pour que le client sente un avantage — mais tu conserves l'essentiel de la marge. Ne descends pas à ×0,3 sous prétexte que « ça ne te coûte que trois heures » : ce que tu vends est un composant éprouvé, testé sur cinq boutiques, dont les cas limites sont déjà réglés. C'est plus précieux qu'un composant neuf, pas moins.

---

## C. Rentabilité réelle

```
Section simple à 450 €, 4 h                        → 113 €/h  ✅
Section + blocks à 800 €, 7 h                      → 114 €/h  ✅
Section de bibliothèque à 560 € (×0,7), 3 h        → 187 €/h  ✅✅
Section + metafields à 1 200 €, 12 h               → 100 €/h  ✅
Page produit à 3 200 €, 30 h                       → 107 €/h  ✅
Section simple à 200 € qui dérive à 15 h           →  13 €/h  ❌
```

La dernière ligne vient toujours du même endroit : **absence de spec validée.** Le client ajoute, précise, change d'avis, et chaque modification paraît petite. Trois heures de dérive sur un forfait de 200 € annulent toute la marge.

**Les deux garde-fous :**

1. **Aucun code sans spec validée par écrit.** Non négociable, quel que soit le montant.
2. **La règle de la troisième demande.** À la troisième demande hors périmètre, tu arrêtes et tu écris :

> Ces trois points sortent de ce que nous avions défini. Ce ne sont pas de mauvaises idées — mais si je les intègre sans le dire, je vais soit rogner sur les tests, soit livrer en retard, et aucune des deux options ne vous sert. Je les chiffre : {{X}} € et {{n}} jours de plus. Vous préférez les ajouter maintenant, ou les garder pour une seconde étape ?

Formulé ainsi, ce n'est pas un refus, c'est une gestion de projet. Les clients l'acceptent presque toujours — et ceux qui ne l'acceptent pas t'auraient coûté davantage.

---

## D. L'argument de vente principal

Quand le composant remplace une application :

> Votre application coûte {{X}} €/mois, soit {{X×12}} € par an. Cette section coûte {{prix}} une fois. Elle est amortie en {{n}} mois, elle sera plus rapide parce qu'elle ne charge aucun script externe, et elle fera exactement ce dont vous avez besoin plutôt que ce que l'éditeur de l'app a imaginé.
>
> En contrepartie, elle devient votre responsabilité : si Shopify fait évoluer quelque chose dans deux ans, il faudra la mettre à jour. C'est ce que vous payez chaque mois avec une application. C'est le vrai arbitrage, et il dépend de votre horizon.

Ajoute le calcul concret dans la proposition, chiffré avec **leur** montant. Un tableau d'amortissement sur trois ans fait plus d'effet que n'importe quel argument technique.

**Et dis-le quand l'application est le bon choix.** Fonctionnalité exigeant une logique serveur, besoin susceptible d'évoluer beaucoup, aucun mainteneur côté client, ou app à moins de 10 €/mois : recommande l'application. Ça coûte une mission et gagne un client — qui reviendra pour la suivante, et qui te recommandera.

---

## E. Modèles de facturation

| Modèle | Quand |
|---|---|
| **Forfait** | Par défaut, dès qu'une spec est validée |
| **Spec payante + développement chiffré** | Missions > 1 500 €, ou périmètre incertain |
| **Horaire** | Thème custom non documenté, maquette instable, agence |
| **Horaire plafonné** | Compromis quand le client refuse l'horaire pur |
| **Forfait par composant, dans un lot** | Bibliothèque pour une marque : dégressif à partir du 4e |

**La spec payante est l'outil le plus efficace de cette phase.** Voir `12-upwork-offer.md`, section G. Elle transforme le travail de conception — réel, chronophage, et généralement offert — en prestation facturée, et elle rend la dérive de périmètre structurellement impossible.

---

## F. Structure de paiement

| Montant | Structure |
|---|---|
| < 400 € | 100 % à la validation de la spec |
| 400–1 500 € | 50 % à la validation de la spec / 50 % à la livraison |
| > 1 500 € | 40 % spec validée / 30 % preview livré / 30 % après publication |
| Spec payante | 100 % d'avance, déduite ensuite |

**Jamais de démarrage sans spec validée ET acompte.** Les deux, pas l'un ou l'autre. Une spec validée sans acompte laisse le client partir avec ton travail de conception ; un acompte sans spec te fait construire à l'aveugle.

---

## G. Ce qui se facture en supplément

- Tout élément apparu après validation de la spec
- Chaque révision au-delà du forfait
- Déclinaison sur un template supplémentaire
- Traduction dans une langue supplémentaire
- Saisie des données produit (si le client te la confie)
- Migration du contenu depuis l'application remplacée
- Suppression de l'application et mesure du gain de performance
- Formation du marchand au-delà de 30 minutes
- Mise à jour après un changement de thème

Annonce-les dans la proposition. Un supplément prévu est une règle ; découvert sur la facture, c'est une négociation — et parfois un litige.

---

## H. L'économie de la bibliothèque

C'est la donnée que tu dois suivre, mission après mission :

| Composant | 1re construction | Réinstallation | Fois vendu | CA cumulé |
|---|---|---|---|---|
| Barre de réassurance | 9 h | 25 min | 6 | 3 400 € |
| FAQ produit par metafield | 14 h | 1 h 15 | 4 | 3 800 € |
| Comparateur de variantes | 22 h | 2 h | 3 | 5 100 € |

Tiens ce tableau à jour dans `shopify-components/README.md`. Il te dit trois choses :
1. **Quels composants promouvoir** dans tes offres — ceux à faible temps de réinstallation
2. **Quels composants améliorer** — ceux dont la réinstallation reste longue ne sont pas réellement réutilisables
3. **Quand augmenter tes prix** — quand le temps réel a été divisé par trois, le prix ne doit pas l'être

Le troisième point est celui que les freelances ratent le plus souvent : ils deviennent efficaces et baissent leurs prix par honnêteté mal placée. Ce que le client achète, c'est un composant qui fonctionne — pas le nombre d'heures que tu as passées dessus.
