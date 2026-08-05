# 06 — SEO Migration

**Le fichier le plus important de la Phase 5.**

Une migration peut tout réussir et échouer sur ce seul point. Le client mesurera ta prestation à sa courbe de trafic organique, pas à la propreté de ton mapping produit.

---

## A. Ce qui se joue

Toutes les URL changent. WooCommerce utilise `/product/nom/`, Shopify impose `/products/nom`. Chaque produit, chaque catégorie, chaque page, chaque article change d'adresse.

Sans redirections, Google découvre des milliers de pages disparues et retire le site de son index progressivement. Avec des redirections complètes, l'autorité accumulée est transférée et la perte reste temporaire.

**Il n'y a pas de position intermédiaire :** les redirections sont faites, ou le trafic est perdu.

---

## B. Le déroulement normal — à annoncer avant

| Période | Ce qui se passe |
|---|---|
| J à J+7 | Google découvre les redirections, commence à recrawler |
| J+14 à J+42 | **Le creux.** Trafic organique en baisse, positions instables |
| J+42 à J+90 | Réindexation progressive, remontée |
| J+90 | Récupération attendue, à niveau de contenu constant |

**Annonce ce calendrier avant la bascule, par écrit.** Un client qui voit son trafic baisser en semaine 3 sans avoir été prévenu conclura que la migration a échoué — même si elle est parfaite. Un client prévenu attend la semaine 8.

Envoie un relevé hebdomadaire pendant cette période. C'est peu coûteux et cela transforme une phase d'angoisse en phase de suivi.

---

## C. La carte de redirections

### Étape 1 — La liste exhaustive

Trois sources croisées, jamais une seule :

1. **Crawl du site source** — suit tous les liens internes
2. **Google Search Console** — rapport de couverture, pages indexées
3. **Sitemap XML** de la source

Chacune rate quelque chose : le crawler ne voit pas les pages orphelines, la Search Console ne montre pas tout, le sitemap est souvent périmé. Croise, dédoublonne, et tu obtiens la liste de référence.

Ajoute pour chaque URL : le **trafic sur 12 mois** et les **impressions Search Console**. Cette colonne détermine l'ordre de traitement.

### Étape 2 — Les correspondances

| Source WooCommerce | Destination Shopify | Priorité |
|---|---|---|
| `/product/slug/` | `/products/slug` | **P0** |
| `/product-category/parent/enfant/` | `/collections/enfant` | **P0** |
| `/shop/` | `/collections/all` | **P0** |
| `/page-slug/` | `/pages/page-slug` | P1 |
| `/blog/2024/03/slug/` | `/blogs/news/slug` | P1 |
| `/category/blog-cat/` | `/blogs/news/tagged/blog-cat` | P2 |
| `/product-tag/tag/` | Collection correspondante ou catégorie parente | P2 |
| `/cart/` | `/cart` | P1 |
| `/checkout/` | `/cart` | P1 |
| `/my-account/` | `/account` | P1 |
| `/?s=terme` | `/search?q=terme` | P2 |
| `/shop/page/2/` | `/collections/all` | P2 |
| `/wp-content/uploads/...` | Nouvelle URL du fichier, ou abandon | P3 |

### Étape 3 — Les quatre règles

1. **Une redirection par URL indexée.** Pas d'exception non justifiée.
2. **Aucune chaîne.** A→B→C est interdit : écrire A→C directement. Les chaînes diluent le signal et ralentissent le crawl.
3. **Aucune redirection vers la page d'accueil par défaut.** C'est techniquement un succès et commercialement un échec : le visiteur ne trouve pas ce qu'il cherchait, et Google traite souvent ces redirections comme des 404 déguisées. Redirige vers la page la plus proche en contenu.
4. **Aucune boucle.**

### Étape 4 — L'import

Le gestionnaire de redirections natif de Shopify accepte un **import CSV en masse**, ce qui est indispensable dès que le volume dépasse quelques dizaines d'URL.

Format : deux colonnes, `Redirect from` et `Redirect to`, en chemins relatifs.

```csv
Redirect from,Redirect to
/product/chaise-bois/,/products/chaise-bois
/product-category/mobilier/,/collections/mobilier
/blog/2024/03/entretien-bois/,/blogs/news/entretien-bois
```

### Étape 5 — Le test

```
[ ] Les 20 URL à plus fort trafic, testées une par une
[ ] Échantillon aléatoire de 50 URL
[ ] Aucune chaîne (vérifier le nombre de sauts)
[ ] Chaque test finit en 200 sur une page pertinente
```

```bash
while read url; do
  code=$(curl -s -o /dev/null -w "%{http_code}" -L "$url")
  saut=$(curl -s -o /dev/null -w "%{num_redirects}" -L "$url")
  final=$(curl -s -o /dev/null -w "%{url_effective}" -L "$url")
  echo "$url,$code,$saut,$final"
done < urls-a-tester.txt > test-redirections.csv
```

Colonne `saut` supérieure à 1 → chaîne à corriger.

---

## D. Les métadonnées

À migrer en priorité sur les pages qui portent le trafic.

