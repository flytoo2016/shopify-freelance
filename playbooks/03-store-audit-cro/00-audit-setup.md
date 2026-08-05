# 00 — Audit Setup

Un audit se gagne ou se perd avant la première capture d'écran. Ce qui le rend spécifique — donc vendable — c'est le contexte business et les données. Sans eux, tu produis un guide de bonnes pratiques déguisé.

---

## A. Ce qu'il faut obtenir, par ordre de valeur

| # | Élément | Pourquoi c'est décisif | Si tu ne l'as pas |
|---|---|---|---|
| 1 | **Taux de conversion et entonnoir** | Localise le problème : trafic, page produit, panier ou checkout | Tu audites une interface, pas une performance |
| 2 | **Répartition mobile / desktop** | Détermine où porter 80 % de l'effort | Tu risques d'optimiser le mauvais écran |
| 3 | **Conversion par appareil** | L'écart mobile/desktop est le constat le plus rentable | Tu perds ton meilleur argument |
| 4 | **Sources de trafic** | Un trafic froid ne se convertit pas comme du trafic de marque | Tes recommandations sont hors-sol |
| 5 | **Panier moyen et marge** | Calibre les recommandations (upsell, livraison offerte, paliers) | Tu recommandes à l'aveugle |
| 6 | **Pages d'entrée et de sortie** | Où les gens arrivent et où ils abandonnent | Tu audites au hasard |
| 7 | **Recherche interne** | Ce que les gens cherchent et ne trouvent pas — mine d'or | Tu passes à côté |
| 8 | **Budget d'implémentation** | Calibre la feuille de route | Tu produis une liste inapplicable |

Les points 1 à 3 sont ceux pour lesquels il vaut la peine d'insister. Formulation qui fonctionne :

> Sans accès à vos statistiques, je peux vous dire ce qui **pourrait** freiner vos visiteurs. Avec, je peux vous dire ce qui les freine **réellement**, et à quelle étape. C'est la différence entre une liste de bonnes pratiques et une liste de priorités. Un accès en lecture seule à vos rapports suffit — je n'ai besoin de voir ni vos commandes, ni vos clients.

---

## B. Accès demandés

| Accès | Niveau | Usage |
|---|---|---|
| Compte collaborateur Shopify | `Thèmes`, `Applications`, `Reports` | Analytics, apps, thème |
| Google Analytics 4 | Lecture (Viewer) | Comportement, parcours |
| Search Console | Lecture (Restricted) | Requêtes, indexation, couverture |
| Theme Access App | — | Optionnel en Phase 3, utile pour vérifier le code |

**Ne demande pas plus.** Un auditeur qui demande les permissions Commandes ou Clients inquiète, et n'en a pas besoin.

Si le client refuse tout accès : tu peux faire un audit d'interface, mais tu écris en première page :

> **Limites de cet audit.** Cet audit a été réalisé sans accès aux données analytiques de la boutique. Les constats portent sur l'expérience observable et sur des éléments techniques vérifiables. Les hypothèses relatives à leur impact sur la conversion sont signalées comme telles et devraient être confirmées par vos données avant tout arbitrage budgétaire important.

Cette page ne fait pas fuir les clients : elle rassure, et elle te protège.

---

## C. Les données à relever, et où

### Shopify Analytics

| Donnée | Chemin |
|---|---|
| Taux de conversion global | Analytics → tableau de bord |
| Entonnoir (sessions → panier → checkout → achat) | Analytics → rapport Taux de conversion |
| Sessions par appareil | Analytics → Sessions par type d'appareil |
| Conversion par appareil | Rapport personnalisé |
| Sessions par source | Analytics → Sessions par source de trafic |
| Pages les plus vues | Analytics → Sessions par page de destination |
| Produits les plus vendus / les plus vus | Analytics → rapports Produits |
| Recherches internes | Analytics → recherches sur la boutique en ligne |
| Panier moyen | Analytics → tableau de bord |
| Core Web Vitals (P75, 30 j) | Boutique en ligne → Thèmes (bannière) ou Analytics → Reports |

**Relève sur 90 jours** et compare aux 90 précédents. Une tendance vaut plus qu'un instantané, et elle te dit si le problème est nouveau.

### Ce que l'entonnoir t'apprend

| Symptôme | Interprétation |
|---|---|
| Beaucoup de sessions, peu d'ajouts au panier | Problème de page produit ou de trafic non qualifié |
| Beaucoup d'ajouts, peu d'entrées en checkout | Problème de panier : frais de port, confiance, friction |
| Beaucoup d'entrées en checkout, peu d'achats | Frais surprises, options de paiement, options de livraison |
| Conversion mobile très inférieure au desktop | Le chantier prioritaire, presque toujours |
| Conversion élevée mais peu de trafic | Ce n'est pas un problème de CRO. Dis-le |

