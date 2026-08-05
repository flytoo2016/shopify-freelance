# 07 — Testing & Quality Gate

Un correctif non testé est un bug en attente. Sur un site marchand, un bug non détecté coûte plus cher que tout le gain de performance obtenu.

---

## A. Trois niveaux, dans cet ordre

**Le fonctionnel passe avant la performance.** Un site rapide qui ne vend plus est un échec complet.

### Niveau 1 — Test fonctionnel (après chaque commit)

Le parcours d'achat, sur le thème de preview, en navigation privée :

```
[ ] Home charge, menu desktop ouvre
[ ] Menu mobile / burger ouvre et ferme
[ ] Recherche renvoie des résultats
[ ] Page collection : filtres, tri, pagination
[ ] Page produit : galerie, zoom, changement de variante (image + prix + dispo)
[ ] Ajout au panier → drawer/panier s'ouvre et affiche le bon article
[ ] Modification de quantité, suppression d'article
[ ] Bouton "Checkout" atteint l'écran de paiement (ne pas payer)
[ ] Formulaire newsletter
[ ] Widget avis s'affiche
[ ] Popup / bandeau promo s'affiche s'il est censé s'afficher
[ ] Console navigateur : zéro nouvelle erreur JS par rapport à la baseline
```

Le dernier point est le plus important et le plus oublié : **compare** la console au thème de référence. Un thème client a souvent déjà des erreurs. Ce qui compte, ce sont les **nouvelles**.

### Niveau 2 — Test de performance

Conditions identiques à la baseline, sans exception :

```
Même navigateur, même version, navigation privée, zéro extension
Même device / émulation, même throttling
3 runs → médiane
Cache vidé entre les runs
URLs identiques (home / la même collection / le même produit)
```

⚠️ **Piège majeur.** Un thème non publié se mesure via un lien de preview qui peut ajouter des paramètres et un léger surcoût. Deux options honnêtes :
1. Mesurer la baseline **aussi** sur un lien de preview du thème d'origine dupliqué (comparaison strictement équivalente) — recommandé.
2. Ou attendre la publication et mesurer sur l'URL publique dans les deux cas.

Ne compare **jamais** une baseline sur URL publique avec un after sur lien de preview : le client s'en apercevra, et il aura raison.

### Niveau 3 — Test de non-régression Theme Editor

Le plus négligé, et la première cause de client mécontent après une livraison techniquement réussie.

```
[ ] Chaque section modifiée s'ouvre dans l'éditeur
[ ] Tous les réglages sont présents et conservent leur valeur
[ ] Les blocs peuvent être ajoutés, réordonnés, supprimés
[ ] La prévisualisation live se met à jour
[ ] Une section peut être masquée puis réaffichée
[ ] Aucune section n'affiche "This section is not available"
```

Un `id` de setting modifié dans un `{% schema %}` vide silencieusement le contenu du marchand. Vérifie-le, systématiquement.

### Matrice de dispositifs

