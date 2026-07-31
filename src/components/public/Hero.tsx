'use client';

import { motion } from 'framer-motion';

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
};

const wordGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const word = {
  hidden: { opacity: 0, y: '0.4em', filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

const headlineWords = ['L’expertise', 'au', 'service', 'de', 'votre'];

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen bg-dark overflow-hidden">
      <div className="absolute inset-0 overflow-hidden hero-video-wrapper">
        <video
          className="absolute inset-0 h-full w-full object-cover saturate-50 brightness-[0.72] contrast-[1.05] hero-video"
          src="/hero-video.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <style>{`
        .hero-video-wrapper {
          will-change: transform;
        }
        .hero-video {
          will-change: transform;
          animation: heroFloat 14s ease-in-out infinite;
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.015); }
        }
      `}</style>
      <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-dark/40 to-dark/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.03)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 min-h-screen flex items-center">
        <div className="w-full">
          <motion.div className="max-w-3xl" variants={container} initial="hidden" animate="show">
            <motion.span
              variants={item}
              className="block text-accent text-xs font-semibold tracking-[0.18em] uppercase"
            >
              Audit &amp; Conseil
            </motion.span>

            <motion.h1
              variants={wordGroup}
              className="font-serif text-5xl sm:text-6xl lg:text-[72px] leading-[1.08] text-white mt-8 tracking-tight"
            >
              {headlineWords.map((w, i) => (
                <motion.span key={i} variants={word} className="inline-block mr-[0.28em]">
                  {w}
                </motion.span>
              ))}
              <motion.span variants={word} className="inline-block italic text-accent">
                performance
              </motion.span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-white/75 text-base sm:text-lg mt-6 max-w-xl leading-relaxed"
            >
              Cabinet Mourad Guellaty accompagne les entreprises à chaque étape
              de leur développement avec rigueur, indépendance et engagement.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 mt-10">
              <a
                href="#services"
                className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-[0_12px_34px_-10px_rgba(168,24,40,0.6)] transition-all duration-300 group"
              >
                Découvrir nos services
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
              <a
                href="#about"
                className="inline-flex items-center px-8 py-4 text-sm font-semibold tracking-wider uppercase text-white/80 border border-white/30 hover:border-white hover:text-white transition-all duration-300"
              >
                En savoir plus
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#fondateur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/60 hover:text-white transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">Défiler</span>
        <span className="relative block w-px h-9 bg-white/25 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-white/90"
            animate={{ y: [-12, 36] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  );
}
