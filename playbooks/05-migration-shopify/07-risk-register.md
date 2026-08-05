# 07 — Risk Register

Le registre des risques est un livrable client, remis **avant** la signature. Sa fonction n'est pas de te couvrir : c'est de montrer que tu as déjà pensé à ce qui peut mal tourner. C'est, dans cette phase, le document qui fait signer.

---

## A. Le format

| ID | Risque | Probabilité | Impact | Atténuation | Responsable | Statut |
|---|---|---|---|---|---|---|

- **Probabilité** : Faible / Moyenne / Élevée
- **Impact** : Faible / Moyen / Élevé / **Critique** (arrêt du chiffre d'affaires)
- **Responsable** : toi, le client, ou un tiers nommé
- **Statut** : Ouvert / Atténué / Accepté / Clos

La colonne **Responsable** est celle qui compte. Un risque sans responsable nommé n'est traité par personne.

---

## B. Le registre type

### Risques critiques

| ID | Risque | P | I | Atténuation | Resp. |
|---|---|---|---|---|---|
| R-01 | Pas d'accès au registrar le jour J | Moyenne | **Critique** | Vérification écrite dès la semaine 1, test de connexion | Client |
| R-02 | Redirections incomplètes → chute de trafic | Moyenne | **Critique** | Crawl croisé sur 3 sources, test par échantillon, surveillance 404 | Toi |
| R-03 | Taxes ou livraison mal configurées | Moyenne | **Critique** | Commande test réelle sur chaque zone avant bascule | Toi |
| R-04 | Paiement non fonctionnel après bascule | Faible | **Critique** | Transaction réelle testée, puis remboursée | Toi |
| R-05 | DNS mal propagés, site inaccessible | Faible | **Critique** | TTL abaissé 24 h avant, vérification multi-région | Toi |
| R-06 | Coupure de la messagerie du client | Moyenne | **Critique** | Enregistrements MX documentés et **préservés** | Toi |

**R-06 est le risque le plus sournois.** Une bascule DNS qui écrase les enregistrements MX coupe les e-mails de l'entreprise. Le marchand découvre qu'il ne reçoit plus rien, y compris ses notifications de commande. Documente les MX existants avant toute modification, et vérifie-les après.

### Risques élevés

| ID | Risque | P | I | Atténuation | Resp. |
|---|---|---|---|---|---|
| R-07 | Produits à plus de 3 options non traités | Élevée | Élevé | Recensés à l'audit, stratégie validée au mapping | Toi |
| R-08 | SKU en double bloquant l'import | Élevée | Élevé | Dédoublonnage préalable, arbitrage client | Client |
| R-09 | Support saturé (mots de passe) | Élevée | Élevé | Campagne J-1, J, J+7. Équipe briefée | Client |
| R-10 | Images cassées après coupure de l'ancien hébergement | Moyenne | Élevé | Réhébergement contrôlé, `grep` sur l'ancien domaine | Toi |
| R-11 | Fonctionnalité perdue découverte après la bascule | Moyenne | Élevé | Écart fonctionnel validé par écrit à l'audit | Toi |
| R-12 | Décisions client en attente bloquant le planning | Élevée | Moyen | Liste datée des décisions, relances programmées | Client |
| R-13 | Ancien hébergement coupé trop tôt | Moyenne | Élevé | Maintenir 60 jours minimum après la bascule | Client |

**R-13 mérite un rappel explicite au client, par écrit.** Beaucoup résilient leur hébergement le lendemain de la bascule pour économiser. Ils perdent alors toute possibilité de retour arrière, et souvent des médias non réhébergés.

### Risques moyens

| ID | Risque | P | I | Atténuation | Resp. |
|---|---|---|---|---|---|
| R-14 | Baisse temporaire du trafic organique | **Élevée** | Moyen | **Annoncée avant**, relevé hebdomadaire, corrections des 404 | Toi |
| R-15 | Notifications envoyées à d'anciens clients lors de l'import | Moyenne | Moyen | Vérifier le comportement de l'outil sur un lot test | Toi |
| R-16 | Écart de données non expliqué | Moyenne | Moyen | Validation chiffrée, chaque écart tracé | Toi |
| R-17 | Intégration comptable ou logistique non reconnectée | Moyenne | Moyen | Inventaire à l'audit, test avant bascule | Toi |
| R-18 | Avis clients perdus | Moyenne | Moyen | Vérifier la capacité de migration de l'app retenue | Toi |
| R-19 | Client déçu du design | Moyenne | Moyen | Cadrage explicite : équivalent en fonction, pas identique | Toi |
| R-20 | Dérive de périmètre | **Élevée** | Moyen | Matrice validée, devis séparé pour tout ajout | Toi |

**R-14 est marqué probabilité élevée volontairement.** Ce n'est pas un risque à éviter : c'est un événement attendu. Le risque réel est qu'il n'ait pas été annoncé.

---

## C. Les risques par plateforme source

### WooCommerce
- Attributs illimités → limite de 3 options Shopify
- Shortcodes et balisage de constructeur dans les descriptions
- Extensions avec logique métier sans équivalent
- Abonnements actifs
- Base de données volumineuse et lente à exporter

### Magento
- Structure de catalogue très différente (attribute sets)
- Sites multiples dans une seule installation
- Prix par groupe de clients
- Volume souvent important

### PrestaShop
- Combinaisons de déclinaisons
- Multi-boutique
- Structure d'URL configurable, donc imprévisible

### Wix / Squarespace
- Export limité, parfois partiel
- Structure d'URL propriétaire
- Contenu difficilement extractible
- **Souvent plus pénible qu'une migration WooCommerce**, malgré une volumétrie plus faible

Le dernier point surprend : les petites plateformes fermées exportent mal, et le travail manuel y est proportionnellement plus lourd. Ne sous-tarife pas une migration Wix sous prétexte qu'il y a 80 produits.

---

## D. Le plan de retour arrière

Écrit avant la bascule, validé par le client, joint au plan de lancement.

```markdown
## Plan de retour arrière — {{client}}

### Situation
Ancienne boutique : {{URL}}, hébergement {{prestataire}}, **maintenue jusqu'au
{{date, au minimum J+60}}**
Enregistrements DNS d'origine : {{consignés en annexe, MX inclus}}
TTL avant bascule : {{valeur}}
Sauvegarde complète : {{emplacement, date, restauration testée le {{date}}}}

### Déclencheurs d'un retour arrière
- Impossibilité de commander pendant plus de {{n}} minutes
- Perte de données constatée et non corrigeable en {{n}} heures
- Erreur de facturation (taxes, livraison) touchant les commandes réelles
- Décision du client

### Procédure ({{n}} minutes)
1. Rétablir les enregistrements DNS d'origine (annexe A)
2. Vérifier la propagation depuis 3 régions
3. Vérifier que l'ancienne boutique répond et accepte une commande
4. Informer le client, noter l'heure
5. Exporter les commandes passées sur Shopify pendant la fenêtre
6. Les reporter manuellement sur l'ancienne plateforme

### Ce qu'un retour arrière ne restaure PAS
- Les commandes passées sur Shopify pendant la fenêtre (à reporter à la main)
- Les comptes clients créés pendant la fenêtre
- Le temps et le budget engagés

### Contact
{{nom}} — {{téléphone}} — disponible {{créneaux}} du {{date}} au {{date}}
```

**La section « ce qu'un retour arrière ne restaure pas » est celle qui compte.** Un retour arrière n'est pas gratuit, et le client doit le savoir avant de le demander sur un problème mineur.

---

## E. Utiliser le registre commercialement

Remets-le **avant la signature**, avec cette formulation :

> Voici le registre des risques de votre migration. Il liste vingt situations qui peuvent mal se passer, leur probabilité, leur impact, et ce que je mets en place pour chacune. Six d'entre elles relèvent de votre côté — je les ai signalées, et nous les traiterons ensemble.
>
> Aucun prestataire ne peut vous promettre qu'une migration se passera sans accroc. Ce que je peux vous montrer, c'est que j'ai déjà réfléchi à ce qui peut arriver, et que j'ai un plan pour chaque cas.

Presque personne ne fait ça sur ce marché. C'est le document qui différencie le plus, à budget égal — et c'est aussi celui qui te protège le mieux le jour où quelque chose arrive réellement.
