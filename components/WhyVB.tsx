import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import IconSelector from './admin/IconSelector';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

const WhyVB: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPointIndex, setEditingPointIndex] = useState<number | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const [whyVBData, setWhyVBData] = useState(siteData.whyVB);
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

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

  const handleDeletePoint = async () => {
    try {
      const updatedPoints = whyVBData.points.filter((_, index) => index !== editingPointIndex);
      const updatedData = {
        ...whyVBData,
        points: updatedPoints,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('whyVB', updatedData);
      setWhyVBData(updatedData);
      
      console.log('WhyVB point deleted successfully');
      setIsEditModalOpen(false);
      setEditingPointIndex(-1);
    } catch (error) {
      console.error('Error deleting WhyVB point:', error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingPointIndex === null) {
        // Update section title
        const updatedData = {
          title: data.title,
          points: whyVBData.points,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('whyVB', updatedData);
        setWhyVBData(updatedData);
      } else if (editingPointIndex === -1) {
        // Add new point
        const newPoints = [...whyVBData.points, data.text];
        const updatedData = {
          title: whyVBData.title,
          points: newPoints,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('whyVB', updatedData);
        setWhyVBData(updatedData);
      } else {
        // Update existing point
        const newPoints = [...whyVBData.points];
        newPoints[editingPointIndex] = data.text;
        const updatedData = {
          title: whyVBData.title,
          points: newPoints,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('whyVB', updatedData);
        setWhyVBData(updatedData);
      }
      console.log('WhyVB data saved successfully');
      setIsEditModalOpen(false);
      setEditingPointIndex(null);
    } catch (error) {
      console.error('Error saving WhyVB data:', error);
    }
  };

  // Load WhyVB data from Firestore on component mount
  useEffect(() => {
    const loadWhyVBData = async () => {
      try {
        const data = await getDocument('whyVB');
        if (data) {
          setWhyVBData(data as any);
        }
      } catch (error) {
        console.error('Error loading WhyVB data:', error);
      }
    };
    
    loadWhyVBData();
  }, []);

  return (
    <>
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <EditableSection 
            sectionName="Why VB Title"
            onEdit={handleEditSection}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-vb-navy mb-4">
                {whyVBData.title}
              </h2>
            </div>
          </EditableSection>
        
        {/* First 3 items in standard grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyVBData.points.slice(0, 3).map((point, index) => {
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
                  <div className="bg-vb-navy text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <i className={`${icons[index]} text-lg`}></i>
                  </div>
                  <p className="text-vb-navy leading-relaxed">{point}</p>
                </div>
              </EditableSection>
            );
          })}
        </div>
        
        {/* Remaining items centered */}
        {whyVBData.points.length > 3 && (
          <div className="flex justify-center mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-2xl">
              {whyVBData.points.slice(3).map((point, index) => {
                const actualIndex = index + 3;
                const icons = [
                  "fas fa-users", // Team of successful operators
                  "fas fa-network-wired", // Unparalleled network
                  "fas fa-handshake", // We understand the veteran entrepreneur
                  "fas fa-graduation-cap", // Accelerator built by veterans
                  "fas fa-star" // Experienced advisory board
                ];
                
                return (
                  <EditableSection
                    key={actualIndex}
                    sectionName={`Why VB Point ${actualIndex + 1}`}
                    onEdit={() => handleEditPoint(actualIndex)}
                    className="bg-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-secondary"
                  >
                    <div className="flex items-start">
                      <div className="bg-vb-navy text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <i className={`${icons[actualIndex]} text-lg`}></i>
                      </div>
                      <p className="text-vb-navy leading-relaxed">{point}</p>
                    </div>
                  </EditableSection>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Add Point Button - only visible in admin mode */}
        <EditableSection 
          sectionName="Add New Point"
          onEdit={handleAddPoint}
          className="mt-8 text-center"
          isAddButton={true}
        >
          <div className="bg-light/50 border-2 border-dashed border-vb-light p-8 rounded-lg">
            <button 
              onClick={handleAddPoint}
              className="text-vb-light hover:text-vb-blue transition-colors"
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
            name="title"
            defaultValue={whyVBData.title}
            className="admin-input w-full"
          />
        </div>
      ) : (
        // Edit or add point
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Point Text</label>
            <textarea
              name="text"
              defaultValue={editingPointIndex >= 0 ? whyVBData.points[editingPointIndex] : ''}
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
                onClick={handleDeletePoint}
                className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
              >
<i className="fas fa-trash mr-2"></i>Delete This Point
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