# 01 — Service Definition

---

## A. Ce que le client achète

Il n'achète pas des lignes de code. Il achète, dans cet ordre :

1. **L'arrêt de la perte.** Un panier cassé sur une boutique qui fait 300 € par jour coûte 12,50 € par heure. Le client fait ce calcul, consciemment ou non.
2. **La fin de l'incertitude.** Il ne sait pas si c'est grave, si c'est cher, si ça va empirer. La première chose que tu vends, c'est un diagnostic.
3. **La garantie de ne pas empirer.** Il a peut-être déjà fait appel à quelqu'un qui a cassé autre chose.
4. **La compréhension.** « Pourquoi c'est arrivé » vaut presque autant que la correction, parce que ça lui donne prise sur son propre outil.

---

## B. Les trois formules

### QUICK FIX
**Pour :** un bug isolé, reproductible, à cause probable identifiable rapidement.
**Contenu :** reproduction, diagnostic, correction, test du parcours d'achat, message expliquant la cause.
**Livrable :** un message structuré (symptôme / cause / correctif / testé).
**Délai :** 24–48 h. **Garantie :** 7 jours sur le bug corrigé.

### DIAGNOSTIC + FIX
**Pour :** bug complexe, cause inconnue, ou plusieurs symptômes possiblement liés.
**Contenu :** Quick Fix + rapport de cause racine écrit + rapport de tests + plan de rollback.
**Délai :** 2–5 jours. **Garantie :** 14 jours.

### BUG SPRINT
**Pour :** liste de bugs, thème abandonné, reprise après un prestataire défaillant.
**Contenu :** audit de santé du thème, liste priorisée, correction de N bugs, mise en place d'un versionnage Git, documentation, appel de restitution.
**Délai :** 5–10 jours. **Garantie :** 30 jours.

---

## C. Le scope écrit

À coller dans toute proposition :

> **Inclus.** Reproduction du problème décrit, identification de sa cause, correction dans le code du thème (Liquid, CSS, JavaScript), tests de non-régression sur le parcours d'achat, et explication écrite de la cause. Le travail est réalisé sur une copie non publiée du thème.
>
> **Non inclus.** Toute fonctionnalité qui n'existait pas et ne fonctionnait pas auparavant. La modification du code d'une application tierce. Les problèmes de checkout hors Shopify Plus. La récupération de données perdues. Les corrections rendues nécessaires par des modifications effectuées par un tiers après ma livraison.
>
> **Applications tierces.** Si la cause se situe dans le code d'une application, je vous l'indique précisément avec les éléments à transmettre à son éditeur. Je peux proposer un contournement côté thème lorsque c'est techniquement possible ; ce n'est pas toujours le cas, et un contournement peut cesser de fonctionner si l'application est mise à jour.
>
> **Garantie.** Le bug corrigé est garanti {{N}} jours. Cette garantie couvre la réapparition du même problème sans intervention extérieure. Elle ne couvre pas les nouveaux bugs, ni les conséquences de modifications apportées par un tiers, ni l'installation de nouvelles applications.
>
> **Production.** Aucune modification n'est publiée sans votre accord écrit. Une sauvegarde du thème est créée avant tout travail.

Le paragraphe « Applications tierces » est celui qui te sauve. Une part significative des « bugs de thème » se révèlent être des bugs d'application. Sans cette clause, tu te retrouves à devoir corriger gratuitement du code que tu n'as pas écrit et que tu ne peux pas modifier.

---

## D. La frontière bug / fonctionnalité

C'est **la** source de conflit de cette prestation. Écris-la, fais-la valider.

| Demande | Nature | Traitement |
|---|---|---|
| « Le sélecteur de variantes ne met plus à jour le prix » | Bug — ça marchait | Correction |
| « Je veux que le prix se mette à jour sans recharger » | Fonctionnalité — ça n'a jamais marché | Devis Phase 4 |
| « Depuis la mise à jour, mes badges promo ont disparu » | Bug de régression | Correction |
| « Je veux des badges promo » | Fonctionnalité | Devis Phase 4 |
| « Le menu mobile ne s'ouvre plus » | Bug | Correction |
| « Le menu mobile s'ouvre mal sur iPad » | À déterminer — a-t-il déjà été testé sur iPad ? | Diagnostic d'abord |

**Le test décisif :** *cette chose a-t-elle déjà fonctionné sur cette boutique ?* Si la réponse est non, ce n'est pas un bug, quelle que soit la conviction du client. Cette phrase, posée calmement, désamorce presque toutes les discussions :

> *« Je comprends ce que vous attendez. En regardant l'historique, cette fonctionnalité n'a jamais été présente dans votre thème — ce n'est donc pas une chose qui s'est cassée, c'est une chose à développer. Ce n'est pas la même prestation ni le même temps. Je peux vous chiffrer les deux séparément. »*

---

## E. Positionnement

Le marché est occupé par deux profils :
- Le très rapide et très bon marché, qui met un `display: none` sur le symptôme et disparaît
- L'agence, qui facture un forfait mensuel dont le client n'a pas besoin

Ton angle : **la cause racine et la traçabilité**. Trois marqueurs qui te distinguent immédiatement dans le premier échange :

1. Tu dis **« je dois d'abord reproduire »** au lieu de proposer une solution tout de suite.
2. Tu poses la question **« qu'est-ce qui a changé récemment ? »** — presque personne ne la pose, et elle contient souvent la réponse.
3. Tu expliques la cause après coup, dans un français que le client comprend.

Un client à qui on a expliqué pourquoi son panier était cassé ne cherchera pas un autre prestataire la fois suivante.
