# 10 — Upwork Offer

Upwork n'est pas Fiverr. Sur Fiverr on achète un produit ; sur Upwork on recrute quelqu'un. La proposal doit démontrer un **diagnostic**, pas une offre.

---

## A. Positionnement du profil

**Titre**
> Shopify Performance Developer — Core Web Vitals, Liquid, Theme Optimization

**Overview — premières lignes** (seules visibles avant le clic, donc décisives)

```
I make Shopify stores faster by fixing the theme code — not by installing a
speed app and sending you a screenshot.

I work from your real visitor data (Shopify's Web Performance dashboard, Core
Web Vitals at the 75th percentile), find the exact cause in your Liquid, CSS and
JavaScript, and fix it on a duplicate theme with one reversible change at a time.
You get a before/after report measured under identical conditions, and a diff any
developer can review.

What I typically fix
• LCP: hero images loading late, oversized assets, render-blocking resources
• CLS: images without dimensions, app widgets injected after paint, font swap
• INP: third-party scripts and libraries blocking the main thread
• Leftover code from uninstalled apps — often the fastest win on any store

How I work
• Theme Access app only — no orders, no customers, no finances
• Dated backup before I touch anything
• Nothing published without your written approval
• Git history, atomic commits, written rollback plan

What I will not do
• Promise a specific score. Results depend partly on apps I don't control
• Remove apps without your decision — I quantify the cost, you choose

Tools: Shopify CLI, Theme Check, Lighthouse, Chrome DevTools, WebPageTest,
Git, Liquid, vanilla JavaScript.
```

**Compétences à cocher :** Shopify, Shopify Theme, Liquid, Web Performance Optimization, Core Web Vitals, JavaScript, CSS, HTML, Google PageSpeed Insights, Website Optimization

**Mots-clés à faire apparaître naturellement :** shopify speed optimization, core web vitals, largest contentful paint, cumulative layout shift, shopify liquid developer, theme optimization, page speed

---

## B. Structure d'une proposal qui fonctionne

Le client lit trois lignes. Elles doivent contenir **une observation qu'il ne t'a pas donnée**.

```
1. Une observation spécifique sur SON store (2 lignes)      ← ouvre ou tue la candidature
2. L'hypothèse de cause (2 lignes)
3. Ce que tu ferais, dans l'ordre (3–5 lignes)
4. Ta méthode / ta sécurité (2 lignes)
5. Une question qui prouve que tu as réfléchi (1 ligne)
6. Prix et délai
```

Ce que tu ne fais **jamais** : commencer par « I have 5 years of experience ». Personne ne lit cette phrase.

---

## C. Proposal courte (offres < 500 $)

```
Hi {{Name}},

I ran PageSpeed Insights on {{store URL}} before writing this. Your mobile LCP
sits around {{X}}s, and the largest element is your homepage banner image —
which is being lazy-loaded. That single attribute is likely costing you a
meaningful part of your load time, and it's a fifteen-minute fix.

I also see {{N}} third-party scripts loading on every page, including {{app}},
which appears to only be needed on product pages.

How I'd approach this:
1. Baseline from your Shopify Web Performance dashboard (real visitor data at
   the 75th percentile) plus Lighthouse, 3 runs per page
2. Fix the LCP image, reserve space for the widgets causing layout shift
3. Defer non-critical scripts, load third-party scripts only where needed
4. Re-measure under identical conditions and send you a before/after report

I work on a duplicate unpublished theme. Nothing goes live without your approval,
and you get a rollback plan.

One question: are any of your current apps business-critical (reviews,
subscriptions, tax)? That changes what I can safely touch.

{{Price}} — {{Days}} business days.

{{Name}}
```

---

## D. Proposal longue (offres > 1 000 $ / agences)

