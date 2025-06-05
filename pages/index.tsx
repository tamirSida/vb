import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import WhyVB from '../components/WhyVB';
import Programs from '../components/Programs';
import Team from '../components/Team';
import Portfolio from '../components/Portfolio';
import Mentors from '../components/Mentors';
import FundDetails from '../components/FundDetails';
import ApplicationProcess from '../components/ApplicationProcess';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <>
      <Head>
        <title>Version Bravo Ventures | Veteran-Led Accelerator & Venture Fund</title>
        <meta name="description" content="Version Bravo Ventures invests in veteran entrepreneurs who have already conquered the impossible. Combat-proven founders turning battlefield grit into entrepreneurial success." />
        <meta name="keywords" content="venture capital, veteran entrepreneurs, military startup accelerator, defense tech, veteran-led fund, startup funding, VB accelerator" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versionbravo.ventures/" />
        <meta property="og:title" content="Version Bravo Ventures | Veteran-Led Accelerator & Venture Fund" />
        <meta property="og:description" content="Investing in veteran entrepreneurs who have already conquered the impossible. Combat veterans turned successful entrepreneurs." />
        <meta property="og:image" content="https://versionbravo.ventures/favicon/web-app-manifest-512x512.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://versionbravo.ventures/" />
        <meta property="twitter:title" content="Version Bravo Ventures | Veteran-Led Accelerator & Venture Fund" />
        <meta property="twitter:description" content="Investing in veteran entrepreneurs who have already conquered the impossible. Combat veterans turned successful entrepreneurs." />
        <meta property="twitter:image" content="https://versionbravo.ventures/favicon/web-app-manifest-512x512.png" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Version Bravo Ventures" />
        <link rel="canonical" href="https://versionbravo.ventures/" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Version Bravo Ventures",
              "description": "Veteran-led accelerator and venture fund investing in military entrepreneurs",
              "url": "https://versionbravo.ventures",
              "logo": "https://versionbravo.ventures/images/brand/vbv-logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "business",
                "url": "https://versionbravo.ventures"
              },
              "sameAs": [
                "https://linkedin.com/company/version-bravo-ventures"
              ]
            })
          }}
        />
      </Head>

      <Header />
      <main>
        <HeroSection />
        <WhyVB />
        <Programs />
        <Team />
        <Mentors />
        <Portfolio />
        <FundDetails />
        <ApplicationProcess />
        <CTA />
      </main>
    </>
  );
}