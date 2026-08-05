# 10 — Report Templates

Cinq documents. **Adapte le format au prix :** sur une correction à 60 €, tu produis un seul message structuré ; sur une mission à 800 €, les cinq documents. La structure logique reste identique — symptôme, cause, correctif, tests, prévention.

| Livrable | Quand | Lecteur |
|---|---|---|
| `bug-report.md` | Après reproduction | Toi, puis annexé au rapport |
| `root-cause-analysis.md` | Après diagnostic | Client et son futur développeur |
| `fix-plan.md` | Avant correction, si > 300 € | Client, pour validation |
| `testing-report.md` | Après correction | Client |
| `delivery-report.md` | À la livraison | Client |

---

## 1. bug-report.md

```markdown
# Rapport de bug — {{Boutique}} — {{Date}}

## Signalement
Rapporté par : {{client}}   le : {{date}}
Description initiale : « {{citation exacte du client}} »
Gravité : S1 / S2 / S3 / S4

## Reproduction confirmée
Confirmé le {{date}} par {{toi}}
Environnement : {{navigateur}} {{version}} / {{appareil}} / {{OS}}
URL : {{url}}
Prérequis : {{état du panier, connexion, marché…}}

Étapes :
1. …
2. …
3. …

Résultat observé : …
Résultat attendu : …
Fréquence : systématique / {{n}} fois sur 10

## Périmètre
| Question | Réponse |
|---|---|
| Autres pages touchées | |
| Autres produits touchés | |
| Autres navigateurs | |
| Autres marchés | |
| Reproductible sur thème par défaut | oui / non |
| Reproductible en navigation privée | oui / non |
| Présent dans le Theme Editor | oui / non |

## Observations techniques
Console : {{erreurs, ou "aucune"}}
Réseau : {{requêtes en échec, statuts, réponses}}
HTML rendu : {{extrait pertinent}}

## Impact commercial
{{ex. : impossible d'ajouter au panier depuis mobile — environ 70 % du trafic}}

## Preuves
evidence/{{fichiers}}
```

---

## 2. root-cause-analysis.md

Le document qui te distingue. Presque personne ne le produit.

```markdown
# Analyse de cause — {{Boutique}} — {{Date}}

## Cause racine
{{Une phrase, précise, testable.}}

Exemple : « Le script du panier construisait ses URL avec un chemin absolu
'/cart/add.js', ce qui ignore le préfixe de langue ajouté par Shopify Markets.
Les requêtes échouaient donc sur tous les marchés autres que le marché
principal. »

## Localisation
| Fichier | Ligne(s) | Rôle |
|---|---|---|

## Chaîne causale
{{Ce qui a déclenché}} → {{ce qui s'est passé techniquement}} → {{ce que voit le client}}

## Élément déclencheur
{{Installation d'application / mise à jour de thème / modification manuelle /
ouverture d'un nouveau marché / aucun — présent depuis l'origine}}

## Pistes écartées
| Hypothèse | Test effectué | Résultat |
|---|---|---|
| | | |

_(Cette section démontre la rigueur du diagnostic mieux que la solution
elle-même. Ne la supprime pas.)_

## Preuve de la cause
{{Comment j'ai confirmé : test de reproduction volontaire, git bisect,
isolation sur thème par défaut…}}

## Nature de l'intervention
☐ Correction de la cause
☐ Contournement — la cause se situe dans du code que je ne peux pas modifier
   ({{application X}}). Ce contournement peut cesser de fonctionner si
   l'application est mise à jour.
```

---

## 3. fix-plan.md

Pour les missions dépassant une correction simple. Validé avant écriture de code.

```markdown
# Plan de correction — {{Boutique}} — {{Date}}

## Ce qui sera corrigé
| ID | Bug | Cause | Fichiers | Effort | Risque |
|---|---|---|---|---|---|

## Ce qui ne sera pas corrigé, et pourquoi
| Point | Raison |
|---|---|
| {{...}} | Relève du code d'une application tierce — non modifiable |
| {{...}} | Fonctionnalité inexistante à l'origine — développement, devis séparé |

## Méthode
Travail sur une copie non publiée. Sauvegarde créée le {{date}}.
Une correction = un commit, testée individuellement.
Aucune publication sans votre accord écrit.

## Tests prévus
{{liste}}

## Calendrier et prix
{{...}}

## Validation
Je démarre à réception de votre accord écrit sur ce document.
```

