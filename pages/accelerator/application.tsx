import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import ApplicationProcess from '../../components/ApplicationProcess';
import AcceleratorCTA from '../../components/AcceleratorCTA';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../../components/admin/DiscreteAdminAccess';

export default function ApplicationPage() {
  useUrlAdminAccess();

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
        <ApplicationProcess />
        <AcceleratorCTA />
        
      </main>
      
      <DiscreteAdminAccess />
    </>
  );
}