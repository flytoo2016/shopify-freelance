# PHASE 5 — WOOCOMMERCE / OTHER ECOMMERCE → SHOPIFY MIGRATION

> Document maître. Statut : **PHASE 5**. Dernière phase du système.
> Prérequis : workspace et règles Git de la Phase 1, discipline de preuve de la Phase 2, méthode d'audit de la Phase 3, construction de composants de la Phase 4. Une migration mobilise les quatre.

| Fichier | Rôle |
|---|---|
| `00-discovery-and-inventory.md` | Recenser ce qui existe avant de promettre quoi que ce soit |
| `01-service-definition.md` | Ce que tu vends, à qui, avec quelles limites |
| `02-client-questionnaire.md` | Questionnaire de découverte + accès |
| `03-migration-matrix.md` | SOURCE → TRANSFORMATION → DESTINATION → VALIDATION |
| `04-migration-strategy.md` | Les 15 étapes, de l'audit au suivi post-lancement |
| `05-data-validation.md` | Les contrôles chiffrés, avant et après |
| `06-seo-migration.md` | **Le fichier le plus important de la phase** |
| `07-risk-register.md` | Matrice de risques et plans d'atténuation |
| `08-launch-checklist.md` | Pré-lancement, lancement, post-lancement |
| `09-claude-code-workflow.md` | Prompts et agents |
| `10-tools-and-mcp.md` | Outils d'import, MCP, ce que chacun sait faire |
| `11-report-templates.md` | Les 8 livrables |
| `12-fiverr-offer.md` | Gig et packages |
| `13-upwork-offer.md` | Positionnement et proposals |
| `14-pricing.md` | Tarification d'un projet à risque |
| `15-practice-project.md` | Entraînement : migrer une boutique fabriquée |
| `claude/` | Addendum CLAUDE.md + 3 agents |
| `templates/` | Journal de migration + carte de redirections |

---

## 01 — Business Understanding

**Le client n'achète pas une migration. Il achète l'assurance de ne rien perdre.**

C'est la prestation la plus risquée de tout ton catalogue, et la mieux payée pour cette raison exacte.

| | Phases 1–4 | Phase 5 |
|---|---|---|
| Si ça se passe mal | Un score, un bug, un rapport contesté, un composant à refaire | **Le chiffre d'affaires s'arrête** |
| Réversibilité | Totale (`git revert`) | **Partielle, et coûteuse** |
| Durée | 1 à 20 jours | **2 à 12 semaines** |
| Nombre d'intervenants | Toi | Toi, le client, son hébergeur, son registrar, ses prestataires |
| Ce qui échoue le plus | Le code | **Les données et le SEO** |
| Marge | Moyenne à élevée | **Élevée**, si le périmètre tient |

### Ce que le client craint réellement, dans l'ordre

1. **Perdre son référencement.** C'est sa peur n°1, et elle est justifiée : une migration mal redirigée fait chuter le trafic organique durablement.
2. **Perdre ses données.** Commandes, clients, historique.
3. **Une interruption de service.** Chaque heure hors ligne est du chiffre d'affaires perdu.
4. **Découvrir après coup** qu'une fonctionnalité essentielle n'existe pas sur Shopify.

Ton offre doit répondre à ces quatre craintes, dans cet ordre, dès le premier échange. Le point 4 est celui que la plupart des prestataires découvrent en cours de route — et c'est celui qui fait échouer les projets.

### Ce que tu dois savoir avant de parler à un client

