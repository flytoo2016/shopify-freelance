# 00 — Discovery & Inventory

**Règle absolue de cette phase : tu ne chiffres jamais une migration avant l'audit.**

Une migration est un projet dont le coût dépend entièrement de ce que tu ne sais pas encore. Chiffrer à l'aveugle, c'est accepter de travailler gratuitement pendant les trois dernières semaines.

L'audit se vend séparément, et il se déduit du projet si le client poursuit.

---

## A. Ce qu'un audit de migration doit établir

Trois questions, dans cet ordre :

1. **Qu'est-ce qui existe ?** — volumétrie exacte, datée
2. **Qu'est-ce qui n'aura pas d'équivalent sur Shopify ?** — l'écart fonctionnel
3. **Quel trafic est en jeu ?** — l'ampleur du risque SEO

La question 2 est celle qui fait échouer les projets quand elle est posée trop tard. **Un écart fonctionnel identifié avant la signature est une négociation ; découvert en semaine trois, c'est un litige.**

---

## B. Inventaire de volumétrie

À relever et à dater. Ces chiffres serviront de référence à tous les contrôles de validation.

```markdown
# Inventaire — {{client}} — relevé le {{date}}

## Catalogue
| Élément | Nombre |
|---|---|
| Produits publiés | |
| Produits brouillon / privés | |
| Variantes totales | |
| Produits à plus de 3 attributs | ⚠️ |
| Produits à plus de 2 048 variantes | ⚠️ |
| SKU uniques | |
| SKU en double | ⚠️ |
| Produits sans SKU | |
| Catégories | |
| Sous-catégories (profondeur max) | |
| Étiquettes / tags | |
| Attributs produits | |
| Images produits | |
| Produits téléchargeables | ⚠️ |
| Produits groupés / lots | ⚠️ |
| Produits par abonnement | ⚠️⚠️ |

## Clients et commandes
| Élément | Nombre |
|---|---|
| Comptes clients | |
| Clients avec commandes | |
| Commandes totales | |
| Commandes des 12 derniers mois | |
| Avoirs / remboursements | |
| Cartes cadeaux actives | ⚠️ |
| Points de fidélité | ⚠️ |

## Contenu
| Élément | Nombre |
|---|---|
| Pages | |
| Articles de blog | |
| Catégories de blog | |
| Auteurs | |
| Commentaires | |
| Médias (bibliothèque) | |

## URL indexées
| Type | Nombre |
|---|---|
| Produits | |
| Catégories | |
| Pages | |
| Articles | |
| Étiquettes | |
| Pagination | |
| Autres | |
| **TOTAL** | |
```

Les lignes marquées ⚠️ sont celles qui déclenchent une discussion. Les ⚠️⚠️ déclenchent un devis séparé.

---

## C. Le crawl — l'étape non négociable

**Tu dois disposer de la liste complète des URL indexées.** Sans elle, ton plan de redirections sera incomplet, et une redirection manquante est du trafic perdu.

Trois sources à croiser, jamais une seule :

1. **Un crawler** (Screaming Frog ou équivalent) sur le site source, en suivant tous les liens internes
2. **Google Search Console** → rapport de couverture, toutes les pages indexées
3. **Le sitemap XML** de la source

Chacune rate quelque chose : le crawler ne voit pas les pages orphelines, la Search Console ne montre pas tout, le sitemap est souvent incomplet ou périmé. **Croise les trois, dédoublonne, et tu obtiens la liste de référence.**

Exporte-la dans `01_audit/source-crawl.csv` avec, pour chaque URL : le type de page, le trafic sur 12 mois (si Analytics est accessible), et les impressions Search Console. Cette colonne trafic déterminera l'ordre de priorité du mapping des redirections.

---

## D. L'écart fonctionnel — le document qui sauve le projet

Recense chaque extension active de la source et détermine son sort.

```markdown
# Écart fonctionnel — {{client}}

| Extension / fonctionnalité | Ce qu'elle fait | Équivalent Shopify | Coût | Décision |
|---|---|---|---|---|
| WooCommerce Subscriptions | Abonnements | App tierce, ré-onboarding requis | {{X}} €/mois + projet | ⚠️ Séparé |
| Advanced Custom Fields | Champs produits | Metafields natifs | Inclus | ✅ Migré |
| Yoast SEO | Métadonnées | Natif + metafields | Inclus | ✅ Migré |
| WPML | Multilingue | Shopify Markets / Translate & Adapt | Selon plan | 🟡 À arbitrer |
| Product Bundles | Lots | App ou composant sur mesure | {{X}} | 🟡 À arbitrer |
| Points & Rewards | Fidélité | App tierce, **soldes non migrés** | {{X}} €/mois | ⚠️ Perte de données |
| Custom PHP | {{description}} | ❌ Aucun | — | ❌ Perdu |
```

