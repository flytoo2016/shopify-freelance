/**
 * normalize.js — JSON PSI brut → snapshot normalise.
 *
 * Ne conserve que les champs reellement utilises dans les rapports clients.
 * Aucun champ n'est calcule, derive ou complete : ce qui est absent de la
 * reponse PSI ressort a null, jamais a zero et jamais estime.
 *
 * Usage : node normalize.js <chemin-vers-…-psi-mobile.json>
 * Ecrit : <meme-nom, "-psi-" remplace par "-normalized-">.json
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

function main() {
  const inputArg = process.argv[2];

  if (!inputArg) {
    fail('Usage: node normalize.js <chemin-vers-psi-mobile.json>');
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

  const lh = raw?.lighthouseResult;

  if (!lh) {
    fail('Ce fichier ne semble pas être un snapshot PSI valide.');
  }

  const url = lh?.finalDisplayedUrl ?? null;

  const snapshot = {
    meta: {
      url,
      slug: url ? slugify(url) : null,
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

  const outputPath = join(
    dirname(inputPath),
    inputName.replace('-psi-', '-normalized-')
  );

  writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

  console.log(`Snapshot normalise ecrit :\n  ${outputPath}`);
}

main();
