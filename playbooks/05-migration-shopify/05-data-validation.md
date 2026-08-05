# 05 — Data Validation

**La validation est chiffrée, jamais visuelle.** « Ça a l'air bon » n'est pas un contrôle : c'est une impression, et elle est fausse dès que le catalogue dépasse cent produits.

Ce fichier est aussi ton meilleur argument commercial : très peu de prestataires livrent une preuve chiffrée que rien n'a été perdu.

---

## A. Le principe

Pour chaque type de donnée, trois niveaux :

| Niveau | Question | Méthode |
|---|---|---|
| **Comptage** | Combien ? | Nombre source = nombre cible |
| **Somme** | Total ? | Somme des prix, des stocks, des montants |
| **Échantillon** | Fidèle ? | 30 à 50 enregistrements aléatoires, comparés champ à champ |

Les trois sont nécessaires. Un comptage juste avec des sommes fausses signale un problème de mapping de champ. Des sommes justes avec un échantillon faux signale un décalage de lignes.

---

## B. Produits

```
[ ] Nombre de produits publiés : source = cible
[ ] Nombre de produits brouillon / privés : traités selon la décision
[ ] Nombre de variantes total : source = cible
[ ] Nombre de SKU uniques : source = cible
[ ] Zéro SKU perdu (comparaison de listes, pas de comptage)
[ ] Zéro SKU en double dans la cible
[ ] Somme des prix : écart < 0,01 % (arrondis)
[ ] Somme des stocks : source = cible
[ ] Nombre d'images total : source = cible
[ ] Zéro produit sans image, sauf ceux qui n'en avaient pas
[ ] Zéro image pointant encore vers l'ancien domaine
[ ] Nombre de produits par collection : source = cible
[ ] Échantillon de 50 produits : titre, prix, SKU, stock, images, description
```

### La comparaison de SKU

Le contrôle le plus important du lot. Un comptage identique peut masquer une substitution.

```bash
# Extraire, trier, comparer
cut -d',' -f4 source-products.csv | sort -u > sku-source.txt
cut -d',' -f14 shopify-products.csv | sort -u > sku-cible.txt

# Ce qui a disparu
comm -23 sku-source.txt sku-cible.txt

# Ce qui est apparu de nulle part
comm -13 sku-source.txt sku-cible.txt
```

Les deux commandes doivent renvoyer un résultat vide. Sinon, tu as la liste exacte à traiter.

### Les images cassées

```bash
grep -c "ancien-domaine.com" shopify-products.csv
```

Doit renvoyer 0. Sinon, des images pointent encore vers l'ancien hébergement et **mourront le jour où il sera coupé** — souvent plusieurs semaines après la bascule, quand personne ne surveille plus.

---

## C. Clients

```
[ ] Nombre de clients : source = cible
[ ] Zéro doublon d'e-mail
[ ] Nombre d'adresses : source = cible
[ ] Nombre de clients consentants au marketing : **exactement identique**
[ ] Codes pays valides sur 100 % des adresses
[ ] Échantillon de 30 clients : nom, e-mail, téléphone, adresses, consentement
```

**Le consentement marketing se contrôle au nombre exact.** Une migration ne blanchit pas un consentement : un client non consentant à la source doit rester non consentant. Un écart, même faible, expose à un risque réglementaire.

---

## D. Commandes

```
[ ] Nombre de commandes sur la période : source = cible
[ ] Somme des montants totaux : écart < 0,1 %
[ ] Somme des taxes : écart < 0,1 %
[ ] Somme des frais de livraison : écart < 0,1 %
[ ] Répartition par statut : source = cible
[ ] Taux de rattachement client : > 95 %
[ ] Zéro commande sans ligne de produit
[ ] Numéros de commande uniques
[ ] Échantillon de 30 commandes : total, lignes, client, adresse, date, statut
```

**Le taux de rattachement client** est celui qui révèle les problèmes de normalisation d'e-mails. Un rattachement à 80 % signale des e-mails avec des majuscules, des espaces, ou des variantes non normalisées à la source.

---

## E. Contenu

```
[ ] Nombre de pages : source = cible
[ ] Nombre d'articles : source = cible
[ ] Zéro page vide
[ ] Zéro image cassée dans le contenu
[ ] Zéro shortcode résiduel ([...] dans le HTML)
[ ] Zéro balisage de constructeur de pages résiduel
[ ] Dates de publication préservées
[ ] Échantillon de 20 pages : rendu visuel comparé à la source
```

