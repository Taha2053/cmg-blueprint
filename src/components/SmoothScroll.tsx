'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

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
      const targetScroll = rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2;
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
