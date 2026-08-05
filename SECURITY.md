# SECURITY.md

Règles de sécurité du système freelance Shopify. Elles s'appliquent à toutes les missions, sans exception.

Le code que nous modifions tourne sur des boutiques qui génèrent du chiffre d'affaires. Une régression coûte de l'argent à quelqu'un. Une fuite de données en coûte davantage.

**Les sept règles**

| | Règle |
|---|---|
| **R1** | Jamais de modification sur un thème publié. |
| **R2** | Sauvegarde datée avant toute intervention. Pas de sauvegarde, pas d'intervention. |
| **R3** | Accès client minimal, et révocable. |
| **R4** | Aucun secret versionné, jamais, aucune exception. |
| **R5** | Isolation stricte entre clients. |
| **R6** | `config/settings_data.json` : versionné, jamais poussé, dépôt privé. |
| **R7** | Le `.gitignore` doit être **à l'intérieur** du dépôt client, copié **avant** le premier `git add`. |

---

## R1 — Jamais de modification sur un thème publié

Tout passe par un thème de développement ou non publié.

- `shopify theme push --allow-live` et `shopify theme publish` sont **interdits** sans accord écrit du client. Cet accord est cité dans le commit ou dans le rapport de livraison.
- `theme publish` ne publie pas le code local : il promeut un thème **déjà présent** sur le store. La séquence est toujours *push, puis publish par ID*.
- Toute commande touchant un store est annoncée avant exécution. On attend le GO.
- Aucune commande destructive n'est lancée sans avoir affiché au préalable ce qu'elle va détruire.

**Ne jamais renommer ni supprimer une clé `id` existante dans un `{% schema %}`.** Cela détruit les réglages saisis par le marchand, et c'est irrattrapable côté thème. Ajouter un nouvel `id` est sans risque. Si un renommage semble nécessaire, on s'arrête et on demande.

Les règles `deny` de `.claude/settings.json` matérialisent R1 côté outillage. Elles sont évaluées en premier et gagnent toujours.

---

## R2 — Sauvegarde datée avant toute intervention

1. **Duplication dans l'admin du client**, avant toute manipulation : Online Store → Themes → ⋯ → Duplicate. Nommer la copie `BACKUP — AAAA-MM-JJ — avant intervention`. Cette copie n'est jamais modifiée.
2. **Sauvegarde locale du thème reçu** dans un dossier daté.
3. **Tag Git `baseline`** sur l'état exact reçu, avant toute modification. Il n'est jamais supprimé.

Pas de sauvegarde, pas d'intervention. C'est une condition d'entrée, pas une bonne pratique.

---

## R3 — Accès client minimal, et révocable

Deux options, par ordre de préférence.

### Theme Access App (à privilégier)

Le client installe l'app **Theme Access** depuis l'App Store, crée un mot de passe à notre nom, et nous le transmet.

- L'accès ne donne que les fichiers du thème, via le CLI. Pas de commandes, pas de clients, pas de finances.
- Le client le révoque lui-même, en un clic, sans passer par nous.
- Le jeton a la forme `shptka_…`. C'est un secret : il relève de R4.

```bash
shopify theme pull --store <store>.myshopify.com --password shptka_xxx
```

### Compte collaborateur (si nécessaire)

Nécessaire seulement pour voir le dashboard performance ou la liste des apps. Demandé via le Partner Dashboard.

- Demander uniquement les permissions **Themes**, **Apps**, **Reports**. Jamais Customers, Orders ou Finances.
- Un collaborateur inactif 90 jours perd automatiquement son accès. C'est une protection, pas un incident.

### À la fin de la mission

Demander la révocation de l'accès, et le confirmer par écrit. Un accès oublié est une responsabilité qui court.

---

## R4 — Aucun secret versionné

Sont des secrets : clés d'API, jetons, mots de passe, URL d'accès, fichiers `.env`.

