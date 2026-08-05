# 04 — Debugging Methodology

```
CLIENT PROBLEM
      ↓
REPRODUCE          si tu ne peux pas, tu n'as pas de mission
      ↓
ISOLATE            thème ? app ? données ? navigateur ? éditeur ?
      ↓
TRACE              du symptôme jusqu'à la ligne
      ↓
ROOT CAUSE         une phrase, testable, falsifiable
      ↓
FIX                minimal
      ↓
TEST               le bug est mort
      ↓
REGRESSION TEST    rien d'autre n'est mort
      ↓
DELIVERY
```

---

## 1. REPRODUCE

**Objectif :** obtenir une séquence d'actions qui produit le bug **à volonté**.

Tant que tu n'as pas ça, tu n'as rien. Un bug non reproductible ne peut pas être corrigé, et surtout : tu ne pourras jamais prouver que tu l'as réparé.

### Procédure

1. Suivre exactement les étapes du client, sans improviser
2. Même navigateur, même type d'appareil
3. Noter la séquence minimale — retirer chaque étape et vérifier si le bug persiste
4. Écrire la reproduction dans `01_diagnosis/reproduction.md`

```markdown
## Reproduction — {{bug}}
Environnement : {{navigateur}} {{version}} / {{appareil}} / {{OS}}
URL : {{url}}
Prérequis : {{panier vide, utilisateur déconnecté, etc.}}

Étapes :
1. …
2. …
3. …

Résultat observé : …
Résultat attendu : …
Fréquence : systématique / intermittente ({{n}} fois sur 10)
Preuve : evidence/{{fichier}}
```

### Si tu ne reproduis pas

Ne pars pas. Cherche la **variable** qui manque :

| Piste | Test |
|---|---|
| Navigateur ou version différents | Demander une capture de la page `whatismybrowser.com` |
| Appareil réel vs émulateur | Tester sur un vrai téléphone |
| Session client connecté | Créer un compte de test |
| État du panier | Panier non vide, plusieurs articles, article en rupture |
| Devise / pays / langue | Changer de marché |
| Produit spécifique | Tester le produit exact mentionné |
| Cache ou extension | Navigation privée, autre profil |
| Heure ou promotion active | Réduction automatique en cours ? |
| Intermittence | Répéter 20 fois, noter le ratio |

**Si après tout cela le bug reste introuvable :** dis-le honnêtement, propose un enregistrement de session côté client, et **ne facture pas une correction à l'aveugle**. Un correctif posé sans reproduction est une supposition payante.

---

## 2. ISOLATE

**Objectif :** déterminer *si* c'est le thème, avant de chercher *où* dans le thème.

Cinq tests, dans cet ordre, cinq minutes au total.

### Test 1 — Thème par défaut
Installer Dawn (ou Skeleton) en thème **non publié**, ouvrir le lien de preview, reproduire.
- Bug **disparaît** → le problème est dans le thème du client
- Bug **persiste** → application, donnée, ou configuration du store

C'est le test le plus discriminant de tout le métier, et le plus négligé.

### Test 2 — Navigation privée
- Disparaît → cache, extension, session, ou cookie
- Persiste → serveur ou code

### Test 3 — Console
Ouvrir avant de charger la page. Noter **la première** erreur, et surtout son **origine** :
- `cdn.shopify.com/s/files/.../theme.js` → ton thème
- `cdn.autreappli.com/...` → une application
- Une erreur du thème peut néanmoins avoir été **causée** par une application (élément supprimé, globale écrasée)

### Test 4 — Theme Editor
Le bug se produit-il aussi dans le personnalisateur ? S'il n'existe **que** là → famille « éditeur » (voir taxonomie §11).

### Test 5 — Variation de contexte
Autre produit, autre collection, autre appareil, panier vide vs plein.
- Bug sur un seul produit → **donnée**
- Bug partout → **code**

### Isolation d'une application, sans désinstaller

⚠️ Ne jamais désinstaller une application pour tester : la désinstallation peut détruire des données de façon irréversible.

Méthode sûre, sur le thème de développement uniquement :
1. Repérer l'injection du script (bloc d'application dans un template JSON, ou balise `<script>` dans le thème)
2. La commenter **sur la copie de dev**
3. Tester
4. Rétablir

