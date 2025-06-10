import React, { useState } from 'react';
import Image from 'next/image';
import { siteData } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';

const Portfolio: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);
  const [editingType, setEditingType] = useState<'header' | 'company' | 'add'>('header');

  const handleEditHeader = () => {
    setEditingType('header');
    setIsEditModalOpen(true);
  };

  const handleEditCompany = (company: any) => {
    setEditingCompany(company);
    setEditingType('company');
    setIsEditModalOpen(true);
  };

  const handleAddCompany = () => {
    setEditingCompany(null);
    setEditingType('add');
    setIsEditModalOpen(true);
  };

  const handleSave = (data: any) => {
    console.log('Saving portfolio data:', data);
    setIsEditModalOpen(false);
    setEditingCompany(null);
  };

  return (
    <>
      <section id="portfolio" className="section-padding bg-white">
        <div className="container-max">
          <EditableSection 
            sectionName="Portfolio Header"
            onEdit={handleEditHeader}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
                Portfolio Highlights
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Proven track record of successful investments in veteran-led companies
              </p>
            </div>
          </EditableSection>

        <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-6">
          {siteData.portfolio.map((company, index) => (
            <EditableSection
              key={index}
              sectionName={`${company.name}`}
              onEdit={() => handleEditCompany(company)}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center h-16 mb-4">
                <Image 
                  src={company.logo} 
                  alt={`${company.name} logo`}
                  width={120}
                  height={48}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
              
              <h3 className="text-lg font-bold text-gray-700 mb-2 text-center">
                {company.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 text-center">
                {company.description}
              </p>

              {company.metrics && (
                <div className="border-t pt-4 space-y-2">
                  {company.metrics.investment && (
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold text-gray-500">Investment:</span>
                      <span className="text-sm text-gray-700 font-semibold">{company.metrics.investment}</span>
                    </div>
                  )}
                  {company.metrics.tvpi && (
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold text-gray-500">TVPI:</span>
                      <span className="text-sm text-gray-700 font-bold">{company.metrics.tvpi}</span>
                    </div>
                  )}
                  {company.metrics.irr && (
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold text-gray-500">IRR:</span>
                      <span className="text-sm text-gray-700 font-bold">{company.metrics.irr}</span>
                    </div>
                  )}
                  {company.metrics.status && (
                    <div className="mt-3">
                      <span className="inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
                        {company.metrics.status}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </EditableSection>
          ))}
          
          {/* Add Company Button */}
          <EditableSection 
            sectionName="Add New Portfolio Company"
            onEdit={handleAddCompany}
            className="bg-gray-50/50 border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center min-h-[250px]"
            isAddButton={true}
          >
            <div className="text-center text-gray-500 hover:text-gray-700 transition-colors">
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
              defaultValue="Portfolio Highlights"
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Description</label>
            <textarea
              defaultValue="Proven track record of successful investments in veteran-led companies"
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
              defaultValue={editingCompany?.name || ''}
              className="admin-input w-full"
              placeholder="e.g., TechCorp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              defaultValue={editingCompany?.description || ''}
              className="admin-input w-full h-20 resize-none"
              placeholder="Brief description of the company"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Logo URL</label>
            <input
              type="text"
              defaultValue={editingCompany?.logo || ''}
              className="admin-input w-full"
              placeholder="/images/portfolio/company-logo.png"
            />
          </div>
          
          <div className="border-t border-gray-600 pt-4">
            <h4 className="text-gray-300 font-medium mb-3">Investment Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Investment</label>
                <input
                  type="text"
                  defaultValue={editingCompany?.metrics?.investment || ''}
                  className="admin-input w-full"
                  placeholder="e.g., $260K pre-seed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Valuation</label>
                <input
                  type="text"
                  defaultValue={editingCompany?.metrics?.valuation || ''}
                  className="admin-input w-full"
                  placeholder="e.g., $200M"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">TVPI</label>
                <input
                  type="text"
                  defaultValue={editingCompany?.metrics?.tvpi || ''}
                  className="admin-input w-full"
                  placeholder="e.g., 14.61"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">IRR</label>
                <input
                  type="text"
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
                defaultValue={editingCompany?.metrics?.status || ''}
                className="admin-input w-full"
                placeholder="e.g., Active, Acquired, etc."
              />
            </div>
          </div>
          
          {editingType === 'company' && (
            <div className="pt-4 border-t border-gray-600">
              <button 
                onClick={() => console.log('Delete company', editingCompany?.name)}
                className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
              >
                🗑️ Delete Portfolio Company
              </button>
            </div>
          )}
        </div>
      )}
    </EditModal>
  </>
  );
};

export default Portfolio;