import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ALLOWED = {
  pdf: ['.pdf'],
  image: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'pdf';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase();
    const allowed = ALLOWED[type as keyof typeof ALLOWED] || ALLOWED.pdf;

    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: `File type ${ext} not allowed for ${type}` }, { status: 400 });
    }

    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const subdir = type === 'image' ? 'images/articles' : 'Articles';
    const dir = path.join(process.cwd(), 'public', subdir);
    await mkdir(dir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(dir, sanitizedName);
    await writeFile(filePath, buffer);

    const url = `/${subdir}/${sanitizedName}`;
    return NextResponse.json({ url });
  } catch (e) {
    console.error('Upload error:', e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
