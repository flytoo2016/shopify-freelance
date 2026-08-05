# tech-stack.md

Versions des outils du poste de travail. **Aucune version n'est supposée** : chaque ligne a été relevée par la commande indiquée. Une version non relevée est marquée « à mesurer ».

**Relevé initial :** étape 1 de la construction du système.
**Revérifié le :** 2026-08-05, sur `D:\shopify-freelance`. Les cinq valeurs sont inchangées.

---

## 1. Versions relevées

| Outil | Version relevée | Commande |
|---|---|---|
| Node.js | `v22.14.0` | `node -v` |
| npm | `11.7.0` | `npm -v` |
| Git | `2.49.0.windows.1` | `git --version` |
| `@shopify/cli` | `4.6.0` | `npm ls -g --depth=0` |
| `@shopify/theme` | `3.58.2` — **déprécié** | `npm ls -g --depth=0` |

`@shopify/cli 4.6.0` correspond au `dist-tags.latest` du registre npm au moment du relevé. Le CLI est donc à jour, pas en retard d'une version.

Shopify CLI 4.0 requiert **Node 22.12 ou supérieur**. `v22.14.0` satisfait cette contrainte.

---

## 2. Le cas `@shopify/theme`

`@shopify/theme@3.58.2` est installé globalement, et **déprécié**. Message du registre npm :

> This package is deprecated. As of Shopify CLI version 3.59.0, it is bundled with @shopify/cli. Please use that package instead.

Autrement dit : depuis le CLI 3.59.0, les commandes de thème sont intégrées à `@shopify/cli`. Le paquet séparé n'a plus de raison d'être. Sa dernière version publiée reste `3.58.2` — il n'est plus mis à jour.

**Ce paquet est inerte sur ce poste.** Relevé à l'étape 1 : le shim d'exécution pointe en dur vers `@shopify/cli`, de sorte que `@shopify/theme` n'est jamais résolu, malgré sa présence dans les paquets globaux. Il n'y a donc **pas de conflit de binaires** : les commandes `shopify theme …` passent par `@shopify/cli 4.6.0`.

Le binaire réellement résolu sur ce poste est `C:\Users\kahou\AppData\Roaming\npm\shopify.ps1`, relevé par `Get-Command shopify`.

**Décision : ne pas désinstaller.** Le paquet ne nuit pas, la désinstallation est une modification d'environnement sans bénéfice mesuré. Si un doute apparaît un jour sur le binaire résolu, la vérification est au §3, et elle précède toute conclusion.

---

## 3. Commandes pour revérifier

À exécuter dans PowerShell. Aucune ne modifie l'environnement.

```powershell
node -v
npm -v
git --version
npm ls -g --depth=0            # liste les paquets npm globaux
```

**Quel binaire est réellement appelé** — la seule façon de conclure à un conflit, ou de l'écarter :

```powershell
Get-Command shopify | Format-List *
```

Ne jamais conclure à un conflit d'outils sans avoir relevé le binaire effectivement résolu. Sur Windows, la présence de deux paquets dans `npm ls -g` ne prouve rien sur ce qui s'exécute.

**Version publiée côté registre** — pour savoir si le CLI est en retard :

```powershell
npm view @shopify/cli dist-tags     # comparer "latest" à la version installée
npm view @shopify/theme deprecated  # affiche le message de dépréciation
```

**Mise à jour du CLI**, si `latest` diverge de la version installée :

```powershell
npm install -g @shopify/cli
shopify version
```

---

## 4. Non relevé

Ces éléments font partie du poste de travail mais n'ont pas été mesurés à l'étape 1. Ils sont à relever avant d'en affirmer quoi que ce soit.

| Élément | Statut | Commande |
|---|---|---|
| Chrome (Lighthouse, DevTools) | à mesurer | — |
| VS Code | à mesurer | `code --version` |
| Extension VS Code *Shopify Liquid* | à mesurer | `code --list-extensions --show-versions` |
| `@shopify/dev-mcp` | à mesurer | résolu par `npx -y @shopify/dev-mcp@latest` |
| Sortie de `shopify version` | à mesurer | `shopify version` |

---

## 5. Tenue de ce fichier

Toute mise à jour de version se fait **en exécutant les commandes du §3 et en recopiant leur sortie**, jamais de mémoire. On met à jour la date de revérification en tête de fichier dans le même geste.
