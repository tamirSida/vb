import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import WhyVB from '../../components/WhyVB';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../../components/admin/DiscreteAdminAccess';

export default function WhyVBPage() {
  useUrlAdminAccess();

  return (
    <>
      <Head>
        <title>Why VB | Version Bravo Accelerator</title>
        <meta name="description" content="Why entrepreneurs choose Version Bravo - veteran-led accelerator with proven track record and unparalleled network." />
        <meta name="keywords" content="version bravo accelerator, why choose VB, veteran entrepreneur accelerator, military startup program" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versionbravo.ventures/accelerator/why-vb" />
        <meta property="og:title" content="Why VB | Version Bravo Accelerator" />
        <meta property="og:description" content="Why entrepreneurs choose Version Bravo - veteran-led accelerator with proven track record and unparalleled network." />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://versionbravo.ventures/accelerator/why-vb" />
      </Head>

      <Header isAcceleratorPage={true} />
      
      <main>
        <WhyVB />
        
      </main>
      
      <DiscreteAdminAccess />
    </>
  );
}