'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { services } from '@/lib/services';

const fadeUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Services() {
  return (
    <section id="services" className="bg-gris py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div className="flex flex-col items-center text-center mb-16 lg:mb-24" {...fadeUp}>
          <span className="w-8 h-[1px] bg-accent mb-4" />
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase mb-4">NOS SERVICES</span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark tracking-tight max-w-2xl">
            Des solutions sur mesure pour accompagner votre croissance
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                className="surface mirror shadow-soft p-8 lg:p-10 flex flex-col items-center text-center group hover:shadow-soft-lg hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
                {...fadeUp}
              >
                <Icon size={42} className="text-accent mb-6" strokeWidth={1.5} />
                <h3 className="font-serif text-lg lg:text-xl text-text-dark mb-4">{s.title}</h3>
                <p className="text-text-dark-muted text-sm leading-relaxed mb-8 flex-1">
                  {s.desc}
                </p>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-text-dark-muted hover:text-accent text-xs font-bold tracking-[0.25em] uppercase transition-colors flex items-center gap-2"
                >
                  EN SAVOIR PLUS <span className="text-accent">&rarr;</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
