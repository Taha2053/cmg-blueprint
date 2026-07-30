'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

type Member = { name: string; role: string; photo?: string; initials?: string };

const founder: Member = {
  name: 'Mourad Guellaty',
  role: 'Fondateur',
  initials: 'MG',
  photo: '/cabinet/Mourad-Guellaty.png',
};

const walid: Member = {
  name: 'Walid Moussa',
  role: 'Managing Partner',
  photo: '/cabinet/Walid-Moussa.jpeg',
};

const rest: Member[] = [
  { name: 'Haythem Belhadj', role: 'Manager', photo: '/cabinet/Haythem_belhadj.png' },
  { name: 'Salem Ben Salah', role: 'Manager', photo: '/cabinet/Salem_Ben_Salah.png' },
  { name: 'Sofiene Dahbi', role: 'Manager', photo: '/cabinet/Dahbi_Sofiene.png' },
  { name: 'Hafedh Kharrat', role: 'Manager', photo: '/cabinet/Hafedh-kharrat.png' },
  { name: 'Ayman El Euch', role: 'Manager', photo: '/cabinet/Ayman-El-Euch.png' },
];

function Avatar({ m, size, delay = 0 }: { m: Member; size: 'lg' | 'md'; delay?: number }) {
  const isFounder = m.role === 'Fondateur';
  const w = size === 'lg' ? 'w-52 sm:w-56 lg:w-64' : 'w-40 sm:w-44 lg:w-52';

  return (
    <motion.div
      className="group flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className={`relative ${w} aspect-[3/4] rounded-2xl overflow-hidden bg-[#E7E0D2] shadow-soft transition-all duration-500 group-hover:shadow-soft-lg group-hover:-translate-y-1.5 ${
          isFounder ? 'ring-2 ring-accent/40' : 'ring-1 ring-black/[0.06]'
        }`}
      >
        {m.photo ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-top grayscale-[0.45] sepia-[0.12] contrast-[1.03] brightness-[1.01] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${m.photo})` }}
            />
            {/* uniform warm overlay — evens out the different source backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a2620]/25 via-transparent to-[#f2ede3]/10 mix-blend-multiply opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#E9DFCB] to-[#D8C9AC]">
            <span className="font-serif text-6xl text-[#A98C5B]/60 select-none">{m.initials}</span>
          </div>
        )}
        {/* subtle bottom gradient for depth */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <h3 className="font-serif text-lg lg:text-xl text-text-dark mt-4 group-hover:text-accent transition-colors">
        {m.name}
      </h3>
      <p
        className={`text-[11px] tracking-[0.2em] uppercase mt-1.5 ${
          isFounder ? 'text-accent font-semibold' : 'text-text-dark-muted'
        }`}
      >
        {m.role}
      </p>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section id="team" className="relative bg-gris py-24 lg:py-32 overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto px-6">
        <motion.div className="text-center max-w-3xl mx-auto" {...fadeUp}>
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            Notre Équipe
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark mt-6 tracking-tight">
            Une équipe pluridisciplinaire au service de votre performance
          </h2>
          <p className="text-text-dark-muted text-base sm:text-lg mt-8 leading-relaxed">
            MG &amp; Associés réunit des experts-comptables, commissaires aux comptes et conseillers
            spécialisés, capables d&apos;intervenir sur l&apos;ensemble des métiers de la finance,
            de l&apos;audit et du conseil.
          </p>
        </motion.div>

        {/* ── Team Grid ────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center mt-20 lg:mt-24">
          {/* row 1 — founder + Walid */}
          <div className="flex justify-center items-end gap-8 lg:gap-12">
            <Avatar m={founder} size="lg" />
            <Avatar m={walid} size="lg" delay={0.15} />
          </div>

          {/* row 2 — rest in one line */}
          <div className="flex flex-wrap justify-center gap-x-8 lg:gap-x-12 gap-y-12 mt-14">
            {rest.map((m, i) => (
              <Avatar key={m.name} m={m} size="md" delay={(i + 1) * 0.1} />
            ))}
          </div>
        </div>

        {/* ── Closing quote ────────────────────────────────────────────── */}
        <motion.div className="max-w-3xl mx-auto mt-24 pt-16 border-t border-black/10 text-center" {...fadeUp}>
          <span className="font-serif text-[80px] leading-none text-accent/10 select-none block">
            &ldquo;
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl leading-[1.2] text-text-dark -mt-10 tracking-tight">
            Notre force réside dans la diversité de nos expertises
            <br />
            et notre engagement collectif pour l&apos;excellence.
          </blockquote>
          <div className="mt-8">
            <div className="w-10 h-px bg-accent mx-auto mb-4" />
            <cite className="text-sm text-text-dark-muted not-italic">
              L&apos;équipe MG &amp; Associés
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
