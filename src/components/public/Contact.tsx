'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, FileText, CheckCircle } from 'lucide-react';
import { sendMessage } from '@/actions/messages';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    try {
      const result = await sendMessage(formData);
      if (result.success) {
        setSent(true);
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  return (
    <section id="contact" className="bg-ivoire py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
          <motion.div className="lg:col-span-5" {...fadeUp}>
            <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">Contact</span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark mt-6 tracking-tight">
              Discutons de votre projet
            </h2>
            <p className="text-text-dark-muted text-base sm:text-lg mt-6 leading-relaxed max-w-md">
              Que ce soit pour un audit, un conseil fiscal ou un accompagnement stratégique, notre équipe
              est à votre écoute.
            </p>
            <div className="space-y-5 mt-12">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-medium text-text-dark-muted uppercase tracking-wider mb-1">Adresse</span>
                  <span className="text-text-dark text-sm">45 Avenue de la République, 2078 Marsa Safsaf, Tunis</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={18} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-medium text-text-dark-muted uppercase tracking-wider mb-1">Téléphone</span>
                  <a href="tel:+21671740131" className="text-text-dark text-sm hover:text-accent transition-colors">+216 71 740 131</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={18} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-medium text-text-dark-muted uppercase tracking-wider mb-1">Email</span>
                  <a href="mailto:contact@cabinetguellaty.com" className="text-text-dark text-sm hover:text-accent transition-colors">contact@cabinetguellaty.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={18} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-medium text-text-dark-muted uppercase tracking-wider mb-1">Horaires</span>
                  <span className="text-text-dark text-sm">Lun &ndash; Ven : 08h30 &ndash; 17h30</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FileText size={18} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-medium text-text-dark-muted uppercase tracking-wider mb-1">Fax</span>
                  <span className="text-text-dark text-sm">+216 71 740 197</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-7" {...fadeUp}>
            {sent ? (
              <div className="bg-white border border-green-300 p-10 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-text-dark mb-2">Message envoyé !</h3>
                <p className="text-text-dark-muted">Nous vous répondrons dans les plus brefs délais.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-accent text-sm font-semibold hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-text-dark-muted uppercase tracking-wider mb-2">Nom complet</label>
                  <input type="text" id="name" name="name" placeholder="Votre nom" required className="w-full bg-white/65 backdrop-blur-sm border border-white/60 text-text-dark text-sm px-5 py-4 placeholder:text-text-dark-muted/50 focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-text-dark-muted uppercase tracking-wider mb-2">Email</label>
                    <input type="email" id="email" name="email" placeholder="votre@email.com" required className="w-full bg-white/65 backdrop-blur-sm border border-white/60 text-text-dark text-sm px-5 py-4 placeholder:text-text-dark-muted/50 focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-text-dark-muted uppercase tracking-wider mb-2">Téléphone</label>
                    <input type="tel" id="phone" name="phone" placeholder="+216 XX XXX XXX" className="w-full bg-white/65 backdrop-blur-sm border border-white/60 text-text-dark text-sm px-5 py-4 placeholder:text-text-dark-muted/50 focus:outline-none focus:border-accent transition-colors" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-text-dark-muted uppercase tracking-wider mb-2">Sujet</label>
                  <select id="subject" name="subject" required className="w-full bg-white/65 backdrop-blur-sm border border-white/60 text-text-dark text-sm px-5 py-4 focus:outline-none focus:border-accent transition-colors">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="audit">Audit & Commissariat</option>
                    <option value="fiscal">Conseil fiscal</option>
                    <option value="comptable">Expertise comptable</option>
                    <option value="juridique">Conseil juridique</option>
                    <option value="gestion">Conseil en gestion</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-text-dark-muted uppercase tracking-wider mb-2">Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="Votre message..." required className="w-full bg-white/65 backdrop-blur-sm border border-white/60 text-text-dark text-sm px-5 py-4 placeholder:text-text-dark-muted/50 focus:outline-none focus:border-accent transition-colors resize-none" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="w-full bg-accent text-white px-8 py-5 text-sm font-semibold tracking-wider uppercase hover:bg-accent/90 transition-all duration-300 group">
                  Envoyer votre message{' '}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
