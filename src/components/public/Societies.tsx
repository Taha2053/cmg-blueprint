'use client';

import { motion } from 'framer-motion';

const logos = [
  'Abou Nawas Hotels.png',
  'Accor.webp',
  'adwya.png',
  'AFI - Agence Foncière Industrielle.jpeg',
  'Agil.gif',
  'Air Liquide.png',
  'Aldiana.png',
  'Al Maaden.png',
  'ALUBAF Bank - Alubaf International Bank - Tunis.jpeg',
  'Assurances BIAT.jpeg',
  'Bank ABC.jpg',
  'Banque Centrale de Tunisie.png',
  "BAT - Banque d'Affaires de Tunisie.png",
  'BFPME.png',
  'BTK.png',
  'Carrefour Cash & Carry.png',
  'Carrefour.png',
  'COMETE Engineering.JPG',
  'Conseil du Marché Financier.png',
  'CTKD.jpeg',
  'EDT - Electro Diesel Tunisie.webp',
  'Esso.webp',
  'ETAP.png',
  'ExxonMobil.webp',
  'Foire Internationale de Tunis S.A..jpeg',
  'fourat.jpg',
  'GB Airways.webp',
  'Geiser.png',
  'GIFruits.jpeg',
  'GlobalSantaFe.png',
  'Golden Tulip Hotels • Inns • Resorts.png',
  'Grupo Cementos Portland Valderrivas.png',
  'icf.jpg',
  'Ithaque S.A..png',
  'Joint Oil.png',
  "Les Ciments d'Oum El Kelil.png",
  'Marionnaud Parfumeries.jpg',
  'NAIB Bank - North Africa International Bank.png',
  'OACA - Office de l\'Aviation Civile et des Aéroports.jpeg',
  'Odyssee Tourisme S.A..png',
  'Ooredoo.jpg',
  'Point M.jpeg',
  'Radisson SAS.svg',
  'Sancella Sports Team.jpeg',
  'SCIT (Société de Commerce International de Tunisie).jpeg',
  'Sheraton.png',
  'SNCFT.png',
  'Société Al Baraka Immobilière.jpeg',
  'Sotradies.png',
  'SOTRAPIL.png',
  'STB Bank.jpeg',
  'STIR - Société Tunisienne des Industries de Raffinage.jpg',
  'TIB - Tunis International Bank.png',
  'TRAPSA.jpeg',
  'TSB - Tunisian Saudi Bank.png',
  'Tunet.jpg',
  'Tuninter.png',
  'Tunisair.png',
  'Tunisie Clearing.jpeg',
  'UBCI - Groupe BNP Paribas.jpeg',
  'UGFS North Africa.png',
  'ULC Logistics.png',
  'Ulysse Négoce.png',
  'Uniland.png',
  'UTC & NADC (Union Tunisienne de Carton Ondulé & North Africa Distribution Company).png',
  'Vincci Hoteles.png',
  'Vivo Energy.jpg',
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Societies() {
  return (
    <section className="bg-ivoire py-20 overflow-hidden border-b border-black/6">
      <div className="max-w-[1280px] mx-auto px-6 mb-12">
        <motion.div className="text-center" {...fadeUp}>
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            Ils nous ont fait confiance
          </span>
          <div className="w-8 h-px bg-accent/50 mx-auto mt-4" />
        </motion.div>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
          maskImage:
            'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
        }}
      >
        <div
          className="flex items-center gap-14 hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 45s linear infinite' }}
        >
          {[...logos, ...logos].map((src, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center h-16 w-36 shrink-0"
            >
              <img
                src={`/logos/${encodeURI(src)}`}
                alt=""
                className="max-h-full max-w-full object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
