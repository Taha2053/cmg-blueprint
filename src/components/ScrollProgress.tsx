'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** A slim reading-progress line pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] pointer-events-none bg-gradient-to-r from-accent via-accent to-gold"
    />
  );
}
