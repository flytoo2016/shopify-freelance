# 03 — Bug Taxonomy

Quinze familles. Pour chacune : les symptômes visibles, les causes les plus fréquentes, et le premier réflexe de diagnostic. Cette table est ton accélérateur — elle transforme « je cherche » en « je vérifie ».

---

## 1. Erreurs Liquid visibles

**Symptôme.** Un texte du type `Liquid error:` apparaît sur la page, ou une zone reste obstinément vide.

**Points clés à comprendre.** Liquid échoue **silencieusement** dans la plupart des cas : un objet inexistant ou une propriété inconnue rend une chaîne vide, sans erreur. Seuls certains cas (filtre inconnu, syntaxe invalide) produisent un message visible. **Conséquence pratique : l'absence d'erreur ne prouve rien.**

**Causes fréquentes**
- Filtre ou balise inexistant — souvent du code écrit par un LLM ou copié d'une autre plateforme
- Propriété d'objet inventée (`product.stock`, `collection.count`…)
- `{% render %}` d'un snippet inexistant ou renommé
- Variable utilisée dans un `{% render %}` sans avoir été passée en paramètre

**Premier réflexe.** `shopify theme check --fail-level error`, puis `shopify theme console` pour évaluer l'objet réellement disponible.

---

## 2. Le piège du scope de `{% render %}`

Famille à part entière tant elle génère de bugs.

**Symptôme.** Un snippet affiche du vide alors que la variable existe manifestement dans la page appelante.

**Cause.** `{% render %}` crée un **scope isolé** : le snippet ne voit aucune variable de son appelant, sauf celles passées explicitement en paramètre. L'ancien `{% include %}`, lui, partageait le scope — d'où des bugs qui apparaissent quand quelqu'un modernise un thème en remplaçant `include` par `render` sans passer les variables.

```liquid
{%- comment -%} Cassé {%- endcomment -%}
{% assign my_product = collection.products.first %}
{% render 'product-card' %}          {# my_product est invisible à l'intérieur #}

{%- comment -%} Correct {%- endcomment -%}
{% render 'product-card', product: my_product %}
```

**Premier réflexe.** Dans le snippet, afficher `{{ variable | json }}` en haut. Si c'est vide, c'est le scope.

---

## 3. Boucles tronquées

**Symptôme.** « Il manque des produits », « seulement 50 s'affichent », « le filtre ne trouve pas tout ».

**Cause.** Une boucle `for` Liquid s'arrête à **50 itérations** par défaut. Silencieusement.

**Correctif.** `{% paginate %}`, ou `limit:` explicite si la limitation est voulue et assumée.

**Premier réflexe.** Compter ce qui s'affiche. Si c'est exactement 50, tu as trouvé.

---

## 4. Sections cassées ou indisponibles dans l'éditeur

**Symptôme.** « This section is not available », section absente du personnalisateur, réglages vides, impossible d'ajouter un bloc.

**Causes fréquentes**
- JSON invalide dans le `{% schema %}` — une virgule en trop suffit
- Deux `id` de réglages identiques dans un même schéma
- Type de réglage inexistant ou mal orthographié
- Section référencée dans un template JSON mais absente du dossier `sections/`
- Type de bloc utilisé dans le template mais non déclaré dans le schéma
- Dépassement des limites Shopify (nombre de blocs, taille de fichier)
- `{{ block.shopify_attributes }}` manquant sur le wrapper → glisser-déposer cassé

**Premier réflexe.** `shopify theme check`, puis valider le JSON du schéma isolément.

---

## 5. Templates JSON

**Symptôme.** Page blanche, sections dans le désordre, ordre non modifiable, contenu perdu.

**Causes**
- JSON malformé
- `"type"` pointant vers une section qui n'existe plus
- `order` contenant un identifiant absent de `sections`
- Fusion Git ayant produit un JSON syntaxiquement valide mais incohérent
- Réglages écrasés par un `theme push` incluant `config/settings_data.json`

**Premier réflexe.** Valider le JSON, puis vérifier que chaque `type` correspond à un fichier réel.

---

## 6. Panier — Cart AJAX

La famille la plus fréquente et la plus coûteuse.

**Symptômes.** Le bouton « ajouter au panier » ne fait rien ; le compteur ne se met pas à jour ; le drawer s'ouvre vide ; « quantité indisponible » à tort ; double ajout.

