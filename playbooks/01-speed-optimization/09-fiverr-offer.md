# 09 — Fiverr Offer (Standard, nouveau vendeur)

Offre de lancement pour un compte **Fiverr Standard**, statut **New Seller**, objectif **Level 1 en 60 jours**.

Tout le contenu client est en anglais. Les notes internes sont en français.
Chaque champ soumis à une limite porte son **compte exact de caractères**, vérifié par script (`[...s].length`), pas estimé.

**Interdits appliqués partout :** `guaranteed`, `best`, `expert`, `top-rated`, `Pro`, `Pro Vetted`, tout score chiffré promis, smart quotes, em-dashes dans les titres et les tags.

---

## Limites Fiverr appliquées (référence)

| Champ | Limite | Ce qui compte vraiment |
|---|---|---|
| Titre | 80 char (préfixe `I will ` = 7 inclus) | ~46 char visibles sur card mobile |
| Description | 1 200 char | **110 premiers** = aperçu card |
| Description package | 100 char × 3 | — |
| Tags | 5 × 20 char | lowercase auto, tiret = espace |
| FAQ | 300 char / réponse, 10 max | — |
| Requirements | 200 char / question | — |

---

# SECTION 1 — Gig Title (3 variantes)

Les trois tiennent dans les 46 caractères visibles hors préfixe. C'est rare et c'est un avantage : le titre n'est jamais tronqué sur mobile.

### Variante 1 — angle douleur

```
I will fix your slow Shopify store speed on mobile
```

- **50 char total** (limite 80) — **43 char hors `I will `** (limite visible ~46)
- Visible sur card : `fix your slow Shopify store speed on mobile` — **titre entier, aucune troncature**
- Angle : le client ressent le problème avant de le nommer. `slow`, `Shopify`, `speed`, `mobile` en 43 caractères.
- Keywords dans les 46 premiers : `slow` (4-8), `Shopify` (14-21), `speed` (28-33), `mobile` (37-43) ✅

### Variante 2 — angle méthode

```
I will optimize Shopify speed with before after proof
```

- **53 char total** — **46 char hors `I will `** (pile à la limite visible)
- Visible sur card : `optimize Shopify speed with before after proof` — **titre entier**
- Angle : la preuve, pas la promesse. Cible le client qui s'est déjà fait avoir.
- `before after proof` fait le travail que `guaranteed` ferait chez les autres, sans le risque.

### Variante 3 — angle métrique

```
I will fix Shopify Core Web Vitals LCP CLS and INP
```

- **50 char total** — **43 char hors `I will `**
- Visible sur card : `fix Shopify Core Web Vitals LCP CLS and INP` — **titre entier**
- Angle : client averti, qui a déjà vu son dashboard Shopify au rouge. Volume de recherche plus faible, intention d'achat plus haute.
- 4 keywords exacts : `Core Web Vitals`, `LCP`, `CLS`, `INP`.

**Note interne — lequel publier en premier.**
Ouvre avec la **variante 1**. Un New Seller n'a aucun signal de ranking : il lui faut le volume de recherche le plus large, et `slow shopify store` est la requête la plus tapée des trois. Bascule sur la 2 ou la 3 seulement après ~15 avis, quand la conversion prime sur l'impression.
Un seul titre à la fois : Fiverr ne fait pas d'A/B natif, un changement de titre remet le gig en réindexation pendant quelques jours. Ne change pas de titre avant 30 jours.

---

# SECTION 2 — Les 110 premiers caractères (aperçu card)

C'est le seul texte visible sous l'image, avant clic. Aucune version ne commence par `I`.

### Aperçu 1 — à associer au titre 1 *(c'est aussi le hook de la description ci-dessous)*

```
Slow Shopify store on mobile? The real cause is found in your theme code, fixed and measured, not guessed.
```
**106 char** (limite 110) — nomme le problème (`slow`, `mobile`), donne la raison de cliquer (`the real cause`, `not guessed`).

### Aperçu 2 — à associer au titre 2

```
Speed work you can verify: 3 test runs, median reported, before and after measured under identical setup.
```
**105 char** — `you can verify` + `3 test runs` : la différenciation méthode en une ligne.

### Aperçu 3 — à associer au titre 3

```
Failing Core Web Vitals? LCP, CLS and INP traced to the exact theme file and fixed on a backup theme.
```
**101 char** — `traced to the exact theme file` : compétence technique. `backup theme` : sécurité, dès l'aperçu.

**Note interne.** Si tu changes de titre, change l'aperçu **le même jour** : titre et première ligne doivent raconter la même chose, sinon le taux de clic chute sans que tu saches pourquoi.

---

# SECTION 3 — Description complète

**Total : 1 083 caractères** (limite 1 200, optimum 1 000-1 200 ✅)

