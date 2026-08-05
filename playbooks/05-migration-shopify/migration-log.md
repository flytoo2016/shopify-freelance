# Journal de migration — {{client}}

À copier dans `clients/{{client}}/00_brief/`. Rempli au fil du projet.

---

## Identité

- Boutique source : `_____` · Plateforme : `_____` `_____`
- Destination : `_____.myshopify.com` · Plan : `_____`
- Hébergeur source : `_____` · Accès BDD : oui / non
- Registrar du domaine : `_____` · **Accès DNS obtenu le** : `_____`
- Formule vendue : `_____` · Prix : `_____` · Échéancier : `_____`
- Date de bascule visée : `_____` (jamais un vendredi, jamais avant un pic)
- Décideur bascule : `_____` · Joignable le jour J : `_____`

## Accès

| Accès | Reçu le | Limite |
|---|---|---|
| Admin source | | |
| Base de données / FTP | | |
| DNS / registrar | | |
| Search Console | | |
| Google Analytics | | |
| Shopify collaborateur | | |

---

## Chaîne de comptage

| Entité | Source | Export | Transformé | Importé | Écart | Cause de l'écart |
|---|---|---|---|---|---|---|
| Produits publiés | | | | | | |
| Produits brouillon | | | | | | |
| Variantes | | | | | | |
| Collections | | | | | | |
| Images | | | | | | |
| Clients | | | | | | |
| Adresses | | | | | | |
| Commandes | | | | | | |
| Pages | | | | | | |
| Articles | | | | | | |
| Metafields | | | | | | |

**Écarts inexpliqués : `___`** → si > 0, on ne bascule pas.

---

## Registre des risques

| # | Risque | Probabilité | Impact | Atténuation | Responsable | Statut |
|---|---|---|---|---|---|---|
| R1 | Perte de trafic organique | Élevée | Élevé | Redirections exhaustives testées, métadonnées migrées, surveillance 30 j | Moi | |
| R2 | URL non redirigeables (préfixe réservé) | {{...}} | Élevé | Détection en discovery, alternative documentée | Moi | |
| R3 | Données manquantes après import | Moyenne | Élevé | Comptage à 4 niveaux, échantillon de 30 | Moi | |
| R4 | Erreurs de taxe ou de livraison | Moyenne | Élevé | Commande de test réelle sur 3 scénarios | Moi | |
| R5 | Intégration critique non reproductible | {{...}} | {{...}} | Recensée en discovery, décision client | Client | |
| R6 | Clients ne pouvant plus se connecter | **Certaine** | Moyen | E-mail d'invitation au lancement, message d'accueil | Client | |
| R7 | Indexation bloquée au lancement | Faible | **Très élevé** | Point bloquant de la checklist de lancement | Moi | |
| R8 | Indisponibilité pendant la bascule | Faible | Élevé | Fenêtre creuse, procédure écrite, retour arrière prêt | Moi | |
| R9 | Décideur injoignable le jour J | {{...}} | Élevé | Confirmation écrite 48 h avant | Client | |
| R10 | Source résiliée trop tôt | Moyenne | **Très élevé** | Conserver la source active 60 jours minimum après bascule | Client | |

Le risque R10 mérite une attention particulière : un client qui résilie son hébergement WooCommerce le lendemain de la bascule supprime ta seule possibilité de retour arrière et ta seule source de vérité. **Fais-le écrire dans le plan.**

---

## Redirections

| Indicateur | Valeur |
|---|---|
| URL au crawl source | |
| URL indexées (Search Console) | |
| URL avec backlinks | |
| Redirections mappées automatiquement | |
| Redirections décidées manuellement | |
| Redirections impossibles (préfixe réservé) | |
| Importées le | |
| Testées : nombre d'URL | |
| Échecs constatés | |

---

## Jalons

| Étape | Prévu | Réel | Validé par |
|---|---|---|---|
| Discovery livrée | | | |
| Matrice validée par écrit | | | |
| Sauvegarde source vérifiée | | | |
| Import lot 1 (20) | | | |
| Import lot 2 (100) | | | |
| Import complet | | | |
| Validation chiffrée | | | |
| Redirections importées | | | |
| Thème configuré | | | |
| Commande de test réelle | | | |
| Quality Gate (12 conditions) | | | |
| Revue client store de test | | | |
| **Bascule** | | | |
| Vérification H+4 | | | |
| Rapport J+7 | | | |
| Rapport J+30 | | | |

---

## Suivi post-lancement

| Indicateur | Avant | J+7 | J+30 | J+90 |
|---|---|---|---|---|
| Sessions organiques | | | | |
| Pages indexées (Search Console) | | | | |
| Erreurs 404 | | | | |
| Commandes / jour | | | | |
| Taux de conversion | | | | |

**Note de lecture à donner au client :** une baisse de trafic organique dans les deux à quatre premières semaines est fréquente, même sur une migration correcte — les moteurs doivent recrawler et réévaluer. Ce qui compte est la trajectoire à 60–90 jours. Écris-le avant la bascule, pas au moment où le client s'inquiète.

---

## Temps passé

| Étape | Estimé | Réel |
|---|---|---|
| Discovery et audit | | |
| Crawl et analyse SEO | | |
| Matrice de correspondance | | |
| Export et transformation | | |
| Imports | | |
| Validation | | |
| Redirections | | |
| Thème et configuration | | |
| Tests | | |
| Bascule | | |
| Suivi | | |
| Échanges client | | |
| **Total** | | |

Taux horaire effectif : `prix / total` = `_____ €/h`

---

## Retour d'expérience

- Ce que l'export source n'a pas fourni :
- Ce que j'ai découvert trop tard (→ à remonter dans la discovery) :
- Les cas limites qui ont causé des écarts :
- Ce qui a pris beaucoup plus de temps que prévu :
- Ce que j'automatiserais la prochaine fois :
- Perte réelle constatée, par entité :
- Évolution du trafic organique à J+90 :
- Upsell proposé / accepté :
- Ce que j'ajuste dans mon pricing :
