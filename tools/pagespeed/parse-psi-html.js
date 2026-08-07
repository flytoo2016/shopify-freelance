/**
 * parse-psi-html.js — Extrait les données PSI et CrUX depuis une page HTML
 * sauvegardée de pagespeed.web.dev.
 *
 * COMMENT SAUVEGARDER LA PAGE :
 *   1. Ouvrir pagespeed.web.dev dans Chrome
 *   2. Entrer l'URL, attendre les résultats complets
 *   3. Basculer entre Mobile et Bureau pour avoir les deux
 *   4. Pour chaque stratégie :
 *      F12 → Console → copy(document.documentElement.outerHTML)
 *      Coller dans un fichier .html distinct
 *
 * NOMMAGE DU FICHIER HTML (obligatoire) :
 *   {slug}-{stratégie}-{YYYYMMDD-HHMM}.html
 *   ex. exemple-mobile-20260806-1448.html
 *   La stratégie et l'horodatage sont lus dans le NOM, pas dans le DOM :
 *   la page PSI charge les deux rapports de façon asynchrone.
 *
 * USAGE :
 *   node parse-psi-html.js <fichier.html> [--out <dossier>] [--label <label>]
 *
 * --label distingue plusieurs pages d'un même site (homepage, collection,
 * product…). Sans --label, le comportement est celui d'avant : seul le slug
 * de l'URL nomme les fichiers.
 *
 * PRODUIT dans le dossier de sortie :
 *   <slug>[-label]-psi-lab-<stratégie>-<ts>.json     ← métriques Lighthouse
 *   <slug>[-label]-crux-url-<stratégie>-<ts>.json    ← données terrain CrUX (URL)
 *   <slug>[-label]-crux-origin-<stratégie>-<ts>.json ← données terrain CrUX (Origine)
 *
 * Le CrUX est spécifique au form factor : les valeurs mobile et desktop
 * diffèrent, d'où le suffixe de stratégie sur ces fichiers aussi.
 *
 * <ts> = "20260806-1448" si le nom du HTML porte l'horodatage,
 *        sinon "20260806" (date du rapport, puis date du jour).
 * Chaque run produit donc des fichiers distincts : aucun écrasement.
 *
 * Aucune dépendance externe. Node.js natif uniquement.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, dirname, join, resolve, isAbsolute } from 'node:path';
import { URL } from 'node:url';

// ---------------------------------------------------------------------------
// Utilitaires
// ---------------------------------------------------------------------------

function fail(msg) {
  console.error(`Échec : ${msg}`);
  process.exit(1);
}

function clean(str) {
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u202f/g, ' ')
    .trim();
}

function toMs(raw) {
  if (!raw) return null;
  const s = clean(raw).replace(/\s/g, '');
  let m = s.match(/^([\d,]+)s$/);
  if (m) return Math.round(parseFloat(m[1].replace(',', '.')) * 1000);
  m = s.match(/^([\d\s,]+)ms$/);
  if (m) return parseInt(m[1].replace(/[\s,]/g, ''), 10);
  m = s.match(/^(\d+)s$/);
  if (m) return parseInt(m[1], 10) * 1000;
  return null;
}

function toCls(raw) {
  if (!raw) return null;
  const s = clean(raw).replace(/\s/g, '');
  if (s === '0') return 0;
  const f = parseFloat(s.replace(',', '.'));
  return isNaN(f) ? null : parseFloat(f.toFixed(4));
}

function slugify(url) {
  try {
    const u = new URL(url);
    return (u.hostname + u.pathname)
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()
      .slice(0, 50);
  } catch {
    return 'unknown';
  }
}

function decodeUrl(encoded) {
  try { return decodeURIComponent(encoded); } catch { return encoded; }
}

// ---------------------------------------------------------------------------
// Extraction
// ---------------------------------------------------------------------------

function extractUrl(html) {
  const m = html.match(/url=https%3A%2F%2F([^&"'\s]+)/);
  if (m) return decodeUrl('https%3A%2F%2F' + m[1]);
  const m2 = html.match(/https:\/\/([a-z0-9-]+\.[a-z]{2,})\//i);
  return m2 ? m2[0] : null;
}

/**
 * Détecte la stratégie.
 * 1. Nom du fichier — source de vérité : {slug}-{stratégie}-{YYYYMMDD-HHMM}.html
 *    Le DOM charge les deux rapports de façon asynchrone : il n'est pas fiable.
 * 2. Fallback DOM : texte d'émulation de l'appareil
 *    Mobile : "Moto G Power", "Nexus", "Galaxy S" — Desktop : "MacBook", "Windows Desktop"
 * 3. Fallback ultime : position de l'icône smartphone vs computer dans le DOM
 */
