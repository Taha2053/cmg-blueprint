'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const articleSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(200),
  subtitle: z.string().max(500).optional(),
  coverImage: z.string().optional(),
  pdfUrl: z.string().optional(),
  published: z.boolean().default(false),
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export async function createArticle(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = articleSchema.parse({
    title: data.title,
    subtitle: data.subtitle || undefined,
    coverImage: data.coverImage || undefined,
    pdfUrl: data.pdfUrl || undefined,
    published: data.published === 'true',
  });

  const slug = slugify(parsed.title);
  const existing = await prisma.article.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  await prisma.article.create({
    data: {
      ...parsed,
      slug: finalSlug,
      publishedAt: parsed.published ? new Date() : null,
    },
  });

  revalidatePath('/admin/articles');
  revalidatePath('/articles');
  revalidatePath('/');
}

export async function updateArticle(id: string, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = articleSchema.parse({
    title: data.title,
    subtitle: data.subtitle || undefined,
    coverImage: data.coverImage || undefined,
    pdfUrl: data.pdfUrl || undefined,
    published: data.published === 'true',
  });

  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) throw new Error('Article not found');

  const slug = slugify(parsed.title);
  const slugExists = await prisma.article.findFirst({
    where: { slug, NOT: { id } },
  });
  const finalSlug = slugExists ? `${slug}-${Date.now()}` : slug;

  await prisma.article.update({
    where: { id },
    data: {
      ...parsed,
      slug: finalSlug,
      publishedAt: parsed.published && !existing.published ? new Date() : existing.publishedAt,
    },
  });

  revalidatePath('/admin/articles');
  revalidatePath('/articles');
  revalidatePath('/');
}

export async function toggleArticle(id: string, published: boolean) {
  await prisma.article.update({
    where: { id },
    data: {
      published,
      publishedAt: published ? new Date() : null,
    },
  });
  revalidatePath('/admin/articles');
  revalidatePath('/articles');
  revalidatePath('/');
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath('/admin/articles');
  revalidatePath('/articles');
  revalidatePath('/');
}