```
Slow Shopify store on mobile? The real cause is found in your theme code, fixed and measured, not guessed.

THE PROBLEM
Most speed services install an app, strip some JavaScript, then send one screenshot of a score. One run, no context, nothing you can check afterwards.

WHAT I DO DIFFERENTLY
Every page is tested 3 times and I report the median, never a single lucky run. Before and after are measured under identical conditions. Your theme is duplicated as a dated backup before I touch anything, and each fix is a separate commit, so any single change can be reverted on its own.

HOW IT WORKS
1. You share theme access
2. I duplicate your theme as a backup
3. I measure and audit
4. I fix, one change at a time
5. You get a preview link and a report

IN EVERY PACKAGE
Dated backup, before/after report measured the same way twice, preview link before anything goes live, written rollback plan.

WHAT I WILL NOT DO
No promised score. No app removed without your approval. No edits on your live theme. No design or content changes.

Message me with your store URL before ordering.
```

### Découpe et comptes par bloc

| Bloc | Cible | Réel | |
|---|---|---|---|
| HOOK | 80-100 | **106** | volontairement porté à ~110 pour saturer l'aperçu card |
| THE PROBLEM | 150-180 | **162** | ✅ |
| WHAT I DO DIFFERENTLY | 200-250 | **311** | dépassement assumé, voir note |
| HOW IT WORKS | 150-180 | **169** | ✅ |
| IN EVERY PACKAGE | 100-120 | **142** | ✅ marge disponible |
| WHAT I WILL NOT DO | 80-100 | **134** | 4 phrases, filtre net |
| CTA | 60-80 | **47** | ✅ |

**Vérification de l'aperçu.** Les 110 premiers caractères = le hook (106) + les 2 premières lettres de `THE PROBLEM`. Fiverr écrase les sauts de ligne dans l'aperçu : la card affichera `...not guessed. TH`. Résidu sans conséquence — le hook passe entier.

**Note interne — le dépassement du bloc « WHAT I DO DIFFERENTLY » (311 au lieu de 250).**
Assumé. C'est le seul bloc qui justifie ton prix face à un vendeur à 25 $, et il contient les 4 atouts vérifiables : médiane sur 3 runs, conditions identiques, backup daté, réversibilité par commit. Le budget vient du total (1 083 < 1 200), aucun autre bloc n'est sacrifié.

**Emoji : zéro.** Ni dans le titre, ni dans la description. Le registre de cette offre est « je mesure, tu vérifies ». Un emoji le contredit. Les ✔/✘ de l'ancienne version ont été retirés pour la même raison.

---

# SECTION 4 — Packages

