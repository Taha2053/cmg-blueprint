import { execFileSync } from 'child_process';
import { readdir, readFile, rename, unlink } from 'fs/promises';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PDFS_DIR = path.join(process.cwd(), 'public', 'Articles');
const OUT_DIR = path.join(process.cwd(), 'public', 'images', 'articles');
const TARGET_WIDTH = 1200;

function sanitize(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

async function renderFirstPage(pdfFile: string, outBase: string) {
  const tmpBase = path.join(OUT_DIR, `${outBase}-tmp`);
  execFileSync('pdftoppm', [
    '-f', '1',
    '-l', '1',
    '-png',
    '-scale-to', String(TARGET_WIDTH),
    path.join(PDFS_DIR, pdfFile),
    tmpBase,
  ]);
  const tmpFile = `${tmpBase}-01.png`;
  const finalFile = path.join(OUT_DIR, `${outBase}.png`);
  await rename(tmpFile, finalFile);
  return `/images/articles/${outBase}.png`;
}

async function main() {
  const pdfs = (await readdir(PDFS_DIR)).filter((f) => f.toLowerCase().endsWith('.pdf'));
  console.log(`Found ${pdfs.length} PDFs.`);

  for (const pdfFile of pdfs) {
    const base = sanitize(path.basename(pdfFile, path.extname(pdfFile)));
    const finalFile = path.join(OUT_DIR, `${base}.png`);

    try {
      await readFile(finalFile);
      console.log(`Skipping existing: ${base}.png`);
      continue;
    } catch {
      // not generated yet
    }

    try {
      const coverImage = await renderFirstPage(pdfFile, base);
      const pdfName = path.basename(pdfFile);
      const result = await prisma.article.updateMany({
        where: { pdfUrl: { contains: pdfName } },
        data: { coverImage },
      });
      console.log(`Generated ${coverImage} (matched ${result.count} article(s))`);
    } catch (e) {
      console.error(`Failed for ${pdfFile}: ${(e as Error).message}`);
    }
  }

  const orphans = (await readdir(OUT_DIR)).filter((f) => f.includes('-tmp'));
  for (const o of orphans) await unlink(path.join(OUT_DIR, o));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
