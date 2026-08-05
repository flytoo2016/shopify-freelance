# 08 — Safety & Git

> **NEVER MODIFY PRODUCTION DIRECTLY.**
> Cette règle n'a pas d'exception, y compris en urgence — surtout en urgence.

---

## A. La chaîne de sécurité

```
BACKUP                 duplication datée du thème publié
   ↓
GIT                    init + tag baseline, avant toute lecture approfondie
   ↓
DEV / DUPLICATE THEME  tout le travail se fait ici
   ↓
CHANGE                 un correctif = un commit
   ↓
TEST                   bug + zone + parcours d'achat
   ↓
CLIENT APPROVAL        écrit, sur la base d'un lien de preview
   ↓
PUBLISH                à heure creuse, avec rollback prêt
```

Chaque maillon existe parce que son absence a déjà coûté cher à quelqu'un.

---

## B. Backup — première action, avant tout le reste

Avant même de lire le code :

1. Admin → Boutique en ligne → Thèmes → ⋯ → **Dupliquer**
2. Renommer : `BACKUP — {{AAAA-MM-JJ}} — avant intervention {{ton nom}}`
3. Noter l'ID du thème dans le journal de mission
4. **Ne jamais toucher à cette copie**

Coût : trente secondes. Elle est la seule chose qui te sépare d'un désastre irréversible le jour où un `push` part au mauvais endroit.

**Si le client refuse la duplication** (limite de 20 thèmes atteinte, généralement) : demande la suppression d'un vieux thème inutilisé, ou fais un `theme pull` complet en local et archive-le en ZIP horodaté. Une sauvegarde locale vaut mieux que rien, mais elle ne se republie pas en un clic.

---

## C. Git — dès la première minute

```bash
cd clients/{{client}}/04_development
shopify theme pull --store {{store}}.myshopify.com --path ./theme
cd theme
git init
git add .
git commit -m "chore: baseline — thème tel que reçu $(date +%F)"
git tag baseline
```

À partir de là, `git diff baseline` te donne à tout instant l'intégralité de ce que tu as touché. C'est ton livrable, ta preuve, et ta porte de sortie.

### `.gitignore`

```gitignore
.shopify/
node_modules/
*.log
.DS_Store
config/settings_data.json
```

`config/settings_data.json` contient les réglages du marchand. Ne le versionne pas par défaut, et ne le pousse jamais :

```bash
shopify theme push --theme {{id_dev}} --ignore config/settings_data.json
```

---

## D. Branches et commits

```
main                              état livré
fix/cart-add-locale-url           un bug
fix/section-schema-invalid
fix/editor-carousel-init
investigate/variant-price         piste en cours d'exploration
```

Une branche `investigate/*` sert à essayer sans polluer l'historique. Si la piste ne mène nulle part, tu la supprimes — mais tu notes ce qu'elle t'a appris dans `hypotheses.md`.

### Format de commit

```
fix(scope): ce qui est réparé, à l'impératif

Symptôme observé.
Cause racine identifiée.
Ce qui a été modifié et pourquoi cette approche.
S'il s'agit d'un contournement plutôt que d'une correction : le dire.
Testé : parcours, navigateurs, appareils.
```

Exemple :

```
fix(cart): utiliser des URL localisées pour les requêtes du panier

L'ajout au panier échouait silencieusement sur le marché français.
Cause : les requêtes utilisaient '/cart/add.js' en dur, ce qui ignore le
préfixe de locale ajouté par Shopify Markets.
Remplacement par window.Shopify.routes.root + 'cart/add.js' sur les trois
appels (add, change, update).
Testé : marchés FR et EN, ajout simple, ajout multiple, modification de
quantité, suppression — Chrome desktop et Safari iOS 17 réel.
```

Un commit rédigé ainsi est directement réutilisable dans le rapport client. Tu n'écris pas deux fois.

---

## E. `git bisect` — trouver le commit fautif

Applicable dès qu'un historique existe (le tien, ou celui de l'intégration GitHub du client).

```bash
git bisect start
git bisect bad                 # état actuel : cassé
git bisect good baseline       # dernier état sain connu

# Git te place sur un commit intermédiaire.
# Tu pousses ce commit sur le thème de dev, tu testes, puis :
git bisect good        # ou
git bisect bad

# ... répéter jusqu'au verdict
git bisect reset
```

Sur cent commits, sept ou huit tests suffisent. Sans historique, cette méthode est indisponible — et c'est l'argument le plus concret pour vendre la mise en place d'un versionnage.

---

## F. Rollback

Écrit **avant** la publication, joint au rapport de livraison.

```markdown
## Plan de retour arrière — {{client}} — {{date}}

Thème publié avant intervention : "{{nom}}" (ID {{id}})
Sauvegarde : "BACKUP — {{date}}" (ID {{id}})
Thème corrigé : "{{nom}} — corrigé {{date}}" (ID {{id}})
Tag Git : baseline    Commit livré : {{sha}}

### Retour complet (< 2 minutes)
1. Admin → Boutique en ligne → Thèmes
2. "BACKUP — {{date}}" → Actions → Publier
3. Vérifier : accueil, page produit, ajout au panier
4. Me prévenir + noter l'heure

### Retour partiel (annuler un seul correctif)
git revert {{sha}}
shopify theme push --theme {{id_dev}} --ignore config/settings_data.json
→ vérifier sur le lien de preview, puis republier

### Contact
{{nom}} — {{téléphone}} — disponible {{créneaux}}
```

---

## G. Les huit interdits

1. **`shopify theme push --allow-live`** — jamais.
2. **`shopify theme publish`** sans accord écrit — jamais.
3. **Désinstaller une application** pour tester — jamais. La désinstallation peut détruire des données de manière irréversible. On neutralise sur la copie de dev.
4. **Modifier le thème publié « juste pour voir »** — chaque essai est visible par les acheteurs.
5. **Renommer un `id` de réglage `{% schema %}`** — détruit les valeurs saisies par le marchand.
6. **Pousser `config/settings_data.json`** — écrase tous les réglages.
7. **Corriger plusieurs bugs dans un commit** — rend l'annulation sélective impossible.
8. **Laisser du code de débogage** — `{{ x | json }}`, `console.log`, blocs `<pre>`.

Ces huit règles se traduisent en garde-fous concrets dans `.claude/settings.json` (voir Phase 1, `00-workspace-setup.md`), pour que l'outil lui-même refuse les commandes dangereuses.

---

## H. Cas particulier : l'intégration GitHub du client

Si le store utilise l'intégration GitHub de Shopify, le thème est déjà versionné et connecté à une branche.

- Tu travailles sur **une branche dédiée**, jamais sur celle qui est connectée au thème publié
- Tu passes par une pull request : le client voit le diff avant de valider
- Tu ne pousses pas sur la branche de production
- La publication reste une action côté Shopify, décidée par le client

C'est le contexte le plus confortable pour cette prestation. S'il n'existe pas, sa mise en place est un excellent upsell — vends-le après avoir constaté son absence, pas avant.

---

## I. Confidentialité

- Un dépôt Git par client, jamais public
- Aucune donnée client dans un exemple, un commit ou une documentation générique
- Les identifiants d'accès ne sont jamais versionnés ni collés dans un outil
- En fin de garantie, tu invites explicitement le client à révoquer ton accès Theme Access

Ce dernier point surprend systématiquement les clients, et c'est exactement pour cela qu'il marque.
