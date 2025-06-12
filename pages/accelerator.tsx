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
      threshold: 0.3, // Trigger when 30% of the page is visible
      rootMargin: '-10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const pageElement = entry.target as HTMLElement;
        const pageNumber = pageElement.getAttribute('data-page');
        
        if (entry.isIntersecting && pageNumber) {
          console.log(`Page ${pageNumber} is now visible`);
          // Update active navigation state
          updateActiveNavigation(parseInt(pageNumber));
          
          // Trigger page appearance animation
          animatePageAppearance(pageElement);
        } else if (!entry.isIntersecting && pageNumber) {
          console.log(`Page ${pageNumber} left viewport`);
          // Reset page when it leaves viewport
          resetPageAppearance(pageElement);
        }
      });
    }, observerOptions);

    // Intersection Observer for Explore Accelerator section
    const exploreObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.accelerator-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-in');
            }, index * 100);
          });
        }
      });
    }, { threshold: 0.2 });

    // Observe all page elements
    const pages = document.querySelectorAll('[data-page]');
    pages.forEach(page => observer.observe(page));

    // Observe the explore accelerator section
    const exploreSection = document.querySelector('.explore-accelerator-section');
    if (exploreSection) {
      exploreObserver.observe(exploreSection);
    }

    // Initial setup for the first page
    setTimeout(() => {
      updateActiveNavigation(1);
    }, 100);

    // Cleanup
    return () => {
      pages.forEach(page => observer.unobserve(page));
      if (exploreSection) {
        exploreObserver.unobserve(exploreSection);
      }
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
          // Active state - white background with navy text
          button.className = "w-10 h-10 rounded-full bg-white text-vb-navy flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer";
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
    const navContainer = pageElement.querySelector('div[class*="-left-20"]');
    const backgroundImage = pageElement.querySelector('img');
    
    console.log('Animating page:', {content, navContainer, backgroundImage});
    
    if (content && navContainer && backgroundImage) {
      // Animate background image first
      setTimeout(() => {
        backgroundImage.classList.remove('opacity-0', 'scale-105');
        backgroundImage.classList.add('opacity-100', 'scale-100');
        console.log('Image animated');
      }, 0);
      
      // Trigger content animations with slight delay
      setTimeout(() => {
        content.classList.remove('opacity-0', 'translate-x-12');
        content.classList.add('opacity-100', 'translate-x-0');
        console.log('Content animated');
      }, 200);
      
      setTimeout(() => {
        navContainer.classList.remove('opacity-0', '-translate-x-5');
        navContainer.classList.add('opacity-100', 'translate-x-0');
        console.log('Navigation animated');
      }, 400);
    } else {
      console.log('Missing elements for animation');
    }
  };

  // Function to reset page appearance when leaving viewport
  const resetPageAppearance = (pageElement: HTMLElement) => {
    const content = pageElement.querySelector('.max-w-lg');
    const navContainer = pageElement.querySelector('div[class*="-left-20"]');
    const backgroundImage = pageElement.querySelector('img');
    
    // Skip resetting the first page
    const pageNumber = pageElement.getAttribute('data-page');
    if (pageNumber === '1') return;
    
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
        
        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .accelerator-card {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.6s ease-out;
          }
          .accelerator-card.animate-in {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
        
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
              className="absolute inset-0 w-full h-full object-cover opacity-100 scale-100 transition-all duration-1000 ease-out"
            />
            <div className="absolute left-0 top-0 w-1/2 h-full bg-black/40"></div>
            <div className="absolute right-0 top-0 w-1/2 h-full bg-vb-navy/80 backdrop-blur-sm"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 px-12">
              <div className="max-w-lg ml-24 opacity-100 transform translate-x-0 transition-all duration-700 ease-out">
                <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 space-y-3 opacity-100 translate-x-0 transition-all duration-500 ease-out z-10">
                  <button onClick={() => scrollToPage(1)} className="w-10 h-10 rounded-full bg-white text-vb-navy flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
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

          {/* Quote 1 - Andre Gomez */}
          <div className="h-[80vh] bg-gradient-to-br from-vb-navy to-vb-medium text-white flex items-center justify-center px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <img 
                  src="/images/testimonials/andre-gomez.jpg" 
                  alt="Andre Gomez" 
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-vb-gold"
                />
                <i className="fas fa-quote-left text-3xl text-vb-gold mb-4 block"></i>
              </div>
              <blockquote className="text-lg md:text-xl leading-relaxed mb-6 font-light italic">
                "Having spent my career perfecting the intelligence process and targeting of the enemy, I knew there was much to learn in the finance space. I applied to Version Bravo hoping to learn the language, process and the art of capital-raising and to understand the culture and what was required to grow a project from scratch. Thankfully, I received so much more. The program provided me the technical knowledge, language and tools to speak confidently and share my vision with investors. Today, I continue to run my government contract company, a small cleaning business and to pitch a Web3, digital sovereignty solution to give the internet back to the user."
              </blockquote>
              <div className="text-white/90">
                <p className="font-semibold text-lg">Andre Gomez</p>
                <p className="text-sm">Former US Navy SEAL (BUD/s Class 229)</p>
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
            <div className="absolute left-0 top-0 w-1/2 h-full bg-black/40"></div>
            <div className="absolute right-0 top-0 w-1/2 h-full bg-vb-navy/80 backdrop-blur-sm"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 px-12">
              <div className="max-w-lg ml-24 opacity-0 transform translate-x-12 transition-all duration-700 ease-out">
                <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 space-y-3 opacity-0 -translate-x-5 transition-all duration-500 ease-out z-10">
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

          {/* Quote 2 - Or Yustman */}
          <div className="h-[80vh] bg-gradient-to-br from-vb-navy to-vb-medium text-white flex items-center justify-center px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <img 
                  src="/images/testimonials/or-yustman.jpg" 
                  alt="Or Yustman" 
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-vb-gold"
                />
                <i className="fas fa-quote-left text-3xl text-vb-gold mb-4 block"></i>
              </div>
              <blockquote className="text-lg md:text-xl leading-relaxed mb-6 font-light italic">
                "Version Bravo was an insightful experience for me, at the entrepreneurship level, but more importantly, at the emotional one. We can clearly see the growth in our ability to crystalize our business strategies and fine-tune the pitch to investors in the program's last session. But the feeling of 'safe harbor' to share your thoughts, ideas or events from the SEALs service with people that understand your point of view in the blink of an eye were beyond my expectations."
              </blockquote>
              <div className="text-white/90">
                <p className="font-semibold text-lg">Or Yustman</p>
                <p className="text-sm">Lieutenant-Commander (Res.) in Shayetet-13/Israel Navy SEALs</p>
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
            <div className="absolute left-0 top-0 w-1/2 h-full bg-black/40"></div>
            <div className="absolute right-0 top-0 w-1/2 h-full bg-vb-navy/80 backdrop-blur-sm"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 px-12">
              <div className="max-w-lg ml-24 opacity-0 transform translate-x-12 transition-all duration-700 ease-out">
                <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 space-y-3 opacity-0 -translate-x-5 transition-all duration-500 ease-out z-10">
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
            <div className="absolute left-0 top-0 w-1/2 h-full bg-black/40"></div>
            <div className="absolute right-0 top-0 w-1/2 h-full bg-vb-navy/80 backdrop-blur-sm"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 px-12">
              <div className="max-w-lg ml-24 opacity-0 transform translate-x-12 transition-all duration-700 ease-out">
                <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 space-y-3 opacity-0 -translate-x-5 transition-all duration-500 ease-out z-10">
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

          {/* Quote 3 - Jonathan Cleck */}
          <div className="h-[80vh] bg-gradient-to-br from-vb-navy to-vb-medium text-white flex items-center justify-center px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <img 
                  src="/images/testimonials/jonathan-cleck.jpg" 
                  alt="Jonathan Cleck" 
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-vb-gold"
                />
                <i className="fas fa-quote-left text-3xl text-vb-gold mb-4 block"></i>
              </div>
              <blockquote className="text-lg md:text-xl leading-relaxed mb-6 font-light italic">
                "I was fortunate to find Version Bravo at a time when my venture was ready for growth but I recognized that I had some gaps in my ability to lead the company to its next level. My experience in the SEAL teams had given me the confidence to take on the challenge, but to scale, I needed knowledge in specialized areas and a trusted support team to be my sounding board as we grew. That's exactly what I found with AFINS' Version Bravo program. Since starting the program, our venture has put numerous structures, people and processes in-place to help us prepare for and even get ahead of our future growth—all things directly attributable to what I learned and the group of mentors that I have come to rely on through Version Bravo. We are on track to create a lot of jobs, to disrupt our industry and to generate a lot of revenue."
              </blockquote>
              <div className="text-white/90">
                <p className="font-semibold text-lg">Jonathan Cleck</p>
                <p className="text-sm">Former US Navy SEAL (BUD/s Class 213), CXO of Concihairge</p>
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
            <div className="absolute left-0 top-0 w-1/2 h-full bg-black/40"></div>
            <div className="absolute right-0 top-0 w-1/2 h-full bg-vb-navy/80 backdrop-blur-sm"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 px-12">
              <div className="max-w-lg ml-24 opacity-0 transform translate-x-12 transition-all duration-700 ease-out">
                <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 space-y-3 opacity-0 -translate-x-5 transition-all duration-500 ease-out z-10">
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
        <section className="section-padding bg-white explore-accelerator-section">
          <div className="container-max">
            <h2 className="text-4xl font-bold text-vb-navy mb-16 text-center">
              Explore Our Accelerator
            </h2>
            <div className="max-w-6xl mx-auto">
              {/* First row - 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <Link href="/accelerator/program" className="accelerator-card group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 hover:scale-105 border border-gray-100 hover:border-vb-gold">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-vb-gold to-yellow-400 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-vb-navy group-hover:to-vb-medium transition-all duration-500 shadow-lg group-hover:shadow-xl transform group-hover:rotate-12">
                    <i className="fas fa-graduation-cap text-2xl text-vb-navy group-hover:text-white transition-all duration-500"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-6 text-vb-navy group-hover:text-vb-gold transition-all duration-300">
                    Our Program
                  </h3>
                  <div className="text-vb-gold font-semibold group-hover:text-vb-navy transition-all duration-300 flex items-center justify-center">
                    <span>View Program</span>
                    <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-2 transition-transform duration-300"></i>
                  </div>
                </Link>
                
                <Link href="/accelerator/application" className="accelerator-card group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 hover:scale-105 border border-gray-100 hover:border-vb-gold">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-vb-gold to-yellow-400 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-vb-navy group-hover:to-vb-medium transition-all duration-500 shadow-lg group-hover:shadow-xl transform group-hover:rotate-12">
                    <i className="fas fa-file-alt text-2xl text-vb-navy group-hover:text-white transition-all duration-500"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-6 text-vb-navy group-hover:text-vb-gold transition-all duration-300">
                    Application Process
                  </h3>
                  <div className="text-vb-gold font-semibold group-hover:text-vb-navy transition-all duration-300 flex items-center justify-center">
                    <span>Apply Now</span>
                    <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-2 transition-transform duration-300"></i>
                  </div>
                </Link>
                
                <Link href="/accelerator/team" className="accelerator-card group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 hover:scale-105 border border-gray-100 hover:border-vb-gold">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-vb-gold to-yellow-400 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-vb-navy group-hover:to-vb-medium transition-all duration-500 shadow-lg group-hover:shadow-xl transform group-hover:rotate-12">
                    <i className="fas fa-users text-2xl text-vb-navy group-hover:text-white transition-all duration-500"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-6 text-vb-navy group-hover:text-vb-gold transition-all duration-300">
                    Our Team
                  </h3>
                  <div className="text-vb-gold font-semibold group-hover:text-vb-navy transition-all duration-300 flex items-center justify-center">
                    <span>Meet the Team</span>
                    <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-2 transition-transform duration-300"></i>
                  </div>
                </Link>
              </div>
              
              {/* Second row - 2 cards centered */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Link href="/accelerator/portfolio" className="accelerator-card group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 hover:scale-105 border border-gray-100 hover:border-vb-gold">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-vb-gold to-yellow-400 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-vb-navy group-hover:to-vb-medium transition-all duration-500 shadow-lg group-hover:shadow-xl transform group-hover:rotate-12">
                    <i className="fas fa-briefcase text-2xl text-vb-navy group-hover:text-white transition-all duration-500"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-6 text-vb-navy group-hover:text-vb-gold transition-all duration-300">
                    Portfolio
                  </h3>
                  <div className="text-vb-gold font-semibold group-hover:text-vb-navy transition-all duration-300 flex items-center justify-center">
                    <span>View Portfolio</span>
                    <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-2 transition-transform duration-300"></i>
                  </div>
                </Link>
                
                <Link href="/accelerator/mentors" className="accelerator-card group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 hover:scale-105 border border-gray-100 hover:border-vb-gold">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-vb-gold to-yellow-400 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-vb-navy group-hover:to-vb-medium transition-all duration-500 shadow-lg group-hover:shadow-xl transform group-hover:rotate-12">
                    <i className="fas fa-handshake text-2xl text-vb-navy group-hover:text-white transition-all duration-500"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-6 text-vb-navy group-hover:text-vb-gold transition-all duration-300">
                    Mentors
                  </h3>
                  <div className="text-vb-gold font-semibold group-hover:text-vb-navy transition-all duration-300 flex items-center justify-center">
                    <span>Meet Our Mentors</span>
                    <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-2 transition-transform duration-300"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Discrete admin access methods */}
      <DiscreteAdminAccess />
    </>
  );
}