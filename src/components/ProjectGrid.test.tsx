// src/components/ProjectGrid.test.tsx
import { describe, it, expect } from 'vitest';
import { filterSlugs } from './ProjectGrid';

const rows = [
  { slug: 'a', category: 'government' },
  { slug: 'b', category: 'design' },
  { slug: 'c', category: 'government' },
];

describe('filterSlugs', () => {
  it('returns everything for "all"', () => {
    expect(filterSlugs(rows, 'all')).toEqual(['a', 'b', 'c']);
  });
  it('filters by category', () => {
    expect(filterSlugs(rows, 'government')).toEqual(['a', 'c']);
  });
  it('returns an empty list for an unused category', () => {
    expect(filterSlugs(rows, 'app')).toEqual([]);
  });
});
