# 12 — Upwork Offer

Différence majeure avec la Phase 1 : ici, **le tarif horaire est souvent le bon modèle**. Le debug a une durée intrinsèquement incertaine, et les clients Upwork — notamment les agences — l'acceptent bien mieux que les clients Fiverr.

---

## A. Positionnement du profil

**Titre**
> Shopify Theme Debugging — Liquid, Cart, Sections, Theme Editor

**Overview**

```
I debug Shopify themes. Broken carts, Liquid errors, sections that stopped
working, regressions after a theme update, app conflicts that nobody can
explain.

My first step is never to edit code. It's to reproduce the problem, then
isolate it: theme, app, data, or browser? A large share of "theme bugs" aren't
in the theme, and starting to edit before knowing that is how stores end up
with three new problems instead of one.

What I typically fix
• Cart and AJAX — add to cart, drawer, quantities, multi-market locale issues
• Product page — variants, price updates, availability, form conflicts
• Sections and schema — "This section is not available", broken JSON templates
• Theme editor — code that works live but breaks in the customizer
• Metafields and dynamic sources
• JavaScript errors, event listeners on replaced DOM nodes
• Mobile and Safari-specific display issues
• Regressions after theme updates — reapplying lost customisations

How I work
• Duplicate backup before touching anything
• All work on an unpublished theme; nothing goes live without written approval
• One fix per commit, reversible, with a readable diff
• Written root cause — if I can't explain why it broke, I don't consider it fixed
• Full checkout flow tested after every change, even a one-line CSS fix

What I don't do
• Build features that never existed — that's development, quoted separately
• Edit third-party app code
• Promise a timeline before I've reproduced the problem

Tools: Shopify CLI, Liquid REPL (theme console), Theme Check, Chrome DevTools,
Git (including bisect for finding the breaking commit), Liquid, vanilla JS.
```

**Compétences :** Shopify, Liquid, Shopify Theme, JavaScript, CSS, HTML, Debugging, Troubleshooting, Bug Fix, Git

**Mots-clés :** shopify bug fix, liquid error, shopify theme developer, debug shopify, cart not working, theme editor, shopify troubleshooting

---

## B. Structure d'une proposal

```
1. Une observation sur SON store, obtenue avant d'écrire       ← décisif
2. Ce que ça évoque, avec une réserve honnête
3. Ta méthode en 3 lignes
4. Ce que tu ne feras pas
5. Une question de qualification
6. Modèle de facturation et disponibilité
```

Ne commence jamais par ton expérience. Commence par ce que tu as vu.

---

## C. Proposal courte

```
Hi {{Name}},

I opened {{store URL}} before writing. On {{page}}, when I {{action}}, I see
{{observation technique précise}}. That points to {{piste}} — though I'd need to
reproduce it properly before saying so with confidence.

How I'd handle it:
1. Reproduce it, then isolate — theme, app, data or browser. This takes minutes
   and often changes the whole diagnosis.
2. Trace it to the exact line, confirm the cause by making the bug reappear
   deliberately.
3. Fix it on a duplicate unpublished theme, one commit, test the full checkout
   flow.
4. Send you the root cause in plain language.

I won't touch your live theme, and I won't uninstall anything to test.

One question: what changed on the store just before this started — any app
installed, theme update, or code edit? That answer usually contains half the
diagnosis.

{{Rate}}/hr, or a fixed {{X}} for diagnosis with a firm quote for the fix —
whichever you prefer. I can start {{disponibilité}}.

{{Name}}
```

---

## D. Proposal longue (agences, missions récurrentes)

