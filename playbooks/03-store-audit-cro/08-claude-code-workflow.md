# 08 — Claude Code Workflow (Audit)

---

## A. Le principe

> **Claude Code ne juge pas l'expérience. Il vérifie, structure, chiffre et rédige.**

L'observation CRO est humaine : ce que tu ressens en parcourant une boutique avec un pouce sur un écran de six pouces, aucun outil ne le produit à ta place. Ce que Claude Code fait remarquablement bien, en revanche :

1. **Vérifier** une observation dans le code du thème — transformer « les avis mettent du temps à apparaître » en `sections/product-reviews.liquid:22, chargé après le rendu par un script tiers`
2. **Structurer** des notes désordonnées en fiches de constat normalisées
3. **Chiffrer** l'effort d'implémentation à partir du code réel
4. **Rédiger** pour un lecteur non technique
5. **Filtrer le générique** — quand on lui demande explicitement de le faire

Le risque spécifique de cette phase : **le modèle produit spontanément d'excellents conseils e-commerce génériques.** Bien écrits, plausibles, applicables à n'importe quelle boutique — donc sans valeur. Tous les prompts ci-dessous sont construits pour empêcher ça.

---

## B. Les 10 prompts

### 1 — Cartographier la page produit

```
LECTURE SEULE. Ne modifie aucun fichier.

Analyse la page produit de ce thème : templates/product.json et toutes les
sections et blocks qu'il utilise.

Produis la liste ORDONNÉE des blocs tels qu'ils apparaissent dans le rendu, avec
pour chacun :
- son nom et le fichier qui le rend
- ce qu'il affiche
- s'il est rendu côté serveur (Liquid) ou injecté par JavaScript
- s'il provient d'une application tierce
- s'il est conditionnel, et à quelle condition

Termine par : les blocs présents dans le code mais qui pourraient ne jamais
s'afficher (condition jamais remplie, réglage désactivé).

Ne juge rien. Ne recommande rien. Décris.
```

### 2 — Vérifier une observation dans le code

```
LECTURE SEULE.

Observation faite sur mobile : {{ce que j'ai constaté}}
Capture : {{fichier}}
URL : {{...}}

Trouve dans le thème le code responsable de ce comportement.
Donne : fichier:ligne, le mécanisme exact, et si c'est un réglage du thème
(modifiable par le marchand), du code (modifiable par un développeur), ou une
application tierce (non modifiable).

Estime ensuite l'effort de correction en heures, en te fondant sur ce que tu
vois réellement dans ce thème — pas sur une moyenne. Justifie l'estimation.

Si tu ne trouves pas la cause, dis-le. N'invente pas d'explication plausible.
```

### 3 — Transformer des notes en fiches de constat

```
Voici mes notes brutes d'audit, prises pendant le parcours :
{{coller les notes, même désordonnées}}

Données du client :
- trafic mobile : {{X}} %
- taux de conversion : {{X}} %
- entonnoir : {{sessions → produit → panier → checkout → achat}}
- panier moyen : {{X}}
- questions les plus fréquentes au SAV : {{liste}}

Transforme chaque note en fiche de constat au format de 07-prioritization.md.

Règles strictes :
- Une note sans preuve identifiable → marque-la « PREUVE MANQUANTE » et
  dis-moi quelle capture ou quelle donnée je dois aller chercher
- N'invente aucun chiffre. Si une estimation d'impact n'est pas déductible des
  données fournies, écris « hypothèse, à confirmer par mesure »
- Le champ « Pourquoi c'est un problème » doit s'appuyer sur les données du
  client ci-dessus, pas sur des généralités e-commerce
- Si une note ne peut pas devenir un constat spécifique à CETTE boutique,
  signale-la comme candidate à la suppression
```

### 4 — Le filtre anti-générique

Le prompt le plus important de cette phase. Passe-le sur ton rapport avant livraison.

```
Voici mes constats d'audit :
{{coller}}

Pour CHAQUE constat, réponds à cette question :
« Ce constat pourrait-il être copié-collé tel quel dans l'audit d'une autre
boutique Shopify ? »

Classe en trois catégories :
- SPÉCIFIQUE : contient une preuve, une donnée ou une observation propre à cette
  boutique. Garde tel quel.
- RÉCUPÉRABLE : le fond est juste mais la formulation est générique. Dis-moi
  précisément quelle preuve ou donnée il faudrait y ajouter.
- GÉNÉRIQUE : à supprimer. Explique pourquoi il n'apporte rien.

Sois sévère. Un rapport de 20 constats spécifiques vaut mieux qu'un rapport de
50 dont 30 sont interchangeables.
```

### 5 — Vérifier une affirmation technique

```
Je m'apprête à écrire dans un rapport client : « {{affirmation}} ».

Utilise le Shopify Dev MCP pour vérifier si c'est exact, à jour, et correctement
formulé.
Vérifie notamment :
- est-ce natif dans un thème Online Store 2.0, ou faut-il une application ?
- est-ce faisable avec des metafields / metaobjects / sources dynamiques ?
- cette fonctionnalité est-elle dépréciée ou en cours de dépréciation ?

Si mon affirmation est imprécise, propose une formulation exacte.
Une affirmation technique fausse dans un audit détruit la crédibilité de tout le
document — sois strict.
```

### 6 — Audit SEO technique

