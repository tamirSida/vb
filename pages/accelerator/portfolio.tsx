import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Portfolio from '../../components/Portfolio';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../../components/admin/DiscreteAdminAccess';

export default function PortfolioPage() {
  useUrlAdminAccess();

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
        <Portfolio />
        
      </main>
      
      <DiscreteAdminAccess />
    </>
  );
}