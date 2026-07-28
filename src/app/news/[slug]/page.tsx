import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = await prisma.news.findUnique({
    where: { slug, published: true },
  });

  if (!article) notFound();

  return (
    <div className="min-h-screen bg-ivoire">
      <div className="max-w-[800px] mx-auto px-6 pt-40 pb-24">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-text-dark-muted hover:text-accent text-sm transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Retour aux actualités
        </Link>

        {article.coverImage && (
          <div className="aspect-[16/9] overflow-hidden mb-12 rounded-2xl shadow-soft-lg ring-1 ring-black/[0.05]">
            <img
              src={article.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mb-8">
          <p className="text-text-dark-muted text-sm mb-4">
            {article.publishedAt &&
              new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-text-dark tracking-tight">
            {article.title}
          </h1>
        </div>

        <div
          className="prose prose-lg max-w-none text-text-dark-muted leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}
