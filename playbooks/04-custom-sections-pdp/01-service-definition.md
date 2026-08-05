# 01 — Service Definition

---

## A. Deux prestations, à ne jamais confondre

### A. Custom Shopify Section

> Je conçois et développe un composant sur mesure pour votre thème, entièrement configurable depuis le personnalisateur, sans dépendance à une application, documenté et réutilisable.

Commande d'exécution : le client sait ce qu'il veut. Le travail commence à la spécification.

### B. High-Converting Product Page

> Je restructure votre page produit à partir d'une analyse de vos objections clients réelles, je développe les composants manquants, et vous pouvez ensuite modifier chaque élément vous-même.

Commence par de l'analyse. **Sans elle, tu construis une belle page qui ne convertit pas mieux que l'ancienne** — et le client le constatera dans ses chiffres.

La différence n'est pas le volume de code. C'est la présence ou l'absence d'un travail de diagnostic en amont. Vends-les à des prix différents et ne laisse pas glisser l'une vers l'autre.

---

## B. Les trois formules

### COMPONENT
**Pour :** un composant précis, périmètre net.
**Contenu :** discovery courte, spécification validée, développement, schéma complet, responsive, accessibilité, test Theme Editor, guide marchand.
**Délai :** 3–5 jours. **Garantie :** 14 jours.

### COMPONENT + DATA
**Pour :** un composant dont le contenu diffère par produit.
**Contenu :** Component + définition des metafields ou metaobjects, sources dynamiques, gestion des cas où la donnée est absente, documentation de saisie pour le marchand.
**Délai :** 5–8 jours. **Garantie :** 30 jours.

### PRODUCT PAGE
**Pour :** restructuration complète.
**Contenu :** analyse des objections, stratégie de conversion écrite, spécification UX, développement de tous les composants nécessaires, réorganisation du template, tests complets, appel de livraison, guide marchand.
**Délai :** 10–20 jours. **Garantie :** 30 jours.

---

## C. Le scope écrit

À coller dans chaque proposition :

> **Inclus.** Conception et développement d'un composant sur mesure pour votre thème Shopify : code Liquid, CSS et JavaScript, schéma de configuration permettant la modification depuis le personnalisateur, intégration responsive, tests d'accessibilité de base, tests sur navigateurs et appareils, compatibilité avec l'éditeur de thème, et documentation d'utilisation. Le travail est réalisé sur une copie non publiée de votre thème.
>
> **Non inclus.** La création du contenu (textes, images, photographies). La refonte du design global du thème. Toute fonctionnalité nécessitant une logique côté serveur, une application dédiée ou une extension de checkout. La saisie des données produit. La modification du processus de paiement. La migration depuis une application existante, sauf mention explicite.
>
> **Périmètre.** Le périmètre est celui décrit dans la spécification technique que vous validez avant le démarrage du développement. Toute demande apparue après cette validation fera l'objet d'un devis séparé. Cela ne signifie pas que je refuserai les ajustements : cela signifie qu'ils seront chiffrés plutôt que absorbés silencieusement.
>
> **Données.** Si le composant affiche des informations spécifiques à chaque produit, ces informations doivent exister dans votre boutique. Je crée la structure qui les accueille ; leur saisie relève de votre équipe, sauf accord contraire. Un composant livré sans données à afficher fonctionnera mais restera vide.
>
> **Maintenance.** Le composant est garanti {{N}} jours contre tout dysfonctionnement qui lui serait imputable. Cette garantie ne couvre ni les modifications apportées par un tiers, ni les conséquences d'une mise à jour de thème, ni l'installation de nouvelles applications. Comme tout code sur mesure, ce composant relève de votre responsabilité dans la durée : je peux en assurer la maintenance, ce n'est pas automatique.
>
> **Résultats.** Aucun gain de conversion n'est garanti. La conception s'appuie sur des pratiques établies et sur l'analyse de votre situation, mais l'effet réel d'un composant ne peut être établi qu'en le mettant en ligne et en mesurant.

