import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../components/admin/DiscreteAdminAccess';

export default function Home() {
  // Enable discrete admin access methods
  useUrlAdminAccess();

  return (
    <>
      <Head>
        <title>Version Bravo | Veteran Entrepreneur Ecosystem</title>
        <meta name="description" content="Version Bravo empowers veteran entrepreneurs through education, acceleration, and investment - from battlefield leadership to business success." />
        <meta name="keywords" content="version bravo, veteran entrepreneurs, military startup ecosystem, veteran business support" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versionbravo.ventures/" />
        <meta property="og:title" content="Version Bravo | Veteran Entrepreneur Ecosystem" />
        <meta property="og:description" content="Empowering veteran entrepreneurs through education, acceleration, and investment." />
        <meta property="og:image" content="https://versionbravo.ventures/favicon/web-app-manifest-512x512.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://versionbravo.ventures/" />
        <meta property="twitter:title" content="Version Bravo | Veteran Entrepreneur Ecosystem" />
        <meta property="twitter:description" content="Empowering veteran entrepreneurs through education, acceleration, and investment." />
        <meta property="twitter:image" content="https://versionbravo.ventures/favicon/web-app-manifest-512x512.png" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Version Bravo" />
        <link rel="canonical" href="https://versionbravo.ventures/" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Version Bravo",
              "description": "Veteran entrepreneur ecosystem providing education, acceleration, and investment",
              "url": "https://versionbravo.ventures",
              "logo": "https://versionbravo.ventures/images/brand/vbv-logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "business",
                "url": "https://versionbravo.ventures"
              }
            })
          }}
        />
      </Head>

      <Header showNavigation={false} />
      <main>
        <HeroSection showScrollIndicator={false} />
      </main>
      
      {/* Discrete admin access methods */}
      <DiscreteAdminAccess />
    </>
  );
}