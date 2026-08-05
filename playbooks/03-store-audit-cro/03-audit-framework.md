# 03 — Audit Framework

Les 29 zones. Pour chacune : ce que tu vérifies, la preuve à capturer, et les signaux d'alerte. Tout se fait **deux fois** : mobile réel d'abord, desktop ensuite.

> Règle transversale : un point de cette liste qui ne produit pas de constat spécifique à cette boutique ne va **pas** dans le rapport. La checklist sert à ne rien oublier, pas à remplir des pages.

---

# BLOC A — ARRIVÉE ET NAVIGATION

## 1. Page d'accueil

```
[ ] En 5 secondes : que vend cette boutique, à qui, et pourquoi elle ?
[ ] La proposition de valeur est-elle écrite, ou seulement suggérée par des images ?
[ ] Y a-t-il un chemin évident vers un produit ? Combien de clics ?
[ ] Le premier écran mobile contient-il autre chose qu'une image et un menu ?
[ ] Combien de sections avant le premier produit visible ?
[ ] Y a-t-il un carrousel automatique ? (défilement automatique = contenu non lu)
[ ] Les éléments de réassurance sont-ils visibles sans scroller (livraison, retours) ?
[ ] Le bandeau d'annonce dit-il quelque chose d'utile, ou est-il décoratif ?
```
**Preuve :** capture du premier écran mobile, non scrollé.
**Signal d'alerte :** si tu ne peux pas dire ce que vend la boutique après 5 secondes sur mobile, c'est un P0.

## 2. En-tête

```
[ ] Logo cliquable vers l'accueil
[ ] Recherche accessible en un geste sur mobile
[ ] Icône panier visible avec compteur d'articles
[ ] En-tête fixe au scroll ? Occupe-t-il trop de hauteur sur mobile ?
[ ] Nombre d'éléments dans le menu principal
[ ] Les libellés sont-ils compréhensibles hors contexte de marque ?
```
**Signal d'alerte :** menu contenant des noms de collections inventés (« La Collection Éclat ») sans indication de ce que c'est.

## 3. Navigation

```
[ ] Un visiteur peut-il atteindre n'importe quelle catégorie en 2 clics ?
[ ] La navigation reflète-t-elle la façon dont les clients pensent, ou l'organisation interne ?
[ ] Y a-t-il des collections vides ou quasi vides ?
[ ] Les collections importantes sont-elles au premier niveau ?
[ ] Fil d'Ariane présent sur collection et produit ?
[ ] Le pied de page contient-il les liens utiles (livraison, retours, contact, mentions) ?
```

## 4. Méga-menu

```
[ ] Utilisable au doigt sur mobile ? (zones tactiles, fermeture accessible)
[ ] Un parent est-il cliquable, ou seulement ouvrant ?
[ ] Y a-t-il plus de 3 niveaux ? (au-delà, c'est de la friction)
[ ] Les images du menu ralentissent-elles son ouverture ?
```

## 5. Recherche

```
[ ] Une recherche avec faute d'orthographe donne-t-elle des résultats ?
[ ] Recherche par synonyme (« pull » vs « sweat »)
[ ] Suggestions à la saisie ? Avec image et prix ?
[ ] Que se passe-t-il sur zéro résultat ? Page vide, ou suggestions ?
[ ] Les résultats sont-ils filtrables et triables ?
[ ] Les termes de recherche interne du client sont-ils tous couverts ?
```
**Source :** Analytics → recherches sur la boutique. Croise les 20 termes les plus recherchés avec ce que renvoie réellement le moteur. Les termes fréquents à zéro résultat sont des constats immédiats, chiffrés, et incontestables. C'est souvent le meilleur constat de tout l'audit.

---

# BLOC B — DÉCOUVERTE PRODUIT

## 6. Pages collection

```
[ ] Combien de produits visibles sans scroller, sur mobile ?
[ ] Le titre et le prix sont-ils lisibles sur la carte produit ?
[ ] Les variantes de couleur sont-elles visibles depuis la carte ?
[ ] Y a-t-il une image au survol / seconde image ?
[ ] Les produits en rupture sont-ils affichés ? Où ?
[ ] Le tri par défaut est-il pertinent commercialement ?
[ ] Y a-t-il un texte de collection utile pour le référencement et pour l'acheteur ?
[ ] Pagination, bouton « charger plus », ou défilement infini ? Le choix est-il tenable ?
```

## 7. Filtres et tri

```
[ ] Des filtres existent-ils ? Sont-ils adaptés au catalogue ?
[ ] Sont-ils accessibles sur mobile sans masquer le contenu ?
[ ] Le nombre de résultats est-il indiqué par option ?
[ ] Les filtres combinés fonctionnent-ils ?
[ ] Les filtres survivent-ils à la navigation retour ?
[ ] Y a-t-il des filtres qui ne renvoient aucun produit ?
```
**Signal d'alerte :** catalogue de plus de 50 produits sans filtres. Constat P0 quasi systématique.

