# 02 — Client Questionnaire (Migration)

Long et assumé. Une migration engage le chiffre d'affaires du client : personne ne s'étonne d'un questionnaire sérieux. Explique-le en une phrase :

> Ce questionnaire est long parce qu'une migration ne se chiffre pas au jugé. Chaque réponse évite une mauvaise surprise en cours de projet. Comptez 30 minutes — c'est le meilleur investissement de tout le projet.

---

## Bloc 1 — La plateforme actuelle

```
1. Plateforme source et version (WooCommerce X.X, WordPress X.X, Magento…)
2. URL de la boutique
3. Hébergeur. Avez-vous les accès ?
4. Avez-vous accès à la base de données (phpMyAdmin, SSH) ?
5. Depuis combien de temps la boutique est-elle en ligne ?
6. Y a-t-il un environnement de préproduction ?
7. Qui gère techniquement le site aujourd'hui ?
```

## Bloc 2 — Le domaine ⚠️

```
8. Chez quel registrar le nom de domaine est-il enregistré ?
9. Avez-vous les identifiants de ce compte ?
10. Le domaine est-il verrouillé pour transfert ?
11. Qui gère les DNS (registrar, Cloudflare, hébergeur) ?
12. Y a-t-il des sous-domaines actifs (blog, boutique, support) ?
13. Y a-t-il des adresses e-mail sur ce domaine ? Chez quel fournisseur ?
```

**Ce bloc se traite au premier échange.** C'est le point de blocage le plus fréquent et le plus stupide : tout est prêt, et personne ne peut modifier les DNS le jour J. La question 13 est piégeuse : une bascule DNS mal faite peut couper la messagerie du client.

## Bloc 3 — Le catalogue

```
14. Nombre de produits publiés / brouillons / privés
15. Nombre de variantes au total
16. Y a-t-il des produits avec plus de 3 attributs ? Combien ?
17. Y a-t-il des produits avec plus de 2 000 variantes ?
18. Tous les produits ont-ils un SKU unique ?
19. Nombre de catégories, et profondeur maximale de l'arborescence
20. Utilisez-vous des étiquettes / tags ? Comment ?
21. Avez-vous des produits téléchargeables ?
22. Des produits groupés, lots ou packs ?
23. Des produits par abonnement ? ⚠️
24. Des produits personnalisables (gravure, champs libres) ?
25. Gérez-vous des stocks multi-entrepôts ?
```

## Bloc 4 — Clients et commandes

```
26. Nombre de comptes clients
27. Nombre de commandes au total, et sur les 12 derniers mois
28. Quel historique de commandes souhaitez-vous conserver ?
29. Avez-vous un programme de fidélité avec des soldes de points ? ⚠️
30. Des cartes cadeaux actives avec solde ? ⚠️
31. Des avoirs ou crédits clients en cours ?
32. Vos clients se connectent-ils souvent à leur compte ?
```

La question 32 détermine l'ampleur du choc lié aux mots de passe. Si les comptes sont très utilisés, la campagne de communication devient un chantier à part entière.

## Bloc 5 — Contenu et SEO ⚠️

```
33. Nombre de pages, d'articles de blog
34. Trafic organique mensuel (Search Console : impressions et clics)
35. Puis-je avoir un accès en lecture à Search Console et Analytics ?
36. Quelles sont vos 20 pages les plus visitées ?
37. Utilisez-vous une extension SEO (Yoast, Rank Math) ?
38. Avez-vous des redirections déjà en place ?
39. Avez-vous des backlinks importants vers des pages précises ?
40. Vendez-vous en plusieurs langues ? Avec quelle extension ?
```

## Bloc 6 — Extensions et intégrations

```
41. Liste COMPLÈTE des extensions actives (capture de la page Extensions)
42. Pour chacune : à quoi sert-elle réellement dans votre activité ?
43. Y a-t-il du code sur mesure (fonctions PHP, thème enfant modifié) ?
44. Quelles intégrations sont en place : comptabilité, ERP, logistique,
    e-mailing, avis clients, chat ?
45. Quel prestataire de paiement utilisez-vous ?
46. Comment sont calculés vos frais de livraison ?
47. Comment sont gérées vos taxes ? Vendez-vous à l'international ?
```

