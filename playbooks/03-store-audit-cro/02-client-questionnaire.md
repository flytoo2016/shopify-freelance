# 02 — Client Questionnaire (Audit)

Envoyé après l'accord, avant le démarrage. Contrairement aux phases 1 et 2, ce questionnaire est **long et assumé** : le contexte business est ce qui rend l'audit spécifique. Explique-le au client en une phrase :

> Ce questionnaire est plus long que d'habitude. C'est volontaire : sans votre contexte, je ne peux produire qu'un guide de bonnes pratiques. Avec, je peux vous dire ce qui compte pour **votre** boutique. Comptez 15 minutes.

---

## Bloc 1 — L'entreprise

1. Que vendez-vous, en une phrase, comme si vous l'expliquiez à un inconnu ?
2. Qui achète ? (âge, situation, ce qu'ils cherchent)
3. Qu'est-ce qui vous différencie de vos concurrents, selon vous ?
4. Panier moyen : `_____` — Marge brute approximative : `_____ %`
5. Produit phare, et part du chiffre d'affaires qu'il représente
6. Achat impulsif, ou décision réfléchie ? Combien de temps entre découverte et achat ?
7. Y a-t-il du réachat ? À quelle fréquence ?
8. Vendez-vous aussi ailleurs (marketplaces, boutique physique, revendeurs) ?

## Bloc 2 — Le trafic

9. Sessions mensuelles approximatives
10. Répartition des sources (publicité, référencement, réseaux sociaux, e-mail, direct)
11. Budget publicitaire mensuel, s'il y en a un
12. Répartition mobile / desktop
13. Taux de conversion actuel, et son évolution sur 6 mois
14. Sur quelles pages vos publicités envoient-elles les visiteurs ?
15. Marchés et langues actifs

## Bloc 3 — Le problème

16. Qu'est-ce qui vous a décidé à commander cet audit ?
17. Qu'est-ce qui, selon vous, ne fonctionne pas ?
18. Qu'avez-vous déjà essayé ? Avec quel résultat ?
19. Vos clients vous font-ils des retours récurrents ? Lesquels ?
20. Quelles questions reviennent le plus souvent avant achat (SAV, chat, messages) ?
21. Quelles sont les raisons de retour ou d'annulation les plus fréquentes ?

**Les questions 20 et 21 sont les plus rentables de tout le questionnaire.** Les questions que posent les clients avant d'acheter sont la liste exacte des objections que la page produit ne lève pas. Les motifs de retour sont la liste des attentes que la page crée à tort.

## Bloc 4 — La technique

22. Nom et version du thème. A-t-il été modifié ?
23. Liste des applications (capture d'écran de la page Applications)
24. Utilisez-vous un page builder ?
25. Quels outils de suivi sont installés (GA4, Meta, TikTok, Klaviyo, Hotjar, Clarity) ?
26. Avez-vous migré vos personnalisations de checkout vers Checkout Extensibility ? Utilisez-vous encore des « Additional Scripts » sur les pages Merci ou Suivi de commande ?
27. Y a-t-il eu une refonte récente ? Quand ?
28. Travaillez-vous avec une agence ou un développeur actuellement ?

## Bloc 5 — La concurrence

29. Citez 3 à 5 concurrents ou boutiques que vous admirez, avec leur adresse
30. Pour chacun : qu'est-ce qui vous semble mieux fait chez eux ?
31. Vous considérez-vous comme moins cher, équivalent, ou plus cher qu'eux ?

## Bloc 6 — Les contraintes

32. Quel budget envisagez-vous pour mettre en œuvre les recommandations ?
33. Qui réaliserait les travaux — vous, votre agence, ou moi ?
34. Y a-t-il des choses intouchables ? (applications, sections, choix de marque)
35. Une échéance importante à venir (lancement, saison, campagne) ?
36. Qui décide, in fine ?

## Bloc 7 — Les accès

37. Pouvez-vous m'ajouter en collaborateur avec les permissions `Thèmes`, `Applications` et `Reports` ?
38. Accès en lecture à Google Analytics 4, si installé ?
39. Accès en lecture à Search Console, si disponible ?
40. La boutique est-elle protégée par mot de passe ? Si oui, lequel ?

---

## Grille de lecture

| Réponse | Ce que tu en fais |
|---|---|
| Q6 « décision réfléchie » | La page produit doit répondre aux objections, pas pousser à l'urgence. Recadre les recommandations |
| Q6 « achat impulsif » | Vitesse et réduction de friction priment sur le volume d'information |
| Q12 mobile > 70 % + Q13 conversion faible | Le chantier mobile est le sujet. Presque tout le reste passe après |
| Q14 « vers l'accueil » | Constat souvent majeur : le trafic payant devrait arriver sur la page produit |
| Q17 vs données réelles | Si le client se trompe de diagnostic, c'est le constat le plus précieux de ton rapport |
| Q18 « on a essayé X, ça n'a rien donné » | Comprends **pourquoi** avant de recommander quoi que ce soit d'approchant |
| Q20 | Liste directe des objections non levées → alimente `cro-audit.md` |
| Q21 | Attentes créées à tort par les fiches produit → constats produit |
| Q24 page builder | Une partie du contenu échappe au thème. Ajuste le périmètre et le devis d'implémentation |
| Q26 « je ne sais pas » | **Vérifie toi-même immédiatement.** Échéance du 26 août 2026 pour les non-Plus |
| Q31 « plus cher » | La justification du prix devient un axe d'audit central |
| Q32 budget faible | La feuille de route doit tenir dans ce budget. Sinon elle ne sera pas suivie |
| Q33 « mon agence » | Le rapport doit être assez précis pour être exécuté par un tiers. Écris pour un développeur |
| Q36 ≠ ton interlocuteur | Le rapport doit convaincre quelqu'un que tu n'as jamais rencontré. Renforce la synthèse |

---

## Le message d'accès

> Bonjour {{Prénom}},
>
> Pour que l'audit porte sur votre situation réelle et non sur des généralités, j'ai besoin de trois accès en **lecture seule** :
>
> 1. **Shopify** — une invitation collaborateur avec uniquement `Thèmes`, `Applications` et `Reports`. Je n'ai besoin d'aucun accès à vos commandes, vos clients ou vos finances.
> 2. **Google Analytics 4** — accès « Lecteur », si vous l'utilisez.
> 3. **Search Console** — accès restreint, si vous l'avez configurée.
>
> Ce que ces accès me permettent : voir à quelle étape vos visiteurs abandonnent, comment le mobile se compare au desktop, et ce que les gens cherchent dans votre moteur de recherche interne. Sans eux, je peux vous dire ce qui **pourrait** freiner vos visiteurs ; avec, je peux vous dire ce qui les freine réellement.
>
> Vous pouvez retirer ces accès à tout moment, et je vous le rappellerai en fin de mission.
