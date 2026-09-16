import { describe, it, expect } from 'vitest';
import { projects } from './projects';

describe('projects', () => {
  it('has at least the 44 migrated projects', () => {
    expect(projects.length).toBeGreaterThanOrEqual(44);
  });

  it('every project has a non-empty alt', () => {
    const bad = projects.filter(p => !p.alt || p.alt.trim() === '');
    expect(bad.map(p => p.slug)).toEqual([]);
  });

  it('slugs are unique', () => {
    const seen = new Set<string>();
    const dupes = projects.filter(p => (seen.has(p.slug) ? true : (seen.add(p.slug), false)));
    expect(dupes.map(p => p.slug)).toEqual([]);
  });

  it('no project links to the dead host or the internal intranet', () => {
    const banned = projects.filter(
      p => p.url && (p.url.includes('103.122.35.17') || p.url.includes('intranet.jlm.net.id'))
    );
    expect(banned.map(p => p.slug)).toEqual([]);
  });

  it('every url is absolute https', () => {
    const bad = projects.filter(p => p.url && !p.url.startsWith('https://'));
    expect(bad.map(p => p.slug)).toEqual([]);
  });

  it('every declared image import resolved to a real asset', () => {
    const bad = projects.filter(p => p.image !== undefined && typeof p.image.src !== 'string');
    expect(bad.map(p => p.slug)).toEqual([]);
  });

  it('every project has a screenshot', () => {
    // The 7 LinkedIn-sourced projects that once lacked one were captured from the
    // live sites. Nothing should fall back to the branded placeholder any more, so
    // a project appearing here means someone added one without an image.
    expect(projects.filter(p => !p.image).map(p => p.slug)).toEqual([]);
  });

  it('no project renders as a dead card', () => {
    // A project with neither `url` nor `image` renders as ProjectCard's `static`
    // mode — no <a>, no <button>, no "View design" label. That is handled correctly,
    // but it is never what we want: it is a card a visitor cannot act on. This set
    // must stay empty so a new project cannot silently land there.
    expect(
      projects.filter(p => !p.url && !p.image).map(p => p.slug).sort()
    ).toEqual([]);
  });

  it('the internal client SSO is never linked', () => {
    // Intranet JLM has a screenshot (its public landing screen) but must never carry
    // a url — it is PT. Jala Lintas Media's internal staff system.
    const jlm = projects.find(p => p.slug === 'intranet-jlm');
    expect(jlm).toBeDefined();
    expect(jlm!.url).toBeUndefined();
  });

  it('removed projects stay removed', () => {
    const slugs = projects.map(p => p.slug);
    expect(slugs).not.toContain('rma300');
    expect(slugs).not.toContain('nfs-community');
  });
});
