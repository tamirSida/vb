import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import AcceleratorPrograms from '../../components/AcceleratorPrograms';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../../components/admin/DiscreteAdminAccess';

export default function ProgramPage() {
  useUrlAdminAccess();

  return (
    <>
      <Head>
        <title>Our Accelerator Program | Version Bravo</title>
        <meta name="description" content="Intensive 10-week program designed for veteran entrepreneurs ready to scale their startups. $100K investment, Israel & USA bootcamp." />
        <meta name="keywords" content="accelerator program, 10 week program, startup bootcamp, veteran entrepreneur program, VB accelerator details" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versionbravo.ventures/accelerator/program" />
        <meta property="og:title" content="Our Accelerator Program | Version Bravo" />
        <meta property="og:description" content="Intensive 10-week program designed for veteran entrepreneurs ready to scale their startups." />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://versionbravo.ventures/accelerator/program" />
      </Head>

      <Header isAcceleratorPage={true} />
      
      <main>
        <AcceleratorPrograms />
        
      </main>
      
      <DiscreteAdminAccess />
    </>
  );
}