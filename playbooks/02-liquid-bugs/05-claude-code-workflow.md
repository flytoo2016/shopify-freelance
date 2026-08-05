# 05 — Claude Code Workflow (Debug)

---

## A. Le principe

> **Claude Code ne devine pas la cause. Il réduit l'espace de recherche.**

Face à un bug, un modèle de langage produit spontanément une explication plausible et bien formulée. C'est précisément le danger : *plausible* n'est pas *vrai*. Une correction appliquée à une fausse cause fait disparaître le symptôme sans régler le problème — qui reviendra ailleurs, plus tard, et cette fois tu seras celui qui l'a « déjà réparé ».

Trois règles à graver :

1. **Jamais une seule hypothèse.** Toujours trois, classées par probabilité, chacune avec un test qui la valide ou l'élimine.
2. **Claude ne voit pas ton écran.** Il ne charge pas de page, ne clique pas, ne lit pas la console. Les observations viennent de toi. Colle-les.
3. **Aucune correction avant cause racine écrite.** Si Claude propose un correctif alors que la cause n'est pas établie, tu refuses et tu redemandes des hypothèses.

---

## B. Les 12 prompts

### 1 — Localiser le code d'un symptôme

```
LECTURE SEULE. Ne modifie aucun fichier.

Symptôme observé : {{description}}
URL : {{url}}
HTML rendu de la zone concernée (copié depuis DevTools → Elements) :
{{coller le HTML}}

Trouve dans ce thème le code qui produit ce HTML.
Remonte la chaîne complète : template JSON → section → blocks → snippets.
Donne-moi pour chaque maillon : fichier, ligne, et ce qu'il fait.
Termine par la liste des fichiers qui pourraient être en cause, classés par
probabilité, avec une justification en une ligne chacun.
```

### 2 — Trois hypothèses (le prompt central)

```
LECTURE SEULE.

Symptôme : {{description précise}}
Reproduction : {{étapes}}
Environnement : {{navigateur / appareil}}
Console : {{coller les erreurs, ou "aucune"}}
Network : {{requêtes en échec, statut, réponse, ou "rien d'anormal"}}
Tests d'isolation déjà faits : {{thème par défaut / navigation privée / autre produit…}}
Ce qui a changé récemment sur la boutique : {{réponse du client}}

Produis exactement TROIS hypothèses de cause racine, classées par probabilité.

Pour chacune :
- formulation en une phrase, testable
- le code précis qui la rendrait vraie (fichier:ligne si tu le trouves)
- UN test que je peux exécuter en moins de 5 minutes pour la confirmer ou l'écarter
- ce que j'observerais si elle est vraie, et ce que j'observerais si elle est fausse

Ne propose aucune correction. Ne choisis pas à ma place.
Si les informations fournies ne permettent pas de formuler trois hypothèses
sérieuses, dis-le et indique ce qu'il me manque.
```

### 3 — Analyse d'un bug de panier

```
LECTURE SEULE.

Bug panier : {{description}}
Requête observée dans Network :
  URL : {{...}}   Méthode : {{...}}   Statut : {{...}}
  Payload envoyé : {{...}}
  Réponse : {{...}}

Analyse le code du panier de ce thème et vérifie ces points un par un :
1. Les URL de l'API panier sont-elles construites avec window.Shopify.routes.root
   (URL conscientes de la locale) ou codées en dur ?
2. L'endpoint utilisé est-il le bon ? (add.js pour ajouter, change.js pour
   modifier une ligne existante, update.js pour des mises à jour groupées)
3. change.js reçoit-il bien une clé de ligne et non un ID de variante ?
4. Les réponses d'erreur de l'API sont-elles gérées, ou le code suppose-t-il
   toujours un succès ?
5. Le rendu groupé de sections est-il utilisé ? Si oui, les sections demandées
   existent-elles dans le contexte de la page appelante ?
6. Plusieurs écouteurs peuvent-ils déclencher la même requête ?

Réponds point par point avec fichier:ligne. Conclus par les hypothèses classées.
```

