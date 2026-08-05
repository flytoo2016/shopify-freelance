# 10 — Report Templates

Huit livrables. Un seul est lu intégralement : `conversion-report.md`. Les autres sont ses annexes, consultées au besoin.

**Le piège du volume.** Un audit de 80 pages n'est pas lu, et un audit non lu n'est pas implémenté — donc il ne génère aucune mission suivante. Vise : **rapport principal de 10 à 12 pages**, annexes aussi longues que nécessaire.

---

## 1. conversion-report.md — le document principal

```markdown
# Audit de conversion — {{Boutique}}
{{Nom}} · {{Date}} · Périmètre : {{pages}} · Données : {{sources et période}}

---

## 1. En résumé

{{Trois paragraphes maximum. Où en est la boutique, quel est le sujet
principal, ce que je recommande de faire en premier. Rédigé pour être lu seul :
c'est la seule page dont je suis sûr qu'elle sera lue.}}

**Score global : {{X}}/100**
**Constats : {{n}} dont {{n}} critiques**
**Premier lot recommandé : {{n}} corrections — environ {{X}} h**

---

## 2. Comment lire ce rapport

Les affirmations de ce document portent leur source :

| Marqueur | Signification |
|---|---|
| [Donnée] | Provient de vos statistiques |
| [Mesure] | Relevé technique reproductible |
| [Observation] | Constaté lors du parcours, capture à l'appui |
| [Hypothèse] | Mon interprétation, à confirmer par la mesure |

**Limites de cet audit.** {{Ce que je n'ai pas pu voir : accès manquants,
périmètre exclu, données non fiables. Honnête et précis.}}

**Sur les estimations d'impact.** Ce sont des ordres de grandeur destinés à
hiérarchiser les priorités, non des prévisions. La seule façon d'établir l'effet
réel d'une modification est de la mettre en œuvre et de mesurer.

---

## 3. Votre situation en chiffres

| Indicateur | Valeur | Période |
|---|---|---|
| Sessions | | |
| Taux de conversion | | |
| Conversion mobile / desktop | | |
| Part du trafic mobile | | |
| Panier moyen | | |

### L'entonnoir
| Étape | Taux | Lecture |
|---|---|---|
| Session → vue produit | | |
| Vue produit → ajout panier | | |
| Ajout panier → checkout | | |
| Checkout → achat | | |

**Où se situe le sujet principal :** {{une phrase}}

---

## 4. Notation

{{Le radar}}

| Dimension | Note | P0 | P1 |
|---|---|---|---|
| … | | | |
| **Total** | **{{X}}/100** | | |

{{Pondération utilisée et ajustements, avec le motif.}}

---

## 5. Ce que vous faites bien

{{3 à 5 points, sourcés comme les autres. Section obligatoire : un document
uniquement négatif met le lecteur sur la défensive, et un lecteur sur la
défensive n'implémente rien.}}

---

## 6. Les constats critiques

{{Les P0 en entier, au format fiche de constat. Un par page. Avec la capture.}}

---

## 7. Les autres constats

{{Tableau récapitulatif renvoyant aux annexes. Pas le détail ici.}}

| ID | Constat | Zone | Priorité | Effort |
|---|---|---|---|---|

---

## 8. Comparaison avec vos concurrents

{{Le tableau des blocs de page produit + les 7 mesures. Deux pages maximum,
le détail va en annexe.}}

---

## 9. Feuille de route

{{Les lots calibrés sur le budget. Renvoi vers prioritized-roadmap.md.}}

### Lot 1 — à traiter en priorité
### Lot 2
### Lot 3
### Non retenu pour l'instant, et pourquoi

---

## 10. Comment mesurer les effets

{{Pour chaque lot : quel indicateur regarder, où, et au bout de combien de
temps. Précise les délais réels — le RUM se met à jour sur 30 jours, un taux de
conversion demande un volume suffisant pour être lu.}}

---

## 11. Et ensuite

{{Ce que je peux faire, ce que votre agence peut faire, ce que vous pouvez faire
vous-même. Sans insistance commerciale — la colonne « Qui » de la feuille de
route a déjà fait le travail.}}

## Annexes
{{Liste des 7 autres documents}}
```

