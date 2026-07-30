import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { EditArticleForm } from '@/components/admin/EditArticleForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticle({ params }: Props) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-text-primary mb-8">Modifier l'article</h1>
      <EditArticleForm article={article} />
    </div>
  );
}
