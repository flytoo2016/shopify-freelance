# 12 — Upwork Offer

Meilleur canal pour les restructurations de page produit et pour la sous-traitance d'agence. Le budget moyen y est deux à trois fois celui de Fiverr, et les clients acceptent — voire attendent — une phase de spécification.

---

## A. Profil

**Titre**
> Shopify Theme Developer — Custom Sections, Theme Blocks & Product Pages

**Overview**

```
I build custom Shopify sections that merchants can edit themselves.

That last part is the whole job. Plenty of developers will ship you working code
you then have to email them about every time you want to change a word. I build
the settings, the blocks and the schema so that the customizer becomes the
interface — and I hand over a one-page guide showing where everything is.

How I work
• Spec first. Before any code, you get a written document: what it does, what
  you'll be able to change, what happens when a product has no data, what's out
  of scope. You approve it. This is why I rarely need revisions.
• Server-rendered. The component works without JavaScript — faster, indexable,
  accessible, and it doesn't break in the theme editor.
• Theme editor tested. Add, move, duplicate, delete, reorder blocks. This is
  where most custom sections quietly fail and nobody checks.
• Real device tested. iPhone, not an emulator.
• Documented. For you, and for whoever works on this after me.

What I typically build
• Sections and theme blocks with full schema, presets and sensible defaults
• Metafield and metaobject driven components — different content per product
• Product page restructures based on the objections your customers actually
  raise, not a template
• Replacements for paid apps, where a theme section can do the job

What I won't do
• Build something that needs server logic, a private app or checkout changes —
  I'll tell you that before you hire me, not three days in
• Start without an approved spec
• Hardcode content you'll want to change
• Promise a conversion increase

The honest trade-off on custom vs app: custom is paid once, faster, and exactly
right. It also becomes yours to maintain. I'll tell you when the app is the
better call.

Tools: Liquid, vanilla JS, CSS, Shopify CLI, theme console, Theme Check, Git.
```

**Compétences :** Shopify, Liquid, Shopify Theme, JavaScript, CSS, HTML, Front-End Development, Web Design, Responsive Design, Accessibility

**Mots-clés :** shopify section, shopify liquid developer, custom shopify section, theme blocks, product page, shopify metafields, shopify theme development

---

## B. Structure de proposal

```
1. Une question qui montre que tu as compris l'enjeu réel          ← décisif
2. Ce que tu ferais, avec la décision d'architecture explicitée
3. Ta méthode : spec d'abord, éditeur testé, guide livré
4. Ce que tu ne feras pas
5. Prix, délai
```

Sur cette phase, l'accroche n'est pas une observation technique (comme en Phases 1–3) mais **une question de cadrage**. Elle démontre que tu construis le bon objet, ce qui est exactement la crainte du client.

---

## C. Proposal courte

```
Hi {{Name}},

One question before anything else, because it decides how this gets built:
will the content be the same for every product, or different per product?

- Same for all → a section with settings. Straightforward, 2-3 days.
- Different per product → product metafields. More work, but you enter it once
  per product and it displays automatically. 4-6 days, and there's setup time
  on your side to actually enter the data.

Most people don't think about this until halfway through, and it's the main
reason these projects slip.

How I'd work:
1. A written spec first — what it does, what you can edit, what happens when a
   product has no data, what's out of scope. You approve before I code.
2. Built server-rendered so it works without JavaScript, and tested in the theme
   editor for add/move/duplicate/delete. That last one is where most custom
   sections quietly break.
3. Everything editable from your customizer, with a one-page guide so you never
   have to message me to change a word.

I won't build anything needing server logic or checkout changes — if that's what
this turns out to need, I'll tell you before you hire me.

{{Price}} — {{days}} business days.

{{Name}}
```

---

## D. Proposal longue (page produit, budgets > 2 000 $)

