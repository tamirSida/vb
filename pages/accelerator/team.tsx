import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Team from '../../components/Team';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../../components/admin/DiscreteAdminAccess';

export default function TeamPage() {
  useUrlAdminAccess();

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
        <Team />
        
      </main>
      
      <DiscreteAdminAccess />
    </>
  );
}