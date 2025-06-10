import React, { useState } from 'react';
import Image from 'next/image';
import { siteData } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';

const Mentors: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<any>(null);
  const [editingType, setEditingType] = useState<'header' | 'mentor' | 'add'>('header');

  const handleEditHeader = () => {
    setEditingType('header');
    setIsEditModalOpen(true);
  };

  const handleEditMentor = (mentor: any) => {
    setEditingMentor(mentor);
    setEditingType('mentor');
    setIsEditModalOpen(true);
  };

  const handleAddMentor = () => {
    setEditingMentor(null);
    setEditingType('add');
    setIsEditModalOpen(true);
  };

  const handleSave = (data: any) => {
    console.log('Saving mentors data:', data);
    setIsEditModalOpen(false);
    setEditingMentor(null);
  };

  return (
    <>
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <EditableSection 
            sectionName="Mentors Header"
            onEdit={handleEditHeader}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                Mentor Network
              </h2>
              <p className="text-xl text-medium max-w-3xl mx-auto">
                Industry experts and successful entrepreneurs providing guidance to our portfolio companies
              </p>
            </div>
          </EditableSection>

        <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-6">
          {siteData.mentors.map((mentor, index) => (
            <EditableSection
              key={index}
              sectionName={`${mentor.name}`}
              onEdit={() => handleEditMentor(mentor)}
              className="text-center p-6 bg-light rounded-lg hover:shadow-lg transition-shadow border border-secondary"
            >
              <div className="mb-4">
                <Image 
                  src={mentor.image} 
                  alt={mentor.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-gray-700"
                />
              </div>
              <h3 className="font-bold text-gray-700 text-lg mb-2">{mentor.name}</h3>
              {mentor.company && (
                <p className="text-medium text-sm">{mentor.company}</p>
              )}
            </EditableSection>
          ))}
          
          {/* Add Mentor Button */}
          <EditableSection 
            sectionName="Add New Mentor"
            onEdit={handleAddMentor}
            className="text-center p-6 bg-light/50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center min-h-[200px]"
            isAddButton={true}
          >
            <div className="text-gray-500 hover:text-gray-700 transition-colors">
              <i className="fas fa-plus text-2xl mb-2"></i>
              <p className="font-medium">Add New Mentor</p>
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
          ? "Edit Mentors Section" 
          : editingType === 'add'
            ? "Add New Mentor"
            : `Edit ${editingMentor?.name || 'Mentor'}`
      }
    >
      {editingType === 'header' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Title</label>
            <input
              type="text"
              defaultValue="Mentor Network"
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Description</label>
            <textarea
              defaultValue="Industry experts and successful entrepreneurs providing guidance to our portfolio companies"
              className="admin-input w-full h-20 resize-none"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Mentor Name</label>
            <input
              type="text"
              defaultValue={editingMentor?.name || ''}
              className="admin-input w-full"
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Company/Role</label>
            <input
              type="text"
              defaultValue={editingMentor?.company || ''}
              className="admin-input w-full"
              placeholder="e.g., Co-Founder - TechCorp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
            <input
              type="text"
              defaultValue={editingMentor?.image || ''}
              className="admin-input w-full"
              placeholder="/images/mentors/mentor-name.jpg"
            />
          </div>
          {editingType === 'mentor' && (
            <div className="pt-4 border-t border-gray-600">
              <button 
                onClick={() => console.log('Delete mentor', editingMentor?.name)}
                className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
              >
                🗑️ Delete Mentor
              </button>
            </div>
          )}
        </div>
      )}
    </EditModal>
  </>
  );
};

export default Mentors;