- Les secrets vivent dans `.env`, ignoré par Git. Le modèle est `.env.example`, qui ne contient **jamais** de valeur.
- Aucun secret dans un commit, un message de commit, un nom de branche, un document client ou une capture d'écran.
- **Un `.gitignore` n'a aucun effet rétroactif.** Un fichier déjà suivi le reste. Si un secret a été commité, il doit être **révoqué**, pas seulement ignoré — le retirer de l'historique ne suffit pas, car on ne sait pas qui a déjà cloné.

Un jeton Theme Access compromis se révoque côté client, dans l'app. On le signale immédiatement, même si c'est gênant.

---

## R5 — Isolation stricte entre clients

- **Un dépôt par client.** Ne jamais mélanger deux clients dans un même dépôt : un `git log` chez le client A ne doit jamais révéler l'existence du client B.
- Le contenu d'un dossier client **ne sort pas** de ce dossier.
- Aucune donnée client dans un exemple, un commit, ou un document générique.
- Avant tout versement vers `component-library/` ou `knowledge/` : **anonymiser** le nom, le domaine, les identifiants, les prix et les volumes. Le versement est une réécriture, pas une copie.
- Chaque dépôt client est traité comme strictement privé, y compris sur un hébergement Git privé.

---

## R6 — `config/settings_data.json`

Ce fichier contient les **valeurs de réglages saisies par le marchand** : textes, couleurs, choix d'affichage, et parfois des identifiants d'apps. Il est traité selon trois points qui ne se dissocient pas.

**1. Versionné dans le dépôt client**, pour que `git diff baseline` soit complet. Sans lui, le diff ne montre pas ce qui a changé côté réglages, et le filet de sécurité de R2 est troué. Il n'est donc **pas** listé dans le `.gitignore` client — c'est délibéré, et c'est écrit dans le fichier.

**2. Jamais poussé vers un store.** Le pousser écrase les réglages que le marchand a pu modifier entre-temps, y compris pendant notre intervention.

```bash
shopify theme push --theme <id> --ignore config/settings_data.json
```

Cette option va sur **chaque** push. Sans exception, y compris pour un push d'un seul fichier.

**3. Le dépôt client est strictement privé.** C'est la contrepartie du point 1 : puisque ce fichier peut contenir des identifiants d'apps, le versionner n'est acceptable que dans un dépôt qui ne sera jamais public, jamais partagé, jamais versé au système.

---

## R7 — Le `.gitignore` à l'intérieur du dépôt client

**Un `.gitignore` situé au-dessus de la racine du dépôt n'a aucun effet.** Git ne lit que les `.gitignore` situés dans l'arborescence du dépôt. Celui de `clients\` ne protège donc **rien** dans un dépôt enraciné à `clients\<nom-client>\`.

Copier `clients\_TEMPLATE-CLIENT\.gitignore` dans le dossier client **avant** le premier `git add`. Sans exception.

L'ordre n'est pas négociable, parce que R4 n'a pas de rattrapage : un secret capté par le premier `git add` est dans l'historique, et l'ajout du `.gitignore` ensuite ne l'en retire pas.

```powershell
# 1. copier le .gitignore À L'INTÉRIEUR du dossier client
Copy-Item clients\_TEMPLATE-CLIENT\.gitignore clients\<nom-client>\

# 2. vérifier qu'il est bien là, et qu'aucun dépôt parent n'existe
Test-Path clients\<nom-client>\.gitignore
git -C clients\<nom-client> rev-parse --show-toplevel   # fatal: … attendu

# 3. seulement ensuite
git init ; git add . ; git status
```

Relire `git status` **avant** le premier commit : c'est le dernier moment où une erreur est encore gratuite.

---

## Vérification avant chaque commit

```
[ ] shopify theme check --fail-level error → 0 erreur
[ ] git diff relu ligne par ligne : aucun changement hors du périmètre annoncé
[ ] aucun secret, aucun jeton, aucune URL d'accès dans le diff
[ ] config/settings_data.json : présent dans le dépôt, absent de tout push
```
