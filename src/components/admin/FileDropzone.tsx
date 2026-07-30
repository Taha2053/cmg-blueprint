'use client';

import { useState, useRef } from 'react';
import { Upload, File, Check, Image } from 'lucide-react';

interface FileDropzoneProps {
  value?: string;
  onChange?: (url: string) => void;
  accept?: string;
  type?: 'pdf' | 'image';
  label?: string;
}

export default function FileDropzone({
  value,
  onChange,
  accept = '.pdf',
  type = 'pdf',
  label,
}: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(f: File) {
    setError('');
    setUploading(true);

    const fd = new FormData();
    fd.append('file', f);
    fd.append('type', type);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onChange?.(data.url);
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
        accept={accept}
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
            <p className="text-sm text-text-muted">Upload en cours...</p>
          </div>
        ) : value ? (
          <div className="flex flex-col items-center gap-3">
            {type === 'image' ? (
              <div className="w-20 h-20 rounded-lg overflow-hidden ring-1 ring-black/10">
                <img src={value} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={24} className="text-green-600" />
              </div>
            )}
            <p className="text-sm font-medium text-text-primary truncate max-w-xs">
              {value.split('/').pop()}
            </p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange?.(''); }}
              className="text-xs text-red-500 hover:text-red-700 underline"
            >
              Supprimer
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              {type === 'image' ? <Image size={24} className="text-gray-400" /> : <Upload size={24} className="text-gray-400" />}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {label || (type === 'image' ? 'Déposez une image ici' : 'Déposez votre fichier PDF ici')}
              </p>
              <p className="text-xs text-text-muted mt-1">
                ou cliquez pour parcourir
              </p>
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      {value && (
        <input type="hidden" name={type === 'image' ? 'coverImage' : 'pdfUrl'} value={value} />
      )}
    </div>
  );
}
