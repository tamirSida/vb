import React, { useState } from 'react';
import Image from 'next/image';
import { siteData } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';

const Team: React.FC = () => {
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const founders = siteData.team.filter(member => member.isFounder);
  const team = siteData.team.filter(member => !member.isFounder);

  const handleEditMember = (member: any) => {
    setEditingMember(member);
    setIsEditModalOpen(true);
  };

  const handleSaveMember = (data: any) => {
    // TODO: Implement save to Firebase
    console.log('Saving member:', data);
    setIsEditModalOpen(false);
    setEditingMember(null);
  };

  return (
    <>
      <section id="team" className="section-padding bg-primary text-dark">
        <div className="container-max">
          <EditableSection 
            sectionName="Team Header"
            onEdit={() => console.log('Edit team header')}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-dark">Leadership</span> <span className="text-gray-700">Team</span>
              </h2>
              <div className="flex items-center justify-center gap-4 text-xl text-medium max-w-3xl mx-auto">
                <span className="font-semibold">Combat Veterans</span>
                <i className="fas fa-arrow-right text-gray-700 text-2xl"></i>
                <span className="font-semibold">Entrepreneurs</span>
                <i className="fas fa-arrow-right text-gray-700 text-2xl"></i>
                <span className="font-semibold">Investors</span>
              </div>
            </div>
          </EditableSection>

        {/* Founders Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-700 mb-8 text-center">Founders</h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((member, index) => (
              <EditableSection
                key={index}
                sectionName={`${member.name}`}
                onEdit={() => handleEditMember(member)}
                className="bg-light rounded-xl overflow-hidden border-2 border-secondary hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex justify-center pt-6 mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-xl">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-dark mb-2">{member.name}</h4>
                    <p className="text-gray-700 font-semibold mb-3 text-sm">{member.title}</p>
                    <p className="text-sm text-medium italic">{member.military}</p>
                  </div>
                  
                  {member.linkedinUrl && (
                    <div className="flex justify-center pt-3 border-t border-secondary">
                      <a 
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <i className="fab fa-linkedin text-xl"></i>
                      </a>
                    </div>
                  )}
                </div>
              </EditableSection>
            ))}
            
            {/* Add Founder Button */}
            <EditableSection 
              sectionName="Add New Founder"
              onEdit={() => console.log('Add founder')}
              className="bg-light/50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-80"
              isAddButton={true}
            >
              <div className="text-center text-gray-500 hover:text-gray-700 transition-colors">
                <i className="fas fa-plus text-3xl mb-4"></i>
                <p className="font-medium">Add New Founder</p>
              </div>
            </EditableSection>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-8 text-center">Team & Advisors</h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <EditableSection
                key={index}
                sectionName={`${member.name}`}
                onEdit={() => handleEditMember(member)}
                className="bg-light rounded-lg overflow-hidden border border-secondary shadow-md"
              >
                <div className="flex justify-center pt-3 mb-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-top scale-110"
                      priority
                    />
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-center mb-3">
                    <h4 className="text-base font-bold text-dark mb-1">{member.name}</h4>
                    <p className="text-gray-700 font-semibold text-xs mb-2">{member.title}</p>
                    {member.military !== "N/A" && (
                      <p className="text-xs text-medium italic">{member.military}</p>
                    )}
                  </div>
                  
                  {member.linkedinUrl && (
                    <div className="flex justify-center pt-2 border-t border-secondary">
                      <a 
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <i className="fab fa-linkedin text-lg"></i>
                      </a>
                    </div>
                  )}
                </div>
              </EditableSection>
            ))}
            
            {/* Add Team Member Button */}
            <EditableSection 
              sectionName="Add New Team Member"
              onEdit={() => console.log('Add team member')}
              className="bg-light/50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-48"
              isAddButton={true}
            >
              <div className="text-center text-gray-500 hover:text-gray-700 transition-colors">
                <i className="fas fa-plus text-2xl mb-2"></i>
                <p className="font-medium">Add New Team Member</p>
              </div>
            </EditableSection>
          </div>
        </div>
      </div>
    </section>

    {/* Edit Modal */}
    <EditModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      onSave={handleSaveMember}
      title={`Edit ${editingMember?.name || 'Team Member'}`}
    >
      {editingMember && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              type="text"
              defaultValue={editingMember.name}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              defaultValue={editingMember.title}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Military Background</label>
            <input
              type="text"
              defaultValue={editingMember.military}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn URL</label>
            <input
              type="url"
              defaultValue={editingMember.linkedinUrl || ''}
              className="admin-input w-full"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
            <input
              type="text"
              defaultValue={editingMember.image}
              className="admin-input w-full"
              placeholder="/images/team/member-name.jpg"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                defaultChecked={editingMember.isFounder}
                className="mr-2"
              />
              Is Founder
            </label>
          </div>
          
          {/* Delete Button */}
          <div className="pt-4 border-t border-gray-600">
            <button 
              onClick={() => console.log('Delete member', editingMember.name)}
              className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
            >
              🗑️ Delete Team Member
            </button>
          </div>
        </div>
      )}
    </EditModal>
  </>
  );
};

export default Team;