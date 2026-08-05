# 08 — Launch Checklist

Le jour de la bascule ne s'improvise pas. Cette checklist s'exécute dans l'ordre, cochée en temps réel, avec l'heure notée à chaque étape.

---

# PRÉ-LANCEMENT

## J-14

```
[ ] Validation des données passée, rapport remis
[ ] Période de test client démarrée (3 à 5 jours)
[ ] Registre des risques validé par le client
[ ] Plan de retour arrière écrit et validé
[ ] Fenêtre de bascule fixée et confirmée par écrit
[ ] Disponibilité confirmée sur les 48 h suivantes
[ ] Accès registrar vérifié — connexion testée par le client
[ ] Enregistrements DNS actuels documentés, MX inclus ⚠️
[ ] Ancien hébergement : maintien confirmé jusqu'à J+60 minimum
```

## J-7

```
[ ] Retours de la période de test traités
[ ] Gel des modifications sur la boutique source, annoncé
[ ] Search Console configurée sur le nouveau domaine
[ ] Toutes les redirections importées
[ ] Redirections testées : 20 URL prioritaires + échantillon de 50
[ ] Commande test réelle sur chaque zone de livraison
[ ] Transaction réelle testée sur chaque moyen de paiement, puis remboursée
[ ] E-mails transactionnels testés et lisibles
[ ] Intégrations reconnectées et testées
[ ] Thème vérifié sur appareil réel
[ ] Performance mesurée, référence enregistrée
[ ] E-mails clients rédigés (annonce + réinitialisation)
[ ] Équipe support du client briefée, réponses types prêtes
```

## J-1

```
[ ] Export delta : commandes et clients depuis l'export initial
[ ] E-mail d'annonce envoyé aux clients (mots de passe)
[ ] TTL des DNS abaissé (300 s) — au moins 24 h avant
[ ] Sauvegarde finale de la source, restauration testée
[ ] Sauvegarde du thème Shopify configuré
[ ] Dernière vérification du plan de retour arrière
[ ] Confirmation de la fenêtre avec le client
[ ] Coordonnées de tous les intervenants rassemblées
```

**Le TTL abaissé 24 h à l'avance** est ce qui rend un retour arrière rapide. Sans lui, une remise en place des DNS peut prendre des heures à se propager.

---

# LANCEMENT — JOUR J

Heure creuse. **Jamais un vendredi, jamais avant un pic saisonnier.**

## H-1

```
[ ] Import du delta (commandes et clients récents)
[ ] Contrôle final des données
[ ] Boutique source : bannière d'information affichée
[ ] Tous les intervenants joignables et confirmés
```

## H

```
[ ] Retrait du mot de passe de la boutique Shopify ⚠️
[ ] Domaine ajouté et vérifié dans Shopify
[ ] Bascule DNS effectuée — heure notée : ______
[ ] Enregistrements MX vérifiés APRÈS modification ⚠️
[ ] Propagation vérifiée depuis 3 régions
[ ] Certificat SSL actif
```

**Les deux lignes ⚠️ sont celles qui coûtent le plus cher quand elles sautent.** Une boutique restée protégée par mot de passe n'est pas indexable, et Google ne verra rien pendant des jours. Des MX écrasés coupent la messagerie de l'entreprise.

## H+15 min

```
[ ] Page d'accueil accessible
[ ] Page produit accessible
[ ] Page collection accessible
[ ] Ajout au panier fonctionnel
[ ] Commande test réelle passée sur la production
[ ] Commande visible dans l'admin
[ ] E-mail de confirmation reçu
[ ] Redirections : test des 20 URL prioritaires
[ ] Console navigateur sans erreur bloquante
```

## H+30 min

```
[ ] Sitemap soumis à la Search Console
[ ] E-mail de réinitialisation des mots de passe envoyé
[ ] Suivi analytique vérifié (GA4, pixels)
[ ] Test sur mobile réel
[ ] Client informé : la bascule est faite
```

---

# POST-LANCEMENT

## H+1 à H+4

```
[ ] Les commandes arrivent normalement
[ ] Volume comparé à un jour équivalent
[ ] Erreurs 404 dans les logs et la Search Console
[ ] Volume de demandes au support
[ ] Trafic en temps réel cohérent
```

## J+1

```
[ ] Chiffre d'affaires du premier jour comparé à la référence
[ ] Toutes les 404 relevées → redirections ajoutées
[ ] Retours du support traités
[ ] Taux de réinitialisation des mots de passe relevé
[ ] Vérification que les e-mails de l'entreprise fonctionnent ⚠️
[ ] Rapport J+1 envoyé au client
```

## J+3

```
[ ] Search Console : premières données d'indexation
[ ] Nouvelles 404 → redirections ajoutées
[ ] Contrôle du parcours d'achat
[ ] Performance mesurée
[ ] Rapport J+3
```

## J+7

```
[ ] Search Console : couverture, pages indexées, erreurs
[ ] Trafic organique comparé à la référence
[ ] Toutes les 404 traitées
[ ] Relance de réinitialisation aux clients inactifs
[ ] Rapport J+7
```

## J+14 — le creux commence

```
[ ] Relevé de trafic organique
[ ] Couverture Search Console
[ ] Rappel au client : cette baisse est attendue, calendrier de récupération
[ ] Nouvelles 404 traitées
```

## J+30

```
[ ] post-launch-report.md complet
[ ] Comparaison à la référence pré-migration
[ ] Toutes les redirections validées
[ ] Points restants listés
[ ] Recommandations pour la suite (→ upsells)
```

## J+60 et J+90

```
[ ] J+60 : relevé, ancien hébergement peut être résilié si tout est stable
[ ] J+90 : récupération attendue, bilan final, ouverture des prestations suivantes
```

**Ne recommande la résiliation de l'ancien hébergement qu'à J+60**, et uniquement après avoir vérifié qu'aucun média ne pointe encore vers lui.

---

# LES CINQ RÈGLES DU JOUR J

1. **Heure creuse.** Consulte les analytics du client pour la déterminer.
2. **Jamais un vendredi.** Ni la veille d'un jour férié, ni avant un pic saisonnier.
3. **Disponible 48 h.** Si tu ne peux pas l'être, décale la bascule.
4. **Le plan de retour arrière ouvert sur ton écran.** Pas dans un dossier.
5. **L'heure notée à chaque étape.** En cas d'incident, la chronologie est ce qui permet de comprendre.

---

# LE MESSAGE DE BASCULE

> Bonjour {{Prénom}},
>
> La bascule est faite à {{heure}}. Votre boutique Shopify est en ligne.
>
> **Vérifié dans les 30 dernières minutes :**
> - Le site est accessible, le certificat de sécurité est actif
> - Une commande test est passée, payée et confirmée
> - Vos 20 pages les plus visitées redirigent correctement
> - Le sitemap est soumis à Google
> - Vos e-mails d'entreprise fonctionnent
>
> **Ce que j'ai envoyé à vos clients :** l'e-mail de réinitialisation de mot de passe. Attendez-vous à des questions dans les prochains jours — vos réponses types sont dans le document joint.
>
> **Ce à quoi vous attendre.** Votre trafic depuis Google va probablement baisser entre la deuxième et la sixième semaine : Google doit recrawler et réindexer l'intégralité de votre site. C'est le déroulement normal, et la récupération intervient généralement vers le troisième mois. Je vous enverrai un relevé chaque semaine pour que vous suiviez ça sans avoir à vous en inquiéter.
>
> **Je surveille en continu pendant 48 h.** Vous pouvez me joindre au {{téléphone}} à tout moment. Prochain rapport demain.
>
> {{Nom}}
