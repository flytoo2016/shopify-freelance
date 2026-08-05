# 07 — Claude Code Workflow (Build)

---

## A. Le principe

> **Claude Code n'invente pas le besoin. Il exécute une spécification validée.**

Le risque spécifique de cette phase : face à une demande vague, un modèle produit un composant complet, élégant et plausible — mais qui répond à un besoin qu'il a lui-même inventé. Tu le découvres à la livraison, quand le client dit « ce n'est pas ce que je voulais ».

Trois règles :

1. **Pas de spec validée, pas de code.** Si la spec est absente ou incomplète, Claude doit poser les questions manquantes, pas combler les trous.
2. **Le schéma avant le Liquid.** C'est le contrat avec le marchand.
3. **Chaque type de réglage, chaque objet et chaque filtre sont vérifiés** via le Dev MCP avant d'être écrits. C'est le terrain d'hallucination le plus fertile de tout le métier Shopify.

---

## B. Les 8 prompts

### 1 — Décision d'architecture

```
LECTURE SEULE. Ne crée aucun fichier.

Spécification validée : {{coller component-spec.md}}
Thème : {{nom}} v{{version}}
Le thème utilise-t-il le dossier blocks/ (theme blocks) ? {{oui/non}}

Tranche les 5 décisions d'architecture et justifie chacune :
1. Section, theme block, ou snippet ? Pourquoi ?
2. Où vivent les données : réglages, metafields produit, metafields variante,
   ou metaobjects ? Le critère décisif est : le contenu diffère-t-il par produit ?
3. Blocks nécessaires ? Locaux à la section, ou theme blocks réutilisables ?
   Quel max_blocks ?
4. Sur quels templates : enabled_on ou disabled_on, avec quelle valeur exacte ?
5. Ce composant est-il réutilisable sur d'autres boutiques ? Si oui, qu'est-ce
   qui doit être paramétrable plutôt qu'écrit en dur ?

Termine par les questions que je dois reposer au client avant de commencer.
Si la spec ne permet pas de trancher une décision, dis-le au lieu de choisir.
```

### 2 — Le schéma, seul

```
À partir de la spec, écris UNIQUEMENT le {% schema %}. Aucun Liquid.

Contraintes :
- chaque réglage a un default cohérent
- ids en snake_case, stables, jamais destinés à changer
- labels rédigés pour un marchand non technique
- info: sur tout réglage dont l'effet n'est pas évident, formulé comme un
  avertissement utile plutôt qu'une description
- header: pour regrouper si plus de 6 réglages
- presets défini, avec des blocs pré-remplis si pertinent
- enabled_on OU disabled_on, jamais les deux
- max_blocks réaliste (limite plateforme : 50 par section)
- vérifie CHAQUE "type" de réglage avec le Dev MCP avant de l'écrire

Puis explique-moi, réglage par réglage, ce que le marchand pourra changer.
Si un réglage te semble superflu, dis-le : trop de réglages = marchand perdu
qui n'utilise rien.
```

### 3 — Vérifier les données réelles

```
Avant de coder, je dois savoir ce qui existe vraiment dans ce store.

Donne-moi les commandes shopify theme console à exécuter pour vérifier :
- la structure de {{metafield / metaobject}} sur un produit qui la possède
- le comportement sur un produit qui ne la possède PAS
- {{autres objets utilisés par la spec}}

Puis, à partir de ce que je te renverrai, dis-moi :
1. quelles gardes {% if %} le code devra prévoir
2. si le type du metafield est compatible avec le type de réglage prévu pour
   une source dynamique
3. ce qu'il faut afficher quand la donnée est absente
```

### 4 — Le Liquid, sans JavaScript

```
Écris le Liquid du composant à partir du schéma validé.

Contraintes strictes :
- le composant se rend ENTIÈREMENT côté serveur, sans JS
- garde {% if %} sur toute donnée pouvant être absente ou vide
- image_url + image_tag (jamais img_url/img_tag)
- {{ block.shopify_attributes }} sur chaque wrapper de bloc
- tout texte visible via un réglage ou {{ 'clé' | t }} — liste les clés à
  ajouter aux fichiers locales
- HTML sémantique : <details>/<summary>, <button>, <ul>, titres cohérents
- attribut data- racine pour l'accroche JS, jamais une classe CSS
- | escape sur toute valeur insérée dans un attribut HTML
- pas de parenthèses dans les conditions Liquid, pas de ternaire

Puis montre-moi le rendu attendu dans trois cas :
1. aucun réglage renseigné
2. contenu maximal (max_blocks atteint)
3. texte de 300 caractères dans un champ prévu pour 30
```

### 5 — Le CSS

