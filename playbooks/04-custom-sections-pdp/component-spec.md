# Spécification de composant — modèle

À copier dans `clients/{{client}}/03_design/component-spec.md`.
**Ce document est validé par écrit avant toute ligne de code.** C'est ta seule protection contre la dérive de périmètre.

---

# Spécification — {{Composant}} — {{Client}} — {{Date}}

## Problème business
{{Ce que le client cherche à obtenir. Pas la solution qu'il a demandée.}}

## Ce que fait le composant
{{Une phrase, compréhensible par le décideur qui ne lira que celle-ci.}}

## Indicateur visé
{{Ce qui devrait bouger, et comment on le saura. Si aucune réponse : l'écrire.}}

---

## Comportement attendu

### Cas nominal
{{Description ordonnée de ce que voit et fait le visiteur.}}

### Cas limites
| Situation | Comportement attendu |
|---|---|
| Aucun contenu renseigné | |
| Un seul élément | |
| Nombre maximum d'éléments | |
| Texte très long (300 caractères) | |
| Texte très court | |
| Image absente | |
| Image au mauvais ratio | |
| Donnée produit manquante | |
| Produit en rupture | |
| Marché secondaire / autre langue | |

---

## Ce que le marchand pourra modifier

| Élément | Type de réglage | Valeur par défaut | Fréquence de modification |
|---|---|---|---|

## Ce qu'il ne pourra PAS modifier, et pourquoi
{{Protéger la structure, c'est protéger le client de lui-même. Assume-le et
explique-le : c'est un argument de qualité, pas une limitation.}}

---

## Données

| Donnée | Source | Existe déjà ? | Qui la saisit | Comportement si absente |
|---|---|---|---|---|

**Temps de saisie estimé côté client :** {{n}} min × {{N}} produits = {{total}}
{{Si ce total est important, décider maintenant : le client le fait, ou c'est
une prestation à chiffrer. Ne pas laisser cette question ouverte — c'est la
cause n°1 de dérive de délai.}}

---

## Architecture retenue

| Décision | Choix | Justification |
|---|---|---|
| Type | section / theme block / snippet | |
| Blocks | locaux / theme blocks / aucun | |
| `max_blocks` | | |
| Templates | `enabled_on` / `disabled_on` : {{valeur}} | |
| Données | réglages / metafields / metaobjects | |
| Réutilisable | oui / non | |

---

## Comportement responsive

| Largeur | Comportement |
|---|---|
| 375 px | |
| 750 px | |
| ≥ 990 px | |

## Dégradation sans JavaScript
{{Ce qui fonctionne, ce qui se dégrade, et si c'est acceptable.}}

## Accessibilité
{{Ordre de tabulation · ce qu'annonce un lecteur d'écran · contraste retenu}}

---

## Ce qui n'est pas inclus
{{Explicite. La section la plus utile du document.}}

## Ce qui doit exister de votre côté avant la livraison
| Élément | Qui | Pour le |
|---|---|---|

---

## Calendrier
| Étape | Date |
|---|---|
| Validation de cette spécification | |
| Livraison de l'aperçu | |
| Retours client | |
| Publication | |

## Prix et modalités
{{Montant · échéancier · garantie}}

---

## Validation

Validé par **{{nom}}** le **{{date}}**, par écrit ({{e-mail / message du {{date}}}}).

Toute demande apparue après cette validation fera l'objet d'un devis séparé.
Cela ne signifie pas un refus : cela signifie un chiffrage, pour que le délai et
la qualité des tests ne soient pas rognés silencieusement.

---

## Contrôle avant envoi au client

```
[ ] Le problème business est formulé, pas seulement la demande
[ ] Chaque cas limite a une réponse écrite
[ ] Le cas « aucun contenu renseigné » est traité
[ ] Chaque réglage a une valeur par défaut
[ ] La question « les données existent-elles déjà » est tranchée
[ ] Le temps de saisie côté client est chiffré et attribué
[ ] L'architecture est justifiée, pas seulement affirmée
[ ] Le comportement mobile est décrit, pas déduit
[ ] La section « non inclus » est explicite
[ ] Une personne non technique peut dire ce que fera le composant
```
