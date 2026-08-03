'use client';

import { motion } from 'framer-motion';

const secteurs = [
  { title: 'Banques & institutions financières', desc: 'Banques, assurances et institutions financières.', img: '/images/sectors/financier.jpg' },
  { title: 'Bâtiments et travaux publics', desc: 'Construction, BTP et aménagement urbain.', img: '/images/sectors/btp.jpg' },
  { title: 'Cliniques et des soins de santé', desc: 'Cliniques, laboratoires et établissements de soins.', img: '/images/sectors/cliniques.jpg' },
  { title: 'Industrie agroalimentaire', desc: 'Industries agroalimentaires et unités de production.', img: '/images/sectors/agroalimentaire.jpg' },
  { title: 'Industrie chimique', desc: 'Industries chimiques et unités de transformation.', img: '/images/sectors/chimique.jpg' },
  { title: 'Industrie d\'hygiène', desc: 'Produits d\'hygiène, cosmétiques et détergents.', img: '/images/sectors/hygiene.jpg' },
  { title: 'Industrie mécanique', desc: 'Industries mécaniques et unités de fabrication.', img: '/images/sectors/mecanique.jpg' },
  { title: 'Industrie pétrolière', desc: 'Industrie pétrolière, raffinage et distribution.', img: '/images/sectors/petrolier.jpg' },
  { title: 'Industrie pharmaceutique', desc: 'Laboratoires pharmaceutiques et établissements de santé.', img: '/images/sectors/pharmaceutique.jpg' },
  { title: 'Industries des matériaux de construction', desc: 'Matériaux de construction et unités de production.', img: '/images/sectors/materiaux-construction.jpg' },
  { title: 'Industries textiles et habillement', desc: 'Textiles, habillement et filières de production.', img: '/images/sectors/textile.jpg' },
  { title: 'Promotion immobilière', desc: 'Promotion immobilière et développement foncier.', img: '/images/sectors/immobiliere.jpg' },
  { title: 'Secteur agricole', desc: 'Exploitations agricoles et filières agro-industrielles.', img: '/images/sectors/agricole.jpg' },
  { title: 'Secteur commercial', desc: 'Grande distribution, commerces et surfaces de vente.', img: '/images/sectors/commercial.jpg' },
  { title: 'Secteur de télécommunication', desc: 'Télécommunications et technologies de l\'information.', img: '/images/sectors/telecom.jpg' },
  { title: 'Secteur hôtelier', desc: 'Hôtels, resorts et établissements touristiques.', img: '/images/sectors/hotelier.jpg' },
  { title: 'Secteur logistique', desc: 'Logistique, transport et chaînes d\'approvisionnement.', img: '/images/sectors/logistique.jpg' },
  { title: 'Startups', desc: 'Startups et entreprises innovantes.', img: '/images/sectors/startups.jpg' },
  { title: 'Énergies renouvelables', desc: 'Énergies vertes et transition énergétique.', img: '/images/sectors/energies-renouvelables.jpg' },
  { title: 'Secteur des technologies', desc: 'Technologies de l\'information et innovation.', img: '/images/sectors/technologies.jpg' },
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