## 8. Découverte et merchandising

```
[ ] Les produits phares sont-ils mis en avant, ou noyés ?
[ ] Y a-t-il des sélections éditorialisées (« pour débuter », « nos best-sellers ») ?
[ ] Les produits recommandés sont-ils pertinents ou aléatoires ?
[ ] Existe-t-il un guide d'aide au choix quand le catalogue le justifie ?
```

---

# BLOC C — LA PAGE PRODUIT

C'est la zone la plus rentable de l'audit. Un tiers de tes constats devrait s'y trouver.

## 9. Galerie produit

```
[ ] Combien d'images ? Y a-t-il une mise en situation, une échelle, un détail ?
[ ] Zoom disponible sur mobile ?
[ ] Le changement de variante met-il à jour l'image ?
[ ] Y a-t-il une vidéo ? Se déclenche-t-elle automatiquement avec du son ? (à proscrire)
[ ] L'image principale occupe-t-elle trop de hauteur sur mobile, repoussant le prix
    et le bouton d'achat sous la ligne de flottaison ?
```
**Preuve :** capture mobile non scrollée. Le bouton d'ajout au panier est-il visible ?

## 10. Titre, prix, disponibilité

```
[ ] Le titre décrit-il le produit, ou seulement le nom de gamme ?
[ ] Le prix est-il visible sans scroller sur mobile ?
[ ] Prix barré / promotion : la référence est-elle crédible ?
[ ] La disponibilité est-elle indiquée ? Le délai de livraison ?
[ ] Le prix à l'unité de mesure est-il affiché quand il est pertinent ?
```

## 11. Sélecteur de variantes

```
[ ] Les options sont-elles compréhensibles sans deviner ?
[ ] Les combinaisons indisponibles sont-elles signalées ou masquées ?
[ ] Les couleurs sont-elles des pastilles visuelles ou du texte ?
[ ] Un guide des tailles est-il accessible sans quitter la page ?
[ ] Le choix par défaut est-il le plus vendu, ou le premier de la liste ?
[ ] La sélection met-elle à jour prix, image et disponibilité ?
```

## 12. Ajout au panier

```
[ ] Le bouton est-il visible sans scroller sur mobile ?
[ ] Reste-t-il accessible au scroll (barre collante) ?
[ ] Son libellé est-il explicite ?
[ ] Un retour visuel confirme-t-il l'ajout ?
[ ] Y a-t-il un bouton d'achat express ? Concurrence-t-il l'ajout au panier ?
[ ] Le sélecteur de quantité est-il nécessaire ici ?
```

## 13. Information produit

```
[ ] La description répond-elle à « pourquoi celui-ci plutôt qu'un autre » ?
[ ] Est-elle lisible sur mobile, ou est-ce un bloc de texte compact ?
[ ] Matières, dimensions, composition, entretien : présents ?
[ ] Les informations sont-elles repliées dans des accordéons fermés par défaut ?
[ ] Le vocabulaire est-il celui du client ou celui du fabricant ?
```
**À croiser avec la Q20 du questionnaire :** chaque question fréquente au SAV qui n'a pas de réponse sur la page produit est un constat, chiffré par le volume de questions.

## 14. Réassurance et confiance

```
[ ] Politique de retour visible depuis la page produit ?
[ ] Délai de livraison indiqué avant le panier ?
[ ] Modes de paiement affichés ?
[ ] Y a-t-il un contact humain visible quelque part ?
[ ] Les badges de confiance sont-ils réels ou décoratifs ?
[ ] Mentions légales, adresse, numéro d'entreprise accessibles ?
```
**Signal d'alerte :** badges génériques (« 100 % sécurisé », cadenas dessiné) sans information réelle. Ils réduisent la confiance plutôt qu'ils ne l'augmentent chez un acheteur averti.

## 15. Avis clients

```
[ ] Y a-t-il des avis ? Combien ? Sont-ils visibles depuis le haut de page ?
[ ] Note moyenne affichée près du titre ?
[ ] Les avis négatifs existent-ils ? (100 % de 5 étoiles réduit la crédibilité)
[ ] Les avis contiennent-ils des photos ?
[ ] Le widget provoque-t-il un décalage visuel au chargement ?
[ ] Les avis sont-ils spécifiques au produit ou globaux à la boutique ?
```

## 16. Preuve sociale et contenu utilisateur

```
[ ] Photos de clients réels ?
[ ] Mentions presse ou partenariats vérifiables ?
[ ] Compteurs (« 2 400 clients satisfaits ») : crédibles et vérifiables ?
[ ] Contenu Instagram intégré : ralentit-il la page pour ce qu'il apporte ?
```

