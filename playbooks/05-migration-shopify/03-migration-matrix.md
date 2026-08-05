# 03 — Migration Matrix

Le document central de la phase. Format imposé, sans exception :

**SOURCE → TRANSFORMATION → DESTINATION SHOPIFY → VALIDATION**

Chaque ligne répond à quatre questions : d'où vient la donnée, ce qu'on lui fait, où elle atterrit, et **comment on prouve qu'elle est arrivée intacte**. Une ligne sans colonne validation n'est pas une ligne de matrice — c'est un vœu.

> **La matrice est validée par le client avant tout transfert.** C'est le pendant, en Phase 5, de la spécification de composant de la Phase 4.

---

## A. Produits

| Source WooCommerce | Transformation | Destination Shopify | Validation |
|---|---|---|---|
| Produit simple | Direct | Produit à 1 variante | Comptage total |
| Produit variable | Attributs → options | Produit + variantes | Comptage variantes |
| Nom | Direct | `Title` | Échantillon 50 |
| Description longue | Nettoyage HTML, réécriture des chemins d'images | `Body (HTML)` | Contrôle visuel 20 |
| Description courte | Direct | Metafield `custom.short_description` | Présence |
| Slug | `/product/slug/` → `/products/slug` | `Handle` | **Carte de redirections** |
| Prix régulier | Direct | `Variant Price` | Somme totale |
| Prix promo | Prix promo → `Price`, régulier → `Compare At Price` | `Compare At Price` | Échantillon |
| SKU | Dédoublonnage préalable | `Variant SKU` | **Unicité, zéro perte** |
| Stock | Direct | `Variant Inventory Qty` | Somme totale |
| Poids | Conversion d'unité si nécessaire | `Variant Grams` | Échantillon |
| Dimensions | Aucun champ natif | Metafields | Présence |
| Images | Réhébergement, ordre conservé | `Image Src` + position | Comptage par produit |
| Texte alternatif | Direct | `Image Alt Text` | Échantillon |
| Catégories | → Collections manuelles | `Collection` | Comptage + appartenance |
| Étiquettes | → Tags | `Tags` | Échantillon |
| Attributs non vendeurs | → Metafields | Metafields | Présence |
| Produits liés | Aucun équivalent natif | Metafield liste de références | Présence |
| Produit téléchargeable | ❌ Nécessite une application | App + fichier | Test de téléchargement |
| Produit groupé / lot | ❌ Nécessite une app ou un composant | Selon arbitrage | Test fonctionnel |
| Produit par abonnement | ⚠️ **Projet séparé** | App + ré-onboarding | Hors scope |

### Le point de blocage : 3 options maximum

