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
 *         node collect.js --config <performance-urls.json>
 *         node collect.js <url> --runs 3
 *
 * Le mode --config collecte plusieurs pages en une commande. Les appels
 * restent SEQUENTIELS : les quotas PSI (25 000/jour) et CrUX (1 500/jour) sont
 * partages par toutes les missions, le parallelisme ne ferait qu'y foncer.
 *
 * --runs N repete la mesure PSI N fois par strategie et ecrit EN PLUS un
 * fichier median. Un score PSI varie de plusieurs dizaines de points d'un run
 * a l'autre sur une meme page : une baseline sur un seul run n'est pas une
 * mesure, c'est un tirage. Les N bruts restent ecrits individuellement, ce sont
 * eux les pieces justificatives.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, isAbsolute, join, resolve } from 'node:path';
import dotenv from 'dotenv';
import { normalizeRaw } from './normalize.js';

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

// Plafond volontaire. Au-dela, le gain de fiabilite devient marginal alors que
// la consommation de quota, elle, reste lineaire.
const MAX_RUNS = 5;

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

function fail(message) {
  console.error(message);
  process.exit(1);
}

/** Resout le chemin depuis le cwd, puis a defaut depuis le dossier du script. */
function resolveInput(inputPath) {
  const fromCwd = isAbsolute(inputPath) ? inputPath : resolve(process.cwd(), inputPath);
  if (existsSync(fromCwd)) return fromCwd;

  const fromRoot = join(ROOT, inputPath);
  if (existsSync(fromRoot)) return fromRoot;

  return null;
}

/**
 * Separe les arguments positionnels des options --config et --runs.
 * Parsing manuel : aucune dependance ajoutee pour deux options.
 */
function parseArgs(argv) {
  const positional = [];
  const options = { config: null, runs: null };
  const keys = { '--config': 'config', '--runs': 'runs' };

  for (let i = 0; i < argv.length; i += 1) {
    const key = keys[argv[i]];

    if (!key) {
      positional.push(argv[i]);
      continue;
    }

    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      fail(`Option ${argv[i]} utilisee sans valeur.`);
    }
    options[key] = value;
    i += 1;
  }

  return { positional, ...options };
}

/** Valide --runs. Absent → 1, soit le comportement historique. */
function parseRuns(value) {
  if (value === null) return 1;

  const runs = Number(value);

  if (!Number.isInteger(runs) || runs < 1 || runs > MAX_RUNS) {
    fail(
      `--runs attend un entier entre 1 et ${MAX_RUNS} (recu : ${value}).\n` +
        'Quota PSI : 25 000 requetes/jour.'
    );
  }

  return runs;
}

/**
 * Lit le fichier de configuration multi-URL et retourne [{ label, url }, …].
 *
 * La validation est stricte et prealable a tout appel reseau : un config
 * a moitie valide consommerait du quota avant d'echouer sur la 3e entree.
 */
