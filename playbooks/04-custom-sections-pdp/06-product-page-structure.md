# 06 — Product Page Structure

Chaque bloc existe pour une raison. **Un bloc sans raison est du poids** — il allonge la page, ralentit le chargement et dilue l'attention.

---

## A. La structure, bloc par bloc

| # | Bloc | Pourquoi il existe | Priorité mobile |
|---|---|---|---|
| 1 | Bandeau d'annonce | Une information de valeur (seuil de livraison offerte), pas de la décoration | Retirer s'il ne dit rien |
| 2 | En-tête | Repère, recherche, panier | Compact |
| 3 | Fil d'Ariane | Situe dans le catalogue, permet le retour, structure le SEO | Une ligne |
| 4 | Galerie | Répond à « à quoi ça ressemble en vrai » | **Max 60vh** |
| 5 | Titre | Décrit le produit, pas seulement le nom de gamme | |
| 6 | Note + nombre d'avis | Preuve sociale avant tout effort de lecture | **Au-dessus du pli** |
| 7 | Prix | Critère de qualification n°1 | **Au-dessus du pli** |
| 8 | Offre | Ce qu'on obtient exactement (lot, abonnement, palier) | |
| 9 | Sélecteur de variantes | Ne doit jamais laisser choisir l'indisponible sans le dire | |
| 10 | Quantité | Uniquement si l'achat multiple est réel | Souvent à supprimer |
| 11 | **Ajouter au panier** | L'action | **Barre collante après le 1er défilement** |
| 12 | Achat express | Raccourci pour l'acheteur décidé | Ne doit pas concurrencer le n°11 |
| 13 | Moyens de paiement | « Puis-je payer comme je veux » | |
| 14 | Réassurance | Vérifiable, pas décoratif | Compact |
| 15 | Livraison | Délai **daté**, pas « rapide » | |
| 16 | Retours | Lève l'objection du risque | |
| 17 | Bénéfices | Traduit les caractéristiques en conséquences | |
| 18 | Description | Répond à « pourquoi celui-ci » | Accordéon acceptable |
| 19 | Caractéristiques | Matières, dimensions, entretien | Accordéon |
| 20 | Avis | Preuve détaillée, photos, notes intermédiaires | |
| 21 | FAQ | Les questions réelles du SAV | **Rendue côté serveur** |
| 22 | Contenu client | Preuve d'usage réel | Lazy |
| 23 | Produits liés | Rattrapage si mauvais produit | |
| 24 | Vente croisée | Panier moyen | Après le n°11 |
| 25 | Vus récemment | Reprise de parcours | Lazy |

---

## B. Les quatre décisions qui comptent réellement

### 1. Prix et note au-dessus du pli, sur mobile

Une galerie en `100vh` repousse tout le reste. Le visiteur arrivant d'une publicité voit une image, et rien qui lui permette de décider. C'est le constat le plus fréquent des audits de Phase 3 et le correctif le plus rentable de la Phase 4.

**La règle :** galerie plafonnée à 60vh sur mobile, avec titre, note et prix immédiatement dessous.

```liquid
{%- comment -%} La galerie ne doit pas manger tout l'écran {%- endcomment -%}
{% stylesheet %}
  .product__gallery { max-height: 60vh; }
  @media (min-width: 750px) { .product__gallery { max-height: none; } }
{% endstylesheet %}
```

### 2. Barre d'achat collante

Après le premier défilement, une barre fixe en bas d'écran affiche : miniature, nom court, variante sélectionnée, prix, bouton d'ajout. L'action reste accessible en permanence, quelle que soit la longueur de la page.

Points d'attention : ne pas masquer le contenu (prévoir un `padding-bottom` sur le corps de page), la faire disparaître quand le bouton principal est visible, et la tester avec le clavier virtuel ouvert sur iOS.

### 3. Les blocs 15, 16 et 21 viennent de tes données

Livraison, retours et FAQ ne se remplissent pas avec un modèle générique. Ils se remplissent avec les **questions réelles du SAV** du client — la question 20 du questionnaire de Phase 3.

C'est ce qui distingue une page produit spécifique d'une page produit jolie. Une FAQ qui répond aux trois questions que les clients posent réellement vaut plus que douze questions inventées.

### 4. La FAQ doit être rendue côté serveur

Une FAQ injectée par JavaScript n'est ni indexée par les moteurs, ni disponible pour l'acheteur pressé, ni accessible. `<details>`/`<summary>` natifs règlent le problème sans une ligne de JavaScript.

```liquid
{%- for block in section.blocks -%}
  {%- if block.type == 'faq_item' -%}
    <details class="faq__item" {{ block.shopify_attributes }}>
      <summary class="faq__question">{{ block.settings.question }}</summary>
      <div class="faq__answer">{{ block.settings.answer }}</div>
    </details>
  {%- endif -%}
{%- endfor -%}
```

