# 09 — Claude Code Workflow (Migration)

---

## A. Le principe

> **Claude Code transforme et vérifie des données. Il ne décide jamais d'une bascule.**

Le risque propre à cette phase : un modèle produit volontiers un script de transformation qui **traite silencieusement les cas limites**. Une valeur inattendue devient une chaîne vide, un attribut en trop est ignoré, un doublon est écrasé. Le script tourne, ne remonte aucune erreur, et tu perds des données sans le savoir.

Trois règles :

1. **Aucun traitement silencieux.** Tout cas non prévu part dans un journal d'anomalies, jamais dans une valeur par défaut.
2. **Aucune transformation sans contrôle chiffré associé.** Le script qui transforme écrit aussi le contrôle qui vérifie.
3. **Le fichier source est intouchable.** Toute transformation lit `source-export/` et écrit dans `transformed/`.

---

## B. Les 10 prompts

### 1 — Analyse de l'export source

```
LECTURE SEULE. N'écris aucun fichier de sortie.

Voici un extrait de l'export {{plateforme}} : {{coller les 20 premières lignes}}
Fichier complet : {{chemin}} — {{n}} lignes

Analyse la structure et produis :
1. La liste des colonnes, avec le type de donnée réel observé
2. Les colonnes contenant des valeurs manquantes, et leur proportion
3. Les colonnes contenant des valeurs incohérentes ou inattendues
4. Les doublons potentiels (SKU, e-mail, slug)
5. Les valeurs qui poseront problème à l'import Shopify (caractères spéciaux,
   encodage, formats de date, séparateurs décimaux)

Ne propose aucune transformation à ce stade. Décris ce qui est là.
```

### 2 — Écart fonctionnel

```
LECTURE SEULE.

Extensions actives sur la source : {{liste avec descriptions}}
Volumétrie : {{inventaire}}

Pour chaque extension, détermine :
1. Ce qu'elle fait réellement en termes de données et de fonctionnalité
2. S'il existe un équivalent NATIF Shopify — vérifie avec le Dev MCP, ne suppose pas
3. Sinon, s'il existe une application, et son coût d'ordre de grandeur
4. Sinon, si un composant sur mesure peut le remplacer, et l'effort estimé
5. Sinon : marque ❌ PERDU, et propose l'alternative la plus proche

Signale spécifiquement :
- les produits à plus de 3 options (limite Shopify, non contournable nativement)
- les abonnements (projet séparé)
- tout ce qui exige une logique serveur

Format : le tableau de 00-discovery-and-inventory.md, section D.
Chaque ligne doit avoir un statut. Aucune case vide.
```

### 3 — Détection des blocages de catalogue

```
Analyse {{fichier produits}} et produis :

1. Nombre de produits par nombre d'attributs (1, 2, 3, 4+)
   → liste complète des produits à 4 attributs ou plus, avec leurs attributs
2. Nombre de produits par nombre de variantes
   → ceux dépassant 2 048 variantes
3. SKU en double : liste complète, avec les produits concernés
4. Produits sans SKU
5. Produits sans image
6. Produits sans prix, ou à prix nul
7. Slugs en double
8. Descriptions contenant des shortcodes ou du balisage de constructeur
9. Descriptions contenant des URL absolues vers l'ancien domaine

Pour chaque catégorie : le nombre, et le fichier CSV de la liste complète.
Ce sont les décisions que je dois faire prendre au client.
```

### 4 — Script de transformation

```
Écris un script Python qui transforme {{source}} en CSV d'import Shopify.

Règles de transformation : {{coller la matrice validée}}

CONTRAINTES ABSOLUES :
- Lecture seule sur source-export/. Écriture uniquement dans transformed/
- AUCUN traitement silencieux : tout cas non prévu part dans
  transformed/anomalies.csv avec l'identifiant source et le motif
- Aucune valeur par défaut implicite : si une donnée manque, elle est signalée
- Le script écrit aussi transformed/stats.json : comptages avant/après,
  sommes des champs numériques
- Idempotent : relançable sans effet de bord
- Commenté, pour que je puisse le relire et le modifier

À la fin, affiche un résumé : lignes lues, lignes écrites, anomalies par motif.
Si lignes lues ≠ lignes écrites + anomalies, c'est un bug : signale-le.
```

La dernière ligne est le contrôle qui attrape les pertes silencieuses.

### 5 — Nettoyage HTML

```
Écris un script qui nettoie les descriptions produit issues de {{plateforme}}.

À traiter :
1. Shortcodes WordPress [xxx] et [xxx]...[/xxx] — les LISTER avant de les
   retirer, certains portent du contenu à préserver
2. Balisage de constructeur de pages ({{lequel}})
3. Styles CSS en ligne inutiles
4. URL absolues vers {{ancien-domaine}} → chemins relatifs ou nouvelles URL
5. Balises vides
6. Attributs de classe propres à l'ancien thème

CONTRAINTES :
- Ne supprime JAMAIS de texte visible
- Produis un rapport : quels shortcodes trouvés, combien de fois, quel contenu
  ils portaient
- Écris un échantillon avant/après de 10 descriptions pour que je vérifie
- Signale toute description dont la longueur diminue de plus de 30 % :
  c'est le signe qu'on a retiré du contenu réel
```