function loadConfig(configArg) {
  const configPath = resolveInput(configArg);

  if (!configPath) {
    fail(
      `Fichier de configuration introuvable : ${configArg}\n` +
        'Copie performance-urls.json.example en performance-urls.json.'
    );
  }

  let parsed;
  try {
    parsed = JSON.parse(readFileSync(configPath, 'utf8'));
  } catch (error) {
    fail(`JSON invalide dans ${configArg} : ${error.message}`);
  }

  const entries = parsed?.urls;

  if (!Array.isArray(entries) || entries.length === 0) {
    fail(
      `Configuration invalide : ${configArg}\n` +
        'Attendu un objet { "urls": [ { "label": "...", "url": "..." }, … ] } ' +
        'avec au moins une entree.'
    );
  }

  const isText = (value) => typeof value === 'string' && value.trim() !== '';

  entries.forEach((entry, index) => {
    if (!isText(entry?.label) || !isText(entry?.url)) {
      fail(
        `Configuration invalide : ${configArg}\n` +
          `Entree ${index + 1} : "label" et "url" sont obligatoires et doivent ` +
          'etre des chaines non vides.'
      );
    }
  });

  return entries.map((entry) => ({
    label: entry.label.trim(),
    url: entry.url.trim(),
  }));
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
 *
 * Quand un label est fourni (mode --config), il remplace le slug de l'URL :
 * "homepage" est plus lisible dans un dossier de mission que le slug complet
 * de l'URL. Il passe par slugify() malgre tout, sans quoi un label contenant
 * "/" ecrirait hors de snapshots/.
 */
function saveSnapshot(data, url, prefix, label = null) {
  mkdirSync(SNAPSHOTS_DIR, { recursive: true });
  const name = label ? slugify(label) : slugify(url);
  const filename = `${timestamp()}-${name}-${prefix}.json`;
  const filepath = join(SNAPSHOTS_DIR, filename);
  writeFileSync(filepath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  return filepath;
}

// --- Mediane --------------------------------------------------------------

const isNum = (value) => typeof value === 'number' && Number.isFinite(value);

/** Entier le plus proche. Arrondi par defaut de la mediane. */
const roundInt = (value) => Math.round(value);

/**
 * 4 decimales, comme toCls() dans normalize.js. Math.round() ecraserait a 0
 * un CLS median de 0,05 et ferait ecrire "CLS : 0" dans un rapport client.
 */
const roundCls = (value) => parseFloat(value.toFixed(4));

/**
 * Mediane d'un tableau de valeurs mesurees.
 *
 * Les null sont exclus : une metrique absente d'un run ne doit pas tirer la
 * mediane vers le bas. Tout-null ou tableau vide → null, jamais 0.
 * N impair → valeur centrale, telle que mesuree. N pair → moyenne des deux
 * centrales, arrondie par `refine` selon la nature du champ.
 */
function median(values, refine = roundInt) {
  const numbers = values.filter(isNum).sort((a, b) => a - b);

  if (numbers.length === 0) return null;

  const mid = Math.floor(numbers.length / 2);

  if (numbers.length % 2 === 1) return numbers[mid];

  return refine((numbers[mid - 1] + numbers[mid]) / 2);
}

/**
 * N snapshots normalises d'une meme strategie → un snapshot median.
 *
 * Chaque champ est median independamment : c'est une synthese statistique,
 * pas le run "le plus representatif". meta est repris du premier run et
 * sourceFiles liste les bruts, pour que chaque chiffre reste remontable.
 */
function buildMedian(snapshots, sourceFiles) {
  const first = snapshots[0];
  const at = (group, field, refine) =>
    median(snapshots.map((s) => s?.[group]?.[field] ?? null), refine);

  return {
    meta: {
      url: first?.meta?.url ?? null,
      slug: first?.meta?.slug ?? null,
      strategy: first?.meta?.strategy ?? null,
      collectedAt: first?.meta?.collectedAt ?? null,
      lighthouseVersion: first?.meta?.lighthouseVersion ?? null,
      source: 'psi-median',
      runs: snapshots.length,
      sourceFiles,
    },
    scores: {
      performance: at('scores', 'performance'),
      accessibility: at('scores', 'accessibility'),
      best_practices: at('scores', 'best_practices'),
      seo: at('scores', 'seo'),
    },
    vitals: {
      lcp_ms: at('vitals', 'lcp_ms'),
      tbt_ms: at('vitals', 'tbt_ms'),
      cls: at('vitals', 'cls', roundCls),
      fcp_ms: at('vitals', 'fcp_ms'),
      tti_ms: at('vitals', 'tti_ms'),
    },
    assets: {
      total_bytes: at('assets', 'total_bytes'),
      requests: at('assets', 'requests'),
    },
  };
}

/** Tableau des scores bruts, puis la mediane. "—" pour une valeur non mesuree. */
function printRuns(strategy, snapshots, medianSnapshot) {
  const show = (value) => (isNum(value) ? value : '—');

  snapshots.forEach((snapshot, index) => {
    console.log(
      `  ${strategy} run ${index + 1}/${snapshots.length} : performance ` +
        `${show(snapshot?.scores?.performance)}`
    );
  });

  console.log(
    `  mediane ${strategy} : performance ${show(medianSnapshot?.scores?.performance)}`
  );
}

/**
 * Collecte complete d'une URL : PSI mobile, PSI desktop, CrUX.
 *
 * N'interrompt jamais le processus : retourne { ok: false, error } pour que le
 * mode multi-URL puisse continuer avec les pages suivantes. C'est l'appelant
 * qui decide du sort d'un echec.
 */
async function collectOne({ url, label = null, runs = 1 }) {
  const suffix = label ? ` [${label}]` : '';
  // Le slug suit le nom de fichier : label en mode --config, URL demandee
  // sinon. Voir normalize.js, meme regle.
  const slugSource = label ?? url;

  try {
    console.log(`Collecte PSI (laboratoire) : ${url}${suffix}`);

    const rawPaths = [];
    const medianPaths = [];

    for (const strategy of ['mobile', 'desktop']) {
      const snapshots = [];
      const sourceFiles = [];

      for (let run = 1; run <= runs; run += 1) {
        console.log(runs > 1 ? `  ${strategy} ${run}/${runs}…` : `  ${strategy}…`);

        const raw = await fetchPSI(url, strategy);

        // Le numero de run entre dans le nom des que la mesure est repetee :
        // timestamp() ne descend pas sous la seconde, et deux reponses PSI
        // peuvent arriver dans la meme seconde quand la seconde est servie
        // depuis le cache de Google. Sans ce suffixe, le run suivant ecrase le
        // precedent — un brut ecrase est une piece justificative perdue.
        const prefix = runs > 1 ? `psi-${strategy}-run${run}` : `psi-${strategy}`;
        const rawPath = saveSnapshot(raw, url, prefix, label);

        rawPaths.push(rawPath);
        sourceFiles.push(basename(rawPath));
        snapshots.push(normalizeRaw(raw, slugSource));
      }

      // A un seul run il n'y a pas de mediane a calculer : le brut suffit, et
      // normalize.js reste le chemin normal. Comportement historique intact.
      if (runs > 1) {
        const medianSnapshot = buildMedian(snapshots, sourceFiles);
        printRuns(strategy, snapshots, medianSnapshot);
        medianPaths.push(
          saveSnapshot(medianSnapshot, url, `psi-${strategy}-median`, label)
        );
      }
    }

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
      'crux',
      label
    );

    console.log('\nSnapshots bruts ecrits :');
    for (const rawPath of rawPaths) {
      console.log(`  ${rawPath}`);
    }
    console.log(`  ${cruxPath}${cruxAvailable ? '' : ' (trafic insuffisant)'}`);

    if (medianPaths.length > 0) {
      console.log('\nSnapshots medians ecrits :');
      for (const medianPath of medianPaths) {
        console.log(`  ${medianPath}`);
      }
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

/** Mode --config : boucle sequentielle, un echec n'arrete pas les suivantes. */
async function collectFromConfig(configArg, runs) {
  const targets = loadConfig(configArg);
  const failures = [];

  for (const target of targets) {
    const result = await collectOne({ ...target, runs });

    if (!result.ok) {
      failures.push(target);
      console.error(`\nEchec [${target.label}] : ${result.error.message}`);
    }

    console.log('');
  }

  const total = targets.length;
  const done = total - failures.length;
  const plural = failures.length > 1 ? 's' : '';

  console.log(
    failures.length === 0
      ? `${done}/${total} URLs collectees`
      : `${done}/${total} URLs collectees (${failures.length} erreur${plural})`
  );

  if (failures.length > 0) {
    console.error(`Non collectees : ${failures.map((t) => t.label).join(', ')}`);
    process.exitCode = 1;
  }
}

async function main() {
  const { positional, config, runs: runsArg } = parseArgs(process.argv.slice(2));
  const runs = parseRuns(runsArg);

  if (config) {
    await collectFromConfig(config, runs);
    return;
  }

  const url = positional[0];

  if (!url) {
    console.error(
      'Usage: node collect.js <url>\n' +
        '       node collect.js --config <performance-urls.json>\n' +
        `       node collect.js <url> --runs <1-${MAX_RUNS}>`
    );
    process.exit(1);
  }

  const result = await collectOne({ url, runs });

  // Mode URL unique : l'echec reste fatal, comme avant.
  if (!result.ok) {
    throw result.error;
  }
}

main().catch((error) => {
  console.error(`\nEchec : ${error.message}`);
  process.exit(1);
});
