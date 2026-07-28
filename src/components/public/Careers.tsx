import { prisma } from '@/lib/prisma';
import { Briefcase, MapPin, ArrowRight } from 'lucide-react';

export default async function Careers() {
  const jobs = await prisma.job.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  if (jobs.length === 0) return null;

  return (
    <section id="careers" className="bg-ivoire py-24 lg:py-32 border-t border-black/6">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            Carrières
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark mt-6 tracking-tight">
            Rejoignez notre équipe
          </h2>
          <p className="text-text-dark-muted text-base sm:text-lg mt-6 leading-relaxed">
            MG & Associés recrute les talents de demain. Découvrez nos opportunités.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {jobs.map((job) => (
            <a
              key={job.id}
              href={`mailto:contact@cabinetguellaty.com?subject=Candidature%20-%20${encodeURIComponent(job.title)}`}
              className="group block surface shadow-soft px-8 py-6 hover:shadow-soft-lg hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6">
                  <Briefcase size={18} className="text-text-dark-muted shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg text-text-dark">{job.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-text-dark-muted">
                      <span className="flex items-center gap-1.5"><MapPin size={13} /> {job.location}</span>
                      <span className="w-[1px] h-3 bg-black/10" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-dark-muted group-hover:text-text-dark transition-colors">Postuler</span>
                  <ArrowRight size={16} className="text-text-dark-muted group-hover:text-accent transition-all duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-text-dark-muted text-sm">
            Vous ne trouvez pas l&apos;offre idéale ?{' '}
            <a href="mailto:contact@cabinetguellaty.com" className="text-accent hover:underline font-medium">
              Envoyez-nous une candidature spontanée
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
