import Head from 'next/head';
import Header from '../components/Header';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../components/admin/DiscreteAdminAccess';

export default function NonProfit() {
  // Enable discrete admin access methods
  useUrlAdminAccess();

  return (
    <>
      <Head>
        <title>Version Bravo Non-Profit Program | Veteran Entrepreneur Education</title>
        <meta name="description" content="Version Bravo's non-profit program providing education and support for veteran entrepreneurs." />
        <meta name="keywords" content="veteran non-profit, military entrepreneur education, veteran support program" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versionbravo.ventures/non-profit" />
        <meta property="og:title" content="Version Bravo Non-Profit Program" />
        <meta property="og:description" content="Education and support programs for veteran entrepreneurs." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://versionbravo.ventures/non-profit" />
        <meta property="twitter:title" content="Version Bravo Non-Profit Program" />
        <meta property="twitter:description" content="Education and support programs for veteran entrepreneurs." />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://versionbravo.ventures/non-profit" />
      </Head>

      <Header />
      <main>
        <section className="section-padding bg-light text-dark min-h-screen flex items-center">
          <div className="container-max text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-700">
              Non-Profit Program
            </h1>
            <p className="text-xl text-medium max-w-3xl mx-auto mb-8">
              Coming Soon - Version Bravo's educational and support programs for veteran entrepreneurs.
            </p>
            <div className="max-w-2xl mx-auto">
              <p className="text-medium leading-relaxed">
                Our non-profit arm will provide essential education, mentorship, and resources 
                to help veteran entrepreneurs develop their business skills and build successful companies. 
                Stay tuned for program announcements and enrollment opportunities.
              </p>
            </div>
            <div className="mt-12">
              <a 
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                ← Back to Version Bravo
              </a>
            </div>
          </div>
        </section>
      </main>
      
      {/* Discrete admin access methods */}
      <DiscreteAdminAccess />
    </>
  );
}