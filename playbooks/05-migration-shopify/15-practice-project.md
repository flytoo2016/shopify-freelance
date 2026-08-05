# 15 — Practice Project

Tu ne t'entraînes pas sur la boutique d'un client. Tu montes un WooCommerce réaliste, tu le migres, et — c'est le point central de l'exercice — **tu mesures ce que tu as perdu**.

**Durée : 7 jours.** Plus long que les autres phases, parce qu'une migration est un projet, pas une tâche.

---

## Préparation

Il te faut un WooCommerce réel. Trois options, par ordre de fidélité :

1. **Hébergement mutualisé à quelques euros** + WordPress + WooCommerce. Le plus proche de la réalité, y compris les lenteurs et les surprises de configuration.
2. **Environnement local** (LocalWP, DDEV, Docker). Rapide, mais tu n'apprends pas les problèmes d'export sur hébergement contraint.
3. Un site de démonstration WooCommerce déjà peuplé, si tu en trouves un exploitable.

Puis un **development store** Shopify depuis ton Partner Dashboard.

---

## Jour 1 — Fabriquer une source réaliste

Un catalogue propre ne t'apprend rien. Fabrique les problèmes que tu rencontreras :

```
[ ] 150 à 300 produits, dont :
    [ ] des produits simples et des produits variables (2 et 3 attributs)
    [ ] au moins 5 produits avec plus de 100 variantes
    [ ] des produits sans image
    [ ] des produits avec des caractères accentués et des apostrophes dans le titre
    [ ] des SKU en double (volontairement)
    [ ] des produits en brouillon et des produits privés
    [ ] des produits avec des attributs personnalisés (matière, origine, garantie)
[ ] 15 à 25 catégories, dont des sous-catégories sur 3 niveaux
[ ] Des étiquettes (tags) en plus des catégories
[ ] 40 clients, dont certains avec plusieurs adresses
[ ] 80 commandes, avec des statuts variés
[ ] 10 pages (à propos, CGV, livraison, retours, contact)
[ ] 15 articles de blog, avec catégories et images à la une
[ ] Des avis produits
[ ] Des permaliens personnalisés sur quelques produits
[ ] Un plugin d'avis, un plugin SEO (Yoast ou Rank Math), un plugin de champs
    personnalisés
```

**Exercice imposé :** renseigne les métadonnées SEO (titre, description) via le plugin SEO sur au moins 30 produits. C'est là que se trouve la difficulté réelle de la migration SEO — ces données ne sont pas dans l'export produit standard, elles vivent dans les tables de métadonnées du plugin.

**Livrable :** `inventory.md` — les volumes exacts, comptés, pas estimés.

---

## Jour 2 — Auditer et crawler

Tu passes du côté prestataire. Tu ne dois plus te souvenir de ce que tu as créé.

```
[ ] Crawl complet du site avec Screaming Frog → export CSV
[ ] Recenser toutes les structures d'URL présentes :
    /product/... /product-category/... /product-tag/... /blog/... /?p=...
[ ] Compter les URL par type
[ ] Recenser les plugins et leur rôle
[ ] Identifier ce qui n'a pas d'équivalent Shopify
[ ] Vérifier : y a-t-il des URL commençant par un préfixe RÉSERVÉ par Shopify ?
    (/products, /collections, /cart, /orders, /apps, /shop, /services)
[ ] Exporter les données via les exports natifs WooCommerce
[ ] Compter ce qui sort de l'export et comparer à l'inventaire du jour 1
```

**Le moment d'apprentissage du jour 2 :** l'écart entre ce que tu as créé et ce que l'export produit. Il y en a toujours un. Note lequel — c'est exactement ce qui te fera perdre des données chez un client si tu ne le contrôles pas.

**Livrable :** `migration-discovery.md` complet.

---

## Jour 3 — La matrice de correspondance