- **Les mots de passe clients ne migrent jamais.** Ils sont stockés en hachage irréversible sur toutes les plateformes. Chaque client devra réinitialiser à sa première connexion. Cela se prépare, cela s'annonce, cela ne se corrige pas après coup.
- **Shopify plafonne à 3 options par produit.** La limite de variantes est passée de 100 à **2 048** le 15 octobre 2025, mais le nombre d'**options** reste à 3. WooCommerce, lui, autorise un nombre illimité d'attributs. C'est le premier point de blocage du mapping produit sur les catalogues complexes.
- **La structure d'URL change intégralement.** WooCommerce utilise `/product/nom/`, Shopify impose `/products/nom`. Chaque produit, collection, page et article change d'adresse. Les redirections 301 ne sont pas une option.
- **Les abonnements actifs sont un projet à part.** Ils ne migrent pas : les abonnés doivent être ré-embarqués via une application Shopify, avec communication directe. À chiffrer séparément, et à commencer des semaines avant la bascule.
- **Le trafic organique baisse temporairement.** Un creux entre la 2ᵉ et la 6ᵉ semaine, une récupération vers le 3ᵉ mois, sont le déroulement normal d'une migration correctement exécutée. Annonce-le **avant**, sinon tu passeras pour responsable.

---

## 02 — Service Definition

**Nom :** Migration WooCommerce (ou autre plateforme) vers Shopify

**Définition en une phrase :**
> Je recense tout ce qui existe sur votre boutique actuelle, j'établis une correspondance vérifiable vers Shopify, je migre vos données, je préserve votre référencement par un plan de redirections complet, et je vous livre des contrôles chiffrés prouvant que rien n'a été perdu.

**Dans le scope**
- Audit et inventaire complet de la source
- Matrice de correspondance validée avant tout transfert
- Migration : produits, variantes, collections, clients, commandes, pages, articles, médias
- Metafields pour les données sans équivalent natif
- Plan de redirections 301 exhaustif et importé
- Migration des métadonnées SEO
- Configuration Shopify : marchés, livraison, taxes, paiements
- Contrôles de validation chiffrés, avant et après
- Registre des risques et plan de retour arrière
- Checklist de lancement en trois temps
- Suivi post-lancement (durée selon formule)

**Hors scope — à écrire noir sur blanc**
- Reproduction à l'identique du design (le thème se reconstruit)
- Migration des mots de passe clients — **techniquement impossible**
- Migration des abonnements actifs — projet distinct
- Recréation des fonctionnalités d'extensions sans équivalent
- Garantie de conservation des positions de référencement
- Migration de l'historique analytique
- Développement d'applications sur mesure

---

## 03 — Target Clients

| Segment | Signal | Budget | Durée |
|---|---|---|---|
| **WooCommerce fatigué de la maintenance** | Piratages, lenteurs, mises à jour cassantes | 2 000–6 000 € | 3–5 sem. |
| **Marchand en croissance** | WooCommerce ne suit plus le volume | 4 000–12 000 € | 4–8 sem. |
| **Magento / PrestaShop** | Coût de maintenance insoutenable | 6 000–25 000 € | 6–12 sem. |
| **Wix / Squarespace / Etsy** | Veut une vraie plateforme e-commerce | 800–3 000 € | 1–3 sem. |
| **Agence en sous-traitance** | Volet technique d'un projet plus large | 70–130 €/h | Variable |

**À éviter**
- Catalogue de plus de 5 000 SKU pour une première migration
- Boutique avec abonnements actifs, si tu n'as jamais traité le sujet
- Client qui veut « exactement le même site »
- Client qui refuse une phase d'audit préalable
- Délai imposé inférieur à trois semaines
- Boutique dont personne ne connaît l'hébergement ni le registrar

---

## 04 — Client Requirements

1. Accès administrateur à la boutique source (ou export complet)
2. Accès à l'hébergement et à la base de données, si possible
3. Accès au registrar du domaine — **indispensable pour la bascule DNS**
4. Accès à Google Search Console et Analytics de la source
5. Liste complète des extensions ou applications actives, avec leur rôle
6. Volumétrie : produits, variantes, clients, commandes, pages, articles
7. Export de **toutes** les URL indexées (crawl du site + Search Console)
8. Intégrations en place : ERP, comptabilité, logistique, e-mailing
9. Périodes à éviter absolument (soldes, lancement, pic saisonnier)
10. Qui décide de la bascule, et qui est joignable le jour J

Le point 3 est celui qui bloque le plus de projets à la dernière minute. Vérifie-le **au premier échange**, pas la veille de la bascule.

Questionnaire → `02-client-questionnaire.md`

