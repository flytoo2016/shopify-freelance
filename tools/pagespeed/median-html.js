/**
 * median-html.js — médiane sur N snapshots produits par parse-psi-html.js.
 *
 * POURQUOI : un seul run PSI n'est pas une mesure. Le LCP peut varier de
 * ±50 % entre deux runs sans aucune modification du site. Un livrable client
 * s'appuie sur la médiane de plusieurs runs, jamais sur un run isolé.
 *
 * USAGE :
 *   node median-html.js <fichier1.json> <fichier2.json> [<fichier3.json> ...]
 *   node median-html.js snapshots/<slug>-psi-lab-mobile-*.json
 *
 * Le motif * est développé par le script : PowerShell ne le fait pas.
 *
 * PRODUIT, dans le dossier des fichiers d'entrée :
 *   <slug>-psi-lab-<stratégie>-median.json
 *
 * Aucune dépendance externe. Node.js natif uniquement.
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve, isAbsolute } from 'node:path';

const ROOT = import.meta.dirname;

// Champs médianés, et leur mode d'arrondi.
const SCORE_KEYS  = ['performance', 'accessibility', 'best_practices', 'seo'];
const VITAL_KEYS  = ['lcp_ms', 'tbt_ms', 'cls', 'fcp_ms', 'si_ms', 'tti_ms'];
const FLOAT_KEYS  = new Set(['cls']);  // arrondi à 4 décimales, pas à l'entier

// ---------------------------------------------------------------------------
// Utilitaires
// ---------------------------------------------------------------------------

function fail(msg) {
  console.error(`Échec : ${msg}`);
  process.exit(1);
}

/**
 * Résout un argument en chemin existant : tel quel, puis relatif au dossier du
 * script, puis dans snapshots/. Retourne null si introuvable.
 */
function resolveInput(arg) {
  const candidates = isAbsolute(arg)
    ? [arg]
    : [resolve(process.cwd(), arg), resolve(ROOT, arg), resolve(ROOT, 'snapshots', arg)];
  return candidates.find((p) => existsSync(p)) ?? null;
}

/**
 * Développe un motif contenant * en liste de fichiers.
 * PowerShell ne développe pas les motifs : le script reçoit le * littéral.
 */
function expandGlob(arg) {
  if (!arg.includes('*')) return [arg];

  const dir = dirname(arg) === '.' ? process.cwd() : resolve(process.cwd(), dirname(arg));
  const dirPath = existsSync(dir) ? dir : resolve(ROOT, dirname(arg));
  if (!existsSync(dirPath)) return [arg];

  const pattern = basename(arg)
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*');
  const re = new RegExp(`^${pattern}$`);

  const hits = readdirSync(dirPath)
    .filter((f) => re.test(f))
    .sort()
    .map((f) => join(dirPath, f));

  return hits.length ? hits : [arg];
}

/**
 * Médiane d'une liste de valeurs. Les null sont exclus — une valeur absente
 * n'est pas un zéro. Tout null → null.
 */
function median(values, { float = false } = {}) {
  const nums = values.filter((v) => typeof v === 'number' && Number.isFinite(v));
  if (!nums.length) return null;

  nums.sort((a, b) => a - b);
  const mid = Math.floor(nums.length / 2);
  const raw = nums.length % 2 === 1 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;

  return float ? parseFloat(raw.toFixed(4)) : Math.round(raw);
}

/** Horodatage lu dans le nom du fichier, pour l'affichage des runs. */
function runLabel(file) {
  const m = basename(file).match(/(\d{8}-\d{4})/);
  return m ? m[1] : basename(file, '.json');
}

const s = (v, unit = '') => (v !== null && v !== undefined ? `${v}${unit}` : '—');

// ---------------------------------------------------------------------------
// Chargement
// ---------------------------------------------------------------------------