**Causes fréquentes**
- **URL non localisée.** Un `fetch('/cart/add.js')` en dur casse sur les boutiques multi-marchés ou multi-langues. Shopify impose des URL conscientes de la locale : il faut utiliser `window.Shopify.routes.root`.
- **Mauvais endpoint.** `add.js` pour ajouter, `change.js` pour modifier une ligne existante, `update.js` pour des mises à jour groupées. `update.js` avec un `variant_id` déjà présent en plusieurs exemplaires ne modifie que la **première** ligne correspondante — source classique de « la quantité ne change pas ».
- **Clé de ligne vs ID de variante.** `change.js` attend la `key` de la ligne, pas l'ID de variante, dès qu'un produit apparaît plusieurs fois (propriétés différentes, bundles).
- **Réponse d'erreur non gérée.** L'API renvoie un statut d'erreur avec un message ; un `.then()` sans vérification affiche un panier vide au lieu du message.
- **Double liaison d'événement.** Le thème et une application écoutent tous deux le clic → deux requêtes.
- **Rendu de sections groupé.** En passant `sections` dans la requête, le HTML retourné dépend du contexte de la page appelante ; un sélecteur qui n'existe pas dans ce contexte produit un drawer vide.

**Premier réflexe.** Onglet Network, filtrer sur `cart`, cliquer sur le bouton. Regarder le **statut**, le **payload envoyé** et la **réponse**. Le bug est presque toujours visible là.

---

## 7. Section Rendering API

**Symptôme.** Une zone se met à jour en HTML vide après une action (filtre, changement de panier, pagination).

**Points clés.** Une section qui échoue à rendre est retournée `null` **dans une réponse HTTP 200**. Le code du thème qui ne teste pas `null` injecte alors du vide. Une requête par `section_id` sur une section inexistante renvoie en revanche un 404.

**Causes**
- Identifiant de section erroné après un renommage
- Section absente du template dans lequel le rendu est demandé
- Absence de gestion du cas `null`

**Premier réflexe.** Network → inspecter la réponse JSON : les sections y sont-elles `null` ?

---

## 8. Page produit et variantes

**Symptômes.** Prix qui ne se met pas à jour, image qui ne change pas, variante indisponible sélectionnable, bouton grisé à tort, URL sans `?variant=`.

**Causes**
- JSON produit inline mal formé ou tronqué
- Sélecteur JS ciblant une classe modifiée par une intervention précédente
- Option combinée indisponible non gérée
- Metafield attendu absent sur certains produits seulement
- Application de bundles ou d'abonnements qui réécrit le formulaire

**Premier réflexe.** Le bug existe-t-il sur **tous** les produits ? Si non, c'est une donnée, pas du code.

---

## 9. Collections, filtres, tri, pagination

**Symptômes.** Filtres sans effet, résultats vides, pagination qui ramène toujours la même page, produits manquants.

**Causes**
- Paramètres d'URL perdus lors d'une navigation AJAX
- `{% paginate %}` absent ou mal positionné
- Filtres Shopify natifs mélangés avec ceux d'une application de recherche
- Boucle limitée à 50
- Produits non publiés sur le canal Boutique en ligne — **pas un bug de thème**

