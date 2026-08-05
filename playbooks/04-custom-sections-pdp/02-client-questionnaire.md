# 02 — Client Questionnaire (Composant sur mesure)

Envoyé avant le devis. Court volontairement — un questionnaire de quarante questions face à un client qui veut « juste une section » ne sera pas rempli. Les réponses alimentent directement `component-spec.md`.

---

## Formulaire client

```
BRIEF COMPOSANT — {{Boutique}}

## Le besoin

1. Décrivez ce que vous voulez obtenir, SANS parler de solution technique.
   Exemple : « je veux que mes clients sachent quelle taille prendre »
   plutôt que « je veux un tableau de tailles ».

2. Aujourd'hui, comment faites-vous ? Qu'est-ce qui ne va pas ?

3. Si je construis ça et que ça fonctionne parfaitement, qu'est-ce qui aura
   changé pour votre entreprise ?

4. Utilisez-vous une application pour ça actuellement ?
   Laquelle, et combien coûte-t-elle par mois ?

## Le contenu

5. Quels éléments devrez-vous modifier vous-même, et à quelle fréquence ?

6. Ces informations sont-elles LES MÊMES pour tous vos produits, ou
   différentes selon le produit ?

7. Si elles diffèrent : ces informations existent-elles déjà quelque part dans
   votre boutique, ou faudra-t-il les saisir ?

8. Qui saisira et mettra à jour ce contenu après la livraison ?

## L'affichage

9. Sur quelles pages cet élément doit-il apparaître ?
   (accueil, page produit, collection, toutes…)

10. Sur tous les produits, ou seulement certains ?

11. Combien d'éléments au maximum devez-vous pouvoir afficher ?
    (par exemple : combien de témoignages, combien de colonnes)

12. Comment cela doit-il se comporter sur téléphone ?

## Les références

13. Montrez-moi un site qui fait ce que vous voulez.
14. Qu'est-ce qui vous plaît PRÉCISÉMENT là-dedans ?
15. Qu'est-ce que vous ne voulez surtout pas ?
16. Avez-vous une maquette (Figma, Photoshop, croquis) ?

## Le contexte technique

17. Nom exact et version de votre thème. A-t-il été modifié ?
18. Un page builder est-il installé (GemPages, PageFly, Shogun, Zipify) ?
19. Vendez-vous sur plusieurs marchés ou en plusieurs langues ?
20. Avez-vous une charte graphique à respecter (couleurs, polices) ?
21. Y a-t-il des éléments à ne surtout pas toucher sur cette page ?

## Le cadre

22. Quelle est votre échéance ?
23. Qui valide et qui décide, in fine ?
```

---

## Les trois questions qui déterminent tout

**Question 6 — « les mêmes pour tous les produits ? »**
C'est la question qui fixe l'architecture, le délai et le prix.
- **Oui** → réglages de section. Simple, rapide.
- **Non** → metafields ou metaobjects obligatoires. Compte 1,5 à 2× le temps, plus la création des définitions, plus la documentation de saisie.

Un client ne comprend pas spontanément cette différence. Explique-la avant de chiffrer, sinon ton devis paraîtra arbitraire.

**Question 7 — « ces informations existent-elles déjà ? »**
Si la réponse est non, tu construis un contenant vide. C'est la cause n°1 de dérive de délai : le composant est prêt en cinq jours, le projet reste ouvert six semaines parce que personne n'a saisi les données.

Formulation à envoyer immédiatement :
> Je peux créer la structure qui accueillera ces informations. Leur saisie, en revanche, prend du temps de votre côté : environ {{n}} minutes par produit, sur {{N}} produits. Voulez-vous commencer par vos 20 produits les plus vendus, pour que le composant serve tout de suite ? Je peux aussi le chiffrer si vous préférez me confier la saisie.

**Question 5 — « ce que vous modifierez vous-même »**
Elle détermine le nombre de réglages du schéma. Un composant sous-configuré te coûte des interventions non facturables ; un composant sur-configuré perd le marchand, qui ne l'utilisera pas.

---

## Grille de lecture

| Réponse | Ce que tu en fais |
|---|---|
| Q1 formulée en solution technique | Reformule le besoin et fais valider ta reformulation |
| Q3 vague | Prévenir : aucun moyen de savoir si ça a servi. Le dire par écrit |
| Q4 avec un coût mensuel | Ton argument de vente principal est déjà là |
| Q6 « différentes » | Metafields. Prix ×1,5, délai ×1,5, documentation de saisie à prévoir |
| Q7 « il faudra les saisir » | ⚠️ Chiffrer le temps de saisie et décider qui le fait, **par écrit** |
| Q8 « personne » | Un composant dynamique est inutile. Propose du statique |
| Q11 sans limite | Impose un `max_blocks`. Un composant sans limite finit toujours cassé |
| Q12 non répondue | Relance. Le comportement mobile ne s'improvise pas à la fin |
| Q14 « j'aime bien leur page » | Insiste : qu'est-ce qui vous plaît **précisément** ? |
| Q16 maquette non finalisée | ⚠️ Ne démarre pas. Le redesign en cours de route est la première cause de perte de marge |
| Q18 page builder | Le composant peut ne pas être utilisable dans le builder. Vérifier avant de chiffrer |
| Q19 multi-marché | Textes traduisibles obligatoires, tests sur chaque marché. ×1,3 |
| Q23 ≠ ton interlocuteur | La spec devra convaincre quelqu'un que tu ne rencontreras pas. Rédige-la en conséquence |

---

## Ce que tu vérifies toi-même

Avant de chiffrer, sans le demander :

```
[ ] Le thème utilise-t-il déjà le dossier blocks/ (theme blocks) ?
[ ] Les templates concernés sont-ils en JSON ?
[ ] Des metafields existent-ils déjà, et sous quels namespaces ?
[ ] Le thème a-t-il été fortement modifié ? (indice de temps supplémentaire)
[ ] Y a-t-il déjà une section proche que je peux étendre plutôt que recréer ?
[ ] Combien d'applications injectent du code sur cette page ?
[ ] Le composant demandé existe-t-il déjà dans ma bibliothèque ?
```

La dernière ligne est celle qui fait ta marge. Consulte `shopify-components/` **avant** de chiffrer, jamais après.

---

## Le message de demande d'accès

> Bonjour {{Prénom}},
>
> Pour développer ce composant, j'ai besoin d'un accès aux fichiers de votre thème. Le plus sûr pour vous :
>
> 1. Installez l'application gratuite **Theme Access** depuis l'App Store
> 2. Créez un mot de passe pour {{ton email}}
>
> Cet accès ne donne accès qu'aux fichiers du thème : ni commandes, ni clients, ni finances. Vous pouvez le révoquer à tout moment.
>
> {{Si metafields}} J'aurai aussi besoin d'un accès collaborateur limité à `Produits` pour créer les définitions de metafields qui accueilleront vos informations. Je ne modifierai aucun produit sans votre accord.
>
> Première action de mon côté : je duplique votre thème pour créer une sauvegarde datée, puis je travaille sur une copie non publiée. Votre boutique en ligne n'est pas modifiée tant que vous n'avez pas validé le résultat sur un lien d'aperçu.
>
> Étape suivante : je vous envoie la spécification détaillée. Tant que vous ne l'avez pas validée, je n'écris pas une ligne de code — c'est ce qui garantit que je construis ce dont vous avez besoin.
