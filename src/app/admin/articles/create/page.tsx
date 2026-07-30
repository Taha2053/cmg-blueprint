'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import FileDropzone from '@/components/admin/FileDropzone';
import { createArticle } from '@/actions/articles';

export default function CreateArticle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [coverImage, setCoverImage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    if (pdfUrl) fd.set('pdfUrl', pdfUrl);
    if (coverImage) fd.set('coverImage', coverImage);

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
          <Label>Image de couverture</Label>
          <FileDropzone value={coverImage} onChange={setCoverImage} type="image" accept=".jpg,.jpeg,.png,.webp,.gif" />
        </div>
        <div className="space-y-2">
          <Label>Fichier PDF</Label>
          <FileDropzone value={pdfUrl} onChange={setPdfUrl} type="pdf" accept=".pdf" />
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
