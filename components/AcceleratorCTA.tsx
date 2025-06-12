import React, { useState, useEffect } from 'react';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

const AcceleratorCTA: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<'header' | 'buttons'>('header');
  const [ctaData, setCTAData] = useState({
    title: 'Ready to Join the Mission?',
    description: "Whether you're a veteran entrepreneur ready to scale or an investor looking to back the next generation of military-trained founders, we're here to help.",
    primaryButtonText: 'Apply to Accelerator',
    primaryButtonUrl: '#',
    secondaryButtonText: 'Become an LP',
    secondaryButtonUrl: '#'
  });
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

  const handleEditHeader = () => {
    setEditingType('header');
    setIsEditModalOpen(true);
  };

  const handleEditButtons = () => {
    setEditingType('buttons');
    setIsEditModalOpen(true);
  };

  const handleSave = async (data: any) => {
    try {
      if (editingType === 'header') {
        const updatedData = {
          ...ctaData,
          title: data.title,
          description: data.description,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('acceleratorCTA', updatedData);
        setCTAData(updatedData);
      } else {
        const updatedData = {
          ...ctaData,
          primaryButtonText: data.primaryButtonText,
          primaryButtonUrl: data.primaryButtonUrl,
          secondaryButtonText: data.secondaryButtonText,
          secondaryButtonUrl: data.secondaryButtonUrl,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('acceleratorCTA', updatedData);
        setCTAData(updatedData);
      }
      console.log('Accelerator CTA data saved successfully');
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving accelerator CTA data:', error);
    }
  };

  // Load data from Firestore on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getDocument('acceleratorCTA');
        if (data) {
          setCTAData(data as any);
        }
      } catch (error) {
        console.error('Error loading accelerator CTA data:', error);
      }
    };
    
    loadData();
  }, []);

  return (
    <>
      <section id="contact" className="section-padding bg-gradient-to-r from-vb-navy to-vb-blue text-white">
        <div className="container-max">
          <div className="text-center">
            <EditableSection 
              sectionName="CTA Header"
              onEdit={handleEditHeader}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {ctaData.title}
              </h2>
              <p className="text-xl mb-8 text-vb-light max-w-3xl mx-auto">
                {ctaData.description}
              </p>
            </EditableSection>
        
        <EditableSection 
          sectionName="CTA Buttons"
          onEdit={handleEditButtons}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button className="btn-primary bg-gray-100 hover:bg-white text-vb-navy flex-1">
              {ctaData.primaryButtonText}
            </button>
            <button className="btn-secondary border-white text-white hover:bg-white hover:text-vb-navy flex-1">
              {ctaData.secondaryButtonText}
            </button>
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
        editingType === 'header' ? "Edit CTA Header" : "Edit CTA Buttons"
      }
    >
      {editingType === 'header' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Headline</label>
            <input
              type="text"
              name="title"
              defaultValue={ctaData.title}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={ctaData.description}
              className="admin-input w-full h-24 resize-none"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Primary Button Text</label>
            <input
              type="text"
              name="primaryButtonText"
              defaultValue={ctaData.primaryButtonText}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Primary Button Link</label>
            <input
              type="text"
              name="primaryButtonUrl"
              defaultValue={ctaData.primaryButtonUrl}
              className="admin-input w-full"
              placeholder="https://apply.versionbravoventures.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Secondary Button Text</label>
            <input
              type="text"
              name="secondaryButtonText"
              defaultValue={ctaData.secondaryButtonText}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Secondary Button Link</label>
            <input
              type="text"
              name="secondaryButtonUrl"
              defaultValue={ctaData.secondaryButtonUrl}
              className="admin-input w-full"
              placeholder="https://invest.versionbravoventures.com"
            />
          </div>
        </div>
      )}
    </EditModal>
  </>
  );
};

export default AcceleratorCTA;