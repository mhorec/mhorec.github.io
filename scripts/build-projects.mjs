// Parses the legacy index.html portfolio section into a draft projects array.
// Run once; the output is then hand-edited. Not part of the build.
import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const section = html.match(/id="portfolio"([\s\S]*?)id="team"/)[1];
const blocks = [...section.matchAll(
  /<div class="col-lg-4[^"]*portfolio-item ([^"]*)"([\s\S]*?)(?=<div class="col-lg-4|$)/g
)];

const DEAD = '103.122.35.17';
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const rows = blocks.map(([, cls, body]) => {
  const img = body.match(/src="assets\/img\/portfolio\/([^"]+)"/)?.[1] ?? '';
  const title = body.match(/<h4><a[^>]*>([\s\S]*?)<\/a>/)?.[1].trim() ?? '';
  const href = body.match(/<h4><a href="([^"]+)"/)?.[1] ?? '';
  const legacy = (cls.match(/filter-(\w+)/)?.[1]) ?? 'web';
  const url = href.startsWith('http') && !href.includes(DEAD) ? href : undefined;
  return {
    slug: slugify(title),
    title,
    category: legacy === 'design' ? 'design' : legacy === 'app' ? 'app' : 'business',
    file: img,
    url,
  };
});

const body = rows.map(r => `  {
    slug: ${JSON.stringify(r.slug)},
    title: ${JSON.stringify(r.title)},
    category: ${JSON.stringify(r.category)},
    summary: 'TODO',
    image: img_${r.slug.replace(/-/g, '_')},
    alt: ${JSON.stringify(`${r.title} — screenshot`)},${r.url ? `\n    url: ${JSON.stringify(r.url.replace(/^http:/, 'https:'))},` : ''}
  },`).join('\n');

const imports = rows.map(r =>
  `import img_${r.slug.replace(/-/g, '_')} from '../assets/portfolio/${r.file}';`
).join('\n');

writeFileSync('src/data/projects.generated.txt', `${imports}\n\nexport const generated = [\n${body}\n];\n`);
console.log(`parsed ${rows.length} projects -> src/data/projects.generated.txt`);
