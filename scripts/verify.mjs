// scripts/verify.mjs
import { readFileSync, statSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

// Node's execSync defaults to cmd.exe on Windows, which mangles the POSIX
// pipelines below (single quotes, embedded newlines). Force a real POSIX
// shell everywhere; on Linux CI (ubuntu-latest) /bin/sh already is one.
const sh = cmd => execSync(cmd, { shell: process.platform === 'win32' ? 'bash.exe' : '/bin/sh' });

const fail = [];
const ok = m => console.log(`  ok   ${m}`);
const bad = m => { fail.push(m); console.log(`  FAIL ${m}`); };

// Every emitted HTML page — the gate must guard every locale and the 404
// page, not just the English homepage. Checking dist/index.html alone would
// let a stray eager image, a reintroduced banned host, a missing hreflang or
// an empty alt confined to /id/ or /404 pass silently.
const pages = sh(`find dist -name '*.html'`).toString().trim().split('\n').filter(Boolean).sort();
const pageHtml = Object.fromEntries(pages.map(p => [p, readFileSync(p, 'utf8')]));

// JS budget — measured GZIPPED, which is what the browser actually downloads.
// React 19's client runtime alone is 422 KB raw / 127 KB gzipped; the two islands
// (ProjectGrid, Lightbox) add a few KB on top. A raw-bytes budget is meaningless here.
const jsRaw = sh(`find dist -name '*.js' -exec cat {} + | wc -c`).toString().trim();
const jsGz = sh(`find dist -name '*.js' -exec cat {} + | gzip -c | wc -c`).toString().trim();
Number(jsGz) < 150_000
  ? ok(`JS ${(jsGz/1024).toFixed(0)} KB gzipped (${(jsRaw/1024).toFixed(0)} KB raw) < 150 KB`)
  : bad(`JS ${(jsGz/1024).toFixed(0)} KB gzipped exceeds the 150 KB budget`);

// Every .js file in dist must be transitively reachable from an HTML entry
// point: referenced directly by a page, or reachable by walking import
// specifiers embedded in already-reachable JS files. Vite splits shared
// runtime code (preact, hooks, jsxRuntime, signals) into chunks that only
// entry files like client.js and Lightbox.js pull in by specifier, never
// HTML — so this does a real BFS from the HTML-referenced seed set, rather
// than just checking whether a filename appears *anywhere* in the JS soup
// (which would also pass a cluster of chunks that only reference each other
// with no HTML entry point at all).
const jsFiles = sh(`find dist -name '*.js'`).toString().trim().split('\n').filter(Boolean);
const jsBasenames = jsFiles.map(f => f.split('/').pop());
const jsContent = Object.fromEntries(jsFiles.map(f => [f.split('/').pop(), readFileSync(f, 'utf8')]));

const reachable = new Set();
for (const h of Object.values(pageHtml)) {
  for (const name of jsBasenames) if (h.includes(name)) reachable.add(name);
}
let frontier = [...reachable];
while (frontier.length) {
  const next = [];
  for (const name of frontier) {
    const content = jsContent[name] ?? '';
    for (const candidate of jsBasenames) {
      if (!reachable.has(candidate) && content.includes(candidate)) {
        reachable.add(candidate);
        next.push(candidate);
      }
    }
  }
  frontier = next;
}
const orphans = jsBasenames.filter(f => !reachable.has(f));
orphans.length === 0 ? ok('no orphaned JS bundles') : bad(`orphaned JS never referenced by any page: ${orphans.join(', ')}`);

// Image weight. A single total is the WRONG metric: lightbox derivatives live in
// data- attributes and are fetched only on click, and every card image is lazy.
// Measured on the real page: first paint downloads ZERO images. So gate on the
// things that actually indicate a regression.

// (a) No single emitted image may be huge — this is what catches an unoptimised
//     original leaking into dist (it happened once: 71 MB before it was caught).
const biggest = sh(`find dist -name '*.webp' -o -name '*.png' -o -name '*.jpg' -o -name '*.avif' | xargs -r ls -S | head -1`).toString().trim();
const biggestSize = biggest ? Number(sh(`stat -c%s "${biggest}"`).toString().trim()) : 0;
biggestSize < 1_600_000
  ? ok(`largest image ${(biggestSize/1e6).toFixed(2)} MB < 1.6 MB`)
  : bad(`largest image ${(biggestSize/1e6).toFixed(2)} MB — likely an unoptimised original leaked into dist: ${biggest}`);

// (b) Total emitted images — deploy sanity, not download weight.
const imgs = sh(`find dist -name '*.webp' -o -name '*.avif' -o -name '*.png' -o -name '*.jpg' | xargs -r cat | wc -c`).toString().trim();
Number(imgs) < 25_000_000 ? ok(`emitted images ${(imgs/1e6).toFixed(1)} MB < 25 MB`) : bad(`emitted images ${(imgs/1e6).toFixed(1)} MB too large`);

// (c) First-paint payload: the HTML and CSS a browser must have before it can
// render. Intentionally single-page: this measures dist/index.html, the
// primary entry point a first-time visitor hits. Every other page shares the
// same CSS bundle, so this number does not vary meaningfully page to page.
const firstPaint = Number(sh(`cat dist/index.html $(find dist/_astro -name '*.css') | gzip -c | wc -c`).toString().trim());
firstPaint < 150_000
  ? ok(`first-paint HTML+CSS ${(firstPaint/1024).toFixed(0)} KB gzipped < 150 KB`)
  : bad(`first-paint HTML+CSS ${(firstPaint/1024).toFixed(0)} KB gzipped exceeds 150 KB`);

// Maps a dist HTML file path to the site-relative path it must canonicalise
// to, e.g. dist/index.html -> "/", dist/id/index.html -> "/id/",
// dist/404.html -> "/404".
function pagePath(p) {
  const rel = p.replace(/^dist\//, '');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
  return '/' + rel.replace(/\.html$/, '');
}

// Per-page checks — run over EVERY emitted page, not just the English
// homepage. These are structural/safety assertions that must hold
// everywhere: a lazy-loading regression, a reintroduced banned host, or a
// broken hreflang triad confined to one locale is exactly what a single-page
// gate would miss.
for (const page of pages) {
  const h = pageHtml[page];

  // Exactly one h1 — must fail on zero as well as on more than one; a naive
  // `.length ?? 0` with a truthy check would pass vacuously on a page with no
  // h1 at all, so this asserts strict equality to 1.
  const h1s = h.match(/<h1[\s>]/g)?.length ?? 0;
  h1s === 1 ? ok(`${page}: exactly one h1`) : bad(`${page}: ${h1s} h1 elements`);

  const emptyAlt = (h.match(/alt=""/g) ?? []).length;
  emptyAlt === 0 ? ok(`${page}: no empty alt`) : bad(`${page}: ${emptyAlt} images with empty alt`);

  // Every image must be lazy EXCEPT the header logo, which is above the fold on
  // every page. Lazy-loading it would delay first paint rather than help — eager
  // is deliberate there. The exception is narrow: it matches only the logo's alt
  // text, so a stray eager hero image or card screenshot still fails this check.
  const nonLazy = (h.match(/<img(?![^>]*loading="lazy")[^>]*>/g) ?? []);
  const unexpectedEager = nonLazy.filter(tag => !/alt="MHCreation"/.test(tag));
  unexpectedEager.length === 0
    ? ok(`${page}: all images lazy except the above-fold logo (${nonLazy.length} eager)`)
    : bad(`${page}: ${unexpectedEager.length} image(s) eagerly loaded that should be lazy`);

  for (const s of ['103.122.35.17', 'intranet.jlm.net.id', '123rf', 'freepik', 'jquery', 'bootstrap.bundle']) {
    h.includes(s) ? bad(`${page}: "${s}" still present`) : ok(`${page}: no ${s}`);
  }

  for (const [label, re] of [
    ['hreflang en', /hreflang="en"/],
    ['hreflang id', /hreflang="id"/],
    ['x-default', /hreflang="x-default"/],
    ['og:image', /property="og:image"/],
    ['json-ld', /"@type":"ProfessionalService"/],
  ]) (h.match(re) ? ok(`${page}: ${label}`) : bad(`${page}: missing ${label}`));

  // Canonical URLs differ per page — assert each page canonicalises to its
  // own path rather than hardcoding the English homepage URL.
  const path = pagePath(page);
  // Read the origin from the source of truth rather than hardcoding it. It WAS
  // hardcoded, to a domain this repo does not deploy to, and the gate passed
  // while production canonicalised to a different account's stale site.
  const ORIGIN = readFileSync('src/data/site.ts', 'utf8')
    .match(/origin:\s*'([^']+)'/)[1].replace(/\/$/, '');
  const expected = ORIGIN + path;
  const canonicalRe = new RegExp(
    `rel="canonical" href="${expected.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&')}"`
  );
  canonicalRe.test(h) ? ok(`${page}: canonical matches ${path}`) : bad(`${page}: canonical missing or does not match ${path}`);
}

// Meta-description length is a marketing-page SEO signal. The 404 error page
// deliberately ships a short, honest description ("That page does not
// exist.") and is not meant to rank — every other page still must carry a
// substantial one.
for (const page of pages.filter(p => !p.endsWith('404.html'))) {
  const h = pageHtml[page];
  const re = /<meta name="description" content="[^"]{80,}"/;
  re.test(h) ? ok(`${page}: meta description`) : bad(`${page}: missing meta description`);
}

// required files
for (const f of ['dist/id/index.html','dist/robots.txt','dist/sitemap-index.xml','dist/social-card.png','dist/404.html','dist/icon.svg','dist/favicon-32.png']) {
  existsSync(f) ? ok(f) : bad(`missing ${f}`);
}

// social card dimensions
if (existsSync('dist/social-card.png')) {
  const size = statSync('dist/social-card.png').size;
  size > 5_000 ? ok(`social card ${size} bytes`) : bad('social card suspiciously small');
}

console.log(fail.length ? `\n${fail.length} FAILURES\n` : '\nALL CHECKS PASSED\n');
process.exit(fail.length ? 1 : 0);