---

## 2 à 7. Les annexes

Même structure pour chacune :

```markdown
# {{Titre}} — annexe de l'audit {{Boutique}}

## Méthode
{{Comment j'ai procédé, quels outils, quelles conditions. Reproductible.}}

## Constats
{{Toutes les fiches de constat de ce domaine, format complet}}

## Ce qui a été vérifié et ne pose pas de problème
{{Liste courte. Rassure et prouve que le domaine a été couvert.}}

## Limites
{{Ce que je n'ai pas pu vérifier dans ce domaine}}
```

| Annexe | Contenu spécifique |
|---|---|
| `store-audit.md` | Les 29 zones, écran par écran, avec les captures |
| `ux-audit.md` | Parcours acheteur commenté, navigation, mobile, frictions comptées |
| `cro-audit.md` | Grille des 12 questions, friction/hésitation/rejet, confiance, offre |
| `seo-audit.md` | Technique, on-page, données structurées, Search Console |
| `performance-audit.md` | Méthodologie Phase 1 : terrain, labo, éléments LCP, poids |
| `competitor-analysis.md` | Tableaux comparatifs, captures, standards du secteur, angles morts |

---

## 8. prioritized-roadmap.md

Le document le plus utilisé. Deux pages, un tableau, rien d'autre.

```markdown
# Feuille de route — {{Boutique}} — {{Date}}

Budget indicatif communiqué : {{X}} € · Taux appliqué : {{Y}} €/h

| ID | Constat | Zone | Prio | Impact | Effort | Qui | Lot | Statut |
|---|---|---|---|---|---|---|---|---|

## Lot 1 — {{n}} h — environ {{X}} €
{{Les lignes, avec en une phrase pourquoi ce lot d'abord}}

## Lot 2 — {{n}} h — environ {{X}} €
## Lot 3 — {{n}} h — environ {{X}} €

## Non retenu pour l'instant
| ID | Constat | Pourquoi pas maintenant |

## Ce que vous pouvez faire vous-même
| ID | Constat | Où, dans votre admin | Temps |

---
Colonne « Statut » à mettre à jour au fil de l'implémentation.
Ré-audit recommandé à {{date + 3 mois}} avec la même grille, pour mesurer.
```

**La section « ce que vous pouvez faire vous-même »** semble contraire à ton intérêt. En pratique c'est l'inverse : elle prouve que tu n'optimises pas ta facture, ce qui rend crédible tout le reste de la feuille de route — y compris les lignes qui te reviennent.

---

## Règles de rédaction

1. **Chaque affirmation porte sa source** — les quatre marqueurs, systématiquement.
2. **Aucun chiffre non mesuré.** Si tu ne l'as pas relevé, il n'y est pas.
3. **Aucune promesse de conversion.** Ni pourcentage, ni chiffre d'affaires projeté.
4. **Chaque constat a une preuve nommée**, et le fichier existe.
5. **Filtre anti-générique passé sur chaque ligne.**
6. **Une section « ce que vous faites bien »** — pas de politesse, c'est ce qui rend le document audible.
7. **Une section « limites »** — c'est un argument, pas un aveu.
8. **Effort chiffré partout.** Un constat sans effort est inutilisable pour décider.
9. **Markdown → PDF** pour l'envoi. Le client ne doit pas ouvrir un éditeur de code.
10. **Le rapport principal ne dépasse pas 12 pages.**

---

## Le test final

Avant d'envoyer, relis la page 1 seule et demande-toi :

> **Si le client ne lit que cette page, sait-il quoi faire lundi matin ?**

Si la réponse est non, la page 1 est à réécrire — pas le reste du rapport.
