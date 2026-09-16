// src/components/Lightbox.tsx
import { useEffect, useRef, useState } from 'preact/hooks';

export default function Lightbox({ closeLabel }: { closeLabel: string }) {
  const [shot, setShot] = useState<{ src: string; alt: string } | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-lightbox]');
      if (!el) return;
      opener.current = el;
      setShot({ src: el.dataset.lightbox!, alt: el.dataset.alt ?? '' });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!shot) return;
    closeBtn.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      const focusable = dialog.current?.querySelectorAll<HTMLElement>(
        'button, [href], img[tabindex], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [shot]);

  function close() {
    setShot(null);
    opener.current?.focus();   // return focus to the card that opened it
  }

  if (!shot) return null;

  return (
    <div ref={dialog} role="dialog" aria-modal="true" aria-label={shot.alt} onClick={close}
         className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <button ref={closeBtn} type="button" onClick={close} aria-label={closeLabel}
              className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold">
        ✕
      </button>
      <img src={shot.src} alt={shot.alt} onClick={e => e.stopPropagation()}
           className="max-h-[88vh] max-w-full rounded-lg object-contain" />
    </div>
  );
}