```bash
# Shortcodes WordPress oubliés
grep -oE "\[[a-z_]+[^]]*\]" shopify-pages.csv | sort | uniq -c | sort -rn
```

Les shortcodes non nettoyés s'affichent tels quels sur la page publique. C'est visible, laid, et immédiatement reproché.

---

## F. URL et redirections

```
[ ] Nombre de redirections = nombre d'URL indexées (moins celles volontairement
    abandonnées, listées et justifiées)
[ ] Zéro chaîne de redirection
[ ] Zéro boucle
[ ] Zéro redirection vers une page 404
[ ] Les 20 URL à plus fort trafic testées une par une
[ ] Échantillon aléatoire de 50 URL testé
```

```bash
# Test en masse d'un échantillon
while read url; do
  code=$(curl -s -o /dev/null -w "%{http_code}" -L "$url")
  final=$(curl -s -o /dev/null -w "%{url_effective}" -L "$url")
  echo "$url,$code,$final"
done < echantillon-urls.txt > resultats-redirections.csv
```

Chaque ligne doit finir en **200**, sur une URL pertinente. Un 200 sur la page d'accueil pour une ancienne URL produit est techniquement un succès et commercialement un échec : le visiteur ne trouve pas ce qu'il cherchait.

---

## G. Configuration

```
[ ] Commande test réussie sur CHAQUE zone de livraison
[ ] Taxes correctes sur chaque zone testée
[ ] Chaque moyen de paiement testé par une transaction réelle
[ ] E-mails transactionnels reçus et lisibles
[ ] Pages de politique présentes et à jour
[ ] Devises et formats de prix corrects par marché
```

**Test avec paiement réel, puis remboursement.** Une transaction en mode test ne révèle pas tous les problèmes de configuration.

---

## H. Le rapport de validation

C'est un livrable client, et l'un des plus valorisants de toute la prestation.

```markdown
# Rapport de validation — {{client}} — {{date}}

## Méthode
Comptages, sommes et échantillons aléatoires, comparés entre l'export source du
{{date}} et la boutique Shopify au {{date}}.

## Résultats

| Donnée | Source | Shopify | Écart | Statut |
|---|---|---|---|---|
| Produits publiés | 1 247 | 1 247 | 0 | ✅ |
| Variantes | 4 891 | 4 891 | 0 | ✅ |
| SKU uniques | 4 891 | 4 891 | 0 | ✅ |
| Somme des prix | 187 432,50 € | 187 432,50 € | 0 | ✅ |
| Somme des stocks | 38 291 | 38 291 | 0 | ✅ |
| Images | 9 883 | 9 871 | −12 | 🟡 |
| Clients | 8 432 | 8 429 | −3 | 🟡 |
| Consentants marketing | 3 118 | 3 118 | 0 | ✅ |
| Commandes (24 mois) | 12 908 | 12 908 | 0 | ✅ |
| Somme des commandes | 1 483 921,12 € | 1 483 921,12 € | 0 | ✅ |
| Pages | 34 | 34 | 0 | ✅ |
| Articles | 218 | 218 | 0 | ✅ |
| URL redirigées | 14 302 | 14 302 | 0 | ✅ |

## Écarts, expliqués un par un
**Images (−12)** : 12 fichiers étaient déjà absents du serveur source
(liens morts antérieurs à la migration). Liste jointe en annexe A. Ils devront
être ré-uploadés, ou les produits concernés utiliseront leur image suivante.

**Clients (−3)** : 3 comptes partageaient une adresse e-mail identique à un
autre compte. Shopify impose l'unicité de l'e-mail. Les comptes ont été
fusionnés, l'historique de commandes est conservé. Détail en annexe B.

## Contrôles par échantillon
50 produits, 30 clients, 30 commandes vérifiés champ à champ.
Anomalies : 0.

## Contrôles fonctionnels
{{liste des tests passés}}

## Ce qui reste à faire de votre côté
{{...}}
```

**La section « écarts expliqués un par un » est ce qui distingue ce rapport.** Un écart annoncé et expliqué rassure ; un écart découvert par le client trois semaines plus tard détruit la confiance dans l'ensemble du travail.

Ne masque jamais un écart. Cherche-le, comprends-le, écris-le.
