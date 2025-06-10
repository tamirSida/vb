import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';
import WhyVB from '../components/WhyVB';
import AcceleratorPrograms from '../components/AcceleratorPrograms';
import Team from '../components/Team';
import Portfolio from '../components/Portfolio';
import Mentors from '../components/Mentors';
import ApplicationProcess from '../components/ApplicationProcess';
import AcceleratorCTA from '../components/AcceleratorCTA';
import SectionManager from '../components/admin/SectionManager';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../components/admin/DiscreteAdminAccess';

export default function Accelerator() {
  const [sections, setSections] = useState([
    'whyVB', 'programs', 'team', 'mentors', 'portfolio', 'applicationProcess', 'cta'
  ]);

  // Enable discrete admin access methods
  useUrlAdminAccess();

  const handleAddSection = (sectionType: string, position: number) => {
    const newSections = [...sections];
    newSections.splice(position, 0, sectionType);
    setSections(newSections);
    console.log(`Adding ${sectionType} section at position ${position}`);
  };

  const renderSection = (sectionType: string, index: number) => {
    switch (sectionType) {
      case 'whyVB': return <WhyVB key={`whyVB-${index}`} />;
      case 'programs': return <AcceleratorPrograms key={`programs-${index}`} />;
      case 'team': return <Team key={`team-${index}`} />;
      case 'mentors': return <Mentors key={`mentors-${index}`} />;
      case 'portfolio': return <Portfolio key={`portfolio-${index}`} />;
      case 'applicationProcess': return <ApplicationProcess key={`applicationProcess-${index}`} />;
      case 'cta': return <AcceleratorCTA key={`cta-${index}`} />;
      default: 
        return (
          <div key={`custom-${index}`} className="section-padding bg-gray-100">
            <div className="container-max text-center">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                New {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} Section
              </h2>
              <p className="text-gray-600">
                This is a placeholder for the new {sectionType} section. Content can be customized through the CMS.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Version Bravo Accelerator | Veteran-Led Startup Accelerator</title>
        <meta name="description" content="Version Bravo Accelerator empowers veteran entrepreneurs with mentorship, funding, and resources. Combat-proven founders turning battlefield grit into entrepreneurial success." />
        <meta name="keywords" content="startup accelerator, veteran entrepreneurs, military startup program, defense tech accelerator, veteran-led accelerator, startup mentorship, VB accelerator" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versionbravo.ventures/accelerator" />
        <meta property="og:title" content="Version Bravo Accelerator | Veteran-Led Startup Accelerator" />
        <meta property="og:description" content="Empowering veteran entrepreneurs with mentorship, funding, and resources. Combat veterans turned successful entrepreneurs." />
        <meta property="og:image" content="https://versionbravo.ventures/favicon/web-app-manifest-512x512.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://versionbravo.ventures/accelerator" />
        <meta property="twitter:title" content="Version Bravo Accelerator | Veteran-Led Startup Accelerator" />
        <meta property="twitter:description" content="Empowering veteran entrepreneurs with mentorship, funding, and resources. Combat veterans turned successful entrepreneurs." />
        <meta property="twitter:image" content="https://versionbravo.ventures/favicon/web-app-manifest-512x512.png" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Version Bravo Ventures" />
        <link rel="canonical" href="https://versionbravo.ventures/accelerator" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Version Bravo Accelerator",
              "description": "Veteran-led startup accelerator empowering military entrepreneurs",
              "url": "https://versionbravo.ventures/accelerator",
              "logo": "https://versionbravo.ventures/images/brand/vbv-logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "business",
                "url": "https://versionbravo.ventures/accelerator"
              },
              "sameAs": [
                "https://linkedin.com/company/version-bravo-ventures"
              ]
            })
          }}
        />
      </Head>

      <Header />
      <main>
        {sections.map((sectionType, index) => (
          <div key={`section-${index}`}>
            {renderSection(sectionType, index)}
            <SectionManager 
              onAddSection={handleAddSection}
              position={index + 1}
            />
          </div>
        ))}
      </main>
      
      {/* Discrete admin access methods */}
      <DiscreteAdminAccess />
    </>
  );
}