import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ApplicationProcess from '../../components/ApplicationProcess';
import AcceleratorCTA from '../../components/AcceleratorCTA';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../../components/admin/DiscreteAdminAccess';

export default function ApplicationPage() {
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
        <title>Application Process | Version Bravo Accelerator</title>
        <meta name="description" content="3-week streamlined application process for veteran entrepreneurs. Transparent, veteran-to-veteran evaluation with weekly progress updates." />
        <meta name="keywords" content="application process, startup application, accelerator application, veteran entrepreneur application, VB application timeline" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versionbravo.ventures/accelerator/application" />
        <meta property="og:title" content="Application Process | Version Bravo Accelerator" />
        <meta property="og:description" content="3-week streamlined application process for veteran entrepreneurs with transparent feedback." />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://versionbravo.ventures/accelerator/application" />
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
          <>
            <ApplicationProcess />
            <AcceleratorCTA />
          </>
        )}
      </main>
      
      <DiscreteAdminAccess />
    </>
  );
}