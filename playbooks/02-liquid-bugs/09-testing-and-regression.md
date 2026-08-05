# 09 — Testing & Regression

En Phase 1, un test raté coûte un score. En Phase 2, il coûte des commandes — et la confiance d'un client qui t'avait appelé précisément parce que quelque chose était cassé.

---

## A. Les trois cercles

### Cercle 1 — Le bug

Reproduire **exactement** les étapes du rapport initial, dans le même environnement.

```
[ ] Étapes du client suivies à la lettre, dans l'ordre
[ ] Même navigateur, même appareil que celui signalé
[ ] Le bug ne se produit plus
[ ] Testé 3 fois d'affilée (élimine les faux positifs de cache)
[ ] Testé avec un état de départ différent (panier vide / plein, connecté / non)
```

⚠️ **Le piège du « ça a l'air de marcher ».** Si le bug était intermittent, une seule réussite ne prouve rien. Répète autant de fois que nécessaire pour dépasser la fréquence initiale : un bug qui survenait une fois sur trois exige au moins dix essais réussis.

### Cercle 2 — La zone

Tout ce qui touche aux fichiers modifiés.

```
[ ] Toutes les pages qui utilisent la section ou le snippet corrigé
[ ] Tous les cas de figure : produit simple / à variantes / en rupture / en promo
[ ] Le comportement responsive de la zone
[ ] La zone dans le Theme Editor
```

Le point le plus oublié : un snippet corrigé pour la page produit est souvent utilisé aussi sur les collections, la recherche et les produits recommandés. Cherche systématiquement :

```bash
grep -rn "render 'le-snippet-modifie'" .
```

### Cercle 3 — Le parcours d'achat complet

**Systématiquement**, même pour une correction CSS d'une ligne.

```
[ ] Accueil charge, menu desktop et mobile
[ ] Recherche renvoie des résultats
[ ] Collection : filtres, tri, pagination
[ ] Page produit : galerie, changement de variante (image + prix + disponibilité)
[ ] Ajout au panier → confirmation visible
[ ] Modification de quantité, suppression d'un article
[ ] Panier / drawer : totaux corrects
[ ] Bouton Commander atteint l'écran de paiement (ne pas payer)
[ ] Console : aucune NOUVELLE erreur par rapport à la baseline
```

Le dernier point suppose que tu as relevé les erreurs console **avant** ton intervention. Un thème client en a souvent déjà. Ce qui compte, ce sont les nouvelles — sans point de comparaison, tu ne peux rien affirmer.

---

## B. Matrice d'environnements

| Priorité | Environnement | Raison |
|---|---|---|
| **Obligatoire** | L'appareil/navigateur exact du signalement | C'est là que le client vérifiera |
| **Obligatoire** | iPhone réel (Safari) | Comportements divergents, gros segment e-commerce |
| **Obligatoire** | Chrome desktop | Référence |
| **Obligatoire** | Chrome Android ou émulation mobile | Majorité du trafic |
| Recommandé | Safari macOS | |
| Recommandé | Firefox | |
| Si le store est multi-marché | Chaque marché actif | Les bugs de locale ne se voient que là |

La dernière ligne est spécifique à cette phase : les bugs d'URL non localisées sont invisibles sur le marché principal.

---

## C. Tests spécifiques par famille

| Famille de bug | Tests supplémentaires obligatoires |
|---|---|
| **Panier** | Panier vide, un article, plusieurs articles, même variante en double avec propriétés différentes, article en rupture, code promo actif, chaque marché |
| **Variantes** | Produit à 1 option, à 2 options, à 3 options, combinaison indisponible, produit en rupture totale |
| **Collections / filtres** | Collection vide, avec 1 produit, avec plus de 50 produits, filtres combinés, tri + filtre + pagination ensemble |
| **Theme Editor** | Ajouter, déplacer, dupliquer, masquer puis réafficher la section ; ajouter et supprimer un bloc ; modifier chaque réglage |
| **Responsive** | 320 px, 375 px, 768 px, 1024 px, 1440 px ; rotation portrait/paysage ; clavier virtuel ouvert |
| **Metafields** | Un produit où la donnée existe, un où elle est absente, un où elle est vide |
| **Conflit d'application** | Avec l'application active ; et vérifier que le contournement n'a pas cassé la fonction de l'application |

