# 10 — Documentation & Handoff

Sept livrables. Mais le seul qui détermine si ton travail sert à quelque chose est le **guide marchand** — et c'est celui que presque personne ne produit.

| Livrable | Quand | Lecteur | Longueur |
|---|---|---|---|
| `ux-spec.md` | Avant le code | Client | 2–4 p. |
| `component-spec.md` | **Avant le code, validé par écrit** | Client | 2–5 p. |
| `conversion-strategy.md` | Avant le code (page produit) | Client | 3–6 p. |
| `technical-spec.md` | Pendant | Développeur suivant | 2–4 p. |
| `implementation.md` | À la livraison | Développeur suivant | 2–3 p. |
| `qa-report.md` | À la livraison | Client | 1–2 p. |
| `delivery.md` | À la livraison | Client | 1 p. |
| **Guide marchand** | À la livraison | **Le marchand** | **1 p.** |

---

## 1. component-spec.md — le document qui te protège

C'est le seul livrable **validé par écrit avant le code**. Sans lui, la dérive de périmètre est certaine.

```markdown
# Spécification — {{Composant}} — {{Client}} — {{Date}}

## Problème business
{{Ce que le client cherche à obtenir. Pas la solution demandée.}}

## Ce que fait le composant
{{Une phrase, compréhensible par le décideur qui n'a pas lu le reste.}}

## Comportement attendu
### Cas nominal
{{...}}
### Cas limites
| Situation | Comportement attendu |
|---|---|
| Aucun contenu renseigné | |
| Un seul élément | |
| Nombre maximum d'éléments | |
| Texte très long | |
| Image absente | |
| Donnée produit manquante | |

## Ce que le marchand pourra modifier
| Élément | Type de réglage | Valeur par défaut |
|---|---|---|

## Ce qu'il ne pourra PAS modifier, et pourquoi
{{Protéger la structure, c'est protéger le client de lui-même. Assume-le.}}

## Données
| Donnée | Source | Existe déjà ? | Qui la saisit | Si absente |
|---|---|---|---|---|

## Architecture retenue
Type : section / theme block / snippet — {{justification}}
Templates : enabled_on / disabled_on — {{valeur}}
Blocks : {{types, max_blocks}}
Données : {{réglages / metafields / metaobjects}}

## Comportement responsive
375 px : {{...}} · 750 px : {{...}} · ≥ 990 px : {{...}}

## Ce qui n'est pas inclus
{{Explicite. C'est la section la plus utile du document.}}

## Ce qui doit exister de votre côté avant la livraison
{{Contenus, données, décisions. Avec une date.}}

## Validation
Validé par {{nom}} le {{date}}.
Toute demande hors de ce périmètre fera l'objet d'un devis séparé — ce qui ne
signifie pas un refus, mais un chiffrage.
```

**La phrase de validation compte autant que le reste.** Formulée ainsi, elle ne ferme pas la porte, elle établit une règle. Un client qui a lu et validé ce document ne conteste pas un devis complémentaire trois semaines plus tard.

---

## 2. Le guide marchand — le livrable décisif

Une page. Des captures. Zéro jargon.

```markdown
# {{Nom du composant}} — Guide d'utilisation

## Où le trouver
Boutique en ligne → Thèmes → Personnaliser → {{template}}
→ Ajouter une section → « {{Nom}} »

[CAPTURE 1 : le sélecteur de sections, avec le composant entouré]

## Ce que vous pouvez modifier

| Réglage | Ce qu'il fait | Conseil |
|---|---|---|
| Titre | Le texte affiché en haut | Court : 40 caractères maximum sur mobile |
| Disposition mobile | En ligne ou en colonne | « En ligne » convient jusqu'à 3 éléments |
| Espace au-dessus | Marge avant le composant | 24 px correspond au reste de votre thème |

[CAPTURE 2 : le panneau de réglages]

## Ajouter ou retirer un élément
1. Cliquez sur la section dans la colonne de gauche
2. « Ajouter un bloc » → « {{Nom du bloc}} »
3. Glissez-déposez pour réordonner
4. L'icône corbeille supprime un bloc

Maximum : {{n}} éléments. Au-delà, l'affichage devient illisible sur téléphone.

[CAPTURE 3 : la liste des blocs]

## Où mettre à jour les informations produit
{{Si le composant lit des metafields :}}
Produits → {{produit}} → faites défiler jusqu'à « Métachamps »
→ « {{nom du champ}} »

[CAPTURE 4]

Si ce champ est vide pour un produit, la zone n'apparaîtra simplement pas sur
ce produit — rien ne sera cassé.

## À éviter
- {{Ce qui casse la mise en page, et ce qui se passe alors}}
- Modifier l'ordre des blocs de la page produit sans raison : l'ordre actuel
  place le prix et les avis avant le premier défilement sur téléphone, ce qui
  était l'objet de la mission

## En cas de problème
{{Contact}} — garantie jusqu'au {{date}}
```

**Pourquoi c'est le livrable le plus important.** Un composant que le marchand n'ose pas toucher est un composant qui reste dans son état initial pour toujours. Il ne verra jamais sa valeur, il ne te recommandera pas, et il ne commandera pas le suivant. Une page de documentation coûte trente minutes et double la probabilité d'une deuxième mission.

**Le contrôle du J+3** (voir `09-quality-checklist.md`) mesure directement l'efficacité de ce guide : si le client n'a rien rempli trois jours après la livraison, c'est ta documentation qui est en cause, pas lui.

