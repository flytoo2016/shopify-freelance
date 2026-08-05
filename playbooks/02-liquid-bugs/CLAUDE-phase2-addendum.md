# CLAUDE.md — Addendum Phase 2 (Debug)

> À ajouter au `CLAUDE.md` de la Phase 1, qui reste intégralement en vigueur.
> Ce fichier ne le remplace pas : il ajoute les règles propres au debug.

---

## CONTEXTE

En mission de correction de bug, quelque chose est déjà cassé sur une boutique qui vend. Deux risques se cumulent : ne pas réparer, et casser autre chose. Le second est le plus grave — le client t'a appelé parce qu'il avait un problème, pas deux.

---

## RÈGLE FONDAMENTALE

**Tu ne devines pas la cause. Tu réduis l'espace de recherche.**

Face à un symptôme, tu es capable de produire une explication plausible et bien écrite. C'est précisément le danger : plausible n'est pas vrai. Une correction appliquée à une fausse cause fait disparaître le symptôme sans régler le problème.

---

## LES SEPT RÈGLES DU DEBUG

1. **Jamais une seule hypothèse.** Toujours trois, classées par probabilité, chacune accompagnée d'un test qui la valide ou l'élimine en moins de cinq minutes.
2. **Aucune correction avant cause racine écrite.** Si la cause n'est pas établie, tu refuses de proposer un correctif et tu demandes les observations manquantes.
3. **Tu ne vois pas l'écran.** Tu ne charges pas de page, tu ne cliques pas, tu ne lis pas la console ni le réseau. Toutes les observations viennent de l'humain. Si elles manquent, tu les réclames au lieu de les supposer.
4. **Distingue toujours** ce qui est **observé** (fourni dans le contexte), **déduit** (raisonnement sur le code), et **supposé** (hypothèse non vérifiée). Étiquette chaque affirmation.
5. **Correction minimale.** Tu corriges la cause, rien d'autre. Aucun nettoyage opportuniste, aucune amélioration au passage, aucun reformatage.
6. **Un bug = un commit.** Deux corrections dans un commit sont impossibles à annuler séparément.
7. **Cause, pas symptôme.** Masquer un élément ne corrige rien. S'il s'agit d'un contournement — parce que la cause est dans du code non modifiable — tu le dis explicitement, dans le commit et dans le rapport.

---

## INTERDITS SPÉCIFIQUES

- **Ne jamais proposer de désinstaller une application** pour tester. La désinstallation peut détruire des données de façon irréversible. La neutralisation se fait sur la copie de développement.
- **Ne jamais renommer ou supprimer un `id` de réglage `{% schema %}`.** Les valeurs saisies par le marchand y sont attachées. Si c'est inévitable, tu t'arrêtes et tu préviens.
- **Ne jamais laisser de code de débogage** : `{{ x | json }}`, blocs `<pre>`, `console.log`, `debugger`. Vérification obligatoire avant chaque commit.
- **Ne jamais affirmer qu'un bug est corrigé** sans confirmation de test par l'humain.
- **Ne jamais rédiger l'explication client** avant que la cause racine soit établie et confirmée. Une explication crédible et fausse envoyée à un client est pire que pas d'explication.
- **Ne jamais blâmer** le développeur précédent, l'éditeur d'une application ou le client dans un document destiné au client.

---

## RÉFLEXES DE DIAGNOSTIC

Avant de chercher **où** dans le thème, établir **si** c'est le thème :

1. Le bug existe-t-il sur un thème par défaut en preview ?
2. Existe-t-il en navigation privée ?
3. L'erreur console provient-elle du thème ou d'un domaine tiers ?
4. Existe-t-il aussi dans le Theme Editor, ou seulement là ?
5. Est-il présent sur d'autres produits / pages ?

Si ces informations ne sont pas dans le contexte, demande-les avant d'analyser du code.

---

## SIGNATURES À VÉRIFIER SYSTÉMATIQUEMENT

| Observation | Piste prioritaire |
|---|---|
| Exactement 50 éléments affichés | Limite de boucle Liquid — `{% paginate %}` manquant |
| Zone vide dans un snippet | Scope isolé de `{% render %}` — variable non passée |
| Casse sur un marché mais pas l'autre | URL non conscientes de la locale — `window.Shopify.routes.root` |
| La quantité ne se met pas à jour | `update.js` sur un ID de variante présent sur plusieurs lignes |
| Drawer vide après ajout | Section retournée `null` dans une réponse 200 non gérée |
| Marche en ligne, casse dans l'éditeur | Événements `shopify:section:*` non écoutés |
| « This section is not available » | JSON de schéma ou de template invalide |
| Bug sur un seul produit | Donnée manquante, pas code — garde `{% if %}` |
| Casse après un filtre ou un changement de variante | Écouteur posé sur un élément remplacé — délégation nécessaire |
| Plusieurs choses cassées d'un coup | Première erreur console interrompant le script |

---

## OUTILS À PRIVILÉGIER

- **Vérifier l'existence** d'un objet, d'une propriété, d'un filtre, ou le contrat d'une API → **Dev MCP**, systématiquement plutôt que la mémoire.
- **Vérifier une donnée réelle du store** → demander à l'humain d'exécuter `shopify theme console --url {{page}}` et de coller le résultat.
- **Localiser du code** → `grep` sur un ancrage unique (texte visible, classe CSS).
- **Trouver le commit fautif** → proposer `git bisect` dès qu'un historique existe.
- **Valider le Liquid corrigé** → `validate_theme` puis `shopify theme check --fail-level error`.

---

## FORMAT DE RÉPONSE ATTENDU

En phase de diagnostic :

```
OBSERVÉ      ce que le contexte fourni établit
DÉDUIT       ce que la lecture du code permet de conclure
MANQUANT     ce qu'il me faut pour aller plus loin

HYPOTHÈSE 1 (probable)  — formulation testable
  Code concerné : fichier:ligne
  Test : {{action}} → si vraie, on observe {{X}} ; si fausse, {{Y}}

HYPOTHÈSE 2 (possible)  — …
HYPOTHÈSE 3 (à écarter) — …
```

En phase de correction :

```
CAUSE RACINE   une phrase
NATURE         correction / contournement
CODE ACTUEL    …
CODE PROPOSÉ   …
CE QUI CHANGE  …
RISQUE         ce qui pourrait casser ailleurs
→ attendre GO
```

---

## EN CAS DE DOUTE

Tu t'arrêtes et tu demandes. Sur une boutique en panne, une question coûte trente secondes ; une supposition peut coûter une journée de chiffre d'affaires et la confiance du client.
