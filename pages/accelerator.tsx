import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../components/admin/DiscreteAdminAccess';
import EditableSection from '../components/admin/EditableSection';
import EditModal from '../components/admin/EditModal';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

export default function Accelerator() {
  // Enable discrete admin access methods
  useUrlAdminAccess();

  // CMS State Management
  const [heroData, setHeroData] = useState({
    title: 'Why Entrepreneurs Choose Version Bravo'
  });

  const [whyVBPages, setWhyVBPages] = useState([
    {
      id: 1,
      title: 'Team of Successful Operators',
      description: 'We are not passive investors; we\'re in the trenches with our founders. Our track record as value-add advisors means hands-on support when you need it most.',
      backgroundImage: '/images/accelerator/whyvb1.jpg'
    },
    {
      id: 2,
      title: 'Unparalleled Network',
      description: 'Access to entrepreneurs, industry experts, veteran foundations, and military transition organizations. Our network becomes your network.',
      backgroundImage: '/images/accelerator/whyvb2.jpg'
    },
    {
      id: 3,
      title: 'We Understand Veterans',
      description: 'Shared experience, trust, and mindset. We understand the veteran entrepreneur because we are veteran entrepreneurs.',
      backgroundImage: '/images/accelerator/whyvb3.jpg'
    },
    {
      id: 4,
      title: 'Built by Veterans, for Veterans',
      description: '4 years of experience, 58 combat veteran founders graduated. Our accelerator was purpose-built for the veteran entrepreneur journey.',
      backgroundImage: '/images/accelerator/whyvb4.jpg'
    },
    {
      id: 5,
      title: 'Experienced Advisory Board',
      description: 'Decades of VC and technical expertise across sectors and stages. Strategic guidance from those who\'ve built successful companies.',
      backgroundImage: '/images/accelerator/whyvb5.jpg'
    }
  ]);

  // Swipe interface state
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      quote: 'Having spent my career perfecting the intelligence process and targeting of the enemy, I knew there was much to learn in the finance space. I applied to Version Bravo hoping to learn the language, process and the art of capital-raising and to understand the culture and what was required to grow a project from scratch. Thankfully, I received so much more. The program provided me the technical knowledge, language and tools to speak confidently and share my vision with investors. Today, I continue to run my government contract company, a small cleaning business and to pitch a Web3, digital sovereignty solution to give the internet back to the user.',
      author: 'Andre Gomez',
      title: 'Former US Navy SEAL (BUD/s Class 229)',
      image: '/images/testimonials/andre-gomez.jpg',
      position: 1.5
    },
    {
      id: 2,
      quote: 'Version Bravo was an insightful experience for me, at the entrepreneurship level, but more importantly, at the emotional one. We can clearly see the growth in our ability to crystalize our business strategies and fine-tune the pitch to investors in the program\'s last session. But the feeling of \'safe harbor\' to share your thoughts, ideas or events from the SEALs service with people that understand your point of view in the blink of an eye were beyond my expectations.',
      author: 'Or Yustman',
      title: 'Lieutenant-Commander (Res.) in Shayetet-13/Israel Navy SEALs',
      image: '/images/testimonials/or-yustman.jpg',
      position: 2.5
    },
    {
      id: 3,
      quote: 'I was fortunate to find Version Bravo at a time when my venture was ready for growth but I recognized that I had some gaps in my ability to lead the company to its next level. My experience in the SEAL teams had given me the confidence to take on the challenge, but to scale, I needed knowledge in specialized areas and a trusted support team to be my sounding board as we grew. That\'s exactly what I found with AFINS\' Version Bravo program. Since starting the program, our venture has put numerous structures, people and processes in-place to help us prepare for and even get ahead of our future growth—all things directly attributable to what I learned and the group of mentors that I have come to rely on through Version Bravo. We are on track to create a lot of jobs, to disrupt our industry and to generate a lot of revenue.',
      author: 'Jonathan Cleck',
      title: 'Former US Navy SEAL (BUD/s Class 213), CXO of Concihairge',
      image: '/images/testimonials/jonathan-cleck.jpg',
      position: 4.5
    }
  ]);

  const [exploreData, setExploreData] = useState({
    title: 'Explore Our Accelerator'
  });

  // Modal states
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [isWhyVBModalOpen, setIsWhyVBModalOpen] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [editingWhyVBPage, setEditingWhyVBPage] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  // Firestore integration
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

  // Load data from Firestore
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getDocument('acceleratorContent') as any;
        if (data) {
          if (data.hero) setHeroData(data.hero);
          if (data.whyVBPages) setWhyVBPages(data.whyVBPages);
          if (data.testimonials) setTestimonials(data.testimonials);
          if (data.explore) setExploreData(data.explore);
        }
      } catch (error) {
        console.error('Error loading accelerator data:', error);
      }
    };
    loadData();
  }, []);

  // Save functions
  const saveHeroData = async (data: any) => {
    try {
      const currentData = (await getDocument('acceleratorContent') as any) || {};
      await updateDocument('acceleratorContent', {
        ...currentData,
        hero: data,
        updatedAt: new Date().toISOString()
      });
      setHeroData(data);
      setIsHeroModalOpen(false);
    } catch (error) {
      console.error('Error saving hero data:', error);
    }
  };

  const saveWhyVBPage = async (data: any) => {
    try {
      const updatedPages = whyVBPages.map(page => 
        page.id === editingWhyVBPage ? { ...page, ...data } : page
      );
      const currentData = (await getDocument('acceleratorContent') as any) || {};
      await updateDocument('acceleratorContent', {
        ...currentData,
        whyVBPages: updatedPages,
        updatedAt: new Date().toISOString()
      });
      setWhyVBPages(updatedPages);
      setIsWhyVBModalOpen(false);
      setEditingWhyVBPage(null);
    } catch (error) {
      console.error('Error saving Why VB page:', error);
    }
  };

  const saveTestimonial = async (data: any) => {
    try {
      const updatedTestimonials = testimonials.map(testimonial => 
        testimonial.id === editingTestimonial ? { ...testimonial, ...data } : testimonial
      );
      const currentData = (await getDocument('acceleratorContent') as any) || {};
      await updateDocument('acceleratorContent', {
        ...currentData,
        testimonials: updatedTestimonials,
        updatedAt: new Date().toISOString()
      });
      setTestimonials(updatedTestimonials);
      setIsTestimonialModalOpen(false);
      setEditingTestimonial(null);
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const saveExploreData = async (data: any) => {
    try {
      const currentData = (await getDocument('acceleratorContent') as any) || {};
      await updateDocument('acceleratorContent', {
        ...currentData,
        explore: data,
        updatedAt: new Date().toISOString()
      });
      setExploreData(data);
      setIsExploreModalOpen(false);
    } catch (error) {
      console.error('Error saving explore data:', error);
    }
  };

  // Function to navigate to specific page
  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > whyVBPages.length || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentPage(pageNumber);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Navigation functions
  const nextPage = () => {
    if (currentPage < whyVBPages.length) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevPage();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextPage();
      } else if (event.key >= '1' && event.key <= '5') {
        event.preventDefault();
        goToPage(parseInt(event.key));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Intersection Observer for Explore Accelerator section
  useEffect(() => {
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

    // Observe the explore accelerator section
    const exploreSection = document.querySelector('.explore-accelerator-section');
    if (exploreSection) {
      exploreObserver.observe(exploreSection);
    }

    // Cleanup
    return () => {
      if (exploreSection) {
        exploreObserver.unobserve(exploreSection);
      }
    };
  }, []);


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
        {/* Combined Hero + Swipe Interface Section */}
        <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
          {/* Hero Title Overlay */}
          <div className="absolute top-0 left-0 w-full z-30 bg-gradient-to-b from-black/60 to-transparent">
            <div className="container-max text-center pt-4 pb-6">
              <EditableSection
                sectionName="Accelerator Hero"
                onEdit={() => setIsHeroModalOpen(true)}
              >
                <h1 className="text-xl md:text-3xl font-bold text-white">
                  {heroData.title}
                </h1>
              </EditableSection>
            </div>
          </div>

          {/* Main swipe container */}
          <div className="relative w-full h-full">
            {whyVBPages.map((page, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === currentPage;
              
              return (
                <div 
                  key={`page-${page.id}`} 
                  className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
                    isActive 
                      ? 'opacity-100 translate-x-0' 
                      : pageNumber < currentPage 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                >
                  <img 
                    src={page.backgroundImage} 
                    alt={page.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute left-0 top-0 w-1/2 h-full bg-black/40"></div>
                  <div className="absolute right-0 top-0 w-1/2 h-full bg-vb-navy/80 backdrop-blur-sm"></div>
                  
                  {/* Content */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 px-12">
                    <div className="max-w-lg ml-24">
                      <EditableSection
                        sectionName={`Why VB Page ${pageNumber}`}
                        onEdit={() => {
                          setEditingWhyVBPage(page.id);
                          setIsWhyVBModalOpen(true);
                        }}
                      >
                        <h2 className="text-3xl font-bold mb-6 text-white">{page.title}</h2>
                        <p className="text-white/90 text-lg leading-relaxed">
                          {page.description}
                        </p>
                      </EditableSection>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Navigation dots - Horizontal at bottom center */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {whyVBPages.map((_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;
                return (
                  <button 
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-white text-vb-navy' 
                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                    }`}
                    disabled={isTransitioning}
                  >
                    <p className="text-xs font-bold">{pageNumber}</p>
                  </button>
                );
              })}
            </div>
            
            {/* Desktop Arrow Navigation */}
            <div className="hidden md:block">
              {/* Left Arrow */}
              <button 
                onClick={prevPage}
                disabled={currentPage === 1 || isTransitioning}
                className={`absolute left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  currentPage === 1 
                    ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:scale-110 cursor-pointer'
                }`}
              >
                <i className="fas fa-chevron-left text-lg"></i>
              </button>
              
              {/* Right Arrow */}
              <button 
                onClick={nextPage}
                disabled={currentPage === whyVBPages.length || isTransitioning}
                className={`absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  currentPage === whyVBPages.length 
                    ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:scale-110 cursor-pointer'
                }`}
              >
                <i className="fas fa-chevron-right text-lg"></i>
              </button>
            </div>
            
            {/* Keyboard instruction */}
            <div className="hidden md:block absolute bottom-1 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                Use ← → arrow keys or click numbers to navigate
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section - Now separate */}
        <section className="bg-gradient-to-br from-vb-navy to-vb-medium text-white">
          {testimonials.map((testimonial) => (
            <div key={`testimonial-${testimonial.id}`} className="min-h-[80vh] flex items-center justify-center px-8 py-16">
              <div className="max-w-4xl mx-auto text-center">
                <EditableSection
                  sectionName={`Testimonial - ${testimonial.author}`}
                  onEdit={() => {
                    setEditingTestimonial(testimonial.id);
                    setIsTestimonialModalOpen(true);
                  }}
                >
                  <div className="mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-vb-gold"
                    />
                    <i className="fas fa-quote-left text-3xl text-vb-gold mb-4 block"></i>
                  </div>
                  <blockquote className="text-lg md:text-xl leading-relaxed mb-6 font-light italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-white/90">
                    <p className="font-semibold text-lg">{testimonial.author}</p>
                    <p className="text-sm">{testimonial.title}</p>
                  </div>
                </EditableSection>
              </div>
            </div>
          ))}
        </section>


        {/* Navigation to Subpages */}
        <section className="section-padding bg-white explore-accelerator-section">
          <div className="container-max">
            <EditableSection
              sectionName="Explore Section"
              onEdit={() => setIsExploreModalOpen(true)}
            >
              <h2 className="text-4xl font-bold text-vb-navy mb-16 text-center">
                {exploreData.title}
              </h2>
            </EditableSection>
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

      {/* Edit Modals */}
      <EditModal
        isOpen={isHeroModalOpen}
        onClose={() => setIsHeroModalOpen(false)}
        onSave={saveHeroData}
        title="Edit Hero Section"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={heroData.title}
              className="admin-input w-full"
              placeholder="Why Entrepreneurs Choose Version Bravo"
            />
          </div>
        </div>
      </EditModal>

      <EditModal
        isOpen={isWhyVBModalOpen}
        onClose={() => {
          setIsWhyVBModalOpen(false);
          setEditingWhyVBPage(null);
        }}
        onSave={saveWhyVBPage}
        title={`Edit Why VB Page ${editingWhyVBPage}`}
      >
        {editingWhyVBPage && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={whyVBPages.find(p => p.id === editingWhyVBPage)?.title}
                className="admin-input w-full"
                placeholder="Page title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                name="description"
                defaultValue={whyVBPages.find(p => p.id === editingWhyVBPage)?.description}
                className="admin-input w-full h-32"
                placeholder="Page description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Background Image URL</label>
              <input
                type="text"
                name="backgroundImage"
                defaultValue={whyVBPages.find(p => p.id === editingWhyVBPage)?.backgroundImage}
                className="admin-input w-full"
                placeholder="/images/accelerator/whyvb1.jpg"
              />
            </div>
          </div>
        )}
      </EditModal>

      <EditModal
        isOpen={isTestimonialModalOpen}
        onClose={() => {
          setIsTestimonialModalOpen(false);
          setEditingTestimonial(null);
        }}
        onSave={saveTestimonial}
        title={`Edit Testimonial - ${testimonials.find(t => t.id === editingTestimonial)?.author}`}
      >
        {editingTestimonial && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Quote</label>
              <textarea
                name="quote"
                defaultValue={testimonials.find(t => t.id === editingTestimonial)?.quote}
                className="admin-input w-full h-40"
                placeholder="Testimonial quote"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Author Name</label>
              <input
                type="text"
                name="author"
                defaultValue={testimonials.find(t => t.id === editingTestimonial)?.author}
                className="admin-input w-full"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Author Title</label>
              <input
                type="text"
                name="title"
                defaultValue={testimonials.find(t => t.id === editingTestimonial)?.title}
                className="admin-input w-full"
                placeholder="Former US Navy SEAL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Author Image URL</label>
              <input
                type="text"
                name="image"
                defaultValue={testimonials.find(t => t.id === editingTestimonial)?.image}
                className="admin-input w-full"
                placeholder="/images/testimonials/author.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Position (determines placement between pages)</label>
              <input
                type="number"
                step="0.5"
                name="position"
                defaultValue={testimonials.find(t => t.id === editingTestimonial)?.position}
                className="admin-input w-full"
                placeholder="1.5 (between page 1 and 2)"
              />
            </div>
          </div>
        )}
      </EditModal>

      <EditModal
        isOpen={isExploreModalOpen}
        onClose={() => setIsExploreModalOpen(false)}
        onSave={saveExploreData}
        title="Edit Explore Section"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Title</label>
            <input
              type="text"
              name="title"
              defaultValue={exploreData.title}
              className="admin-input w-full"
              placeholder="Explore Our Accelerator"
            />
          </div>
        </div>
      </EditModal>
    </>
  );
}