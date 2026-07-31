'use client';

import { useState, useRef } from 'react';
import { FileText, Check } from 'lucide-react';

interface PdfUploaderProps {
  pdfValue?: string;
  thumbValue?: string;
  onChange?: (pdfUrl: string, thumbUrl: string) => void;
}

export default function PdfUploader({ pdfValue, thumbValue, onChange }: PdfUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({ pdfUrl: pdfValue || '', thumbUrl: thumbValue || '' });

  function setUploaded(pdfUrl: string, thumbUrl: string) {
    setValues({ pdfUrl, thumbUrl });
    onChange?.(pdfUrl, thumbUrl);
  }
  const inputRef = useRef<HTMLInputElement>(null);

  async function renderFirstPage(file: File): Promise<Blob> {
    const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist');
    GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

    const pdf = await getDocument({ url: URL.createObjectURL(file) }).promise;
    const page = await pdf.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const targetWidth = 1200;
    const scale = targetWidth / base.width;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvas, viewport }).promise;

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to render page'));
      }, 'image/png');
    });
  }

  async function uploadBlob(blob: Blob, name: string, type: 'pdf' | 'image'): Promise<string> {
    const fd = new FormData();
    fd.append('file', blob, name);
    fd.append('type', type);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.url;
  }

  async function handleFile(f: File) {
    if (!f.name.endsWith('.pdf')) {
      setError('Seuls les fichiers PDF sont acceptés');
      return;
    }
    setError('');
    setUploading(true);

    try {
      const pdfUrl = await uploadBlob(f, f.name, 'pdf');
      const thumbBlob = await renderFirstPage(f);
      const baseName = f.name.replace(/\.pdf$/i, '');
      const thumbUrl = await uploadBlob(thumbBlob, `${baseName}.png`, 'image');
      setUploaded(pdfUrl, thumbUrl);
    } catch (e) {
      setError((e as Error).message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = '';
        }}
      />
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          dragging
            ? 'border-accent bg-accent/5'
            : 'border-gray-300 hover:border-accent/50 hover:bg-gray-50'
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
            <p className="text-sm text-text-muted">Génération de l'aperçu...</p>
          </div>
        ) : values.pdfUrl ? (
          <div className="flex items-center justify-center gap-4">
            {values.thumbUrl && (
              <div className="w-16 h-20 rounded overflow-hidden ring-1 ring-black/10 shrink-0">
                <img src={values.thumbUrl} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={20} className="text-green-600" />
              </div>
              <p className="text-sm font-medium text-text-primary truncate max-w-xs">
                {values.pdfUrl.split('/').pop()}
              </p>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setUploaded('', ''); }}
                className="text-xs text-red-500 hover:text-red-700 underline"
              >
                Supprimer
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <FileText size={24} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                Déposez votre fichier PDF ici
              </p>
              <p className="text-xs text-text-muted mt-1">
                ou cliquez pour parcourir — l'aperçu est généré automatiquement
              </p>
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      {values.pdfUrl && <input type="hidden" name="pdfUrl" value={values.pdfUrl} />}
      {values.thumbUrl && <input type="hidden" name="coverImage" value={values.thumbUrl} />}
    </div>
  );
}
