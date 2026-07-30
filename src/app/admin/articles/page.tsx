import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArticlesActions } from '@/components/admin/ArticlesActions';

export const dynamic = 'force-dynamic';

export default async function ArticlesList() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Articles</h1>
        <Link href="/admin/articles/create">
          <Button>Nouvel article</Button>
        </Link>
      </div>

      <div className="border border-card-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-text-muted py-12">
                  Aucun article pour le moment.
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    {article.coverImage ? (
                      <img
                        src={article.coverImage}
                        alt=""
                        className="w-16 h-12 object-cover"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-card-border flex items-center justify-center">
                        <span className="text-text-muted text-xs">—</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-text-primary">{article.title}</TableCell>
                  <TableCell>
                    <Badge variant={article.published ? 'success' : 'muted'}>
                      {article.published ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-text-muted">
                    {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <ArticlesActions article={article} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
