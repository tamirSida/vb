import React, { useState } from 'react';
import { siteData } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import IconSelector from './admin/IconSelector';

const WhyVB: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPointIndex, setEditingPointIndex] = useState<number | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string>('');

  const handleEditSection = () => {
    setIsEditModalOpen(true);
  };

  const handleEditPoint = (index: number) => {
    setEditingPointIndex(index);
    const icons = ['fas fa-users', 'fas fa-network-wired', 'fas fa-handshake', 'fas fa-graduation-cap', 'fas fa-star'];
    setSelectedIcon(icons[index] || 'fas fa-star');
    setIsEditModalOpen(true);
  };

  const handleAddPoint = () => {
    setEditingPointIndex(-1); // -1 indicates new point
    setSelectedIcon('fas fa-star'); // Default icon for new points
    setIsEditModalOpen(true);
  };

  const handleSave = (data: any) => {
    console.log('Saving WhyVB data:', data);
    setIsEditModalOpen(false);
    setEditingPointIndex(null);
  };

  return (
    <>
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <EditableSection 
            sectionName="Why VB Title"
            onEdit={handleEditSection}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {siteData.whyVB.title}
              </h2>
            </div>
          </EditableSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.whyVB.points.map((point, index) => {
            const icons = [
              "fas fa-users", // Team of successful operators
              "fas fa-network-wired", // Unparalleled network
              "fas fa-handshake", // We understand the veteran entrepreneur
              "fas fa-graduation-cap", // Accelerator built by veterans
              "fas fa-star" // Experienced advisory board
            ];
            
            return (
              <EditableSection
                key={index}
                sectionName={`Why VB Point ${index + 1}`}
                onEdit={() => handleEditPoint(index)}
                className="bg-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-secondary"
              >
                <div className="flex items-start">
                  <div className="bg-gray-700 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <i className={`${icons[index]} text-lg`}></i>
                  </div>
                  <p className="text-dark leading-relaxed">{point}</p>
                </div>
              </EditableSection>
            );
          })}
        </div>
        
        {/* Add Point Button - only visible in admin mode */}
        <EditableSection 
          sectionName="Add New Point"
          onEdit={handleAddPoint}
          className="mt-8 text-center"
          isAddButton={true}
        >
          <div className="bg-light/50 border-2 border-dashed border-gray-300 p-8 rounded-lg">
            <button 
              onClick={handleAddPoint}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <i className="fas fa-plus text-2xl mb-2"></i>
              <p>Add New Point</p>
            </button>
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
        editingPointIndex === null 
          ? "Edit Section Title" 
          : editingPointIndex === -1 
            ? "Add New Point" 
            : `Edit Point ${editingPointIndex + 1}`
      }
    >
      {editingPointIndex === null ? (
        // Edit section title
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Section Title</label>
          <input
            type="text"
            defaultValue={siteData.whyVB.title}
            className="admin-input w-full"
          />
        </div>
      ) : (
        // Edit or add point
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Point Text</label>
            <textarea
              defaultValue={editingPointIndex >= 0 ? siteData.whyVB.points[editingPointIndex] : ''}
              className="admin-input w-full h-24 resize-none"
              placeholder="Enter the point text..."
            />
          </div>
          <IconSelector
            selectedIcon={selectedIcon}
            onIconSelect={setSelectedIcon}
          />
          {editingPointIndex >= 0 && (
            <div className="pt-4 border-t border-gray-600">
              <button 
                onClick={() => console.log('Delete point', editingPointIndex)}
                className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
              >
                🗑️ Delete This Point
              </button>
            </div>
          )}
        </div>
      )}
    </EditModal>
  </>
  );
};

export default WhyVB;