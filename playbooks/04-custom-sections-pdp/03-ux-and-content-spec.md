# 03 — UX & Content Spec

La spécification UX se rédige **avant** la spécification technique, et les deux se rédigent avant le code. Une heure passée ici en économise cinq plus tard.

---

## A. Mobile-first, littéralement

Ne « pense » pas mobile-first : **conçois d'abord la version 375 px, puis élargis.** La différence est réelle. Une conception desktop adaptée ensuite au mobile produit systématiquement des compromis ; une conception mobile élargie produit une version desktop propre.

Contraintes à poser dès le départ :

```
[ ] Largeur de référence : 375 px
[ ] Que voit-on sans défiler ?
[ ] Combien de défilements avant l'action principale ?
[ ] Cibles tactiles ≥ 44 px, espacées d'au moins 8 px
[ ] Aucune interaction dépendant du survol
[ ] Texte ≥ 16 px sur les champs de formulaire (évite le zoom automatique iOS)
[ ] Aucun débordement horizontal
```

---

## B. Hiérarchie du contenu

Trois niveaux, et un seul par composant pour le premier :

| Niveau | Rôle | Combien |
|---|---|---|
| **Primaire** | Ce qui doit être compris en 2 secondes | **Un seul élément** |
| **Secondaire** | Ce qui appuie ou précise | 2 à 4 éléments |
| **Tertiaire** | Ce qui rassure ou détaille | Le reste, repliable |

**Le test de la hiérarchie :** montre une capture du composant à quelqu'un pendant 3 secondes, puis demande-lui ce qu'il a retenu. Si la réponse n'est pas l'élément primaire, la hiérarchie est fausse — pas le design.

---

## C. Hiérarchie des actions

Erreur la plus fréquente : plusieurs boutons de même poids visuel. Le visiteur ne choisit pas, il ne fait rien.

| Rang | Type | Traitement visuel | Combien |
|---|---|---|---|
| **1** | Action principale | Bouton plein, contrasté | **Un seul par écran** |
| **2** | Alternative | Bouton contour | 0 ou 1 |
| **3** | Complément | Lien souligné | Quelques-uns |

Sur une page produit : **Ajouter au panier** est le rang 1. L'achat express est rang 2, et il ne doit jamais concurrencer visuellement le rang 1 — sinon il détourne les visiteurs hésitants vers un tunnel plus court qu'ils ne sont pas prêts à emprunter.

---

## D. Le comportement, pas seulement l'apparence

Une spec UX qui ne décrit que l'apparence est incomplète. Décris systématiquement :

```
## États du composant
- Par défaut
- Au survol (desktop uniquement)
- Au focus clavier — VISIBLE, non négociable
- Actif / sélectionné
- Désactivé, et pourquoi il l'est
- En chargement, s'il y a une attente
- En erreur, avec le message exact

## Cas de contenu
- Contenu minimal (un seul élément)
- Contenu maximal (le nombre limite)
- Contenu absent → que voit-on ? Rien ? Un message ?
- Texte très long (300 caractères dans un champ prévu pour 30)
- Image absente, ou au mauvais ratio
- Donnée produit manquante (metafield non renseigné)

## Comportement responsive
- 375 px : {{description}}
- 750 px : {{ce qui change}}
- 990 px et plus : {{ce qui change}}

## Accessibilité
- Ordre de tabulation
- Ce qu'annonce un lecteur d'écran
- Contraste minimum retenu
- Comportement avec prefers-reduced-motion
```

**La ligne « contenu absent » est celle qui casse le plus souvent en production.** Un marchand ajoute la section, ne remplit rien, et voit une zone vide inexplicable ou une erreur. Décide dès la spec : le composant disparaît entièrement, ou il affiche un contenu par défaut ?

---

## E. Le contenu comme partie de la spec

Un composant se conçoit avec du **vrai** contenu, jamais avec du faux texte de remplissage. Le faux texte a une longueur régulière et flatteuse qui masque tous les problèmes de mise en page.

```
[ ] Demander au client le contenu réel de 3 exemples
[ ] Y compris le cas le plus long et le cas le plus court
[ ] Vérifier le rendu dans chaque langue si multi-marché
[ ] Prévoir la troncature ou le retour à la ligne, explicitement
```

Si le client n'a pas encore le contenu, écris dans la spec : *« Le composant sera conçu sur la base des exemples fournis le {{date}}. Un contenu significativement plus long nécessitera un ajustement, chiffré séparément. »*

---

## F. Le gabarit `ux-spec.md`

```markdown
# Spécification UX — {{Composant}} — {{Client}}

## Objectif
{{Ce que le visiteur doit comprendre ou pouvoir faire. Une phrase.}}

## Contexte d'usage
Page : {{...}} · Position : {{...}}
Trafic : {{froid / chaud}} · Appareil dominant : {{mobile X %}}
Le visiteur arrive ici après : {{...}}

## Hiérarchie
Primaire : {{un seul élément}}
Secondaire : {{...}}
Tertiaire : {{...}}

## Structure mobile (375 px)
{{Croquis ASCII ou description ordonnée, de haut en bas}}

## Structure desktop (≥ 990 px)
{{Ce qui change, et pourquoi}}

## Action principale
{{Quoi, où, quel libellé exact}}

## États
{{Le tableau de la section D}}

## Cas de contenu
{{Le tableau de la section D}}

## Accessibilité
{{Ordre de tabulation, annonces, contrastes}}

## Contenu de référence utilisé
{{Les 3 exemples réels fournis par le client, avec leur date}}

## Hors périmètre
{{Explicite}}
```

---

## G. Croquis en texte plutôt que maquette

Tu n'es pas designer, et une maquette approximative crée des attentes visuelles que le code ne tiendra pas. Un croquis en texte est plus honnête et plus rapide à faire valider :

```
MOBILE 375px

┌─────────────────────────────┐
│ [icône]  Livraison offerte  │  ← primaire
│          dès 60 €            │
├─────────────────────────────┤
│ [icône]  Retour 30 jours    │  ← secondaire
├─────────────────────────────┤
│ [icône]  Paiement sécurisé  │  ← secondaire
└─────────────────────────────┘
   ↑ défilement horizontal si > 3 éléments

DESKTOP ≥ 990px
┌──────────┬──────────┬──────────┐
│ [icône]  │ [icône]  │ [icône]  │  ← 3 colonnes, centrées
│ Livraison│ Retour   │ Paiement │
└──────────┴──────────┴──────────┘
```

Ce format se lit en dix secondes, se corrige en direct pendant un appel, et ne promet aucune finition visuelle que tu n'aurais pas décidée. Si le client veut une vraie maquette, c'est une prestation de design — dis-le et chiffre-la, ou demande-lui de la fournir.
