# 14 — Delivery & Upsell

La rentabilité de cette phase ne se joue pas sur le prix de l'audit. Elle se joue sur ce qui se passe **dans les 72 heures qui suivent la livraison**.

---

## A. La séquence

```
J-2   Envoi du rapport, sans commentaire commercial
J0    Appel de restitution 45–60 min, enregistré
J0    Notes de l'appel : ce que le client dit vouloir faire en premier
J+1   Feuille de route ajustée, reprenant ses mots
J+2   Devis d'implémentation du Lot 1
J+14  Relance si sans réponse
J+90  Ré-audit proposé
```

**Le rapport part 48 h avant l'appel.** Pas le jour même : le client doit avoir eu le temps de le lire, de réagir, et de préparer ses objections. Un appel où il découvre le document est un appel où il ne dit rien.

---

## B. L'appel de restitution

**Il n'est pas optionnel.** Un rapport livré sans restitution est lu partiellement et suivi rarement. L'appel double le taux de conversion vers l'implémentation, et c'est là que se construit la relation.

### Déroulé, 45 minutes

| Temps | Séquence | Objectif |
|---|---|---|
| 0–3 min | « Qu'est-ce qui vous a le plus surpris ? » | Le faire parler en premier. Sa réponse oriente tout l'appel |
| 3–8 min | Rappel de la méthode et des limites | Établir que tu sais ce que tu ne sais pas |
| 8–13 min | Le score et sa lecture | Donner le cadre général |
| 13–30 min | **Les 3 constats majeurs, captures à l'écran** | Le cœur. Montrer, pas raconter |
| 30–38 min | La feuille de route et les lots | L'amener à choisir |
| 38–45 min | Questions, et « par quoi voulez-vous commencer ? » | Recueillir le devis qu'il vient d'écrire lui-même |

**Ouvrir par une question, pas par une présentation.** « Qu'est-ce qui vous a le plus surpris dans le rapport ? » fait trois choses : ça te dit ce qu'il a lu, ce qui l'a touché, et ça installe une conversation plutôt qu'un exposé.

### Montrer, ne pas raconter

Pour les trois constats majeurs, partage ton écran et **rejoue le parcours en direct**. Un client qui te voit scroller deux fois et demie sur son propre site avant d'atteindre le bouton d'achat comprend en quatre secondes ce que trois paragraphes n'expliquent pas.

Si tu as une vidéo commentée du parcours acheteur, c'est le moment. C'est systématiquement l'élément le plus marquant de toute la prestation.

### Les objections à préparer

| Objection | Réponse |
|---|---|
| « On le savait déjà » | « Tant mieux — ça confirme votre intuition. Ce que le rapport ajoute, c'est l'ordre : vous saviez que c'était un problème, maintenant vous savez que c'est le deuxième à traiter et qu'il coûte 2 h. » |
| « Notre agence dit le contraire » | « C'est possible, et elle connaît des choses que je ne connais pas. Sur ce point précis, voici la donnée sur laquelle je m'appuie : {{X}}. Si elle a une donnée qui la contredit, je veux la voir — c'est utile pour vous que nous soyons d'accord. » |
| « Ça va coûter cher » | « La feuille de route est calibrée sur le budget que vous m'aviez indiqué. Le Lot 1 tient dedans. Le reste est là pour plus tard, pas pour maintenant. » |
| « Est-ce que ça va vraiment augmenter mes ventes ? » | « Je ne peux pas vous le garantir, et personne ne peut. Ce que je peux vous dire, c'est quoi mesurer et au bout de combien de temps — c'est la section 10 du rapport. Si après le Lot 1 rien n'a bougé sur l'indicateur, on saura que l'hypothèse était fausse, et c'est une information utile. » |
| « On préfère faire une refonte complète » | Réponse honnête selon le score. Sous 40, c'est parfois justifié — dis-le. Au-dessus, explique le rapport coût/risque : une refonte remet à zéro ce qui fonctionne déjà. |
| « Vous pouvez le faire ? » | La question que tu attends. « Oui. Je vous envoie un devis pour le Lot 1 sous 48 h. Et si vous préférez le confier à votre équipe, la feuille de route est écrite pour ça. » |

### Ce qu'il faut noter pendant l'appel

```
[ ] Le constat qui l'a le plus marqué
[ ] Le constat qu'il conteste, et pourquoi
[ ] Ses mots exacts sur ce qu'il veut faire en premier
[ ] Ce qu'il dit vouloir faire lui-même
[ ] Toute contrainte nouvelle (budget, calendrier, décideur)
[ ] Le nom de la personne qui tranche, si ce n'est pas lui
```

