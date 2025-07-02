import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Mentors from '../../components/Mentors';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../../components/admin/DiscreteAdminAccess';

export default function MentorsPage() {
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
        <title>Mentors | Version Bravo Accelerator</title>
        <meta name="description" content="Industry experts and successful entrepreneurs providing guidance to our portfolio companies. Meet our mentor network." />
        <meta name="keywords" content="VB mentors, accelerator mentors, startup mentors, entrepreneur mentors, veteran mentor network, industry experts" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versionbravo.ventures/accelerator/mentors" />
        <meta property="og:title" content="Mentors | Version Bravo Accelerator" />
        <meta property="og:description" content="Industry experts and successful entrepreneurs providing guidance to our portfolio companies." />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://versionbravo.ventures/accelerator/mentors" />
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
          <Mentors />
        )}
      </main>
      
      <DiscreteAdminAccess />
    </>
  );
}