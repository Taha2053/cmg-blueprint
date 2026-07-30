import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articles = [
  {
    title: 'Liasse Fiscale en Tunisie',
    subtitle: 'Cadre, obligations et procédures de dépôt dématérialisé',
    slug: 'liasse-fiscale-tunisie',
    coverImage: '/images/articles/fiscalite.jpg',
    pdfUrl: '/Articles/2025-04-MG-& Co-Liasse Fiscale en Tunisie Cadre, Obligations et Procédures de Dépôt Dématérialisé.pdf',
  },
  {
    title: 'Évolution de la Fiscalité Patrimoniale en Tunisie',
    subtitle: 'Analyse des réformes 2023-2026 et perspectives',
    slug: 'fiscalite-patrimoniale-tunisie',
    coverImage: '/images/articles/patrimoniale.jpg',
    pdfUrl: '/Articles/2026-06-L\u2019\u00C9volution de la Fiscalit\u00E9 Patrimoniale en Tunisie (2023-2026).pdf',
  },
  {
    title: 'Commentaire de la Loi de Finances 2026',
    subtitle: 'Principales mesures et impacts pour les entreprises',
    slug: 'commentaire-lf-2026',
    coverImage: '/images/articles/loi-finances.jpg',
    pdfUrl: '/Articles/2026-01-MG-& Co-Commentaire LF 2026.pdf',
  },
  {
    title: 'Statut de l\'Auto-Entrepreneur en Tunisie',
    subtitle: 'Guide complet et analyse stratégique',
    slug: 'statut-auto-entrepreneur-tunisie',
    coverImage: '/images/articles/auto-entrepreneur.jpg',
    pdfUrl: '/Articles/2025-02-MG-& Co-Le Statut de l\'Auto-Entrepreneur en Tunisie Guide Complet et Analyse Stratégique.pdf',
  },
  {
    title: 'La Révolution du Travail en Tunisie',
    subtitle: 'Nouvelles formes d\'emploi et cadre juridique',
    slug: 'revolution-travail-tunisie',
    coverImage: '/images/articles/travail.jpg',
    pdfUrl: '/Articles/2025-09-MG-& Co-La révolution du travail en Tunisie.pdf',
  },
  {
    title: 'Le Fonds Social d\'Entreprise',
    subtitle: 'Cadre, fonctionnement et aspects pratiques',
    slug: 'fonds-social-entreprise',
    coverImage: '/images/articles/fonds-social.jpg',
    pdfUrl: '/Articles/2025-03-MG-& Co-Le Fonds Social d\'Entreprise Cadre, Fonctionnement et Aspects Pratiques.pdf',
  },
  {
    title: 'Réglementation de Change des Personnes Physiques',
    subtitle: 'Avantages fiscaux liés au statut de non-résident',
    slug: 'reglementation-change-personnes-physiques',
    coverImage: '/images/articles/change.jpg',
    pdfUrl: '/Articles/2026-03-MG-& Co-Réglementation de change des personnes physique et avantages fiscaux liés au statut de non-résident.pdf',
  },
  {
    title: 'Emploi des Retraités en Tunisie',
    subtitle: 'Cadre légal et implications sociales',
    slug: 'emploi-retraites-tunisie',
    coverImage: '/images/articles/retraites.jpg',
    pdfUrl: '/Articles/2025-05-MG-& Co-Emploi des Retraités en Tunisie Cadre Légal et Implications Sociales.pdf',
  },
];

async function main() {
  for (const article of articles) {
    const existing = await prisma.article.findUnique({ where: { slug: article.slug } });
    if (existing) {
      console.log(`Skipping existing: ${article.title}`);
      continue;
    }

    await prisma.article.create({
      data: {
        ...article,
        published: true,
        publishedAt: new Date(),
      },
    });
    console.log(`Created: ${article.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