### 6 — Carte de redirections

```
Génère la carte de redirections.

Entrée : {{source-crawl.csv}} — colonnes : url, type, sessions_12m, impressions
Handles Shopify générés : {{transformed/products.csv}}

Règles de correspondance : {{coller la table de 06-seo-migration.md}}

Produis redirect-map.csv (Redirect from, Redirect to) et :
1. Trie par trafic décroissant
2. Signale toute URL sans correspondance trouvée → fichier séparé, à traiter
   manuellement, trié par trafic
3. Détecte les chaînes (une destination qui est elle-même une source)
4. Détecte les boucles
5. Signale les redirections vers la page d'accueil — elles doivent être
   l'exception, pas la règle

Ne redirige RIEN vers la page d'accueil par défaut. Si tu ne trouves pas de
destination pertinente, laisse la ligne dans le fichier « à traiter ».
```

### 7 — Contrôles de validation

```
Écris un script qui compare {{source-export/}} et {{export de la boutique Shopify}}.

Produis validation-report.md avec, pour chaque type de donnée :
- comptage source vs cible
- somme des champs numériques (prix, stock, montants de commande)
- liste des identifiants présents à la source et absents de la cible
- liste des identifiants apparus sans origine
- échantillon aléatoire de 50 enregistrements comparés champ à champ

Formate en tableau, avec une colonne Statut : ✅ identique / 🟡 écart / ❌ problème.

Pour chaque écart, ne te contente pas de le signaler : cherche le motif dans
les données et propose une explication vérifiable. Un écart sans explication
est un écart non traité.
```

### 8 — Definitions de metafields

```
À partir de la matrice validée, liste les definitions de metafields à créer.

Pour chacune :
- namespace et clé
- type Shopify exact (vérifie via le Dev MCP)
- niveau : produit / variante / client / collection
- s'il doit être exposé au storefront
- si le type permet une connexion en source dynamique dans l'éditeur de thème
- valeur d'exemple issue des données réelles

Signale toute donnée source dont AUCUN type de metafield Shopify ne rend
correctement compte, et propose l'alternative.
```

### 9 — Journal d'anomalies vers décisions client

```
Voici transformed/anomalies.csv : {{coller un extrait}} — {{n}} lignes

Regroupe les anomalies par motif et produis, pour chaque groupe :
- combien de fois
- ce que ça signifie concrètement, en langage non technique
- les options possibles
- ma recommandation
- l'impact si on ne fait rien

Format : un document que je puisse envoyer au client pour qu'il tranche.
Trie par nombre d'occurrences décroissant.
```

### 10 — Rapport post-lancement

```
Rédige post-launch-report.md.

Données de référence (avant migration) : {{...}}
Données actuelles (J+30) : {{...}}
Redirections ajoutées depuis la bascule : {{...}}
Incidents rencontrés : {{...}}

Contraintes :
- Lecteur : le marchand, non technique
- N'affirme aucun chiffre absent de ce que je te fournis
- Distingue clairement ce qui est attribuable à la migration de ce qui peut
  venir d'autre chose (saison, campagnes, marché)
- Rappelle le calendrier de récupération SEO et où on en est
- Inclus une section « ce qui reste à surveiller »
- Aucune promesse sur la suite
```

---

## C. Les 3 agents

| Agent | Rôle | Écriture |
|---|---|---|
| `migration-analyst` | Analyse la source, détecte les blocages, produit l'écart fonctionnel | ❌ |
| `data-transformer` | Écrit et exécute les scripts de transformation | ✅ `transformed/` uniquement |
| `migration-validator` | Compare source et cible, produit les contrôles chiffrés | ❌ |

Fichiers dans `claude/agents/`.

---

## D. Ce qu'il ne faut jamais faire

| Anti-pattern | Conséquence |
|---|---|
| « Migre cette boutique vers Shopify » | Le modèle produira un script qui perd des données silencieusement |
| Accepter un script sans journal d'anomalies | Tu ne sauras pas ce que tu as perdu |
| Laisser écrire dans `source-export/` | Plus de référence, plus de contrôle possible |
| Faire générer les redirections sans vérifier les non-correspondances | Trafic perdu sur les URL non traitées |
| Demander un rapport sans fournir les chiffres | Le modèle produira des chiffres plausibles et faux |
| Automatiser une étape de la bascule | La bascule est manuelle, séquentielle, et humaine |
| Accepter « les valeurs manquantes ont été remplacées par une valeur par défaut » | C'est exactement ce qu'il ne faut pas faire |

Le dernier point mérite une vigilance constante. Un script bien écrit **échoue bruyamment** sur un cas non prévu. Un script qui « gère élégamment » les cas limites en leur donnant une valeur par défaut est un script qui te fera livrer des données fausses avec un rapport de validation vert.
