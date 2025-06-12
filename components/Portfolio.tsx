import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { siteData, PortfolioCompany } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

const Portfolio: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [editingType, setEditingType] = useState<'header' | 'company' | 'add'>('header');
  const [portfolioData, setPortfolioData] = useState({
    title: 'Portfolio Highlights',
    description: 'Proven track record of successful investments in veteran-led companies',
    companies: siteData.portfolio
  });
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

  const handleEditHeader = () => {
    setEditingType('header');
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
      if (editingType === 'header') {
        // Update section header
        const updatedData = {
          title: data.title,
          description: data.description,
          companies: portfolioData.companies,
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
          flag: data.flag || null,
          metrics: {
            investment: data.investment,
            valuation: data.valuation,
            tvpi: data.tvpi,
            irr: data.irr,
            status: data.status
          }
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
            flag: data.flag || null,
            metrics: {
              investment: data.investment,
              valuation: data.valuation,
              tvpi: data.tvpi,
              irr: data.irr,
              status: data.status
            }
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
      companies: siteData.portfolio
    });
  }, []);

  return (
    <>
      <section id="portfolio" className="section-padding bg-white">
        <div className="container-max">
          <EditableSection 
            sectionName="Portfolio Header"
            onEdit={handleEditHeader}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-vb-navy mb-4">
                {portfolioData.title}
              </h2>
              <p className="text-xl text-vb-medium max-w-3xl mx-auto">
                {portfolioData.description}
              </p>
            </div>
          </EditableSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portfolioData.companies.map((company, index) => (
            <div key={index} className="relative">
              <EditableSection
                sectionName={`${company.name}`}
                onEdit={() => handleEditCompany(company)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full group"
              >
                <div 
                  className="cursor-pointer h-full"
                  onClick={() => handleViewCompany(company)}
                >
                  <div className="p-6">
                    {/* Company Logo */}
                    <div className="flex items-center justify-center h-16 mb-4">
                      <Image 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        width={120}
                        height={48}
                        className="max-h-12 max-w-full object-contain"
                      />
                    </div>
                    
                    {/* Company Name */}
                    <h3 className="text-lg font-bold text-vb-navy mb-2 text-center">
                      {company.name}
                    </h3>
                    
                    {/* Company Description Line */}
                    <p className="text-vb-medium text-sm text-center leading-relaxed">
                      {company.description}
                    </p>
                  </div>

                  {/* Click Indicator */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-vb-blue text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                      <i className="fas fa-eye text-sm"></i>
                    </div>
                  </div>

                  {/* Status Flag Triangle */}
                  {(() => {
                    console.log(`Company ${company.name} flag:`, company.flag, typeof company.flag);
                    return company.flag && (
                      <div className="absolute bottom-0 right-0 z-10">
                        <div className={`w-0 h-0 border-l-[80px] border-l-transparent border-b-[80px] ${
                          company.flag === 'exited' 
                            ? 'border-b-red-500' 
                            : company.flag === 'fundraising'
                            ? 'border-b-green-500'
                            : 'border-b-gray-400'
                        }`}></div>
                        <div className="absolute bottom-2 right-2 text-white text-[10px] font-bold leading-tight text-center">
                          <div>{company.flag === 'exited' ? 'EXITED' : 'FUND'}</div>
                          {company.flag === 'fundraising' && <div>RAISING</div>}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </EditableSection>
            </div>
          ))}
          
          {/* Add Company Button */}
          <EditableSection 
            sectionName="Add New Portfolio Company"
            onEdit={handleAddCompany}
            className="bg-gray-50/50 border-2 border-dashed border-vb-light rounded-lg p-6 flex items-center justify-center min-h-[250px]"
            isAddButton={true}
          >
            <div className="text-center text-vb-light hover:text-vb-blue transition-colors">
              <i className="fas fa-plus text-2xl mb-2"></i>
              <p className="font-medium">Add New Portfolio Company</p>
            </div>
          </EditableSection>
        </div>
      </div>
    </section>

    {/* Edit Modal */}
    <EditModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      onSave={handleSave}
      title={
        editingType === 'header' 
          ? "Edit Portfolio Section" 
          : editingType === 'add'
            ? "Add New Portfolio Company"
            : `Edit ${editingCompany?.name || 'Company'}`
      }
    >
      {editingType === 'header' ? (
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
          
          <div className="border-t border-gray-600 pt-4">
            <h4 className="text-gray-300 font-medium mb-3">Investment Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Investment</label>
                <input
                  type="text"
                  name="investment"
                  defaultValue={editingCompany?.metrics?.investment || ''}
                  className="admin-input w-full"
                  placeholder="e.g., $260K pre-seed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Valuation</label>
                <input
                  type="text"
                  name="valuation"
                  defaultValue={editingCompany?.metrics?.valuation || ''}
                  className="admin-input w-full"
                  placeholder="e.g., $200M"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">TVPI</label>
                <input
                  type="text"
                  name="tvpi"
                  defaultValue={editingCompany?.metrics?.tvpi || ''}
                  className="admin-input w-full"
                  placeholder="e.g., 14.61"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">IRR</label>
                <input
                  type="text"
                  name="irr"
                  defaultValue={editingCompany?.metrics?.irr || ''}
                  className="admin-input w-full"
                  placeholder="e.g., 1,726%"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <input
                type="text"
                name="status"
                defaultValue={editingCompany?.metrics?.status || ''}
                className="admin-input w-full"
                placeholder="e.g., Active, Acquired, etc."
              />
            </div>
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