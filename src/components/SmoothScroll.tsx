'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lenis from 'lenis';

/**
 * Height of the fixed header (px). Nav clicks land the section title
 * just below it, with a small breathing gap.
 */
const HEADER_HEIGHT = 100;

/**
 * In-page anchors that should scroll to the very top of the page
 * (hero / accueil) rather than to a heading.
 */
const scrollToTop: Record<string, boolean> = {
  accueil: true,
};

/**
 * Extra breathing room (px) added on top of the base gap for these sections.
 */
const extraGap: Record<string, number> = {
  team: 10,
  contact: 10,
};

/**
 * Momentum smooth-scrolling (Lenis). Also upgrades in-page anchor links to
 * ease to their target with an offset that clears the fixed header.
 * Fully disabled when the visitor prefers reduced motion.
 */
export default function SmoothScroll() {
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function scrollToId(id: string) {
      const key = id.slice(1);
      if (scrollToTop[key]) {
        lenis.scrollTo(0);
        return;
      }
      const target = document.querySelector(id);
      if (!target) return;
      const title = target.querySelector('h1, h2') ?? target;
      const rect = title.getBoundingClientRect();
      lenis.scrollTo(Math.max(0, rect.top + window.scrollY - HEADER_HEIGHT - 20 - (extraGap[key] ?? 0)));
    }

    // ease anchor clicks, offset for the fixed header
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      const id = url.hash;
      if (!id || id === '#') return;

      e.preventDefault();

      if (url.pathname === window.location.pathname) {
        scrollToId(id);
        history.pushState(null, '', id);
        return;
      }

      // cross-page: navigate first, then scroll once the section exists
      router.push(url.pathname + url.hash);
      let frames = 0;
      const scrollAfterNav = () => {
        if (frames++ > 60) return;
        if (document.querySelector(id)) {
          scrollToId(id);
          return;
        }
        requestAnimationFrame(scrollAfterNav);
      };
      requestAnimationFrame(scrollAfterNav);
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
  }, [router]);

  return null;
}
