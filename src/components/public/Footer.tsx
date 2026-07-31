'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { subscribe } from '@/actions/subscribers';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Le Cabinet', href: '/#about' },
  { label: 'Expertises', href: '/#services' },
  { label: 'Secteurs', href: '/#sectors' },
  { label: 'Notre équipe', href: '/#team' },
  { label: 'Carrières', href: '/#careers' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribeMsg, setSubscribeMsg] = useState('');

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubscribeMsg('');
    try {
      const result = await subscribe(email);
      if (result.success) {
        setSubscribeMsg('Merci pour votre inscription !');
        setEmail('');
      } else {
        setSubscribeMsg(result.error || 'Erreur lors de l\'inscription.');
      }
    } catch {
      setSubscribeMsg('Une erreur est survenue.');
    }
  }

  return (
    <footer className="relative bg-gris border-t border-black/10 pt-32 pb-10 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-serif text-[clamp(300px,40vw,600px)] leading-none text-black" style={{ opacity: 0.04 }}>
          MG
        </span>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" alt="CMG" className="w-7 h-7" />
              <div className="flex flex-col">
                <span className="font-bold text-xs tracking-wide text-text-dark">MG & ASSOCIÉS</span>
                <span className="text-[9px] tracking-[0.2em] text-text-dark-muted">CABINET MOURAD GUELLATY</span>
              </div>
            </div>
            <div className="font-serif text-2xl sm:text-3xl lg:text-4xl text-text-dark leading-[1.3] tracking-tight max-w-md">
              Depuis plusieurs décennies,<br />
              nous accompagnons entreprises,<br />
              institutions et dirigeants<br />
              avec exigence, indépendance<br />
              et confiance.
            </div>

            <div className="mt-12 border-t border-black/10 pt-8">
              <span className="text-text-dark-muted text-[10px] font-semibold tracking-[0.2em] uppercase">
                Newsletter
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-3 mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="flex-1 bg-white border border-black/15 px-4 py-2.5 text-sm text-text-dark placeholder:text-text-dark-muted focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="bg-accent text-white px-5 py-2.5 text-xs font-semibold tracking-wider uppercase hover:bg-accent/90 transition-colors shrink-0"
                >
                  S&apos;inscrire
                </button>
              </form>
              {subscribeMsg && (
                <p className="text-text-dark-muted text-xs mt-3">{subscribeMsg}</p>
              )}
            </div>

            <div className="flex items-center gap-8 mt-10">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cabinet-mourad-guellaty/', icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                )},
                { label: 'Facebook', href: 'https://www.facebook.com/p/Cabinet-Mourad-GUELLATY-100045481282074/', icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                )},
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-text-dark-muted hover:text-accent transition-all duration-300 hover:rotate-[-4deg]">
                  {s.icon}
                </a>
              ))}
              <a href="mailto:contact@cabinetguellaty.com" className="text-text-dark-muted hover:text-accent transition-all duration-300"><Mail size={16} /></a>
            </div>
          </div>

          <div className="col-span-6 lg:col-span-3 lg:col-start-7">
            <span className="text-text-dark-muted text-[10px] font-semibold tracking-[0.2em] uppercase">Navigation</span>
            <ul className="mt-6 space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="relative text-text-dark-muted text-sm hover:text-text-dark transition-colors duration-300 group inline-flex items-center gap-2"
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className={`inline-block transition-all duration-300 ${hoveredLink === link.label ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                      &rarr;
                    </span>
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 lg:col-span-3 lg:col-start-10">
            <span className="text-text-dark-muted text-[10px] font-semibold tracking-[0.2em] uppercase">Contact</span>
            <div className="mt-6 space-y-8">
              <div>
                <p className="text-text-dark-muted text-sm leading-relaxed">
                  45 Avenue de la République<br />
                  2078 La Marsa<br />
                  Tunisie
                </p>
              </div>
              <div>
                <a href="tel:+21671740131" className="text-text-dark-muted text-sm hover:text-text-dark transition-colors duration-300 block">+216 71 740 131</a>
                <a href="mailto:contact@cabinetguellaty.com" className="text-text-dark-muted text-sm hover:text-text-dark transition-colors duration-300 block mt-2">contact@cabinetguellaty.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-black/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <p className="text-text-dark-muted text-xs">&copy; 2026 MG &amp; Associés. Tous droits réservés.</p>
            <p className="font-serif text-sm text-text-dark-muted italic">&ldquo;La confiance se construit dans la durée.&rdquo;</p>
            <p className="text-text-dark-muted text-xs tracking-wider">Audit &middot; Conseil &middot; Expertise Comptable</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