## 17. Offre, urgence, prix

```
[ ] L'offre est-elle claire (ce qu'on obtient exactement, pour combien) ?
[ ] Y a-t-il des mécaniques d'urgence ? Sont-elles honnêtes ?
[ ] Compteur permanent, faux stock, minuteur qui se réinitialise → à signaler
[ ] Seuil de livraison offerte : est-il indiqué et cohérent avec le panier moyen ?
[ ] Réductions par quantité, abonnement, lots : lisibles ?
```
**Position à tenir :** les mécaniques d'urgence mensongères sont un risque juridique et un risque de réputation. Signale-les comme un constat, pas comme une opinion esthétique.

## 18. Ventes additionnelles et croisées

```
[ ] Y a-t-il des produits complémentaires proposés ? Sont-ils pertinents ?
[ ] Sont-ils placés avant ou après le bouton d'achat ?
[ ] Détournent-ils de l'achat en cours ?
[ ] Y a-t-il des produits vus récemment ?
```

## 19. FAQ produit

```
[ ] Une FAQ existe-t-elle sur la page produit ?
[ ] Répond-elle aux questions réelles (Q20) ou à des questions inventées ?
[ ] Est-elle indexable (contenu présent dans le HTML, pas injecté par JS) ?
```

---

# BLOC D — PANIER ET CHECKOUT

## 20. Panier / tiroir de panier

```
[ ] Tiroir latéral ou page dédiée ? Le choix est-il cohérent avec le parcours ?
[ ] Les frais de livraison sont-ils annoncés ou estimés avant le checkout ?
[ ] Le seuil de livraison offerte est-il rappelé avec la distance restante ?
[ ] Modification de quantité et suppression fonctionnent-elles sans rechargement ?
[ ] Y a-t-il un rappel de la politique de retour ?
[ ] Le bouton de commande est-il visible sans scroller, panier plein ?
[ ] Le panier vide propose-t-il quelque chose ?
```
**Signal d'alerte majeur :** frais de livraison découverts au checkout. C'est la cause d'abandon la plus documentée du commerce en ligne, et c'est corrigeable côté thème.

## 21. Checkout — ce qui est observable et configurable

Le checkout Shopify n'est pas modifiable librement. Ce que tu **peux** auditer :

```
[ ] Modes de paiement proposés (portefeuilles, paiement fractionné, virement)
[ ] Boutons de paiement accéléré affichés ?
[ ] Options de livraison : lisibles, avec délais ?
[ ] Le compte client est-il obligatoire ? (à proscrire)
[ ] Champs demandés : y en a-t-il d'inutiles ?
[ ] Personnalisation de marque (logo, couleurs) faite ?
[ ] Page Merci : contenu utile, ou page par défaut ?
[ ] Devise et langue cohérentes avec le marché
```

**Vérification critique — migration checkout.** Les personnalisations historiques (`checkout.liquid`, Additional Scripts, script tags) sur les pages Merci et Suivi de commande sont supprimées par Shopify. Les boutiques Plus ont été migrées en 2025 ; les non-Plus ont une échéance au **26 août 2026**. Shopify Scripts s'est arrêté le 30 juin 2026.

```
[ ] La boutique utilise-t-elle encore des « Additional Scripts » ?
[ ] Les pixels de conversion (Meta, Google, TikTok) passent-ils par des Web Pixels ?
[ ] Les événements de relance de panier (Klaviyo et assimilés) sont-ils migrés ?
[ ] Des Shopify Scripts étaient-ils utilisés pour des remises ou frais de port ?
```
Si la réponse est « non migré », c'est un **P0 avec une échéance datée** — le type de constat qui justifie à lui seul le prix de l'audit. Vérifie l'état des échéances au moment de l'audit, elles ont été décalées plusieurs fois.

---

# BLOC E — TECHNIQUE

## 22. Performance

Méthodologie complète en Phase 1. Version audit :

```
[ ] P75 LCP / INP / CLS sur 30 jours, par type de page (Web Performance Dashboard)
[ ] Lighthouse mobile, 3 runs, médiane, sur 3 pages types
[ ] Élément LCP identifié sur la page produit
[ ] Poids total et nombre de requêtes
[ ] Poids des scripts tiers, par origine
```
**Ce qui compte dans un audit CRO :** relier la performance à un endroit du parcours. « La page produit met 4,3 s à afficher son contenu principal sur mobile, alors que 74 % de votre trafic est mobile » est un constat. « Votre score PageSpeed est de 42 » n'en est pas un.

## 23. SEO technique