| Priorité | Environnement | Pourquoi |
|---|---|---|
| **Obligatoire** | Chrome mobile (appareil **réel**, pas seulement l'émulateur) | La majorité du trafic |
| **Obligatoire** | Safari iOS réel | Comportements CSS/JS divergents, très gros segment e-commerce |
| **Obligatoire** | Chrome desktop | Référence |
| Recommandé | Safari macOS | |
| Recommandé | Firefox desktop | |
| Si trafic | Samsung Internet | Fréquent sur certains marchés |

L'émulateur DevTools ne reproduit ni les performances CPU réelles, ni le moteur Safari. Un test sur iPhone réel a détecté plus de bugs que n'importe quel autre contrôle de cette liste.

---

## B. QUALITY GATE — bloquant

À exécuter avant **toute** livraison. Si une seule condition critique échoue → **STOP DELIVERY**.

### Conditions CRITIQUES (blocage immédiat)

```
[ ] C1  shopify theme check --fail-level error → 0 erreur
[ ] C2  Parcours d'achat complet OK sur mobile réel + desktop
[ ] C3  Theme Editor pleinement fonctionnel sur toutes les sections touchées
[ ] C4  git diff baseline..HEAD relu ligne par ligne — zéro changement non intentionnel
[ ] C5  Aucun secret, token, clé d'API ou mot de passe dans le dépôt ou le thème
[ ] C6  config/settings_data.json non écrasé ; réglages marchands intacts
[ ] C7  Aucune nouvelle erreur JS en console par rapport à la baseline
[ ] C8  Thème de sauvegarde daté existant et vérifié sur le store
```

### Conditions STANDARD (à documenter si non remplies)

```
[ ]  9  Mesures after complètes : 3 templates × 3 runs, conditions identiques
[ ] 10  Toutes les images ont width et height
[ ] 11  Aucune image au-dessus de la ligne de flottaison en loading="lazy"
[ ] 12  ≤ 2 resource hints par template
[ ] 13  Aucun script bloquant ajouté
[ ] 14  Contraste et navigation clavier non dégradés
[ ] 15  Balises SEO inchangées (title, meta description, canonical, données structurées)
[ ] 16  Chaque commit atomique et message explicite
[ ] 17  Rapport avant/après rédigé, méthodologie explicite
[ ] 18  Plan de rollback écrit et testé
```

### Prompt Claude Code pour instruire le Gate

```
Exécute le Quality Gate de 07-testing-and-qa.md sur le thème courant.

Pour chaque condition automatisable (C1, C4, C5, C6, 10, 11, 12, 13, 15, 16) :
- vérifie-la réellement (commande ou lecture de code), ne suppose rien
- réponds PASS / FAIL / NON VÉRIFIABLE AUTOMATIQUEMENT
- pour chaque FAIL : fichier:ligne + correction proposée

Pour les conditions manuelles (C2, C3, C7, 9, 14, 17, 18), produis-moi la liste
exacte de ce que je dois tester à la main.

Si une condition CRITIQUE est en FAIL, écris en tête de ta réponse :
**STOP DELIVERY** et n'aborde pas le reste.
```

---

## C. Plan de rollback

Écrit **avant** la publication, pas après l'incident.

```markdown
## Rollback — {{client}} — {{date}}

Thème actuellement publié avant intervention : "{{nom}}" (ID {{id}})
Sauvegarde datée : "BACKUP — {{date}} — avant optimisation" (ID {{id}})
Thème optimisé : "{{nom}} — optimisé {{date}}" (ID {{id}})
Tag Git de référence : baseline    Commit livré : {{sha}}

### Retour arrière complet (< 2 minutes)
1. Admin → Online Store → Themes
2. Sur "BACKUP — {{date}}" → Actions → Publish
3. Vérifier la home et une page produit
4. Prévenir le client + noter l'heure

### Retour arrière partiel (un seul correctif)
git revert {{sha_du_commit}}
shopify theme push --theme {{id_dev}} --ignore config/settings_data.json
→ vérifier sur le lien de preview, puis republier

### Contact d'urgence
{{ton nom}} — {{téléphone}} — disponible {{créneaux}}
```

Ce document se trouve **dans le rapport de livraison**, pas dans un e-mail perdu. C'est un des éléments qui distingue le plus nettement un professionnel d'un prestataire de plateforme.

---

## D. Après publication

| Moment | Action |
|---|---|
| H+0 | Publier à une heure creuse. Vérifier home, collection, produit, panier, checkout |
| H+1 | Consulter les commandes : le flux continue-t-il normalement ? |
| J+1 | Contrôler la console et les remontées client |
| J+2 | Message au client : « tout se comporte normalement de votre côté ? » |
| J+7 | Premier relevé du Web Performance Dashboard (encore partiel) |
| J+30 | Relevé complet du P75 → matière au rapport de suivi → **ouverture de l'upsell retainer** |

Le point J+30 est à la fois honnête (le RUM a besoin de sa fenêtre) et commercialement excellent : tu recontactes le client avec une bonne nouvelle chiffrée au moment exact où il a oublié la facture.
