# 04 — Migration Strategy

Les quinze étapes. L'ordre n'est pas indicatif : chaque étape produit ce dont la suivante a besoin.

```
AUDIT → MAPPING → BACKUP → EXPORT → TRANSFORMATION → IMPORT → VALIDATION
→ SEO → REDIRECTIONS → THÈME → INTÉGRATIONS → TESTS → LANCEMENT
→ SURVEILLANCE → SUIVI
```

---

## 1. AUDIT

Voir `00-discovery-and-inventory.md`. Produit : volumétrie datée, crawl complet des URL, écart fonctionnel, estimation.

**Facturé séparément, déduit du projet.** Ne chiffre jamais une migration avant cette étape.

---

## 2. MAPPING

Voir `03-migration-matrix.md`. Produit : la matrice, validée **par écrit** par le client.

Livrable de fin d'étape : `migration-mapping.md` signé. Tant qu'il ne l'est pas, tu n'exportes rien.

---

## 3. BACKUP

```
[ ] Export complet de la base de données source
[ ] Archive des fichiers (dont /wp-content/uploads pour WooCommerce)
[ ] Export CSV natif : produits, clients, commandes
[ ] Copie du sitemap XML
[ ] Export du crawl complet
[ ] Capture de la configuration : livraison, taxes, paiements
[ ] Captures d'écran des pages clés (référence visuelle)
[ ] Archive datée, stockée hors du serveur source
[ ] **Restauration testée** sur un environnement de test
```

La dernière ligne fait la différence entre une sauvegarde et un fichier. Une sauvegarde non testée n'est pas une sauvegarde.

Tout part dans `03_data/source-export/`, qui devient **intouchable**. Aucune transformation ne s'y fait jamais.

---

## 4. EXPORT

Une seule fois, proprement. Puis on archive.

```
[ ] Produits avec toutes leurs métadonnées
[ ] Variantes complètes
[ ] Catégories avec hiérarchie
[ ] Clients avec adresses et consentement marketing
[ ] Commandes sur la période retenue
[ ] Pages et articles
[ ] Médias, ou leur inventaire d'URL
[ ] Redirections existantes
[ ] Métadonnées SEO (extension SEO de la source)
```

**Note la date et l'heure de l'export.** Toute commande passée après ce moment devra être traitée séparément lors de la bascule — c'est le « delta » de la dernière étape.

---

## 5. TRANSFORMATION

L'étape la plus longue, et celle où Claude Code apporte le plus.

```
[ ] Nettoyage HTML des descriptions (shortcodes, balisage de builder, CSS inline)
[ ] Réécriture des chemins d'images vers les nouvelles URL
[ ] Normalisation des SKU, résolution des doublons
[ ] Conversion des attributs en options (max 3) ou en metafields
[ ] Traitement des produits à plus de 3 attributs, selon la stratégie retenue
[ ] Normalisation des e-mails et des téléphones
[ ] Conversion des codes pays en ISO
[ ] Correspondance des statuts de commande
[ ] Génération des handles Shopify
[ ] Génération de la carte de redirections
```

Sortie dans `03_data/transformed/`. **Chaque script de transformation est versionné** : tu devras probablement le rejouer.

**Le journal des anomalies.** Chaque cas non traité automatiquement va dans un fichier dédié, avec son identifiant source et le motif. Ce fichier est un livrable : il devient la liste des décisions à faire prendre au client.

---

## 6. IMPORT

**Toujours dans cet ordre**, chaque étape validée avant la suivante :

```
1. Definitions de metafields          (les contenants avant le contenu)
2. Collections                        (avant les produits, pour l'affectation)
3. Produits + variantes
4. Images                             (si séparé)
5. Metafields produits
6. Clients
7. Commandes                          (après les clients, pour le rattachement)
8. Pages
9. Articles de blog
10. Redirections
```

Inverser l'ordre 6 et 7 casse le rattachement des commandes aux clients. Inverser 2 et 3 laisse les produits orphelins.

**Import par lots.** Sur un catalogue important, importe d'abord 50 produits, valide, puis lance le reste. Un import complet raté sur un mapping erroné est très long à défaire.

---

## 7. VALIDATION

Voir `05-data-validation.md`. Chiffrée, jamais visuelle.

**Rien ne continue tant que la validation n'est pas passée.** Une anomalie détectée ici coûte une heure ; découverte après la bascule, elle coûte une journée et de la crédibilité.

---

## 8. SEO MIGRATION

Voir `06-seo-migration.md`. Métadonnées, données structurées, hiérarchie de titres, sitemap, robots.

---

## 9. REDIRECTIONS

```
[ ] Carte complète : chaque URL indexée a une destination
[ ] Aucune chaîne de redirection (A→B→C interdit, faire A→C)
[ ] Aucune boucle
[ ] Import dans le gestionnaire de redirections Shopify (CSV en masse)
[ ] Test sur un échantillon aléatoire de 50 URL
[ ] Test des 20 URL à plus fort trafic, une par une
[ ] Page 404 personnalisée, avec recherche et liens utiles
```

