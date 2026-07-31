import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ArticlesList() {
  let articles: Awaited<ReturnType<typeof prisma.article.findMany>> = [];
  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    });
  } catch {
    // DB unavailable
  }

  return (
    <div className="min-h-screen bg-light py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-wider uppercase hover:gap-3 transition-all duration-300 mb-12 group"
        >
          <span>&larr;</span> Retour
        </Link>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark tracking-tight mb-4">
          Articles &amp; Analyses
        </h1>
        <p className="text-text-dark-muted text-base sm:text-lg max-w-2xl leading-relaxed mb-16">
          Découvrez nos publications et analyses sur l&apos;actualité fiscale, juridique et économique
          en Tunisie.
        </p>

        {articles.length === 0 ? (
          <p className="text-text-dark-muted">Aucun article publié pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group block bg-light hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[16/11] overflow-hidden bg-[#F0F0F0]">
                  {article.coverImage ? (
                    <img
                      src={article.coverImage}
                      alt=""
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#F2F2F2] to-[#E5E5E5]" />
                  )}
                </div>
                <div className="bg-white p-6 min-h-[110px] flex flex-col justify-center">
                  <h2 className="font-serif text-lg text-black leading-snug line-clamp-2 group-hover:opacity-90 transition-opacity">
                    {article.title}
                  </h2>
                  {article.subtitle && (
                    <p className="text-black/60 text-sm leading-relaxed mt-1.5 line-clamp-2">
                      {article.subtitle}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