---

## D. QUALITY GATE — Phase 2

Bloquant. Une seule condition critique en échec → **STOP DELIVERY**.

### CRITIQUES

```
[ ] C1  Le bug était reproductible AVANT et est introuvable APRÈS
[ ] C2  Vérifié sur l'appareil/navigateur exact du signalement
[ ] C3  La cause racine est identifiée et formulée par écrit
[ ] C4  shopify theme check --fail-level error → 0 erreur
[ ] C5  Aucune nouvelle erreur console par rapport à la baseline
[ ] C6  Parcours d'achat complet fonctionnel
[ ] C7  Theme Editor fonctionnel sur les sections touchées
[ ] C8  git diff minimal, relu ligne par ligne, aucun changement hors périmètre
[ ] C9  Aucun code de débogage résiduel
[ ] C10 Aucun id de réglage {% schema %} modifié
[ ] C11 config/settings_data.json non écrasé
[ ] C12 Sauvegarde datée existante et vérifiée sur le store
```

**C3 est aussi bloquant que les autres.** Un symptôme qui disparaît sans cause identifiée est un bug en sommeil : tu ne sais pas si tu l'as réparé ou déplacé. Si la cause reste inconnue après un correctif efficace, dis-le honnêtement au client plutôt que de laisser croire à une maîtrise que tu n'as pas.

### STANDARD

```
[ ] 13  Testé sur au moins 3 environnements
[ ] 14  Cas limites de la famille de bug couverts
[ ] 15  Chaque marché testé si le store est multi-marché
[ ] 16  Commit atomique et message explicite
[ ] 17  Plan de rollback écrit
[ ] 18  Explication client rédigée en langage non technique
[ ] 19  Hypothèses écartées documentées
[ ] 20  Recommandation de prévention formulée
```

### Prompt d'exécution

```
Exécute le Quality Gate de 09-testing-and-regression.md.

Pour chaque condition automatisable (C4, C8, C9, C10, C11, 16) : vérifie
réellement (commande ou lecture de code), réponds PASS / FAIL, et pour chaque
FAIL donne fichier:ligne et correction.

Pour les conditions manuelles, produis la liste exacte de ce que je dois tester,
en tenant compte de la famille de bug : {{famille}}.

Si une condition CRITIQUE échoue, écris **STOP DELIVERY** en tête et n'aborde
pas le reste.
```

---

## E. Le test de la cause racine

Avant de livrer, pose-toi cette question : **peux-tu recréer le bug volontairement ?**

Si tu peux le faire réapparaître en annulant précisément ta correction, tu as compris la cause. Si le bug ne revient pas quand tu défais ton correctif, alors ce n'est pas ton correctif qui l'a résolu — et tu ne sais pas ce qui l'a fait.

```bash
git stash          # retirer le correctif
# tester : le bug est-il de retour ?
git stash pop      # le remettre
```

Trente secondes. C'est le contrôle qui distingue une correction d'une coïncidence.

---

## F. Après publication

| Moment | Action |
|---|---|
| H+0 | Publier à heure creuse. Reproduire les étapes du bug sur le site en ligne |
| H+0 | Parcours d'achat complet, sur mobile réel |
| H+1 | Vérifier que les commandes continuent d'arriver |
| J+1 | Message au client : « avez-vous constaté quoi que ce soit d'inhabituel ? » |
| J+3 | Contrôle silencieux : reproduire une dernière fois |
| Fin de garantie | Message de clôture + invitation à révoquer l'accès + prévention |

Le contrôle silencieux de J+3 n'est pas facturé et prend deux minutes. C'est ce qui te permet de détecter un problème **avant** le client — la meilleure façon de transformer une mission ponctuelle en relation durable.
