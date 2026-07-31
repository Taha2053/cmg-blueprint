'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Extra vertical shift (px) applied after centering, keyed by section id.
 * Positive pushes the section higher in the viewport (reveals more below).
 */
const sectionShift: Record<string, number> = {
  fondateur: -75,
  about: -50,
  services: 100,
  team: -40,
  news: -40,
};

/**
 * Sections that should land at their top (just below the fixed header)
 * instead of being centered in the viewport.
 */
const sectionAlignTop: Record<string, boolean> = {
  sectors: true,
  articles: true,
};

/**
 * Momentum smooth-scrolling (Lenis). Also upgrades in-page anchor links to
 * ease to their target with an offset that clears the fixed header.
 * Fully disabled when the visitor prefers reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // ease in-page anchor clicks, offset for the fixed header
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname) return; // let cross-page nav happen
      const id = url.hash;
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const rect = target.getBoundingClientRect();
      const key = id.slice(1);
      const shift = sectionShift[key] ?? 0;
      const targetScroll = sectionAlignTop[key]
        ? rect.top + window.scrollY - 96 + shift
        : rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2 + shift;
      lenis.scrollTo(Math.max(0, targetScroll));
      history.pushState(null, '', id);
    }
    document.addEventListener('click', onClick);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
