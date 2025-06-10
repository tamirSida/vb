import React, { useState } from 'react';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';

const CTA: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<'header' | 'buttons' | 'newsletter'>('header');

  const handleEditHeader = () => {
    setEditingType('header');
    setIsEditModalOpen(true);
  };

  const handleEditButtons = () => {
    setEditingType('buttons');
    setIsEditModalOpen(true);
  };

  const handleEditNewsletter = () => {
    setEditingType('newsletter');
    setIsEditModalOpen(true);
  };

  const handleSave = (data: any) => {
    console.log('Saving CTA data:', data);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <section id="contact" className="section-padding bg-gradient-to-r from-vbv-gray to-gray-700 text-white">
        <div className="container-max">
          <div className="text-center">
            <EditableSection 
              sectionName="CTA Header"
              onEdit={handleEditHeader}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Join the Mission?
              </h2>
              <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
                Whether you're a veteran entrepreneur ready to scale or an investor looking to back the next generation of military-trained founders, we're here to help.
              </p>
            </EditableSection>
        
        <EditableSection 
          sectionName="CTA Buttons"
          onEdit={handleEditButtons}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button className="btn-primary bg-gray-100 hover:bg-white text-gray-700 flex-1">
              Apply to Accelerator
            </button>
            <button className="btn-secondary border-white text-white hover:bg-white hover:text-gray-700 flex-1">
              Become an LP
            </button>
          </div>
        </EditableSection>
        
        <EditableSection 
          sectionName="Newsletter Signup"
          onEdit={handleEditNewsletter}
        >
          <div className="mt-8 pt-8 border-t border-gray-600">
            <p className="text-gray-300 mb-4">Stay updated on our portfolio and programs</p>
            <div className="flex max-w-sm mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <button className="bg-gray-100 hover:bg-white text-gray-700 px-6 py-2 rounded-r-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
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
        editingType === 'header' ? "Edit CTA Header" :
        editingType === 'buttons' ? "Edit CTA Buttons" :
        "Edit Newsletter Signup"
      }
    >
      {editingType === 'header' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Headline</label>
            <input
              type="text"
              defaultValue="Ready to Join the Mission?"
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              defaultValue="Whether you're a veteran entrepreneur ready to scale or an investor looking to back the next generation of military-trained founders, we're here to help."
              className="admin-input w-full h-24 resize-none"
            />
          </div>
        </div>
      ) : editingType === 'buttons' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Primary Button Text</label>
            <input
              type="text"
              defaultValue="Apply to Accelerator"
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Primary Button Link</label>
            <input
              type="text"
              defaultValue="#"
              className="admin-input w-full"
              placeholder="https://apply.versionbravoventures.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Secondary Button Text</label>
            <input
              type="text"
              defaultValue="Become an LP"
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Secondary Button Link</label>
            <input
              type="text"
              defaultValue="#"
              className="admin-input w-full"
              placeholder="https://invest.versionbravoventures.com"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Newsletter Description</label>
            <input
              type="text"
              defaultValue="Stay updated on our portfolio and programs"
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Input Placeholder</label>
            <input
              type="text"
              defaultValue="Enter your email"
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Subscribe Button Text</label>
            <input
              type="text"
              defaultValue="Subscribe"
              className="admin-input w-full"
            />
          </div>
        </div>
      )}
    </EditModal>
  </>
  );
};

export default CTA;