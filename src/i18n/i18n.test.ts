import { describe, it, expect } from 'vitest';
import { useTranslations, getAltPath } from './index';
import { en } from './en';
import { id } from './id';

function keys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? keys(v as Record<string, unknown>, `${prefix}${k}.`) : [`${prefix}${k}`]
  );
}

describe('i18n', () => {
  it('id has exactly the same keys as en', () => {
    expect(keys(id).sort()).toEqual(keys(en).sort());
  });

  it('no Indonesian string is left untranslated', () => {
    // Some strings are legitimately identical across both languages:
    // loanwords and proper nouns that Indonesian does not translate.
    const SAME_IN_BOTH = new Set([
      'team.roles.programmer',        // "Programmer" is the Indonesian word too
      'work.filters.ecommerce',       // "E-commerce"
    ]);
    const untranslated = keys(en).filter(k => {
      if (SAME_IN_BOTH.has(k)) return false;
      const get = (o: any) => k.split('.').reduce((a, p) => a?.[p], o);
      return get(en) === get(id);
    });
    expect(untranslated).toEqual([]);
  });

  it('looks up a nested key', () => {
    expect(useTranslations('en')('nav.work')).toBe('Work');
    expect(useTranslations('id')('nav.work')).toBe('Portofolio');
  });

  it('throws on a missing key rather than rendering undefined', () => {
    expect(() => useTranslations('en')('nav.nope')).toThrow(/nav\.nope/);
  });

  it('maps paths between languages', () => {
    expect(getAltPath('/', 'id')).toBe('/id/');
    expect(getAltPath('/id/', 'en')).toBe('/');
  });
});