Le paragraphe **Données** évite la dérive de délai la plus fréquente de cette phase : le composant est prêt, le client n'a rien à y mettre, et le projet reste ouvert six semaines.

Le paragraphe **Maintenance** est celui que personne n'écrit et qui est le plus honnête. Il transforme aussi une objection en upsell : le client comprend qu'un contrat de maintenance a un sens.

---

## D. Section sur mesure ou application ?

Question posée à chaque mission. Réponse honnête :

| Critère | Section sur mesure | Application |
|---|---|---|
| Coût | Une fois | Mensuel, à vie |
| Performance | Contrôlée, minimale | Script tiers, souvent lourd |
| Personnalisation | Totale | Limitée aux réglages prévus |
| Maintenance | **À votre charge** | Assurée par l'éditeur |
| Mise à jour Shopify | Peut nécessiter une intervention | Gérée par l'éditeur |
| Logique serveur | Impossible | Possible |
| Délai | 3 à 20 jours | Immédiat |
| Dépendance | Aucune | Éditeur, tarifs, pérennité |

**Formulation à utiliser :**

> L'application vous coûte {{X}} €/mois, soit {{X×12}} € par an. Cette section coûte {{prix}} une fois, et elle est amortie en {{n}} mois. Elle sera plus rapide, parce qu'elle ne charge pas de script externe, et entièrement adaptée à votre besoin.
>
> En contrepartie, elle devient votre responsabilité : si Shopify fait évoluer quelque chose dans deux ans, il faudra la mettre à jour. Une application est maintenue par son éditeur — c'est ce que vous payez chaque mois. C'est le vrai arbitrage, et il dépend de votre horizon.

Cette honnêteté sur le revers de la médaille fait signer plus souvent que l'argument économique seul, parce qu'elle établit que tu ne cherches pas à placer une prestation.

**Quand recommander l'application malgré tout :**
- La fonctionnalité exige une logique serveur (abonnements, calculs de remises, synchronisation)
- Le besoin est susceptible d'évoluer beaucoup
- Le client n'aura personne pour maintenir du code sur mesure
- L'application coûte moins de 10 $/mois et le développement dépasserait 800 €

Le dire quand c'est vrai coûte une mission et gagne un client.

---

## E. La frontière composant / refonte

Deuxième source de conflit de cette phase, après la dérive de périmètre.

| Demande | Nature | Traitement |
|---|---|---|
| « Ajoutez une section comparatif » | Composant | Cette prestation |
| « Refaites ma page produit » | Restructuration | Prestation B, avec analyse |
| « Refaites ma boutique comme ce site » | **Refonte** | Autre projet, autre budget |
| « Changez les couleurs et les polices partout » | Thème | Hors périmètre |
| « Ajoutez cette section sur toutes mes pages » | Composant + déploiement | Chiffrer le déploiement séparément |

**Le test :** si la demande touche à la charte graphique globale, au thème lui-même ou à plus de trois templates, ce n'est plus un composant. Dis-le tôt, chiffre séparément, et propose éventuellement un premier composant comme point de départ — c'est souvent ce qui débloque la décision.

---

## F. Positionnement

Le marché du développement de sections Shopify comprend :

- **Les marketplaces de sections** — sections génériques à 20–60 €, non adaptées, non maintenues, souvent lourdes
- **Les développeurs à bas coût** — livrent du code qui fonctionne mais n'est pas configurable : le client revient pour chaque changement de texte
- **Les agences** — bonnes, chères, délais longs

**Ton angle : le composant que le marchand pilote lui-même.**

Trois marqueurs à afficher dès le premier échange :

1. **« Vous n'aurez pas à me rappeler pour changer un mot. »** C'est la promesse qui distingue immédiatement, parce que tous les clients ont déjà vécu l'inverse.
2. **Une spécification validée avant tout code.** Personne ne le fait à ce niveau de prix, et ça rassure énormément.
3. **Un guide d'utilisation d'une page avec captures.** Le livrable qui transforme un développement en outil réellement utilisé.
