import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

let en = '', id = '';

beforeAll(() => {
  if (!existsSync('dist/index.html')) execSync('npm run build', { stdio: 'inherit' });
  en = readFileSync('dist/index.html', 'utf8');
  id = readFileSync('dist/id/index.html', 'utf8');
}, 180_000);

describe('SEO head', () => {
  it('has exactly one h1', () => {
    expect(en.match(/<h1[\s>]/g)?.length).toBe(1);
  });

  it('has a non-empty, correctly spelled meta description', () => {
    const m = en.match(/<meta name="description" content="([^"]+)"/);
    expect(m?.[1]?.length ?? 0).toBeGreaterThan(80);
    expect(en).not.toContain('descriptison');
  });

  it('has a self-referencing canonical on the right origin', () => {
    // This repo publishes to the root of https://mhorec.github.io (the mhorec
    // organisation's user-pages repo), so each page canonicalises to that origin.
    expect(en).toContain('<link rel="canonical" href="https://mhorec.github.io/"');
    expect(id).toContain('<link rel="canonical" href="https://mhorec.github.io/id/"');
  });

  it('has hreflang alternates both ways plus x-default', () => {
    for (const doc of [en, id]) {
      expect(doc).toContain('hreflang="en"');
      expect(doc).toContain('hreflang="id"');
      expect(doc).toContain('hreflang="x-default"');
    }
  });

  it('has Open Graph and Twitter card tags', () => {
    expect(en).toContain('property="og:title"');
    expect(en).toContain('property="og:image"');
    expect(en).toContain('name="twitter:card"');
  });

  it('declares the right lang on <html>', () => {
    expect(en).toContain('<html lang="en"');
    expect(id).toContain('<html lang="id"');
  });

  it('emits ProfessionalService JSON-LD with contact details', () => {
    expect(en).toContain('"@type":"ProfessionalService"');
    expect(en).toContain('Media Hore Creation');
    expect(en).toContain('+62 858 8457 1705');
  });

  it('ships no jQuery, Bootstrap or legacy vendor bundle', () => {
    expect(en).not.toMatch(/jquery|bootstrap\.bundle|owl\.carousel|isotope/i);
  });
});
