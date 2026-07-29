'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function CTABanner() {
  return (
    <section className="mirror bg-gradient-to-br from-accent via-accent to-accent-crystal py-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10" {...fadeUp}>
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.15] tracking-tight">
              Prenons rendez-vous
            </h2>
            <p className="text-white/80 text-base sm:text-lg mt-4 leading-relaxed">
              Discutons de vos enjeux et construisons ensemble des solutions adaptées.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 border-2 border-white text-white px-9 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-white hover:text-accent transition-all duration-300 group self-start lg:self-auto"
          >
            Prendre rendez-vous
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