### 4 — Bug visible uniquement dans le Theme Editor

```
LECTURE SEULE.

Le site fonctionne en ligne. Dans le personnalisateur : {{symptôme}}.

Analyse {{section}} et son JavaScript associé.
Vérifie :
1. L'initialisation dépend-elle uniquement de DOMContentLoaded ou d'un
   chargement de page complet ?
2. Les événements de l'éditeur sont-ils écoutés ? (shopify:section:load,
   shopify:section:unload, shopify:section:select, shopify:section:deselect,
   shopify:section:reorder, shopify:block:select, shopify:block:deselect)
3. Le nettoyage est-il fait au unload (écouteurs, timers, observers) ?
4. {{ block.shopify_attributes }} est-il présent sur les wrappers de blocs ?
5. request.design_mode ou Shopify.designMode sont-ils utilisés, et pour quoi ?

Rappel : ces variables servent à adapter le comportement du code, jamais à
afficher un rendu différent de celui que verront les acheteurs.
```

### 5 — Schéma ou template JSON invalide

```
LECTURE SEULE.

Symptôme : {{"This section is not available" / section absente / réglages vides}}

Analyse {{sections/xxx.liquid}} et {{templates/xxx.json}} :
1. Le JSON du {% schema %} est-il valide ? Si non : où exactement ?
2. Deux réglages partagent-ils le même id ?
3. Un type de réglage est-il inexistant ou mal orthographié ?
4. Chaque "type" du template JSON correspond-il à un fichier réel de sections/ ?
5. Chaque bloc utilisé dans le template est-il déclaré dans le schéma ?
6. Chaque entrée de "order" existe-t-elle dans "sections" ?
7. Les limites Shopify sont-elles dépassées (nombre de blocs, de réglages) ?

Pour chaque problème : fichier:ligne et correction exacte.
⚠️ Ne modifie AUCUN id de réglage existant : cela détruirait les réglages du
marchand. Si un id doit changer, arrête-toi et préviens-moi.
```

### 6 — Metafields et sources dynamiques

```
LECTURE SEULE.

Symptôme : {{champ vide / [object Object] / connexion impossible dans l'éditeur}}
Sortie du REPL Liquid (shopify theme console) :
{{coller le résultat de {{ product.metafields.namespace | json }}}}

Analyse le code d'affichage et vérifie :
1. Est-ce l'objet metafield ou sa valeur qui est affiché ?
2. Le namespace et la clé correspondent-ils exactement ?
3. Le metafield est-il défini au niveau produit ou variante ? Le code
   correspond-il ?
4. Y a-t-il une garde {% if %} pour les produits où il est absent ?
5. Le type du metafield est-il compatible avec le type de réglage utilisé pour
   la source dynamique ?
```

### 7 — Diff entre thème sain et thème cassé

```
Deux répertoires : {{chemin/theme-sain}} et {{chemin/theme-casse}}.
Compare-les.

Liste les différences par ordre de probabilité d'être la cause de : {{symptôme}}.
Ignore les différences cosmétiques (espaces, ordre de propriétés CSS).
Concentre-toi sur : logique Liquid, sélecteurs JS, schémas, templates JSON,
scripts ajoutés ou retirés.
Pour chaque différence significative : fichier, nature du changement, et lien
possible avec le symptôme.
```

### 8 — Analyse d'historique Git

```
Le bug est apparu entre {{date_saine}} et {{date_cassée}}.

Exécute :
  git log --oneline --since="{{date_saine}}" --until="{{date_cassée}}"
  git log -p --since="{{date_saine}}" -- {{fichier suspect}}

Analyse les commits de cette période et identifie ceux qui touchent au code
susceptible de produire {{symptôme}}.
Classe-les par probabilité et propose l'ordre dans lequel je devrais les tester
avec git bisect.
```

### 9 — Suspicion de conflit d'application

