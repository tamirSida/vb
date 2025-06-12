import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Mentors from '../../components/Mentors';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../../components/admin/DiscreteAdminAccess';

export default function MentorsPage() {
  useUrlAdminAccess();

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
        <Mentors />
        
      </main>
      
      <DiscreteAdminAccess />
    </>
  );
}