| Élément | Source | Destination |
|---|---|---|
| Balise `title` | Yoast / Rank Math | Champ SEO Shopify |
| Meta description | Idem | Champ SEO Shopify |
| Canonical | Automatique | Automatique (thème conforme) |
| Balise `h1` | Contenu | Titre de la page |
| Texte alternatif des images | Bibliothèque média | `Image Alt Text` |
| Données structurées produit | Extension | Natif dans un thème conforme |
| Hreflang | WPML / Polylang | Shopify Markets |

**Un thème conforme aux exigences du Theme Store fournit nativement** les balises `title`, `meta description`, `canonical` et les données structurées produit. Vérifie-le sur le thème retenu plutôt que de le supposer.

Ordre de traitement : les 100 pages qui génèrent 80 % du trafic organique d'abord. Le reste ensuite, ou jamais si le budget est contraint — dis-le honnêtement.

---

## E. Les contrôles techniques

```
[ ] Sitemap XML accessible et complet (/sitemap.xml)
[ ] Sitemap soumis à la Search Console dès la bascule
[ ] robots.txt cohérent, ne bloque rien d'important
[ ] Le mot de passe de la boutique est retiré ⚠️
[ ] Aucune balise noindex résiduelle
[ ] Données structurées valides (Rich Results Test)
[ ] Hiérarchie de titres cohérente sur les modèles de page
[ ] Un seul h1 par page
[ ] Textes alternatifs présents
[ ] Pages en HTTPS, aucun contenu mixte
[ ] Page 404 personnalisée, avec recherche et liens utiles
[ ] Performance mesurée (→ Phase 1)
```

**La ligne « mot de passe retiré » a déjà coûté des semaines à des migrations entières.** Une boutique Shopify protégée par mot de passe n'est pas indexable. Si elle reste protégée après la bascule, Google ne voit rien.

---

## F. Search Console

```
[ ] Nouvelle propriété créée AVANT la bascule
[ ] Domaine vérifié
[ ] Sitemap soumis le jour J
[ ] Ancienne propriété conservée (les données restent utiles)
[ ] Outil de changement d'adresse utilisé si le domaine change
[ ] Surveillance quotidienne de la couverture pendant 14 jours
```

**Si le domaine ne change pas** (cas le plus fréquent), il n'y a pas de changement d'adresse à déclarer : seule la structure d'URL change, et les redirections font le travail.

**Si le domaine change**, l'outil de changement d'adresse de la Search Console doit être utilisé, et le délai de récupération s'allonge.

---

## G. Ce qui est irrécupérable

À écrire dans le rapport, avant la bascule :

- **L'historique analytique** de l'ancienne plateforme, sauf export préalable
- **Les positions exactes** : elles bougeront, à la hausse comme à la baisse
- **Les URL sans équivalent** : une catégorie supprimée ne se redirige que vers un parent
- **Le contenu supprimé volontairement** — si le client en profite pour faire du ménage, il perd le trafic associé

Sur ce dernier point : beaucoup de marchands veulent « en profiter pour nettoyer ». Explique le coût :

> Vous pouvez supprimer ces 200 fiches produit obsolètes. Elles génèrent actuellement {{n}} sessions par mois. Si vous les supprimez, ce trafic disparaît — et il ne reviendra pas. Je recommande de les rediriger vers leur catégorie plutôt que de les faire disparaître, et de trancher dans six mois, quand la migration sera stabilisée. On ne mélange pas deux chantiers dont l'un est déjà risqué.

---

## H. Le livrable

```markdown
# Migration SEO — {{client}} — {{date}}

## Situation avant migration
URL indexées : {{n}} · Trafic organique mensuel : {{n}} sessions
Impressions Search Console (90 j) : {{n}}
Pages générant 80 % du trafic : {{n}}

## Redirections
| Type | URL source | Redirigées | Non redirigées | Motif |
|---|---|---|---|---|
| Produits | | | | |
| Catégories | | | | |
| Pages | | | | |
| Articles | | | | |
| Étiquettes | | | | |
| **Total** | | | | |

Chaînes : 0 · Boucles : 0 · Testées : {{n}} · Échecs : {{n}}

## Métadonnées migrées
{{n}} pages sur {{n}}, priorisées par trafic

## Contrôles techniques
{{la checklist, cochée}}

## Ce qui n'a pas été redirigé, et pourquoi
| URL | Trafic | Motif | Décision |
|---|---|---|---|

## Ce à quoi vous attendre
Un creux de trafic organique est attendu entre la 2ᵉ et la 6ᵉ semaine : Google
doit recrawler et réindexer l'ensemble du site. La récupération intervient
généralement autour du 3ᵉ mois, à contenu constant.

Je vous enverrai un relevé hebdomadaire pendant cette période :
impressions, clics, positions moyennes, erreurs de couverture, et les
redirections que j'aurai ajoutées à partir des 404 observées.

## Surveillance prévue
{{calendrier}}
```

La dernière section transforme la phase la plus inconfortable du projet en démonstration de sérieux. C'est aussi ce qui ouvre naturellement le suivi mensuel.