---

## 05 — Tools

| Outil | Usage |
|---|---|
| **Shopify Store Migration app** | Import natif depuis Square, Wix, Etsy, Squarespace, BigCommerce |
| **Matrixify** | L'outil de référence des migrations complexes. Connecteur WordPress dédié pour WooCommerce, gère metafields, metaobjects, commandes brouillons, cartes cadeaux |
| **Exports CSV natifs** | WooCommerce, Shopify — la base de tout |
| **Screaming Frog** (ou équivalent) | Crawler la source : **toutes** les URL indexées |
| **Google Search Console** | URL indexées, requêtes, couverture — avant et après |
| **Redirections Shopify** | Import CSV en masse dans le gestionnaire natif |
| **Shopify CLI** | Thème, `theme check`, `theme console` |
| **Tableur / Python** | Transformation et contrôle des données — le vrai travail |
| **Dev MCP** | Vérifier les objets Liquid, les limites de la plateforme |
| **Claude Code** | Transformation de données, contrôles, génération de la carte de redirections |

**Choix de l'outil selon la source** : Square, Wix, Etsy et Squarespace passent proprement par l'app native de Shopify. WooCommerce se traite bien avec Matrixify et son connecteur WordPress. Magento, BigCommerce et Salesforce Commerce Cloud exigent Matrixify ou une migration assistée, leurs schémas divergeant fortement.

---

## 06 — VS Code Workspace

```
clients/{client}/
├── 00_brief/
│   ├── discovery.md
│   └── inventory.md              ← la volumétrie exacte, datée
├── 01_audit/
│   ├── source-crawl.csv          ← TOUTES les URL indexées
│   ├── plugins-inventory.md
│   └── feature-gap.md            ← ce qui n'existera pas sur Shopify
├── 02_mapping/
│   ├── migration-matrix.md
│   ├── redirect-map.csv          ← old_path,new_path
│   └── metafield-definitions.md
├── 03_data/
│   ├── source-export/            ← intouchable, brut
│   ├── transformed/
│   └── validation/
├── 04_development/theme/
├── 05_testing/
│   └── validation-reports/
├── 06_launch/
│   ├── risk-register.md
│   ├── launch-checklist.md
│   └── rollback-plan.md
└── 07_delivery/
```

**`source-export/` est intouchable.** Tu exportes une fois, tu archives, et tu ne travailles **jamais** dessus. Toute transformation se fait vers `transformed/`. Le jour où un contrôle échoue, tu dois pouvoir revenir à la donnée brute d'origine.

---

## 07 — Claude Code Workflow

> **Claude Code transforme et vérifie des données. Il ne décide jamais d'une bascule.**

```
1. INVENTAIRE     toi : exports, crawl, volumétrie
2. ÉCART          Claude : ce qui n'a pas d'équivalent Shopify
3. MATRICE        Claude propose, TU VALIDES, le client approuve
4. TRANSFORMATION Claude : scripts de conversion, cas limites signalés
5. CONTRÔLE       Claude : comparaison chiffrée source vs cible
6. REDIRECTIONS   Claude : carte complète, toi : vérification par échantillon
7. VALIDATION     toi : contrôles manuels sur échantillon aléatoire
8. BASCULE        toi seul, jamais automatisé
```

L'étape 2 est celle qui sauve les projets. **L'écart fonctionnel identifié avant la signature est une négociation ; découvert en semaine trois, c'est un litige.**

Prompts → `09-claude-code-workflow.md`

---

## 08 — Shopify MCP Workflow

Le Dev MCP sert ici à **vérifier les limites de la plateforme** avant de promettre une correspondance. Une affirmation fausse sur ce que Shopify sait faire est, dans cette phase, une faute qui se paie en semaines de travail.

Questions à lui poser systématiquement : limites d'options et de variantes, types de metafields disponibles, comportement des metaobjects, structure des objets `product`, `variant`, `customer`, `order`, capacités de Shopify Markets.

Ce qu'il ne fait pas : accéder à la source, transférer des données, mesurer quoi que ce soit.