Le gestionnaire natif de Shopify accepte un import CSV en masse. C'est la donnée la plus importante de toute la migration : une redirection manquante est du trafic perdu, définitivement.

---

## 10. THÈME

Le thème n'est **pas** une reproduction de l'ancien site. C'est une reconstruction sur Shopify.

```
[ ] Thème choisi et installé
[ ] Charte appliquée : couleurs, typographies, logo
[ ] Page d'accueil, collection, produit, panier configurées
[ ] Menus reconstruits
[ ] Pages de politique (CGV, retours, confidentialité)
[ ] Composants sur mesure pour les fonctionnalités perdues (→ Phase 4)
[ ] Responsive vérifié sur appareil réel
[ ] Performance mesurée (→ Phase 1)
```

**Cadre-le tôt :** « votre site ne sera pas identique, il sera équivalent en fonction et meilleur en performance ». Un client qui attend une copie conforme sera déçu quoi que tu fasses.

---

## 11. INTÉGRATIONS

```
[ ] Applications Shopify installées et configurées
[ ] Livraison : zones, tarifs, transporteurs
[ ] Taxes par région
[ ] Moyens de paiement, avec transaction test réelle
[ ] E-mails transactionnels personnalisés
[ ] Outil d'e-mailing reconnecté, listes et consentements vérifiés
[ ] Comptabilité / ERP / logistique
[ ] Avis clients migrés si l'app le permet
[ ] Suivi analytique : GA4, pixels, via Web Pixels
[ ] Search Console configurée sur le nouveau domaine
```

**La Search Console se configure avant la bascule**, pas après. Tu veux voir les erreurs d'indexation dès la première heure.

---

## 12. TESTS

```
[ ] Validation des données : passée
[ ] Parcours d'achat complet, avec un paiement réel puis remboursé
[ ] Commande test sur CHAQUE zone de livraison
[ ] Création de compte, connexion, réinitialisation de mot de passe
[ ] Recherche, filtres, tri
[ ] Formulaire de contact
[ ] Mobile réel
[ ] Redirections testées par échantillon
[ ] **Période de test client : 3 à 5 jours**
```

La dernière ligne est non négociable. Le marchand connaît son catalogue mieux que toi : il repérera en vingt minutes des anomalies invisibles pour un tiers.

---

## 13. LANCEMENT

Voir `08-launch-checklist.md`. Résumé de la fenêtre :

```
J-7   Gel des modifications sur la source
J-1   E-mail d'annonce aux clients (mots de passe)
J-1   Export delta des commandes récentes
J     TTL des DNS abaissé, plusieurs heures à l'avance
J     Retrait du mot de passe de la boutique Shopify
J     Bascule DNS
J     Vérification de la propagation
J     Redirections actives et testées
J     Sitemap soumis à la Search Console
J     E-mail de réinitialisation des mots de passe
J     Première commande test sur la production
```

**Jamais un vendredi. Jamais avant un pic. Jamais sans être disponible les 48 h suivantes.**

---

## 14. SURVEILLANCE — 48 heures

```
[ ] Commandes : le flux reprend-il normalement ?
[ ] Erreurs 404 dans la Search Console et les logs
[ ] Redirections : contrôle par échantillon
[ ] Trafic en temps réel
[ ] Volume de demandes au support
[ ] Console navigateur
[ ] Réception des e-mails transactionnels
[ ] Disponibilité personnelle confirmée
```

---

## 15. SUIVI — 4 à 8 semaines

| Moment | Action |
|---|---|
| J+3 | Rapport : commandes, 404, redirections corrigées |
| J+7 | Search Console : indexation, couverture, erreurs |
| J+14 | Trafic organique. **Le creux commence** — expliqué à l'avance |
| J+30 | `post-launch-report.md` complet |
| J+60 | Comparaison à la référence pré-migration |
| J+90 | Récupération attendue. Ouverture des upsells |

**Le creux entre la 2ᵉ et la 6ᵉ semaine est normal** : Google recrawle et réindexe l'ensemble du site. La récupération intervient généralement autour du 3ᵉ mois. Annonce-le **avant la bascule**, et envoie un relevé hebdomadaire pendant cette période. Un client qui subit la baisse sans visibilité conclura que la migration a échoué — même si elle est parfaite.

---

## Le calendrier type — migration standard

| Semaine | Contenu |
|---|---|
| 1 | Audit, inventaire, crawl, écart fonctionnel |
| 2 | Matrice validée, sauvegardes, exports |
| 2–3 | Transformation, definitions de metafields, imports par lots |
| 3 | Validation chiffrée, corrections |
| 3–4 | Thème, configuration, intégrations |
| 4 | SEO, redirections, tests |
| 4–5 | **Période de test client** |
| 5 | Corrections, préparation de la bascule |
| 5 | **Lancement**, surveillance 48 h |
| 6–9 | Suivi hebdomadaire |

Prévois **20 % de marge**. Il y aura une donnée non prévue, une décision client en attente, ou un accès manquant. Il y en a toujours.
