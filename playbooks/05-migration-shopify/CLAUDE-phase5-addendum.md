# CLAUDE.md — Addendum Phase 5 (Migration)

> À ajouter au `CLAUDE.md` de la Phase 1, qui reste intégralement en vigueur.

---

## CONTEXTE

Une migration est l'opération la plus risquée du métier. Ce qui est en jeu n'est pas une page ou un composant : c'est le chiffre d'affaires entier d'une entreprise, son référencement accumulé sur des années, et son historique client. Après la bascule DNS, le retour arrière est coûteux et parfois partiel.

---

## RÈGLE FONDAMENTALE

**Une migration se pilote au comptage, pas à l'impression.**

« Ça a l'air d'être passé » n'est pas une validation. Chaque étape produit un nombre, et ce nombre se compare au précédent. Un écart inexpliqué bloque l'avancement, quelle que soit sa taille apparente.

---

## LES DIX RÈGLES DE LA MIGRATION

1. **Aucun chiffre inventé.** Si un comptage n'est pas dans le contexte fourni, écris `{{À COMPTER}}`. Une validation fondée sur des chiffres supposés est pire qu'une absence de validation : elle donne une fausse assurance.

2. **Ne jamais modifier les exports bruts.** Ils sont la seule source de vérité en cas de litige. Toute transformation se fait sur des copies, dans un dossier distinct.

3. **Chaque écart s'explique.** 3 produits manquants sur 280 ne sont pas « négligeables » : ce sont les cas limites, et ils se reproduiront à grande échelle.

4. **Les redirections avant la bascule.** Construites depuis un crawl exhaustif, importées et testées sur le store de test.

5. **Ne jamais promettre le maintien des positions SEO.** Personne ne le contrôle. La promesse porte sur la méthode : redirections exhaustives, métadonnées migrées, validation testée.

6. **Ne jamais promettre la migration des mots de passe clients.** C'est **techniquement impossible** — ils sont hachés à la source. Les clients devront réinitialiser. Le dire dès la discovery.

7. **Importer par lots.** Jamais tout d'un coup. 20, puis 100, puis le reste, avec validation entre chaque.

8. **Vérifier les préfixes réservés en discovery.** Shopify n'accepte pas de redirection dont l'origine commence par `/products`, `/collections`, `/collections/all`, `/cart`, `/carts`, `/orders`, `/apps`, `/application`, `/shop` ou `/services`. Si la boutique source utilise ces chemins, une partie du plan de redirections est structurellement impossible — et cela doit être connu avant le devis.

9. **Une redirection ne se déclenche que sur une 404.** Elle ne peut pas prendre le pas sur une page existante. C'est la cause de la moitié des « ma redirection ne marche pas ».

10. **Jamais de migration et de refonte de design simultanées.** En cas de baisse de trafic ou de conversion, il devient impossible d'attribuer la cause. Le dire au client et séparer les deux projets.

---

## INTERDITS SPÉCIFIQUES

- **Ne jamais lancer une commande d'import sans que je l'aie validée.** Un import est difficilement réversible.
- **Ne jamais modifier la boutique source.** Elle reste opérationnelle jusqu'à la bascule.
- **Ne jamais générer un fichier de redirections sans crawl exhaustif en entrée.** Un plan construit sur une liste partielle laisse des URL en 404.
- **Ne jamais produire un rapport de validation sans les comptages réels.**
- **Ne jamais recommander de basculer un vendredi**, ni avant une période de pic commercial.
- **Ne jamais affirmer qu'une donnée « devrait » avoir été migrée.** Elle l'a été ou non, et cela se compte.
- **Ne jamais supposer la structure d'export d'une plateforme source.** Demande le fichier réel.

---

## RAPPELS TECHNIQUES

| Point | Règle |
|---|---|
| Structure d'URL Shopify | `/products/`, `/collections/`, `/pages/`, `/blogs/` — imposée |
| Redirections | `Contenu → Menus → Redirections d'URL`, import CSV |
| Format CSV | Colonnes « Redirect from » / « Redirect to », **chemins relatifs** |
| Auto-formatage | Shopify ajoute les slashs initiaux manquants — source d'erreurs silencieuses |
| Type | 301 uniquement. Pas de wildcard, pas de regex |
| Lots d'import | 1 000 redirections maximum par lot, pour pouvoir isoler les erreurs |
| Longueur | Limite de 1 024 caractères par chaîne de redirection |
| Filtres de collection | Les URL avec filtrage par tag ne peuvent pas être redirigées |
| App Store Migration | Produits et clients. **Ni commandes, ni avis, ni menus** |
| Mots de passe clients | Non migrables. Réinitialisation obligatoire |

---

## FORMAT DE RÉPONSE ATTENDU

En phase de mapping :

```
ENTITÉ SOURCE       …
VOLUME              {{compté}} / {{À COMPTER}}
DESTINATION SHOPIFY …
TRANSFORMATION      …
PERTE ATTENDUE      …  ← toujours renseigné, même si « aucune »
VALIDATION          comment je vérifierai que c'est passé
```

En phase de validation :

```
| Entité | Source | Export | Transformé | Importé | Écart | Cause |
```

Toute ligne avec un écart non expliqué est signalée en tête de réponse comme **BLOCAGE**.

En phase de redirections :

```
URL SOURCE TOTALES        {{n}}
MAPPÉES AUTOMATIQUEMENT   {{n}}
NÉCESSITANT UNE DÉCISION  {{n}}  ← liste
IMPOSSIBLES (préfixe réservé) {{n}}  ← liste + alternative proposée
```

---

## TON DES DOCUMENTS CLIENT

- Le lecteur est un dirigeant qui a peur de perdre son entreprise. Sois précis et calme.
- Chaque promesse porte sur une **méthode vérifiable**, jamais sur un résultat de trafic.
- Toute perte de données annoncée à l'avance est acceptée ; découverte après coup, elle devient une faute.
- La section « ce qui ne sera pas migré, et pourquoi » se place **au début** du document de mapping, pas à la fin.

---

## EN CAS DE DOUTE

Tu t'arrêtes et tu demandes le comptage manquant. Sur une migration, une hypothèse non vérifiée ne produit aucune alerte : elle produit une découverte trois semaines après la bascule, quand la source a été résiliée.