> ⚠️ **PRIX À CONFIGURER SUR FIVERR SELON LA PHASE**
>
> | Phase | Commandes | Basic affiché | Standard | Premium |
> |---|---|---|---|---|
> | **Lancement** | 1 à 3 | **89 $** | **249 $** | **449 $** |
> | **Consolidation** | 4 à 10 | **119 $** | **289 $** | **499 $** |
> | **Cible** | 11+ | **149 $** | **329 $** | **549 $** |
>
> Les prix détaillés ci-dessous correspondent à la **phase Cible**.
> Pendant le lancement, baisser uniquement le Basic.
> Standard et Premium restent à 249 $ et 449 $ dès le premier jour
> (un client qui cherche 89 $ n'achète pas 249 $, pas de cannibalisation).

## Note interne préalable : conversion de la grille et commission

`11-pricing.md` donne la grille **BEGINNER en euros**. Fiverr affiche en dollars et prélève **20 %**.

- **Parité de travail retenue : 1 € = 1 $.** Le taux réel du jour n'a pas été relevé — hypothèse explicite, à réviser avant publication.
- Formule : `net = prix affiché × 0,80`
- Règle : le **net** doit rester au-dessus du **minimum** de la grille BEGINNER, jamais le prix affiché.

| Formule (grille BEGINNER) | Min. grille | Prix affiché Fiverr | Net après 20 % | Position |
|---|---|---|---|---|
| Audit + quick wins | 120 | **149 $** | **119,20 $** | net ≈ minimum |
| Optimisation complète | 250 | **329 $** | **263,20 $** | net > minimum |
| + audit apps | 400 | **549 $** | **439,20 $** | net > minimum |

Un prix affiché de 129 $ te met à 103 $ net : **sous le plancher de la grille**. C'est le piège classique du New Seller.

---

## BASIC — Audit + Priority Fixes

### A. Configuration technique

| Champ | Valeur |
|---|---|
| Prix affiché | **149 $** |
| Net après commission 20 % | **119,20 $** |
| Délai | **3 jours** |
| Révisions | **1** |
| Pages optimisées | 3 |
| Périmètre | Audit complet + correctifs **P0 uniquement** (3 à 5), rapport avant/après |

**Cases à cocher**

| Case | | Justification |
|---|---|---|
| Resize photos | ✅ | Le dimensionnement d'image est le P0 le plus fréquent. Inclus dès le Basic. |
| Minification | ❌ | Hors périmètre P0. Réservé au Standard, sinon le Basic n'a plus d'argument de montée. |
| Browser Caching | ❌ | Voir note ci-dessous. |
| Database Optimization | ❌ | **N'existe pas sur Shopify.** Jamais cochée, aucune formule. |

### B. Description du package

```
Audit + top priority fixes on 3 pages. Dated backup, before/after report, rollback plan.
```
**88 caractères** (limite 100 ✅)

---

## STANDARD — Full Speed Optimization

### A. Configuration technique

| Champ | Valeur |
|---|---|
| Prix affiché | **329 $** |
| Net après commission 20 % | **263,20 $** |
| Délai | **6 jours** *(grille : 5-7 j)* |
| Révisions | **2** |
| Pages optimisées | 3 |
| Périmètre | **P0 + P1** : images, CLS, JS/CSS, code résiduel d'apps désinstallées. Suivi 7 jours. |

**Cases à cocher**

| Case | | Justification |
|---|---|---|
| Resize photos | ✅ | Idem Basic. |
| Minification | ✅ | Le travail CSS/JS entre au Standard : c'est la différence vendable avec le Basic. |
| Browser Caching | ❌ | Voir note ci-dessous. |
| Database Optimization | ❌ | N'existe pas sur Shopify. |

### B. Description du package

```
Full optimization, 3 key pages. Images, CLS, JS/CSS, leftover app code. Report + rollback.
```
**90 caractères** (limite 100 ✅)

---

## PREMIUM — Optimization + App Audit

### A. Configuration technique

| Champ | Valeur |
|---|---|
| Prix affiché | **549 $** |
| Net après commission 20 % | **439,20 $** |
| Délai | **10 jours** |
| Révisions | **3** |
| Pages optimisées | Toutes (templates principaux + secondaires) |
| Périmètre | Tout le Standard + optimisation Liquid + audit app par app + appel 45 min + suivi 30 j avec relevé terrain |

**Cases à cocher**

| Case | | Justification |
|---|---|---|
| Resize photos | ✅ | Sur tous les templates cette fois. |
| Minification | ✅ | Idem Standard, périmètre élargi. |
| Browser Caching | ❌ | Voir note ci-dessous. |
| Database Optimization | ❌ | N'existe pas sur Shopify. |

**Délai de 10 jours : réaliste ?** Oui, et c'est le minimum. `11-pricing.md` chiffre une optimisation complète à 10-14 h réelles la première fois. Le Premium ajoute l'audit app par app et les templates secondaires. En solo, avec les fenêtres de validation client, 10 jours calendaires est serré mais tenable. Ne descends pas à 7.

### B. Description du package

```
Everything in Standard + all templates, app by app audit, 45 min call, 30 day follow-up.
```
**88 caractères** (limite 100 ✅)

---

## Note interne — pourquoi « Browser Caching » n'est cochée nulle part

Sur Shopify, les en-têtes de cache navigateur sont émis par le CDN de Shopify. **Un développeur de thème ne peut pas les modifier.** Cocher la case revient à vendre une prestation que tu ne peux pas exécuter — et le premier client qui demande « montrez-moi les en-têtes que vous avez changés » te met en défaut d'avis.

**Ce que ça te coûte :** Fiverr utilise ces cases comme filtre de recherche. Un acheteur qui filtre sur *Browser Caching* ne verra pas ton gig. C'est une perte de visibilité réelle, pas théorique.

**Décision retenue :** ne pas cocher. C'est la seule option cohérente avec le positionnement « tout ce que j'affirme est vérifiable », qui est l'argument central de toute l'offre. Le sujet est traité de front dans la description (`no promised score`) et dans la FAQ.

**Si tu veux arbitrer autrement**, c'est ton appel — mais alors il faut retirer la promesse de vérifiabilité de la description, sinon l'offre se contredit elle-même.

---

# SECTION 5 — Gig Extras (5)

| # | Nom | Prix | Net (×0,80) |
|---|---|---|---|
| 1 | Extra fast delivery (48 hours) | **59 $** | 47,20 $ |
| 2 | Additional page template | **69 $** | 55,20 $ |
| 3 | Before/after video walkthrough | **39 $** | 31,20 $ |
| 4 | 30-day follow-up report | **79 $** | 63,20 $ |
| 5 | Additional revision | **25 $** | 20,00 $ |

### 1. Extra fast delivery (48 hours) — 59 $

```
Delivered in 48 hours instead of the standard package delivery time.
```
**68 char** (limite 80 ✅)

*Justification :* `11-pricing.md` applique ×1,5 sur l'urgence < 48 h. Sur un Basic à 149 $, ×1,5 justifierait ~75 $. 59 $ retenu en phase de lancement, à remonter à 79 $ après 10 avis. **Ne jamais activer cet extra sur le Premium** : 48 h y sont impossibles à tenir, et un retard de livraison abîme ton taux de livraison à l'heure, un des critères Level 1.

### 2. Additional page template — 69 $

```
One extra template optimized: blog, search, cart or a custom landing page.
```
**74 char** (limite 80 ✅)

*Justification :* `11-pricing.md` § F, « chaque template au-delà des 3 inclus » est facturable. Un template supplémentaire = 1,5 à 2 h réelles. À 58 €/h cible, 87-116 €. 69 $ est en dessous : c'est un extra d'appel, calibré pour être accepté sans discussion.

### 3. Before/after video walkthrough (15 min) — 39 $

```
15 min screen recording explaining every change and every measurement.
```
**70 char** (limite 80 ✅)

*Justification :* 30-40 min de travail réel (préparation + enregistrement), asynchrone, sans planification. Prix bas volontairement : c'est l'extra le plus commandé par les clients non techniques, et **la vidéo qu'ils partagent en interne** — donc ta meilleure source de recommandation. Il vend aussi ta compétence mieux que ta description.

### 4. 30-day follow-up + real data report — 79 $

```
Report on your real visitor data 30 days after publishing, plus advice.
```
**71 char** (limite 80 ✅)

*Justification :* c'est le pivot commercial de `12-delivery-checklist.md` § D : à J+30 le client voit des données terrain, oublie la facture, et c'est là que se signent les retainers et les meilleurs avis. Tu es payé pour faire l'action qui génère ton upsell. Inclus d'office dans le Premium, donc à proposer sur Basic et Standard uniquement.

### 5. Additional revision — 25 $

```
One extra round of adjustments after delivery, within the same scope.
```
**68 char** (limite 80 ✅)

*Justification :* prix bas et volontairement peu attractif. Cet extra n'est pas là pour gagner de l'argent, il est là pour **borner le périmètre** : il rend visible, avant la commande, que les révisions ne sont pas infinies. `within the same scope` est la formule qui te protège d'une demande de refonte déguisée en révision.

---

# SECTION 6 — Requirements (9 questions)

Toutes sous 200 caractères.

**1. (116 char)**
```
What is your store URL? If the store is password protected, please include the preview password so I can measure it.
```

**2. (190 char)**
```
Please install the free Theme Access app (https://apps.shopify.com/theme-access), create a password for me and paste it here. It gives theme files only: no orders, no customers, no finances.
```

**3. (129 char)**
```
Please attach a screenshot of your Apps page showing every installed app. I need it to identify scripts left behind by past apps.
```

**4. (129 char)**
```
Which 3 pages matter most to your revenue? Paste the exact URLs, for example home, best selling collection, best selling product.
```

**5. (128 char)**
```
Is there anything I must NOT change? Custom sections, a specific app, a tracking script, an animation you paid for. Be specific.
```

**6. (118 char)**
```
Any sale, launch, ad campaign or high traffic period in the next 14 days? I schedule publishing outside those windows.
```

**7. (97 char)**
```
What is your theme name and version? You will find both in Online Store > Themes > Current theme.
```

**8. (106 char)**
```
Roughly what share of your traffic is mobile? Shopify Analytics > Sessions by device. An estimate is fine.
```

**9. (109 char)**
```
Has another developer or a speed app already worked on this theme? If yes, what was done, as far as you know?
```

**Notes internes.**
- Q2 contient le lien officiel de l'app, exigé par le prompt. Fiverr n'interdit pas les liens dans les Requirements (contrairement aux messages avant commande, où un lien externe peut déclencher une alerte).
- Q9 n'est pas décorative : un thème déjà passé par une « speed app » contient souvent du code d'optimisation cassé. C'est le facteur ×1,2 de `11-pricing.md` (« client ayant déjà eu un mauvais prestataire »). Si la réponse est oui sur un Basic, annonce le périmètre réduit **dès le premier message**.
- Marque comme obligatoires : **1, 2, 4, 5**. Les autres en optionnel — un formulaire de 9 champs obligatoires fait abandonner.

---

# SECTION 7 — FAQ (8 questions)

Toutes les réponses sous 300 caractères. **Total des 8 réponses : 1 895 caractères.**

**1. Can you guarantee a 90+ PageSpeed score?** *(249 char)*
```
No, and be careful with anyone who does. Part of your score comes from apps and marketing scripts I do not control. What I commit to is a documented method, before and after measured under identical conditions, and a report any developer can verify.
```

**2. Will my store go down while you work?** *(240 char)*
```
No. I work on a duplicate, unpublished theme. Your live store stays untouched until you review a preview link and approve in writing. A dated backup of your current theme is created before anything else, and you get a written rollback plan.
```

**3. What access do you need to get started?** *(232 char)*
```
The free Theme Access app is enough. It gives me theme files only: no orders, no customers, no finances. If you also want me to read your performance dashboard and app list, a staff account limited to Themes, Apps and Reports works.
```

**4. My Shopify dashboard score differs from PageSpeed, why?** *(249 char)*
```
They measure different things. Your Shopify Web Performance dashboard reports real visitors over a rolling 30 day window. PageSpeed Insights runs one simulated test on a virtual device. Both are useful, only the first reflects your actual customers.
```

**5. Will you remove my apps?** *(250 char)*
```
Only if you ask me to. I measure what each app costs in weight and where it loads, then give you a recommendation. The decision stays yours and I write it down. What I do remove, with your approval, is leftover code from apps you already uninstalled.
```

**6. When will I see results in my real visitor data?** *(229 char)*
```
Lab measurements are immediate, you get them on delivery. Your Shopify dashboard uses a rolling 30 day window of real sessions, so field data moves over several weeks. I explain this timing in every report so nobody is surprised.
```

**7. What if something breaks after delivery?** *(234 char)*
```
Message me. Each fix is a separate, reversible change, so the cause is usually found fast. Your rollback plan restores the previous theme in about two minutes, and I stay available during the follow up window included in your package.
```

**8. Do you work with custom or heavily modified themes?** *(212 char)*
```
Yes, and that is often where the real problems are. Send me your theme name and store URL before ordering. If the theme needs more time than the package allows, I will tell you before you order rather than after.
```

**Note interne.** La FAQ 1 est en position 1 délibérément. C'est la question qui fait partir les clients que tu ne veux pas, et le refus explicite est ce qui convainc ceux que tu veux. Ne l'adoucis pas et ne la déplace pas.

---

# SECTION 8 — Tags (5)

| Tag | Char | Pourquoi |
|---|---|---|
| `shopify speed` | **13** | Requête générique la plus tapée de la catégorie. Volume élevé, concurrence élevée : indispensable mais ne te classera pas seul. |
| `core web vitals` | **15** | Volume moyen, **intention d'achat forte**. L'acheteur qui tape ça sait ce qu'il cherche et négocie moins. C'est ton tag le plus rentable. |
| `page speed` | **10** | Volume élevé, hors écosystème Shopify. Capte les marchands qui viennent de PageSpeed Insights sans vocabulaire Shopify. |
| `shopify optimization` | **20** | Pile à la limite. Volume moyen-élevé, plus large que `shopify speed` : capte aussi les recherches conversion/UX qui atterrissent sur la perf. |
| `website speed` | **13** | Filet générique. Volume très élevé, faible qualification. Le seul tag à remplacer en premier si tu changes de stratégie. |

**Vérifications Fiverr :** aucune majuscule, aucun tiret, aucun caractère spécial, aucune apostrophe typographique. Les 5 sont sous 20 caractères. Chaque tag est composé de mots présents dans la description — ce qui renforce la cohérence sémantique du gig.

**Note interne — ce qui n'a pas été retenu et pourquoi.** `lcp cls inp` (16 char) est très qualifié mais le volume est trop faible pour un New Seller qui a besoin d'impressions. À reconsidérer au passage Level 1, en remplacement de `website speed`.

---

# SECTION 9 — Galerie

## Images (1280 × 769 px, min. 712 × 430 px)

### Image 1 — la card principale

**Critère absolu :** le texte doit rester lisible en **150 × 90 px**. Fais le test en réduisant l'image dans un éditeur : si tu ne lis plus, un acheteur non plus.

**Ce qui est visible :**
- Fond uni sombre, une seule couleur d'accent.
- Un titre en très gros, 4 mots maximum : `SHOPIFY SPEED, MEASURED` — occupe 40 % de la hauteur.
- En dessous, deux blocs côte à côte, étiquetés `BEFORE` / `AFTER`, chacun avec **une seule métrique** en gros chiffres (LCP mobile) issue du projet d'entraînement.
- En bas, une ligne fine : `3 runs, median. Same conditions.`
- Aucun visuel de téléphone, aucune capture d'écran de navigateur : illisible en thumbnail.

**Message :** on mesure ici, on ne promet pas.

**Lisible en thumbnail :** oui, si le titre fait au moins 90 px de haut sur le 1280 et les chiffres au moins 110 px. Trois éléments maximum, pas quatre.

**À ne pas mettre :** logo Fiverr (interdit), `100/100`, `90+`, jauge PageSpeed verte, badge « guaranteed », texte sous 40 px, plus de deux polices.

### Image 2 — preuve de méthode

**Ce qui est visible :** un tableau à trois colonnes, plein cadre, sans décoration.

| Metric | Before (median of 3) | After (median of 3) |
|---|---|---|
| LCP (mobile) | | |
| CLS | | |
| TBT | | |
| Page weight | | |
| Requests | | |

- En-tête au-dessus du tableau : `Same device profile. Same network throttling. Same page. 3 runs each.`
- Pied : `Lab data (Lighthouse). Field data moves over ~30 days.`
- 5 lignes maximum. Un tableau de 12 lignes n'est plus lisible en aperçu.

**Message :** cette personne sait ce qu'est une condition de mesure. C'est le signal que 95 % des gigs de la catégorie n'envoient pas.

**Lisible en thumbnail :** partiellement, et c'est acceptable — l'image 2 se consulte après le clic. Assure au minimum que la ligne `LCP (mobile)` et ses deux valeurs restent lisibles.

**Source des chiffres :** voir Section 10.A. **Toute cellule non mesurée reste vide, jamais remplie au jugé.**

### Image 3 — rassurance process

**Ce qui est visible :** la timeline de `12-delivery-checklist.md` § A, en 6 étapes horizontales, une icône simple par étape, 3 mots par étape :

```
Backup created  →  Measured  →  Fixed, one commit each  →  Preview link  →  Your approval  →  Published + follow-up
```

- Encadré en bas, sur fond contrasté : `Nothing goes live without your written approval.`
- Étape `Backup created` marquée visuellement comme la première, avec la date.

**Message :** le risque est traité avant le travail. C'est l'image qui convertit le marchand qui a déjà cassé son store une fois.

**Lisible en thumbnail :** non, et ce n'est pas son rôle. Elle se lit en 3e position, quand l'acheteur cherche une raison de ne pas avoir peur.

**Alternative :** capture anonymisée de la sortie de `tools/pagespeed/compare.js` avec les deux colonnes Avant/Après. Plus crédible techniquement, moins rassurante émotionnellement. Si tu ne dois en garder qu'une : la timeline en image 3, la sortie `compare.js` en PDF 1.

## PDFs (3 pages maximum chacun)

### PDF 1 — Extrait de rapport avant/après (3 pages)

- **Page 1 :** contexte de mesure. Thème, pages testées, profil d'appareil, throttling, nombre de runs, dates. Aucun chiffre de résultat sur cette page — elle établit la crédibilité de tout ce qui suit.
- **Page 2 :** le tableau avant/après complet + la liste des correctifs appliqués, un par ligne, avec le fichier touché.
- **Page 3 :** ce qui **n'a pas** été fait et pourquoi (apps non touchées, décisions rendues au client), plus le plan de rollback. C'est la page qui vend, parce que personne ne la produit.

### PDF 2 — La méthode en 3 pages

- **Page 1 :** pourquoi un seul run PageSpeed ne veut rien dire. Montrer la dispersion entre 3 runs sur une même page, données réelles. Le lecteur comprend en 15 secondes pourquoi les screenshots des autres vendeurs ne prouvent rien.
- **Page 2 :** labo vs terrain. Lighthouse contre le dashboard Web Performance Shopify. Pourquoi les deux chiffres diffèrent et lequel décide.
- **Page 3 :** le protocole de sécurité — backup daté, thème non publié, un commit par correctif, preview, accord écrit, rollback en 2 min.

**Note interne.** Le PDF 2 ne contient aucune donnée client et peut être produit **avant** d'avoir le moindre client. Fais-le en premier : c'est le seul actif de galerie que rien ne bloque.

---

# SECTION 10 — Stratégie de lancement New Seller

## A. Ce qui doit exister AVANT de publier

### ⚠ Point bloquant à traiter en premier — la source des données

Le prompt demandait de bâtir le PDF avant/après sur `lysbeauty.com`. **Ce n'est pas faisable en l'état, pour deux raisons vérifiées :**

1. **Il n'y a pas d'« après ».** `tools/pagespeed/snapshots/` contient 10 fichiers `lysbeauty-com-*`, tous datés du 07/08/2026, tous de type `psi-lab` ou `crux` : ce sont des relevés **baseline** d'un site public. Aucune optimisation n'a été réalisée sur ce site, donc aucune mesure « après » n'existe et ne peut exister.
2. **Ce n'est pas ton client.** C'est un site tiers public, mesuré via des données publiques (exercice n°2 de `13-practice-project.md`). Présenter ses chiffres comme le résultat de ton travail serait faux, et les afficher même anonymisés reste discutable.

**Ce que les données lysbeauty peuvent légitimement servir :** rien dans la galerie publique. Elles t'ont servi à valider le pipeline de mesure. Point.

**D'où doit venir le PDF 1 :** du **projet d'entraînement de `13-practice-project.md`** — le development store que tu dégrades puis répares. C'est ton store, tu as le avant ET le après, mesurés dans des conditions identiques, et tu peux tout publier sans réserve.

**Conséquence de planning : les 5 jours du projet d'entraînement sont un prérequis à la publication du gig, pas une option.** Publier sans PDF 1, c'est publier sans l'actif qui convertit.

### Comment anonymiser

| Retirer | Garder |
|---|---|
| Nom du store, domaine, sous-domaine `myshopify.com` | Type de thème (`Dawn`, `premium theme`) |
| Logo, couleurs de marque, photos produit reconnaissables | Nombre d'apps installées |
| Noms de produits, prix, références | Métriques, poids, nombre de requêtes |
| ID de thèmes, URLs de preview, tout token | Noms de fichiers du thème (`theme.liquid`, `sections/hero.liquid`) |
| Nom du client, e-mail, captures d'admin | Dates relatives (`day 1`, `day 5`) plutôt qu'absolues |

Remplacer le nom par `Store A (Shopify, {{thème}}, {{n}} apps)`. Flouter n'est pas anonymiser : recadre ou reconstruis le tableau proprement.

### Le tableau avant/après minimum pour convaincre

Cinq lignes, pas plus :

| | Before (median / 3 runs) | After (median / 3 runs) |
|---|---|---|
| LCP mobile | | |
| CLS | | |
| TBT | | |
| Poids de page | | |
| Nombre de requêtes | | |

Plus le bloc de conditions, sans lequel le tableau ne vaut rien : **même page, même profil d'appareil, même throttling, même nombre de runs, dates des deux séries.**

**Rappel — CLAUDE.md règle 6 :** toute cellule non mesurée reste vide ou porte `à mesurer`. Aucun chiffre plausible inventé pour « faire joli sur le PDF ». Un chiffre inventé dans une galerie publique est une fraude commerciale, pas une approximation.

### Checklist de publication

```
[ ] Projet d'entraînement de 13-practice-project.md terminé (5 jours)
[ ] Mesures avant ET après archivées, conditions identiques documentées
[ ] PDF 1 (rapport avant/après anonymisé) produit
[ ] PDF 2 (méthode en 3 pages) produit
[ ] Image 1 testée en 150x90 px, texte lisible
[ ] Images 2 et 3 produites
[ ] Aucun chiffre de la galerie qui ne soit pas dans tes snapshots
[ ] Aucune mention de score promis, nulle part
[ ] Database Optimization decochee
[ ] Compte Fiverr : 2FA active, methode de paiement verifiee
```

## B. Pricing de lancement

**Faut-il baisser le BASIC pour les 3 premières commandes ? Oui, une fois, avec une date de fin.**

| Phase | Basic | Standard | Premium | Condition de sortie |
|---|---|---|---|---|
| Lancement (1–3) | **89 $** | **249 $** | **449 $** | 3 avis publics |
| Consolidation (4–10) | **119 $** | **289 $** | **499 $** | 6 avis, note ≥ 4,8 |
| Cible (11+) | **149 $** | **329 $** | **549 $** | Prix nominal fixe |

**Pourquoi 89 $ et pas moins.** 89 $ net 71,20 $ passe sous le plancher de 120 € de la grille BEGINNER : c'est une **exception assumée et bornée**, pas un nouveau prix. En dessous de 89 $, tu ne recrutes plus des clients pressés, tu recrutes des chasseurs de prix — ceux qui écrivent 14 messages, demandent 4 révisions hors périmètre et laissent 4 étoiles. Un mauvais avis en début de compte pèse plus lourd que 60 $ de marge.

**Quand remonter.** À **3 avis publics**, pas à 3 commandes livrées : un avis peut arriver 5 jours après la livraison. Puis à 6 avis avec une note ≥ 4,8. Remonte par paliers, jamais d'un coup — un gig qui passe de 89 à 149 $ en une nuit perd son classement pendant plusieurs jours.

**Ne baisse jamais le Standard ni le Premium.** L'écart de prix entre les formules est ce qui fait paraître le Basic raisonnable. Si tu baisses tout, tu n'as plus qu'une offre, et elle est bon marché.

## C. Les 2 profils de clients à éviter

### Profil 1 — Le chasseur de score

Il n'achète pas de la vitesse, il achète un nombre à montrer.

**Signaux d'alerte dans les messages avant commande :**
- « I need 90+ on PageSpeed », « my competitor has 95 »
- Il envoie une capture PageSpeed et rien d'autre : pas d'URL, pas de contexte
- « How much score will you increase? » demandé deux fois malgré une réponse claire
- Il a déjà commandé deux gigs de speed optimization et « ça n'a pas marché »
- Il parle de score, jamais de ventes, de panier ou de clients

**Pourquoi il coûte cher :** son critère de satisfaction est hors de ton contrôle — les apps qu'il refusera de toucher font l'essentiel de son score. Tu peux livrer un travail impeccable et récolter 3 étoiles.

**Sortie propre :** « The score depends partly on apps I do not control, so I cannot commit to a number. If a documented before/after under identical conditions works for you, I am in. If you need a specific score, I am not the right seller for this. »

### Profil 2 — Le périmètre élastique

Il commande un Basic et décrit progressivement une refonte.

**Signaux d'alerte :**
- « and also », « just a small thing », « while you are in there » — la formule la plus coûteuse de Fiverr
- Il refuse de nommer 3 pages prioritaires : « the whole site, obviously »
- Il ne répond pas à la question 5 des Requirements (ce qui ne doit pas changer)
- Il demande le prix avant d'avoir donné l'URL de son store
- Il mentionne un designer, un autre développeur, ou une refonte en cours
- Il veut « discuter sur WhatsApp » — hors plateforme, tu perds toute protection Fiverr

**Pourquoi il coûte cher :** ton taux horaire s'effondre commande après commande, et le refus d'une demande hors périmètre arrive toujours au pire moment, juste avant l'avis.

**Sortie propre :** ne le refuse pas, **requalifie-le**. « That is beyond the Basic scope, but it fits the Standard package. Want me to send a custom offer? » Un client à périmètre élastique bien cadré devient souvent un bon client Standard.

## D. Réponse à « can you do it for $30? »

À copier-coller tel quel, 3 lignes :

```
Thanks for asking. I cannot do the full optimization at $30, the audit alone takes longer than that.
What I can do at the Basic price is the audit plus the highest impact fixes on your 3 main pages, with the full before/after report.
If that is out of budget right now, no problem, message me when it fits.
```

*(100 / 132 / 72 caractères — largement sous la limite de message Fiverr)*

**Pourquoi cette formulation.** Elle applique `11-pricing.md` § G : **on ne baisse pas le prix, on réduit le périmètre.** Ligne 1, un refus factuel sans jugement — c'est le temps qui est en cause, pas le client. Ligne 2, une contre-proposition réelle. Ligne 3, la porte reste ouverte, ce qui coupe court à la négociation sans créer d'hostilité.

**Ce qu'il ne faut pas écrire :** « my prices are fixed » (rigide), « you get what you pay for » (méprisant), « ok, $30 then » (tu viens d'apprendre à Fiverr que ton prix est négociable, et l'acheteur suivant le saura par ton historique).

## E. Comment et quand demander un avis

**Pas à la livraison Fiverr.** Au moment où tu cliques « Deliver », le client n'a encore rien constaté : il a un lien de preview et un PDF. Un avis demandé à cet instant note ta réactivité, pas ton résultat.

**Le bon moment : J+30 après publication**, quand le relevé terrain existe. C'est le pivot de `12-delivery-checklist.md` § D. Le client voit une amélioration mesurée sur ses vrais visiteurs, la facture est loin, et tu arrives avec des données plutôt qu'avec une demande.

**Contrainte Fiverr :** la fenêtre d'avis se ferme **30 jours après la fin de la commande**. Si la commande est marquée complétée le jour de la livraison, ton J+30 tombe pile au bord. **Deux ajustements obligatoires :**
- Livre la commande **après** la publication et la vérification H+1, jamais avant.
- Si la fenêtre est trop courte, envoie la demande à **J+14** avec le relevé partiel de `12-delivery-checklist.md` § D, et le relevé complet en suivant. Un avis obtenu vaut mieux qu'un avis parfaitement timé qui n'arrive jamais.

**Le message exact (164 caractères, limite 200) :**

```
Your 30 day report is attached: this is real visitor data, not a lab test. If the work was useful, a short review helps me a lot as a new seller. Thanks either way.
```

**Pourquoi il fonctionne :** il livre quelque chose avant de demander (le rapport), il rappelle la différence labo/terrain qui est ton argument, il dit pourquoi ça compte (`as a new seller`, honnête et non larmoyant), et `thanks either way` retire toute pression. Ne demande **jamais** un « 5 stars » explicitement : c'est une violation des règles Fiverr et cela peut coûter le compte.

## F. Roadmap Level 1 en 60 jours

**Conditions Fiverr Level 1 :** 10 commandes complétées, 400 $ d'earnings, note ≥ 4,4, taux de réponse ≥ 80 %, plus 60 jours d'ancienneté et les taux de livraison à l'heure et de non-annulation à 90 %.

### Semaines 1-2 — exister

```
[ ] Publier le gig avec les 3 images et les 2 PDFs, jamais avant
[ ] Basic a 89 $, Standard et Premium au prix nominal
[ ] Activer les notifications mobiles Fiverr : le temps de reponse
    est un critere Level 1, et il se joue sur les premieres heures
[ ] Repondre a 100 % des messages en moins de 2 h en journee
[ ] Buyer Requests : 3 a 5 propositions par jour, jamais de copier-coller
[ ] Objectif : 2 a 3 commandes. Accepter des petits perimetres.
[ ] Ne PAS toucher au titre, aux tags ni au prix pendant ces 14 jours
```

### Semaines 3-4 — ajuster

```
[ ] Relever les stats du gig : impressions, clics, commandes
[ ] Beaucoup d'impressions, peu de clics  -> l'image 1 est en cause
[ ] Beaucoup de clics, peu de commandes   -> le prix ou les PDFs
[ ] Peu d'impressions                     -> tags et titre, apres 30 jours
[ ] Remonter le Basic a 119 $ une fois 3 avis publics obtenus
[ ] Ajouter en galerie le PDF du premier vrai client (anonymise, accord ecrit)
[ ] Remplir la fiche de retour d'experience de 12-delivery-checklist.md § F :
    temps reel passe, ce qui a ete rentable
[ ] Objectif cumule : 5 commandes
```

### Semaines 5-8 — atteindre le seuil

```
[ ] Objectif : 10 commandes cumulees, 400 $ d'earnings nets
[ ] Note maintenue >= 4,8 (la marge sur 4,4 sert d'assurance)
[ ] Basic remonte a 149 $ apres la 10e commande
[ ] Relances J+30 systematiques sur toutes les commandes livrees
[ ] Proposer le retainer hors Fiverr aux clients Premium (J+60,
    12-delivery-checklist.md § D)
[ ] Preparer le 2e gig (Fix Shopify Theme Bugs, phase 2) : deux gigs
    se nourrissent mutuellement en impressions
```

**Vérification du seuil des 400 $.** Les earnings comptés par Fiverr sont **nets de commission**. Avec la grille de lancement, 10 commandes en mix réaliste (6 Basic dont 3 au prix de lancement, 3 Standard, 1 Premium) donnent largement plus de 1 000 $ nets. **Le seuil des 400 $ n'est pas le facteur limitant : les 10 commandes le sont.** Concentre tout l'effort sur le volume, pas sur le panier moyen, jusqu'au passage Level 1.

**Le vrai risque des 60 jours.** Ce n'est ni le prix ni les tags : c'est le **taux de réponse** et le **taux de livraison à l'heure**. Ce sont les deux seuls critères que tu peux rater passivement, en ne faisant rien. Une commande livrée en retard te coûte plus qu'une commande perdue.

---

## Références internes

- Grille de prix : `11-pricing.md` § A (BEGINNER), § F (suppléments), § G (« c'est trop cher »)
- Séquence de livraison et suivi J+30 : `12-delivery-checklist.md` § A, § D, § F
- Production des actifs de galerie : `13-practice-project.md` (5 jours, prérequis à la publication)
- Pipeline de mesure : `tools/pagespeed/README.md` (`collect.js`, `normalize.js`, `compare.js`, `median-html.js`)
