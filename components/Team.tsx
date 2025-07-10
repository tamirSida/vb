import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { siteData, TeamMember } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

const Team: React.FC = () => {
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [teamData, setTeamData] = useState<TeamMember[]>(siteData.team);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isMemberPopupOpen, setIsMemberPopupOpen] = useState(false);
  const [isBioEditMode, setIsBioEditMode] = useState(false);
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');
  
  // Animation refs
  const headerRef = useRef<HTMLDivElement>(null);
  const foundersRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isFoundersInView = useInView(foundersRef, { once: true, margin: "-50px" });
  const isTeamInView = useInView(teamRef, { once: true, margin: "-50px" });
  
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
      isFounder,
      bio: ''
    });
    setIsAddMode(true);
    setIsEditModalOpen(true);
  };

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsMemberPopupOpen(true);
    setIsBioEditMode(false);
  };

  const handleBioEdit = () => {
    setIsBioEditMode(true);
  };

  const handleBioSave = async (bio: string) => {
    if (!selectedMember) return;
    
    try {
      const updatedTeam = teamData.map(member => 
        member.name === selectedMember.name ? { ...member, bio } : member
      );

      await updateDocument('team', { 
        members: updatedTeam,
        updatedAt: new Date().toISOString()
      });
      
      setTeamData(updatedTeam);
      setSelectedMember({ ...selectedMember, bio });
      setIsBioEditMode(false);
      console.log('Bio saved successfully');
    } catch (error) {
      console.error('Error saving bio:', error);
    }
  };

  const handleSaveMember = async (data: any) => {
    try {
      const memberData = {
        name: data.name,
        title: data.title,
        image: data.image,
        military: data.military,
        linkedinUrl: data.linkedinUrl,
        isFounder: data.isFounder === 'true' || data.isFounder === true,
        bio: data.bio || ''
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

  const handleMoveUp = async (member: TeamMember, index: number) => {
    if (index === 0) return;
    
    try {
      const updatedTeam = [...teamData];
      [updatedTeam[index - 1], updatedTeam[index]] = [updatedTeam[index], updatedTeam[index - 1]];
      
      await updateDocument('team', { 
        members: updatedTeam,
        updatedAt: new Date().toISOString()
      });
      setTeamData(updatedTeam);
      console.log('Team member moved up successfully');
    } catch (error) {
      console.error('Error moving team member up:', error);
    }
  };

  const handleMoveDown = async (member: TeamMember, index: number) => {
    if (index === teamData.length - 1) return;
    
    try {
      const updatedTeam = [...teamData];
      [updatedTeam[index], updatedTeam[index + 1]] = [updatedTeam[index + 1], updatedTeam[index]];
      
      await updateDocument('team', { 
        members: updatedTeam,
        updatedAt: new Date().toISOString()
      });
      setTeamData(updatedTeam);
      console.log('Team member moved down successfully');
    } catch (error) {
      console.error('Error moving team member down:', error);
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
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <EditableSection 
              sectionName="Team Header"
              onEdit={() => console.log('Edit team header')}
            >
              <div className="text-center mb-16">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="text-vb-navy">Leadership Team</span>
                </motion.h2>
                <motion.div 
                  className="flex items-center justify-center gap-4 text-xl text-vb-medium max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.span 
                    className="font-semibold"
                    whileHover={{ scale: 1.05, color: "#1e40af" }}
                  >
                    Combat Veterans
                  </motion.span>
                  <motion.i 
                    className="fas fa-arrow-right text-vb-medium text-2xl"
                    animate={isHeaderInView ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <motion.span 
                    className="font-semibold"
                    whileHover={{ scale: 1.05, color: "#1e40af" }}
                  >
                    Entrepreneurs
                  </motion.span>
                  <motion.i 
                    className="fas fa-arrow-right text-vb-medium text-2xl"
                    animate={isHeaderInView ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  />
                  <motion.span 
                    className="font-semibold"
                    whileHover={{ scale: 1.05, color: "#1e40af" }}
                  >
                    Investors
                  </motion.span>
                </motion.div>
              </div>
            </EditableSection>
          </motion.div>

        {/* Founders Section */}
        <motion.div 
          ref={foundersRef}
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isFoundersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-vb-navy mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isFoundersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            General Partners
          </motion.h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {founders.map((member, index) => {
              const memberIndex = teamData.findIndex(m => m.name === member.name);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isFoundersInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + (index * 0.2),
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <EditableSection
                    sectionName={`${member.name}`}
                    onEdit={() => handleEditMember(member)}
                    onMoveUp={() => handleMoveUp(member, memberIndex)}
                    onMoveDown={() => handleMoveDown(member, memberIndex)}
                    canMoveUp={memberIndex > 0}
                    canMoveDown={memberIndex < teamData.length - 1}
                    className="bg-light rounded-xl overflow-hidden border-2 border-secondary hover:border-vb-blue transition-all duration-300 shadow-lg hover:shadow-xl h-full cursor-pointer"
                    onClick={() => handleMemberClick(member)}
                  >
                  <div className="flex justify-center pt-8 mb-8">
                    <motion.div 
                      className="w-36 h-36 rounded-full overflow-hidden border-4 border-vb-blue shadow-xl"
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Image 
                        src={member.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNDgiIHI9IjE4IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0zMiAxMDBDMzIgODYgNDYgNzggNjQgNzhTOTYgODYgOTYgMTAwIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo='} 
                        alt={`${member.name}${member.title ? `, ${member.title}` : ''}${member.military ? `, ${member.military}` : ''}`}
                        width={144}
                        height={144}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNDgiIHI9IjE4IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0zMiAxMDBDMzIgODYgNDYgNzggNjQgNzhTOTYgODYgOTYgMTAwIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                        }}
                      />
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-5">
                      <h4 className="text-xl font-bold text-vb-navy mb-3">{member.name}</h4>
                      {member.title && (
                        <p className="text-vb-blue font-semibold mb-3 text-base">{member.title}</p>
                      )}
                      <p className="text-base text-vb-medium italic">{member.military}</p>
                    </div>
                    
                  </div>
                </EditableSection>
              </motion.div>
              );
            })}
            
            {/* Add General Partner Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFoundersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 + (founders.length * 0.2) }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <EditableSection 
                sectionName="Add New General Partner"
                onEdit={() => handleAddMember(true)}
                className="bg-light/50 border-2 border-dashed border-vb-light rounded-xl flex items-center justify-center h-80 hover:border-vb-blue transition-colors"
                isAddButton={true}
              >
                <div className="text-center text-vb-light hover:text-vb-blue transition-colors">
                  <motion.i 
                    className="fas fa-plus text-3xl mb-4"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  />
                  <p className="font-medium">Add New General Partner</p>
                </div>
              </EditableSection>
            </motion.div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          ref={teamRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-vb-navy mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Team
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.map((member, index) => {
              const memberIndex = teamData.findIndex(m => m.name === member.name);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isTeamInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + (index * 0.1),
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                >
                  <EditableSection
                    sectionName={`${member.name}`}
                    onEdit={() => handleEditMember(member)}
                    onMoveUp={() => handleMoveUp(member, memberIndex)}
                    onMoveDown={() => handleMoveDown(member, memberIndex)}
                    canMoveUp={memberIndex > 0}
                    canMoveDown={memberIndex < teamData.length - 1}
                    className="bg-light rounded-lg overflow-hidden border border-secondary shadow-md hover:shadow-lg transition-all duration-300 h-full cursor-pointer flex flex-col"
                    onClick={() => handleMemberClick(member)}
                  >
                  <div className="flex justify-center pt-5 mb-5">
                    <motion.div 
                      className="w-28 h-28 rounded-full overflow-hidden border-2 border-vb-blue shadow-lg"
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Image 
                        src={member.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iNDgiIGN5PSIzNiIgcj0iMTQiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI0IDc2QzI0IDY2IDM0IDYwIDQ4IDYwUzcyIDY2IDcyIDc2IiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo='} 
                        alt={`${member.name}${member.title ? `, ${member.title}` : ''}${member.military ? `, ${member.military}` : ''}`}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover object-top scale-110"
                        priority
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iNDgiIGN5PSIzNiIgcj0iMTQiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI0IDc2QzI0IDY2IDM0IDYwIDQ4IDYwUzcyIDY2IDcyIDc2IiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                        }}
                      />
                    </motion.div>
                  </div>
                  <div className="px-4 pb-4 flex flex-col flex-grow">
                    <div className="text-center flex-grow">
                      <h4 className="text-lg font-bold text-vb-navy mb-2">{member.name}</h4>
                      {member.title && (
                        <p className="text-vb-blue font-semibold text-sm mb-2">{member.title}</p>
                      )}
                      <p className="text-sm text-vb-medium italic min-h-[1.25rem]">
                        {member.military !== "N/A" ? member.military : ""}
                      </p>
                    </div>
                    
                  </div>
                </EditableSection>
              </motion.div>
              );
            })}
            
            {/* Add Team Member Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.6 + (team.length * 0.1) }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <EditableSection 
                sectionName="Add New Team Member"
                onEdit={() => handleAddMember(false)}
                className="bg-light/50 border-2 border-dashed border-vb-light rounded-lg flex items-center justify-center h-56 hover:border-vb-blue transition-colors"
                isAddButton={true}
              >
                <div className="text-center text-vb-light hover:text-vb-blue transition-colors">
                  <motion.i 
                    className="fas fa-plus text-2xl mb-2"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  />
                  <p className="font-medium">Add New Team Member</p>
                </div>
              </EditableSection>
            </motion.div>
          </div>
        </motion.div>
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
            <label className="block text-sm font-medium text-gray-300 mb-1">Bio (optional)</label>
            <textarea
              name="bio"
              defaultValue={editingMember.bio || ''}
              className="admin-input w-full h-24"
              placeholder="Brief biography (will be shown in member popup)"
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

    {/* Member Popup Modal */}
    {isMemberPopupOpen && selectedMember && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] relative overflow-hidden flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={() => setIsMemberPopupOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl z-10"
          >
            <i className="fas fa-times"></i>
          </button>

          <div className="p-6 overflow-y-auto flex-1">

          {/* Member Info - Compact Header */}
          <div className="flex items-center mb-3 pb-3 border-b border-gray-200">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-vb-blue shadow-md flex-shrink-0 mr-4">
              <Image 
                src={selectedMember.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIyNCIgcj0iMTAiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE2IDUwQzE2IDQyIDIyIDM4IDMyIDM4UzQ4IDQyIDQ4IDUwIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo='} 
                alt={selectedMember.name}
                width={64}
                height={64}
                className="w-full h-full object-cover object-top scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIyNCIgcj0iMTAiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE2IDUwQzE2IDQyIDIyIDM4IDMyIDM4UzQ4IDQyIDQ4IDUwIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                }}
              />
            </div>
            
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-vb-navy mb-0.5">{selectedMember.name}</h3>
              {selectedMember.title && (
                <p className="text-vb-blue font-semibold text-sm mb-0.5">{selectedMember.title}</p>
              )}
              {selectedMember.military && selectedMember.military !== "N/A" && (
                <p className="text-vb-medium italic text-xs mb-1">{selectedMember.military}</p>
              )}
              
              {selectedMember.linkedinUrl && (
                <a 
                  href={selectedMember.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-xs"
                >
                  <i className="fab fa-linkedin text-lg mr-1"></i>
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Bio Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-vb-navy">Biography</h4>
              {!isBioEditMode && (
                <button
                  onClick={handleBioEdit}
                  className="text-vb-blue hover:text-vb-navy text-sm font-medium"
                >
                  <i className="fas fa-edit mr-1"></i>
                  {selectedMember.bio ? 'Edit' : 'Add Bio'}
                </button>
              )}
            </div>
            
            {isBioEditMode ? (
              <BioEditor
                initialBio={selectedMember.bio || ''}
                onSave={handleBioSave}
                onCancel={() => setIsBioEditMode(false)}
                memberName={selectedMember.name}
                memberTitle={selectedMember.title || ''}
              />
            ) : (
              <div className="text-gray-700 text-sm leading-relaxed break-words">
                {selectedMember.bio ? (
                  <p className="whitespace-pre-wrap">{selectedMember.bio}</p>
                ) : (
                  <p className="text-gray-400 italic">No biography available. Click "Add Bio" to add one.</p>
                )}
              </div>
            )}
          </div>
          </div>
        </motion.div>
      </div>
    )}
  </>
  );
};

// Bio Editor Component
const BioEditor: React.FC<{
  initialBio: string;
  onSave: (bio: string) => void;
  onCancel: () => void;
  memberName: string;
  memberTitle: string;
}> = ({ initialBio, onSave, onCancel, memberName, memberTitle }) => {
  const [bio, setBio] = useState(initialBio);

  const handleSave = () => {
    onSave(bio);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="bg-gray-50 p-3 rounded-lg mb-3 text-sm">
          <p className="text-gray-600 mb-2">
            <strong>Auto-populated:</strong>
          </p>
          <p><strong>Name:</strong> {memberName}</p>
          {memberTitle && <p><strong>Title:</strong> {memberTitle}</p>}
        </div>
        
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Biography
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vb-blue focus:border-transparent resize-none break-words"
          placeholder={`Write a brief biography for ${memberName}...`}
          style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
        />
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={handleSave}
          className="flex-1 bg-vb-blue text-white py-2 px-4 rounded-lg hover:bg-vb-navy transition-colors font-medium"
        >
          <i className="fas fa-save mr-2"></i>
          Save Bio
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          <i className="fas fa-times mr-2"></i>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Team;