```
[ ] Remplir migration-mapping.md pour chaque entité
[ ] Décider : attribut WooCommerce → option Shopify, ou metafield ?
[ ] Décider : catégorie → collection manuelle ou automatique ?
[ ] Décider : étiquettes → tags Shopify ou collections ?
[ ] Lister ce qui NE SERA PAS migré, avec le motif
[ ] Créer les définitions de metafields nécessaires dans le store Shopify
```

**Exercice imposé :** les produits à plus de 100 variantes. Vérifie les limites réelles de Shopify sur le nombre d'options et de variantes par produit, et écris ce que tu feras des produits qui dépassent. C'est un cas qui arrive en clientèle et qui n'a pas de solution automatique — il faut décider avec le marchand.

---

## Jour 4 — Migrer

```
[ ] Sauvegarde complète du WooCommerce, horodatée
[ ] Archiver les exports bruts dans exports/, ne plus jamais les modifier
[ ] Transformation sur des copies uniquement
[ ] Import du PREMIER LOT : 20 produits seulement
[ ] Validation du lot 1, champ par champ
[ ] Import du lot 2 : 100 produits
[ ] Validation
[ ] Import du reste
[ ] Clients, puis commandes, puis pages, puis articles
```

**Exercice imposé 1 :** utilise l'app **Store Migration** de Shopify sur une partie, et un outil tiers (Matrixify en version d'essai) sur une autre. Compare ce que chacun transfère réellement. Tu découvriras concrètement que l'app native couvre les produits et les clients, mais pas les commandes, les avis ni les menus.

**Exercice imposé 2 :** casse volontairement un import. Introduis 10 SKU en double, lance l'import, observe le comportement, puis nettoie. Tu dois avoir vu à quoi ressemble un import raté **avant** d'en rencontrer un chez un client.

---

## Jour 5 — Valider par les chiffres

```
[ ] Tableau de comptage : source / export / transformé / importé, pour les
    6 entités principales
[ ] Écarts expliqués, un par un — aucun écart inexpliqué ne passe
[ ] Échantillon de 30 produits vérifié champ par champ
[ ] Prix, stocks, SKU, poids
[ ] Toutes les images présentes et affichées
[ ] Variantes : nombre exact par produit sur l'échantillon
[ ] Metafields correctement remplis
[ ] Clients : adresses complètes
[ ] Commandes : montants, statuts, articles
```

**Le contrôle qui compte :** un écart de 3 produits sur 280 n'est pas « négligeable ». Trouve la cause. Les trois manquants sont presque toujours les cas limites — apostrophe dans le titre, SKU en double, produit privé — et ce sont exactement ceux qui se reproduiront à plus grande échelle chez un client.

---

## Jour 6 — SEO et redirections

Le jour le plus important des sept.

```
[ ] Construire le plan de redirections depuis le crawl du jour 2
[ ] Mapper /product/slug → /products/slug
[ ] Mapper /product-category/x/y → /collections/y
[ ] Traiter les URL sans correspondance directe : vers quoi ?
[ ] Vérifier qu'aucune origine ne tombe dans un préfixe réservé
[ ] Format CSV : chemins RELATIFS, colonnes « Redirect from » / « Redirect to »
[ ] Importer par lots de 1 000 via Contenu → Menus → Redirections d'URL
[ ] Tester 50 URL au hasard, en navigation privée
[ ] Migrer les métadonnées SEO (titre, description) sur les 30 produits qui
    en ont
[ ] Vérifier les données structurées produit
[ ] Vérifier le sitemap
```

**Exercice imposé :** crée délibérément une redirection dont l'origine commence par `/products`. Constate qu'elle est refusée ou ignorée. Comprends pourquoi. C'est la contrainte qui, chez un client venant de Magento ou de BigCommerce, peut rendre une partie du plan de redirections structurellement impossible — et il faut le détecter en discovery, pas la veille du lancement.

