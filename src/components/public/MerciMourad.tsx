'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const milestones = [
  { year: '1982', text: 'Fondation du cabinet Mourad Guellaty' },
  { year: '2001', text: 'Nommé président de l’Ordre des Experts Comptables de Tunisie' },
  { year: '2008', text: 'Consolidation du département audit financier' },
  { year: '2012', text: 'Développement du conseil en stratégie et gouvernance' },
  { year: '2015', text: 'MG & Associés — élargissement de l’équipe pluridisciplinaire' },
  { year: '2020', text: 'Accompagnement des transformations numériques et réglementaires' },
];

export default function MerciMourad() {
  return (
    <section id="fondateur" className="relative bg-champagne py-24 lg:py-32 overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* ── Row 1 — portrait paired with the heading block ───────────── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Portrait ──────────────────────────────────────────────── */}
          <motion.div
            className="lg:col-span-4 relative mx-auto w-full max-w-[280px] sm:max-w-[300px]"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative w-full h-[300px] sm:h-[340px] lg:h-[370px]">
              {/* thin gold ring behind the arch */}
              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[118%] max-w-none aspect-square rounded-full border border-gold/20 -z-10" />
              {/* champagne fill behind */}
              <div className="absolute inset-x-3 top-2 bottom-0 rounded-t-full bg-[#EFE6D4]/70 -z-10" />
              {/* arched portrait */}
              <div className="absolute inset-0 rounded-t-full overflow-hidden shadow-soft-lg ring-1 ring-black/[0.04]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#E9DFCB] to-[#D8C9AC]" />
                <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_16%,rgba(255,255,255,0.55)_0%,transparent_70%)]" />
                {/* monogram placeholder — a photo at /founder.jpg will cover this */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6 select-none">
                  <span className="font-serif leading-none text-[#A98C5B]/50 text-[68px] lg:text-[84px]">
                    MG
                  </span>
                  <span className="w-10 h-px bg-gold/50" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#8A7550]/80">
                    Mourad Guellaty
                  </span>
                </div>
                {/* Real portrait goes here: drop the file at public/founder.jpg
                    and restore a div with backgroundImage: 'url(/founder.jpg)'.
                    Until then the MG monogram above is shown. */}
              </div>
            </div>
          </motion.div>

          {/* ── Right content ─────────────────────────────────────────── */}
          <div className="lg:col-span-8">
            {/* label */}
            <motion.div className="flex items-center gap-4" {...fadeUp}>
              <span className="h-px w-10 bg-gold" />
              <span className="text-[#9C7F56] text-[11px] font-semibold tracking-[0.28em] uppercase">
                Fondateur
              </span>
            </motion.div>

            {/* heading + signature */}
            <motion.div className="relative mt-6" {...fadeUp}>
              <h2 className="relative z-10 font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.04] text-text-dark tracking-tight">
                Monsieur <span className="text-accent">Mourad</span>
              </h2>
              <span
                aria-hidden
                style={{ fontFamily: 'var(--font-signature), cursive' }}
                className="pointer-events-none select-none block text-6xl sm:text-7xl lg:text-8xl text-text-dark/[0.12] leading-[1.1] -mt-4 lg:-mt-7 pl-6"
              >
                Mourad Guellaty
              </span>
            </motion.div>

            {/* lead sentence */}
            <motion.p
              className="font-serif text-xl lg:text-2xl leading-[1.5] text-text-dark mt-8 max-w-xl"
              {...fadeUp}
            >
              Bâtir un cabinet d’excellence, c’est avant tout bâtir des hommes
              et des femmes de <span className="text-accent">confiance</span>.
            </motion.p>
          </div>
        </div>

        {/* ── Row 2 — biography, two columns of text ───────────────────── */}
        <motion.div className="grid md:grid-cols-2 gap-10 lg:gap-16 mt-14 lg:mt-20" {...fadeUp}>
          <p className="text-text-dark-muted text-[15px] leading-[1.75]">
            Mourad Guellaty a consacré sa vie à l’expertise comptable et à l’audit
            en Tunisie. Ancien président de l’Ordre des Experts Comptables de Tunisie,
            il a porté la voix de la profession avec{' '}
            <span className="text-text-dark font-medium">indépendance</span> et{' '}
            <span className="text-text-dark font-medium">engagement</span>.
          </p>
          <p className="text-text-dark-muted text-[15px] leading-[1.75]">
            Son leadership visionnaire a permis au cabinet de rayonner bien au-delà
            des frontières, accompagnant les plus grandes entreprises tunisiennes
            et internationales dans leurs enjeux les plus stratégiques.
          </p>
        </motion.div>

        {/* ── Row 3 — horizontal timeline ──────────────────────────────── */}
        <motion.div className="relative mt-20 lg:mt-24" {...fadeUp}>
          {/* the axis, drawn only where all six sit on one line */}
          <div className="hidden lg:block absolute left-0 right-0 top-[5px] h-px bg-gold/30" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative pt-7">
                <span
                  className={`absolute left-0 top-0 w-2.5 h-2.5 rounded-full ${
                    i === 0 ? 'bg-accent' : 'bg-[#F3ECDD] border border-gold/60'
                  }`}
                />
                <div
                  className={`font-serif text-lg tabular-nums ${
                    i === 0 ? 'text-accent' : 'text-text-dark'
                  }`}
                >
                  {m.year}
                </div>
                <p className="text-text-dark-muted text-[13px] leading-snug mt-2">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Row 3 — quote centerpiece ────────────────────────────────── */}
        <motion.div className="mt-20 lg:mt-28 max-w-3xl mx-auto text-center" {...fadeUp}>
              <div className="flex items-center justify-center gap-5">
                <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-gold/60" />
                <span className="font-serif text-6xl text-gold/50 leading-none -mb-6 select-none">
                  &ldquo;
                </span>
                <span className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-gold/60" />
              </div>
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-[32px] leading-[1.32] text-text-dark mt-4 tracking-tight">
                La confiance ne se décrète pas.
                <br />
                Elle se construit, année après année,
                <br className="hidden sm:block" /> au service de nos clients et de l’excellence.
              </blockquote>
              <div className="mt-8">
                <div className="w-8 h-px bg-gold/60 mx-auto mb-4" />
                <div className="font-serif text-lg text-text-dark">Mourad Guellaty</div>
                <div className="text-[10px] tracking-[0.24em] uppercase text-text-dark-muted mt-1.5">
                  Fondateur
                </div>
              </div>
        </motion.div>
      </div>
    </section>
  );
}
