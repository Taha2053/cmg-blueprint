import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
