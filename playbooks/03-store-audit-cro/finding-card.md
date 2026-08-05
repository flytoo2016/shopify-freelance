# Fiche de constat — modèle

À copier pour chaque constat dans `clients/{{client}}/01_audit/findings/{{ID}}.md`.

---

### {{ID}} — {{Titre factuel, une ligne, sans adjectif}}

**Zone** : {{une des 29}}
**Dimension** : {{une des 10 du scoring}}
**Priorité** : P0 / P1 / P2 / P3
**Cause CRO** : friction / hésitation / rejet / technique

**Constat.**
{{Ce qui est observé, factuellement. 1 à 3 phrases. Aucune interprétation ici.}}

**Preuve.**
- Capture : `evidence/{{ID}}-{{zone}}-{{appareil}}.png`
- Donnée : {{chiffre + source + période}}
- Code : {{fichier:ligne}}

**Pourquoi c'est un problème.**
{{Le mécanisme : ce que ça produit chez le visiteur et pourquoi ça coûte.
2 à 4 phrases, appuyées sur les données de CE client. C'est ici qu'est ta valeur.}}

**Statut de l'affirmation** : [Donnée] / [Mesure] / [Observation] / [Hypothèse]

**Impact estimé** : Élevé / Moyen / Faible
**Base de l'estimation** : {{exposition — quelle part du trafic est concernée —
et sur quoi repose l'estimation. Dire honnêtement ce qui relève de l'hypothèse.}}

**ICE** : Impact {{1-5}} × Confiance {{1-5}} / Effort {{1-5}} = {{score}}

**Effort** : {{n}} h
**Nature** : réglage admin / code thème / application tierce
**Qui peut le faire** : le client lui-même / son agence / moi

**Recommandation.**
{{Quoi faire, assez précisément pour qu'un développeur l'exécute sans me rappeler.}}

**Résultat attendu.**
{{Ce qui devrait changer, en termes observables.}}

**Comment le mesurer.**
{{Quel indicateur, où le trouver, sur quelle durée, et à quoi le comparer.}}

**Lot** : 1 / 2 / 3 / non retenu
**Statut** : à faire / en cours / fait / écarté par le client

---

## Contrôle avant intégration au rapport

```
[ ] Le fichier de preuve existe réellement et porte le bon nom
[ ] Le constat cite au moins une donnée ou une observation propre à ce client
[ ] Le champ "pourquoi" ne pourrait pas être copié dans un autre audit
[ ] L'estimation d'impact précise ce qui est mesuré et ce qui est supposé
[ ] L'effort est chiffré et la nature qualifiée
[ ] La recommandation est exécutable par un tiers
[ ] Aucune promesse de gain chiffré
```

**Le filtre décisif :** ce constat pourrait-il être copié-collé dans l'audit d'une autre boutique Shopify ? Si oui, il devient spécifique ou il est supprimé.
