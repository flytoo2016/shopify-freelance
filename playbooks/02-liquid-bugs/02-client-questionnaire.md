# 02 — Client Bug Report Form

Envoyé dès le premier échange. Court volontairement : un formulaire de 35 questions face à un client en panique ne sera pas rempli.

---

## Formulaire client (à envoyer tel quel)

```
RAPPORT DE PROBLÈME — {{Boutique}}

1. Sur quelle page le problème se produit-il ? (collez l'adresse complète)

2. Que faites-vous exactement, étape par étape, pour le voir apparaître ?
   Exemple : "j'ouvre la page produit → je choisis la taille M → je clique sur
   Ajouter au panier → rien ne se passe"

3. Que se passe-t-il ? Et que devrait-il se passer ?

4. Sur quel appareil et quel navigateur ?
   (iPhone/Android/Mac/PC — Chrome/Safari/Firefox — si vous savez, la version)

5. Est-ce que ça arrive à chaque fois, ou seulement parfois ?

6. Est-ce que ça arrive aussi sur un autre produit / une autre page ?

7. Depuis quand ?

8. Qu'est-ce qui a changé sur votre boutique juste avant ?
   (application installée ou supprimée, mise à jour du thème, modification dans
   l'éditeur de code, intervention d'un développeur, changement de réglages)

9. Une capture d'écran ou une courte vidéo. Sur téléphone : enregistrement
   d'écran. C'est ce qui m'aide le plus.

10. Vos clients vous l'ont-ils signalé, ou l'avez-vous découvert vous-même ?

11. Y a-t-il autre chose qui ne fonctionne pas, même sans lien apparent ?

12. Avez-vous une sauvegarde de votre thème ? Un thème de développement ?

13. Quelqu'un a-t-il déjà essayé de corriger ce problème ?
```

---

## Le champ le plus important

**La question 8.** Dans une majorité de cas, la cause y figure déjà. Un client qui répond « on a installé une app d'avis mardi » vient de t'économiser deux heures.

Si le client répond « rien n'a changé », ne le crois pas — pas par méfiance, mais parce qu'il ne sait pas ce qui compte. Relance précisément :

> Même de petites choses comptent. Est-ce que quelqu'un a :
> - installé, mis à jour ou désinstallé une application ?
> - accepté une mise à jour de thème proposée par Shopify ?
> - modifié quelque chose dans Boutique en ligne → Thèmes → Modifier le code ?
> - collé un code de suivi (Meta, TikTok, Google) quelque part ?
> - changé un réglage dans le personnalisateur de thème ?
>
> Shopify garde une trace : dans votre admin, **Paramètres → Utilisateurs** puis le journal d'activité, vous verrez qui a fait quoi et quand.

---

## Ce que tu collectes toi-même, sans le demander

| Élément | Où | Pourquoi |
|---|---|---|
| Nom et version du thème | `config/settings_schema.json` | Bug connu de cette version ? |
| Liste des applications | Admin → Apps | Suspects |
| Date de dernière modification du thème | Admin → Thèmes | Corrèle avec « depuis quand » |
| Journal d'activité du personnel | Paramètres → Utilisateurs | Qui a fait quoi |
| Console navigateur | DevTools | Erreurs JS |
| HTML rendu de la zone en cause | DevTools → Elements | Ce que Liquid a produit |
| Requêtes réseau en échec | DevTools → Network | Appels AJAX |

---

## Demande d'accès (Phase 2)

Même principe qu'en Phase 1 — Theme Access App en priorité — avec une différence importante :

> Pour diagnostiquer, j'ai besoin de deux choses :
>
> 1. **L'accès aux fichiers du thème** — installez l'application gratuite **Theme Access**, créez un mot de passe pour {{ton email}}. Cela ne donne accès à rien d'autre : ni commandes, ni clients, ni finances.
>
> 2. **La visibilité sur vos applications** — le problème vient souvent d'une interaction entre le thème et une application. Un compte collaborateur limité à `Thèmes` et `Applications` me permet de le vérifier. Sans cela, je travaille en aveugle sur la moitié des causes possibles.
>
> Première action de ma part : je duplique votre thème actuel pour créer une sauvegarde datée. Je travaille ensuite sur cette copie. Votre boutique en ligne n'est modifiée qu'après votre accord écrit.

La justification du point 2 est réelle et vaut la peine d'être expliquée : sans la liste des applications, tu ne peux pas faire d'isolation correcte.

---

## Grille de lecture

| Réponse | Ce que tu en déduis |
|---|---|
| Q5 « seulement parfois » | Bug d'état ou de timing : cache, race condition JS, ou dépendant du panier |
| Q6 « seulement sur ce produit » | Problème de **donnée**, pas de code : variante, metafield, image manquante |
| Q6 « partout » | Problème de code ou de layout |
| Q4 « seulement sur iPhone » | Safari — reproduire sur appareil réel, l'émulateur ne suffira pas |
| Q7 + Q8 concordants | Cause quasi trouvée. Vérifie et confirme |
| Q11 « oui, autre chose aussi » | Cause commune probable. Ne corrige pas les deux séparément avant d'avoir cherché la racine unique |
| Q13 « oui, quelqu'un a essayé » | ⚠️ Il y a du code de correction raté dans le thème. Prévois du temps |
| Q12 « aucune sauvegarde » | Tu en crées une avant tout. Et tu as ton upsell prévention |
