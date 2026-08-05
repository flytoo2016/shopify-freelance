# Matrice de correspondance — modèle

À copier dans `clients/{{client}}/02_mapping/migration-mapping.md`.
**Ce document est validé par écrit avant tout transfert de données.**

---

# Matrice de migration — {{Client}} — {{Date}}

Source : {{plateforme}} {{version}} · Destination : Shopify {{plan}}

---

## ⚠️ CE QUI NE SERA PAS MIGRÉ

*Placé en tête volontairement. Une perte annoncée est acceptée ; découverte après coup, elle devient une faute.*

| Élément | Motif | Alternative |
|---|---|---|
| Mots de passe clients | Techniquement impossible — ils sont hachés à la source. Vos clients devront réinitialiser leur mot de passe à leur première connexion | E-mail d'invitation à la connexion, à envoyer au lancement |
| | | |
| | | |

---

## Inventaire de la source

| Entité | Volume compté | Date du comptage | Méthode |
|---|---|---|---|
| Produits publiés | | | |
| Produits brouillon / privés | | | |
| Variantes | | | |
| Catégories | | | |
| Étiquettes | | | |
| Images produits | | | |
| Clients | | | |
| Commandes | | | |
| Pages | | | |
| Articles de blog | | | |
| Avis | | | |
| URL indexées (Search Console) | | | |
| URL au crawl | | | |

---

## Matrice

| # | Entité source | Volume | Destination Shopify | Transformation | Perte attendue | Validation |
|---|---|---|---|---|---|---|
| 1 | Produit | | Produit | | | Comptage |
| 2 | Variation de produit | | Variante | | | Comptage + échantillon |
| 3 | Attribut (variantes) | | Option produit | | | Échantillon |
| 4 | Attribut (informatif) | | Metafield `{{namespace.key}}` | | | Échantillon |
| 5 | Catégorie | | Collection {{manuelle/auto}} | | | Comptage |
| 6 | Sous-catégorie | | {{décision}} | | | |
| 7 | Étiquette | | {{tag / collection}} | | | |
| 8 | Image produit | | Image produit | | | Comptage + affichage |
| 9 | Client | | Client | | Mots de passe | Comptage |
| 10 | Adresse client | | Adresse | | | Échantillon |
| 11 | Commande | | Commande | | {{statuts non supportés}} | Comptage + montants |
| 12 | Page | | Page | | | Comptage |
| 13 | Article de blog | | Article | | | Comptage |
| 14 | Catégorie de blog | | Blog ou tag | | | |
| 15 | Avis | | {{app d'avis}} | | | Comptage |
| 16 | Titre SEO / méta-description | | Champs SEO Shopify | Extraction depuis les tables du plugin SEO — **absent de l'export produit standard** | | Échantillon |
| 17 | URL | | Redirections 301 | | {{préfixes réservés}} | Test de 50 URL |
| 18 | Coupon | | Code de réduction | | | Comptage |
| 19 | Zone de livraison | | Profil d'expédition | | Reconfiguration manuelle | Test de commande |
| 20 | Taxe | | Paramètres de taxe | | Reconfiguration manuelle | Test de commande |

---

## Décisions à trancher par le client

| # | Question | Option A | Option B | Ma recommandation | Décision | Date |
|---|---|---|---|---|---|---|
| 1 | Attribut « {{x}} » : option achetable ou information ? | Option | Metafield | | | |
| 2 | Catégories imbriquées : à plat ou hiérarchie simulée ? | | | | | |
| 3 | Produits dépassant les limites de variantes ({{n}} concernés) | Scinder | Réduire les options | | | |
| 4 | Avis : quelle application ? | | | | | |
| 5 | Commandes : sur quelle profondeur d'historique ? | | | | | |

---

## Structure d'URL — analyse

| Type source | Modèle source | Modèle Shopify | Redirection possible |
|---|---|---|---|
| Produit | `/product/{slug}` | `/products/{slug}` | ✅ |
| Catégorie | `/product-category/{slug}` | `/collections/{slug}` | ✅ |
| Étiquette | `/product-tag/{slug}` | `/collections/{slug}` | ✅ |
| Page | `/{slug}` | `/pages/{slug}` | ✅ |
| Article | `/{date}/{slug}` | `/blogs/{blog}/{slug}` | ✅ |
| | | | |

### ⚠️ Préfixes réservés détectés

Shopify refuse toute redirection dont l'origine commence par : `/products`, `/collections`, `/collections/all`, `/cart`, `/carts`, `/orders`, `/apps`, `/application`, `/shop`, `/services`.

| URL source concernée | Trafic | Alternative proposée |
|---|---|---|
| | | |

**Si ce tableau n'est pas vide, le client doit en être informé avant signature.**

---

## Extensions et intégrations

| Extension source | Rôle | Équivalent Shopify | Décision | Coût |
|---|---|---|---|---|
| | | | | |

---

## Validation

Validé par **{{nom}}** le **{{date}}**, par écrit.

Les volumes ci-dessus servent de référence pour la validation post-migration. Tout écart constaté sera expliqué avant la bascule.

Toute demande apparue après cette validation fera l'objet d'un devis séparé.

---

## Contrôle avant envoi au client

```
[ ] Tous les volumes sont COMPTÉS, aucun estimé
[ ] La section « ce qui ne sera pas migré » est en tête et complète
[ ] Les mots de passe clients y figurent explicitement
[ ] Chaque ligne de la matrice a une perte attendue renseignée
[ ] Chaque ligne a une méthode de validation
[ ] L'analyse d'URL est faite, préfixes réservés vérifiés
[ ] Les décisions client sont isolées et formulées en options
[ ] Aucune promesse de maintien des positions SEO
```
