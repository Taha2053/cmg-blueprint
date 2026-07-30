import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, Pinyon_Script } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import IntroLoader from '@/components/IntroLoader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-signature',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cabinetguellaty.com'),
  title: {
    default: 'Cabinet Mourad Guellaty (MG & Associés) | Audit & Conseil — Tunisie',
    template: '%s | MG & Associés',
  },
  description:
    'Cabinet Mourad Guellaty (MG & Associés) — audit légal, commissariat aux comptes, conseil fiscal et expertise comptable à La Marsa, Tunis. Fondé par Mourad Guellaty, ancien président de l’Ordre des Experts Comptables de Tunisie.',
  keywords: [
    'audit Tunisie',
    'expertise comptable Tunis',
    'commissariat aux comptes',
    'conseil fiscal Tunisie',
    'Cabinet Mourad Guellaty',
    'MG & Associés',
    'La Marsa',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_TN',
    url: 'https://www.cabinetguellaty.com',
    siteName: 'Cabinet Mourad Guellaty — MG & Associés',
    title: 'Cabinet Mourad Guellaty (MG & Associés) | Audit & Conseil — Tunisie',
    description:
      'Audit, commissariat aux comptes, conseil fiscal et expertise comptable à La Marsa, Tunis.',
    images: [
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Cabinet Mourad Guellaty — MG & Associés' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cabinet Mourad Guellaty (MG & Associés)',
    description: 'Audit, conseil fiscal et expertise comptable à La Marsa, Tunis.',
    images: ['/og-image.jpg'],
  },
  icons: { icon: '/favicon.ico' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: 'Cabinet Mourad Guellaty — MG & Associés',
  image: 'https://www.cabinetguellaty.com/og-image.jpg',
  '@id': 'https://www.cabinetguellaty.com',
  url: 'https://www.cabinetguellaty.com',
  telephone: '+216 71 740 131',
  faxNumber: '+216 71 740 197',
  email: 'contact@cabinetguellaty.com',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '45 Avenue de la République',
    addressLocality: 'La Marsa',
    postalCode: '2078',
    addressRegion: 'Tunis',
    addressCountry: 'TN',
  },
  areaServed: { '@type': 'Country', name: 'Tunisie' },
  founder: { '@type': 'Person', name: 'Mourad Guellaty' },
  openingHours: 'Mo-Fr 08:30-17:30',
  knowsLanguage: ['fr', 'ar', 'en'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable} ${pinyon.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <IntroLoader />
        <SmoothScroll />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
