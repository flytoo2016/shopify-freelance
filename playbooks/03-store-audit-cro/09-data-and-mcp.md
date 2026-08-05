# 09 — Data & MCP

Ce qui sépare un audit d'un avis, c'est la donnée. Ce fichier recense les sources, ce que chacune peut dire, et surtout ce qu'aucune ne peut dire.

---

## A. Les sources et leurs limites

| Source | Ce qu'elle établit | Ce qu'elle ne peut pas établir |
|---|---|---|
| **Shopify Analytics** | Conversion, entonnoir, appareils, sources, recherches internes | Le pourquoi d'un abandon |
| **GA4** | Parcours, événements, comportement par segment | Fiable seulement si correctement configuré — à vérifier avant usage |
| **Search Console** | Requêtes, impressions, indexation, couverture | Rien sur la conversion |
| **Web Performance Dashboard** | Core Web Vitals terrain, P75, 30 jours | Le lien avec la conversion reste une hypothèse |
| **Lighthouse** | Diagnostic technique reproductible | Rien sur l'expérience réelle |
| **Ton parcours acheteur** | Friction, hésitation, incohérences | Ce n'est qu'un utilisateur : toi |
| **Le SAV du client** | Objections réelles, motifs de retour | Volume non quantifié sauf si le client le fournit |
| **Dev MCP** | Ce que Shopify permet techniquement | Rien sur cette boutique |

**La règle transversale :** dans le rapport, chaque affirmation porte visiblement sa source. Un lecteur doit pouvoir distinguer en un coup d'œil ce qui vient d'une mesure, d'une donnée client, ou de ton jugement professionnel.

Convention simple, à expliquer en page 2 :

```
[Donnée]      provient de vos statistiques
[Mesure]      relevé technique reproductible
[Observation] constaté lors du parcours, capture à l'appui
[Hypothèse]   mon interprétation, à confirmer par la mesure
```

Utilise ces marqueurs dans le corps du rapport. C'est simple, ça ne coûte rien, et aucun concurrent ne le fait.

---

## B. Vérifier la fiabilité des données avant de s'en servir

Étape systématique, avant toute conclusion. Si les données sont fausses, tout le raisonnement l'est.

```
[ ] Shopify Analytics et GA4 donnent-ils le même nombre de commandes
    sur 30 jours ? Écart acceptable : < 5 %. Au-delà de 15 % : problème
[ ] L'événement d'achat GA4 est-il déclenché une seule fois par commande ?
[ ] Les pixels publicitaires remontent-ils un nombre de conversions cohérent ?
[ ] Le bandeau de consentement bloque-t-il une partie de la mesure ?
[ ] Y a-t-il du trafic interne non exclu (toi, le client, l'agence) ?
[ ] Le taux de conversion inclut-il les commandes passées hors ligne ?
[ ] La période comparée contient-elle une anomalie (promotion, panne, campagne) ?
```

**Le double comptage de l'événement d'achat** est l'anomalie la plus fréquente et la plus coûteuse : le client optimise ses campagnes sur des conversions qui n'existent pas. C'est un P0 systématique quand tu le détectes, et c'est souvent le constat que le client retient de tout l'audit.

**Rappel d'actualité.** Depuis la fin de `checkout.liquid`, les scripts de suivi placés dans les « Additional Scripts » ne fonctionnent plus. Les boutiques Plus ont été migrées en 2025, les non-Plus ont une échéance au **26 août 2026**. Beaucoup de boutiques ont perdu leur suivi de conversion sans s'en apercevoir. Vérifie systématiquement si les pixels passent bien par des **Web Pixels** — c'est devenu un des constats les plus fréquents et les plus graves de l'audit en 2026.

---

## C. Les requêtes qui produisent les meilleurs constats

### Conversion par appareil
Le plus rentable de tous. L'écart mobile/desktop justifie à lui seul la priorisation de la moitié de la feuille de route.

### Recherches internes sans résultat
Analytics → recherches sur la boutique en ligne. Croise les 20 termes les plus recherchés avec ce que renvoie réellement le moteur. Chaque terme fréquent à zéro résultat est un constat :
- chiffré (nombre de recherches)
- spécifique (impossible à copier ailleurs)
- corrigeable à faible coût (synonymes, redirection, création de collection)
- incontestable

### Pages d'entrée du trafic payant
Si les publicités envoient sur l'accueil alors que le produit est identifié, c'est un constat majeur. Croise Q14 du questionnaire avec les pages de destination réelles.

### Produits les plus vus vs les plus vendus
Un produit très vu et peu vendu a un problème de page, de prix ou d'attente. C'est le meilleur point d'entrée pour l'audit de la page produit — et tu peux le montrer.

### Évolution sur 6 mois
Une dégradation datée se corrèle presque toujours avec un événement : installation d'application, mise à jour de thème, changement de source de trafic. Demande la chronologie au client.

---

## D. ShopifyQL et rapports personnalisés

Shopify permet des rapports personnalisés en ShopifyQL pour des métriques agrégées que l'API Admin ne calcule pas : ventes, sessions, taux de conversion, ventilés par produit, canal, région, ou comparés d'une période à l'autre.

En audit, deux usages :
1. **Construire une vue de conversion par type de page et par appareil**, que le client conservera après ta mission
2. **Créer le tableau de bord de suivi** qui servira à mesurer les effets de l'implémentation — et qui justifie le ré-audit à trois mois

Laisser au client deux ou trois rapports personnalisés bien construits est un livrable à coût nul pour toi et à valeur perçue élevée. Il les rouvrira chaque semaine.

---

## E. Le Dev MCP en Phase 3

Usage unique mais critique : **empêcher les affirmations techniques fausses.**

Un audit contient beaucoup de phrases du type « ceci nécessite une application », « ce thème ne permet pas de… », « cette fonctionnalité est native ». Une seule erreur de ce type, découverte par le développeur du client, décrédibilise l'ensemble du document.

Questions à lui poser systématiquement :
- Cette fonctionnalité est-elle native en Online Store 2.0, ou faut-il une app ?
- Est-ce réalisable avec des metafields, metaobjects ou sources dynamiques ?
- Cette approche est-elle dépréciée ?
- Quel est le comportement réel de {{objet ou filtre Liquid}} ?

Ce qu'il ne fait pas : voir la boutique, lire les analytics, juger une expérience. Il ne remplace ni ton parcours acheteur, ni tes mesures.

---

## F. Ce qu'aucune donnée ne dira jamais

À écrire dans la section « limites » du rapport :

- **Pourquoi** un visiteur est parti. Les données disent où, jamais pourquoi.
- **Ce qui se serait passé** si la boutique avait été différente. Sans test, c'est une hypothèse.
- **Si le produit est le problème.** Si l'offre est mal calibrée pour son marché, aucune amélioration d'interface ne le compense — et l'audit ne peut pas le trancher.
- **Si le trafic est qualifié.** Un ciblage publicitaire trop large produit une conversion faible sans qu'aucun élément de la boutique soit en cause. Signale-le comme hypothèse quand les indices convergent.

Formulation type :

> Vos données montrent que 68 % des visiteurs quittent la page produit sans ajouter au panier. Elles ne disent pas pourquoi. Les constats P0-02 et P1-05 en donnent deux explications plausibles, appuyées sur des observations documentées. La seule manière de les vérifier est de les corriger et de mesurer. Si l'écart persiste après correction, l'hypothèse à examiner devient la qualification du trafic — ce qui sort du périmètre de cet audit.

Cette manière de raisonner — poser une hypothèse, dire comment la tester, dire quoi regarder si elle est fausse — est ce qui distingue un auditeur d'un vendeur de recommandations.
