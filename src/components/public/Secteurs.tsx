'use client';

import { motion } from 'framer-motion';

const secteurs = [
  { title: 'Banques et institutions financières', desc: 'Banques, assurances, sociétés de services et institutions financières.', img: '/images/secteurs/banques.jpg' },
  { title: 'Industrie agroalimentaire', desc: 'Industries agroalimentaires et unités de production.', img: '/images/secteurs/agroalimentaire.jpg' },
  { title: 'Secteur agricole', desc: 'Exploitations agricoles et filières agro-industrielles.', img: '/images/secteurs/agricole.jpg' },
  { title: 'Industrie chimique', desc: 'Industries chimiques et unités de transformation.', img: '/images/secteurs/chimique.jpg' },
  { title: 'Industrie pharmaceutique', desc: 'Laboratoires pharmaceutiques et établissements de santé.', img: '/images/secteurs/pharmaceutique.jpg' },
  { title: 'Cisternes, bâtiments et travaux publics', desc: 'Construction, BTP et aménagement urbain.', img: '/images/secteurs/btp.jpg' },
  { title: 'Secteur hôtelier', desc: 'Hôtels, resorts et établissements touristiques.', img: '/images/secteurs/hotelier.jpg' },
  { title: 'Secteur commercial', desc: 'Grande distribution, commerces et surfaces de vente.', img: '/images/secteurs/commercial.jpg' },
  { title: 'Industrie mécanique', desc: 'Industries mécaniques et unités de fabrication.', img: '/images/secteurs/mecanique.jpg' },
  { title: 'Cliniques', desc: 'Cliniques, laboratoires et établissements de soins.', img: '/images/secteurs/cliniques.jpg' },
  { title: 'Secteur de télécommunication', desc: 'Télécommunications et technologies de l\'information.', img: '/images/secteurs/telecom.jpg' },
  { title: 'Secteur pétrolier', desc: 'Industrie pétrolière, raffinage et distribution.', img: '/images/secteurs/petrolier.jpg' },
  { title: 'Promotion immobilière', desc: 'Promotion immobilière et développement foncier.', img: '/images/secteurs/immobiliere.jpg' },
  { title: 'Industrie d\'hygiène', desc: 'Produits d\'hygiène, cosmétiques et détergents.', img: '/images/secteurs/hygiene.jpg' },
];

const fadeUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Secteurs() {
  return (
    <section id="sectors" className="bg-ivoire py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div className="mb-16" {...fadeUp}>
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            Secteurs d&apos;Activité
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark mt-6 tracking-tight max-w-3xl">
            Une expertise multisectorielle reconnue
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secteurs.map((s, i) => (
            <motion.div
              key={i}
              className="group relative min-h-[320px] overflow-hidden rounded-2xl bg-light cursor-pointer"
              {...fadeUp}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${s.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="relative z-10 flex flex-col justify-end h-full p-8">
                <span className="text-white/30 font-serif text-5xl leading-none mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-2xl text-white mb-3 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
