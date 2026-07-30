'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { number: '30+', label: "Années d'expérience" },
  { number: '200+', label: 'Clients accompagnés' },
  { number: '40+', label: 'Experts à votre service' },
  { number: '100%', label: 'Engagement qualité' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

function parseStat(raw: string): { value: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  return { value: match ? Number(match[1]) : 0, suffix: match ? match[2] : raw };
}

function AnimatedStat({ raw, inView: sectionInView }: { raw: string; inView: boolean }) {
  const { value: target, suffix } = parseStat(raw);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!sectionInView) {
      setCount(0);
      return;
    }
    let start = 0;
    const duration = 1500;
    const step = 16;
    const totalSteps = duration / step;
    const increment = target / totalSteps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [sectionInView, target]);

  return <>{count}{suffix}</>;
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-gris border-t border-b border-black/10">
      <div className="max-w-[1280px] mx-auto px-6 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x divide-black/10">
          {stats.map((stat, i) => (
            <motion.div key={i} className="text-center lg:px-10" {...fadeUp}>
              <span className="font-serif text-5xl lg:text-6xl text-text-dark tracking-tight leading-none">
                <AnimatedStat raw={stat.number} inView={inView} />
              </span>
              <p className="text-text-dark-muted text-sm mt-3 font-medium tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