## Bloc 7 — Le projet

```
48. Pourquoi migrez-vous ? Qu'est-ce qui ne va pas aujourd'hui ?
49. Quelle est votre échéance, et pourquoi ?
50. Quelles périodes sont à éviter absolument ?
51. Quel plan Shopify envisagez-vous ?
52. Avez-vous déjà choisi un thème ?
53. Souhaitez-vous conserver le design actuel, ou repartir sur autre chose ?
54. Qui, dans votre équipe, pourra tester la nouvelle boutique ?
55. Qui décide de la bascule, et qui sera joignable le jour J ?
56. Avez-vous déjà tenté une migration ? Que s'est-il passé ?
```

---

## Grille de lecture

| Réponse | Ce que tu en fais |
|---|---|
| Q9 « je ne sais pas » | ⚠️ **Bloquant.** À résoudre avant toute signature |
| Q13 e-mails sur le domaine | ⚠️ Ne pas toucher aux enregistrements MX. Le documenter dans le plan |
| Q16 « oui, beaucoup » | Poste de travail le plus lourd du projet. Compter précisément et chiffrer |
| Q18 « non » ou « je ne sais pas » | Nettoyage préalable à chiffrer. Les SKU en double bloquent l'import |
| Q23 abonnements | ⚠️⚠️ Projet séparé. Ne pas l'absorber |
| Q29 / Q30 soldes | Les soldes ne migrent pas toujours. À vérifier et à annoncer |
| Q32 « très souvent » | La campagne mots de passe devient un chantier |
| Q34 trafic élevé | Le SEO devient le cœur du projet. Prix et temps ×1,5 |
| Q35 refus d'accès | Tu travailles à l'aveugle sur les redirections. Le refuser ou l'écrire |
| Q39 backlinks importants | Ces URL passent en priorité absolue sur la carte de redirections |
| Q40 multilingue | Shopify Markets ou Translate & Adapt. Complexité ×1,5 |
| Q43 code sur mesure | Archéologie. Facturer une phase d'analyse |
| Q46 frais complexes | Vérifier la faisabilité native **avant** de promettre |
| Q49 échéance < 3 semaines | Refuser ou réduire le périmètre |
| Q50 vide | Insister. Un pic saisonnier oublié est un désastre |
| Q54 « personne » | ⚠️ La période de test client ne se fera pas. Grave |
| Q56 « on a déjà essayé » | Comprendre **précisément** ce qui a échoué avant de s'engager |

---

## Le message d'accès

> Bonjour {{Prénom}},
>
> Pour l'audit, j'ai besoin de cinq accès. Aucun ne me permet de modifier quoi que ce soit sur votre boutique actuelle sans votre accord.
>
> 1. **Administrateur de la boutique source** — pour recenser précisément ce qui existe
> 2. **Google Search Console** (lecture) — c'est la source la plus fiable pour connaître vos pages indexées, donc pour construire le plan de redirections
> 3. **Google Analytics** (lecture) — pour identifier les pages qui portent votre trafic et les traiter en priorité
> 4. **Accès à l'hébergement** — utile pour un export propre de la base de données
> 5. **Confirmation de vos accès au registrar** — vous n'avez rien à me transmettre pour l'instant : vérifiez simplement que vous pouvez vous connecter et modifier les DNS. C'est le point qui bloque le plus de migrations à la dernière minute.
>
> Le point 5 mérite d'être fait cette semaine, même si nous ne démarrons que dans un mois.
>
> Première étape : l'audit. Je vous remets un document qui recense tout ce qui existe, ce qui migrera proprement, ce qui demandera un traitement particulier, et ce qui ne pourra pas être migré — avec un plan chiffré. Ce document vous appartient : vous pourrez le confier à n'importe quel prestataire.
