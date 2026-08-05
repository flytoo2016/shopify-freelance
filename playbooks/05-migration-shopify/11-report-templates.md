# 11 — Report Templates

Huit livrables. Deux d'entre eux se produisent **avant la signature** et déterminent si la mission existe : `migration-discovery.md` et `migration-risk-register.md`.

| Livrable | Quand | Lecteur | Rôle |
|---|---|---|---|
| `migration-discovery.md` | Fin d'audit | Client | **Vend la mission** |
| `migration-risk-register.md` | Avant signature | Client | **Rassure et protège** |
| `migration-mapping.md` | Avant transfert, validé | Client + toi | Fixe le périmètre |
| `migration-plan.md` | Avant démarrage | Client | Calendrier et responsabilités |
| `migration-validation.md` | Après import | Client | **Prouve que rien n'est perdu** |
| `seo-migration.md` | Avant bascule | Client + référenceur | Prouve le travail SEO |
| `launch-checklist.md` | Jour J | Toi et le client | Opérationnel |
| `post-launch-report.md` | J+30 | Client | Bilan et suite |

---

## 1. migration-discovery.md

Gabarit complet dans `00-discovery-and-inventory.md`, section F. Points essentiels :

- Volumétrie exacte, datée
- Ce qui migre sans difficulté (rassurant, et majoritaire)
- Ce qui demande un traitement particulier, chiffré
- **Ce qui ne pourra pas être migré** — la section qui inspire le plus confiance
- Le risque SEO, avec le calendrier de récupération
- Les décisions qui reviennent au client
- Estimation en durée et en budget

---

## 2. migration-plan.md

```markdown
# Plan de migration — {{client}} — {{date}}

## Périmètre
{{Renvoi vers migration-mapping.md, validé le {{date}}}}

## Calendrier
| Semaine | Étape | Livrable | Qui |
|---|---|---|---|

## Ce qui dépend de vous
| # | Action | Pour le | Impact si retard |
|---|---|---|---|
| 1 | Vérifier vos accès au registrar | {{date}} | **Bascule impossible** |
| 2 | Trancher les décisions du document {{X}} | {{date}} | Blocage de la transformation |
| 3 | Tester la boutique pendant 3 à 5 jours | {{dates}} | Anomalies découvertes par vos clients |
| 4 | Briefer votre équipe support | {{date}} | Support saturé au lancement |

## Fenêtre de bascule
Date : {{...}} · Heure : {{...}} · Durée estimée d'indisponibilité : {{...}}
Périodes exclues : {{...}}

## Ce qui reste en place pendant la migration
Votre boutique actuelle fonctionne normalement jusqu'à la bascule.
Aucune interruption avant cette date.

## Modalités
{{Prix, échéancier, garantie, durée du suivi}}
```

**La section « ce qui dépend de vous » est celle qui sauve les délais.** Un projet de migration dérape presque toujours à cause d'une décision client en attente, pas d'un problème technique. Datée et avec l'impact indiqué, elle transforme un rappel gênant en simple suivi de plan.

---

## 3. migration-validation.md

Gabarit complet dans `05-data-validation.md`, section H.

C'est le livrable le plus valorisant de la prestation. Structure :
- La méthode (comptages, sommes, échantillons)
- Le tableau de comparaison source / cible, ligne par ligne
- **Chaque écart expliqué individuellement**
- Les contrôles par échantillon
- Les contrôles fonctionnels
- Ce qui reste à faire côté client

Ne masque jamais un écart. Cherche-le, comprends-le, écris-le.

---

## 4. post-launch-report.md

```markdown
# Rapport post-lancement — {{client}} — J+30

## Ce qui s'est passé
Bascule effectuée le {{date}} à {{heure}}.
Indisponibilité effective : {{durée}}.
Incidents : {{aucun / liste avec résolution et délai}}

## Activité commerciale
| Indicateur | 30 j avant | 30 j après | Écart |
|---|---|---|---|
| Commandes | | | |
| Chiffre d'affaires | | | |
| Panier moyen | | | |
| Taux de conversion | | | |

⚠️ Ces écarts ne sont pas entièrement attribuables à la migration :
{{saisonnalité, campagnes, autres facteurs identifiés}}

## Référencement
| Indicateur | Avant | J+30 |
|---|---|---|
| Impressions (Search Console) | | |
| Clics | | |
| Position moyenne | | |
| Pages indexées | | |
| Erreurs de couverture | | |

**Où nous en sommes.** Nous sommes dans la phase de recrawl, qui produit
normalement un creux entre la 2ᵉ et la 6ᵉ semaine. {{État observé}}.
La récupération est attendue autour du {{date, J+90}}.

## Redirections
Initiales : {{n}} · Ajoutées depuis la bascule : {{n}} · 404 restantes : {{n}}
{{Les 404 restantes, avec leur trafic et le traitement prévu}}

## Comptes clients
Réinitialisations de mot de passe : {{n}} sur {{n}} clients actifs ({{%}})
Demandes au support liées à la connexion : {{n}}

## Performance
| | Avant | Après |
|---|---|---|
| LCP mobile | | |
| Poids de page | | |

## Ce qui reste ouvert
| # | Point | Échéance | Qui |
|---|---|---|---|

## Ce que je recommande maintenant
{{3 à 5 points, avec leur motif. C'est ici que s'ouvrent les prestations
suivantes — formulé comme un conseil, pas comme une vente.}}

## Prochain point
{{date, J+60}}
```

**La ligne « ces écarts ne sont pas entièrement attribuables à la migration »** est celle qui te protège dans les deux sens : elle t'évite d'être blâmé pour une baisse saisonnière, et elle t'évite de t'attribuer une hausse que tu n'as pas produite. Les deux comptent pour la crédibilité.

---

## 5. Règles de rédaction

1. **Aucun chiffre non mesuré.**
2. **Chaque écart expliqué**, jamais masqué.
3. **Distinguer ce qui est attribuable à la migration** de ce qui vient d'ailleurs.
4. **Le calendrier SEO rappelé** dans chaque rapport de la période, pour que le client sache où il en est.
5. **Aucune promesse** de position, de trafic ou de chiffre d'affaires.
6. **La section « ce qui dépend de vous »** dans tout document de planification.
7. **Markdown → PDF** pour l'envoi.
8. **Les données personnelles ne figurent jamais** dans un rapport : agrégats et échantillons anonymisés uniquement.

Le point 8 est spécifique à cette phase. Un rapport de validation qui liste des e-mails clients en clair est un manquement réglementaire — utilise des identifiants ou des extraits masqués.