Shopify autorise **3 options par produit** (et jusqu'à **2 048 variantes** depuis le 15 octobre 2025). WooCommerce autorise un nombre illimité d'attributs.

Pour chaque produit à plus de 3 attributs, une décision, chiffrée :

| Stratégie | Quand | Coût |
|---|---|---|
| Fusionner deux attributs (« Rouge / Coton ») | Attributs corrélés | Faible |
| Éclater en plusieurs produits | Attributs indépendants et peu nombreux | Moyen — impact SEO à gérer |
| Basculer un attribut en metafield | Attribut informatif, non vendeur | Faible |
| Application de personnalisation | Options réellement configurables | Abonnement mensuel |

**Compte ces produits pendant l'audit.** C'est souvent le poste de travail le plus lourd de toute la migration, et celui qu'on découvre le plus tard.

---

## B. Clients

| Source | Transformation | Destination | Validation |
|---|---|---|---|
| E-mail | Dédoublonnage, normalisation en minuscules | `Email` | Comptage, unicité |
| Prénom / Nom | Direct | `First/Last Name` | Échantillon |
| Téléphone | Format E.164 | `Phone` | Échantillon |
| Adresses | Une par ligne | Adresses client | Comptage |
| Pays / région | Codes ISO | Adresse | Contrôle des codes |
| Consentement marketing | **Direct, sans modification** | `Accepts Marketing` | Comptage exact |
| Notes internes | Direct | `Note` | Présence |
| Groupes / rôles | → Tags | `Tags` | Comptage par tag |
| **Mot de passe** | ❌ **Impossible** | Réinitialisation obligatoire | Test du flux de reset |
| Points de fidélité | Selon l'app choisie | App | ⚠️ Souvent perdu |

### Le consentement marketing

**Ne jamais l'élargir.** Un client non consentant à la source doit rester non consentant à l'arrivée. Une migration ne blanchit pas un consentement, et l'erreur expose à un risque réglementaire réel.

Contrôle de validation : le nombre de clients consentants doit être **exactement identique** avant et après. Pas « environ ».

### Les mots de passe

Impossible à migrer sur toutes les plateformes : hachage irréversible. Le plan minimal :

```
J-1   E-mail d'annonce : « votre boutique évolue, vous devrez définir un
      nouveau mot de passe à votre prochaine connexion »
J     E-mail de réinitialisation à tous les clients actifs
J     Message explicite sur la page de connexion
J     Équipe support briefée, réponse type préparée
J+7   Relance aux clients qui n'ont pas réinitialisé
```

Une part importante des clients qui reviennent buteront sur la connexion dans les premiers jours. C'est prévisible, donc préparable.

---

## C. Commandes

| Source | Transformation | Destination | Validation |
|---|---|---|---|
| Commande | Import en historique | Commande | Comptage |
| Numéro de commande | Préfixe pour éviter les collisions | `Name` | Unicité |
| Date | ISO 8601 | `Created At` | Échantillon |
| Lignes de commande | Rattachement par SKU | Line items | Somme des montants |
| Montant total | Direct | `Total` | **Somme totale** |
| Taxes | Direct | Tax lines | Somme totale |
| Livraison | Direct | Shipping lines | Somme totale |
| Statut | Correspondance de statuts | Financial + Fulfillment status | Comptage par statut |
| Remboursements | Direct | Refunds | Somme totale |
| Client | Rattachement par e-mail | Customer | Taux de rattachement |
| Adresse de livraison | Direct | Shipping address | Échantillon |

**Point d'attention.** Les commandes importées sont des données historiques : elles ne déclenchent aucune notification, aucun paiement, aucune préparation. Vérifie ce comportement sur ton outil d'import avant de lancer un volume important — un envoi massif de notifications à d'anciens clients est le genre d'incident qui met fin à une relation.

**Quel historique migrer ?** Question à poser au client. Douze à vingt-quatre mois suffisent généralement pour le service client et l'analyse. Migrer huit ans d'historique multiplie le temps de traitement pour une valeur d'usage faible.

---

## D. Contenu

| Source | Transformation | Destination | Validation |
|---|---|---|---|
| Page WordPress | Nettoyage HTML | Page Shopify | Comptage + rendu |
| Article de blog | Nettoyage HTML | Article | Comptage |
| Catégorie de blog | → Blog ou tags | Blog / Tags | Structure |
| Auteur | Direct | `Author` | Échantillon |
| Date de publication | Direct | `Published At` | Échantillon |
| Image à la une | Réhébergement | Image d'article | Présence |
| Commentaires | Selon la politique retenue | Commentaires ou app | Décision client |
| Médias | Réhébergement + réécriture des chemins | Fichiers | **Aucune image cassée** |
| Menus | Reconstruction manuelle | Navigation | Contrôle visuel |
| Widgets / blocs | ❌ Aucun équivalent | Sections du thème | Reconstruction |

**Le nettoyage HTML est le poste sous-estimé.** Les descriptions WooCommerce contiennent des shortcodes, du balisage de constructeur de pages, des chemins d'images absolus vers l'ancien domaine, et du CSS en ligne. Non nettoyés, ils produisent des pages cassées et des images mortes après la coupure de l'ancien hébergement.

Contrôle systématique après import :
```bash
# des images pointent-elles encore vers l'ancien domaine ?
grep -c "ancien-domaine.com" export-produits.csv
```

---

## E. URL et redirections

| Source | Destination | Priorité |
|---|---|---|
| `/product/slug/` | `/products/slug` | **P0** |
| `/product-category/cat/` | `/collections/cat` | **P0** |
| `/shop/` | `/collections/all` | **P0** |
| `/page-slug/` | `/pages/page-slug` | P1 |
| `/blog/annee/mois/slug/` | `/blogs/news/slug` | P1 |
| `/product-tag/tag/` | `/collections/...` ou vers la catégorie parente | P2 |
| `/?s=recherche` | `/search?q=recherche` | P2 |
| Pagination `/page/2/` | Page 1 de la collection | P2 |
| `/cart/`, `/checkout/`, `/my-account/` | Équivalents Shopify | P1 |

Traitement complet → `06-seo-migration.md`

---

## F. Configuration

| Source | Destination | Validation |
|---|---|---|
| Zones et tarifs de livraison | Paramètres de livraison | **Test de commande par zone** |
| Taux de taxe | Paramètres de taxes | **Test de commande par zone** |
| Devises | Shopify Markets | Affichage des prix |
| Passerelles de paiement | Shopify Payments + alternatives | **Transaction réelle test** |
| E-mails transactionnels | Notifications Shopify | Envoi de test |
| CGV, mentions légales | Politiques Shopify | Présence |
| Comptes utilisateurs | Personnel Shopify | Permissions |

**Les taxes et la livraison sont la première source d'erreur post-lancement.** Une commande sur une zone mal configurée facture le mauvais montant, et le marchand le découvre par son comptable. Teste une commande réelle sur **chaque** zone de livraison avant la bascule.

---

## G. Le gabarit de matrice

```markdown
# Matrice de correspondance — {{client}} — {{date}}

## Validation
Validée par {{nom}} le {{date}}, par écrit.
Tout élément non listé ici n'est pas migré.

## Produits
{{tableau}}
## Clients
{{tableau}}
## Commandes
{{tableau}}
## Contenu
{{tableau}}
## URL
{{renvoi vers redirect-map.csv}}
## Configuration
{{tableau}}

## Décisions prises par le client
| # | Sujet | Options présentées | Décision | Date |
|---|---|---|---|---|

## Ce qui ne sera PAS migré
| Élément | Raison | Alternative proposée | Accepté le |
|---|---|---|---|
```

La dernière section est celle que tu fais signer. **Un client qui a validé par écrit la liste de ce qui sera perdu ne fait pas de litige ; un client qui le découvre après la bascule en fait un.**
