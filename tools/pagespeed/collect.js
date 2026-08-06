/**
 * collect.js — Collecte des mesures brutes pour une URL.
 *
 * Deux sources, trois fichiers, jamais fusionnes :
 *   PSI  (laboratoire) → …-psi-mobile.json, …-psi-desktop.json
 *   CrUX (terrain)     → …-crux.json
 *
 * Les reponses sont ecrites BRUTES, telles que retournees par les API.
 * Rien n'est filtre ici : le brut est la piece justificative si un chiffre
 * est conteste par un client. Le tri se fait dans normalize.js.
 *
 * Usage : node collect.js <url>
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import dotenv from 'dotenv';

// Le .env et snapshots/ sont resolus depuis l'emplacement du script, pas depuis
// le cwd : le script reste appelable depuis n'importe quel dossier.
const ROOT = import.meta.dirname;
const SNAPSHOTS_DIR = join(ROOT, 'snapshots');

dotenv.config({ path: join(ROOT, '.env'), quiet: true });

const API_KEY = process.env.PAGESPEED_API_KEY;

if (!API_KEY) {
  console.error(
    'PAGESPEED_API_KEY manquante. Copie .env.example en .env et renseigne ta cle.'
  );
  process.exit(1);
}

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const CRUX_ENDPOINT = 'https://chromeuxreport.googleapis.com/v1/records:queryRecord';
const PSI_TIMEOUT_MS = 30_000;
const CRUX_TIMEOUT_MS = 15_000;
const MAX_ATTEMPTS = 5;

/**
 * Transforme une URL en fragment de nom de fichier lisible et sans surprise.
 * Retire le protocole, remplace tout ce qui n'est pas alphanumerique par un
 * tiret, plafonne a 40 caracteres.
 */
