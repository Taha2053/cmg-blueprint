import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articles = [
  {
    title: 'Liasse Fiscale en Tunisie',
    subtitle: 'Cadre, obligations et procédures de dépôt dématérialisé',
    slug: 'liasse-fiscale-tunisie',
    coverImage: '/images/articles/2025-04-MG-__Co-Liasse_Fiscale_en_Tunisie_Cadre__Obligations_et_Proc_dures_de_D_p_t_D_mat_rialis_.png',
    pdfUrl: '/Articles/2025-04-MG-& Co-Liasse Fiscale en Tunisie Cadre, Obligations et Procédures de Dépôt Dématérialisé.pdf',
  },
  {
    title: 'Évolution de la Fiscalité Patrimoniale en Tunisie',
    subtitle: 'Analyse des réformes 2023-2026 et perspectives',
    slug: 'fiscalite-patrimoniale-tunisie',
    coverImage: '/images/articles/2026-06-L__volution_de_la_Fiscalit__Patrimoniale_en_Tunisie__2023-2026_.png',
    pdfUrl: '/Articles/2026-06-L\u2019\u00C9volution de la Fiscalit\u00E9 Patrimoniale en Tunisie (2023-2026).pdf',
  },
  {
    title: 'Commentaire de la Loi de Finances 2026',
    subtitle: 'Principales mesures et impacts pour les entreprises',
    slug: 'commentaire-lf-2026',
    coverImage: '/images/articles/2026-01-MG-__Co-Commentaire_LF_2026.png',
    pdfUrl: '/Articles/2026-01-MG-& Co-Commentaire LF 2026.pdf',
  },
  {
    title: 'Statut de l\'Auto-Entrepreneur en Tunisie',
    subtitle: 'Guide complet et analyse stratégique',
    slug: 'statut-auto-entrepreneur-tunisie',
    coverImage: '/images/articles/2025-02-MG-__Co-Le_Statut_de_l_Auto-Entrepreneur_en_Tunisie_Guide_Complet_et_Analyse_Strat_gique.png',
    pdfUrl: '/Articles/2025-02-MG-& Co-Le Statut de l\'Auto-Entrepreneur en Tunisie Guide Complet et Analyse Stratégique.pdf',
  },
  {
    title: 'La Révolution du Travail en Tunisie',
    subtitle: 'Nouvelles formes d\'emploi et cadre juridique',
    slug: 'revolution-travail-tunisie',
    coverImage: '/images/articles/2025-09-MG-__Co-La_r_volution_du_travail_en_Tunisie.png',
    pdfUrl: '/Articles/2025-09-MG-& Co-La révolution du travail en Tunisie.pdf',
  },
  {
    title: 'Le Fonds Social d\'Entreprise',
    subtitle: 'Cadre, fonctionnement et aspects pratiques',
    slug: 'fonds-social-entreprise',
    coverImage: '/images/articles/2025-03-MG-__Co-Le_Fonds_Social_d_Entreprise_Cadre__Fonctionnement_et_Aspects_Pratiques.png',
    pdfUrl: '/Articles/2025-03-MG-& Co-Le Fonds Social d\'Entreprise Cadre, Fonctionnement et Aspects Pratiques.pdf',
  },
  {
    title: 'Réglementation de Change des Personnes Physiques',
    subtitle: 'Avantages fiscaux liés au statut de non-résident',
    slug: 'reglementation-change-personnes-physiques',
    coverImage: '/images/articles/2026-03-MG-__Co-R_glementation_de_change_des_personnes_physique_et_avantages_fiscaux_li_s_au_statut_de_non-r_sident.png',
    pdfUrl: '/Articles/2026-03-MG-& Co-Réglementation de change des personnes physique et avantages fiscaux liés au statut de non-résident.pdf',
  },
  {
    title: 'Emploi des Retraités en Tunisie',
    subtitle: 'Cadre légal et implications sociales',
    slug: 'emploi-retraites-tunisie',
    coverImage: '/images/articles/2025-05-MG-__Co-Emploi_des_Retrait_s_en_Tunisie_Cadre_L_gal_et_Implications_Sociales.png',
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