Le dernier cas est celui où un auditeur honnête gagne un client pour la vie. Si la boutique convertit à 3,5 % avec 40 sessions par jour, le problème n'est pas la boutique. Écris-le en première page plutôt que d'inventer vingt constats d'interface.

---

## D. Préparer l'environnement de test

```
[ ] Navigateur en navigation privée, zéro extension
[ ] Un téléphone réel (iOS de préférence, plus un Android si possible)
[ ] Enregistrement d'écran prêt sur le téléphone
[ ] Un compte client de test créé (pour auditer le parcours connecté)
[ ] Un moyen de paiement de test, ou passage en mode test si le client l'autorise
[ ] Outil de capture avec annotation
[ ] Dossier evidence/ créé, convention de nommage prête
```

**La convention de nommage est ce qui sauve la rédaction :**

```
evidence/{ID-du-constat}-{zone}-{appareil}.png
evidence/P0-01-product-page-mobile.png
evidence/P1-04-cart-drawer-desktop.png
evidence/session-mobile-full.mp4
```

Sans elle, tu arrives à la rédaction avec 80 captures anonymes et tu réécris de mémoire — c'est-à-dire que tu produis du générique.

---

## E. La passe acheteur — à faire en premier, toujours

Avant toute analyse technique, avant même de regarder les analytics en détail : **tu achètes.**

```
[ ] Téléphone réel, données mobiles (pas le wifi), enregistrement d'écran actif
[ ] Tu arrives sur la boutique comme un visiteur venant d'une publicité : sur une
    page produit, pas sur la home
[ ] Tu ne prends AUCUNE note technique. Tu notes ce que tu RESSENS
[ ] Tu vas jusqu'à l'écran de paiement, sans payer
[ ] Puis tu recommences depuis la home
[ ] Puis tu cherches un produit précis via la recherche
[ ] Puis tu essaies de trouver la politique de retour
```

Après coup, seulement, tu revois l'enregistrement et tu notes les moments d'hésitation, de recul, de recherche visuelle.

**Pourquoi en premier :** tu ne peux découvrir une friction qu'une seule fois. Dès que tu connais la boutique, tu ne la vois plus comme un acheteur. Cette première session est la source la plus précieuse de tout ton audit — et c'est aussi le livrable qui impressionne le plus quand tu la montres commentée en restitution.

---

## F. Vérifications d'ouverture

Cinq contrôles à faire dès la première heure : ils peuvent transformer tout l'audit.

1. **Migration checkout.** La boutique utilise-t-elle encore `checkout.liquid`, des Additional Scripts ou des script tags sur les pages Merci / Suivi de commande ? Les boutiques non-Plus ont jusqu'au **26 août 2026** ; les Plus sont déjà migrées de force depuis 2025. Shopify Scripts s'est arrêté le 30 juin 2026. Si la migration n'est pas faite, c'est un **P0 immédiat** : les pixels de conversion et les flux de relance de panier cessent de fonctionner sans avertissement. Vérifie l'état exact et l'échéance en vigueur avant de l'écrire — les dates ont bougé plusieurs fois.

2. **Boutique protégée par mot de passe ?** Si oui, pas de données terrain de performance, et le comportement de chargement diffère.

3. **Le suivi fonctionne-t-il ?** Un pixel cassé rend toutes les données du client fausses. À vérifier avant de bâtir des conclusions dessus.

4. **Y a-t-il un page builder ?** Si oui, une grande partie du contenu échappe au thème, et tes recommandations d'implémentation changent.

5. **Combien d'applications ?** Détermine le plafond de performance et le risque de conflits.

---

## G. Cadrer le périmètre par écrit

Avant de commencer, fais valider :

```markdown
## Périmètre de l'audit — {{client}}

Pages auditées : accueil, une collection ({{laquelle}}), 3 pages produit
({{lesquelles}}), panier, recherche, {{autres}}
Appareils : mobile réel (iOS + Android), desktop
Concurrents analysés : {{3 à 5, nommés}}
Données utilisées : {{Shopify Analytics 90 j, GA4, Search Console}}
Non couvert : {{checkout au-delà de l'observable, campagnes publicitaires,
stratégie de prix, tests A/B}}
Budget d'implémentation indicatif communiqué : {{X}} €
Livraison : {{date}} — Restitution : {{date}}
```

Le budget indicatif dans le périmètre n'est pas indiscret : il garantit que la feuille de route sera utilisable. Dis-le ainsi :

> Une dernière question : quel ordre de budget envisagez-vous pour les corrections ? Ce n'est pas pour ajuster mon prix — il est fixe. C'est pour que ma feuille de route contienne des choses que vous pourrez réellement faire, plutôt qu'une liste idéale et inapplicable.
