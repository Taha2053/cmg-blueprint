'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function About() {
  return (
    <section id="about" className="bg-ivoire py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div className="lg:col-span-6" {...fadeUp}>
            <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
              À Propos
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark mt-6 tracking-tight">
              Un partenaire de confiance pour des décisions éclairées
            </h2>
            <div className="space-y-5 text-text-dark-muted text-base sm:text-lg leading-relaxed mt-8">
              <p>
                Le Cabinet Mourad Guellaty est un cabinet d&apos;expertise comptable, d&apos;audit et de conseil
                établi à La Marsa, Tunis. Fondé par Mourad Guellaty, ancien président de l&apos;Ordre des
                Experts Comptables de Tunisie, le cabinet accompagne les entreprises locales et
                internationales dans leurs enjeux financiers.
              </p>
              <p>
                Spécialisé en commissariat aux comptes, audit financier, conseil en gestion et advisory,
                nous mettons notre expertise au service de votre performance.
              </p>
            </div>
            <a
              href="#services"
              className="inline-flex items-center gap-2 border border-text-dark text-text-dark px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-text-dark hover:text-light transition-all duration-300 mt-10 group"
            >
              Découvrir nos services
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </motion.div>

          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* single thin accent frame, offset */}
              <div className="pointer-events-none absolute -top-5 -left-5 w-full h-full border border-accent/25" aria-hidden />

              {/* image */}
              <div className="relative aspect-[1/1] overflow-hidden bg-[#F0F0F0] shadow-soft-lg ring-1 ring-black/[0.05]">
                <img
                  src="/cabinet.jpg"
                  alt="Bureau MG & Associés"
                  className="w-full h-full object-cover saturate-[0.85] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* heritage caption */}
              <div className="absolute -bottom-8 -left-12 bg-paper shadow-soft border-l-2 border-accent px-5 py-4 hidden sm:block">
                <div className="font-serif text-3xl text-text-dark leading-none">1982</div>
                <div className="text-[11px] tracking-[0.18em] uppercase text-text-dark-muted mt-2">
                  La Marsa · Tunis
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