**Second exercice :** vérifie qu'une redirection ne se déclenche que si l'URL d'origine renvoie une 404. Elle ne peut pas prendre le pas sur une page qui existe. Ce comportement explique la moitié des « ma redirection ne marche pas ».

---

## Jour 7 — Bascule simulée et bilan

```
[ ] Quality Gate complet (12 conditions)
[ ] Commande de test réelle : payée, confirmée, e-mail reçu
[ ] Taxes et frais de port vérifiés sur 3 scénarios
[ ] Rédiger launch-checklist.md et rollback-plan.md
[ ] Simuler la bascule : retirer le mot de passe, vérifier l'indexabilité
[ ] Rédiger post-launch-report.md
```

### Le bilan — l'exercice central

Reprends `inventory.md` du jour 1 et compare **tout** :

| Question | Ce que ça t'apprend |
|---|---|
| Combien d'entités ai-je réellement perdues ? | Ton taux de perte réel, à annoncer honnêtement en clientèle |
| Quels types de données se sont mal transférés ? | Tes points de vigilance permanents |
| Quelles URL n'ont pas de redirection possible ? | La question à poser en discovery, systématiquement |
| Combien de temps chaque étape a-t-elle pris ? | La base de ton pricing |
| Qu'est-ce que l'export source n'a pas fourni ? | Ce qu'il faudra chercher en base de données chez un client |
| Qu'ai-je découvert trop tard ? | À déplacer dans ta phase de discovery |

La dernière ligne est la plus précieuse. Tout ce que tu as découvert au jour 5 et qui aurait dû être connu au jour 2 doit remonter dans ton questionnaire de discovery. C'est ainsi qu'une méthode devient fiable.

---

## Auto-évaluation

Tu es prêt pour une vraie migration si tu peux répondre oui à tout :

```
[ ] Je compte avant de migrer, et je compare à chaque étape
[ ] Je sais construire un plan de redirections depuis un crawl
[ ] Je connais les préfixes réservés par Shopify et je les vérifie en discovery
[ ] Je sais qu'une redirection ne se déclenche que sur une 404
[ ] Je sais où vivent les métadonnées SEO dans WooCommerce, et qu'elles ne sont
    pas dans l'export produit standard
[ ] Je sais ce que l'app Store Migration transfère et ce qu'elle ne transfère pas
[ ] J'ai déjà vu un import raté et je sais le nettoyer
[ ] Je sais dire qu'on ne peut PAS migrer les mots de passe clients
[ ] Je sais dire qu'on ne garantit pas le maintien des positions SEO
[ ] Je refuse de migrer et de refondre le design en même temps, et je sais
    expliquer pourquoi
[ ] J'écris un plan de retour arrière avant chaque bascule
[ ] Je ne bascule jamais un vendredi
```

---

## Les exercices suivants

1. **Recommence depuis une autre plateforme** — PrestaShop ou Magento en démonstration. Les structures d'URL et les modèles de données y sont différents, et c'est là que tu rencontreras le problème des préfixes réservés en vrai.
2. **Migre un catalogue de 5 000 produits générés.** À cette échelle, tout change : les délais d'import, la gestion des lots, la validation par échantillonnage.
3. **Chronomètre chaque étape** et construis ta grille de pricing à partir de tes propres chiffres, pas des miens.
4. **Fais l'exercice inverse** : prends un store Shopify et liste ce qui serait perdu en migrant ailleurs. Tu comprendras mieux ce qui est propre à Shopify, et tu répondras mieux aux clients hésitants.
5. **Écris ton propre script de génération de redirections** à partir d'un crawl. C'est l'outil qui te fera gagner le plus de temps sur toutes tes migrations suivantes — et il entre dans ta bibliothèque au même titre qu'un composant.

---

# PHASE 5 COMPLETE

Le système est complet : discovery, matrice de correspondance, stratégie, validation chiffrée, migration SEO, registre des risques, checklist de lancement, vente et entraînement.
