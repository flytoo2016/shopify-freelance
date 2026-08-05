# CLAUDE.md — Shopify Freelance System

Ce fichier définit comment tu travailles sur ce workspace. Il s'applique à toutes les missions.

---

## CONTEXTE

Nous réalisons des prestations Shopify pour des clients réels. Le code que tu modifies tourne sur des boutiques qui génèrent du chiffre d'affaires. Une régression coûte de l'argent à quelqu'un.

Structure : `clients/{nom}/` contient une mission. Le thème est dans `04_development/theme/`.

---

## RÈGLES ABSOLUES (jamais d'exception)

1. **Jamais de modification sur le thème publié.** Tout passe par un thème de développement ou non publié. `shopify theme push --allow-live` et `shopify theme publish` sont interdits.
2. **Un correctif = un fichier = un commit.** Jamais de refactor multi-fichiers en une passe.
3. **Aucune suppression de code sans preuve d'inutilisation.** Preuve = Coverage + `grep` sans occurrence + test manuel. « Ça a l'air inutilisé » n'est pas une preuve.
4. **Ne jamais modifier une clé `id` dans un `{% schema %}`.** Cela détruit les réglages du marchand. Si c'est nécessaire, tu t'arrêtes et tu me préviens.
5. **Ne jamais écraser `config/settings_data.json`.**
6. **Aucun chiffre inventé.** Si une donnée de performance n'est pas dans le contexte que je t'ai fourni, tu écris « à mesurer », jamais une estimation présentée comme un fait.
7. **Aucune promesse de résultat** dans les documents client : ni score, ni pourcentage de conversion, ni chiffre d'affaires.
8. **Toute affirmation dans un audit est sourcée** par `fichier:ligne` ou par une mesure. Sinon elle est marquée « À CONFIRMER ».
9. **Avant d'écrire, tu proposes.** Tu montres le code actuel, le code proposé, le risque. Tu attends « GO ».
10. **Confidentialité.** Le contenu d'un dossier client ne sort pas de ce dossier. Aucune donnée client dans un exemple, un commit ou un document générique.

---

## ARCHITECTURE SHOPIFY — rappels

```
layout/      theme.liquid, wrappers ; contient content_for_header et content_for_layout
templates/   JSON ou Liquid, définissent quelles sections s'affichent
sections/    modules pleine largeur, avec {% schema %}
blocks/      composants réutilisables et imbriquables, avec {% schema %}
snippets/    fragments rendus via {% render %}, scope isolé, doivent avoir {% doc %}
assets/      CSS, JS, images, polices
config/      settings_schema.json (structure) et settings_data.json (valeurs marchand)
locales/     traductions, accès via {{ 'clé' | t }}
```

Points de vigilance :
- `{% render %}` a un scope isolé : les variables doivent être passées en paramètre.
- Une boucle `for` est limitée à 50 itérations : au-delà, `{% paginate %}`.
- Liquid n'a **ni parenthèses dans les conditions, ni opérateur ternaire**.
- `{% stylesheet %}` et `{% javascript %}` ne fonctionnent que dans `sections/`, `blocks/`, `snippets/`, et **Liquid n'y est pas interprété**.
- Les blocs déplaçables ont besoin de `{{ block.shopify_attributes }}` sur leur wrapper.

---

## CONVENTIONS

### Liquid
- `image_url` + `image_tag` uniquement. `img_url` et `img_tag` sont dépréciés.
- Utiliser `{% liquid %}` pour les blocs multi-instructions.
- Sortir les calculs hors des boucles.
- Tout texte visible passe par `{{ 'clé' | t }}` et est ajouté à `locales/en.default.json`.

### CSS
- BEM : `.block__element--modifier`
- Une propriété pilotée par un réglage → variable CSS inline. Plusieurs propriétés → classe.
- Pas de `!important` sauf pour neutraliser un style d'app, et avec un commentaire.
- Pas de framework CSS ajouté.

### JavaScript
- JS natif. Aucune bibliothèque ajoutée, aucun framework, aucun polyfill pour navigateurs obsolètes.
- Tout script injecté dans un thème est encapsulé en IIFE (la minification renomme les variables et provoque des collisions globales).
- `defer` par défaut ; `async` uniquement pour les scripts totalement indépendants.
- Cible : bundle JS de thème ≤ 16 KB minifié. Theme Check signale les fichiers > 10 KB compressés.
- Le JS est une amélioration progressive : le parcours d'achat doit fonctionner sans lui autant que possible.

### Accessibilité
- HTML sémantique (`<details>`, `<summary>`, `<dialog>`, `<button>` pour ce qui est cliquable).
- `alt` sur toutes les images. Focus visible. Navigation clavier préservée.
- Ne jamais dégrader l'accessibilité pour gagner de la performance.

### Performance
- Pas d'image au-dessus de la ligne de flottaison en `loading="lazy"`.
- `width` et `height` sur toutes les images.
- Maximum 2 resource hints par template (limite Shopify).
- Ne jamais ajouter de script bloquant.

### SEO
- Ne pas toucher aux `title`, `meta description`, `canonical`, ni aux données structurées sans instruction explicite.
- Ne pas modifier la structure des titres `h1`–`h6`.

---

## GIT

- Branches : `perf/*`, `fix/*`, `audit/*`
- Commits : `type(scope): description` — types `perf`, `fix`, `refactor`, `docs`, `chore`, `revert`
- Le corps du commit explique **pourquoi**, la métrique visée, et ce qui a été testé.
- Tag `baseline` sur l'état reçu, jamais supprimé.
- Ne jamais commiter de secret, token, mot de passe ou URL d'accès.

---

## MCP

- Seul le **Shopify Dev MCP** est autorisé. Il sert à consulter la documentation, vérifier les schémas GraphQL et valider le Liquid généré.
- Il ne lit pas le store, n'écrit rien, ne mesure rien. La lecture/écriture du thème passe par le CLI.
- Aucun serveur MCP Admin non officiel sur un store client.
- Après toute génération ou modification de Liquid : `validate_theme`, puis `shopify theme check --fail-level error`.

---

## TESTS OBLIGATOIRES AVANT COMMIT

```
1. shopify theme check --fail-level error → 0 erreur
2. git diff relu : aucun changement hors périmètre
3. Liste explicite de ce que je dois tester manuellement
```

---

## DOCUMENTATION

Toute mission produit `clients/{nom}/docs/00` à `11`. Les documents client sont rédigés pour un lecteur non technique : chaque terme technique est expliqué à sa première occurrence, et chaque rapport contient une section « ce qui n'a pas été fait et pourquoi ».

---

## SI TU N'ES PAS SÛR

Tu t'arrêtes et tu demandes. Sur un site marchand, une question coûte trente secondes ; une supposition peut coûter une journée de chiffre d'affaires.
