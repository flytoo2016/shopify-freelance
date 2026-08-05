# 08 — Report Templates

Cinq livrables. Chacun a un lecteur et une fonction précise. Ne les fusionne pas : un document qui sert à tout ne sert à rien.

| Livrable | Lecteur | Fonction |
|---|---|---|
| `performance-audit.md` | Client | Prouver le problème avant de vendre la solution |
| `performance-action-plan.md` | Client | Faire valider le périmètre par écrit |
| `performance-before-after.md` | Client + son futur dev | Montrer le résultat, chiffres nus |
| `performance-report.md` | Client, archivé | Le document final, complet |
| `client-delivery.md` | Client | Le message de livraison |

---

## 1. performance-audit.md

```markdown
# Audit de performance — {{Boutique}}
Réalisé par {{Nom}} — {{Date}} — Thème : {{Nom}} v{{Version}}

## Résumé pour décideur
En trois phrases, sans jargon : où en est la boutique, quelle est la cause
principale, quel est le gain réaliste.

## Comment j'ai mesuré
- Données terrain (vos visiteurs réels) : Web Performance Dashboard Shopify,
  P75 sur 30 jours, relevé le {{date}}
- Données laboratoire : Lighthouse, Chrome {{version}}, émulation mobile,
  Slow 4G, CPU ×4, 3 mesures par page, médiane retenue
- Pages testées : {{3 URLs}}

Ces deux sources ne mesurent pas la même chose. Le terrain dit ce que vivent vos
clients. Le laboratoire dit d'où vient le problème.

## Situation actuelle

### Données terrain (P75, 30 derniers jours)
| Métrique | Home | Collection | Produit | Seuil "bon" |
|---|---|---|---|---|
| LCP (chargement) | | | | ≤ 2,5 s |
| INP (réactivité) | | | | ≤ 200 ms |
| CLS (stabilité) | | | | ≤ 0,1 |

> Ces mesures correspondent au 75ᵉ centile : c'est le quart de vos visiteurs les
> plus lents qui détermine votre note, y compris pour Google.

### Données laboratoire
| Page | Score perf | LCP | TBT | CLS | Poids | Requêtes |
|---|---|---|---|---|---|---|

## Constats
| ID | Constat | Preuve | Métrique | Impact | Effort | Priorité |
|---|---|---|---|---|---|---|

_(une ligne par constat, chacune sourcée par un fichier:ligne ou une capture)_

### Détail des constats prioritaires
**P-01 — {{titre}}**
- Ce qui se passe : {{explication non technique}}
- Preuve : {{capture / fichier:ligne}}
- Conséquence pour vos visiteurs : {{concret}}
- Correction proposée : {{une phrase}}
- Gain estimé : {{fourchette}} — estimation, à confirmer par la mesure après

## Scripts tiers et applications
| App | Poids | Pages | Bloquant | Recommandation | Décision |
|---|---|---|---|---|---|

La colonne « Décision » vous appartient. Je n'installe ni ne désinstalle aucune
application sans votre accord écrit.

## Ce qui ne peut pas être corrigé côté thème
- {{...}}

## Ce que je recommande
Formule {{X}} — {{n}} correctifs prioritaires — {{délai}} — {{prix}}
```

---

## 2. performance-action-plan.md

Une à deux pages. Signé (ou approuvé par e-mail) avant tout code.

```markdown
# Plan d'action — {{Boutique}} — {{Date}}

## Périmètre validé
Templates concernés : {{home, collection, produit}}
Thème de travail : copie non publiée. Aucune modification en ligne sans votre accord.
Sauvegarde créée le {{date}} : "{{nom}}"

## Correctifs
| ID | Correctif | Fichier(s) | Métrique | Gain estimé | Effort | Risque | Test |
|---|---|---|---|---|---|---|---|

## Décisions qui vous reviennent
| # | Sujet | Option A | Option B | Ma recommandation | Votre choix |
|---|---|---|---|---|---|

## Hors périmètre
{{liste explicite}}

## Calendrier
| Jour | Étape | Livrable |
|---|---|---|

## Validation
Je démarre à réception de votre accord écrit sur ce document.
Toute demande hors de ce périmètre fera l'objet d'un devis séparé.
```

---

## 3. performance-before-after.md

Le document le plus lu. Chiffres nus, méthode explicite, aucun superlatif.