```
LECTURE SEULE.

Analyse le SEO technique de ce thème :
1. layout/theme.liquid : title, meta description, canonical — présents et
   correctement construits ?
2. Un seul <h1> par type de page ? Hiérarchie des titres cohérente ?
3. Données structurées produit présentes ? Sur quelles pages ?
4. Attributs alt : générés depuis les données produit, ou vides ?
5. hreflang si multi-langue
6. Pagination : rel next/prev ou équivalent
7. Contenu injecté par JavaScript et donc potentiellement non indexé

Pour chaque manque : fichier:ligne, correction, effort en heures.
Distingue ce qui relève du thème de ce qui relève de la configuration admin
(que le marchand fait lui-même).
```

### 7 — Chiffrer la feuille de route

```
Voici mes constats priorisés : {{coller}}
Budget d'implémentation déclaré par le client : {{X}} €
Mon taux : {{Y}} €/h

Construis la feuille de route par lots, au format de 07-prioritization.md :
- Lot 1 : ce que je ferais avec le premier tiers du budget
- Lot 2, Lot 3
- Non retenu, avec le motif

Contraintes :
- L'effort de chaque constat vient de mon estimation, ne l'invente pas
- Si les P0 dépassent le budget, dis-le explicitement et propose un arbitrage
- Indique pour chaque ligne qui peut le faire : moi, l'agence du client, ou le
  client lui-même (certains constats se corrigent dans l'admin en 5 minutes)
- N'essaie pas de maximiser ce qui m'est facturable. Un client qui découvre
  qu'il aurait pu faire trois choses lui-même ne revient pas.
```

### 8 — Rédiger le rapport principal

```
Rédige clients/{{client}}/07_delivery/conversion-report.md.

Matériel :
- constats : {{...}}
- notation : {{...}}
- données : {{...}}
- concurrence : {{...}}
- contexte business : {{...}}

Structure : celle de 10-report-templates.md. 10 à 12 pages maximum.

Contraintes de rédaction :
- Lecteur : un marchand non technique, qui lira peut-être seulement les 3
  premières pages
- N'affirme AUCUN chiffre absent du matériel fourni
- Chaque terme technique expliqué à sa première occurrence, en une phrase
- Aucune promesse de gain de conversion
- Inclure la section « limites de cet audit » : ce que je n'ai pas pu voir
- Inclure ce que la boutique fait BIEN — 3 à 5 points, sourcés eux aussi
- Ton : direct, sans flatterie et sans dramatisation
```

### 9 — Préparer la restitution

```
À partir du rapport, prépare ma restitution client de 45 minutes.

Produis :
1. Le déroulé minuté (accroche, méthode, score, 3 constats majeurs, feuille de
   route, questions, suite)
2. Les 3 constats à présenter en détail, avec la capture à montrer pour chacun
3. Les 5 objections les plus probables du client, avec une réponse honnête pour
   chacune — y compris celles où je devrais reconnaître une limite
4. Les 3 questions à poser au client pendant l'appel pour préparer la
   proposition d'implémentation

Ne me fais pas dire quelque chose que le rapport ne soutient pas.
```

### 10 — Ré-audit à trois mois

```
Audit initial : {{coller la notation et les constats}}
Constats implémentés depuis : {{liste}}
Données actuelles : {{...}}

Produis le rapport de suivi :
1. Recalcule la notation avec la MÊME grille et la même pondération
2. Compare les données avant / après, en signalant tout facteur externe pouvant
   expliquer l'évolution (saison, changement de trafic, campagne)
3. Ce qui a bougé, ce qui n'a pas bougé
4. Sois explicite sur ce qu'on ne peut PAS attribuer aux modifications
5. Nouveaux constats apparus depuis
6. Feuille de route actualisée

Ne présente pas une corrélation comme une causalité.
```

---

## C. Les 3 agents

| Agent | Rôle | Écriture |
|---|---|---|
| `store-auditor` | Vérifie les observations dans le code, cartographie, chiffre l'effort | ❌ |
| `cro-analyst` | Structure les notes en fiches, applique le filtre anti-générique | ❌ |
| `audit-writer` | Rédige les livrables client | ✅ `07_delivery/` uniquement |

Fichiers dans `claude/agents/`.

---

## D. Ce qu'il ne faut jamais faire

| Anti-pattern | Conséquence |
|---|---|
| « Fais-moi un audit CRO de cette boutique » | Tu obtiens 30 bonnes pratiques génériques, bien écrites et sans valeur |
| Demander le rapport avant d'avoir les données | Le modèle produira des chiffres plausibles. Ils seront faux, et le client les vérifiera |
| Accepter une estimation d'impact chiffrée non sourcée | « +15 % de conversion » inventé est la faute la plus grave possible dans un audit |
| Laisser passer une affirmation technique non vérifiée | Le client la montrera à un développeur |
| Ne pas passer le filtre anti-générique | Ton rapport ressemblera à un rapport automatique à 20 € |
| Demander de « rendre le rapport plus convaincant » | Tu obtiendras de l'emphase, pas des preuves |

Le dernier point mérite d'être explicité : ce qui rend un audit convaincant, ce sont les preuves et la précision, jamais le ton. Si ton rapport te semble faible, il ne manque pas d'adjectifs — il manque de captures d'écran et de données.
