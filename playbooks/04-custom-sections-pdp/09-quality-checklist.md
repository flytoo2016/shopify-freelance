# 09 — Quality Checklist

Un composant qui « marche chez toi » n'est pas un composant livrable. Il doit marcher chez un marchand qui ne l'a pas conçu, sur un contenu que tu n'as pas prévu, dans un éditeur que tu n'as pas testé.

---

## A. Les trois cercles

### Cercle 1 — Fonctionnel, cas limites d'abord

Ne teste pas d'abord le cas nominal : il fonctionne, tu viens de le construire. Teste ce qui va casser.

```
[ ] AUCUN réglage renseigné → rendu propre, pas d'erreur, pas de zone vide bancale
[ ] Un seul bloc
[ ] Nombre maximum de blocs (max_blocks atteint)
[ ] Texte de 300 caractères dans un champ prévu pour 30
[ ] Texte d'un seul caractère
[ ] Image absente
[ ] Image au mauvais ratio (très haute, très large)
[ ] Produit sans le metafield attendu
[ ] Produit sans variante / à 1 option / à 3 options
[ ] Produit en rupture totale
[ ] Marché secondaire : autre devise, autre langue
[ ] Contenu contenant des apostrophes et des guillemets
```

Les trois premiers points attrapent la majorité des défauts. **Le test « aucun réglage renseigné » est celui que personne ne fait et qui casse le plus souvent** : le marchand ajoute la section, ne remplit rien, et voit une page blanche ou une erreur Liquid.

### Cercle 2 — Theme Editor

C'est ici que se produisent la majorité des livraisons ratées de cette phase.

```
[ ] La section apparaît dans le sélecteur d'ajout de sections
[ ] Ajout de la section
[ ] Déplacement vers le haut, vers le bas
[ ] Déplacement en 1re position (cas de bord : section.index change)
[ ] Duplication
[ ] Suppression
[ ] Masquer puis réafficher
[ ] Ajout de chaque type de bloc
[ ] Réordonnancement des blocs par glisser-déposer
[ ] Suppression d'un bloc
[ ] Suppression de TOUS les blocs → le rendu tient-il ?
[ ] Chaque réglage produit l'effet annoncé
[ ] L'aperçu se met à jour sans rechargement complet
[ ] Le JavaScript se réinitialise après un rechargement de section
[ ] Aucun message « This section is not available »
[ ] Clic sur un bloc → il est bien surligné dans l'aperçu
```

L'avant-dernier point vérifie `{{ block.shopify_attributes }}`. Le dernier vérifie l'écoute de `shopify:section:load`.

### Cercle 3 — Non-régression

```
[ ] Parcours d'achat complet : produit → panier → écran de paiement
[ ] Aucune nouvelle erreur en console (comparée à la baseline avant ajout)
[ ] Lighthouse mobile avant/après : aucune dégradation mesurable
[ ] Aucun décalage visuel introduit (CLS)
[ ] Les autres sections de la page fonctionnent toujours
[ ] Le composant ne casse pas quand une application injecte du contenu à côté
```

---

## B. Matrice d'environnements

| Priorité | Environnement | Ce qu'il révèle |
|---|---|---|
| **Obligatoire** | iPhone réel (Safari) | Comportements CSS/JS divergents, clavier virtuel, `100vh` |
| **Obligatoire** | Chrome desktop | Référence |
| **Obligatoire** | Chrome Android ou émulation mobile | Majorité du trafic |
| **Obligatoire** | Theme Editor (desktop) | Le juge final |
| Recommandé | Safari macOS | |
| Recommandé | Firefox | |
| Si multi-marché | Chaque marché actif | Devise, langue, format de prix |

**Largeurs à tester : 320 · 375 · 768 · 1024 · 1440 px.** Le 320 px reste utile : c'est là que les débordements horizontaux apparaissent.

---

## C. Tests spécifiques par type de composant