Si l'application s'injecte via `content_for_header` (extension d'application), tu ne peux pas la neutraliser depuis le thème. Dans ce cas : désactiver le bloc d'application dans le personnalisateur du thème de dev, ou passer par le support de l'éditeur.

---

## 3. TRACE

**Objectif :** remonter du symptôme visible jusqu'à la ligne responsable.

### Chaîne de traçage

```
Symptôme visible
   ↓  DevTools → Elements : quel HTML est réellement rendu ?
HTML rendu
   ↓  Rechercher une classe ou un texte unique dans le thème
Fichier Liquid
   ↓  Suivre les {% render %} et {% section %}
Fichier source
   ↓  Vérifier les données avec shopify theme console
Cause
```

### Les cinq outils de traçage

**1. Recherche par ancrage unique**
```bash
grep -rn "texte-visible-unique" sections/ snippets/ blocks/ templates/
grep -rn "ma-classe-css" . --include="*.liquid" --include="*.js" --include="*.css"
```

**2. Le REPL Liquid — l'outil décisif**
```bash
shopify theme console --url /products/le-produit-en-cause
```
Il évalue du Liquid **sur les données réelles du store**, avec le contexte de la page. Tu peux inspecter `product.metafields`, `product.selected_variant`, `cart.items`, et voir immédiatement ce qui est réellement disponible — au lieu de le supposer.

**3. Le débogage par sortie JSON**
```liquid
{%- comment -%} temporaire, à retirer avant commit {%- endcomment -%}
<pre style="max-height:300px;overflow:auto">{{ product.metafields.custom | json }}</pre>
```
La règle absolue : ce code sort du thème avant le commit final. Un `{{ x | json }}` oublié en production est une fuite de données potentielle.

**4. Network**
Pour tout bug de panier, de filtre ou de mise à jour partielle : statut, payload envoyé, réponse reçue. La cause y est visible dans la majorité des cas.

**5. `git bisect`** — quand un historique existe
```bash
git bisect start
git bisect bad                    # état actuel, cassé
git bisect good baseline          # dernier état sain connu
# Git propose un commit ; tu testes ; tu réponds :
git bisect good   |   git bisect bad
git bisect reset
```
Sur une centaine de commits, huit tests suffisent à identifier le fautif. Sans historique Git, cette méthode est indisponible — argument concret pour vendre la mise en place du versionnage.

---

## 4. ROOT CAUSE

**Objectif :** une phrase, testable, falsifiable.

### Le test de qualité

Une cause racine correcte permet de **prédire** le comportement. Si tu ne peux pas dire « si je fais X, alors Y devrait se produire », tu n'as pas la cause — tu as une corrélation.

| Mauvaise formulation | Bonne formulation |
|---|---|
| « Il y avait un problème de JavaScript » | « Le script du panier écoute `.add-to-cart`, mais l'application de bundles remplace le formulaire après chargement et la classe devient `.atc-btn` — l'écouteur est posé sur un élément qui n'existe plus » |
| « Le metafield ne s'affichait pas » | « Le template affiche `product.metafields.custom.care`, or le metafield est défini au niveau de la **variante** — il est donc vide sur la page produit » |
| « J'ai corrigé le CSS » | « Une règle `overflow: hidden` sur `.product__info` masquait le sélecteur de quantité en dessous de 480 px » |

### Les trois hypothèses

Ne t'arrête jamais à une seule explication. Formule **trois** hypothèses, classées par probabilité, chacune avec **un test qui la valide ou l'élimine**.

```markdown
## Hypothèses — {{bug}}

### H1 (probable) — {{formulation}}
Test : {{action}} → si H1 vraie, on observe {{résultat}}
Résultat : ✅ confirmée / ❌ écartée

### H2 (possible) — …
### H3 (peu probable mais à écarter) — …
```

Garde les hypothèses écartées dans `hypotheses.md`. Elles servent deux fois : elles t'empêchent de tourner en rond, et elles alimentent le rapport client — montrer ce qui a été écarté démontre la rigueur du travail bien mieux que la seule solution.

---

## 5. FIX

Trois principes.

**Minimal.** Tu corriges la cause, rien d'autre. Aucun nettoyage opportuniste, aucune amélioration au passage. Le diff doit être aussi petit que possible.

**Un bug = un commit.** Deux bugs corrigés dans un commit sont impossibles à annuler séparément.

**Cause, pas symptôme.** `display: none` sur un élément qui ne devrait pas être là ne corrige rien : il masque. Le vrai problème ressortira ailleurs. Si le contournement est la seule option (code d'application non modifiable), **écris-le explicitement dans le rapport** : le client doit savoir qu'il s'agit d'un contournement et qu'il peut cesser de fonctionner à la prochaine mise à jour de l'application.

### Message de commit

```
fix(cart): rétablir l'ajout au panier avec l'application de bundles

L'écouteur ciblait .add-to-cart. L'application Bundle Builder remplace le
formulaire produit après chargement, et le bouton devient .atc-btn.
Remplacement par une délégation d'événement sur le conteneur du formulaire,
qui n'est pas remplacé.
Testé : ajout simple, ajout de bundle, changement de variante, drawer,
checkout — Chrome desktop, Safari iOS 17 réel.
```

---

## 6 & 7. TEST et REGRESSION

Voir `09-testing-and-regression.md`. Le principe : trois cercles — le bug, la zone, le parcours d'achat complet.

---

## Discipline de temps

Le debug peut engloutir des journées. Deux garde-fous :

**La règle des 30 minutes.** Si après 30 minutes sur une piste tu n'as pas progressé, tu l'abandonnes et tu passes à l'hypothèse suivante. L'entêtement est le principal destructeur de marge de cette prestation.

**La règle des 3 heures.** Si après 3 heures tu n'as pas de cause racine, tu écris au client :

> J'ai avancé sur le diagnostic. J'ai écarté {{A}}, {{B}} et {{C}} — voici ce que j'ai vérifié. La cause est plus profonde que prévu et se situe probablement du côté de {{D}}. Je peux continuer, mais je préfère vous prévenir avant d'engager du temps supplémentaire : {{estimation}}. Vous préférez que je poursuive, ou que je vous livre un rapport de ce qui a été écarté ?

Tu es transparent, tu montres du travail réel, et tu ne travailles pas gratuitement. Les clients acceptent presque toujours de poursuivre — parce que tu viens de démontrer que tu sais où tu vas.
