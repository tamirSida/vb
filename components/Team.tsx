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
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((member, index) => (
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
                  className="bg-light rounded-xl overflow-hidden border-2 border-secondary hover:border-vb-blue transition-all duration-300 shadow-lg hover:shadow-xl h-full"
                >
                  <div className="flex justify-center pt-6 mb-6">
                    <motion.div 
                      className="w-32 h-32 rounded-full overflow-hidden border-4 border-vb-blue shadow-xl"
                      whileHover={{ 
                        scale: 1.1,
                        borderColor: "#fbbf24",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover object-center"
                      />
                    </motion.div>
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
                        <motion.a 
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="fab fa-linkedin text-xl"></i>
                        </motion.a>
                      </div>
                    )}
                  </div>
                </EditableSection>
              </motion.div>
            ))}
            
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
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
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
                  className="bg-light rounded-lg overflow-hidden border border-secondary shadow-md hover:shadow-lg transition-all duration-300 h-full"
                >
                  <div className="flex justify-center pt-3 mb-3">
                    <motion.div 
                      className="w-24 h-24 rounded-full overflow-hidden border-2 border-vb-blue shadow-lg"
                      whileHover={{ 
                        scale: 1.1,
                        borderColor: "#fbbf24",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover object-top scale-110"
                        priority
                      />
                    </motion.div>
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
                        <motion.a 
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="fab fa-linkedin text-lg"></i>
                        </motion.a>
                      </div>
                    )}
                  </div>
                </EditableSection>
              </motion.div>
            ))}
            
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
                className="bg-light/50 border-2 border-dashed border-vb-light rounded-lg flex items-center justify-center h-48 hover:border-vb-blue transition-colors"
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