| Type | Tests supplémentaires |
|---|---|
| **Carrousel / slider** | 1 seul élément, 2 éléments, 20 éléments · défilement tactile · navigation clavier · sans JS |
| **Accordéon** | Tous fermés, tous ouverts · un seul élément · navigation clavier · `aria-expanded` |
| **Onglets** | Sur mobile : empilés ou masqués ? · lien direct vers un onglet |
| **Formulaire** | Champs vides · saisie invalide · message d'erreur · double soumission |
| **Composant lisant des metafields** | Produit avec / sans la donnée · donnée vide · type inattendu |
| **Composant lié aux variantes** | Changement de variante · combinaison indisponible · variante en rupture |
| **Composant de panier** | Panier vide · plein · même variante en double · chaque marché |
| **Table / grille** | Contenu très long dans une cellule · débordement mobile · lecture au lecteur d'écran |

---

## D. QUALITY GATE — Phase 4

Bloquant. Une seule condition critique en échec → **STOP DELIVERY**.

### CRITIQUES

```
[ ] C1  shopify theme check --fail-level error → 0 erreur
[ ] C2  Rendu correct avec TOUS les réglages vides
[ ] C3  presets présent dans le schéma
[ ] C4  Chaque réglage a une valeur par défaut
[ ] C5  {{ block.shopify_attributes }} sur chaque wrapper de bloc
[ ] C6  Theme Editor : ajout, déplacement, duplication, suppression OK
[ ] C7  Le composant se rend entièrement sans JavaScript
[ ] C8  Aucune nouvelle erreur console
[ ] C9  Parcours d'achat intact
[ ] C10 Aucun id de réglage existant modifié
[ ] C11 Testé sur iPhone réel
[ ] C12 Aucun code de débogage résiduel
[ ] C13 enabled_on OU disabled_on, jamais les deux
```

### STANDARD

```
[ ] 14  Contenus extrêmes testés (300 caractères, image absente, 1 bloc, max)
[ ] 15  Navigation clavier complète, focus visible
[ ] 16  Contraste vérifié
[ ] 17  Cibles tactiles ≥ 44 px
[ ] 18  Aucun texte en dur non traduisible
[ ] 19  Aucune régression Lighthouse
[ ] 20  Aucun débordement horizontal à 320 px
[ ] 21  prefers-reduced-motion respecté
[ ] 22  Guide marchand rédigé avec captures
[ ] 23  Composant anonymisé et versé à shopify-components/
[ ] 24  git diff relu ligne par ligne
```

### Prompt d'exécution

```
Exécute le Quality Gate de 09-quality-checklist.md sur ce composant.

Pour chaque condition automatisable (C1, C3, C4, C5, C10, C12, C13, 18, 24) :
vérifie réellement — commande ou lecture de code, ne suppose rien.
Réponds PASS / FAIL, et pour chaque FAIL donne fichier:ligne et la correction.

Pour les conditions manuelles, produis la liste exacte de ce que je dois tester,
adaptée au type de composant : {{type}}.

Si une condition CRITIQUE échoue, écris **STOP DELIVERY** en tête de ta réponse
et n'aborde pas le reste.
```

---

## E. Le test du thème vierge

Avant de verser un composant à ta bibliothèque, un dernier contrôle :

```
[ ] Copier le fichier dans un thème Dawn / Skeleton neuf
[ ] L'ajouter depuis le Theme Editor
[ ] Vérifier qu'il se rend correctement sans aucune adaptation
[ ] Chronométrer le temps d'adaptation nécessaire, s'il y en a
```

Ce chronomètre est ta marge future. Un composant qui s'installe en 20 minutes sur un thème inconnu peut se vendre 600 € ; un composant qui demande trois heures d'adaptation à chaque fois n'est pas réellement réutilisable — corrige-le maintenant, pendant que tu l'as en tête.

---

## F. Après publication

| Moment | Action |
|---|---|
| H+0 | Publier à heure creuse. Vérifier le composant sur le site en ligne, mobile réel |
| H+0 | Parcours d'achat complet |
| H+1 | Vérifier que les commandes continuent d'arriver normalement |
| J+1 | Message : « avez-vous pu tester les réglages de votre côté ? » |
| J+3 | Contrôle silencieux : le composant est-il utilisé ? Le contenu a-t-il été rempli ? |
| J+7 | Point de fin de garantie · proposer le composant suivant |

Le contrôle du J+3 est le plus instructif : **si le client n'a rien rempli, c'est que ton guide marchand n'a pas fonctionné.** C'est une information sur ta documentation, pas sur le client — et c'est corrigeable avant que ça ne se reproduise sur la mission suivante.
