// astro.config.mjs
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // This IS the mhorec organisation's user-pages repo, so GitHub Pages serves it
  // from the root of https://mhorec.github.io — no `base` path.
  site: 'https://mhorec.github.io',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [preact(), sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', id: 'id-ID' } } })],
  vite: { plugins: [tailwindcss()] },
});
