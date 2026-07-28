import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const articles = await prisma.news.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-ivoire">
      <div className="max-w-[1280px] mx-auto px-6 pt-40 pb-24">
        <div className="mb-16">
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">Actualités</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark mt-6 tracking-tight">
            Nos actualités
          </h1>
        </div>

        {articles.length === 0 ? (
          <p className="text-text-dark-muted text-lg">Aucun article publié pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group block surface mirror shadow-soft hover:shadow-soft-lg hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
              >
                {article.coverImage && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                  <h2 className="font-serif text-xl text-text-dark group-hover:text-accent transition-colors mb-3">
                    {article.title}
                  </h2>
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
        )}
      </div>
    </div>
  );
}
