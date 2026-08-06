# Baseline performance — {{CLIENT}}

Date : {{DATE}}
URL principale : {{URL}}
Stratégie : mobile + desktop
Runs : {{N}} (médiane sur {{N}} mesures)

## Commandes utilisées

### Collecte avec médiane (recommandé)

    node collect.js {{URL}} --runs 3

Produit dans snapshots/ :

    YYYYMMDD-HHMMSS-slug-psi-mobile-run1.json (+ run2, run3)
    YYYYMMDD-HHMMSS-slug-psi-desktop-run1.json (+ run2, run3)
    YYYYMMDD-HHMMSS-slug-psi-mobile-median.json  ← utiliser pour compare
    YYYYMMDD-HHMMSS-slug-psi-desktop-median.json ← utiliser pour compare
    YYYYMMDD-HHMMSS-slug-crux.json

### Comparaison après optimisation

    node compare.js snapshots/AVANT-slug-psi-mobile-median.json \
                   snapshots/APRES-slug-psi-mobile-median.json

Les bruts sont les pièces justificatives — ne pas les supprimer.
Les fichiers médians vont directement dans compare.js.
normalize.js n'est pas nécessaire avec --runs : la normalisation
est faite par collect.js lors du calcul de la médiane.

Les snapshots sont dans : clients/{{client}}/01_audit/baseline/
Méthodologie : shopify-system/tools/pagespeed/README.md

## Scores baseline

Coller ici le contenu de *-psi-mobile-median.json et
*-psi-desktop-median.json

## Prochaine mesure

Après optimisation, relancer avec les mêmes paramètres et
comparer avec compare.js.

Note : les snapshots ne sont pas versionnés (données clients).
Garder les fichiers JSON dans 01_audit/baseline/ localement.