---

## 4. testing-report.md

```markdown
# Rapport de tests — {{Boutique}} — {{Date}}

## Le bug d'origine
| | Avant | Après |
|---|---|---|
| Étapes de reproduction | reproduit | non reproduit |
| Nombre d'essais | {{n}} | {{n}} |
| Environnement du signalement | {{...}} | ✅ |

## Environnements testés
| Environnement | Bug d'origine | Parcours d'achat | Theme Editor |
|---|---|---|---|
| Chrome desktop | ✅ | ✅ | ✅ |
| Safari iOS (appareil réel) | ✅ | ✅ | — |
| Chrome Android | ✅ | ✅ | — |

## Cas limites vérifiés
{{liste adaptée à la famille de bug}}

## Parcours d'achat complet
{{checklist cochée}}

## Console
Erreurs avant intervention : {{n}} — {{lesquelles}}
Erreurs après intervention : {{n}}
Nouvelles erreurs introduites : **aucune**

## Contrôle de causalité
Correctif retiré temporairement (git stash) → le bug réapparaît ✅
_(Confirme que c'est bien cette modification qui résout le problème.)_
```

La dernière section impressionne durablement les clients techniques et les agences. Elle prouve que tu n'as pas corrigé par hasard.

---

## 5. delivery-report.md

```markdown
Bonjour {{Prénom}},

C'est corrigé. Voici ce qui se passait.

**Le symptôme.** {{Ce que vous constatiez, en une phrase.}}

**La cause.** {{Explication en langage courant, 2 à 4 phrases. Une analogie
seulement si elle éclaire vraiment.}}

**Ce que j'ai fait.** {{Ce qui a été modifié, sans jargon. Si c'est un
contournement plutôt qu'une correction de fond, le dire ici.}}

**Ce que j'ai vérifié.** {{Liste courte : le bug d'origine, sur {{appareil}} ;
le parcours d'achat complet ; le personnalisateur de thème ; {{n}} navigateurs.}}

**À vérifier de votre côté (5 minutes) :** {{lien de preview}}
Refaites exactement ce qui ne marchait pas. Rien n'est publié tant que vous ne
me donnez pas votre accord.

**Ci-joint :** analyse de la cause, rapport de tests, plan de retour arrière.

**Pour éviter que cela se reproduise.** {{Recommandation concrète, formulée
comme un conseil — sauvegarde avant chaque intervention, versionnage, thème de
test avant mise à jour…}}

Le correctif est garanti {{N}} jours. Dites-moi quand publier.

{{Nom}}
```

---

## Règles de rédaction

1. **La cause avant le correctif.** Le client doit d'abord comprendre ce qui se passait.
2. **Aucun jargon non expliqué.** « Le script écoutait un élément qui n'existait plus » plutôt que « l'event listener ciblait un nœud détaché ».
3. **Ne blâmer personne** — ni le développeur précédent, ni l'éditeur de l'application, ni le client. Décrire les faits. Dénigrer le prédécesseur inquiète le client sur ce que tu diras de lui.
4. **Dire quand c'est un contournement.** Toujours, explicitement.
5. **Documenter les pistes écartées.** C'est la preuve du travail réel.
6. **Une recommandation de prévention**, formulée comme un conseil et non comme une vente. La vente vient d'elle-même si le conseil est juste.
7. **Markdown → PDF** pour l'envoi.

---

## Version courte (missions < 150 €)

Un seul message, quatre blocs :

```
SYMPTÔME  — ce que vous constatiez
CAUSE     — pourquoi ça arrivait
CORRECTIF — ce que j'ai changé
TESTÉ     — sur quoi j'ai vérifié
```

Plus un lien de preview et une phrase de prévention. Rien de plus. Sur ce niveau de prix, un rapport de cinq pages est perçu comme du remplissage, pas comme du sérieux.