**Premier réflexe.** Reproduire sans JavaScript (navigation classique avec paramètres d'URL). Si ça marche, le bug est dans le JS.

---

## 10. Conflits d'applications

**Symptômes.** Deux widgets qui se superposent, un élément qui disparaît après une seconde, un bouton qui déclenche deux actions, une erreur JS venant d'un domaine tiers.

**Causes**
- Deux applications qui écoutent le même événement
- Une application qui remplace le formulaire produit
- Dépendance à une variable globale (`window.jQuery`) supprimée ou chargée après
- Ordre de chargement modifié
- Code résiduel d'une application désinstallée

**Premier réflexe.** Console : quelle **origine** émet l'erreur ? Si c'est `cdn.appname.com`, ce n'est pas ton thème.

**Ce que tu peux faire.** Identifier, documenter, contourner côté thème quand c'est possible. **Ce que tu ne peux pas faire :** corriger le code de l'application.

---

## 11. Bugs propres au Theme Editor

**Symptôme.** Le site fonctionne parfaitement en ligne, mais dans l'éditeur une section est vide, un carrousel ne s'initialise pas, un accordéon ne s'ouvre pas.

**Cause.** L'éditeur recharge les sections **dynamiquement**, sans rechargement de page. Un script initialisé uniquement sur `DOMContentLoaded` ne se relance jamais.

**Solution.** Écouter les événements émis par l'éditeur : `shopify:section:load`, `shopify:section:unload`, `shopify:section:select`, `shopify:section:deselect`, `shopify:section:reorder`, `shopify:block:select`, `shopify:block:deselect`.

Détection du contexte : `{% if request.design_mode %}` en Liquid, `if (Shopify.designMode)` en JavaScript.

⚠️ À ne pas détourner : ces variables servent à adapter le comportement du code, **pas** à afficher un rendu différent de celui que verront les acheteurs.

---

## 12. Metafields, metaobjects, sources dynamiques

**Symptômes.** Champ vide sur certains produits, `[object Object]` affiché, réglage dynamique impossible à connecter dans l'éditeur.

**Causes**
- Sortie de l'objet metafield au lieu de sa valeur
- Type de metafield changé après coup (texte → rich text, etc.)
- Metafield renseigné sur certains produits seulement, sans garde `{% if %}`
- Type de réglage incompatible avec le type du metafield → connexion impossible
- Metaobject référencé mais non publié

**Premier réflexe.** `shopify theme console --url /products/xxx` puis inspecter l'objet réel. C'est l'usage où le REPL fait gagner le plus de temps.

---

## 13. JavaScript

**Symptômes.** Rien ne se passe au clic, erreur console, comportement aléatoire selon la vitesse de chargement.

**Causes**
- Sélecteur ne correspondant plus au HTML après une modification
- Script exécuté avant l'existence de l'élément
- Écouteur posé sur un élément injecté ultérieurement → délégation nécessaire
- Erreur JS antérieure qui interrompt tout le script suivant
- Collision de variables globales (d'où la recommandation Shopify d'encapsuler en IIFE)
- Syntaxe non supportée par le Safari du client

**Premier réflexe.** La **première** erreur de la console, pas la dernière. Les suivantes sont souvent des conséquences.

---

## 14. Responsive et affichage mobile

**Symptômes.** Débordement horizontal, bouton inatteignable, texte tronqué, élément superposé, comportement différent sur iOS.

**Causes**
- Largeur fixe en pixels dans un conteneur fluide
- `overflow: hidden` masquant un élément interactif
- `100vh` sur mobile : la barre d'adresse iOS modifie la hauteur réelle
- Spécificité CSS : une règle d'application qui écrase celle du thème
- `position: fixed` et clavier virtuel sur iOS
- Zone tactile trop petite ou recouverte par un élément invisible

**Premier réflexe.** Appareil réel. L'émulateur ne reproduit ni le moteur Safari, ni le clavier virtuel, ni le comportement de la barre d'adresse.

---

## 15. Régressions après mise à jour de thème

**Symptôme.** « Depuis la mise à jour, plus rien ne marche comme avant. »

**Cause.** Les personnalisations faites directement dans les fichiers du thème sont écrasées par la mise à jour. Sans Git ni sauvegarde, elles sont perdues.

**Méthode.** Comparer l'ancien thème (s'il existe encore sur le store) avec le nouveau, fichier par fichier, et réappliquer les personnalisations une par une, en commits séparés. C'est long, c'est facturable, et c'est l'occasion de vendre la mise en place d'un versionnage.

**Premier réflexe.** L'ancien thème est-il encore présent dans la bibliothèque de thèmes ? S'il a été supprimé, le dire tout de suite au client : la reconstitution sera une reconstruction, pas une restauration.

---

## Table de décision rapide

| Observation | Direction |
|---|---|
| Erreur console venant d'un domaine tiers | Application, pas ton thème |
| Bug sur un seul produit | Donnée, pas code |
| Exactement 50 éléments affichés | Limite de boucle Liquid |
| Marche en ligne, casse dans l'éditeur | Événements `shopify:section:*` |
| Marche en navigation privée | Cache, extension, ou session |
| Requête `cart/*.js` en erreur dans Network | Cart AJAX — la réponse contient le message |
| Section vide après une action AJAX | Section Rendering — vérifier les `null` |
| « This section is not available » | Schéma ou template JSON invalide |
| Zone vide dans un snippet | Scope de `{% render %}` |
| Casse seulement sur iPhone | Safari — appareil réel obligatoire |
| Casse depuis la mise à jour du thème | Personnalisations écrasées |