```
Hi {{Name}},

I've read your brief and looked at {{store}}. Notes below.

WHAT I'D WANT TO ESTABLISH FIRST
A product page restructure only works if it's built around the objections your
customers actually have. So before design, I'd want:
- the questions your support team gets most often before a sale
- your most common reasons for returns
- your mobile/desktop split and where paid traffic lands

Those three answers usually determine 70% of the layout. Without them I'd be
applying a template, and you can get a template for a lot less than this.

WHAT I CAN ALREADY SEE
{{2-4 observations vérifiables sur la PDP actuelle}}
Not conclusions — starting points.

SCOPE
1. Discovery and conversion strategy — written, based on your objection data
2. UX spec — mobile-first, hierarchy, action hierarchy, edge cases
3. Component spec — every setting, every block, every "what if this is empty".
   You approve this before I write code.
4. Build — server-rendered Liquid, scoped CSS, progressive JS. Every component
   configurable from your customizer.
5. Template restructure — block order, with the reasoning documented
6. QA — edge cases, five environments, real iPhone, full theme editor pass,
   before/after performance measurement
7. Handover — merchant guide with screenshots, technical notes, test report

WHAT'S OUT OF SCOPE
Content creation. Global theme redesign. Anything requiring server logic, a
private app, or checkout modification. Product data entry.

ON RESULTS
I won't quote you a conversion number. What I'll give you is a page built around
your actual objections, measurably not slower than the current one, and fully
editable by you afterwards. Whether it converts better is something we measure,
not something I promise.

TIMELINE AND PRICE
{{X}} business days — {{Y}}. Milestones: 40% on approved spec, 60% on delivery.

QUESTIONS
1. What questions do customers ask most before buying?
2. Is your product information the same across products, or does it vary?
3. Who will maintain the content afterwards?
4. Any upcoming launch or sale I should plan around?

{{Name}}
```

La question 1 est celle qui impressionne. Elle montre que tu ne vas pas appliquer une structure standard.

---

## E. Qualification

| Question | Pourquoi |
|---|---|
| Le contenu diffère-t-il par produit ? | Décide l'architecture, le délai et le prix |
| Ces données existent-elles déjà ? | Cause n°1 de dérive de délai |
| Y a-t-il une maquette, et est-elle finalisée ? | Le redesign en cours de route détruit la marge |
| Qui maintiendra le contenu ? | Un composant dynamique sans mainteneur est inutile |
| Un page builder est-il installé ? | Le composant peut y être inutilisable |
| Thème modifié ? | Temps supplémentaire |
| Multi-marché ? | Traductions et tests supplémentaires |
| Qui valide ? | La spec devra convaincre quelqu'un que tu ne verras pas |

---

## F. Red flags

| Signal | Réaction |
|---|---|
| Maquette non finalisée, « on affinera en route » | Ne pas démarrer. Ou facturer à l'heure |
| « Et pendant que tu y es… » dès le premier message | Cadrer par écrit immédiatement |
| Refus de valider une spec écrite | Passer. C'est le litige garanti |
| « Exactement comme ce site » sans comprendre le fonctionnement | Discovery payante d'abord |
| Fonctionnalité exigeant une logique serveur présentée comme « une petite section » | Expliquer, proposer l'alternative, ou passer |
| Budget fixe sur un périmètre flou | Diviser : spec payante, puis développement chiffré |
| Client qui a déjà eu 3 développeurs sur ce composant | Comprendre pourquoi avant de s'engager |
| « Le design est fourni par notre graphiste » sans specs d'états | Demander les états (focus, désactivé, vide) ou les facturer |
| Délai imposé plus court que ta discovery | L'échec est programmé. Refuser ou réduire le périmètre |

---

## G. La spec payante — l'outil qui règle presque tout

Sur les missions supérieures à 1 500 €, propose systématiquement :

> **Phase 1 — Spécification : {{X}} €, {{n}} jours.**
> Je produis la spécification UX et technique complète : ce que fait le composant, chaque réglage, chaque cas limite, l'architecture retenue, et le chiffrage ferme du développement. Ce document vous appartient — vous pouvez le confier à n'importe quel développeur Shopify.
>
> **Phase 2 — Développement.** Chiffré précisément à l'issue de la phase 1. Le montant de la spécification est déduit si vous poursuivez avec moi.

Effets : tu es payé pour le travail de conception (qui est réel et que la plupart offrent gratuitement), le client ne s'engage pas à l'aveugle, la dérive de périmètre devient impossible, et le taux de conversion phase 1 → phase 2 est très élevé — parce que le client a déjà vu la qualité de ta réflexion.

La phrase « ce document vous appartient » est ce qui désamorce la méfiance. Elle coûte peu : dans les faits, presque personne ne va voir ailleurs après avoir lu une bonne spec.
