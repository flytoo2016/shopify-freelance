# 12 — Delivery Checklist

---

## A. Séquence de livraison

```
QUALITY GATE OK
      ↓
PUSH sur thème NON PUBLIÉ
      ↓
LIEN DE PREVIEW  (shopify theme share)
      ↓
ENVOI RAPPORT + AVANT/APRÈS + ROLLBACK
      ↓
FENÊTRE DE RELECTURE CLIENT (48 h)
      ↓
ACCORD ÉCRIT DE PUBLICATION
      ↓
PUBLICATION à heure creuse
      ↓
VÉRIFICATION H+0 / H+1
      ↓
SUIVI J+2 / J+7 / J+30
      ↓
DEMANDE D'AVIS  →  UPSELL
```

**L'accord écrit n'est pas une formalité.** « Il m'avait dit oui au téléphone » ne vaut rien le jour où le client affirme n'avoir jamais validé.

---

## B. Checklist avant envoi

```
[ ] Quality Gate : 8 conditions critiques PASS
[ ] Thème poussé en NON PUBLIÉ, nommé "{{Thème}} — optimisé {{date}}"
[ ] Lien de preview testé dans un navigateur vierge
[ ] Backup daté présent sur le store et vérifié
[ ] Mesures after complètes et archivées
[ ] Rapport relu : aucun chiffre non mesuré, aucune promesse
[ ] Avant/après : conditions de mesure explicitées
[ ] Plan de rollback écrit avec les IDs de thèmes réels
[ ] Liste des décisions qui reviennent au client
[ ] Liste de ce qui n'a pas été fait, avec les raisons
[ ] Documents convertis en PDF
[ ] git log propre, messages lisibles
[ ] Aucun secret dans le dépôt
```

---

## C. Publication

```
[ ] Accord écrit reçu et archivé
[ ] Heure creuse choisie (consulter les analytics du client)
[ ] Aucune promo ni campagne en cours de lancement
[ ] Backup vérifié une dernière fois
[ ] shopify theme publish --theme {{id}}
[ ] H+0 : home, collection, produit, ajout panier, checkout jusqu'au paiement
[ ] H+0 : mobile réel, pas seulement l'émulateur
[ ] H+0 : console sans nouvelle erreur
[ ] H+1 : le flux de commandes se poursuit normalement
[ ] Message de confirmation envoyé au client
```

---

## D. Suivi

| Moment | Action | Objectif |
|---|---|---|
| J+2 | « Tout se comporte normalement de votre côté ? » | Détecter tôt |
| J+7 | Premier relevé du dashboard (partiel) | Montrer la tendance |
| J+14 | Rappel des décisions en attente (apps) | Réactiver l'upsell |
| **J+30** | **Relevé complet du P75 + mini-rapport** | **Le moment clé** |
| J+30 | Demande d'avis | Le meilleur moment : chiffres en main |
| J+60 | « Avez-vous installé de nouvelles apps ? » | Ouvrir le retainer |

Le J+30 est le pivot commercial de toute cette prestation. Le client a oublié la facture, il voit une amélioration mesurée, et tu arrives avec des données. C'est là que se signent les retainers et que se laissent les meilleurs avis.

---

## E. Conventions Git

### Branches

```
main                      état livré / publié
develop                   intégration
perf/lcp-hero-image       un correctif
perf/defer-scripts
fix/cart-drawer-regression
audit/baseline
```

### Commits — format

```
<type>(<scope>): <description à l'impératif>

<pourquoi, pas quoi>
<métrique visée + mesure si disponible>
<risque et ce qui a été testé>
```

Types : `perf` · `fix` · `refactor` · `docs` · `chore` · `revert`

### Exemples

```
perf(hero): charger l'image de bannière en eager avec preload

L'image LCP était en loading="lazy" via le comportement par défaut de image_tag,
la section pouvant être déplacée dans l'éditeur.
Utilisation de section.index/section.location pour ne prioriser que la 1re section.
LCP mobile labo : 4,1 s → 2,6 s (médiane de 3 runs).
Testé : home, éditeur de thème, section déplacée en 3e position.
```

```
perf(scripts): retirer le code résiduel de l'app Bold Options désinstallée

L'app n'apparaît plus dans la liste des apps installées (confirmé par le client
le 12/03). Le snippet et l'appel dans theme.liquid subsistaient.
-38 KB sur toutes les pages, une requête réseau en moins.
Testé : parcours produit complet, aucune variante impactée.
```

```
revert: annuler perf(scripts): defer sur review-widget.js

Le widget d'avis n'apparaissait plus sur Safari iOS 17.
Cause : dépendance à une globale définie par un script inline en amont.
Sera repris avec un chargement différé à l'interaction.
```

### Tags

```
baseline           état reçu, avant toute modification
delivered-v1       ce qui a été livré au client
published-YYYYMMDD état publié en production
```

### Le diff comme livrable

```bash
git log --oneline baseline..HEAD
git diff baseline..HEAD --stat
git diff baseline..HEAD > 07_delivery/changes.diff
```

Joindre le `--stat` au rapport est un signal de professionnalisme fort : le client voit exactement le volume et la localisation des modifications, et peut faire auditer ton travail. Peu de prestataires acceptent cette transparence — c'est précisément pour ça qu'elle vaut quelque chose.

---

## F. Clôture de mission

```
[ ] Tous les livrables envoyés en PDF
[ ] Dépôt Git archivé (ou transmis au client s'il le souhaite)
[ ] Rappel au client de révoquer l'accès Theme Access après la garantie
[ ] Avis demandé
[ ] Fiche de retour d'expérience remplie pour toi : temps réel passé, gains
    obtenus, ce qui a mal tourné, ce qui a été rentable
[ ] knowledge/performance/ enrichi de ce que tu as appris
[ ] J+60 planifié dans ton agenda
```

La fiche de retour d'expérience est ce qui fait progresser ton prix. Sans elle, tu factureras dans deux ans le prix d'aujourd'hui pour un travail que tu feras deux fois plus vite.
