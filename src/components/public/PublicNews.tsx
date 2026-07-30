import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function PublicNews() {
  let articles: Awaited<ReturnType<typeof prisma.news.findMany>> = [];
  try {
    articles = await prisma.news.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    });
  } catch {
    // DB unavailable during build — skip news section
  }

  if (articles.length === 0) return null;

  return (
    <section id="news" className="bg-gris py-24 lg:py-32 border-t border-black/10">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
              Actualités
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark mt-6 tracking-tight">
              Dernières actualités
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-wider uppercase hover:gap-3 transition-all duration-300 shrink-0 group"
          >
            Voir toutes les actualités
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group block surface mirror shadow-soft hover:shadow-soft-lg hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
            >
              {article.coverImage && (
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-text-dark-muted text-xs mb-3">
                  {article.publishedAt &&
                    new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </p>
                <h3 className="font-serif text-xl text-text-dark group-hover:text-accent transition-colors mb-3 line-clamp-2">
                  {article.title}
                </h3>
                {article.summary && (
                  <p className="text-text-dark-muted text-sm leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-wider uppercase mt-4 group-hover:gap-3 transition-all">
                  Lire la suite <span>&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