function extractStrategy(html, filename = '') {
  if (/\bmobile\b/i.test(filename))           return 'mobile';
  if (/\b(desktop|bureau)\b/i.test(filename)) return 'desktop';

  if (/Moto[\s\u00a0]G Power|Nexus \d|Galaxy S\d|Moto E/i.test(html)) return 'mobile';
  if (/MacBook|Windows Desktop|lh-report-icon--desktop/i.test(html)) return 'desktop';
  // Fallback : l'icône "smartphone" précède "computer" sur la page mobile
  const smartphonePos = html.indexOf('smartphone');
  const computerPos   = html.indexOf('computer');
  if (smartphonePos > 0 && computerPos > 0) {
    return smartphonePos < computerPos ? 'mobile' : 'desktop';
  }
  return null;
}

function extractLighthouseVersion(html) {
  const m = html.match(/Lighthouse\s+([\d.]+)/);
  return m ? m[1] : null;
}

function extractDate(html) {
  const months = {
    'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
    'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
    'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12',
  };
  const m = html.match(/(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/);
  if (!m) return null;
  const [, day, month, year] = m;
  return `${year}-${months[month]}-${day.padStart(2, '0')}`;
}

/**
 * Extrait le timestamp du nom de fichier : {slug}-{stratégie}-{YYYYMMDD-HHMM}.html
 *   "exemple-mobile-20260806-1448.html"
 *     → { date: '2026-08-06', time: '14:48', ts: '20260806-1448' }
 * Retourne null si le pattern est absent.
 */
function extractTimestampFromFilename(filename) {
  const m = String(filename).match(/(\d{4})(\d{2})(\d{2})-(\d{2})(\d{2})/);
  if (!m) return null;
  const [, year, month, day, hour, minute] = m;
  return {
    date: `${year}-${month}-${day}`,
    time: `${hour}:${minute}`,
    ts:   `${year}${month}${day}-${hour}${minute}`,
  };
}

/**
 * Nom de l'appareil émulé, ancré sur « with Lighthouse » :
 *   « Émulation du Moto G Power with Lighthouse 13.4.1 »  → mobile
 *   « Émulation (ordinateur) with Lighthouse 13.4.1 »     → desktop
 * L'ancrage écarte la ligne « Émulation de l'écran: 1350x940, DPR 1 ».
 */
function extractDeviceName(html) {
  const m = html.match(/Émulation\s*(?:du\s+|de\s+)?([^<\n]*with Lighthouse[^<\n]*)/);
  if (!m) return null;
  const name = clean(m[1].replace(/<[^>]+>/g, ''))
    .replace(/\s*with Lighthouse[\s\d.]*$/i, '')  // version déjà dans lighthouseVersion
    .replace(/^\((.+)\)$/, '$1')                  // « (ordinateur) » → « ordinateur »
    .trim();
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : null;
}

/**
 * Découpe la page PSI en panneaux, un par stratégie.
 *
 * Une page sauvegardée après bascule d'onglet contient LES DEUX stratégies,
 * dans cet ordre : [CrUX mobile][rapport mobile][CrUX desktop][rapport desktop]
 * Le bloc CrUX d'un panneau précède donc son <article class="lh-root">.
 *
 * Chaque panneau porte :
 *   report   — le rapport Lighthouse (scores, métriques lab, appareil)
 *   crux     — la zone terrain qui le précède (CrUX URL + Origine + statut CWV)
 *   strategy — déduite du viewport : largeur <= 600 px → mobile, sinon desktop
 */
function splitPanels(html) {
  const positions = [];
  const re = /<article[^>]*class="[^"]*lh-root[^"]*"/g;
  let m;
  while ((m = re.exec(html)) !== null) positions.push(m.index);
  if (!positions.length) return [];

  return positions.map((pos, i) => {
    const report = html.slice(pos, positions[i + 1] ?? html.length);
    const crux   = html.slice(i === 0 ? 0 : positions[i - 1], pos);
    // FR : « Émulation de l'écran: 412x823, DPR 1.75 » — EN : « Screen emulation: … »
    const vp = report.match(/(?:écran|screen|viewport)[^:]*:\s*(\d+)x(\d+)/i)
            ?? report.match(/(\d+)x(\d+),\s*DPR/i);
    const width = vp ? parseInt(vp[1], 10) : null;
    return {
      report,
      crux,
      width,
      strategy: width === null ? null : (width <= 600 ? 'mobile' : 'desktop'),
    };
  });
}

/**
 * Panneau correspondant à la stratégie demandée.
 * Fallback : HTML complet (comportement historique) si le découpage échoue.
 */
function selectPanel(html, strategy) {
  const panels = splitPanels(html);

  if (panels.length > 1) {
    console.log(
      `  Segments Lighthouse détectés : ${panels.length} → ` +
      `utilisation du segment ${strategy}`
    );
  }
  if (panels.length <= 1) return { report: html, crux: html };

  const hit = panels.find((p) => p.strategy === strategy);
  if (hit) return hit;

  console.warn(`⚠️  Aucun segment ${strategy} identifié — extraction sur le HTML complet.`);
  return { report: html, crux: html };
}

function extractScores(html) {
  const raw = [...html.matchAll(
    /class="lh-gauge__percentage">(\d+)<\/div>\s*<div class="lh-gauge__label">([^<]+)<\/div>/g
  )];
  const labelMap = {
    'performances': 'performance',
    'performance': 'performance',
    'accessibilité': 'accessibility',
    'accessibility': 'accessibility',
    'bonnes pratiques': 'best_practices',
    'best practices': 'best_practices',
    'seo': 'seo',
  };
  const scores = { performance: null, accessibility: null, best_practices: null, seo: null };
  const seen = new Set();
  for (const [, score, label] of raw) {
    const key = labelMap[label.toLowerCase().trim()];
    if (key && !seen.has(key)) {
      scores[key] = parseInt(score, 10);
      seen.add(key);
    }
  }
  return scores;
}

function extractLabMetrics(html) {
  const raw = [...html.matchAll(
    /<span class="lh-metric__title">([^<]+)<\/span>.*?<div class="lh-metric__value">(.*?)<\/div>/gs
  )];
  const lMetricMap = {
    'first contentful paint': 'fcp_ms',
    'largest contentful paint': 'lcp_ms',
    'total blocking time': 'tbt_ms',
    'cumulative layout shift': 'cls',
    'speed index': 'si_ms',
    'time to interactive': 'tti_ms',
  };
  const metrics = { fcp_ms: null, lcp_ms: null, tbt_ms: null, cls: null, si_ms: null, tti_ms: null };
  for (const [, label, rawVal] of raw) {
    const key = lMetricMap[label.trim().toLowerCase()];
    if (!key) continue;
    const valText = clean(rawVal.replace(/<[^>]+>/g, ''));
    metrics[key] = key === 'cls' ? toCls(valText) : toMs(valText);
  }
  return metrics;
}

function extractCrux(html) {
  const metricMap = {
    'web.dev/lcp': 'lcp_ms',
    'web.dev/inp': 'inp_ms',
    'web.dev/cls': 'cls',
    'web.dev/fcp': 'fcp_ms',
    'web.dev/ttfb': 'ttfb_ms',
  };
  const raw = [...html.matchAll(
    /href="(https:\/\/web\.dev\/[^/]+\/)"[^>]*>.*?class="[^"]*Ykn2A[^"]*">([^<]+)<\/span>/gs
  )];
  const blocks = [];
  let current = {}, count = 0;
  for (const [, href, val] of raw) {
    let mk = null;
    for (const [k, v] of Object.entries(metricMap)) {
      if (href.includes(k)) { mk = v; break; }
    }
    if (!mk) continue;
    const cleaned = clean(val);
    current[mk] = mk === 'cls' ? toCls(cleaned) : toMs(cleaned);
    count++;
    if (count % 5 === 0) { blocks.push({ ...current }); current = {}; }
  }
  const cwvM = html.match(/Évaluation Core Web Vitals.*?<span class="[^"]+">([^<]+)<\/span>/s);
  return {
    url_data:    blocks[0] ?? null,
    origin_data: blocks[1] ?? null,
    cwv_status:  cwvM ? cwvM[1].trim() : null,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    fail('Usage: node parse-psi-html.js <fichier.html> [--out <dossier>] [--label <label>]');
  }

  const htmlArg = args[0];
  const outIdx  = args.indexOf('--out');
  const outDir  = outIdx !== -1 && args[outIdx + 1]
    ? resolve(process.cwd(), args[outIdx + 1])
    : dirname(resolve(process.cwd(), htmlArg));

  // Label de page facultatif — normalisé pour un nom de fichier sûr
  const labelIdx  = args.indexOf('--label');
  const pageLabel = labelIdx !== -1 && args[labelIdx + 1]
    ? args[labelIdx + 1].toLowerCase().replace(/[^a-z0-9-]/g, '-')
    : null;

  const htmlPath = isAbsolute(htmlArg) ? htmlArg : resolve(process.cwd(), htmlArg);
  if (!existsSync(htmlPath)) fail(`Fichier introuvable : ${htmlPath}`);

  console.log(`Lecture de ${basename(htmlPath)}…`);
  const html = readFileSync(htmlPath, { encoding: 'utf8' });

  const analyzedUrl  = extractUrl(html);
  const strategy     = extractStrategy(html, basename(htmlPath));
  const tsInfo       = extractTimestampFromFilename(basename(htmlPath));
  const panel        = selectPanel(html, strategy);
  const lhVersion    = extractLighthouseVersion(html);
  const reportDate   = extractDate(html);
  const deviceName   = extractDeviceName(panel.report);
  const scores       = extractScores(panel.report);
  const labMetrics   = extractLabMetrics(panel.report);
  // CrUX = données terrain, spécifiques au form factor : scopées au panneau
  const crux         = extractCrux(panel.crux);

  if (!strategy) {
    console.warn('⚠️  Stratégie non détectée — vérifier que le HTML contient les résultats complets.');
    console.warn('   Appareil détecté :', deviceName ?? 'inconnu');
  }

  const stratSuffix = strategy ?? 'unknown';
  const slug = slugify(analyzedUrl) || 'unknown';
  // Slug des fichiers de sortie : le label distingue deux pages du même site
  const outSlug = pageLabel ? `${slug}-${pageLabel}` : slug;

  // Timestamp des noms de sortie : nom du fichier > date du rapport HTML > date du jour
  const ts = tsInfo?.ts
    ?? reportDate?.replace(/-/g, '')
    ?? new Date().toISOString().slice(0, 10).replace(/-/g, '');

  // Snapshot laboratoire — nom inclut la stratégie
  const labSnapshot = {
    meta: {
      source: 'psi-html',
      url: analyzedUrl,
      slug,
      strategy,
      device: deviceName,
      reportDate,
      lighthouseVersion: lhVersion,
      parsedAt: new Date().toISOString(),
      htmlFile: basename(htmlPath),
    },
    scores,
    vitals: {
      lcp_ms: labMetrics.lcp_ms,
      tbt_ms: labMetrics.tbt_ms,
      cls:    labMetrics.cls,
      fcp_ms: labMetrics.fcp_ms,
      si_ms:  labMetrics.si_ms,
      tti_ms: labMetrics.tti_ms,
    },
  };

  // Snapshots CrUX — identiques pour mobile et desktop, pas de suffixe stratégie
  const cruxUrlSnapshot = {
    meta: {
      source: 'crux-html',
      scope: 'url',
      url: analyzedUrl,
      slug,
      strategy,
      reportDate,
      parsedAt: new Date().toISOString(),
      cwv_status: crux.cwv_status,
      available: crux.url_data !== null,
    },
    p75: crux.url_data ?? null,
  };

  const cruxOriginSnapshot = {
    meta: {
      source: 'crux-html',
      scope: 'origin',
      url: analyzedUrl,
      slug,
      strategy,
      reportDate,
      parsedAt: new Date().toISOString(),
      cwv_status: crux.cwv_status,
      available: crux.origin_data !== null,
    },
    p75: crux.origin_data ?? null,
  };

  // Écriture
  mkdirSync(outDir, { recursive: true });

  // Suffixe stratégie + timestamp : aucun run n'écrase le précédent
  // CrUX aussi suffixé par la stratégie : le terrain diffère par form factor
  const labFile      = join(outDir, `${outSlug}-psi-lab-${stratSuffix}-${ts}.json`);
  const cruxUrlFile  = join(outDir, `${outSlug}-crux-url-${stratSuffix}-${ts}.json`);
  const cruxOrigFile = join(outDir, `${outSlug}-crux-origin-${stratSuffix}-${ts}.json`);

  writeFileSync(labFile, JSON.stringify(labSnapshot, null, 2) + '\n');
  writeFileSync(cruxUrlFile,  JSON.stringify(cruxUrlSnapshot,    null, 2) + '\n');
  writeFileSync(cruxOrigFile, JSON.stringify(cruxOriginSnapshot, null, 2) + '\n');

  // Résumé console
  const s = (v, unit = '') => v !== null && v !== undefined ? `${v}${unit}` : '—';

  console.log('\n✅ Fichiers écrits :');
  console.log(`  ${labFile}`);
  console.log(`  ${cruxUrlFile}`);
  console.log(`  ${cruxOrigFile}`);
  console.log('\n📊 Résumé :');
  console.log(`  Fichier source : ${basename(htmlPath)}`);
  console.log(`  Timestamp      : ${tsInfo ? `${tsInfo.ts} (${tsInfo.date} ${tsInfo.time})` : 'non détecté'}`);
  console.log(`  URL       : ${analyzedUrl}`);
  console.log(`  Page label : ${pageLabel ?? '(non renseigné — slug URL utilisé)'}`);
  console.log(`  Stratégie : ${strategy ?? '⚠️  non détectée'}`);
  console.log(`  Appareil  : ${deviceName ?? '—'}`);
  console.log(`  Date      : ${reportDate}`);
  console.log(`  Lighthouse: ${lhVersion}`);
  console.log('');
  console.log('  SCORES LIGHTHOUSE');
  console.log(`    Performance    : ${s(scores.performance)}/100`);
  console.log(`    Accessibilité  : ${s(scores.accessibility)}/100`);
  console.log(`    Bonnes prat.   : ${s(scores.best_practices)}/100`);
  console.log(`    SEO            : ${s(scores.seo)}/100`);
  console.log('');
  console.log(`  MÉTRIQUES LABORATOIRE (${strategy ?? '?'})`);
  console.log(`    LCP  : ${s(labMetrics.lcp_ms, ' ms')}`);
  console.log(`    TBT  : ${s(labMetrics.tbt_ms, ' ms')}`);
  console.log(`    CLS  : ${s(labMetrics.cls)}`);
  console.log(`    FCP  : ${s(labMetrics.fcp_ms, ' ms')}`);
  console.log(`    SI   : ${s(labMetrics.si_ms, ' ms')}`);
  console.log('');
  console.log(`  CRUX TERRAIN (URL) — CWV : ${crux.cwv_status ?? '—'}`);
  if (crux.url_data) {
    console.log(`    LCP  : ${s(crux.url_data.lcp_ms, ' ms')}`);
    console.log(`    INP  : ${s(crux.url_data.inp_ms, ' ms')}`);
    console.log(`    CLS  : ${s(crux.url_data.cls)}`);
    console.log(`    FCP  : ${s(crux.url_data.fcp_ms, ' ms')}`);
    console.log(`    TTFB : ${s(crux.url_data.ttfb_ms, ' ms')}`);
  } else {
    console.log('    Données terrain absentes.');
  }
  console.log('');
  console.log(`  CRUX TERRAIN (Origine)`);
  if (crux.origin_data) {
    console.log(`    LCP  : ${s(crux.origin_data.lcp_ms, ' ms')}`);
    console.log(`    INP  : ${s(crux.origin_data.inp_ms, ' ms')}`);
    console.log(`    CLS  : ${s(crux.origin_data.cls)}`);
    console.log(`    FCP  : ${s(crux.origin_data.fcp_ms, ' ms')}`);
    console.log(`    TTFB : ${s(crux.origin_data.ttfb_ms, ' ms')}`);
  } else {
    console.log('    Données terrain absentes.');
  }
}

main();
