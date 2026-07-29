'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

/**
 * A brief branded intro — the logo and name settle in, a gold line draws,
 * then the whole panel lifts away to reveal the site. Shows once per session
 * and is fully skipped for reduced-motion visitors.
 */
export default function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || sessionStorage.getItem('mg-intro')) {
      setShow(false);
      return;
    }
    sessionStorage.setItem('mg-intro', '1');
    const t = setTimeout(() => setShow(false), 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-champagne"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center">
            <motion.img
              src="/logo.png"
              alt="MG & Associés"
              className="w-16 h-16"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            <div className="mt-5 overflow-hidden">
              <motion.span
                className="block font-serif text-lg sm:text-xl tracking-[0.08em] text-text-dark"
                initial={{ y: '115%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              >
                CABINET MOURAD GUELLATY
              </motion.span>
            </div>
            <div className="mt-2 overflow-hidden">
              <motion.span
                className="block text-[10px] tracking-[0.35em] uppercase text-text-dark-muted"
                initial={{ y: '115%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
              >
                MG &amp; Associés
              </motion.span>
            </div>
            <motion.span
              className="block h-px bg-gold mt-6"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
