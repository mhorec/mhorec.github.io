import { en } from './en';
import { id } from './id';

export type Lang = 'en' | 'id';
export const languages: Lang[] = ['en', 'id'];
export const defaultLang: Lang = 'en';

const dictionaries = { en, id } as const;

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const value = key
      .split('.')
      .reduce<unknown>((acc, part) => (acc as Record<string, unknown> | undefined)?.[part], dictionaries[lang]);
    if (typeof value !== 'string') {
      throw new Error(`Missing translation for "${key}" in "${lang}"`);
    }
    return value;
  };
}

/** Maps a path to its counterpart in the other language. */
export function getAltPath(path: string, target: Lang): string {
  const bare = path.replace(/^\/id(?=\/|$)/, '') || '/';
  if (target === 'en') return bare;
  return bare === '/' ? '/id/' : `/id${bare}`;
}