Quatre statuts, et un seul mot d'ordre : **aucune ligne ne reste vide.**

| Statut | Signification |
|---|---|
| ✅ Migré | Équivalent natif ou metafield, inclus dans le forfait |
| 🟡 À arbitrer | Décision du client : app payante, développement, ou abandon |
| ⚠️ Projet séparé | Trop lourd pour être absorbé — devis distinct |
| ❌ Perdu | Aucun équivalent. **À faire valider explicitement par écrit** |

**La ligne ❌ est celle qui te protège.** Un client qui découvre après la bascule qu'une fonctionnalité a disparu, alors qu'il a signé un document qui l'annonçait, ne fait pas de litige. Un client qui le découvre sans document en fait un.

---

## E. Les cinq points de blocage à vérifier systématiquement

### 1. Plus de 3 options par produit

Shopify plafonne à **3 options par produit** (Taille, Couleur, Matière par exemple). WooCommerce autorise un nombre illimité d'attributs.

La limite de **variantes** est passée de 100 à **2 048** le 15 octobre 2025, ce qui a supprimé un obstacle historique majeur — mais **le nombre d'options n'a pas bougé**. Un produit à 4 attributs n'entre pas dans le modèle natif.

Options possibles, à chiffrer :
- Fusionner deux attributs en un (« Rouge / Coton » comme valeur unique)
- Éclater en plusieurs produits, reliés par des listes combinées
- Application de personnalisation de produit
- Metafields, si l'attribut est informatif et non vendeur

Compte les produits concernés **pendant l'audit**. C'est souvent le poste de travail le plus lourd de toute la migration.

### 2. Mots de passe clients

**Ils ne migrent jamais.** Toutes les plateformes stockent les mots de passe en hachage irréversible. Chaque client devra réinitialiser à sa première connexion.

Cela ne se corrige pas — cela se **prépare** : e-mail d'annonce 24 h avant la bascule, e-mail de réinitialisation le jour J, page de connexion explicite, et équipe support prévenue. Une part significative des clients qui reviennent buteront sur la connexion dans les premiers jours.

### 3. Abonnements actifs

Ils ne migrent pas. Les abonnés doivent être ré-embarqués via une application Shopify, ce qui implique une communication directe et souvent une nouvelle autorisation de paiement.

**C'est un projet à part entière**, à commencer plusieurs semaines avant la bascule, et à chiffrer séparément. Si le client a des abonnements et que tu n'as jamais traité le sujet, dis-le.

### 4. Produits téléchargeables et cartes cadeaux

Les fichiers numériques nécessitent une application. Les soldes de cartes cadeaux migrent avec certains outils, pas avec tous — à vérifier avant de promettre.

### 5. Le registrar du domaine

Qui contrôle le nom de domaine ? Le client a-t-il ses accès ? Le domaine est-il verrouillé pour transfert ?

**C'est le point de blocage le plus stupide et le plus fréquent :** tout est prêt, et personne ne peut modifier les DNS le jour J. Vérifie-le au premier échange, pas la veille.

---

## F. Le rapport d'audit — ce qui vend la mission

`migration-discovery.md` est le premier livrable, et c'est lui qui déclenche la décision.

```markdown
# Audit de migration — {{client}} — {{date}}

## En résumé
{{Trois paragraphes : ce qui existe, ce qui migre proprement, ce qui pose
problème, et l'ordre de grandeur du projet.}}

## Volumétrie
{{Le tableau d'inventaire}}

## Ce qui migre sans difficulté
{{Rassurant, et vrai : c'est la majorité}}

## Ce qui demande un traitement particulier
| Élément | Difficulté | Solution | Coût |
|---|---|---|---|

## Ce qui ne pourra pas être migré
| Élément | Pourquoi | Alternative |
|---|---|---|

## Le risque SEO
URL indexées : {{n}} · Trafic organique mensuel : {{n}} sessions
Pages générant 80 % du trafic : {{n}}
{{Ce qui sera mis en place, et ce qui se passera malgré tout : creux entre la
2ᵉ et la 6ᵉ semaine, récupération vers le 3ᵉ mois.}}

## Ce qui doit être décidé par vous
| # | Sujet | Options | Ma recommandation |
|---|---|---|---|

## Estimation
Durée : {{n}} semaines · Budget : {{fourchette}}
Périodes à éviter : {{...}}

## Ce dont j'aurai besoin de votre côté
{{Accès, décisions, temps de test, personne joignable le jour J}}
```

**La section « ce qui ne pourra pas être migré » est celle qui inspire le plus confiance.** Un prestataire qui annonce les pertes avant de signer est le seul auquel un marchand accepte de confier sa boutique.