---

## C. Ce qu'il faut supprimer plus souvent qu'ajouter

| Élément | Quand le retirer |
|---|---|
| Sélecteur de quantité | Si l'achat multiple est rare — il ajoute une décision inutile |
| Bandeau d'annonce décoratif | S'il ne porte aucune information exploitable |
| Carrousel de produits liés en haut de page | Il détourne avant la décision |
| Popup de newsletter sur la page produit | Interrompt au pire moment |
| Badges de confiance génériques | « 100 % sécurisé » dessiné réduit la confiance chez un acheteur averti |
| Compteur de stock permanent | S'il n'est pas connecté à l'inventaire réel |
| Deuxième bouton d'achat de même poids | Il annule la hiérarchie d'action |
| Onglets desktop sur mobile | Empiler vaut mieux que masquer |

**Une page produit se conçoit par soustraction autant que par addition.** Chaque bloc que tu retires accélère le chargement et clarifie la décision. C'est aussi un argument commercial : un client qui te voit proposer de retirer des choses comprend que tu ne cherches pas à facturer du volume.

---

## D. Position professionnelle sur l'urgence

| Mécanique | Statut |
|---|---|
| Stock réel affiché, connecté à l'inventaire | ✅ Légitime |
| Fin de promotion datée et respectée | ✅ Légitime |
| Délai de livraison garanti si commande avant une heure donnée | ✅ Excellent, et vrai |
| Minuteur qui se réinitialise à chaque visite | ❌ Trompeur — refuser |
| « 47 personnes regardent ce produit » généré aléatoirement | ❌ Trompeur |
| Compteur de stock identique sur tous les produits | ❌ Trompeur |
| Prix barré jamais pratiqué | ❌ Risque réglementaire selon les marchés |

Si un client demande une mécanique de la seconde catégorie, refuse et propose l'alternative honnête. Formulation :

> Je peux construire un affichage de stock, mais connecté à votre inventaire réel. Un compteur qui se réinitialise à chaque visite expose à un risque réglementaire selon les marchés où vous vendez, et les acheteurs réguliers repèrent ces mécaniques — l'effet se retourne. En revanche, « commandez avant 14 h, expédié aujourd'hui » est vrai chez vous et fonctionne mieux, parce que c'est vérifiable.

---

## E. Structure du template JSON

Une restructuration de page produit se joue autant dans `templates/product.json` que dans les fichiers de section :

```json
{
  "sections": {
    "breadcrumb": { "type": "breadcrumb" },
    "main": {
      "type": "main-product",
      "blocks": {
        "title":     { "type": "title" },
        "rating":    { "type": "rating" },
        "price":     { "type": "price" },
        "variants":  { "type": "variant_picker" },
        "buy":       { "type": "buy_buttons" },
        "trust":     { "type": "trust_bar" },
        "shipping":  { "type": "shipping_info" }
      },
      "block_order": ["title", "rating", "price", "variants", "buy", "trust", "shipping"]
    },
    "faq":      { "type": "product-faq" },
    "reviews":  { "type": "product-reviews" },
    "related":  { "type": "related-products" }
  },
  "order": ["breadcrumb", "main", "faq", "reviews", "related"]
}
```

Deux règles :
- **Chaque `"type"` doit correspondre à un fichier réel** de `sections/` ou `blocks/`. Une référence orpheline produit une page cassée.
- **`block_order` détermine l'ordre de rendu.** C'est là que se joue la hiérarchie mobile — et c'est modifiable par le marchand dans l'éditeur, ce qui signifie qu'il pourra la défaire. Explique-lui pourquoi cet ordre, dans le guide marchand.

---

## F. Mesurer

Une restructuration de page produit se mesure. Méthodologie de la Phase 1 :

```
[ ] Baseline AVANT : Lighthouse mobile 3 runs, poids, requêtes, LCP
[ ] P75 terrain avant, relevé et daté
[ ] Taux d'ajout au panier avant, sur 14 jours minimum
[ ] Les mêmes mesures après, conditions identiques
[ ] Relevé du P75 à J+30 (fenêtre glissante du RUM)
```

Et la formulation honnête, à écrire dans le rapport de livraison :

> Les mesures de performance sont directement comparables : mêmes conditions avant et après. Le taux d'ajout au panier, en revanche, dépend aussi de votre trafic, de vos campagnes et de la saison. Un écart observé sur 14 jours est une indication, pas une preuve. Je vous recommande de le regarder à nouveau dans 30 jours, quand vos données terrain se seront actualisées.
