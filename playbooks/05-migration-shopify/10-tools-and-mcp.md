# 10 — Tools & MCP

---

## A. Choisir l'outil selon la plateforme source

| Source | Outil recommandé | Pourquoi |
|---|---|---|
| **Square, Wix, Etsy, Squarespace** | Shopify Store Migration (app native) | Connecteurs natifs, transfert propre |
| **BigCommerce** | Store Migration ou Matrixify | Selon la complexité |
| **WooCommerce** | **Matrixify** (connecteur WordPress) | Traite la majorité des boutiques directement |
| **Magento, Salesforce Commerce Cloud** | Matrixify ou migration assistée | Schémas très divergents |
| **PrestaShop, plateforme sur mesure** | Export CSV + transformation manuelle | Aucun connecteur fiable |

**Matrixify est l'outil de référence des migrations sérieuses.** Au-delà des produits, clients, collections, articles, pages et historique de commandes, il prend en charge les metafields, les metaobjects, les commandes brouillons, les cartes cadeaux et les avoirs — c'est ce qui le distingue des exports CSV natifs.

**Les redirections s'importent en masse** dans le gestionnaire natif de Shopify, via CSV. C'est le type de donnée le plus important de toute la migration.

---

## B. Ce qu'aucun outil ne fait

C'est ici que se trouve ton travail, et donc ta valeur :

| Tâche | Automatisable ? |
|---|---|
| Transférer des produits | ✅ Outil |
| Décider quoi faire des produits à 4 attributs | ❌ **Toi** |
| Transférer des clients | ✅ Outil |
| Vérifier que le consentement marketing est exact | ❌ **Toi** |
| Générer une carte de redirections | 🟡 Partiellement |
| Trouver les URL indexées mais absentes du sitemap | ❌ **Toi** |
| Nettoyer les shortcodes des descriptions | 🟡 Script |
| Décider quel contenu un shortcode portait | ❌ **Toi** |
| Configurer taxes et livraison | ❌ **Toi** |
| Identifier l'écart fonctionnel | ❌ **Toi** |
| Prouver que rien n'a été perdu | ❌ **Toi** |
| Choisir le moment de la bascule | ❌ **Toi** |
| Gérer un incident le jour J | ❌ **Toi** |

Un client qui compare ton devis au prix d'un outil de migration compare deux choses différentes. Ce tableau est l'argument qui l'explique — montre-le.

---

## C. La boîte à outils complète

| Outil | Usage |
|---|---|
| **Screaming Frog** (ou équivalent) | Crawler la source, exporter toutes les URL |
| **Google Search Console** | URL indexées, couverture, suivi post-bascule |
| **Google Analytics** | Trafic par page → priorisation des redirections |
| **Matrixify / Store Migration** | Transfert des données |
| **Python + pandas** (ou tableur) | Transformation, contrôles, comparaisons |
| **curl** | Test en masse des redirections |
| **Shopify CLI** | Thème, `theme check`, `theme console` |
| **Dev MCP** | Vérifier les limites de la plateforme et les objets Liquid |
| **Claude Code** | Analyse, transformation, contrôles, rédaction |
| **whatsmydns** ou équivalent | Vérifier la propagation DNS depuis plusieurs régions |
| **Rich Results Test** | Valider les données structurées |

---

## D. Le Dev MCP en Phase 5

Usage unique mais décisif : **vérifier les limites de la plateforme avant de promettre une correspondance.**

Une affirmation fausse sur ce que Shopify sait faire coûte, dans cette phase, des semaines de travail. Exemples de questions à lui poser systématiquement :

- Quelle est la limite d'options par produit ? De variantes ?
- Quels types de metafields existent, et lesquels acceptent une source dynamique ?
- Comment sont structurés les objets `product`, `variant`, `customer`, `order` ?
- Que permet Shopify Markets en matière de langues et de devises ?
- Ce filtre ou cet objet Liquid existe-t-il ?

**Deux limites à connaître par cœur**, parce qu'elles déterminent tout le mapping produit :
- **3 options par produit** — inchangé
- **2 048 variantes par produit** depuis le 15 octobre 2025, contre 100 auparavant

Ce que le Dev MCP ne fait pas : accéder à la source, transférer des données, mesurer quoi que ce soit, décider.

---

## E. Le REPL après import

```bash
shopify theme console --url /products/un-produit-migre
```

```liquid
{{ product.metafields | json }}          # les metafields sont-ils bien arrivés ?
{{ product.options_with_values | json }} # la structure d'options est-elle correcte ?
{{ product.variants | size }}            # le compte des variantes
```

Contrôle rapide et concret sur un échantillon de produits migrés, avant de lancer les contrôles en masse. Trente secondes qui évitent de découvrir un mapping erroné après l'import complet.

---

## F. Sécurité

Une migration donne accès à beaucoup plus de données que les autres phases : base de données, clients, commandes, historique de transactions. Les règles :

1. **Accès minimal, et temporaire.** Demande ce dont tu as besoin, pour la durée du projet.
2. **Les exports contiennent des données personnelles.** Stockage chiffré, jamais sur un service tiers non maîtrisé, jamais dans un dépôt Git.
3. **`.gitignore` strict** sur `03_data/` — les exports ne sont jamais versionnés.
4. **Suppression en fin de mission**, annoncée au client par écrit. C'est une obligation réglementaire dans beaucoup de juridictions, et c'est un argument de sérieux.
5. **Aucun serveur MCP non officiel** sur un store client.
6. **Les identifiants ne circulent pas par e-mail.** Gestionnaire de mots de passe partagé, ou canal chiffré.
7. **Révocation des accès** à la fin, rappelée au client.

Message de clôture :

> La mission est terminée. Trois points de sécurité :
>
> 1. J'ai supprimé de mes systèmes tous les exports contenant vos données clients et vos commandes. Confirmation écrite ci-jointe.
> 2. Vous pouvez révoquer mes accès à {{liste}} — je n'en ai plus besoin.
> 3. Conservez votre sauvegarde de l'ancienne boutique et son hébergement jusqu'au {{date}}, comme prévu. Après cette date, vous pourrez résilier.

Peu de prestataires envoient ce message. Il coûte cinq minutes et il marque durablement.
