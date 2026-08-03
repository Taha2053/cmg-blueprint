'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const milestones = [
  { year: '1982', text: 'Fondation du cabinet Mourad Guellaty' },
  { year: '2001', text: 'Nommé président de l’Ordre des Experts Comptables de Tunisie' },
  { year: '2008', text: 'Consolidation du département audit financier' },
  { year: '2012', text: 'Développement du conseil en stratégie et gouvernance' },
  { year: '2015', text: 'MG & Associés — élargissement de l’équipe pluridisciplinaire' },
  { year: '2020', text: 'Accompagnement des transformations numériques et réglementaires' },
];

const slides = [
  { key: 'presentation', label: 'Présentation' },
  { key: 'parcours', label: 'Parcours' },
  { key: 'citation', label: 'Citation' },
];

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

/* ── Slide 1 — Présentation ─────────────────────────────────────────── */
function Presentation() {
  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      {/* portrait */}
      <div className="lg:col-span-4 relative mx-auto w-full max-w-[280px]">
        <div className="relative w-full h-[320px] sm:h-[360px]">
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[118%] max-w-none aspect-square rounded-full border border-gold/20 -z-10" />
          <div className="absolute inset-x-3 top-2 bottom-0 rounded-t-full bg-[#F2F2F2]/70 -z-10" />
          <div className="absolute inset-0 rounded-t-full overflow-hidden shadow-soft-lg ring-1 ring-black/[0.04]">
            <div className="absolute inset-0 bg-cover bg-[position:50%_8%]"
              style={{ backgroundImage: 'url(/cabinet/Mourad-Guellaty.png)' }} />
          </div>
        </div>
      </div>

      {/* identity + bio */}
      <div className="lg:col-span-8">
        <h2 className="relative z-10 font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark tracking-tight">
          Monsieur <span className="text-accent">Mourad</span>
        </h2>
        <span
          aria-hidden
          style={{ fontFamily: 'var(--font-signature), cursive' }}
          className="pointer-events-none select-none block text-5xl sm:text-6xl lg:text-7xl text-text-dark/[0.10] leading-[1.1] -mt-3 lg:-mt-5 pl-6"
        >
          Mourad Guellaty
        </span>

        <p className="font-serif text-xl lg:text-2xl leading-[1.5] text-text-dark mt-6 max-w-xl">
          Bâtir un cabinet d’excellence, c’est avant tout bâtir des hommes et des femmes de{' '}
          <span className="text-accent">confiance</span>.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 mt-8">
          <p className="text-text-dark-muted text-base sm:text-lg leading-relaxed">
            Mourad Guellaty a consacré sa vie à l’expertise comptable et à l’audit en Tunisie.
            Ancien et premier président de l’Ordre des Experts Comptables de Tunisie, il a porté la voix de la
            profession avec <span className="text-text-dark font-medium">indépendance</span> et{' '}
            <span className="text-text-dark font-medium">engagement</span>.
          </p>
          <p className="text-text-dark-muted text-base sm:text-lg leading-relaxed">
            Son leadership visionnaire a permis au cabinet de rayonner bien au-delà des frontières,
            accompagnant les plus grandes entreprises tunisiennes et internationales dans leurs
            enjeux les plus stratégiques.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 2 — Parcours ─────────────────────────────────────────────── */
function Parcours() {
  return (
    <div>
      <h2 className="font-serif text-3xl lg:text-[40px] leading-tight text-text-dark tracking-tight mb-12">
        Parcours &amp; Engagements
      </h2>
      <div className="relative">
        <div className="hidden lg:block absolute left-0 right-0 top-[5px] h-px bg-gold/30" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          {milestones.map((m, i) => (
            <div key={m.year} className="relative pt-7">
              <span
                className={`absolute left-0 top-0 w-2.5 h-2.5 rounded-full ${
                  i === 0 ? 'bg-accent' : 'bg-white border border-gold/60'
                }`}
              />
              <div
                className={`font-serif text-lg tabular-nums ${
                  i === 0 ? 'text-accent' : 'text-text-dark'
                }`}
              >
                {m.year}
              </div>
              <p className="text-text-dark-muted text-sm leading-snug mt-2">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Slide 3 — Citation ─────────────────────────────────────────────── */
function Citation() {
  return (
    <div className="max-w-3xl mx-auto text-center py-6 lg:py-10">
      <div className="flex items-center justify-center gap-5">
        <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-gold/60" />
        <span className="font-serif text-6xl text-gold/50 leading-none -mb-6 select-none">&ldquo;</span>
        <span className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-gold/60" />
      </div>
      <blockquote className="font-serif text-2xl sm:text-3xl lg:text-[34px] leading-[1.32] text-text-dark mt-4 tracking-tight">
        La confiance ne se décrète pas.
        <br />
        Elle se construit, année après année,
        <br className="hidden sm:block" /> au service de nos clients et de l’excellence.
      </blockquote>
      <div className="mt-10">
        <div className="w-8 h-px bg-gold/60 mx-auto mb-4" />
        <div className="font-serif text-lg text-text-dark">Mourad Guellaty</div>
        <div className="text-[10px] tracking-[0.24em] uppercase text-text-dark-muted mt-1.5">Fondateur</div>
      </div>
    </div>
  );
}

/* ── Static block — Walid Moussa (below the Mourad slideshow) ──────── */
function Walid() {
  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      {/* portrait */}
      <div className="lg:col-span-4 relative mx-auto w-full max-w-[280px]">
        <div className="relative w-full h-[320px] sm:h-[360px]">
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[118%] max-w-none aspect-square rounded-full border border-gold/20 -z-10" />
          <div className="absolute inset-x-3 top-2 bottom-0 rounded-t-full bg-[#F2F2F2]/70 -z-10" />
          <div className="absolute inset-0 rounded-t-full overflow-hidden shadow-soft-lg ring-1 ring-black/[0.04]">
            <div className="absolute inset-0 bg-cover bg-[position:50%_8%]"
              style={{ backgroundImage: 'url(/cabinet/Walid-Moussa.jpeg)' }} />
          </div>
        </div>
      </div>

      {/* identity + bio */}
      <div className="lg:col-span-8">
        <h2 className="relative z-10 font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark tracking-tight">
          Monsieur <span className="text-accent">Walid</span>
        </h2>
        <span
          aria-hidden
          style={{ fontFamily: 'var(--font-signature), cursive' }}
          className="pointer-events-none select-none block text-5xl sm:text-6xl lg:text-7xl text-text-dark/[0.10] leading-[1.1] -mt-3 lg:-mt-5 pl-6"
        >
          Walid Moussa
        </span>

        <p className="font-serif text-xl lg:text-2xl leading-[1.5] text-text-dark mt-6 max-w-xl">
          Expert-comptable et commissaire aux comptes (
          <span className="text-accent">Tunisie &amp; France</span>), Managing Partner.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 mt-8">
          <p className="text-text-dark-muted text-base sm:text-lg leading-relaxed">
            Walid Moussa a travaillé pendant 10 ans au sein de KPMG Audit Paris (France) dans les
            domaines de l&apos;audit et du conseil, avant de rejoindre le Cabinet Mourad Guellaty &amp;
            Associés en Tunisie en 2014.
          </p>
          <p className="text-text-dark-muted text-base sm:text-lg leading-relaxed">
            Fort de 20 années d’expérience, il a une parfaite maîtrise de la conduite des missions
            d’audit (comptes sociaux, comptes consolidés, reporting), aussi bien au niveau
            international que national, avec de solides connaissances des normes IFRS.
          </p>
          <p className="text-text-dark-muted text-base sm:text-lg leading-relaxed">
            Il est régulièrement intervenu dans des missions de conseil et d&apos;audit en
            environnement international, y compris pour des sociétés cotées, et a été en charge de la
            coordination de l’audit à l’international pour de grands groupes industriels étrangers.
          </p>
          <p className="text-text-dark-muted text-base sm:text-lg leading-relaxed">
            Depuis 2014, il intervient sur l’audit de groupes internationaux et nationaux dans divers
            secteurs : industrie, secteur financier, pharmaceutique et technologies de l’information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MerciMourad() {
  const [[i, dir], setState] = useState<[number, number]>([0, 0]);

  const go = (target: number) => {
    let n = target;
    if (n < 0) n = slides.length - 1;
    if (n >= slides.length) n = 0;
    setState([n, n > i ? 1 : -1]);
  };

  return (
    <section id="fondateur" className="relative bg-champagne py-24 lg:py-32 overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto px-6">
        {/* section kicker */}
        <div className="flex items-center gap-4 mb-10 lg:mb-12">
          <span className="h-px w-10 bg-gold" />
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            Direction
          </span>
        </div>

        {/* slide stage */}
        <div className="relative min-h-[440px] sm:min-h-[420px] lg:min-h-[400px]">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={i}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {i === 0 && <Presentation />}
              {i === 1 && <Parcours />}
              {i === 2 && <Citation />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-10 lg:mt-14 border-t border-black/10 pt-8">
          {/* chapter tabs */}
          <div className="flex items-center gap-5 sm:gap-8">
            {slides.map((s, idx) => (
              <button
                key={s.key}
                onClick={() => go(idx)}
                className={`group flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase transition-colors ${
                  idx === i ? 'text-accent font-semibold' : 'text-text-dark-muted hover:text-text-dark'
                }`}
              >
                <span className="tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                <span
                  className={`h-px transition-all duration-500 ${
                    idx === i ? 'w-6 bg-accent' : 'w-0 bg-transparent'
                  }`}
                />
                {s.label}
              </button>
            ))}
          </div>

          {/* prev / next */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => go(i - 1)}
              aria-label="Chapitre précédent"
              className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center text-text-dark hover:border-accent hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => go(i + 1)}
              aria-label="Chapitre suivant"
              className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center text-text-dark hover:border-accent hover:text-accent transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Legende — Walid Moussa (static, below the slideshow) */}
        <div className="mt-16 lg:mt-20 border-t border-black/10 pt-14 lg:pt-16">
          <Walid />
        </div>
      </div>
    </section>
  );
}
