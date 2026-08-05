# 06 — Scoring System

Le score est un outil de communication, pas une mesure scientifique. Sa fonction : donner au client une image mémorisable de sa situation et rendre visible sa progression après implémentation.

**Sa faiblesse :** un score inventé est un score que le client peut contester, et une contestation sur le score contamine tout le reste du rapport. D'où la règle unique de ce fichier : **chaque note se déduit de constats, jamais d'une impression.**

---

## A. Les 10 dimensions

| Dimension | Poids | Ce qu'elle mesure |
|---|---|---|
| **Page produit** | 15 | Information, objections, chemin vers l'achat |
| **CRO / conversion** | 15 | Friction, confiance, clarté de l'offre |
| **Mobile** | 12 | Utilisabilité réelle sur appareil réel |
| **Performance** | 10 | Core Web Vitals terrain |
| **Navigation & découverte** | 10 | Menu, recherche, filtres, collections |
| **Confiance** | 10 | Réassurance vérifiable, transparence |
| **Panier & pré-checkout** | 8 | Frais, seuils, friction avant paiement |
| **SEO** | 8 | Technique et on-page observable |
| **Analytics & tracking** | 7 | Fiabilité des données de décision |
| **Accessibilité** | 5 | Contraste, clavier, alternatives |
| **Total** | **100** | |

**Sur la pondération.** Elle reflète l'impact commercial, pas l'effort d'audit. La page produit et le CRO pèsent 30 points à eux deux parce que c'est là que se joue la conversion. L'accessibilité pèse 5 non pas parce qu'elle est secondaire, mais parce que son effet sur la conversion est indirect — dis-le explicitement dans le rapport plutôt que de laisser croire que tu la négliges.

**Adapte la pondération au contexte** et signale-le. Sur une boutique dont 85 % du trafic est mobile, monte Mobile à 15 et baisse SEO à 5. Écris pourquoi.

---

## B. Comment noter sans inventer

Chaque dimension part de son maximum et **perd des points par constat**.

| Gravité du constat | Points retirés |
|---|---|
| P0 — bloque ou coûte directement des ventes | −4 à −6 |
| P1 — friction ou perte significative | −2 à −3 |
| P2 — amélioration réelle | −1 |
| P3 — mineur | −0,5 |

Plancher : une dimension ne descend pas sous 1 point. Un zéro est un jugement, pas une mesure.

**Exemple, dimension Page produit (15 points) :**

```
Base                                                          15
P0-02  Prix invisible sans scroll sur mobile                  −5
P1-07  Délai de livraison absent de la page                   −3
P1-09  Aucune réponse aux 3 questions les plus fréquentes     −3
P2-14  Guide des tailles dans un accordéon fermé              −1
                                                          ------
Note                                                          3/15
```

Le calcul est visible, reproductible, et discutable point par point. Si le client conteste, il conteste **un constat** — ce qui est une conversation utile — et non « votre note est injuste », qui n'en est pas une.

**Publie ce calcul dans le rapport.** C'est ce qui distingue ton score d'un chiffre sorti d'un chapeau.

---

## C. Grille de lecture pour le client

| Score | Lecture | Message |
|---|---|---|
| 85–100 | Solide | Optimisation fine, tests. Le levier est ailleurs (trafic, offre) |
| 70–84 | Correct | Quelques P0 et P1 à traiter, gains accessibles |
| 55–69 | Perfectible | Chantier structuré de 4 à 8 semaines |
| 40–54 | Problématique | Plusieurs P0. Prioriser strictement, ne pas tout attaquer |
| < 40 | Critique | La question de la refonte se pose. Réponse honnête exigée |

**Sur le bas de la grille.** Un score inférieur à 40 pose une vraie question : refonte ou correction ? Ta réponse doit tenir compte du budget et du trafic, pas de ton intérêt commercial. Un client à 15 000 sessions/mois et 3 000 € de budget ne refait pas sa boutique : il corrige ses cinq P0.

---

## D. Le graphique radar

Dix axes, une forme. C'est l'élément le plus regardé du rapport et celui que le client montre à son associé.

Deux règles :
1. **Toujours accompagné du tableau de calcul.** Un radar seul est une opinion graphique.
2. **Refais-le à l'identique lors du ré-audit.** C'est ce qui rend la progression visible — et c'est l'argument du ré-audit à trois mois.

---

## E. Ce qu'il ne faut pas faire avec un score

| Erreur | Pourquoi |
|---|---|
| Donner un score sans détail du calcul | Invérifiable donc contestable |
| Comparer le score à une « moyenne du secteur » | Cette moyenne n'existe pas. Ne l'invente pas |
| Promettre « vous passerez de 52 à 85 » | Le score dépend de constats, pas d'une prédiction |
| Baisser artificiellement pour vendre plus | Se voit, et détruit la relation au ré-audit |
| Noter l'esthétique | Ce n'est pas mesurable, et ce n'est pas ton mandat |
| Utiliser des décimales | Fausse précision. Arrondis à l'entier |

**Sur la comparaison sectorielle.** Si le client demande « c'est bien ou pas par rapport aux autres ? », la réponse honnête est : *« Je n'ai pas de référentiel sectoriel fiable à vous opposer, et les chiffres qui circulent sur ce sujet sont rarement documentés. Ce que je peux vous montrer, c'est le tableau comparatif sur les cinq boutiques que j'ai auditées avec la même grille. »* Puis tu montres le tableau de la section concurrence. C'est plus utile et c'est vrai.

---

## F. Le tableau de synthèse

À placer en page 2 du rapport principal, juste après le résumé.

```markdown
## Notation

| Dimension | Note | Constats P0 | Constats P1 | Priorité |
|---|---|---|---|---|
| Page produit | 3/15 | 1 | 2 | **1** |
| CRO | 7/15 | 1 | 3 | **2** |
| Mobile | 5/12 | 1 | 2 | **3** |
| Performance | 6/10 | 0 | 2 | 5 |
| Navigation | 7/10 | 0 | 2 | 6 |
| Confiance | 5/10 | 0 | 3 | 4 |
| Panier | 5/8 | 0 | 2 | 7 |
| SEO | 6/8 | 0 | 1 | 8 |
| Analytics | 2/7 | 1 | 1 | **Préalable** |
| Accessibilité | 3/5 | 0 | 2 | 9 |
| **Total** | **49/100** | **4** | **20** | |

Pondération utilisée : standard, ajustée sur Mobile (+2) et SEO (−2) compte tenu
d'une part de trafic mobile de 81 %.
```

**La ligne Analytics marquée « Préalable ».** Quand les données du client sont fausses, aucune décision d'optimisation n'est fiable. Cette dimension ne se hiérarchise pas comme les autres : elle passe avant, parce qu'elle conditionne la mesure de tout le reste. Le signaler ainsi dans le tableau produit un effet immédiat en restitution.
