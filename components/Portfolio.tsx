import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { siteData, PortfolioCompany } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

// Counting animation component
const CountingNumber: React.FC<{ end: number; duration: number; label: string; isVisible: boolean }> = ({ end, duration, label, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setCount(0); // Reset count when becoming visible
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    } else {
      setCount(0); // Reset to 0 when not visible
    }
  }, [isVisible, end, duration]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-vb-navy mb-2">
        {count}
      </div>
      <div className="text-sm md:text-base text-vb-medium font-medium uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [editingType, setEditingType] = useState<'header' | 'company' | 'add' | 'stats'>('header');
  const [portfolioData, setPortfolioData] = useState({
    title: 'Portfolio Highlights',
    description: 'Proven track record of successful investments in veteran-led companies',
    companies: siteData.portfolio,
    stats: {
      title: 'Companies Accelerated',
      israeliCompanies: 40,
      totalCompanies: 77,
      americanCompanies: 37
    }
  });
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-50px" });
  
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

  const handleEditHeader = () => {
    setEditingType('header');
    setIsEditModalOpen(true);
  };

  const handleEditStats = () => {
    setEditingType('stats');
    setIsEditModalOpen(true);
  };

  const handleEditCompany = (company: any) => {
    setEditingCompany(company);
    setEditingType('company');
    setIsEditModalOpen(true);
  };

  const handleViewCompany = (company: any) => {
    setSelectedCompany(company);
    setIsCompanyModalOpen(true);
  };

  const handleAddCompany = () => {
    setEditingCompany(null);
    setEditingType('add');
    setIsEditModalOpen(true);
  };

  const handleDeleteCompany = async () => {
    try {
      const updatedCompanies = portfolioData.companies.filter(company => company.name !== editingCompany.name);
      const updatedData = {
        ...portfolioData,
        companies: updatedCompanies,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('portfolio', updatedData);
      setPortfolioData(updatedData);
      
      console.log('Portfolio company deleted successfully');
      setIsEditModalOpen(false);
      setEditingCompany(null);
    } catch (error) {
      console.error('Error deleting portfolio company:', error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingType === 'stats') {
        // Update stats section
        const updatedData = {
          ...portfolioData,
          stats: {
            title: data.statsTitle,
            israeliCompanies: parseInt(data.israeliCompanies) || 0,
            totalCompanies: parseInt(data.totalCompanies) || 0,
            americanCompanies: parseInt(data.americanCompanies) || 0
          },
          updatedAt: new Date().toISOString()
        };
        await updateDocument('portfolio', updatedData);
        setPortfolioData(updatedData);
      } else if (editingType === 'header') {
        // Update section header
        const updatedData = {
          ...portfolioData,
          title: data.title,
          description: data.description,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('portfolio', updatedData);
        setPortfolioData(updatedData);
      } else if (editingType === 'add') {
        // Add new company
        const newCompany = {
          name: data.name,
          description: data.description,
          logo: data.logo,
          websiteUrl: data.websiteUrl,
          blurb: data.blurb,
          flag: data.flag || null
        };
        const updatedData = {
          ...portfolioData,
          companies: [...portfolioData.companies, newCompany],
          updatedAt: new Date().toISOString()
        };
        await updateDocument('portfolio', updatedData);
        setPortfolioData(updatedData);
      } else {
        // Update existing company
        const companyIndex = portfolioData.companies.findIndex(c => c.name === editingCompany.name);
        if (companyIndex !== -1) {
          const updatedCompanies = [...portfolioData.companies];
          updatedCompanies[companyIndex] = {
            name: data.name,
            description: data.description,
            logo: data.logo,
            websiteUrl: data.websiteUrl,
            blurb: data.blurb,
            flag: data.flag || null
          };
          const updatedData = {
            ...portfolioData,
            companies: updatedCompanies,
            updatedAt: new Date().toISOString()
          };
          await updateDocument('portfolio', updatedData);
          setPortfolioData(updatedData);
        }
      }
      console.log('Portfolio data saved successfully');
      setIsEditModalOpen(false);
      setEditingCompany(null);
    } catch (error) {
      console.error('Error saving portfolio data:', error);
    }
  };

  // Intersection observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStatsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Force use static data to bypass Firestore sync issues
  useEffect(() => {
    console.log('Loading static portfolio data with flags:', siteData.portfolio.map(c => ({ 
      name: c.name, 
      flag: c.flag,
      hasFlag: !!c.flag 
    })));
    
    setPortfolioData({
      title: 'Portfolio Highlights',
      description: 'Proven track record of successful investments in veteran-led companies',
      companies: siteData.portfolio,
      stats: {
        title: 'Companies Accelerated',
        israeliCompanies: 40,
        totalCompanies: 77,
        americanCompanies: 37
      }
    });
  }, []);

  return (
    <>
      <section id="portfolio" className="section-padding bg-white">
        <div className="container-max">
          {/* Companies Accelerated Hero Stats */}
          <EditableSection 
            sectionName="Portfolio Stats"
            onEdit={handleEditStats}
          >
            <div ref={statsRef} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-vb-navy mb-12">
                {portfolioData.stats.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <CountingNumber 
                  end={portfolioData.stats.israeliCompanies} 
                  duration={2000} 
                  label="Israeli Companies" 
                  isVisible={isStatsVisible}
                />
                <CountingNumber 
                  end={portfolioData.stats.totalCompanies} 
                  duration={2500} 
                  label="Total Companies" 
                  isVisible={isStatsVisible}
                />
                <CountingNumber 
                  end={portfolioData.stats.americanCompanies} 
                  duration={2000} 
                  label="American Companies" 
                  isVisible={isStatsVisible}
                />
              </div>
            </div>
          </EditableSection>

          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <EditableSection 
              sectionName="Portfolio Header"
              onEdit={handleEditHeader}
            >
              <div className="text-center mb-12">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-vb-navy mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {portfolioData.title}
                </motion.h2>
                <motion.p 
                  className="text-xl text-vb-medium max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {portfolioData.description}
                </motion.p>
              </div>
            </EditableSection>
          </motion.div>

        <motion.div 
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {portfolioData.companies.map((company, index) => (
            <motion.div 
              key={index} 
              className="relative"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isGridInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4 + (index * 0.05),
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <EditableSection
                sectionName={`${company.name}`}
                onEdit={() => handleEditCompany(company)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full group border border-gray-100 hover:border-vb-gold"
              >
                <motion.div 
                  className="cursor-pointer h-full relative"
                  onClick={() => handleViewCompany(company)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-vb-gold/5 to-vb-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="p-6 relative z-10">
                    {/* Company Logo */}
                    <motion.div 
                      className="flex items-center justify-center h-16 mb-4"
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        width={120}
                        height={48}
                        className="max-h-12 max-w-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                      />
                    </motion.div>
                    
                    {/* Company Name */}
                    <motion.h3 
                      className="text-lg font-bold text-vb-navy mb-2 text-center group-hover:text-vb-blue transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {company.name}
                    </motion.h3>
                    
                    {/* Company Description Line */}
                    <p className="text-vb-medium text-sm text-center leading-relaxed group-hover:text-vb-navy transition-colors">
                      {company.description}
                    </p>
                  </div>

                  {/* Click Indicator */}
                  <motion.div 
                    className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1.2, rotate: 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <motion.div 
                      className="bg-vb-blue text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                      whileHover={{ 
                        backgroundColor: "#fbbf24",
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.i 
                        className="fas fa-eye text-sm"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Status Flag Triangle */}
                  {(() => {
                    return company.flag && (
                      <motion.div 
                        className="absolute bottom-0 right-0 z-10"
                        initial={{ scale: 0, rotate: 45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.4 + (index * 0.05) + 0.3,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div 
                          className={`w-0 h-0 border-l-[80px] border-l-transparent border-b-[80px] ${
                            company.flag === 'exited' 
                              ? 'border-b-blue-600' 
                              : company.flag === 'fundraising'
                              ? 'border-b-blue-300'
                              : 'border-b-gray-400'
                          }`}
                          whileHover={{ 
                            filter: "brightness(1.2)",
                            transition: { duration: 0.2 }
                          }}
                        />
                        <motion.div 
                          className="absolute bottom-2 right-2 text-white text-[10px] font-bold leading-tight text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + (index * 0.05) + 0.5 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <div>{company.flag === 'exited' ? 'EXITED' : 'FUND'}</div>
                          {company.flag === 'fundraising' && <div>RAISING</div>}
                        </motion.div>
                      </motion.div>
                    );
                  })()}
                </motion.div>
              </EditableSection>
            </motion.div>
          ))}
          
          {/* Add Company Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.4 + (portfolioData.companies.length * 0.05) }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <EditableSection 
              sectionName="Add New Portfolio Company"
              onEdit={handleAddCompany}
              className="bg-gray-50/50 border-2 border-dashed border-vb-light rounded-lg p-6 flex items-center justify-center min-h-[250px] hover:border-vb-blue transition-colors"
              isAddButton={true}
            >
              <div className="text-center text-vb-light hover:text-vb-blue transition-colors">
                <motion.i 
                  className="fas fa-plus text-2xl mb-2"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                />
                <p className="font-medium">Add New Portfolio Company</p>
              </div>
            </EditableSection>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Edit Modal */}
    <EditModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      onSave={handleSave}
      title={
        editingType === 'stats'
          ? "Edit Portfolio Statistics"
          : editingType === 'header' 
            ? "Edit Portfolio Section" 
            : editingType === 'add'
              ? "Add New Portfolio Company"
              : `Edit ${editingCompany?.name || 'Company'}`
      }
    >
      {editingType === 'stats' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Title</label>
            <input
              type="text"
              name="statsTitle"
              defaultValue={portfolioData.stats.title}
              className="admin-input w-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Israeli Companies</label>
              <input
                type="number"
                name="israeliCompanies"
                defaultValue={portfolioData.stats.israeliCompanies}
                className="admin-input w-full"
                placeholder="40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Total Companies</label>
              <input
                type="number"
                name="totalCompanies"
                defaultValue={portfolioData.stats.totalCompanies}
                className="admin-input w-full"
                placeholder="77"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">American Companies</label>
              <input
                type="number"
                name="americanCompanies"
                defaultValue={portfolioData.stats.americanCompanies}
                className="admin-input w-full"
                placeholder="37"
              />
            </div>
          </div>
        </div>
      ) : editingType === 'header' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Title</label>
            <input
              type="text"
              name="title"
              defaultValue={portfolioData.title}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Description</label>
            <textarea
              name="description"
              defaultValue={portfolioData.description}
              className="admin-input w-full h-20 resize-none"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
            <input
              type="text"
              name="name"
              defaultValue={editingCompany?.name || ''}
              className="admin-input w-full"
              placeholder="e.g., TechCorp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={editingCompany?.description || ''}
              className="admin-input w-full h-20 resize-none"
              placeholder="Brief description of the company"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Logo URL</label>
            <input
              type="text"
              name="logo"
              defaultValue={editingCompany?.logo || ''}
              className="admin-input w-full"
              placeholder="/images/portfolio/company-logo.png"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Website URL</label>
            <input
              type="text"
              name="websiteUrl"
              defaultValue={editingCompany?.websiteUrl || ''}
              className="admin-input w-full"
              placeholder="https://www.company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Company Blurb</label>
            <textarea
              name="blurb"
              defaultValue={editingCompany?.blurb || ''}
              className="admin-input w-full h-24 resize-none"
              placeholder="Detailed description about the company for the modal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Status Flag</label>
            <select
              name="flag"
              defaultValue={editingCompany?.flag || ''}
              className="admin-input w-full"
            >
              <option value="">No Flag</option>
              <option value="exited">Exited</option>
              <option value="fundraising">Fundraising</option>
            </select>
          </div>
          
          {editingType === 'company' && (
            <div className="pt-4 border-t border-gray-600">
              <button 
                onClick={handleDeleteCompany}
                className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
              >
<i className="fas fa-trash mr-2"></i>Delete Portfolio Company
              </button>
            </div>
          )}
        </div>
      )}
    </EditModal>

    {/* Company Details Modal */}
    {isCompanyModalOpen && selectedCompany && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Close Button */}
            <button 
              onClick={() => setIsCompanyModalOpen(false)}
              className="float-right text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            
            {/* Company Logo */}
            <div className="flex items-center justify-center h-20 mb-6">
              <Image 
                src={selectedCompany.logo} 
                alt={`${selectedCompany.name} logo`}
                width={200}
                height={80}
                className="max-h-16 max-w-full object-contain"
              />
            </div>
            
            {/* Company Name */}
            <h2 className="text-2xl font-bold text-vb-navy mb-4 text-center">
              {selectedCompany.name}
            </h2>
            
            {/* Company Blurb */}
            {selectedCompany.blurb && (
              <p className="text-vb-medium text-base leading-relaxed mb-6 text-center">
                {selectedCompany.blurb}
              </p>
            )}
            
            {/* Website Link */}
            {selectedCompany.websiteUrl && (
              <div className="text-center">
                <a 
                  href={selectedCompany.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-vb-blue hover:bg-vb-navy text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Portfolio;