```
[ ] Balise <title> unique et descriptive par page type
[ ] Meta description présente et spécifique
[ ] Balise canonical présente
[ ] Un seul <h1> par page, hiérarchie de titres cohérente
[ ] Données structurées produit valides (Rich Results Test)
[ ] Attributs alt sur les images
[ ] Sitemap accessible, pages indexables
[ ] robots.txt cohérent
[ ] Balises hreflang si multi-langue
[ ] Pages de collection avec contenu textuel
[ ] URL propres, pas de paramètres inutiles indexés
[ ] Search Console : pages exclues, erreurs de couverture
```
Un thème conforme aux exigences du Theme Store contient nativement `title`, `meta description`, `canonical` et les données structurées produit. Si elles manquent, c'est le signe d'un thème modifié ou d'un page builder — précise-le, c'est un indice utile pour la suite.

## 24. Accessibilité

Niveau constat, pas audit de conformité complet.

```
[ ] Contraste du texte principal et des boutons
[ ] Navigation au clavier possible sur les éléments clés
[ ] Focus visible
[ ] Attributs alt significatifs
[ ] Formulaires avec libellés associés
[ ] Cibles tactiles suffisamment grandes sur mobile
[ ] Aucune information portée uniquement par la couleur
[ ] Vidéos sans lecture automatique avec son
```
**Deux angles à donner :** l'accessibilité est un enjeu légal croissant, et c'est aussi de la conversion — un contraste faible sur un prix affecte tous les acheteurs de plus de 45 ans.

## 25. Mobile

Transversal, mais mérite sa propre passe :

```
[ ] Aucun débordement horizontal
[ ] Texte lisible sans zoom
[ ] Boutons atteignables au pouce
[ ] Pas d'élément fixe masquant le contenu
[ ] Formulaires : bon type de clavier déclenché
[ ] Pas de survol requis pour accéder à une fonction
[ ] Temps entre l'arrivée et la possibilité d'acheter
```

## 26. Applications

```
[ ] Nombre d'applications installées
[ ] Applications visiblement inutilisées
[ ] Doublons fonctionnels (deux apps d'avis, deux popups)
[ ] Applications dont le script se charge sur toutes les pages sans nécessité
[ ] Code résiduel d'applications désinstallées
```

## 27. Analytics et tracking

Zone souvent ignorée par les auditeurs, et souvent la plus grave.

```
[ ] Shopify Analytics et GA4 concordent-ils ? (écart > 15 % = problème)
[ ] Événements e-commerce GA4 configurés (vue produit, ajout panier, achat) ?
[ ] Pixels publicitaires actifs et déclenchant correctement ?
[ ] Événement d'achat déclenché une seule fois ?
[ ] Consentement cookies : bloque-t-il le suivi ? Est-il conforme ?
[ ] Un outil de mesure comportementale est-il installé mais inexploité ?
```
**Si les données sont fausses, tout ce que le client décide est faux.** C'est un constat P0 systématique quand il se présente, et il précède toute recommandation d'optimisation.

## 28. Contenu et pages de service

```
[ ] Page « à propos » : raconte-t-elle quelque chose de vérifiable ?
[ ] Politique de retour : lisible, trouvable, sans ambiguïté ?
[ ] Livraison : délais et zones clairement indiqués ?
[ ] Contact : moyen réel de joindre quelqu'un ?
[ ] Mentions légales et CGV présentes ?
[ ] Blog : maintenu ou abandonné depuis deux ans ?
```

## 29. Cohérence globale

```
[ ] Le message est-il constant entre publicité, accueil, collection et produit ?
[ ] La promesse de livraison est-elle la même partout ?
[ ] Le ton est-il cohérent ?
[ ] Les prix et promotions sont-ils cohérents entre les pages ?
[ ] Y a-t-il des contenus manifestement obsolètes ?
```
**Le test de cohérence de la promesse :** relève la promesse de livraison sur le bandeau, la page produit, le panier et la page de politique. Si les quatre diffèrent, tu as un constat solide, facile à prouver par quatre captures, et immédiatement compréhensible par le client.

---

## Ordre d'exécution recommandé

| Passe | Contenu | Durée |
|---|---|---|
| 1 | Parcours acheteur mobile enregistré, sans notes techniques | 30 min |
| 2 | Données analytics, entonnoir | 1 h |
| 3 | Zones 9 à 19 (page produit) — la plus rentable | 2 h |
| 4 | Zones 20 et 21 (panier, checkout) | 1 h |
| 5 | Zones 1 à 8 (accueil, navigation, collection) | 1 h 30 |
| 6 | Zones 22 à 27 (technique) | 2 h |
| 7 | Zones 28 et 29 (contenu, cohérence) | 45 min |
| 8 | Concurrence | 2 h |
| 9 | Notation, priorisation, rédaction | 4–6 h |

La page produit est traitée en troisième position, immédiatement après les données : c'est là que se joue la conversion, et c'est là que tu dois avoir le plus d'énergie disponible.