```
Hi {{Name}},

Quick note before the details: I looked at {{store}} and your CrUX data shows
{{observation}}. Below is how I'd handle it.

WHAT I THINK IS HAPPENING
{{3–5 lines of hypothesis, grounded in what you can actually see}}
I can't confirm all of this without theme access — some of it will be revised
once I read the code.

PROPOSED SCOPE
Phase 1 — Measurement (day 1)
  Web Performance dashboard (30-day P75), Lighthouse 3 runs × 3 templates,
  network waterfall, Coverage report, Liquid render profiling
Phase 2 — Diagnosis and plan (day 2)
  Written audit: every finding sourced to a file and line, prioritised P0–P3
  with impact, effort and risk. You approve before I write any code.
Phase 3 — Implementation (days 3–{{n}})
  One fix per commit on an unpublished duplicate theme, tested individually
Phase 4 — Verification and delivery (day {{n+1}})
  Re-measurement under identical conditions, before/after report, rollback plan

WHAT'S OUT OF SCOPE
Checkout (Shopify-controlled), server/TTFB infrastructure, design changes,
app removal without your written decision, remote third-party code I can't edit.

ON RESULTS
I don't quote a target score. Your ceiling is set partly by apps I don't control.
What I commit to is method: identical measurement conditions before and after,
every change documented and reversible, and an explicit list of what I could not
fix and why.

ACCESS
Theme Access app (theme files only). If you'd like me to read your performance
reports too, a collaborator account limited to Themes, Apps and Reports.

TIMELINE AND PRICE
{{X}} business days — {{Y}}. Milestones: 40% on approved plan, 60% on delivery.

QUESTIONS
1. Is anything on the store business-critical that I should not touch?
2. Do you have a staging or development theme?
3. Any sale or launch in the next {{X}} weeks?

{{Name}}
```

---

## E. Questions de qualification (avant de s'engager)

1. Le store est-il en ligne et sans mot de passe ? (sinon pas de RUM)
2. Combien d'apps installées ?
3. Le thème a-t-il déjà été modifié ? Par qui ?
4. Y a-t-il un thème de sauvegarde ?
5. Qui décide de la publication ?
6. Quel résultat serait pour vous un succès ?
7. Quelqu'un est-il déjà intervenu sur ce sujet ?
8. Y a-t-il un page builder ?

---

## F. Red flags

| Signal | Ce que ça annonce | Réaction |
|---|---|---|
| « Score 90+ garanti sinon remboursé » | Litige assuré | Refuser, ou renégocier le critère par écrit |
| « Notre dev est parti sans rien documenter » | Archéologie de code non chiffrée | Facturer une phase de découverte séparée |
| Budget 30 $ pour « full optimization » | Ne comprend pas le travail | Passer |
| Refus de tout accès (« envoyez-moi un zip ») | Impossible de mesurer et de tester | Passer |
| 30+ apps, aucune à retirer | Plafond très bas | Accepter uniquement en formule audit, en écrivant le plafond |
| « On paiera si ça marche » | Absence de critère objectif | Refuser |
| Réponse en 30 s à une offre de 5 000 $ | Souvent une arnaque ou un test | Vérifier l'historique de paiement du client |
| « On veut aussi refaire le design » | Dérive de périmètre | Devis séparé |

**Vérifie toujours :** le mode de paiement du client est vérifié, son historique de dépenses, la note laissée aux freelances précédents.

---

## G. Faire décoller un profil sans historique

1. **Trois premières missions sous-facturées, jamais bradées.** Un prix bas assumé (« je construis mon historique sur cette plateforme, mon prix habituel est X ») vaut mieux qu'un prix bas justifié par rien.
2. **Une proposal spécifique par candidature.** Dix proposals étudiées battent cent copiées-collées, dans tous les cas observés.
3. **Ne candidate qu'aux offres où tu peux formuler une observation réelle avant d'écrire.** Si tu ne peux pas ouvrir le store, tu ne postules pas.
4. **Demande un retour public à chaque livraison**, et rappelle-le au bon moment : au J+30, quand tu envoies le relevé RUM avec de bons chiffres.
