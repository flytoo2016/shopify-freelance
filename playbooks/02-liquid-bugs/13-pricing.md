# 13 — Pricing

**Le problème central de cette prestation : tu vends un travail dont tu ignores la durée.** Un bug identique de l'extérieur peut prendre vingt minutes ou deux jours. Toute la stratégie de prix consiste à ne jamais porter seul ce risque.

---

## A. Les trois réponses au risque de durée

### 1. Le diagnostic payant à prix fixe (recommandé par défaut)

> Diagnostic : {{X}} € sous {{délai}}. Je reproduis le problème, j'identifie la cause exacte, et je vous envoie un rapport écrit avec le correctif proposé, son coût et son délai. Si vous poursuivez avec moi, ce montant est déduit.

Tu es payé même si le bug se révèle être un problème d'application que tu ne peux pas corriger. Le client n'achète pas à l'aveugle. Et le rapport lui appartient : il peut le donner à qui il veut, ce qui désamorce toute méfiance.

Prix indicatif du diagnostic : **60–150 €** débutant, **150–350 €** confirmé.

### 2. L'horaire plafonné

> {{X}} €/h, plafonné à {{n}} heures sans validation de votre part.

Le client connaît son risque maximum. Tu ne travailles jamais gratuitement. C'est le modèle des agences.

### 3. Le forfait avec fourchette haute assumée

Uniquement quand tu as **déjà reproduit** le bug et identifié une cause probable. Tu chiffres la fourchette haute et tu assumes.

**Ne jamais faire :** un forfait sur un bug non reproduit. C'est la façon la plus rapide de travailler à perte.

---

## B. Grille par niveau

### BEGINNER — 0 à 10 bugs livrés

| Type | Min | Cible | Premium |
|---|---|---|---|
| Bug simple (< 1 h) | 35 € | 55 € | 80 € |
| Bug moyen (1–3 h) | 80 € | 130 € | 200 € |
| Bug complexe (3–8 h) | 200 € | 320 € | 450 € |
| Diagnostic seul | 50 € | 75 € | 110 € |
| Régression post-mise à jour | 250 € | 400 € | 700 € |
| Taux horaire | 25 €/h | 35 €/h | 45 €/h |

### INTERMEDIATE — 10 à 50 bugs, avis publics

| Type | Min | Cible | Premium |
|---|---|---|---|
| Bug simple | 70 € | 110 € | 160 € |
| Bug moyen | 180 € | 280 € | 400 € |
| Bug complexe | 400 € | 650 € | 900 € |
| Diagnostic seul | 120 € | 180 € | 280 € |
| Régression post-mise à jour | 500 € | 850 € | 1 400 € |
| Bug sprint (5–8 bugs) | 600 € | 1 000 € | 1 500 € |
| Taux horaire | 45 €/h | 65 €/h | 85 €/h |
| Retainer support | 200 €/m | 400 €/m | 600 €/m |

### EXPERT — 50+ bugs, spécialisation reconnue, clients directs

| Type | Min | Cible | Premium |
|---|---|---|---|
| Bug moyen | 350 € | 550 € | 800 € |
| Bug complexe | 800 € | 1 400 € | 2 200 € |
| Régression post-mise à jour | 1 200 € | 2 000 € | 3 500 € |
| Taux horaire | 80 €/h | 110 €/h | 150 €/h |
| Retainer support | 600 €/m | 1 100 €/m | 2 000 €/m |
| Astreinte (délai garanti) | 400 €/m | 800 €/m | 1 500 €/m |

---

## C. Classification de difficulté

| Niveau | Signes | Temps typique |
|---|---|---|
| **Simple** | Reproductible immédiatement, cause visible en console ou en réseau, un seul fichier concerné, thème standard | < 1 h |
| **Moyen** | Reproductible, cause identifiée après isolation, deux ou trois fichiers, ou interaction avec une application | 1–3 h |
| **Complexe** | Intermittent, multi-marché, thème custom sans documentation, plusieurs causes possibles, correction précédente ratée à défaire | 3–8 h |
| **Archéologie** | Aucun historique, thème très modifié, cause inconnue après trois heures, régression massive | Horaire uniquement |

**Ne classe jamais un bug avant de l'avoir reproduit.** Le client le décrira toujours comme simple.

---

## D. Modulateurs

