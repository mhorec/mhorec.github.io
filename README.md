# MHCreation — mhorec.github.io

Company site for **Media Hore Creation** (MHCreation), a software development and
IT consultancy in Depok, Indonesia.

Live at **https://mhorec.github.io** — English at `/`, Indonesian at `/id/`.

Built with [Astro](https://astro.build) + [Preact](https://preactjs.com) +
[Tailwind CSS 4](https://tailwindcss.com), deployed to GitHub Pages by GitHub Actions.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built output locally |
| `npm test` | Vitest — i18n parity, project data, SEO output |
| `npm run check` | `astro check` type checking |
| `npm run verify` | Build, then assert every performance and SEO claim |

Requires **Node 22.12 or newer** (Astro 7).

---

## How it's put together

```
src/
  data/
    projects.ts        45 projects — the single source of portfolio truth
    services.ts        the six service lines
    team.ts            team members and their links
    site.ts            name, contact details, address, canonical origin
  i18n/
    en.ts  id.ts       all user-facing copy, one key set, two languages
    index.ts           useTranslations(), getAltPath()
  components/          .astro sections + two Preact islands
  layouts/Base.astro   <head>, SEO tags, JSON-LD
  pages/
    index.astro        English, served at /
    id/index.astro     Indonesian, served at /id/
    404.astro
  assets/
    portfolio/         project screenshots (Astro optimises these)
    clients/           official client logos
scripts/
  make-icons.mjs       generates the favicon set and social card
  verify.mjs           the build gate — see below
```

**Almost nothing ships JavaScript.** Every section is a static `.astro` component.
Only two Preact islands exist — `ProjectGrid.tsx` (category filter) and
`Lightbox.tsx` (design viewer) — and the whole JS payload is about **10 KB gzipped**.
A first page load downloads the HTML, one CSS file and one font: **zero images**,
because every card image is lazy-loaded.

---

## Adding or changing a project

Everything lives in `src/data/projects.ts`.

1. Put the screenshot in `src/assets/portfolio/`
2. Import it at the top of the file
3. Add an entry

```ts
{
  slug: 'siva-kemenperin',
  title: 'SIVA Kemenperin',
  category: 'government',
  summary: 'Verification and reporting platform for the Ministry of Industry.',
  summary_id: 'Platform verifikasi dan pelaporan untuk Kementerian Perindustrian.',
  image: img_siva,
  alt: 'SIVA Kemenperin verification platform homepage',
  url: 'https://siva.kemenperin.go.id/',   // optional
  credit: 'PT. Natieva Global',            // optional
  stack: ['PHP', 'Laravel'],
  year: 2021,
  featured: true,
}
```

### The `url` field decides how the card behaves

| | Card renders as | On click |
|---|---|---|
| has `url` | `<a target="_blank">` showing the destination host | opens the live site |
| no `url`, has `image` | `<button>` labelled "View design" | opens the lightbox |
| neither | non-interactive `<div>` | nothing — **avoid this** |

A test fails the build if any project ends up in that third row, because it would
render a card a visitor cannot act on.

### Rules the tests enforce

- `alt` must be present and non-empty on every project
- every `url` must be absolute `https://`
- no project may link to `103.122.35.17` (a dead host) or `intranet.jlm.net.id`
  (a client's internal staff system)
- `summary_id` should be present so `/id/` is not half-English
- use `credit` for work delivered while employed by another agency — the site
  deliberately does not claim client relationships MHCreation does not have

---

## Translations

English lives in `src/i18n/en.ts`, Indonesian in `src/i18n/id.ts`.

The two files **must have identical key structures**, and no Indonesian string may
be byte-identical to its English source unless it appears in the `SAME_IN_BOTH`
allowlist in `src/i18n/i18n.test.ts` (for words like "Programmer" that genuinely
do not translate). `npm test` enforces both.

`useTranslations(lang)` **throws** on a missing key rather than rendering blank —
a typo fails the build loudly instead of shipping an empty heading.

English and Indonesian are separate, real, indexable pages wired together with
`hreflang`. The language toggle is a plain link, not a JavaScript text swap, so
both versions can rank in search.

---

## The verification gate

`npm run verify` builds the site and then asserts the claims this project makes.
It runs in CI on every push and **fails the build** rather than warning.

It checks, across `/`, `/id/` and `404.html` individually:

- JavaScript stays under 150 KB gzipped, and no bundle ships unreferenced
- no single image exceeds 1.6 MB (catches an unoptimised original leaking in)
- every image is lazy-loaded
- first-paint HTML + CSS stays under 150 KB gzipped
- exactly one `<h1>` per page, and no empty `alt`
- meta description, canonical, `hreflang` (en / id / x-default), `og:image`, JSON-LD
- no banned host, no stock-photo hotlink, no jQuery or Bootstrap residue
- `robots.txt`, `sitemap-index.xml`, the social card and the icon set all exist

---

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which runs
`npm ci` → `astro check` → `npm test` → `npm run build` and publishes `dist/`
to GitHub Pages.

The repository's **Settings → Pages → Source** must be set to **GitHub Actions**.

### Icons and social card

```bash
node scripts/make-icons.mjs
```

Regenerates `public/` — favicon, apple-touch-icon, PWA icons and the 1200×630
social card. Only needed if the brand mark changes. Note that `sharp` has no ICO
encoder, so the site ships SVG + PNG favicons rather than a `.ico`.

---

## Conventions worth knowing

These each caused a real bug during the rebuild:

- **Preact, not React.** Import hooks from `preact/hooks`.
- **Tailwind 4 colour syntax.** Write `bg-brand-blue`, not `bg-[--color-brand-blue]` —
  the v3 shorthand was removed in v4 and compiles to *nothing*, silently leaving
  elements unstyled.
- **No literal hex in `src/components/`.** Everything goes through the tokens in
  `src/styles/global.css`.
- **Text and button fills use the `-ink` colour variants.** The logo's blue and
  green fail WCAG AA contrast when they carry text (2.79:1 and 4.06:1 against a
  4.5:1 requirement), so `brand-blue-ink` and `brand-green-ink` exist for that.
  The plain brand hues are for artwork, borders and decorative shapes only.
- **A component that renders `null` until used cannot be `client:visible`.** It has
  no box, so the observer never fires and the island never hydrates. Use
  `client:idle` — this is why the lightbox works.

---

## Licence

Source code © Media Hore Creation. Client logos and project screenshots remain the
property of their respective owners and appear here as portfolio references.
