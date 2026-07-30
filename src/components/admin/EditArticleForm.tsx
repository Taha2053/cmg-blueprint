'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { updateArticle } from '@/actions/articles';

interface EditArticleFormProps {
  article: {
    id: string;
    title: string;
    subtitle: string | null;
    coverImage: string | null;
    pdfUrl: string | null;
    published: boolean;
  };
}

export function EditArticleForm({ article }: EditArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await updateArticle(article.id, formData);
      router.push('/admin/articles');
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input id="title" name="title" defaultValue={article.title} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subtitle">Sous-titre <span className="text-text-muted text-xs">(optionnel)</span></Label>
        <Textarea id="subtitle" name="subtitle" defaultValue={article.subtitle || ''} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="coverImage">URL de l'image de couverture</Label>
        <Input id="coverImage" name="coverImage" defaultValue={article.coverImage || ''} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pdfUrl">URL du PDF</Label>
        <Input id="pdfUrl" name="pdfUrl" defaultValue={article.pdfUrl || ''} />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-text-muted">
          <input type="checkbox" name="published" value="true" defaultChecked={article.published} />
          Publié
        </label>
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
