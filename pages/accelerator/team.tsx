import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Team from '../../components/Team';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../../components/admin/DiscreteAdminAccess';

export default function TeamPage() {
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
        <title>Team | Version Bravo Accelerator</title>
        <meta name="description" content="Meet the Version Bravo team - combat veterans, entrepreneurs, and investors leading the next generation of veteran-founded companies." />
        <meta name="keywords" content="VB team, version bravo team, veteran leadership, accelerator team, military entrepreneurs, VB general partners" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versionbravo.ventures/accelerator/team" />
        <meta property="og:title" content="Team | Version Bravo Accelerator" />
        <meta property="og:description" content="Meet the Version Bravo team - combat veterans, entrepreneurs, and investors." />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://versionbravo.ventures/accelerator/team" />
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
          <Team />
        )}
      </main>
      
      <DiscreteAdminAccess />
    </>
  );
}