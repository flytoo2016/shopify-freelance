/**
 * normalize.js — JSON PSI brut → snapshot normalise.
 *
 * Ne conserve que les champs reellement utilises dans les rapports clients.
 * Aucun champ n'est calcule, derive ou complete : ce qui est absent de la
 * reponse PSI ressort a null, jamais a zero et jamais estime.
 *
 * Usage : node normalize.js <chemin-vers-…-psi-mobile.json> [--url <url-originale>]
 *
 * --url : l'URL demandee a collect.js, AVANT redirection. Elle ne sert qu'a
 *         calculer meta.slug, pour qu'il corresponde au slug employe dans les
 *         noms de fichiers. Sans --url, le slug est derive de
 *         finalDisplayedUrl : comportement historique, inchange.
 *
 * Ecrit : <meme-nom, "-psi-" remplace par "-normalized-">.json
 *
 * Egalement importable : normalizeRaw(raw, urlArg) fait le meme travail en
 * memoire, sans toucher au disque. collect.js s'en sert pour la mediane.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, isAbsolute, join, resolve } from 'node:path';

const ROOT = import.meta.dirname;

/**
 * Identique a slugify() dans collect.js : les deux scripts doivent produire
 * le meme slug pour la meme URL, sinon les fichiers ne se raccordent plus.
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

/** Score Lighthouse (0-1) → entier 0-100. Absent → null. */
const toScore = (value) =>
  typeof value === 'number' ? Math.round(value * 100) : null;

/** Millisecondes → entier. Absent → null. */
const toMs = (value) => (typeof value === 'number' ? Math.round(value) : null);

/**
 * CLS → 4 decimales maximum. PAS d'arrondi a l'entier : le CLS utile vit
 * entre 0 et 0,25, Math.round() le ramenerait a 0 sur la quasi-totalite des
 * pages et ferait ecrire "CLS : 0" dans un rapport client. Absent → null.
 */
const toCls = (value) =>
  typeof value === 'number' ? parseFloat(value.toFixed(4)) : null;

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
 * Separe les arguments positionnels de l'option --url.
 * Parsing manuel : aucune dependance ajoutee pour deux arguments.
 */
function parseArgs(argv) {
  const positional = [];
  let url = null;

  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] !== '--url') {
      positional.push(argv[i]);
      continue;
    }

    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      fail('Option --url utilisee sans valeur.');
    }
    url = value;
    i += 1;
  }

  return { positional, url };
}

/**
 * Reponse PSI brute → objet snapshot normalise. Ne lit ni n'ecrit aucun
 * fichier : collect.js l'appelle en memoire pour calculer une mediane.
 *
 * urlArg : source du slug quand elle est fournie (URL demandee ou label de
 * mission). Voir le commentaire sur slugSource plus bas.
 *
 * Leve une Error au lieu d'appeler fail() : un brut invalide au milieu d'une
 * serie de runs ne doit pas tuer le processus de collecte. C'est l'appelant qui
 * decide.
 */
export function normalizeRaw(raw, urlArg = null) {
  const lh = raw?.lighthouseResult;

  if (!lh) {
    throw new Error('Ce fichier ne semble pas être un snapshot PSI valide.');
  }

  const url = lh?.finalDisplayedUrl ?? null;

  // meta.url reste l'URL reellement mesuree par PSI. Seul le slug suit l'URL
  // demandee quand elle est fournie : collect.js nomme ses fichiers avant la
  // redirection (www-exemple-com), PSI repond apres (exemple-com). Sans --url,
  // les deux divergent et les fichiers d'une meme mission ne se raccordent plus.
  const slugSource = urlArg ?? url;

  return {
    meta: {
      url,
      slug: slugSource ? slugify(slugSource) : null,
      strategy: lh?.configSettings?.formFactor ?? null,
      collectedAt: lh?.fetchTime ?? null,
      lighthouseVersion: lh?.lighthouseVersion ?? null,
      source: 'psi',
    },
    scores: {
      // Tout ce qui n'a pas ete demande par collect.js ressort a null : les
      // bruts collectes avant l'ajout des parametres category ne contiennent
      // que la categorie performance.
      performance: toScore(lh?.categories?.performance?.score),
      accessibility: toScore(lh?.categories?.accessibility?.score),
      best_practices: toScore(lh?.categories?.['best-practices']?.score),
      seo: toScore(lh?.categories?.seo?.score),
    },
    vitals: {
      lcp_ms: toMs(lh?.audits?.['largest-contentful-paint']?.numericValue),
      tbt_ms: toMs(lh?.audits?.['total-blocking-time']?.numericValue),
      cls: toCls(lh?.audits?.['cumulative-layout-shift']?.numericValue),
      fcp_ms: toMs(lh?.audits?.['first-contentful-paint']?.numericValue),
      tti_ms: toMs(lh?.audits?.interactive?.numericValue),
    },
    assets: {
      total_bytes: toMs(lh?.audits?.['total-byte-weight']?.numericValue),
      requests: lh?.audits?.['network-requests']?.details?.items?.length ?? null,
    },
  };
}

function main() {
  const { positional, url: urlArg } = parseArgs(process.argv.slice(2));
  const inputArg = positional[0];

  if (!inputArg) {
    fail('Usage: node normalize.js <chemin-vers-psi-mobile.json> [--url <url-originale>]');
  }

  const inputPath = resolveInput(inputArg);

  if (!inputPath) {
    fail(`Fichier introuvable : ${inputArg}`);
  }

  const inputName = basename(inputPath);

  // Garde-fou : sans "-psi-" dans le nom, la substitution ne change rien et le
  // fichier de sortie ecraserait le brut, qui est la piece justificative.
  if (!inputName.includes('-psi-')) {
    fail(
      `Nom de fichier inattendu : ${inputName}\n` +
        'Attendu un brut PSI produit par collect.js, du type ' +
        '20260101-120000-exemple-com-psi-mobile.json'
    );
  }

  let raw;
  try {
    raw = JSON.parse(readFileSync(inputPath, 'utf8'));
  } catch (error) {
    fail(`JSON invalide dans ${inputName} : ${error.message}`);
  }

  let snapshot;
  try {
    snapshot = normalizeRaw(raw, urlArg);
  } catch (error) {
    fail(error.message);
  }

  const outputPath = join(
    dirname(inputPath),
    inputName.replace('-psi-', '-normalized-')
  );

  writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

  console.log(`Snapshot normalise ecrit :\n  ${outputPath}`);
}

/**
 * Vrai quand le fichier est lance directement (node normalize.js …), faux quand
 * il est importe par collect.js. Sans ce garde-fou, le seul fait d'importer
 * normalizeRaw declencherait main() et ferait echouer collect.js sur
 * "Usage: node normalize.js …".
 */
function isRunDirectly() {
  const entry = process.argv[1];

  if (!entry) return false;

  const resolved = resolve(entry);

  // Windows : la casse de la lettre de lecteur peut differer entre argv[1] et
  // import.meta.filename. Une comparaison sensible a la casse y echouerait en
  // silence — le script ne ferait plus rien du tout.
  return process.platform === 'win32'
    ? resolved.toLowerCase() === import.meta.filename.toLowerCase()
    : resolved === import.meta.filename;
}

if (isRunDirectly()) {
  main();
}