Détail → `10-tools-and-mcp.md`

---

## 09 — Technical Workflow

```
AUDIT ──▶ MAPPING ──▶ BACKUP ──▶ EXPORT ──▶ TRANSFORMATION
                                                  ↓
                                              IMPORT
                                                  ↓
                                            VALIDATION
                                                  ↓
SEO MIGRATION ──▶ REDIRECTIONS ──▶ THÈME ──▶ INTÉGRATIONS
                                                  ↓
                                               TESTS
                                                  ↓
                                             LANCEMENT
                                                  ↓
                                     SUIVI POST-LANCEMENT
```

Les 15 étapes détaillées → `04-migration-strategy.md`

---

## 10 — Step-by-Step Execution

La matrice de correspondance est le document central. Format imposé :

**SOURCE → TRANSFORMATION → DESTINATION SHOPIFY → VALIDATION**

Chaque ligne doit répondre à quatre questions : d'où vient la donnée, ce qu'on lui fait, où elle atterrit, et **comment on prouve qu'elle est arrivée intacte**.

Matrice complète → `03-migration-matrix.md`

---

## 11 — Testing

Trois niveaux :

1. **Validation des données** — comptages, sommes, échantillons. Chiffré, pas visuel.
2. **Validation fonctionnelle** — parcours d'achat complet, comptes clients, recherche, filtres
3. **Validation SEO** — redirections, métadonnées, sitemap, données structurées, indexabilité

Détail → `05-data-validation.md` et `06-seo-migration.md`

---

## 12 — QA

Quality Gate bloquant. Une seule condition critique en échec → **on ne bascule pas**.

- [ ] Nombre de produits, variantes et SKU identiques (écart expliqué ligne à ligne)
- [ ] Aucun SKU en double, aucun SKU perdu
- [ ] Prix vérifiés sur un échantillon aléatoire de 50 produits
- [ ] Toutes les URL indexées ont une redirection testée
- [ ] Aucune redirection en chaîne, aucune boucle
- [ ] Métadonnées SEO présentes sur les 100 pages les plus performantes
- [ ] Parcours d'achat complet testé, jusqu'au paiement réel
- [ ] Taxes et livraison vérifiées sur chaque zone
- [ ] Sauvegarde complète de la source, testée
- [ ] Plan de retour arrière écrit et validé par le client

---

## 13 — Documentation

Huit livrables :

`migration-discovery.md` · `migration-mapping.md` · `migration-plan.md` · `migration-risk-register.md` · `migration-validation.md` · `seo-migration.md` · `launch-checklist.md` · `post-launch-report.md`

Gabarits → `11-report-templates.md`

---

## 14 — Client Delivery

```
Boutique Shopify complète, protégée par mot de passe
      ↓
Rapport de validation chiffré
      ↓
Le client teste lui-même pendant 3 à 5 jours    ← non négociable
      ↓
Corrections
      ↓
Fenêtre de bascule programmée, à heure creuse
      ↓
Bascule DNS + activation des redirections
      ↓
Surveillance intensive 48 h
      ↓
Suivi hebdomadaire pendant 4 à 8 semaines
```

**La période de test client n'est pas optionnelle.** Le marchand connaît son catalogue mieux que toi : il repérera en vingt minutes des anomalies que tu ne verrais jamais.

---

## 15 — Fiverr Offer

→ `12-fiverr-offer.md`
Canal secondaire : une migration sérieuse ne se vend pas bien sur Fiverr. Utilisable pour les petites sources (Wix, Etsy, Squarespace, moins de 200 SKU).

---

## 16 — Upwork Offer

→ `13-upwork-offer.md`
Le canal principal, avec le direct et les agences.

---

## 17 — Pricing

→ `14-pricing.md`
Le principe : **tu ne chiffres jamais une migration avant l'audit.** L'audit se vend séparément, et il est déduit.

---

## 18 — Upsells

