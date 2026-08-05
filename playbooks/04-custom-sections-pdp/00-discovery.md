# 00 — Discovery

La discovery est ce qui sépare un développeur d'un exécutant. Un exécutant construit ce qu'on lui demande. Un développeur construit ce dont le client a besoin — et facture la différence entre les deux.

---

## A. La règle fondamentale

> **Le client décrit une solution. Ton travail est de retrouver le problème.**

Quand un client dit « je veux un carrousel d'avis sur ma page produit », il a déjà traduit son problème en solution — et sa traduction est fausse une fois sur deux. Le problème réel peut être :
- « mes visiteurs ne me font pas confiance »
- « j'ai 200 avis et personne ne les voit »
- « mon concurrent en a un »
- « mon widget d'avis actuel est lent »

Les quatre appellent des réponses différentes, et trois d'entre elles ne sont pas un carrousel.

**La question qui débloque tout :**

> « Si je vous construis ça et que ça marche parfaitement, qu'est-ce qui aura changé pour votre entreprise ? »

Si la réponse est vague, la spec le sera aussi, et tu construiras deux fois.

---

## B. Les cinq axes de discovery

### 1. Business

```
[ ] Que vend la boutique, à qui, à quel prix ?
[ ] Achat impulsif ou décision réfléchie ?
[ ] Panier moyen, marge — ce qui justifie ou non l'investissement
[ ] Quel indicateur ce composant est-il censé bouger ?
[ ] Comment le client saura-t-il que ça a marché ?
```

Le dernier point est celui à poser explicitement. S'il n'y a pas de réponse, dis-le : *« Nous n'aurons aucun moyen de savoir si ce composant a servi. Ce n'est pas bloquant, mais je préfère que ce soit clair entre nous plutôt que d'y revenir dans trois mois. »*

### 2. Audience

```
[ ] Qui achète : niveau de connaissance du produit, du secteur ?
[ ] Vocabulaire : celui du client ou celui du fabricant ?
[ ] Mobile ou desktop, en proportion réelle
[ ] Nouveaux visiteurs ou clients qui reviennent ?
[ ] Trafic froid (publicité) ou chaud (marque, e-mail) ?
```

Un composant destiné à du trafic publicitaire froid ne se conçoit pas comme un composant destiné à des clients fidèles. Le premier doit convaincre, le second doit être rapide.

### 3. Produit et offre

```
[ ] Combien de variantes, combien d'options ?
[ ] Les produits ont-ils tous les mêmes caractéristiques ?
[ ] Le catalogue est-il homogène ou hétérogène ?
[ ] Y a-t-il des lots, abonnements, paliers de prix ?
[ ] Le produit se comprend-il seul, ou faut-il l'expliquer ?
```

La question « les produits ont-ils tous les mêmes caractéristiques » détermine à elle seule l'architecture : réponse « non » → **metafields obligatoires**, ce qui change le devis et le délai.

### 4. Objections

C'est ici que se trouve la valeur de la prestation B (page produit). Reprends la méthode de la Phase 3 :

```
[ ] Quelles questions reviennent le plus au SAV avant achat ?
[ ] Quels sont les motifs de retour les plus fréquents ?
[ ] Qu'est-ce que les clients disent dans les avis négatifs ?
[ ] Qu'est-ce qui fait hésiter, d'après le client lui-même ?
```

**Les questions du SAV sont la liste exacte des objections que la page ne lève pas.** Un composant conçu à partir de cette liste est spécifique, défendable, et impossible à confondre avec une section générique achetée dans un thème premium.

### 5. Concurrence et références

```
[ ] Montrez-moi un site qui fait ce que vous voulez
[ ] Qu'est-ce qui vous plaît précisément là-dedans ?
[ ] Qu'est-ce que vous ne voulez SURTOUT pas ?
```

La deuxième question est la plus utile. « J'aime bien leur page produit » ne dit rien ; « j'aime qu'on voie le prix tout de suite » est une spécification.

---

## C. Traduire la demande en besoin

| Le client demande | Le besoin possible | La bonne question |
|---|---|---|
| « Un carrousel d'avis » | Crédibilité, ou visibilité des avis existants | « Combien d'avis avez-vous, et où sont-ils aujourd'hui ? » |
| « Un compte à rebours » | Faire décider plus vite | « L'échéance est-elle réelle ? » |
| « Une section comparatif » | Le client hésite entre deux produits | « Vos clients vous demandent-ils lequel choisir ? » |
| « Une table de tailles » | Réduire les retours | « Quel est votre taux de retour pour cause de taille ? » |
| « Une FAQ produit » | Objections non levées | « Quelles questions revient-il au SAV ? » |
| « Un configurateur » | Produit complexe à choisir | « Combien de combinaisons possibles ? » ⚠️ peut exiger une app |
| « Comme sur ce site » | Impression générale | « Qu'est-ce qui vous plaît précisément ? » |

**Le cas du compte à rebours mérite une position ferme.** Si l'échéance n'est pas réelle, tu ne le construis pas — c'est un risque réglementaire selon les marchés et un risque de réputation. Propose une alternative honnête : stock réel affiché, date de fin de promotion réellement respectée, ou délai de livraison garanti si commande avant une heure donnée.

---

## D. Le test de faisabilité

Avant de chiffrer, trois questions qui déterminent si c'est même possible :

**1. Est-ce que ça tient dans le thème ?**
Ce qui se fait dans un thème : affichage, mise en forme, interactions côté navigateur, lecture de données Shopify (produits, variantes, metafields, metaobjects, panier).
Ce qui ne s'y fait pas : logique serveur, calculs de remises, modification du checkout, écriture de données, appels à des systèmes externes avec identifiants.

Si la demande relève de la seconde catégorie, dis-le immédiatement. Une application ou une extension est nécessaire, et ce n'est pas cette prestation.

**2. Les données existent-elles ?**
Un composant qui affiche « la composition du produit » suppose que la composition soit stockée quelque part. Si elle n'existe pas :
- soit tu crées la structure (définition de metafield) et le client saisit — **c'est du travail, il faut le chiffrer**
- soit le client saisit dans la description — et le composant ne peut pas être structuré

C'est la cause n°1 de dérive de délai : le composant est prêt, mais le client n'a rien à y mettre.

**3. Qui va maintenir le contenu ?**
Si personne ne mettra à jour les données, un composant dynamique est inutile. Un composant statique bien fait vaut mieux qu'un composant dynamique vide.

---

## E. Le compte rendu de discovery

À écrire et à envoyer avant le devis :

```markdown
# Discovery — {{client}} — {{date}}

## Ce que vous m'avez demandé
{{leurs mots}}

## Ce que j'ai compris du besoin
{{le problème business, reformulé}}

## Ce que je propose de construire
{{la solution, qui peut différer de la demande initiale}}

## Pourquoi cette approche plutôt que celle envisagée
{{si tu proposes autre chose — c'est ici que se joue ta valeur}}

## Ce qui devra exister de votre côté
{{données à saisir, contenus à produire, décisions à prendre}}

## Ce qui n'est pas faisable dans le thème
{{honnêtement, avec l'alternative}}

## Ce que vous pourrez modifier vous-même après livraison
{{liste — c'est l'argument principal}}

## Prochaine étape
Rédaction de la spécification détaillée, que vous validerez avant tout code.
```

**Le paragraphe « pourquoi cette approche plutôt que celle envisagée » est ce qui te distingue.** Un prestataire qui exécute la demande sans la questionner est remplaçable. Un développeur qui explique pourquoi une autre solution sert mieux le besoin devient un interlocuteur — et ses devis se discutent moins.
