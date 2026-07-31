'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PdfUploader from '@/components/admin/PdfUploader';
import { createArticle } from '@/actions/articles';

export default function CreateArticle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);

    try {
      await createArticle(fd);
      router.push('/admin/articles');
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-text-primary mb-8">Nouvel article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input id="title" name="title" placeholder="Titre de l'article" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Sous-titre <span className="text-text-muted text-xs">(optionnel)</span></Label>
          <Textarea id="subtitle" name="subtitle" placeholder="Brève description..." />
        </div>
        <div className="space-y-2">
          <Label>Fichier PDF <span className="text-text-muted text-xs">(l'aperçu est généré depuis la 1re page)</span></Label>
          <PdfUploader />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input type="checkbox" name="published" value="true" />
            Publier immédiatement
          </label>
        </div>
        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Création...' : "Créer l'article"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}
