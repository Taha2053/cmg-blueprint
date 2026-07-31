import { ShieldCheck, Calculator, LineChart, Scale, TrendingUp, Handshake, Building2, FileSpreadsheet } from 'lucide-react';

export const services = [
  {
    slug: 'audit-legal',
    icon: ShieldCheck,
    title: 'Audit légal',
    desc: 'Commissariat aux comptes et audit légal dans le respect des normes en vigueur.',
    content: {
      intro:
        'L\'audit légal constitue le cœur historique de notre métier. En qualité de commissaires aux comptes, nous certifions la régularité et la sincérité de vos états financiers conformément aux normes tunisiennes et internationales.',
      points: [
        'Certification des comptes sociaux et consolidés',
        'Commissariat aux comptes légal et contractuel',
        'Audit des états financiers en normes IFRS',
        'Revue limitée et missions d\'examen',
        'Rapports spéciaux du commissaire aux comptes',
        'Assistance aux organes de gouvernance (conseil d\'administration, comités d\'audit)',
      ],
    },
  },
  {
    slug: 'conseil-fiscal',
    icon: Calculator,
    title: 'Conseil fiscal',
    desc: "Optimisation fiscale, déclarations et assistance dans vos relations avec l'administration.",
    content: {
      intro:
        'Notre équipe fiscale vous accompagne dans la sécurisation et l\'optimisation de votre fiscalité. Nous intervenons en conseil comme en contentieux, avec une connaissance approfondie de l\'administration fiscale tunisienne.',
      points: [
        'Optimisation fiscale et structuration de votre fiscalité',
        'Établissement et suivi des déclarations (IS, TVA, IRPP)',
        'Gestion des contrôles fiscaux et contentieux',
        'Demandes d\'agrément, de resquittances et de sursis',
        'Veille fiscale et impact des lois de finances',
        'Fiscalité internationale et prix de transfert',
      ],
    },
  },
  {
    slug: 'expertise-comptable',
    icon: LineChart,
    title: 'Expertise comptable',
    desc: 'Tenue et révision comptable, états financiers et reporting fiable pour une meilleure prise de décision.',
    content: {
      intro:
        'Nous prenons en charge votre comptabilité avec rigueur et réactivité, de la tenue des comptes jusqu\'à la production des états financiers, afin de vous laisser pleinement concentré sur votre activité.',
      points: [
        'Tenue de la comptabilité générale et analytique',
        'Établissement des états financiers annuels',
        'Révision comptable et rapprochements',
        'Comptabilité de gestion et tableaux de bord',
        'Paie et gestion sociale',
        'Préparation des liasses fiscales',
      ],
    },
  },
  {
    slug: 'conseil-juridique',
    icon: Scale,
    title: 'Conseil juridique',
    desc: 'Accompagnement juridique des entreprises et sécurisation de vos opérations.',
    content: {
      intro:
        'Nous sécurisons vos décisions et vos opérations d\'un point de vue juridique, en étroite collaboration avec vos conseils afin de vous offrir une vision complète et cohérente.',
      points: [
        'Rédaction et revue de contrats commerciaux',
        'Constitution et restructuration de sociétés',
        'Opérations de fusion, scission et apport partiel d\'actifs',
        'Gouvernance et droit des sociétés',
        'Conventions d\'actionnaires et pactes d\'associés',
        'Accompagnement en droit social et du travail',
      ],
    },
  },
  {
    slug: 'conseil-en-gestion',
    icon: TrendingUp,
    title: 'Conseil en gestion',
    desc: 'Analyse financière, tableaux de bord et accompagnement à la performance.',
    content: {
      intro:
        'Nous vous aidons à piloter votre entreprise avec des outils de gestion performants : analyse financière, budgétisation et accompagnement à la décision stratégique.',
      points: [
        'Diagnostic financier et analyse de la rentabilité',
        'Budgets, prévisionnel et business plans',
        'Tableaux de bord et indicateurs de performance',
        'Accompagnement à la levée de fonds',
        'Analyse des coûts et amélioration de la marge',
        'Restructuration et plans de redressement',
      ],
    },
  },
  {
    slug: 'transactions-due-diligence',
    icon: Handshake,
    title: 'Transactions & due diligence',
    desc: "Évaluation, audit d'acquisition et accompagnement dans vos opérations stratégiques.",
    content: {
      intro:
        'Nous intervenons dans vos opérations de croissance externe, d\'acquisition ou de cession, avec une analyse approfondie des risques et de la valeur de la cible.',
      points: [
        'Due diligence financière, fiscale et juridique',
        'Évaluation d\'entreprises et de parts sociales',
        'Aide à la négociation des conditions de cession',
        'Structuration des acquisitions et des financements',
        'Rapports aux investisseurs et aux acquéreurs',
        'Suivi post-acquisition et intégration',
      ],
    },
  },
  {
    slug: 'creation-societe-tunisie',
    icon: Building2,
    title: 'Création de société en Tunisie',
    desc: 'Accompagnement complet de votre projet d\'implantation : forme juridique, immatriculation et formalités.',
    content: {
      intro:
        'De la validation de votre projet à son lancement opérationnel, nous vous accompagnons dans toutes les étapes de la création de votre société en Tunisie, pour les résidents comme pour les investisseurs étrangers.',
      points: [
        'Choix de la forme juridique adaptée (SARL, SA, SUARL, succursale)',
        'Rédaction des statuts et formalités de constitution',
        'Immatriculation au Registre National des Entreprises',
        'Obtention des autorisations et des codes d\'activité',
        'Ouverture du compte bancaire et dépôt du capital',
        'Immatriculation fiscale et affiliés CNSS / sécurité sociale',
        'Conseil sur les avantages fiscaux (code d\'incitations aux investissements)',
      ],
    },
  },
  {
    slug: 'assistance-comptable-fiscale-juridique-tunisie',
    icon: FileSpreadsheet,
    title: 'Assistance comptable, fiscale et juridique',
    desc: 'Un interlocuteur unique pour la gestion comptable, fiscale et juridique de votre activité en Tunisie.',
    content: {
      intro:
        'Notre formule d\'assistance globale vous offre un accompagnement permanent sur l\'ensemble de vos obligations comptables, fiscales et juridiques, avec un interlocuteur unique et des équipes pluridisciplinaires.',
      points: [
        'Tenue comptable externalisée et permanente',
        'Gestion de l\'ensemble des échéances fiscales et sociales',
        'Ressources humaines, contrats et paie',
        'Veille réglementaire et lois de finances',
        'Représentation auprès de l\'administration',
        'Accompagnement des investisseurs étrangers et non-résidents',
      ],
    },
  },
] as const;

export type Service = (typeof services)[number];
