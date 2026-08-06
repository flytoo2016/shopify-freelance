/**
 * compare.js — deux snapshots normalises → rapport Markdown avant/apres.
 *
 * Le rapport est destine a un client non technique. Il ne contient que des
 * valeurs mesurees : aucune projection, aucune promesse de resultat, et une
 * valeur absente s'affiche "—", jamais 0.
 *
 * Usage : node compare.js <baseline-normalized.json> <after-normalized.json>
 * Ecrit : snapshots/compare-<slug>-<timestamp>.md
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { isAbsolute, join, resolve } from 'node:path';

const ROOT = import.meta.dirname;
const SNAPSHOTS_DIR = join(ROOT, 'snapshots');

/** Horodatage local YYYYMMDD-HHMMSS. Identique a collect.js. */
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

function loadSnapshot(inputArg, role) {
  const path = resolveInput(inputArg);

  if (!path) {
    fail(`Fichier ${role} introuvable : ${inputArg}`);
  }

  let parsed;
  try {
    parsed = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    fail(`JSON invalide dans le fichier ${role} (${inputArg}) : ${error.message}`);
  }

  if (!parsed?.meta || !parsed?.scores || !parsed?.vitals) {
    fail(
      `Le fichier ${role} ne semble pas etre un snapshot normalise : ${inputArg}\n` +
        'Attendu une sortie de normalize.js (…-normalized-mobile.json).'
    );
  }

  return parsed;
}

// --- Formatage ------------------------------------------------------------

const ABSENT = '—';

const nf = (decimals) =>
  new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const isNum = (value) => typeof value === 'number' && Number.isFinite(value);

/** Valeur mesuree → texte. Absente → "—", jamais 0. */
function fmt(value, { unit = '', decimals = 0 } = {}) {
  if (!isNum(value)) return ABSENT;
  return `${nf(decimals).format(value)}${unit}`;
}

/**
 * Ecart signe. "+" pour un ecart positif, "−" pour un ecart negatif.
 * Un ecart n'a de sens que si les deux cotes sont mesures : sinon "—".
 */
function fmtDelta(before, after, { unit = '', decimals = 0 } = {}) {
  if (!isNum(before) || !isNum(after)) return ABSENT;

  const diff = after - before;
  const rounded = decimals === 0 ? Math.round(diff) : parseFloat(diff.toFixed(decimals));

  if (rounded === 0) return `0${unit}`;

  const sign = rounded > 0 ? '+' : '−';
  return `${sign}${nf(decimals).format(Math.abs(rounded))}${unit}`;
}

/** ISO 8601 → date locale lisible. Absente → "—". */
function fmtDate(iso) {
  if (!iso) return ABSENT;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? ABSENT : d.toLocaleString('fr-FR');
}

/** Octets → kilo-octets. */
const toKo = (bytes) => (isNum(bytes) ? Math.round(bytes / 1024) : null);

/** Une ligne de tableau : label, avant, apres, ecart, puis colonnes en plus. */
function row(label, before, after, options = {}, ...extra) {
  const cells = [
    label,
    fmt(before, options),
    fmt(after, options),
    fmtDelta(before, after, options),
    ...extra,
  ];
  return `| ${cells.join(' | ')} |`;
}

// --- Rapport --------------------------------------------------------------

function buildReport(baseline, after) {
  const url = after.meta?.url ?? baseline.meta?.url ?? ABSENT;
  const strategy = after.meta?.strategy ?? ABSENT;

  const ms = { unit: ' ms' };
  const cls = { decimals: 4 };

  const scores = [
    ['Performance', 'performance'],
    ['Accessibilité', 'accessibility'],
    ['Bonnes pratiques', 'best_practices'],
    ['SEO', 'seo'],
  ].map(([label, key]) =>
    row(label, baseline.scores?.[key], after.scores?.[key], { unit: '/100' })
  );

  const vitals = [
    row('LCP', baseline.vitals?.lcp_ms, after.vitals?.lcp_ms, ms, '≤ 2 500 ms'),
    row('TBT', baseline.vitals?.tbt_ms, after.vitals?.tbt_ms, ms, '≤ 200 ms'),
    row('CLS', baseline.vitals?.cls, after.vitals?.cls, cls, '≤ 0,1'),
    row('FCP', baseline.vitals?.fcp_ms, after.vitals?.fcp_ms, ms, '≤ 1 800 ms'),
    row('TTI', baseline.vitals?.tti_ms, after.vitals?.tti_ms, ms, ABSENT),
  ];

  const weight = [
    row(
      'Poids total',
      toKo(baseline.assets?.total_bytes),
      toKo(after.assets?.total_bytes),
      { unit: ' Ko' }
    ),
    row('Requêtes', baseline.assets?.requests, after.assets?.requests),
  ];

  return `# Rapport de performance — ${url}

Généré le ${new Date().toLocaleString('fr-FR')}

## Conditions de mesure

- Stratégie : ${strategy}
- Lighthouse : ${baseline.meta?.lighthouseVersion ?? ABSENT} → ${after.meta?.lighthouseVersion ?? ABSENT}
- Baseline collectée le : ${fmtDate(baseline.meta?.collectedAt)}
- Mesure après collectée le : ${fmtDate(after.meta?.collectedAt)}

## Scores Lighthouse

| Dimension | Avant | Après | Écart |
|---|---|---|---|
${scores.join('\n')}

Un écart positif est une amélioration.

## Core Web Vitals (laboratoire)

| Métrique | Avant | Après | Écart | Seuil "bon" |
|---|---|---|---|---|
${vitals.join('\n')}

Sur ces cinq métriques, plus bas est meilleur : un écart négatif est une
amélioration. Seuils « bon » : Core Web Vitals / Lighthouse (web.dev).

## Poids de la page

| | Avant | Après | Écart |
|---|---|---|---|
${weight.join('\n')}

## Lecture honnête

Ces mesures sont des données de laboratoire (Lighthouse en conditions
simulées), pas des données terrain. Elles sont reproductibles et
comparables entre elles à conditions identiques. L'effet réel sur les
visiteurs se lira dans les données terrain (CrUX) après 28 à 30 jours.

Un tiret « ${ABSENT} » signale une valeur non mesurée, jamais une valeur nulle.

---
*Généré par shopify-pagespeed — [collect.js → normalize.js → compare.js]*
`;
}

function main() {
  const [baselineArg, afterArg] = process.argv.slice(2);

  if (!baselineArg || !afterArg) {
    fail('Usage: node compare.js <baseline-normalized.json> <after-normalized.json>');
  }

  const baseline = loadSnapshot(baselineArg, 'baseline');
  const after = loadSnapshot(afterArg, 'after');

  // Comparer deux strategies ou deux URLs differentes produit un tableau qui
  // a l'air valide et ne veut rien dire. On avertit, on n'interrompt pas.
  if (baseline.meta?.strategy !== after.meta?.strategy) {
    console.warn(
      `Attention : stratégies différentes (${baseline.meta?.strategy} vs ${after.meta?.strategy})`
    );
  }

  if (baseline.meta?.url !== after.meta?.url) {
    console.warn(
      `Attention : URLs différentes (${baseline.meta?.url} vs ${after.meta?.url})`
    );
  }

  mkdirSync(SNAPSHOTS_DIR, { recursive: true });

  const slug = after.meta?.slug ?? 'inconnu';
  const outputPath = join(SNAPSHOTS_DIR, `compare-${slug}-${timestamp()}.md`);

  writeFileSync(outputPath, buildReport(baseline, after), 'utf8');

  console.log(`Rapport écrit :\n  ${outputPath}`);
}

main();
