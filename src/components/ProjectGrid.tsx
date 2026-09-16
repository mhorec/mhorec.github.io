// src/components/ProjectGrid.tsx
import { useState } from 'preact/hooks';

export type Row = { slug: string; category: string };

/** Pure, so it can be unit-tested without a DOM. */
export function filterSlugs(rows: Row[], active: string): string[] {
  return rows.filter(r => active === 'all' || r.category === active).map(r => r.slug);
}

type Props = { rows: Row[]; labels: Record<string, string>; categories: string[] };

export default function ProjectGrid({ rows, labels, categories }: Props) {
  const [active, setActive] = useState('all');
  const [count, setCount] = useState(() => filterSlugs(rows, 'all').length);

  function apply(next: string) {
    setActive(next);
    const visible = new Set(filterSlugs(rows, next));
    document.querySelectorAll<HTMLElement>('[data-slug]').forEach(el => {
      el.hidden = !visible.has(el.dataset.slug ?? '');
    });
    setCount(visible.size);
  }

  return (
    <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label={labels.all}>
      {['all', ...categories].map(c => (
        <button
          key={c}
          type="button"
          onClick={() => apply(c)}
          aria-pressed={active === c}
          className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
            active === c
              ? 'border-brand-blue-ink bg-brand-blue-ink text-white'
              : 'border-line bg-white text-muted hover:border-brand-blue'
          }`}
        >
          {labels[c]}
        </button>
      ))}
      <span className="sr-only" aria-live="polite">{count} {labels.resultCount}</span>
    </div>
  );
}
