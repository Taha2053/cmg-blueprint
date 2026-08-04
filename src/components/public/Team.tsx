'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlipVertical2 } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

type Member = {
  name: string;
  role: string;
  photo?: string;
  initials?: string;
  pool?: string;
  description?: string;
};

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
  {
    name: 'Haythem Belhadj',
    role: 'Manager',
    photo: '/cabinet/Haythem_belhadj.png',
    pool: 'Pôle Entreprises Publiques',
    description:
      "Fort d'une solide expérience de plus de 15 ans dans l'audit et le commissariat aux comptes des entreprises et établissements publics, il accompagne depuis plusieurs années des organismes de différentes tailles et secteurs d'activité. Son expertise couvre les missions d'audit légal, l'évaluation des dispositifs de contrôle interne, l'analyse des risques et l'accompagnement des projets de gouvernance et de transformation du secteur public.",
  },
  {
    name: 'Salem Ben Salah',
    role: 'Manager',
    photo: '/cabinet/Salem_Ben_Salah.png',
    pool: 'Pôle Institutions Financières Résidentes',
    description:
      "Il possède une expérience reconnue de plus de 15 ans dans l'audit des banques et des institutions financières résidentes. Au cours de son parcours, il a conduit de nombreuses missions auprès d'établissements bancaires, de sociétés de leasing et d'autres acteurs du secteur financier. Son expertise porte notamment sur les exigences prudentielles, le contrôle interne, la gestion des risques et les problématiques comptables propres aux institutions financières.",
  },
  {
    name: 'Sofiene Dahbi',
    role: 'Manager',
    photo: '/cabinet/Dahbi_Sofiene.png',
    pool: 'Pôle Consolidation et Normes IFRS',
    description:
      "Spécialiste des normes internationales d'information financière (IFRS) et de la consolidation des états financiers, il accompagne les groupes nationaux et internationaux dans leurs projets de reporting financier. Son expérience couvre les opérations de consolidation complexes, les conversions vers les référentiels IFRS, l'assistance technique aux directions financières ainsi que le traitement des problématiques comptables à forte technicité.",
  },
  {
    name: 'Hafedh Kharrat',
    role: 'Manager',
    photo: '/cabinet/Hafedh-kharrat.png',
    pool: 'Pôle Institutions Financières Non Résidentes',
    description:
      "Il dispose d'une expertise approfondie dans l'audit des banques et établissements financiers non résidents opérant en Tunisie. Son expérience lui permet d'intervenir sur des missions intégrant les exigences réglementaires locales, les standards internationaux d'audit ainsi que les problématiques spécifiques liées aux activités financières transfrontalières et à la gestion des risques.",
  },
  {
    name: 'Ayman El Euch',
    role: 'Manager',
    photo: '/cabinet/Ayman-El-Euch.png',
    pool: 'Pôle Audit Industriel',
    description:
      "Il bénéficie d'une expérience significative dans l'audit d'entreprises industrielles évoluant dans des secteurs variés. Son expertise couvre l'analyse des processus industriels, l'évaluation des dispositifs de contrôle interne, la maîtrise des risques opérationnels et l'accompagnement des groupes industriels. Il intervient sur des missions de conseil fiscal, de revue de conformité, d'assistance lors des contrôles fiscaux et d'optimisation fiscale dans le respect de la réglementation en vigueur.",
  },
];

function Avatar({ m, size, delay = 0, zoom = 1 }: { m: Member; size: 'lg' | 'md'; delay?: number; zoom?: number }) {
  const isFounder = m.role === 'Fondateur';
  const baseW = size === 'lg' ? 'w-52 sm:w-56 lg:w-64' : 'w-40 sm:w-44 lg:w-52';
  const flipW = size === 'lg' ? 'w-64 sm:w-72 lg:w-80' : 'w-48 sm:w-56 lg:w-64';
  const [flipped, setFlipped] = useState(false);

  const frontFace = m.photo ? (
    <div
      className="absolute inset-0 bg-cover bg-[position:50%_8%]"
      style={{
        backgroundImage: `url(${m.photo})`,
        backgroundSize: zoom > 1 ? `${zoom * 100}%` : undefined,
      }}
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#F2F2F2] to-[#E5E5E5]">
      <span className="font-serif text-6xl text-accent/40 select-none">{m.initials}</span>
    </div>
  );

  return (
    <motion.div
      className={`group flex flex-col items-center text-center ${m.description && flipped ? 'z-30' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className={`relative rounded-2xl overflow-hidden bg-[#F0F0F0] shadow-soft transition-all duration-500 group-hover:-translate-y-1.5 ${
          m.description
            ? `cursor-pointer ${flipped ? `${flipW} aspect-[3/5] shadow-soft-lg` : `${baseW} aspect-[3/4]`}`
            : `${baseW} aspect-[3/4] ${isFounder ? 'ring-2 ring-accent/40' : 'ring-1 ring-black/[0.06]'}`
        }`}
        style={{ perspective: '1200px' }}
        onClick={() => m.description && setFlipped((f) => !f)}
      >
        {/* rotating red border — only shown while the back description is visible,
            faded in after the flip finishes so nothing red flashes mid-transition */}
        {m.description && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={false}
            animate={flipped ? 'back' : 'front'}
            variants={{
              front: {
                opacity: 0,
                rotate: 360,
                transition: {
                  opacity: { duration: 0.15 },
                  rotate: { repeat: Infinity, ease: 'linear', duration: 14 },
                },
              },
              back: {
                opacity: 1,
                rotate: 360,
                transition: {
                  opacity: { duration: 0.4, delay: 0.65 },
                  rotate: { repeat: Infinity, ease: 'linear', duration: 14 },
                },
              },
            }}
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, #A81828 40deg, transparent 90deg, transparent 180deg, #A81828 220deg, transparent 270deg, #A81828 320deg, transparent 360deg)',
            }}
          />
        )}

        {/* card body — inset so the animated border peeks through.
            No overflow-hidden here: combining it with preserve-3d flattens
            the faces and breaks the flip. Clipping lives on each face. */}
        <div
          className="absolute inset-[2px] rounded-[15px] transition-transform duration-700 ease-out"
          style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* front face */}
          <div
            className="absolute inset-0 rounded-[15px] overflow-hidden"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            {frontFace}
            {m.description && (
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 py-3 bg-gradient-to-t from-black/60 to-transparent text-white/90 text-[11px] tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FlipVertical2 className="w-3.5 h-3.5" />
                <span>Cliquez pour découvrir</span>
              </div>
            )}
          </div>

          {/* back face */}
          <div
            className="absolute inset-0 rounded-[15px] overflow-hidden bg-[#F4F4F4]"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="h-full w-full px-4 py-4 text-left">
              {m.pool && (
                <span className="block text-accent text-[10px] tracking-[0.18em] uppercase font-semibold">
                  {m.pool}
                </span>
              )}
              <p className="mt-2 text-[12px] sm:text-[13px] leading-relaxed text-text-dark">{m.description}</p>
            </div>
          </div>
        </div>
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
            <Avatar m={walid} size="lg" delay={0.15} zoom={1.2} />
          </div>

          {/* row 2 — rest in one line */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 justify-items-center mt-14">
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