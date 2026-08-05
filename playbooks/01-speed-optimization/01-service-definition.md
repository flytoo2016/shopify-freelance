# 01 — Service Definition

---

## A. Ce que le client achète réellement

### Les symptômes qu'il décrit (mot pour mot)

| Ce qu'il dit | Ce que ça signifie techniquement |
|---|---|
| « Mon site est lent sur mobile » | LCP > 4 s au P75 mobile, souvent image hero ou carrousel |
| « Google me dit que mon site est lent » | Rapport Search Console Core Web Vitals en rouge (données CrUX) |
| « Le score Shopify est passé au orange » | Web Performance Dashboard : au moins une métrique hors seuil |
| « Ça saute quand la page charge » | CLS > 0,1 — images sans dimensions, bannière d'app, police |
| « Quand je clique, il ne se passe rien pendant 2 s » | INP > 200 ms — long tasks JS, souvent un script tiers |
| « Depuis que j'ai installé [app], c'est catastrophique » | Script tiers bloquant + code résiduel |
| « J'ai 50 000 visiteurs et 0,4 % de conversion » | Peut être la perf, peut être l'offre. **À ne pas présumer.** |

### La chaîne d'impact, dans l'ordre où tu dois la présenter au client

1. **Budget publicitaire.** C'est le seul argument qui produit une décision d'achat rapide. Formulation : *« Vous payez pour chaque visiteur. Ceux qui partent avant que la page s'affiche sont payés et perdus. »*
2. **Conversion mobile.** Le mobile est majoritaire en trafic et minoritaire en conversion. La perf n'explique pas tout l'écart, mais c'est la partie que tu peux corriger.
3. **SEO.** Les Core Web Vitals sont un signal de classement mesuré sur données terrain au 75ᵉ centile. C'est un signal parmi beaucoup d'autres — ne le survends pas.
4. **Perception de fiabilité.** Sur un panier moyen élevé, la lenteur alimente le doute au moment du paiement.
5. **Coût futur.** Un thème sain se dégrade moins vite quand le marchand installe de nouvelles apps.

### Ce que tu dois refuser de promettre

Ne dis jamais : *« +20 % de conversion »*, *« score 90+ garanti »*, *« 2× plus rapide »*.
Dis : *« Je mesure l'état actuel, je corrige ce qui est corrigeable côté thème, et je vous montre l'écart mesuré avec la même méthode. Ce qui dépend de vos apps, je vous le documente pour que vous puissiez décider. »*

Cette phrase te protège juridiquement, te distingue des vendeurs de promesses, et elle est vraie.

---

## B. Les trois formules

### BASIC — « Performance Audit + Quick Wins »
**Pour qui :** petite boutique, budget serré, veut savoir où elle en est.
**Scope :**
- Baseline sur 3 templates (home, collection, produit), 3 runs, mobile + desktop
- Identification de l'élément LCP et des sources de CLS
- Inventaire des scripts tiers avec poids
- 3 à 5 correctifs P0 implémentés
- Rapport avant/après (2 pages)

**Exclusions :** pas de refonte de section, pas d'audit d'apps approfondi, pas de suivi.
**Délai :** 3 jours ouvrés. **Révisions :** 1.

### STANDARD — « Full Theme Speed Optimization »
**Pour qui :** boutique en activité, trafic payant, veut du résultat.
**Scope :** Basic +
- Optimisation complète images / CSS / JS / fonts sur les 3 templates
- Suppression du code mort d'apps désinstallées
- Optimisation Liquid (boucles, rendus redondants)
- Rapport détaillé + documentation des changements
- Plan de rollback

**Exclusions :** suppression d'apps, refonte design, templates secondaires.
**Délai :** 5–7 jours ouvrés. **Révisions :** 2.

### PREMIUM — « Speed Optimization + App Audit + Monitoring »
**Pour qui :** marque établie, 10+ apps, enjeu revenu.
**Scope :** Standard +
- Audit app par app : poids, pages impactées, alternative, recommandation
- Optimisation de tous les templates (pages, blog, recherche, panier)
- Appel de restitution (45 min)
- Suivi 14 jours avec relevé RUM post-publication
- Guide « comment ne pas re-casser votre site » pour le client

**Délai :** 10–14 jours ouvrés. **Révisions :** 3.

---

## C. Le scope écrit — formulation contractuelle

À coller dans chaque proposal, sans modification :

> **Inclus.** Analyse et modification du code du thème Shopify (Liquid, CSS, JavaScript, assets) sur un thème de développement non publié. Mesures avant/après réalisées selon une méthodologie identique et documentée. Livraison d'un rapport détaillant chaque modification.
>
> **Non inclus.** Modification du checkout Shopify (non accessible). Optimisation de l'infrastructure serveur, du CDN ou du TTFB (gérés par Shopify). Suppression ou remplacement d'applications tierces sans accord écrit du client. Modifications de design ou de contenu. Optimisation d'applications tierces dont le code est chargé à distance et non modifiable.
>
> **Résultats.** L'amélioration mesurée dépend de facteurs partiellement hors de mon contrôle, notamment les applications installées, les scripts marketing tiers et le volume de trafic. Aucun score chiffré n'est garanti. Les mesures avant/après sont réalisées dans des conditions identiques et documentées ; les données terrain (RUM) mettent jusqu'à 30 jours à refléter les changements.
>
> **Production.** Aucune modification n'est publiée sur le thème actif sans autorisation écrite du client. Un thème de sauvegarde est créé avant tout travail.

Ce dernier paragraphe est le plus important : il règle 80 % des litiges avant qu'ils existent.

---

## D. Positionnement face à la concurrence

Le marché de la « Shopify speed optimization » est saturé de prestataires qui :
- installent une app de « speed booster » et facturent 50 $
- suppriment massivement du JS et cassent le panier
- optimisent pour le score PageSpeed sans regarder les données terrain
- promettent 90+ et livrent un rapport automatisé

Ton angle : **la méthode et la traçabilité.** Un client qui a déjà été déçu achète la rigueur, pas la promesse. Concrètement, dans chaque échange commercial :

1. Tu distingues explicitement **données terrain** et **données labo**. Presque aucun concurrent ne le fait, et c'est immédiatement crédible.
2. Tu montres un extrait de rapport avant/après réel (même sur un store de démo).
3. Tu dis ce que tu ne peux **pas** corriger. Cela inspire plus confiance que l'inverse.
4. Tu livres un `git diff` lisible. Le client peut donner ton travail à n'importe quel autre développeur.
