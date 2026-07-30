'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Heading, List, Quote, Undo, Redo } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, ImageExtension],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-3 bg-card text-text-primary',
      },
    },
  });

  if (!editor) return null;

  const tools = [
    { key: 'bold', icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
    { key: 'italic', icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
    { key: 'heading', icon: Heading, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
    { key: 'list', icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
    { key: 'quote', icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote') },
  ];

  return (
    <div className="border border-card-border rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 p-2 border-b border-card-border bg-card">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.key}
              type="button"
              onClick={tool.action}
              className={`p-2 rounded transition-colors ${
                tool.active ? 'bg-accent/20 text-accent' : 'text-text-muted hover:text-text-primary hover:bg-card-border'
              }`}
            >
              <Icon size={16} />
            </button>
          );
        })}
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 text-text-muted hover:text-text-primary transition-colors"
        >
          <Undo size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 text-text-muted hover:text-text-primary transition-colors"
        >
          <Redo size={16} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