```markdown
# Avant / Après — {{Boutique}}
Mesures du {{date_avant}} et du {{date_après}} — conditions identiques

## Conditions de mesure (identiques avant et après)
Chrome {{v}} · navigation privée · émulation mobile · Slow 4G · CPU ×4
3 mesures par page, médiane retenue · Mêmes URLs

## Laboratoire
| Page | Métrique | Avant | Après | Écart |
|---|---|---|---|---|
| Home | LCP | | | |
| Home | TBT | | | |
| Home | CLS | | | |
| Home | Poids total | | | |
| Home | Requêtes | | | |
| Produit | … | | | |

## Terrain
Les données terrain sont calculées sur une fenêtre glissante de 30 jours et
mettent jusqu'à 36 h à s'actualiser. Le relevé complet sera disponible vers le
{{date + 30 j}}.

| Métrique | P75 avant | P75 au {{J+30}} |
|---|---|---|

## Ce qui a été fait
| ID | Correctif | Fichiers | Commit |
|---|---|---|---|

## Ce qui n'a pas été fait, et pourquoi
| Sujet | Raison |
|---|---|

## Lecture honnête de ces chiffres
Une amélioration en laboratoire ne garantit pas une amélioration identique en
conditions réelles : vos visiteurs utilisent des appareils et des connexions
variés. Les mesures terrain restent la référence.
```

---

## 4. performance-report.md

Le document final, archivé. Structure :

```markdown
# Rapport d'optimisation — {{Boutique}} — {{Date}}

1. Résumé
2. Périmètre et méthode
3. État initial (reprise de l'audit)
4. Travaux réalisés — un paragraphe par correctif :
   - le problème
   - ce que j'ai changé (fichier + commit)
   - pourquoi c'est mieux
   - ce qui a été testé
5. Résultats mesurés (before/after)
6. Applications et scripts tiers : tableau + décisions prises et par qui
7. Ce qui reste à faire, classé par priorité, avec estimation
8. Comment ne pas re-dégrader la performance
   - avant d'installer une app, vérifier son poids
   - uploader les images à la taille d'affichage réelle
   - relever le dashboard performance une fois par mois
   - me consulter avant tout changement de thème
9. Plan de rollback (voir 07-testing-and-qa.md)
10. Annexes : rapports Lighthouse (JSON), captures, git log
```

Section 8 : elle est utile au client **et** c'est ton argumentaire de retainer, formulé comme un service et non comme une vente.

---

## 5. client-delivery.md

Une page. Ton message de livraison.

```markdown
Bonjour {{Prénom}},

L'optimisation est terminée. Voici l'essentiel.

**Ce qui a changé.** {{2–3 phrases non techniques}}

**Résultats mesurés en laboratoire, conditions identiques avant/après :**
- Chargement de la page produit (LCP) : {{X}} s → {{Y}} s
- Poids de la page d'accueil : {{X}} KB → {{Y}} KB
- Stabilité visuelle (CLS) : {{X}} → {{Y}}

Vos données terrain, celles qui comptent pour Google et pour vos clients, se
mettent à jour sur 30 jours. Je vous enverrai un relevé le {{date+30}}.

**À vérifier de votre côté (10 minutes) :** aperçu ici → {{lien preview}}
Parcourez votre boutique comme un client : ajout au panier, changement de
variante, menu mobile. Rien ne sera publié tant que vous ne m'aurez pas donné
votre accord.

**Documents joints :**
- Rapport complet
- Avant/après détaillé
- Plan de retour arrière

**Deux décisions vous attendent** (détail dans le rapport, page {{n}}) :
1. {{ex. l'app X pèse 210 KB sur toutes les pages alors qu'elle n'est utile que
   sur les fiches produit}}
2. {{...}}

Dites-moi quand vous voulez que je publie. Je le fais à une heure creuse et je
reste disponible {{durée de garantie}} pour tout ajustement.

{{Nom}}
```

---

## Règles de rédaction, tous documents

1. **Aucun chiffre non mesuré.** Si tu ne l'as pas relevé, il n'y est pas.
2. **Chaque terme technique expliqué à sa première apparition**, en une phrase.
3. **Toujours distinguer laboratoire et terrain.** C'est ce qui rend le rapport crédible.
4. **Toujours une section « ce que je n'ai pas fait ».** Elle inspire plus confiance que la liste des réussites.
5. **Zéro promesse de conversion ou de chiffre d'affaires.**
6. **Format Markdown → PDF** pour l'envoi. Le client ne doit pas avoir à ouvrir un éditeur de code.