La ligne « ses mots exacts » est la plus importante : ton devis reprendra ses formulations, ce qui le rend deux fois plus facile à accepter.

---

## C. Le devis d'implémentation

Envoyé sous 48 h, jamais plus tard. Passé une semaine, l'énergie de l'audit est retombée.

```markdown
Bonjour {{Prénom}},

Suite à notre échange, voici le devis pour le lot dont nous avons parlé.

**Ce que vous m'avez dit vouloir traiter en premier :**
{{ses mots}}

**Ce que cela représente concrètement :**
| ID | Correction | Effort | Ce qui change |
|---|---|---|---|

**Total : {{X}} h — {{Y}} €**
{{Si applicable : moins {{Z}} € déduits de l'audit → {{total}} €}}

**Délai :** {{n}} jours ouvrés
**Méthode :** thème de développement, une correction par commit, rien de publié
sans votre accord écrit, plan de retour arrière fourni.
**Mesure :** je relève les indicateurs avant intervention et je vous envoie un
point à J+30, quand les données terrain se seront actualisées.

**Ce que je ne fais pas dans ce lot :** {{ce qui reste hors périmètre}}

Sans engagement de votre part. Si vous préférez confier ce travail à votre
équipe ou à votre agence, la feuille de route est suffisamment précise pour ça
— c'est délibéré.

{{Nom}}
```

La dernière phrase paraît contre-productive. Elle est ce qui fait signer : elle retire la pression, et elle prouve que le rapport avait pour but de servir le client, pas de le capturer.

---

## D. Les six upsells, par ordre de conversion

| # | Upsell | Prix | Moment |
|---|---|---|---|
| 1 | **Implémentation du Lot 1** | 1 000–5 000 € | J+2 après restitution |
| 2 | **Implémentation par lots mensuels** | 800–2 500 €/mois | Après le Lot 1 réussi |
| 3 | **Ré-audit à 3 mois** | 40 % du prix initial | J+90 |
| 4 | **Correction du tracking** | 300–800 € | Immédiat si constat P0 analytics |
| 5 | **Optimisation performance** (Phase 1) | 600–2 000 € | Si la dimension Performance est faible |
| 6 | **Refonte de la page produit** (Phase 4) | 1 500–5 000 € | Si la dimension Page produit est faible |

**Le n°4 se vend seul.** Quand tu montres au client que son suivi compte double ses conversions et qu'il optimise ses campagnes publicitaires sur des chiffres faux, la décision est immédiate. C'est souvent la première mission après l'audit.

**Le n°3 est le plus sous-exploité.** Le ré-audit à trois mois se vend avec une seule phrase, envoyée au bon moment :

> Cela fait trois mois que nous avons traité {{les lots}}. Je vous propose de refaire la notation avec exactement la même grille et de comparer vos indicateurs sur la même méthode. Vous verrez précisément ce qui a bougé — et ce qui n'a pas bougé, ce qui est tout aussi utile. {{Prix}}.

Il est facile à produire (3 à 5 h), il consolide la relation, et il génère mécaniquement la feuille de route suivante.

---

## E. Si le client ne donne pas suite

Ce n'est pas un échec. Trois actions :

1. **Demande un avis public** à J+7. C'est le moment où sa satisfaction est la plus haute.
2. **Demande l'autorisation d'utiliser un extrait anonymisé** en portfolio. La plupart acceptent.
3. **Programme une relance à J+90** : *« Comment ça s'est passé avec la feuille de route ? Avez-vous pu traiter le Lot 1 ? »* Sans rien vendre. Une part significative des missions d'implémentation arrive plusieurs mois après l'audit, quand le budget se libère.

---

## F. Clôture de mission

```
[ ] Rapport et annexes livrés en PDF
[ ] Restitution faite et enregistrement transmis si le client le souhaite
[ ] Feuille de route ajustée envoyée
[ ] Rapports Shopify personnalisés laissés au client (si formule Premium)
[ ] Devis d'implémentation envoyé sous 48 h
[ ] Rappel au client de révoquer les accès collaborateur et analytics
[ ] Avis demandé
[ ] Autorisation d'extrait portfolio demandée
[ ] Relance J+14 et ré-audit J+90 planifiés dans l'agenda
[ ] Fiche de retour d'expérience remplie : temps réel par étape, constats qui
    ont porté, constats ignorés par le client, conversion obtenue ou non
```

La dernière ligne construit ton expertise sectorielle. Au bout de vingt audits, tu sauras quels constats les clients implémentent réellement — et tu cesseras d'écrire les autres.