| Facteur | × |
|---|---|
| Urgence S1, production à l'arrêt | ×1,5 à ×2 |
| Intervention hors heures ouvrées / week-end | ×1,5 |
| Thème standard peu modifié | ×0,9 |
| Thème custom sans documentation | ×1,6 |
| Aucun historique Git ni sauvegarde | ×1,3 |
| Correction précédente ratée à défaire | ×1,4 |
| 20+ applications | ×1,3 |
| Multi-marché / multi-langue | ×1,3 |
| Shopify Plus | ×1,4 |
| Bug intermittent | ×1,5 |
| Client agence (brief propre, accès prêts) | ×0,85 |

**Sur la majoration d'urgence.** Elle est légitime et doit être annoncée d'emblée, jamais découverte sur la facture :

> Je peux m'en occuper aujourd'hui. Une intervention en urgence est facturée {{X}} au lieu de {{Y}} — c'est le tarif de la disponibilité immédiate. Si vous pouvez attendre {{délai}}, le tarif normal s'applique.

Le client choisit en connaissance de cause. Beaucoup découvrent alors que ce n'était pas si urgent — et ils apprécient qu'on le leur ait proposé.

---

## E. Rentabilité réelle

Le piège de cette prestation : les bugs simples sont très rentables, les bugs complexes détruisent la marge si tu les as vendus au forfait.

```
Bug simple à 110 €, 45 min réelles           → 147 €/h  ✅
Bug moyen à 280 €, 3 h réelles               →  93 €/h  ✅
Bug complexe à 650 €, 9 h réelles            →  72 €/h  🟡
Bug "simple" à 55 € qui devient 4 h          →  14 €/h  ❌
```

La dernière ligne est celle qui coule les débutants. Le remède n'est pas d'augmenter le prix d'entrée : c'est **la règle des trois heures**.

### La règle des trois heures

Si après trois heures tu n'as pas de cause racine, tu t'arrêtes et tu écris :

> J'ai avancé sur le diagnostic. J'ai écarté {{A}}, {{B}} et {{C}} — voici ce que j'ai vérifié précisément. La cause est plus profonde que ce que laissait supposer le symptôme, et se situe probablement du côté de {{D}}.
>
> Je peux poursuivre, mais je préfère vous prévenir avant d'engager du temps supplémentaire. Estimation pour aller au bout : {{X}}. Vous préférez que je continue, ou que je vous livre un rapport de ce qui a été écarté ?

Tu montres du travail réel, tu es transparent, et tu ne travailles pas gratuitement. Les clients acceptent presque toujours de poursuivre — parce que tu viens de prouver que tu sais où tu vas.

---

## F. Structure de paiement

| Montant | Structure |
|---|---|
| < 150 € | 100 % à la commande |
| 150–500 € | 50 % au démarrage / 50 % à la livraison |
| > 500 € | Diagnostic payé d'avance, puis 50/50 sur la correction |
| Horaire | Facturation hebdomadaire, jamais en fin de projet |
| Retainer | Mensuel, d'avance |

**Toujours un acompte avant tout accès au store.** Un client qui refuse de payer un acompte refusera aussi de payer le solde — et sur cette prestation, le travail est fait avant que le résultat soit visible.

---

## G. Le retainer support

C'est l'aboutissement naturel de cette phase, et le produit le plus rentable de tout ton catalogue.

**Formule type — 400 €/mois :**
- Jusqu'à 4 heures d'intervention par mois, reportables un mois
- Délai de réponse garanti sous 24 h ouvrées
- Sauvegarde mensuelle du thème + suivi du versionnage
- Vérification du parcours d'achat après chaque installation d'application
- Contrôle du thème avant toute mise à jour

**Argumentaire, à formuler après une intervention réussie :**

> Ce qui s'est passé cette fois vient de {{cause}}. Ce type de situation se reproduit typiquement à chaque installation d'application ou mise à jour de thème. Aujourd'hui, vous découvrez le problème quand un client vous le signale — c'est-à-dire après avoir perdu des commandes.
>
> Je propose un suivi mensuel : je vérifie votre parcours d'achat après chaque changement, je maintiens une sauvegarde et un historique, et vous avez une réponse garantie sous 24 h quand quelque chose casse. {{X}} €/mois.

Le moment optimal : **juste après la confirmation que le bug est réglé.** Le contraste entre l'angoisse et le soulagement est à son maximum, et le client vient de mesurer concrètement ce que coûte l'absence de suivi.
