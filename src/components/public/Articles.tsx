import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Articles() {
  let articles: Awaited<ReturnType<typeof prisma.article.findMany>> = [];
  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 6,
    });
  } catch {
    // DB unavailable during build
  }

  if (articles.length === 0) return null;

  return (
    <section id="articles" className="bg-gris py-24 lg:py-32 border-t border-black/10">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
              Publications
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark mt-6 tracking-tight">
              Articles &amp; Analyses
            </h2>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-wider uppercase hover:gap-3 transition-all duration-300 shrink-0 group"
          >
            Voir tous les articles
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group block bg-light hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[16/11] overflow-hidden bg-[#E7E0D2]">
                {article.coverImage ? (
                  <img
                    src={article.coverImage}
                    alt=""
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#E9DFCB] to-[#D8C9AC]" />
                )}
              </div>
              <div className="bg-white p-6 min-h-[120px] flex flex-col justify-center">
                <h3 className="font-serif text-xl text-black leading-snug line-clamp-2 group-hover:opacity-90 transition-opacity">
                  {article.title}
                </h3>
                {article.subtitle && (
                  <p className="text-black/60 text-sm leading-relaxed mt-2 line-clamp-2">
                    {article.subtitle}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