function slugify(url) {
  return url
    .replace(/^[a-z]+:\/\//i, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 40)
    .replace(/-+$/, '');
}

/** Horodatage local YYYYMMDD-HHMMSS. */
function timestamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}` +
    `-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`
  );
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Backoff exponentiel : 1s, 2s, 4s, 8s. Partage par PSI et CrUX. */
const backoffDelay = (attempt) => 1000 * 2 ** (attempt - 1);

/**
 * Appelle PSI et retourne le JSON brut, non filtre.
 *
 * 429 : backoff exponentiel (1s, 2s, 4s, 8s) entre les tentatives.
 * 400 : URL invalide, echec immediat, inutile de reessayer.
 * >30s : abandon.
 */
async function fetchPSI(url, strategy) {
  const endpoint = new URL(PSI_ENDPOINT);
  endpoint.searchParams.set('url', url);
  endpoint.searchParams.set('strategy', strategy);
  // append, pas set : PSI attend le parametre category repete. Sans ces
  // lignes, la reponse ne contient que la categorie performance.
  endpoint.searchParams.append('category', 'performance');
  endpoint.searchParams.append('category', 'accessibility');
  endpoint.searchParams.append('category', 'best-practices');
  endpoint.searchParams.append('category', 'seo');
  endpoint.searchParams.set('key', API_KEY);

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), PSI_TIMEOUT_MS);

    let response;
    try {
      response = await fetch(endpoint, { signal: controller.signal });
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(
          `Timeout PSI apres ${PSI_TIMEOUT_MS / 1000}s (${strategy}) : ${url}`
        );
      }
      throw new Error(`Erreur reseau PSI (${strategy}) : ${error.message}`);
    } finally {
      clearTimeout(timer);
    }

    if (response.ok) {
      return await response.json();
    }

    if (response.status === 400) {
      throw new Error(`URL invalide : ${url}`);
    }

    if (response.status === 429) {
      if (attempt === MAX_ATTEMPTS) {
        throw new Error(
          `Quota PSI depassee (429) apres ${MAX_ATTEMPTS} tentatives (${strategy}) : ${url}\n` +
            'Quota PSI : 25 000 requetes/jour. Reessaie plus tard.'
        );
      }
      const delay = backoffDelay(attempt);
      console.error(
        `429 recu (${strategy}), tentative ${attempt}/${MAX_ATTEMPTS} — nouvelle tentative dans ${delay / 1000}s`
      );
      await sleep(delay);
      continue;
    }

    // La cle API invalide remonte en 403, le quota projet aussi : on affiche le
    // corps de la reponse, c'est la seule chose qui permet de trancher.
    const body = await response.text();
    throw new Error(
      `Erreur PSI ${response.status} ${response.statusText} (${strategy}) : ${url}\n${body.slice(0, 500)}`
    );
  }

  // Inatteignable : la boucle sort par return ou par throw.
  throw new Error('Etat inattendu dans fetchPSI');
}

/**
 * Appelle CrUX (donnees terrain) et retourne le JSON brut, non filtre.
 *
 * 404 : l'URL n'a pas assez de trafic reel sur 28 jours. C'est le cas NORMAL
 *       sur un petit store, pas une panne. Retourne { available: false } et
 *       laisse la collecte continuer.
 * 429 : meme backoff exponentiel que PSI (quota CrUX : 1 500 requetes/jour).
 * >15s : abandon.
 */
async function fetchCrUX(url) {
  const endpoint = new URL(CRUX_ENDPOINT);
  endpoint.searchParams.set('key', API_KEY);

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    // AbortController distinct de celui de PSI : timeout plus court, et un
    // controller n'est utilisable qu'une fois.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CRUX_TIMEOUT_MS);

    let response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, formFactor: 'PHONE' }),
        signal: controller.signal,
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`Timeout CrUX apres ${CRUX_TIMEOUT_MS / 1000}s : ${url}`);
      }
      throw new Error(`Erreur reseau CrUX : ${error.message}`);
    } finally {
      clearTimeout(timer);
    }

    // Le 404 est intercepte AVANT toute tentative de lecture du corps : sur
    // une absence de donnees, il n'y a pas de record a parser.
    if (response.status === 404) {
      return { available: false };
    }

    if (response.ok) {
      return await response.json();
    }

    if (response.status === 429) {
      if (attempt === MAX_ATTEMPTS) {
        throw new Error(
          `Quota CrUX depasse (429) apres ${MAX_ATTEMPTS} tentatives : ${url}\n` +
            'Quota CrUX : 1 500 requetes/jour. Reessaie plus tard.'
        );
      }
      const delay = backoffDelay(attempt);
      console.error(
        `429 recu (CrUX), tentative ${attempt}/${MAX_ATTEMPTS} — nouvelle tentative dans ${delay / 1000}s`
      );
      await sleep(delay);
      continue;
    }

    const body = await response.text();
    throw new Error(
      `Erreur CrUX ${response.status} ${response.statusText} : ${url}\n${body.slice(0, 500)}`
    );
  }

  // Inatteignable : la boucle sort par return ou par throw.
  throw new Error('Etat inattendu dans fetchCrUX');
}

/**
 * Ecrit un JSON dans snapshots/ et retourne le chemin du fichier.
 * Le dossier est cree si absent : il est gitignore, donc absent apres un clone.
 */
function saveSnapshot(data, url, prefix) {
  mkdirSync(SNAPSHOTS_DIR, { recursive: true });
  const filename = `${timestamp()}-${slugify(url)}-${prefix}.json`;
  const filepath = join(SNAPSHOTS_DIR, filename);
  writeFileSync(filepath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  return filepath;
}

async function main() {
  const url = process.argv[2];

  if (!url) {
    console.error('Usage: node collect.js <url>');
    process.exit(1);
  }

  console.log(`Collecte PSI (laboratoire) : ${url}`);

  console.log('  mobile…');
  const mobile = await fetchPSI(url, 'mobile');
  const mobilePath = saveSnapshot(mobile, url, 'psi-mobile');

  console.log('  desktop…');
  const desktop = await fetchPSI(url, 'desktop');
  const desktopPath = saveSnapshot(desktop, url, 'psi-desktop');

  // Source 2, terrain. Fichier separe : jamais fusionne avec le laboratoire.
  console.log('Collecte CrUX (terrain) : PHONE…');
  const crux = await fetchCrUX(url);
  const cruxAvailable = crux.available !== false;

  // Le fichier CrUX est TOUJOURS ecrit, y compris quand il n'y a pas de
  // donnees : l'absence de donnees terrain est elle-meme une information
  // datee, qui doit figurer dans le dossier de mesure.
  const cruxPath = saveSnapshot(
    cruxAvailable
      ? crux
      : { available: false, url, collectedAt: new Date().toISOString() },
    url,
    'crux'
  );

  console.log('\nSnapshots bruts ecrits :');
  console.log(`  ${mobilePath}`);
  console.log(`  ${desktopPath}`);
  console.log(`  ${cruxPath}${cruxAvailable ? '' : ' (trafic insuffisant)'}`);
}

main().catch((error) => {
  console.error(`\nEchec : ${error.message}`);
  process.exit(1);
});
