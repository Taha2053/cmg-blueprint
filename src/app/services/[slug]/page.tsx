import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { services } from '@/lib/services';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-[800px] mx-auto px-6 py-16 lg:py-24">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-wider uppercase hover:gap-3 transition-all duration-300 mb-12 group"
        >
          <span>&larr;</span> Retour aux services
        </Link>

        <div className="flex items-center gap-6 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
            <Icon size={32} className="text-accent" strokeWidth={1.5} />
          </div>
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            Nos services
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark tracking-tight mb-6">
          {service.title}
        </h1>

        <p className="text-text-dark-muted text-lg leading-relaxed mb-12 max-w-2xl">
          {service.desc}
        </p>

        <div className="border border-black/10 bg-white p-8 lg:p-12">
          <p className="text-text-dark-muted text-base sm:text-lg leading-relaxed mb-8">
            {service.content.intro}
          </p>

          <ul className="space-y-4">
            {service.content.points.map((point, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span className="text-text-dark text-sm sm:text-base leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-accent/90 hover:-translate-y-0.5 transition-all duration-300"
          >
            Discutons de votre projet
          </Link>
        </div>
      </div>
    </div>
  );
}
