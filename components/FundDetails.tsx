import React, { useState } from 'react';
import { siteData } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';

const FundDetails: React.FC = () => {
  const { fundMechanics } = siteData;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<'header' | 'economics' | 'terms' | 'timeline' | 'mission'>('header');

  const handleEditHeader = () => {
    setEditingType('header');
    setIsEditModalOpen(true);
  };

  const handleEditSection = (type: 'economics' | 'terms' | 'timeline' | 'mission') => {
    setEditingType(type);
    setIsEditModalOpen(true);
  };

  const handleSave = (data: any) => {
    console.log('Saving fund details:', data);
    setIsEditModalOpen(false);
  };
  
  return (
    <>
      <section className="section-padding bg-gray-700 text-white">
        <div className="container-max">
          <EditableSection 
            sectionName="Fund Structure Header"
            onEdit={handleEditHeader}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {fundMechanics.title}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transparent, veteran-focused fund structure designed for long-term success
              </p>
            </div>
          </EditableSection>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <EditableSection
            sectionName="Fund Economics"
            onEdit={() => handleEditSection('economics')}
            className="bg-white/10 backdrop-blur rounded-lg p-6"
          >
            <h3 className="text-gray-100 font-semibold mb-4">Fund Economics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Carried Interest:</span>
                <span className="font-semibold">{fundMechanics.details.carriedInterest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Management Fee:</span>
                <span className="font-semibold">{fundMechanics.details.managementFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">GP Commitment:</span>
                <span className="font-semibold">{fundMechanics.details.gpCommitment}</span>
              </div>
            </div>
          </EditableSection>

          <EditableSection
            sectionName="Investment Terms"
            onEdit={() => handleEditSection('terms')}
            className="bg-white/10 backdrop-blur rounded-lg p-6"
          >
            <h3 className="text-gray-100 font-semibold mb-4">Investment Terms</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Target Size:</span>
                <span className="font-semibold">{fundMechanics.details.targetSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Min Investment:</span>
                <span className="font-semibold">{fundMechanics.details.minInvestment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Structure:</span>
                <span className="font-semibold">{fundMechanics.details.structure}</span>
              </div>
            </div>
          </EditableSection>

          <EditableSection
            sectionName="Timeline"
            onEdit={() => handleEditSection('timeline')}
            className="bg-white/10 backdrop-blur rounded-lg p-6"
          >
            <h3 className="text-gray-100 font-semibold mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Investment Period:</span>
                <span className="font-semibold text-sm">{fundMechanics.details.investmentPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Fund Life:</span>
                <span className="font-semibold text-sm">{fundMechanics.details.fundLife}</span>
              </div>
            </div>
          </EditableSection>
        </div>

        <EditableSection
          sectionName="Mission Impact"
          onEdit={() => handleEditSection('mission')}
          className="mt-8 text-center"
        >
          <div className="bg-gray-100/20 border border-gray-100 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="text-gray-100 font-semibold mb-2">Mission-Driven Impact</h4>
            <p className="text-gray-200">
              {fundMechanics.details.charitableDonation}
            </p>
          </div>
        </EditableSection>
      </div>
    </section>

    {/* Edit Modal */}
    <EditModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      onSave={handleSave}
      title={
        editingType === 'header' ? "Edit Fund Structure Header" :
        editingType === 'economics' ? "Edit Fund Economics" :
        editingType === 'terms' ? "Edit Investment Terms" :
        editingType === 'timeline' ? "Edit Timeline" :
        "Edit Mission Impact"
      }
    >
      {editingType === 'header' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Title</label>
            <input
              type="text"
              defaultValue={fundMechanics.title}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Description</label>
            <textarea
              defaultValue="Transparent, veteran-focused fund structure designed for long-term success"
              className="admin-input w-full h-20 resize-none"
            />
          </div>
        </div>
      ) : editingType === 'economics' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Carried Interest</label>
            <input
              type="text"
              defaultValue={fundMechanics.details.carriedInterest}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Management Fee</label>
            <input
              type="text"
              defaultValue={fundMechanics.details.managementFee}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">GP Commitment</label>
            <input
              type="text"
              defaultValue={fundMechanics.details.gpCommitment}
              className="admin-input w-full"
            />
          </div>
        </div>
      ) : editingType === 'terms' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Target Size</label>
            <input
              type="text"
              defaultValue={fundMechanics.details.targetSize}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Minimum Investment</label>
            <input
              type="text"
              defaultValue={fundMechanics.details.minInvestment}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Structure</label>
            <input
              type="text"
              defaultValue={fundMechanics.details.structure}
              className="admin-input w-full"
            />
          </div>
        </div>
      ) : editingType === 'timeline' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Investment Period</label>
            <input
              type="text"
              defaultValue={fundMechanics.details.investmentPeriod}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Fund Life</label>
            <input
              type="text"
              defaultValue={fundMechanics.details.fundLife}
              className="admin-input w-full"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Mission Title</label>
            <input
              type="text"
              defaultValue="Mission-Driven Impact"
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Charitable Donation Description</label>
            <textarea
              defaultValue={fundMechanics.details.charitableDonation}
              className="admin-input w-full h-20 resize-none"
            />
          </div>
        </div>
      )}
    </EditModal>
  </>
  );
};

export default FundDetails;