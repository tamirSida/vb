import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Portfolio from '../../components/Portfolio';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../../components/admin/DiscreteAdminAccess';

export default function PortfolioPage() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  
  useUrlAdminAccess();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Portfolio | Version Bravo Accelerator</title>
        <meta name="description" content="63 companies accelerated with proven track record of successful investments in veteran-led startups. View our portfolio highlights." />
        <meta name="keywords" content="VB portfolio, version bravo portfolio, veteran startups, accelerated companies, military entrepreneur companies, defense tech startups" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versionbravo.ventures/accelerator/portfolio" />
        <meta property="og:title" content="Portfolio | Version Bravo Accelerator" />
        <meta property="og:description" content="63 companies accelerated with proven track record of successful investments in veteran-led startups." />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://versionbravo.ventures/accelerator/portfolio" />
      </Head>

      <Header isAcceleratorPage={true} />
      
      <main>
        {isPageLoading ? (
          <div className="min-h-screen flex items-center justify-center bg-vb-navy">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-vb-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg font-medium">Loading...</p>
            </div>
          </div>
        ) : (
          <Portfolio />
        )}
      </main>
      
      <DiscreteAdminAccess />
    </>
  );
}