```
LECTURE SEULE.

Erreur console : {{coller, avec l'origine du fichier}}
Applications installées : {{liste}}

1. Cette erreur provient-elle du thème ou d'un domaine tiers ?
2. Si elle vient du thème : une application pourrait-elle en être la cause
   (élément DOM remplacé, variable globale écrasée, ordre de chargement) ?
3. Où le thème dépend-il d'éléments qu'une application pourrait remplacer ?
4. Quels contournements côté thème sont possibles, et lesquels sont fragiles ?

Distingue clairement : ce que je peux corriger dans le thème / ce qui relève de
l'éditeur de l'application.
```

### 10 — Correction (après cause racine établie)

```
Cause racine confirmée : {{une phrase}}
Preuve : {{test qui l'a confirmée}}

Propose la correction MINIMALE.
Avant toute modification, montre-moi :
- le code actuel
- le code proposé
- ce qui change exactement et pourquoi
- ce qui pourrait casser ailleurs
- s'il s'agit d'une correction de cause ou d'un contournement (dis-le clairement)

Attends mon "GO". Ensuite : modifie, lance theme check, montre git diff, propose
un message de commit, et liste ce que je dois tester manuellement.
```

### 11 — Contrôle de non-régression

```
Analyse git diff.

1. Une modification sort-elle du périmètre du bug corrigé ?
2. Un sélecteur CSS ou un id supprimé est-il utilisé ailleurs (JS, autre section,
   ou potentiellement par une application) ?
3. Un id de réglage {% schema %} a-t-il changé ?
4. {{ block.shopify_attributes }} est-il toujours présent ?
5. Du code de débogage subsiste-t-il ({{ x | json }}, console.log, <pre>) ?
6. Une garde {% if %} a-t-elle été retirée, exposant un cas non géré ?
7. Quels parcours utilisateur doivent être retestés en priorité ?

Verdict : GO / GO AVEC RÉSERVES / STOP.
```

### 12 — Explication au client

```
Rédige l'explication de ce bug pour le marchand, qui n'est pas développeur.

Données :
- symptôme : {{...}}
- cause racine : {{...}}
- correction : {{...}}
- testé : {{...}}

Contraintes :
- 4 paragraphes maximum
- une analogie simple pour la cause, si elle éclaire vraiment
- aucun jargon non expliqué
- dire honnêtement s'il s'agit d'un contournement plutôt que d'une correction
- terminer par une recommandation concrète de prévention, formulée comme un
  conseil et non comme une vente
- ne blâmer personne, y compris le prestataire précédent
```

Le dernier point n'est pas de la politesse : dénigrer le développeur précédent inquiète le client sur ce que **toi** tu diras de lui plus tard.

---

## C. Les 3 agents

Fichiers dans `claude/agents/`.

| Agent | Rôle | Écriture |
|---|---|---|
| `bug-hunter` | Localise, formule trois hypothèses, ne conclut jamais seul | ❌ |
| `theme-fixer` | Applique une correction minimale à la fois | ✅ encadrée |
| `regression-tester` | Relit le diff, cherche les effets de bord | ❌ |

Rappel Phase 1 : un sous-agent ne peut pas afficher de demande de permission interactive. Les agents d'analyse restent en lecture seule ; l'écriture passe par l'agent principal, sous ton contrôle.

---

## D. Ce qu'il ne faut jamais faire

| Anti-pattern | Conséquence |
|---|---|
| « Corrige ce bug » sans reproduction ni observations | Correction plausible appliquée à une fausse cause |
| Accepter la première explication proposée | Le symptôme disparaît, le bug survit |
| Laisser Claude « nettoyer pendant qu'il y est » | Diff illisible, régressions imprévisibles |
| Corriger plusieurs bugs en une passe | Impossible d'annuler l'un sans l'autre |
| Demander l'explication client avant d'avoir la cause | Le modèle produira une explication crédible et fausse, que tu enverras au client |
| Oublier de retirer le code de débogage | `{{ x | json }}` en production = fuite de données |
