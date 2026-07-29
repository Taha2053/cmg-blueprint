'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { subscribe } from '@/actions/subscribers';

const fadeUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const result = await subscribe(email);
      if (result.success) {
        setStatus('success');
        setMessage('Merci pour votre inscription !');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.error || 'Erreur lors de l\'inscription.');
      }
    } catch {
      setStatus('error');
      setMessage('Une erreur est survenue.');
    }
  }

  return (
    <section id="newsletter" className="bg-ivoire py-24 lg:py-32 border-t border-black/6">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div className="max-w-2xl mx-auto text-center" {...fadeUp}>
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            Newsletter
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark mt-6 tracking-tight">
            Restez informé
          </h2>
          <p className="text-text-dark-muted text-base sm:text-lg mt-6 leading-relaxed">
            Recevez nos actualités, analyses et publications directement dans votre boîte mail.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mt-12 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="flex-1 bg-white/65 backdrop-blur-sm border border-white/60 px-5 py-4 text-sm text-text-dark placeholder:text-text-dark-muted focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-accent text-white px-8 py-4 text-xs font-semibold tracking-wider uppercase hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(168,24,40,0.55)] transition-all duration-300 disabled:opacity-50 shrink-0"
            >
              {status === 'loading' ? 'Envoi...' : "S'inscrire"}
            </button>
          </form>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm mt-4 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
