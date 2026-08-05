# 05 — Competitive Research

L'analyse concurrentielle est la partie de l'audit la plus souvent bâclée — et celle qui impressionne le plus quand elle est bien faite, parce que le client ne l'a jamais faite sérieusement lui-même.

---

## A. Le principe : comparer sans copier

Un concurrent qui fait quelque chose différemment n'a pas forcément raison. Ses choix répondent à **son** trafic, **son** panier moyen, **son** audience et parfois **ses** erreurs.

Trois postures à distinguer clairement dans le rapport :

| Posture | Formulation | Valeur |
|---|---|---|
| **Copier** | « Ils ont X, faites X » | Faible, souvent nuisible |
| **Constater un écart** | « 4 concurrents sur 5 affichent le délai de livraison sur la page produit, vous non » | Moyenne — c'est un signal, pas une preuve |
| **Comprendre le motif** | « Ils l'affichent parce que leur produit est un cadeau : la date de réception est un critère de décision. C'est aussi votre cas pour {{catégorie}} » | **Élevée** |

La troisième posture est ce que tu vends. Les deux premières sont accessibles à n'importe qui.

---

## B. Choisir les concurrents

Cinq boutiques, réparties en trois catégories. Ne prends pas cinq concurrents directs : tu n'apprendrais rien de nouveau.

| Type | Combien | Pourquoi |
|---|---|---|
| **Concurrents directs** | 2 | Même produit, même audience. Comparaison légitime point par point |
| **Référence de catégorie** | 1–2 | Le leader du secteur. Ce qui est devenu un standard d'attente |
| **Référence hors secteur** | 1 | Une boutique excellente dans un autre domaine. C'est de là que viennent les idées neuves |

**Sur la référence hors secteur.** Si le client vend du café, regarde une boutique de cosmétique ou de matériel photo. Les meilleures idées d'un audit viennent presque toujours de là, parce que le client, lui, ne regarde que ses concurrents directs.

**Comment les trouver**
- Les 3 à 5 fournis par le client (Q29) — obligatoires, même s'ils sont mal choisis : ce sont ses références mentales
- Recherche des requêtes principales du secteur
- Publicités actives sur les bibliothèques publicitaires publiques des plateformes
- Boutiques Shopify reconnues du secteur

---

## C. La méthode : mêmes zones, mêmes captures

Tu audites chaque concurrent sur un **sous-ensemble fixe** des 29 zones. Pas tout — ce serait cinq audits complets.

Les 10 zones de comparaison :

```
1.  Premier écran mobile de la page d'accueil
2.  Structure de navigation (nombre de niveaux, libellés)
3.  Recherche et filtres
4.  Carte produit en collection
5.  Premier écran mobile de la page produit
6.  Ordre des blocs de la page produit
7.  Éléments de réassurance et leur emplacement
8.  Avis : format, nombre, visibilité
9.  Panier / tiroir : contenu, seuils, information de livraison
10. Étapes et frictions jusqu'à l'écran de paiement
```

Pour chacune : une capture mobile, nommée `competitors/{marque}-{zone}.png`.

**Le tableau des blocs de la page produit** est le livrable comparatif le plus utile de tout l'audit :

| Bloc | Client | Concurrent A | Concurrent B | Concurrent C | Référence |
|---|---|---|---|---|---|
| Fil d'Ariane | ✗ | ✓ | ✓ | ✓ | ✓ |
| Note et nombre d'avis près du titre | ✗ | ✓ | ✓ | ✓ | ✓ |
| Prix visible sans scroll (mobile) | ✗ | ✓ | ✓ | ✗ | ✓ |
| Délai de livraison annoncé | ✗ | ✓ | ✓ | ✓ | ✓ |
| Guide des tailles accessible | ✓ | ✓ | ✓ | ✓ | ✓ |
| Bouton d'achat collant au scroll | ✗ | ✓ | ✗ | ✓ | ✓ |
| Politique de retour visible | ✗ | ✓ | ✓ | ✓ | ✓ |
| Avis avec photos | ✗ | ✓ | ✗ | ✓ | ✗ |

Une ligne où le client est le seul à afficher ✗ est un constat solide et immédiatement compréhensible. Une ligne où tout le monde affiche ✗ est une **opportunité de différenciation** — et c'est la lecture que personne ne fait.

---

## D. Comparaisons mesurables

Au-delà de l'observation, quelques mesures rendent la comparaison incontestable :

```
[ ] LCP mobile de la page produit (Lighthouse, 3 runs, mêmes conditions)
[ ] Poids total de la page produit
[ ] Nombre de scrolls avant le bouton d'achat sur mobile
[ ] Nombre d'interruptions avant d'atteindre le produit
[ ] Nombre de clics entre l'accueil et l'ajout au panier
[ ] Nombre de champs jusqu'à l'écran de paiement
[ ] Frais de livraison : annoncés à quelle étape ?
```

Un tableau de ces sept mesures sur cinq boutiques est plus convaincant que dix pages d'analyse qualitative. Et il est reproductible : le client peut le refaire dans six mois.

---

## E. Ce qu'il ne faut pas faire

| Erreur | Pourquoi |
|---|---|
| Comparer avec des boutiques d'une autre échelle | Une marque à 50 M€ a des moyens et un trafic sans rapport |
| Recommander une fonctionnalité parce qu'un concurrent l'a | Sans comprendre le motif, c'est du bruit |
| Copier une mécanique d'urgence trompeuse | Tu recommanderais un risque juridique |
| Juger l'esthétique | « Leur design est plus moderne » n'est pas un constat |
| Se limiter aux concurrents directs | Aucune idée neuve n'en sortira |
| Ignorer les concurrents cités par le client | Ce sont ses références : il faut les traiter, même pour expliquer pourquoi elles sont mal choisies |
| Ne montrer que ce que les autres font mieux | Le client doit aussi savoir où il est déjà devant |

Ce dernier point compte : une section « ce que vous faites mieux qu'eux » rend le reste du rapport crédible et audible. Un document uniquement négatif provoque une réaction défensive, et un client sur la défensive n'implémente rien.

---

## F. Structure de la section concurrence dans le rapport

```markdown
## Analyse concurrentielle

### Boutiques analysées et pourquoi
| Boutique | Type | Raison du choix |

### Tableau comparatif — blocs de la page produit
{{le tableau}}

### Comparaison mesurée
{{les 7 mesures}}

### Ce qui est devenu un standard d'attente
Trois à cinq éléments présents chez tous et absents chez le client, avec le motif
pour lequel ils se sont généralisés.

### Ce que vous faites mieux
Deux à quatre éléments. À préserver, et à mettre davantage en avant.

### Les angles morts du secteur
Ce qu'aucun concurrent ne fait, et qui pourrait vous distinguer. Avec une réserve
honnête : si personne ne le fait, il y a peut-être une raison.

### Ce que je ne recommande PAS de copier
Deux ou trois pratiques observées, avec le motif du refus.
```

Les deux dernières sections sont celles qui font la différence entre un audit et une liste de captures d'écran. Elles montrent que tu as réfléchi plutôt que relevé.
