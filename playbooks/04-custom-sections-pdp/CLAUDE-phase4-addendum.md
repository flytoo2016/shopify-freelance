# CLAUDE.md — Addendum Phase 4 (Build)

> À ajouter au `CLAUDE.md` de la Phase 1, qui reste intégralement en vigueur.

---

## CONTEXTE

En mission de construction, il n'y a rien à casser au départ — mais il y a tout à inventer. Le risque n'est plus la régression : c'est de **produire quelque chose de propre qui répond à un besoin qui n'existe pas**.

---

## RÈGLE FONDAMENTALE

**Tu n'inventes pas le besoin. Tu exécutes une spécification validée.**

Face à une demande vague, tu es capable de produire un composant complet, élégant et cohérent — répondant à un besoin que tu as toi-même comblé. C'est le mode d'échec propre à cette phase, et il ne se détecte qu'à la livraison.

Si la spécification est absente ou incomplète : **tu poses les questions manquantes, tu ne combles pas les trous.**

---

## LES NEUF RÈGLES DE LA CONSTRUCTION

1. **Pas de spec validée, pas de code.** Tu demandes le document. S'il manque une décision, tu la signales au lieu de la prendre.

2. **Le schéma avant le Liquid.** C'est le contrat avec le marchand. Écrire le Liquid d'abord produit un schéma bricolé après coup.

3. **Vérifie chaque type de réglage, chaque objet et chaque filtre** via le Dev MCP avant de l'écrire. C'est le terrain d'hallucination le plus fertile du métier Shopify, et l'échec est **silencieux** : une section avec un type inventé n'apparaît simplement pas dans l'éditeur, sans message clair.

4. **Le composant se rend entièrement sans JavaScript.** Le JS améliore, il ne conditionne pas. Si le rendu dépend du JS, la conception est à revoir.

5. **Une garde `{% if %}` sur chaque donnée.** Sans exception. Le cas « aucun réglage renseigné » doit produire un rendu propre.

6. **`{{ block.shopify_attributes }}` sur chaque wrapper de bloc**, et écoute de `shopify:section:load` / `unload` pour tout code initialisé au chargement. Sans ces deux points, le composant est cassé dans le Theme Editor — le mode d'échec n°1 de cette phase.

7. **Aucun texte en dur.** Réglage, ou clé de traduction. Toujours.

8. **Les `id` de réglages sont définitifs.** Les renommer détruit le contenu du marchand. Si un renommage semble nécessaire, tu t'arrêtes et tu préviens.

9. **Une couche à la fois.** Schéma, puis Liquid, puis CSS, puis JS. Jamais les quatre en une passe : le diff devient illisible et aucune couche n'est testable séparément.

---

## INTERDITS SPÉCIFIQUES

- **Ne jamais générer un composant complet à partir d'une demande d'une phrase.** Demande la spec.
- **Ne jamais utiliser `enabled_on` et `disabled_on` ensemble.**
- **Ne jamais omettre `presets`** — sans lui, le marchand ne peut pas ajouter la section.
- **Ne jamais omettre les valeurs par défaut** — la section paraîtrait cassée à l'ajout.
- **Ne jamais ajouter une bibliothèque tierce, un framework ou un polyfill.**
- **Ne jamais écrire du Liquid dans `{% stylesheet %}`** — il n'y est pas interprété. Passer par une variable CSS posée dans le HTML.
- **Ne jamais insérer une valeur dans un attribut HTML sans `| escape`.**
- **Ne jamais réutiliser un composant de bibliothèque sans vérifier qu'aucune trace du client précédent ne subsiste** (nom de classe, texte par défaut, URL).
- **Ne jamais promettre un effet sur la conversion.**

---

## RAPPELS D'ARCHITECTURE

| Point | Règle |
|---|---|
| Theme blocks | Dossier `blocks/`, réutilisables, rendus par `{% content_for 'blocks' %}` |
| Imbrication | Jusqu'à 8 niveaux, hors niveau section |
| Blocks locaux | Définissables **uniquement** dans une section, pas dans un theme block |
| `@theme` / `@app` | Types génériques dans l'attribut `blocks` d'un schéma |
| `@app` | N'accepte **pas** le paramètre `limit` |
| App blocks | Non supportés dans les sections rendues statiquement |
| Limite de blocks | 50 par section, abaissable via `max_blocks` |
| `{% schema %}` | Un seul par fichier, uniquement dans `sections/` ou `blocks/` |
| Sources dynamiques | Le type du réglage doit être compatible avec le type du metafield |
| Boucle `for` | S'arrête à 50 itérations sans `{% paginate %}` |
| `{% render %}` | Scope isolé : passer les variables en paramètre |
| Liquid | Ni parenthèses dans les conditions, ni opérateur ternaire |

---

## CE QUE LE THÈME NE PEUT PAS FAIRE

Si la demande relève de cette liste, **dis-le immédiatement** au lieu de chercher un contournement :

- Calculer une remise personnalisée → Shopify Functions
- Modifier le checkout → extensions de checkout
- Écrire une donnée produit depuis la boutique → application
- Appeler une API externe avec des identifiants → application (les clés seraient exposées dans le code du thème, donc publiques)
- Envoyer un e-mail → application ou Shopify Flow
- Gérer des abonnements → application
- Stocker durablement une saisie visiteur → application

---

## FORMAT DE RÉPONSE ATTENDU

En phase d'architecture :

```
SPEC FOURNIE      ce qu'elle contient
MANQUANT          les décisions que la spec ne permet pas de trancher

DÉCISION 1  section / theme block / snippet  → {{choix}} car {{raison}}
DÉCISION 2  données                          → {{choix}} car {{raison}}
DÉCISION 3  blocks + max_blocks              → {{choix}}
DÉCISION 4  enabled_on / disabled_on         → {{valeur}}
DÉCISION 5  réutilisable ?                   → {{ce qui doit être paramétrable}}

QUESTIONS À REPOSER AU CLIENT
1. …
```

En phase de construction :

```
COUCHE          schéma / Liquid / CSS / JS
CE QUI CHANGE   …
VÉRIFIÉ VIA MCP les types, objets et filtres contrôlés
RENDU ATTENDU   avec réglages vides / contenu maximal / texte très long
À TESTER        la liste manuelle, adaptée au type de composant
```

---

## EN CAS DE DOUTE

Tu t'arrêtes et tu demandes. Sur une construction, une hypothèse non signalée ne provoque aucune erreur visible — elle provoque un composant livré qui n'est pas celui qu'on attendait, découvert au moment où il est trop tard pour le refacturer.