---

## 3. technical-spec.md et implementation.md

Écrits pour le développeur suivant — qui sera peut-être toi dans dix-huit mois.

```markdown
# Implémentation — {{Composant}}

## Fichiers
| Fichier | Rôle |
|---|---|
| sections/{{nom}}.liquid | Section, schéma, styles scopés |
| blocks/{{nom}}.liquid | Theme block, si applicable |
| assets/{{nom}}.js | Amélioration progressive |
| locales/*.json | Clés ajoutées : {{liste}} |

## Architecture
{{Section / theme block / snippet et pourquoi}}
{{Blocks : locaux ou theme blocks, max_blocks}}
{{Templates : enabled_on / disabled_on}}

## Données lues
| Objet | Chemin | Comportement si absent |
|---|---|---|

## Dépendances
Aucune bibliothèque externe.
{{Ou : dépend de {{X}} déjà présent dans le thème, ligne {{Y}}}}

## Ce qui se dégrade sans JavaScript
{{Explicite}}

## Points d'attention pour une modification future
- Les ids de réglages sont utilisés dans les données du marchand : ne pas les
  renommer sans prévoir la perte de contenu
- {{Autres pièges rencontrés pendant la construction}}

## Commits
{{git log --oneline}}
```

La section « points d'attention » est celle qui a le plus de valeur dans deux ans. Note tout ce qui t'a surpris pendant la construction.

---

## 4. qa-report.md

```markdown
# Rapport de tests — {{Composant}} — {{Date}}

## Cas limites vérifiés
| Cas | Résultat |
|---|---|
| Aucun réglage renseigné | ✅ La section ne s'affiche pas, aucune erreur |
| 1 bloc / {{max}} blocs | ✅ |
| Texte de 300 caractères | ✅ Retour à la ligne, pas de débordement |
| Image absente | ✅ Zone masquée |
| Produit sans metafield | ✅ Bloc masqué |

## Environnements
| Environnement | Rendu | Interactions | Theme Editor |
|---|---|---|---|
| Safari iOS (appareil réel) | ✅ | ✅ | — |
| Chrome Android | ✅ | ✅ | — |
| Chrome desktop | ✅ | ✅ | ✅ |
| Safari macOS | ✅ | ✅ | — |
| Firefox | ✅ | ✅ | — |

## Theme Editor
Ajout ✅ · Déplacement ✅ · 1re position ✅ · Duplication ✅ · Suppression ✅
Ajout/suppression/réordonnancement de blocs ✅ · Aperçu en direct ✅

## Sans JavaScript
{{Ce qui fonctionne, ce qui se dégrade}}

## Accessibilité
Navigation clavier ✅ · Focus visible ✅ · Contraste {{ratio}} ✅

## Performance
| | Avant | Après |
|---|---|---|
| LCP mobile (médiane de 3) | | |
| Poids de la page | | |
| Requêtes | | |
Conditions : {{identiques avant/après, détaillées}}
```

---

## 5. delivery.md — le message de livraison

```markdown
Bonjour {{Prénom}},

Le composant est prêt. Voici comment le voir et le tester.

**Aperçu :** {{lien}}
Rien n'est publié sur votre boutique tant que vous ne m'aurez pas donné votre
accord.

**Ce que je vous propose de faire maintenant (10 minutes) :**
Ouvrez le personnalisateur sur ce thème d'aperçu et modifiez vous-même deux ou
trois réglages. C'est le meilleur moyen de vérifier que ça correspond à ce que
vous vouliez — et de constater ce que vous pourrez changer sans moi.
Le guide ci-joint indique où tout se trouve.

**Ce que le composant fait :** {{2-3 phrases, sans jargon}}

**Ce que vous pouvez modifier vous-même :** {{liste courte}}

**Ce qui reste de votre côté :** {{données à saisir, contenus à produire}}

**Testé sur :** {{n}} navigateurs, iPhone réel, et dans l'éditeur de thème
(ajout, déplacement, suppression). Détail dans le rapport de tests joint.

**Documents joints :** guide d'utilisation, rapport de tests, note technique.

Dites-moi quand publier — je le fais à une heure creuse et je reste disponible
{{durée de garantie}}.

{{Nom}}
```

**Le paragraphe « ce que je vous propose de faire maintenant » est le plus important du message.** Un composant validé sur capture d'écran révèle ses défauts trois semaines plus tard, quand la garantie est écoulée. Un composant que le client a lui-même manipulé est validé pour de bon.

---

## 6. Verser à la bibliothèque

Dernière étape de chaque mission, jamais reportée :

```
[ ] Copier le composant dans shopify-components/{{type}}/{{nom}}/
[ ] Retirer TOUTE trace du client :
    grep -rni "nomclient\|marque\|myshopify.com" shopify-components/{{nom}}/
[ ] Remplacer les valeurs par défaut par des exemples génériques
[ ] Écrire un README : ce que fait le composant, ses réglages, ses dépendances,
    son prix de vente indicatif
[ ] Tester l'installation sur un thème Dawn/Skeleton vierge
[ ] Chronométrer le temps d'adaptation → noter dans le README
```

Le chronomètre de la dernière ligne est la donnée la plus précieuse de tout ton système : c'est elle qui te dira, dans un an, quel devis de 1 200 € représente trois heures de travail réel.
