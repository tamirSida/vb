import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { siteData, TeamMember } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

const Team: React.FC = () => {
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [teamData, setTeamData] = useState<TeamMember[]>(siteData.team);
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');
  
  const founders = teamData.filter(member => member.isFounder);
  const team = teamData.filter(member => !member.isFounder);

  const handleEditMember = (member: any) => {
    setEditingMember(member);
    setIsAddMode(false);
    setIsEditModalOpen(true);
  };

  const handleAddMember = (isFounder: boolean) => {
    setEditingMember({ 
      name: '', 
      title: '', 
      image: '', 
      military: '', 
      linkedinUrl: '', 
      isFounder 
    });
    setIsAddMode(true);
    setIsEditModalOpen(true);
  };

  const handleSaveMember = async (data: any) => {
    try {
      const memberData = {
        name: data.name,
        title: data.title,
        image: data.image,
        military: data.military,
        linkedinUrl: data.linkedinUrl,
        isFounder: data.isFounder === 'true' || data.isFounder === true
      };

      let updatedTeam;
      if (isAddMode) {
        // Add new member
        updatedTeam = [...teamData, { ...memberData, id: Date.now().toString() }];
      } else {
        // Update existing member
        updatedTeam = teamData.map(member => 
          member.name === editingMember.name ? { ...member, ...memberData } : member
        );
      }

      await updateDocument('team', { 
        members: updatedTeam,
        updatedAt: new Date().toISOString()
      });
      setTeamData(updatedTeam);
      
      console.log('Team member saved successfully');
      setIsEditModalOpen(false);
      setEditingMember(null);
      setIsAddMode(false);
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleDeleteMember = async () => {
    try {
      const updatedTeam = teamData.filter(member => member.name !== editingMember.name);
      await updateDocument('team', { 
        members: updatedTeam,
        updatedAt: new Date().toISOString()
      });
      setTeamData(updatedTeam);
      
      console.log('Team member deleted successfully');
      setIsEditModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  // Load Team data from Firestore on component mount
  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const data = await getDocument('team');
        if (data && (data as any).members) {
          setTeamData((data as any).members);
        }
      } catch (error) {
        console.error('Error loading team data:', error);
      }
    };
    
    loadTeamData();
  }, []);

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
                <span className="text-vb-navy">Leadership Team</span>
              </h2>
              <div className="flex items-center justify-center gap-4 text-xl text-vb-medium max-w-3xl mx-auto">
                <span className="font-semibold">Combat Veterans</span>
                <i className="fas fa-arrow-right text-vb-medium text-2xl"></i>
                <span className="font-semibold">Entrepreneurs</span>
                <i className="fas fa-arrow-right text-vb-medium text-2xl"></i>
                <span className="font-semibold">Investors</span>
              </div>
            </div>
          </EditableSection>

        {/* Founders Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-vb-navy mb-8 text-center">General Partners</h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((member, index) => (
              <EditableSection
                key={index}
                sectionName={`${member.name}`}
                onEdit={() => handleEditMember(member)}
                className="bg-light rounded-xl overflow-hidden border-2 border-secondary hover:border-vb-blue transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex justify-center pt-6 mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-vb-blue shadow-xl">
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
                    <h4 className="text-xl font-bold text-vb-navy mb-2">{member.name}</h4>
                    {member.title && (
                      <p className="text-vb-blue font-semibold mb-3 text-sm">{member.title}</p>
                    )}
                    <p className="text-sm text-vb-medium italic">{member.military}</p>
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
            
            {/* Add General Partner Button */}
            <EditableSection 
              sectionName="Add New General Partner"
              onEdit={() => handleAddMember(true)}
              className="bg-light/50 border-2 border-dashed border-vb-light rounded-xl flex items-center justify-center h-80"
              isAddButton={true}
            >
              <div className="text-center text-vb-light hover:text-vb-blue transition-colors">
                <i className="fas fa-plus text-3xl mb-4"></i>
                <p className="font-medium">Add New General Partner</p>
              </div>
            </EditableSection>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="text-2xl font-bold text-vb-navy mb-8 text-center">Team</h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <EditableSection
                key={index}
                sectionName={`${member.name}`}
                onEdit={() => handleEditMember(member)}
                className="bg-light rounded-lg overflow-hidden border border-secondary shadow-md"
              >
                <div className="flex justify-center pt-3 mb-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-vb-blue shadow-lg">
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
                    <h4 className="text-base font-bold text-vb-navy mb-1">{member.name}</h4>
                    {member.title && (
                      <p className="text-vb-blue font-semibold text-xs mb-2">{member.title}</p>
                    )}
                    {member.military !== "N/A" && (
                      <p className="text-xs text-vb-medium italic">{member.military}</p>
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
              onEdit={() => handleAddMember(false)}
              className="bg-light/50 border-2 border-dashed border-vb-light rounded-lg flex items-center justify-center h-48"
              isAddButton={true}
            >
              <div className="text-center text-vb-light hover:text-vb-blue transition-colors">
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
      title={isAddMode ? 'Add Team Member' : `Edit ${editingMember?.name || 'Team Member'}`}
    >
      {editingMember && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={editingMember.name}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title (optional)</label>
            <input
              type="text"
              name="title"
              defaultValue={editingMember.title || ''}
              className="admin-input w-full"
              placeholder="Leave empty for General Partners"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Military Background</label>
            <input
              type="text"
              name="military"
              defaultValue={editingMember.military}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn URL</label>
            <input
              type="url"
              name="linkedinUrl"
              defaultValue={editingMember.linkedinUrl || ''}
              className="admin-input w-full"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              defaultValue={editingMember.image}
              className="admin-input w-full"
              placeholder="/images/team/member-name.jpg"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                name="isFounder"
                value="true"
                defaultChecked={editingMember.isFounder}
                className="mr-2"
              />
              Is General Partner
            </label>
          </div>
          
          {/* Delete Button */}
          <div className="pt-4 border-t border-gray-600">
            <button 
              onClick={handleDeleteMember}
              className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
            >
<i className="fas fa-trash mr-2"></i>Delete Team Member
            </button>
          </div>
        </div>
      )}
    </EditModal>
  </>
  );
};

export default Team;