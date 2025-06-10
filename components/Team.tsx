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
                <div className="p-6">
                  <h4 className="text-xl font-bold text-dark mb-2">{member.name}</h4>
                  <p className="text-gray-700 font-semibold mb-3 text-sm">{member.title}</p>
                  <p className="text-medium mb-4 text-sm">{member.bio}</p>
                  
                  <div className="border-t border-secondary pt-4 space-y-2">
                    <div>
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Military:</span>
                      <p className="text-sm text-dark">{member.military}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Education:</span>
                      <p className="text-sm text-dark">{member.education}</p>
                    </div>
                  </div>
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
                <div className="flex justify-center pt-4 mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover object-top scale-110"
                      priority
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-dark mb-1 text-center">{member.name}</h4>
                  <p className="text-gray-700 font-semibold mb-3 text-sm text-center">{member.title}</p>
                  
                  {member.military !== "N/A" && (
                    <div className="mb-3 text-center">
                      <span className="text-xs text-medium font-medium">{member.military}</span>
                    </div>
                  )}

                  {member.bullets && (
                    <div className="mt-3">
                      <ul className="space-y-1">
                        {member.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="text-xs text-dark flex items-start">
                            <span className="text-gray-700 mr-2 flex-shrink-0">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </EditableSection>
            ))}
            
            {/* Add Team Member Button */}
            <EditableSection 
              sectionName="Add New Team Member"
              onEdit={() => console.log('Add team member')}
              className="bg-light/50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-60"
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
            <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
            <textarea
              defaultValue={editingMember.bio}
              className="admin-input w-full h-24 resize-none"
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
            <label className="block text-sm font-medium text-gray-300 mb-1">Education</label>
            <input
              type="text"
              defaultValue={editingMember.education}
              className="admin-input w-full"
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