function loadSnapshot(arg) {
  const path = resolveInput(arg);
  if (!path) fail(`Fichier introuvable : ${arg}`);

  let parsed;
  try {
    parsed = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    fail(`JSON invalide dans ${arg} : ${error.message}`);
  }

  if (!String(parsed?.meta?.source ?? '').includes('psi-html')) {
    fail(
      `Ce fichier n'est pas un snapshot parse-psi-html.js : ${arg}\n` +
        `  meta.source attendu contenant "psi-html", trouvé : ${parsed?.meta?.source ?? 'absent'}`
    );
  }
  if (!parsed?.scores || !parsed?.vitals) {
    fail(`Snapshot incomplet (scores ou vitals absents) : ${arg}`);
  }

  return { path, snapshot: parsed };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2).flatMap(expandGlob);

  if (args.length < 2) {
    fail(
      'Au moins 2 fichiers sont nécessaires pour une médiane.\n' +
        '  Usage : node median-html.js <fichier1.json> <fichier2.json> [...]'
    );
  }

  const loaded = args.map(loadSnapshot);
  const snapshots = loaded.map((l) => l.snapshot);
  const first = snapshots[0];

  // Stratégie : identique partout, ou "mixed"
  const strategies = [...new Set(snapshots.map((snap) => snap.meta?.strategy ?? null))];
  const mixed = strategies.length > 1;
  if (mixed) {
    console.warn(`⚠️  Stratégies mixtes : ${strategies.join(', ')}`);
    console.warn('   La médiane croise des mesures non comparables — à ne pas livrer.');
  }
  const strategy = mixed ? 'mixed' : (strategies[0] ?? 'unknown');

  // Médianes
  const scores = Object.fromEntries(
    SCORE_KEYS.map((k) => [k, median(snapshots.map((snap) => snap.scores?.[k] ?? null))])
  );
  const vitals = Object.fromEntries(
    VITAL_KEYS.map((k) => [
      k,
      median(snapshots.map((snap) => snap.vitals?.[k] ?? null), { float: FLOAT_KEYS.has(k) }),
    ])
  );

  const slug = first.meta?.slug ?? 'unknown';
  const medianSnapshot = {
    meta: {
      source: 'psi-html-median',
      runs: snapshots.length,
      sourceFiles: loaded.map((l) => basename(l.path)),
      url: first.meta?.url ?? null,
      slug,
      strategy,
      device: first.meta?.device ?? null,
      reportDate: first.meta?.reportDate ?? null,
      lighthouseVersion: first.meta?.lighthouseVersion ?? null,
      parsedAt: first.meta?.parsedAt ?? null,
      medianedAt: new Date().toISOString(),
    },
    scores,
    vitals,
  };

  const outDir = dirname(loaded[0].path);
  const outFile = join(outDir, `${slug}-psi-lab-${strategy}-median.json`);
  writeFileSync(outFile, JSON.stringify(medianSnapshot, null, 2) + '\n');

  // Affichage : valeurs brutes de chaque run, puis médiane
  console.log('');
  const LABEL_WIDTH = 22;
  const line = (label, sc, v) =>
    `  ${label.padEnd(LABEL_WIDTH)}: perf ${s(sc)}  ` +
    `LCP ${s(v.lcp_ms, ' ms')}  TBT ${s(v.tbt_ms, ' ms')}  CLS ${s(v.cls)}`;

  loaded.forEach((l, i) => {
    console.log(line(`run ${i + 1} (${runLabel(l.path)})`, l.snapshot.scores?.performance, l.snapshot.vitals ?? {}));
  });
  console.log('  ' + '─'.repeat(62));
  console.log(line('médiane', scores.performance, vitals));

  console.log(`\n✅ Fichier écrit :\n  ${outFile}`);
  console.log('\n📊 Médiane complète :');
  console.log(`  Runs      : ${snapshots.length}`);
  console.log(`  Stratégie : ${strategy}`);
  console.log(`  URL       : ${first.meta?.url ?? '—'}`);
  console.log('');
  console.log('  SCORES LIGHTHOUSE');
  console.log(`    Performance    : ${s(scores.performance)}/100`);
  console.log(`    Accessibilité  : ${s(scores.accessibility)}/100`);
  console.log(`    Bonnes prat.   : ${s(scores.best_practices)}/100`);
  console.log(`    SEO            : ${s(scores.seo)}/100`);
  console.log('');
  console.log('  MÉTRIQUES LABORATOIRE');
  console.log(`    LCP  : ${s(vitals.lcp_ms, ' ms')}`);
  console.log(`    TBT  : ${s(vitals.tbt_ms, ' ms')}`);
  console.log(`    CLS  : ${s(vitals.cls)}`);
  console.log(`    FCP  : ${s(vitals.fcp_ms, ' ms')}`);
  console.log(`    SI   : ${s(vitals.si_ms, ' ms')}`);
  console.log(`    TTI  : ${s(vitals.tti_ms, ' ms')}`);
}

main();
