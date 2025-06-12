import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { siteData } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

const Mentors: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<any>(null);
  const [editingType, setEditingType] = useState<'header' | 'mentor' | 'add'>('header');
  const [mentorsData, setMentorsData] = useState({
    title: 'Mentor Network',
    description: 'Industry experts and successful entrepreneurs providing guidance to our portfolio companies',
    mentors: siteData.mentors
  });
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

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

  const handleDeleteMentor = async () => {
    try {
      const updatedMentors = mentorsData.mentors.filter(mentor => mentor.name !== editingMentor.name);
      const updatedData = {
        ...mentorsData,
        mentors: updatedMentors,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('mentors', updatedData);
      setMentorsData(updatedData);
      
      console.log('Mentor deleted successfully');
      setIsEditModalOpen(false);
      setEditingMentor(null);
    } catch (error) {
      console.error('Error deleting mentor:', error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingType === 'header') {
        const updatedData = {
          title: data.title,
          description: data.description,
          mentors: mentorsData.mentors,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('mentors', updatedData);
        setMentorsData(updatedData);
      } else if (editingType === 'add') {
        const newMentor = {
          name: data.name,
          company: data.company,
          image: data.image,
          linkedinUrl: data.linkedinUrl
        };
        const updatedData = {
          ...mentorsData,
          mentors: [...mentorsData.mentors, newMentor],
          updatedAt: new Date().toISOString()
        };
        await updateDocument('mentors', updatedData);
        setMentorsData(updatedData);
      } else {
        // Update existing mentor
        const mentorIndex = mentorsData.mentors.findIndex(m => m.name === editingMentor.name);
        if (mentorIndex !== -1) {
          const updatedMentors = [...mentorsData.mentors];
          updatedMentors[mentorIndex] = {
            name: data.name,
            company: data.company,
            image: data.image,
            linkedinUrl: data.linkedinUrl
          };
          const updatedData = {
            ...mentorsData,
            mentors: updatedMentors,
            updatedAt: new Date().toISOString()
          };
          await updateDocument('mentors', updatedData);
          setMentorsData(updatedData);
        }
      }
      console.log('Mentors data saved successfully');
      setIsEditModalOpen(false);
      setEditingMentor(null);
    } catch (error) {
      console.error('Error saving mentors data:', error);
    }
  };

  // Load data from Firestore on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getDocument('mentors');
        if (data) {
          setMentorsData(data as any);
        }
      } catch (error) {
        console.error('Error loading mentors data:', error);
      }
    };
    
    loadData();
  }, []);

  return (
    <>
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <EditableSection 
            sectionName="Mentors Header"
            onEdit={handleEditHeader}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-vb-navy mb-4">
                {mentorsData.title}
              </h2>
              <p className="text-xl text-vb-medium max-w-3xl mx-auto">
                {mentorsData.description}
              </p>
            </div>
          </EditableSection>

        <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-6">
          {mentorsData.mentors.map((mentor, index) => (
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
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-vb-blue"
                />
              </div>
              <h3 className="font-bold text-vb-navy text-lg mb-2">{mentor.name}</h3>
              {mentor.company && (
                <p className="text-vb-medium text-sm mb-3">{mentor.company}</p>
              )}
              {mentor.linkedinUrl && (
                <div className="pt-3 border-t border-secondary">
                  <a 
                    href={mentor.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors inline-block"
                  >
                    <i className="fab fa-linkedin text-xl"></i>
                  </a>
                </div>
              )}
            </EditableSection>
          ))}
          
          {/* Add Mentor Button */}
          <EditableSection 
            sectionName="Add New Mentor"
            onEdit={handleAddMentor}
            className="text-center p-6 bg-light/50 border-2 border-dashed border-vb-light rounded-lg flex items-center justify-center min-h-[200px]"
            isAddButton={true}
          >
            <div className="text-vb-light hover:text-vb-blue transition-colors">
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
              name="title"
              defaultValue={mentorsData.title}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Description</label>
            <textarea
              name="description"
              defaultValue={mentorsData.description}
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
              name="name"
              defaultValue={editingMentor?.name || ''}
              className="admin-input w-full"
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Company/Role</label>
            <input
              type="text"
              name="company"
              defaultValue={editingMentor?.company || ''}
              className="admin-input w-full"
              placeholder="e.g., Co-Founder - TechCorp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              defaultValue={editingMentor?.image || ''}
              className="admin-input w-full"
              placeholder="/images/mentors/mentor-name.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn URL</label>
            <input
              type="url"
              name="linkedinUrl"
              defaultValue={editingMentor?.linkedinUrl || ''}
              className="admin-input w-full"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          {editingType === 'mentor' && (
            <div className="pt-4 border-t border-gray-600">
              <button 
                onClick={handleDeleteMentor}
                className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
              >
<i className="fas fa-trash mr-2"></i>Delete Mentor
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