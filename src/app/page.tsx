import Header from '@/components/public/Header';
import Hero from '@/components/public/Hero';
import StatsBar from '@/components/public/StatsBar';
import MerciMourad from '@/components/public/MerciMourad';
import About from '@/components/public/About';
import Societies from '@/components/public/Societies';
import Services from '@/components/public/Services';
import Secteurs from '@/components/public/Secteurs';
import Team from '@/components/public/Team';
import PublicNews from '@/components/public/PublicNews';
import Articles from '@/components/public/Articles';
import Careers from '@/components/public/Careers';
import Contact from '@/components/public/Contact';
import NewsletterSection from '@/components/public/NewsletterSection';
import CTABanner from '@/components/public/CTABanner';
import Footer from '@/components/public/Footer';

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <MerciMourad />
        <About />
        <Societies />
        <Services />
        <Secteurs />
        <Team />
        <PublicNews />
        <Articles />
        <Careers />
        <Contact />
        <NewsletterSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
