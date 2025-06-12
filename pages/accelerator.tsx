import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import Header from '../components/Header';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../components/admin/DiscreteAdminAccess';

export default function Accelerator() {
  // Enable discrete admin access methods
  useUrlAdminAccess();

  // Function to handle smooth scrolling to specific page
  const scrollToPage = (pageNumber: number) => {
    const targetPage = document.querySelector(`[data-page="${pageNumber}"]`);
    if (targetPage) {
      targetPage.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Intersection Observer for page transitions and navigation updates
    const observerOptions = {
      threshold: 0.5, // Trigger when 50% of the page is visible
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const pageElement = entry.target as HTMLElement;
        const pageNumber = pageElement.getAttribute('data-page');
        
        if (entry.isIntersecting && pageNumber) {
          // Update active navigation state
          updateActiveNavigation(parseInt(pageNumber));
          
          // Trigger page appearance animation
          animatePageAppearance(pageElement);
        } else if (!entry.isIntersecting && pageNumber) {
          // Reset page when it leaves viewport
          resetPageAppearance(pageElement);
        }
      });
    }, observerOptions);

    // Observe all page elements
    const pages = document.querySelectorAll('[data-page]');
    pages.forEach(page => observer.observe(page));

    // Initial animation for the first page
    setTimeout(() => {
      const firstPage = document.querySelector('[data-page="1"]');
      if (firstPage) {
        animatePageAppearance(firstPage as HTMLElement);
        updateActiveNavigation(1);
      }
    }, 500);

    // Cleanup
    return () => {
      pages.forEach(page => observer.unobserve(page));
    };
  }, []);

  // Function to update active navigation state
  const updateActiveNavigation = (activePageNumber: number) => {
    // Update navigation buttons across all pages
    document.querySelectorAll('[data-page]').forEach(page => {
      const navButtons = page.querySelectorAll('button');
      navButtons.forEach((button, index) => {
        const buttonPageNumber = index + 1;
        
        if (buttonPageNumber === activePageNumber) {
          // Active state
          button.className = "w-10 h-10 rounded-full bg-vb-gold text-vb-navy flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer";
        } else {
          // Inactive state
          button.className = "w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer";
        }
      });
    });
  };

  // Function to animate page appearance
  const animatePageAppearance = (pageElement: HTMLElement) => {
    const content = pageElement.querySelector('.max-w-lg');
    const navContainer = pageElement.querySelector('.absolute.left-2');
    const backgroundImage = pageElement.querySelector('img');
    
    if (content && navContainer && backgroundImage) {
      // Animate background image first
      setTimeout(() => {
        backgroundImage.classList.remove('opacity-0', 'scale-105');
        backgroundImage.classList.add('opacity-100', 'scale-100');
      }, 0);
      
      // Trigger content animations with slight delay
      setTimeout(() => {
        content.classList.remove('opacity-0', 'translate-x-12');
        content.classList.add('opacity-100', 'translate-x-0');
      }, 200);
      
      setTimeout(() => {
        navContainer.classList.remove('opacity-0', '-translate-x-5');
        navContainer.classList.add('opacity-100', 'translate-x-0');
      }, 400);
    }
  };

  // Function to reset page appearance when leaving viewport
  const resetPageAppearance = (pageElement: HTMLElement) => {
    const content = pageElement.querySelector('.max-w-lg');
    const navContainer = pageElement.querySelector('.absolute.left-2');
    const backgroundImage = pageElement.querySelector('img');
    
    if (content && navContainer && backgroundImage) {
      // Reset background image
      backgroundImage.classList.remove('opacity-100', 'scale-100');
      backgroundImage.classList.add('opacity-0', 'scale-105');
      
      // Reset to initial hidden state
      content.classList.remove('opacity-100', 'translate-x-0');
      content.classList.add('opacity-0', 'translate-x-12');
      
      navContainer.classList.remove('opacity-100', 'translate-x-0');
      navContainer.classList.add('opacity-0', '-translate-x-5');
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

      <Header isAcceleratorPage={true} />
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-vb-navy to-vb-medium text-white relative overflow-hidden">
          <div className="container-max text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Why Entrepreneurs Choose Version Bravo
            </h1>
          </div>
        </section>

        {/* Page-Style Navigation Section */}
        <section className="relative">
          {/* Page 1 - Team of Successful Operators */}
          <div className="h-screen relative overflow-hidden" data-page="1">
            <img 
              src="/images/accelerator/whyvb1.jpg" 
              alt="Team of successful operators" 
              className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-1000 ease-out"
            />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-vb-navy/80 backdrop-blur-sm"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 px-12">
              <div className="max-w-lg ml-16 opacity-0 transform translate-x-12 transition-all duration-700 ease-out">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 space-y-3 opacity-0 -translate-x-5 transition-all duration-500 ease-out">
                  <button onClick={() => scrollToPage(1)} className="w-10 h-10 rounded-full bg-vb-gold text-vb-navy flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">1</p>
                  </button>
                  <button onClick={() => scrollToPage(2)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">2</p>
                  </button>
                  <button onClick={() => scrollToPage(3)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">3</p>
                  </button>
                  <button onClick={() => scrollToPage(4)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">4</p>
                  </button>
                  <button onClick={() => scrollToPage(5)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">5</p>
                  </button>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-white">Team of Successful Operators</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  We are not passive investors; we're in the trenches with our founders. Our track record as value-add advisors means hands-on support when you need it most.
                </p>
              </div>
            </div>
          </div>

          {/* Page 2 - Unparalleled Network */}
          <div className="h-screen relative overflow-hidden" data-page="2">
            <img 
              src="/images/accelerator/whyvb2.jpg" 
              alt="Veteran entrepreneur network" 
              className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-1000 ease-out"
            />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-vb-navy/80 backdrop-blur-sm"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 px-12">
              <div className="max-w-lg ml-16 opacity-0 transform translate-x-12 transition-all duration-700 ease-out">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 space-y-3 opacity-0 -translate-x-5 transition-all duration-500 ease-out">
                  <button onClick={() => scrollToPage(1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">1</p>
                  </button>
                  <button onClick={() => scrollToPage(2)} className="w-10 h-10 rounded-full bg-vb-gold text-vb-navy flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">2</p>
                  </button>
                  <button onClick={() => scrollToPage(3)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">3</p>
                  </button>
                  <button onClick={() => scrollToPage(4)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">4</p>
                  </button>
                  <button onClick={() => scrollToPage(5)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">5</p>
                  </button>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-white">Unparalleled Network</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Access to entrepreneurs, industry experts, veteran foundations, and military transition organizations. Our network becomes your network.
                </p>
              </div>
            </div>
          </div>

          {/* Page 3 - We Understand Veterans */}
          <div className="h-screen relative overflow-hidden" data-page="3">
            <img 
              src="/images/accelerator/whyvb3.jpg" 
              alt="Veteran entrepreneurs" 
              className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-1000 ease-out"
            />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-vb-navy/80 backdrop-blur-sm"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 px-12">
              <div className="max-w-lg ml-16 opacity-0 transform translate-x-12 transition-all duration-700 ease-out">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 space-y-3 opacity-0 -translate-x-5 transition-all duration-500 ease-out">
                  <button onClick={() => scrollToPage(1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">1</p>
                  </button>
                  <button onClick={() => scrollToPage(2)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">2</p>
                  </button>
                  <button onClick={() => scrollToPage(3)} className="w-10 h-10 rounded-full bg-vb-gold text-vb-navy flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">3</p>
                  </button>
                  <button onClick={() => scrollToPage(4)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">4</p>
                  </button>
                  <button onClick={() => scrollToPage(5)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">5</p>
                  </button>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-white">We Understand Veterans</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Shared experience, trust, and mindset. We understand the veteran entrepreneur because we are veteran entrepreneurs.
                </p>
              </div>
            </div>
          </div>

          {/* Page 4 - Built by Veterans, for Veterans */}
          <div className="h-screen relative overflow-hidden" data-page="4">
            <img 
              src="/images/accelerator/whyvb4.jpg" 
              alt="Accelerator program" 
              className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-1000 ease-out"
            />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-vb-navy/80 backdrop-blur-sm"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 px-12">
              <div className="max-w-lg ml-16 opacity-0 transform translate-x-12 transition-all duration-700 ease-out">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 space-y-3 opacity-0 -translate-x-5 transition-all duration-500 ease-out">
                  <button onClick={() => scrollToPage(1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">1</p>
                  </button>
                  <button onClick={() => scrollToPage(2)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">2</p>
                  </button>
                  <button onClick={() => scrollToPage(3)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">3</p>
                  </button>
                  <button onClick={() => scrollToPage(4)} className="w-10 h-10 rounded-full bg-vb-gold text-vb-navy flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">4</p>
                  </button>
                  <button onClick={() => scrollToPage(5)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">5</p>
                  </button>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-white">Built by Veterans, for Veterans</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  4 years of experience, 58 combat veteran founders graduated. Our accelerator was purpose-built for the veteran entrepreneur journey.
                </p>
              </div>
            </div>
          </div>

          {/* Page 5 - Experienced Advisory Board */}
          <div className="h-screen relative overflow-hidden" data-page="5">
            <img 
              src="/images/accelerator/whyvb5.jpg" 
              alt="Experienced advisory board" 
              className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-1000 ease-out"
            />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-vb-navy/80 backdrop-blur-sm"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 px-12">
              <div className="max-w-lg ml-16 opacity-0 transform translate-x-12 transition-all duration-700 ease-out">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 space-y-3 opacity-0 -translate-x-5 transition-all duration-500 ease-out">
                  <button onClick={() => scrollToPage(1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">1</p>
                  </button>
                  <button onClick={() => scrollToPage(2)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">2</p>
                  </button>
                  <button onClick={() => scrollToPage(3)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">3</p>
                  </button>
                  <button onClick={() => scrollToPage(4)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">4</p>
                  </button>
                  <button onClick={() => scrollToPage(5)} className="w-10 h-10 rounded-full bg-vb-gold text-vb-navy flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <p className="text-sm font-bold">5</p>
                  </button>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-white">Experienced Advisory Board</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Decades of VC and technical expertise across sectors and stages. Strategic guidance from those who've built successful companies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation to Subpages */}
        <section className="section-padding bg-vb-light">
          <div className="container-max">
            <h2 className="text-3xl font-bold text-vb-navy mb-12 text-center">
              Explore Our Accelerator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Link href="/accelerator/program" className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 bg-vb-gold rounded-full flex items-center justify-center group-hover:bg-vb-navy transition-colors duration-300">
                  <i className="fas fa-graduation-cap text-2xl text-vb-navy group-hover:text-vb-gold transition-colors duration-300"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-vb-navy group-hover:text-vb-gold transition-colors">
                  Our Program
                </h3>
                <p className="text-vb-medium mb-6 leading-relaxed">
                  Intensive 10-week program designed for veteran entrepreneurs ready to scale
                </p>
                <div className="text-vb-gold font-medium group-hover:text-vb-navy transition-colors">
                  View Program →
                </div>
              </Link>
              
              <Link href="/accelerator/application" className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 bg-vb-gold rounded-full flex items-center justify-center group-hover:bg-vb-navy transition-colors duration-300">
                  <i className="fas fa-file-alt text-2xl text-vb-navy group-hover:text-vb-gold transition-colors duration-300"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-vb-navy group-hover:text-vb-gold transition-colors">
                  Application Process
                </h3>
                <p className="text-vb-medium mb-6 leading-relaxed">
                  3-week streamlined process with transparent, veteran-to-veteran evaluation
                </p>
                <div className="text-vb-gold font-medium group-hover:text-vb-navy transition-colors">
                  Apply Now →
                </div>
              </Link>
              
              <Link href="/accelerator/team" className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 bg-vb-gold rounded-full flex items-center justify-center group-hover:bg-vb-navy transition-colors duration-300">
                  <i className="fas fa-users text-2xl text-vb-navy group-hover:text-vb-gold transition-colors duration-300"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-vb-navy group-hover:text-vb-gold transition-colors">
                  Our Team
                </h3>
                <p className="text-vb-medium mb-6 leading-relaxed">
                  Meet our leadership team of combat veterans, entrepreneurs, and investors
                </p>
                <div className="text-vb-gold font-medium group-hover:text-vb-navy transition-colors">
                  Meet the Team →
                </div>
              </Link>
              
              <Link href="/accelerator/portfolio" className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 bg-vb-gold rounded-full flex items-center justify-center group-hover:bg-vb-navy transition-colors duration-300">
                  <i className="fas fa-briefcase text-2xl text-vb-navy group-hover:text-vb-gold transition-colors duration-300"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-vb-navy group-hover:text-vb-gold transition-colors">
                  Portfolio
                </h3>
                <p className="text-vb-medium mb-6 leading-relaxed">
                  63 companies accelerated with proven track record of successful investments
                </p>
                <div className="text-vb-gold font-medium group-hover:text-vb-navy transition-colors">
                  View Portfolio →
                </div>
              </Link>
              
              <Link href="/accelerator/mentors" className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 bg-vb-gold rounded-full flex items-center justify-center group-hover:bg-vb-navy transition-colors duration-300">
                  <i className="fas fa-handshake text-2xl text-vb-navy group-hover:text-vb-gold transition-colors duration-300"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-vb-navy group-hover:text-vb-gold transition-colors">
                  Mentors
                </h3>
                <p className="text-vb-medium mb-6 leading-relaxed">
                  Industry experts and successful entrepreneurs providing guidance
                </p>
                <div className="text-vb-gold font-medium group-hover:text-vb-navy transition-colors">
                  Meet Our Mentors →
                </div>
              </Link>
              
              <Link href="/accelerator/why-vb" className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 bg-vb-gold rounded-full flex items-center justify-center group-hover:bg-vb-navy transition-colors duration-300">
                  <i className="fas fa-star text-2xl text-vb-navy group-hover:text-vb-gold transition-colors duration-300"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-vb-navy group-hover:text-vb-gold transition-colors">
                  Why Choose VB
                </h3>
                <p className="text-vb-medium mb-6 leading-relaxed">
                  Detailed breakdown of what makes Version Bravo different
                </p>
                <div className="text-vb-gold font-medium group-hover:text-vb-navy transition-colors">
                  Learn More →
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Discrete admin access methods */}
      <DiscreteAdminAccess />
    </>
  );
}