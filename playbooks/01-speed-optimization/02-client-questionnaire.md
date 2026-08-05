# 02 — Client Discovery Questionnaire (Speed Optimization)

> Envoyé **après** l'accord de principe, **avant** le paiement final ou le démarrage.
> Objectif double : collecter ce dont tu as besoin, et faire comprendre au client qu'il travaille avec un professionnel.
> Version client : `templates/client-discovery-questionnaire.md`

---

## Bloc 1 — Le store

1. URL de la boutique : `_______`
2. Domaine `.myshopify.com` : `_______`
3. La boutique est-elle protégée par mot de passe ? Si oui, lequel ?
4. Plan Shopify : Basic / Grow / Advanced / Plus
5. Depuis combien de temps la boutique est-elle en ligne ?
6. Nombre approximatif de produits : `_____` — de collections : `_____`
7. Marchés / langues actifs (Shopify Markets) : `_______`

## Bloc 2 — Le thème

8. Nom exact du thème + version (Online Store → Themes → ⋯ → Edit code → `settings_schema.json`)
9. Le thème a-t-il été modifié par un développeur ? Par qui, quand ?
10. Existe-t-il un thème de sauvegarde ? Un thème de développement ?
11. Utilisez-vous l'intégration GitHub de Shopify ? (si oui, je travaille sur une branche)
12. Y a-t-il des sections ou fonctionnalités sur mesure à ne surtout pas casser ?

## Bloc 3 — Les applications

13. Capture d'écran de votre page **Apps** (toutes les apps installées).
14. Parmi elles, lesquelles sont **indispensables au business** ? (avis, abonnements, taxes, ERP…)
15. Avez-vous désinstallé des apps récemment ? Lesquelles ?
16. Utilisez-vous un page builder (GemPages, PageFly, Shogun, Zipify) ?
17. Quels scripts marketing tournent ? (Meta Pixel, TikTok, GA4, Klaviyo, Hotjar, Clarity, chat…)

## Bloc 4 — Le problème

18. Décrivez le problème avec vos mots.
19. Depuis quand ? Y a-t-il eu un événement déclencheur (app installée, changement de thème) ?
20. Est-ce pire sur mobile ou sur desktop ?
21. Y a-t-il des pages spécifiquement lentes ?
22. Avez-vous déjà fait appel à quelqu'un pour ce problème ? Qu'est-ce qui a été fait ?
23. Avez-vous un rapport d'audit existant ? Envoyez-le.

## Bloc 5 — Le business (indispensable pour prioriser)

24. Répartition trafic mobile / desktop (Analytics → Online store sessions by device)
25. Quelles sont vos **3 pages les plus importantes** en chiffre d'affaires ?
26. Faites-vous de la publicité payante ? Budget mensuel approximatif ?
27. Taux de conversion actuel (Analytics) : `_____ %`
28. Avez-vous une période critique à venir (promo, lancement, Black Friday) ?

## Bloc 6 — Les accès

29. Pouvez-vous installer l'application **Theme Access** et me générer un mot de passe ?
30. Sinon, acceptez-vous une demande de compte collaborateur limité à `Themes`, `Apps`, `Reports` ?
31. Avez-vous accès aux rapports **Web performance** de votre admin ? (Analytics → Reports, ou bannière en haut de Online Store → Themes)
32. Qui décide de la publication en production ? Vous ou quelqu'un d'autre ?

## Bloc 7 — Attentes

33. Qu'est-ce qui, pour vous, ferait de cette mission un succès ?
34. Quelle est votre échéance ?
35. Y a-t-il des choses que je ne dois **pas** toucher ?

---

## Grille de lecture des réponses

| Réponse | Ce que tu en fais |
|---|---|
| Q13 montre 25+ apps | Le plafond d'amélioration est bas. Le dire **avant** de signer, écrit. |
| Q16 : page builder | Le contenu des pages est hors de ton contrôle. Scope réduit, prix à ajuster à la hausse. |
| Q11 : intégration GitHub active | Excellente nouvelle. Tu travailles sur une branche, le workflow est propre. |
| Q10 : aucun backup | Tu crées le backup toi-même, en première action, et tu le documentes. |
| Q22 : « un dev a tout cassé » | Audit du `git diff` impossible → prévois du temps d'archéologie. Facture-le. |
| Q31 : pas d'accès aux reports | Tu perds la donnée terrain. Bascule sur CrUX via PageSpeed Insights et dis-le au client. |
| Q33 : « augmenter mes ventes » | ⚠️ Recadre par écrit : la vitesse est un facteur, pas une cause de vente. Sinon, litige. |
| Q35 vide | Relance. Un client qui n'a pas d'interdits n'a pas réfléchi — les interdits apparaîtront après ta livraison. |

---

## Modèle de message de demande d'accès

> Bonjour {{Prénom}},
>
> Pour démarrer, j'ai besoin d'un accès en lecture/écriture aux **fichiers du thème uniquement**. La méthode la plus sûre pour vous :
>
> 1. Installez l'application gratuite **Theme Access** depuis l'App Store Shopify
> 2. Cliquez sur « Create password », mettez mon e-mail : {{ton email}}
> 3. Vous recevrez le mot de passe — transmettez-le-moi
>
> Cet accès ne me donne **aucune** visibilité sur vos commandes, vos clients ou vos finances. Vous pouvez le révoquer en un clic à tout moment.
>
> Si vous souhaitez que je puisse aussi consulter vos rapports de performance et la liste de vos apps, je peux vous envoyer une demande de compte collaborateur — dans ce cas je ne demande que trois permissions : Themes, Apps, Reports.
>
> Première action de mon côté : je duplique votre thème actuel pour créer une sauvegarde datée. Rien ne sera modifié sur votre boutique en ligne sans votre accord écrit.
