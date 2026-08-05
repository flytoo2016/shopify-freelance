# 00 — Intake & Triage

La première heure décide de la rentabilité de la mission et de la relation client. Elle se joue avant toute ligne de code.

---

## A. Les quatre premières minutes

Un message arrive : *« Mon panier ne fonctionne plus, c'est urgent. »*

Ne réponds pas « je peux regarder ». Réponds avec **trois questions et une action** :

> Bonjour {{Prénom}}, je peux m'en occuper. Trois choses pour aller vite :
>
> 1. L'URL exacte d'une page où ça se produit ?
> 2. Que se passe-t-il précisément — message d'erreur, page blanche, rien du tout ?
> 3. Qu'est-ce qui a changé sur la boutique dans les derniers jours (app installée, mise à jour du thème, intervention de quelqu'un) ?
>
> En attendant, **ne touchez plus au code** et **ne désinstallez aucune application** : cela effacerait des indices utiles.
>
> Je regarde votre boutique de mon côté et je reviens vers vous avec un premier avis sous {{délai}}.

Cette réponse fait trois choses : elle collecte l'essentiel, elle établit qui dirige, et la dernière instruction évite que le client détruise la scène pendant que tu arrives.

---

## B. La grille de triage

| Niveau | Définition | Exemples | Réponse | Tarification |
|---|---|---|---|---|
| **S1 — Production à l'arrêt** | Impossible d'acheter | Panier cassé, checkout inaccessible, page produit blanche | Immédiate, < 2 h | Majoration urgence ×1,5 à ×2 |
| **S2 — Dégradé** | On peut acheter, mais mal | Variantes cassées, filtres HS, mobile illisible | Sous 24 h | Tarif normal |
| **S3 — Cosmétique** | Visible, sans impact commercial | Alignement, marge, couleur | Sous 72 h | Tarif normal, groupé |
| **S4 — Interne** | Invisible pour l'acheteur | Section non éditable, alerte console | Planifié | Tarif normal |

**Règle :** le niveau est déterminé par *l'impact sur la capacité à acheter*, pas par le niveau de stress du client. Un client peut être en panique pour un S3. Ton travail est de le rassurer et de le replacer au bon niveau — pas de lui facturer une urgence qui n'en est pas une. Cette honnêteté-là se paie en fidélité.

---

## C. Protocole S1 — production à l'arrêt

L'ordre compte. Le premier réflexe n'est pas de comprendre, c'est de **rétablir**.

```
1. CONSTATER          reproduire moi-même, tout de suite. 3 min max
2. DATER              depuis quand ? qu'est-ce qui a changé ?
3. RÉTABLIR           existe-t-il un thème sain à republier ?
                      → si oui : le proposer immédiatement au client
4. STABILISER         confirmer que les commandes repassent
5. COMPRENDRE         seulement maintenant, sur une copie
6. CORRIGER           proprement, sur le thème de dev
7. REPUBLIER          après accord
```

Le point 3 est celui que les débutants sautent. Si le thème publié était sain il y a deux jours et qu'une sauvegarde existe, republier prend 60 secondes et arrête l'hémorragie. Tu diagnostiqueras ensuite, sans pression, sur une copie.

**Formulation client :**
> Je vois le problème et je peux le reproduire. Vous avez une sauvegarde de votre thème datée du {{date}}. Je vous propose de la republier maintenant : vos ventes repartent immédiatement. Vous perdrez les modifications faites depuis {{date}} — je les récupérerai ensuite. Vous validez ?

Si aucune sauvegarde n'existe : tu le notes. C'est ta première recommandation de prévention, et un upsell évident une fois la crise passée.

---

## D. Ce qu'il ne faut jamais faire en S1

- **Ne pas désinstaller une application** pour tester. Une désinstallation peut supprimer des données (avis, abonnements, réglages) de façon irréversible. Tu peux la **désactiver** ou neutraliser son script côté thème, sur une copie.
- **Ne pas modifier le thème publié** pour « voir ». Chaque essai est visible par les acheteurs.
- **Ne pas promettre un délai** avant d'avoir reproduit.
- **Ne pas accepter la théorie du client** sans la tester.

---

## E. Qualification en 8 questions

Avant de donner un prix :

1. Est-ce que je peux **reproduire** le bug ? *(si non, la mission ne peut pas commencer)*
2. Est-ce un bug, ou une **fonctionnalité qui n'a jamais existé** ?
3. Le thème est-il d'origine, modifié, ou custom sans documentation ?
4. Y a-t-il un historique Git ou une sauvegarde ?
5. Combien d'applications ?
6. Le client a-t-il déjà fait intervenir quelqu'un sur ce bug ?
7. Le client peut-il me donner un accès **aujourd'hui** ?
8. Est-ce **un** bug ou une **liste** de bugs ?

La question 2 est la plus rentable de toutes. « Le sélecteur de taille ne montre pas les stocks » peut vouloir dire *c'est cassé* ou *ça n'a jamais existé*. Le premier cas est une correction à 80 €, le second un développement à 400 €. Ne jamais démarrer sans avoir tranché — par écrit.

---

## F. Le devis en trois temps

Le problème de cette prestation : **tu vends un travail dont tu ignores la durée.** La réponse professionnelle :

> **Temps 1 — Diagnostic à prix fixe : {{X}} €, sous {{délai}}.**
> Je reproduis le problème, j'en identifie la cause exacte et je vous envoie un rapport écrit avec le correctif proposé, son coût et son délai.
>
> **Temps 2 — Correction.** Chiffrée précisément à l'issue du diagnostic. Le montant du diagnostic est déduit si vous poursuivez avec moi.
>
> **Temps 3 — Prévention.** Optionnel : ce qu'il faut mettre en place pour que cela ne se reproduise pas.

Avantages : tu es payé même si le bug se révèle être un problème d'application que tu ne peux pas corriger ; le client n'achète pas à l'aveugle ; et le rapport de diagnostic lui appartient — il peut le donner à qui il veut, ce qui désamorce toute méfiance.

Sur les bugs manifestement simples (moins d'une heure), saute cette étape et donne un prix ferme. Le devis en trois temps est fait pour l'incertitude, pas pour la bureaucratie.

---

## G. Le message qui fait signer

> J'ai reproduit votre problème sur {{page}} avec {{navigateur}}. Ce n'est pas un problème de configuration : {{observation technique précise et vérifiable}}.
>
> Je peux le corriger. Avant de vous donner un prix ferme, je dois vérifier {{point précis}}, parce que selon la réponse c'est soit {{une chose simple}}, soit {{une chose plus profonde}}.
>
> Deux options :
> - Diagnostic complet à {{X}} € : vous avez la cause exacte et un devis ferme sous {{délai}}
> - Ou si vous préférez un forfait tout compris sans diagnostic préalable : {{Y}} €, en assumant la fourchette haute
>
> Dans les deux cas je travaille sur une copie de votre thème. Votre boutique en ligne n'est pas touchée tant que vous n'avez pas validé.

Ce message démontre que tu as déjà travaillé, il explique honnêtement l'incertitude au lieu de la masquer, et il laisse le choix. C'est le taux de conversion le plus élevé que tu obtiendras sur cette prestation.