```
Écris le CSS du composant.

- mobile-first, media queries en min-width uniquement
- scopé par une classe racine unique, aucune règle sur des éléments nus
- BEM
- variables CSS pour tout ce qui dépend d'un réglage
- aucun !important
- aspect-ratio ou width/height sur tout média → zéro décalage visuel
- cibles tactiles ≥ 44px
- prefers-reduced-motion respecté s'il y a du mouvement

Dis-moi si le CSS doit aller dans {% stylesheet %} ou dans un asset, et pourquoi.
RAPPEL IMPORTANT : Liquid n'est pas interprété dans {% stylesheet %} — tout ce
qui dépend d'un réglage doit passer par une variable CSS posée dans le HTML.
```

### 6 — Le JavaScript progressif

```
Le composant fonctionne déjà entièrement sans JS.
Ajoute uniquement cette amélioration : {{quoi}}.

Contraintes :
- JS natif, aucune bibliothèque, aucun polyfill
- encapsulé en IIFE (la minification renomme les variables et provoque des
  collisions globales)
- garde dataset.init contre la double initialisation
- écoute shopify:section:load et shopify:section:unload, avec nettoyage au
  unload (écouteurs, timers, observers) — sinon le composant casse dans le
  Theme Editor
- délégation d'événement : le DOM peut être remplacé par une application ou
  par l'éditeur
- si le module échoue à charger, le composant reste utilisable

Termine en me disant précisément ce qui se dégrade sans JS, et si cette
dégradation est acceptable.
```

### 7 — Revue avant livraison

```
Relis le composant complet (Liquid, schéma, CSS, JS) et vérifie point par point :

1. presets présent ? Sans lui le marchand ne peut pas ajouter la section
2. Chaque réglage a-t-il un default ?
3. {{ block.shopify_attributes }} sur chaque wrapper de bloc ?
4. enabled_on ET disabled_on utilisés ensemble ? (interdit)
5. Un seul {% schema %} dans le fichier ?
6. Des textes en dur non traduisibles ?
7. Des données affichées sans garde {% if %} ?
8. Le rendu dépend-il du JavaScript quelque part ?
9. Du code de débogage résiduel ({{ x | json }}, console.log, <pre>) ?
10. Un id de réglage risque-t-il de devoir changer plus tard ?
11. Une valeur insérée dans un attribut HTML sans | escape ?
12. Le composant fonctionnerait-il tel quel dans un thème vierge ?

Verdict : GO / GO AVEC RÉSERVES / STOP.
Pour chaque problème : fichier:ligne et correction proposée.
```

### 8 — Le guide marchand

```
Rédige le guide d'utilisation destiné au marchand. Une page maximum.

Contenu :
- où trouver le composant dans le personnalisateur (chemin exact)
- ce que fait chaque réglage, en langage courant
- comment ajouter, réordonner et supprimer un bloc
- ce qu'il ne faut pas faire, et ce qui se passe si on le fait
- où mettre à jour les données si le composant lit des metafields
- quoi faire en cas de problème

Contraintes :
- lecteur : quelqu'un qui n'a jamais ouvert un fichier de code
- aucun jargon technique non expliqué
- indique où je dois insérer des captures d'écran
- ton : direct, sans condescendance
```

---

## C. Les 3 agents

Fichiers dans `claude/agents/`.

| Agent | Rôle | Écriture |
|---|---|---|
| `section-architect` | Tranche les décisions d'architecture, écrit le schéma | ❌ (propose) |
| `liquid-builder` | Implémente Liquid, CSS, JS, une couche à la fois | ✅ encadrée |
| `section-qa` | Revue avant livraison, cherche ce qui va casser | ❌ |

---

## D. Ce qu'il ne faut jamais faire

| Anti-pattern | Conséquence |
|---|---|
| « Crée-moi une section de témoignages » | Tu obtiens un composant élégant qui répond à un besoin inventé |
| Coder avant d'avoir validé le schéma | Réglages qui ne correspondent pas à ce que le marchand veut changer |
| Accepter un type de réglage sans le vérifier | Section indisponible dans l'éditeur, sans message d'erreur clair |
| Laisser générer Liquid + CSS + JS en une passe | Diff illisible, aucune couche testable séparément |
| Demander « rends-le plus joli » | Tu obtiens des effets, pas de la hiérarchie |
| Oublier de demander le rendu avec réglages vides | Le cas qui casse le plus souvent en production |
| Copier un composant de ta bibliothèque sans le relire | Les noms de classes ou les textes d'un autre client subsistent |

Le dernier point mérite une vigilance particulière : quand tu réutilises un composant, **fais relire le diff** en cherchant explicitement toute trace du client précédent. Une fuite de nom entre deux clients est le genre d'incident qui ne se rattrape pas.