1. **Optimisation performance du nouveau thème** (→ Phase 1) — naturel juste après le lancement
2. **Audit CRO à J+60** (→ Phase 3) — quand les données Shopify sont exploitables
3. **Composants sur mesure** (→ Phase 4) — pour remplacer les extensions perdues
4. **Maintenance et suivi mensuel** (300–900 €/mois)
5. **Migration des abonnements** — projet distinct, très bien payé
6. **Formation de l'équipe à l'admin Shopify** (400–1 200 €)
7. **Second marché / seconde langue** via Shopify Markets

La migration est la porte d'entrée qui ouvre sur les quatre autres phases. Un client migré est un client pour deux ans.

---

## 19 — Common Mistakes

| Erreur | Conséquence |
|---|---|
| Chiffrer avant l'audit | Perte sèche garantie |
| Ne pas crawler toutes les URL indexées | Redirections incomplètes → chute de trafic |
| Oublier les articles de blog et les pages de catégorie | La moitié du trafic organique perdu |
| Découvrir l'écart fonctionnel en cours de route | Litige |
| Ne pas prévenir sur les mots de passe | Support saturé le jour du lancement |
| Ignorer la limite de 3 options par produit | Mapping produit à refaire entièrement |
| Basculer sans période de test client | Anomalies découvertes par les acheteurs |
| Ne pas tester les redirections avant la bascule | Erreurs 404 en masse |
| Redirections en chaîne | Perte de signal, lenteur |
| Basculer un vendredi ou avant un pic | Personne pour corriger |
| Aucune sauvegarde testée de la source | Pas de retour arrière possible |
| Promettre le maintien des positions SEO | Non tenable |
| Ne pas annoncer le creux de trafic | Tu en porteras la responsabilité |
| Oublier les taxes et la livraison | Commandes fausses dès le premier jour |
| Ne pas vérifier l'accès au registrar | Bascule bloquée le jour J |

---

## 20 — Professional Checklist

```
[ ] Audit payé et livré avant tout chiffrage de migration
[ ] Volumétrie exacte relevée et datée
[ ] TOUTES les URL indexées crawlées et exportées
[ ] Écart fonctionnel documenté et validé par le client PAR ÉCRIT
[ ] Matrice de correspondance validée avant tout transfert
[ ] Sauvegarde complète de la source, testée
[ ] source-export/ archivé et jamais modifié
[ ] Definitions de metafields créées et documentées
[ ] Import réalisé, contrôles chiffrés effectués
[ ] Carte de redirections complète, testée par échantillon
[ ] Métadonnées SEO migrées sur les pages à fort trafic
[ ] Taxes, livraison, paiements configurés et testés
[ ] Parcours d'achat complet testé avec un paiement réel
[ ] Période de test client de 3 à 5 jours effectuée
[ ] Registre des risques et plan de retour arrière validés
[ ] Fenêtre de bascule choisie hors période sensible
[ ] Accès registrar vérifié
[ ] E-mail de réinitialisation des mots de passe préparé
[ ] Search Console configurée sur le nouveau domaine avant la bascule
[ ] Surveillance 48 h planifiée, disponibilité confirmée
[ ] Suivi hebdomadaire 4 à 8 semaines
```

---

## 21 — Practice Project

Tu fabriques une boutique WooCommerce réaliste, tu la migres, et tu mesures ce que tu as perdu. → `15-practice-project.md`

---

## 22 — Deliverables

| Fichier | Quand | Lecteur |
|---|---|---|
| `migration-discovery.md` | Fin d'audit | Client — **c'est lui qui vend la mission** |
| `migration-mapping.md` | Avant transfert, validé | Client + toi |
| `migration-plan.md` | Avant démarrage | Client |
| `migration-risk-register.md` | Avant démarrage | Client |
| `migration-validation.md` | Après import | Client |
| `seo-migration.md` | Avant bascule | Client + son référenceur |
| `launch-checklist.md` | Jour J | Toi et le client |
| `post-launch-report.md` | J+30 | Client |

---

# PHASE 5 COMPLETE — SYSTÈME COMPLET

Les cinq parcours freelance sont opérationnels. Voir la note de synthèse en fin de conversation pour l'articulation entre les phases.