```
Hi {{Name}},

I've read your description and looked at {{store}}. Notes below.

WHAT I CAN SEE FROM THE OUTSIDE
{{2-4 lignes d'observations vérifiables}}
I can't confirm the cause without access — the point of listing this is to show
what I'd start from, not to claim a diagnosis I haven't earned.

MY PROCESS
1. Reproduce — written repro steps, environment, frequency. If I can't
   reproduce, I say so rather than guessing.
2. Isolate — default theme, incognito, console, theme editor, other products.
   Five tests, five minutes, before reading any code.
3. Trace — DevTools for the client side, Liquid REPL against your real store
   data for the server side, git bisect if there's history.
4. Root cause — one testable sentence. I verify it by making the bug reappear
   on purpose.
5. Fix — minimal, one commit, on an unpublished duplicate.
6. Regression testing — full purchase flow and theme editor, every time.

WHAT YOU GET
Root cause analysis (including hypotheses I ruled out and how), testing report,
readable git diff, rollback plan, and a plain-language explanation you can pass
to your client.

SCOPE BOUNDARIES
I fix things that used to work. Anything that never existed is development and
gets quoted separately — I'll flag it rather than silently absorb it.
If the cause is in third-party app code, I'll identify it precisely and propose
a theme-side workaround where one exists, clearly labelled as a workaround.

RATE
{{X}}/hr. For a defined single bug I'm happy to quote fixed after a paid
diagnosis ({{Y}}), deducted if you proceed.

QUESTIONS
1. Is there version history (Git or the Shopify GitHub integration)?
2. Is there a backup or development theme?
3. How many apps, and are any business-critical?
4. Has anyone already attempted a fix on this?

{{Name}}
```

La question 4 est la plus importante des quatre : si quelqu'un a déjà tenté, il y a du code de correction raté dans le thème, et cela change l'estimation.

---

## E. Fixe ou horaire ?

| Situation | Modèle |
|---|---|
| Bug reproduit, cause probable identifiée avant devis | **Fixe** |
| Cause inconnue, thème custom, pas d'historique | **Horaire** |
| Client agence, flux régulier | **Horaire**, voire contrat mensuel |
| Liste de bugs hétérogènes | **Horaire plafonné** (« maximum {{n}} h sans validation ») |
| Régression après mise à jour de thème | **Horaire** — l'ampleur est inconnue par nature |
| Client qui refuse l'horaire | **Diagnostic fixe**, puis correction chiffrée |

L'horaire plafonné est le meilleur compromis : le client connaît son risque maximum, tu ne travailles pas gratuitement, et personne ne négocie en cours de route.

---

## F. Red flags

| Signal | Ce que ça annonce | Réaction |
|---|---|---|
| « Corrige tous les bugs du site » sans liste | Périmètre infini | Exiger une liste écrite, ou facturer un audit |
| « Ça marchait avant, je n'ai rien touché » + aucune sauvegarde | Archéologie sans filet | Horaire uniquement |
| « Le dernier dev a tout cassé » | Code de correction raté empilé | Prévoir du temps, ne pas s'engager au forfait |
| Refus de l'accès Theme Access | Travail à l'aveugle impossible | Passer |
| « Paiement après validation que ça marche » sans critère écrit | Critère de succès mouvant | Définir le critère par écrit, ou passer |
| Bug non reproductible, client qui ne peut ni filmer ni décrire | Impossible de prouver quoi que ce soit | Passer, ou facturer uniquement le diagnostic |
| 40 applications, budget minimal | Conflits en cascade | Diagnostic seul |
| « Et pendant que tu y es, ajoute… » dès le premier message | Dérive de périmètre annoncée | Cadrer immédiatement, par écrit |
| Urgence extrême + négociation du prix à la baisse | Contradiction. L'urgence a un coût | Maintenir la majoration |

---

## G. Construire un flux régulier

Le bug fixing est la meilleure porte d'entrée du métier, à condition de viser les bons clients.

1. **Cible les agences Shopify.** Elles ont un flux constant de tickets, un brief propre, des accès déjà en place et un paiement fiable. Trois agences valent trente marchands.
2. **Candidate aux offres mal rédigées.** Un client qui décrit mal son bug est celui qui appréciera le plus quelqu'un qui pose les bonnes questions. Les offres bien rédigées attirent trente candidatures.
3. **Réponds vite sur les urgences.** Sur les offres S1, le premier qui apporte une observation utile emporte la mission, souvent en moins d'une heure.
4. **Convertis chaque mission en relation.** À la clôture, propose le contrôle de santé du thème et la mise en place du versionnage. Le meilleur moment est juste après la confirmation que le bug est réglé.
5. **Demande l'avis au bon moment** : à la fin de la période de garantie, quand rien n'est revenu.
