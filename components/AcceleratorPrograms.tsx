import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteData } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

// Timeline Phase Card component with connecting lines and icons
const TimelinePhaseCard: React.FC<{ 
  phase: any; 
  index: number;
  onClick: () => void;
  isLast?: boolean;
}> = ({ phase, index, onClick, isLast = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  // Get icon for each phase
  const getPhaseIcon = (timeframe: string) => {
    switch (timeframe) {
      case 'JAN-MAR': return 'fas fa-clipboard-list';
      case 'APRIL': return 'fas fa-graduation-cap';
      case 'APRIL-MAY': return 'fas fa-handshake';
      case 'JUNE': return 'fas fa-users';
      case 'ONGOING': return 'fas fa-network-wired';
      default: return 'fas fa-calendar';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col items-center"
    >
      {/* Connecting Line with Arrow (before card) */}
      {index > 0 && (
        <div className="absolute top-6 -left-1/2 w-full z-0 flex items-center">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 'calc(100% - 16px)' } : { width: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            className="h-0.5 bg-gradient-to-r from-vb-light to-vb-blue"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
            className="w-4 h-4 flex items-center justify-center"
          >
            <i className="fas fa-chevron-right text-vb-blue text-xs"></i>
          </motion.div>
        </div>
      )}

      <div 
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full group cursor-pointer w-full max-w-[280px]"
        onClick={onClick}
      >
        <div className="p-6">
          {/* Phase Icon */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-vb-blue text-white rounded-full flex items-center justify-center shadow-lg">
              <i className={`${getPhaseIcon(phase.timeframe)} text-lg`}></i>
            </div>
          </div>

          {/* Timeframe Badge */}
          <div className="flex items-center justify-center mb-4">
            <span className="inline-block bg-vb-navy text-white text-sm font-bold px-4 py-2 rounded-full">
              {phase.timeframe === 'APRIL-MAY' ? 'APR-MAY' : 
               phase.timeframe === 'ONGOING' ? '∞' : phase.timeframe}
            </span>
          </div>
          
          {/* Phase Title */}
          <h3 className="text-lg font-bold text-vb-navy mb-3 text-center leading-tight">
            {phase.title}
          </h3>
        </div>

        {/* Click Indicator */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-vb-blue text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
            <i className="fas fa-eye text-sm"></i>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

const AcceleratorPrograms: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [editingType, setEditingType] = useState<'header' | 'program' | 'add' | 'about'>('header');
  const [isPhaseModalOpen, setIsPhaseModalOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<any>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: false, margin: "-100px" });
  const [acceleratorData, setAcceleratorData] = useState({
    title: 'Our Accelerator Program',
    description: 'Intensive 10-week program designed for veteran entrepreneurs ready to scale their startups',
    about: 'adam fill here',
    programs: siteData.programs.filter(program => program.name === 'VB Accelerator'),
    timeline: [
      {
        timeframe: 'JAN-MAR',
        title: 'Application and Selection Process',
        description: 'Holistic assessment of founder-market fit, the uniqueness of their value proposition, and the overall market opportunity and business viability of their venture.',
        highlights: [
          'Comprehensive founder evaluation',
          'Market opportunity analysis',
          'Business viability assessment'
        ]
      },
      {
        timeframe: 'APRIL',
        title: 'Israel Startup Bootcamp',
        description: 'Operators experience Start-Up Nation through seasoned founders, industry experts & leading academics. They advance their early-stage ventures through a "battle-tested" dedicated curriculum and training program designed for Veterans/Reservists.',
        highlights: [
          '2 weeks intensive program',
          'Access to seasoned founders',
          'Industry expert mentorship',
          'Battle-tested curriculum for veterans'
        ]
      },
      {
        timeframe: 'APRIL-MAY',
        title: 'Online Acceleration Direct Mentorship',
        description: 'Operators are paired with an experienced founder and continue to build and advance their venture during weekly check-ins and assignments.',
        highlights: [
          '6 weeks of direct mentorship',
          'Paired with experienced founders',
          'Weekly check-ins and assignments',
          'Continuous venture advancement'
        ]
      },
      {
        timeframe: 'JUNE',
        title: 'California Showcase',
        description: 'Offers operators two intensive weeks in Los Angeles and the Bay Area for crucial meetings with industry experts, investors, and partners, culminating in a "pitch day" where they present their ventures to a select group of Silicon Valley investors.',
        highlights: [
          '2 weeks in LA and Bay Area',
          'Meetings with industry experts',
          'Investor networking',
          'Final pitch day presentation'
        ]
      },
      {
        timeframe: 'ONGOING',
        title: 'VB Portfolio Network',
        description: 'Operators gain entry to a robust network, providing a continuous source of support and guidance as they navigate the complexities of building their startups. This enduring connection offers invaluable resources and ongoing mentorship, crucial for long-term success.',
        isOngoing: true,
        highlights: [
          'Lifetime network access',
          'Continuous support and guidance',
          'Ongoing mentorship',
          'Long-term success resources'
        ]
      }
    ]
  });
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

  // Only show the VB Accelerator program
  const acceleratorPrograms = acceleratorData.programs;

  const handleEditHeader = () => {
    setEditingType('header');
    setIsEditModalOpen(true);
  };

  const handleEditProgram = (program: any) => {
    setEditingProgram(program);
    setEditingType('program');
    setIsEditModalOpen(true);
  };

  const handleAddProgram = () => {
    setEditingProgram(null);
    setEditingType('add');
    setIsEditModalOpen(true);
  };

  const handleEditAbout = () => {
    setEditingType('about');
    setIsEditModalOpen(true);
  };

  const handleViewPhase = (phase: any) => {
    setSelectedPhase(phase);
    setIsPhaseModalOpen(true);
  };

  const handleDeleteProgram = async () => {
    try {
      const updatedPrograms = acceleratorData.programs.filter(program => program.name !== editingProgram.name);
      const updatedData = {
        ...acceleratorData,
        programs: updatedPrograms,
        timeline: acceleratorData.timeline,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('acceleratorPrograms', updatedData);
      setAcceleratorData(updatedData);
      
      console.log('Accelerator program deleted successfully');
      setIsEditModalOpen(false);
      setEditingProgram(null);
    } catch (error) {
      console.error('Error deleting accelerator program:', error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingType === 'header') {
        const updatedData = {
          title: data.title,
          description: data.description,
          about: acceleratorData.about,
          programs: acceleratorData.programs,
          timeline: acceleratorData.timeline,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('acceleratorPrograms', updatedData);
        setAcceleratorData(updatedData);
      } else if (editingType === 'about') {
        const updatedData = {
          ...acceleratorData,
          about: data.about,
          timeline: acceleratorData.timeline,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('acceleratorPrograms', updatedData);
        setAcceleratorData(updatedData);
      } else if (editingType === 'program') {
        // Update existing program
        const programIndex = acceleratorData.programs.findIndex(p => p.name === editingProgram.name);
        if (programIndex !== -1) {
          const updatedPrograms = [...acceleratorData.programs];
          updatedPrograms[programIndex] = {
            name: data.name,
            description: data.description,
            duration: data.duration,
            investment: data.investment,
            equity: data.equity,
            highlights: data.highlights.split('\n').filter((h: string) => h.trim())
          };
          const updatedData = {
            ...acceleratorData,
            programs: updatedPrograms,
            timeline: acceleratorData.timeline,
            updatedAt: new Date().toISOString()
          };
          await updateDocument('acceleratorPrograms', updatedData);
          setAcceleratorData(updatedData);
        }
      } else if (editingType === 'add') {
        // Add new program
        const newProgram = {
          name: data.name,
          description: data.description,
          duration: data.duration,
          investment: data.investment,
          equity: data.equity,
          highlights: data.highlights.split('\n').filter((h: string) => h.trim())
        };
        const updatedData = {
          ...acceleratorData,
          programs: [...acceleratorData.programs, newProgram],
          timeline: acceleratorData.timeline,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('acceleratorPrograms', updatedData);
        setAcceleratorData(updatedData);
      }
      console.log('Accelerator programs data saved successfully');
      setIsEditModalOpen(false);
      setEditingProgram(null);
    } catch (error) {
      console.error('Error saving accelerator programs data:', error);
    }
  };

  // Load data from Firestore on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getDocument('acceleratorPrograms');
        if (data) {
          // Merge with default timeline if not present in Firestore
          const mergedData = {
            ...acceleratorData,
            ...data,
            timeline: (data as any).timeline || acceleratorData.timeline
          };
          setAcceleratorData(mergedData as any);
        }
      } catch (error) {
        console.error('Error loading accelerator programs data:', error);
      }
    };
    
    loadData();
  }, []);

  return (
    <>
      <section id="programs" className="section-padding bg-light">
        <div className="container-max">
          <EditableSection 
            sectionName="Programs Header"
            onEdit={handleEditHeader}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-vb-navy mb-4">
                {acceleratorData.title}
              </h2>
              <p className="text-xl text-vb-medium max-w-3xl mx-auto">
                {acceleratorData.description}
              </p>
            </div>
          </EditableSection>

        <div className="space-y-8">
          {acceleratorPrograms.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <EditableSection
                sectionName={`${program.name} Program`}
                onEdit={() => handleEditProgram(program)}
                className="bg-light text-dark p-8 rounded-xl shadow-lg border border-secondary hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  >
                    <motion.h3 
                      className="text-2xl font-bold mb-3 text-vb-navy"
                      whileHover={{ scale: 1.05, color: "#2563eb" }}
                      transition={{ duration: 0.2 }}
                    >
                      {program.name}
                    </motion.h3>
                    <motion.p 
                      className="text-vb-medium mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    >
                      {program.description}
                    </motion.p>
                    
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                    >
                      <motion.div
                        className="bg-white/50 p-4 rounded-lg border border-vb-light/30"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <span className="text-vb-blue font-semibold block mb-1">Duration:</span>
                        <motion.p 
                          className="text-vb-navy font-bold text-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          {program.duration}
                        </motion.p>
                      </motion.div>
                      <motion.div
                        className="bg-white/50 p-4 rounded-lg border border-vb-light/30"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <span className="text-vb-blue font-semibold block mb-1">Investment:</span>
                        <motion.p 
                          className="text-vb-navy font-bold text-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          {program.investment}
                        </motion.p>
                      </motion.div>
                      <motion.div
                        className="bg-white/50 p-4 rounded-lg border border-vb-light/30"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <span className="text-vb-blue font-semibold block mb-1">What You Receive:</span>
                        <motion.p 
                          className="text-vb-navy font-bold text-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          {program.equity}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.9 }}
                  >
                    <h4 className="text-vb-blue font-semibold mb-3 text-lg">Program Highlights:</h4>
                    <ul className="space-y-3">
                      {program.highlights.map((highlight, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start group"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.2 + 1.1 + (idx * 0.1) 
                          }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.span 
                            className="text-vb-blue mr-3 text-lg group-hover:text-vb-gold transition-colors"
                            whileHover={{ scale: 1.3, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                          >
                            •
                          </motion.span>
                          <span className="text-vb-medium group-hover:text-vb-navy transition-colors">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </EditableSection>
            </motion.div>
          ))}

          {/* Program Timeline Section */}
          <div ref={timelineRef} className="bg-light text-dark rounded-xl shadow-lg border border-secondary overflow-hidden">
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h3 className="text-3xl font-bold text-vb-navy mb-4">Program Timeline</h3>
                <p className="text-xl text-vb-medium max-w-2xl mx-auto">
                  Click on each phase to learn more about the process
                </p>
              </motion.div>
              
              {/* Timeline Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 relative">
                {acceleratorData.timeline && acceleratorData.timeline.length > 0 ? (
                  acceleratorData.timeline.map((phase, index) => (
                    <TimelinePhaseCard
                      key={`${phase.timeframe}-${isTimelineInView ? 'visible' : 'hidden'}`}
                      phase={phase}
                      index={index}
                      onClick={() => handleViewPhase(phase)}
                      isLast={index === acceleratorData.timeline.length - 1}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 col-span-full">
                    <p className="text-vb-medium">Loading timeline...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Add Program Button */}
          <EditableSection 
            sectionName="Add New Program"
            onEdit={handleAddProgram}
            className="bg-light/50 border-2 border-dashed border-vb-light p-8 rounded-xl flex items-center justify-center min-h-[300px]"
            isAddButton={true}
          >
            <div className="text-center text-vb-light hover:text-vb-blue transition-colors">
              <i className="fas fa-plus text-3xl mb-4"></i>
              <p className="font-medium">Add New Program</p>
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
          ? "Edit Programs Section" 
          : editingType === 'add'
            ? "Add New Program"
            : editingType === 'about'
              ? "Edit About the Program"
              : `Edit ${editingProgram?.name || 'Program'}`
      }
    >
      {editingType === 'header' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Title</label>
            <input
              type="text"
              name="title"
              defaultValue={acceleratorData.title}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Description</label>
            <textarea
              name="description"
              defaultValue={acceleratorData.description}
              className="admin-input w-full h-20 resize-none"
            />
          </div>
        </div>
      ) : editingType === 'about' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">About Content</label>
            <textarea
              name="about"
              defaultValue={acceleratorData.about}
              className="admin-input w-full h-32 resize-none"
              placeholder="Describe the program in detail..."
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Program Name</label>
            <input
              type="text"
              name="name"
              defaultValue={editingProgram?.name || ''}
              className="admin-input w-full"
              placeholder="e.g., VB Accelerator"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={editingProgram?.description || ''}
              className="admin-input w-full h-20 resize-none"
              placeholder="Brief description of the program"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                defaultValue={editingProgram?.duration || ''}
                className="admin-input w-full"
                placeholder="e.g., 10 weeks"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Investment</label>
              <input
                type="text"
                name="investment"
                defaultValue={editingProgram?.investment || ''}
                className="admin-input w-full"
                placeholder="e.g., $100,000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">What You Receive</label>
            <input
              type="text"
              name="equity"
              defaultValue={editingProgram?.equity || ''}
              className="admin-input w-full"
              placeholder="e.g., 3.33%"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Highlights (one per line)</label>
            <textarea
              name="highlights"
              defaultValue={editingProgram?.highlights?.join('\n') || ''}
              className="admin-input w-full h-24 resize-none"
              placeholder="Program highlight 1&#10;Program highlight 2&#10;Program highlight 3"
            />
          </div>
          {editingType === 'program' && (
            <div className="pt-4 border-t border-gray-600">
              <button 
                onClick={handleDeleteProgram}
                className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
              >
<i className="fas fa-trash mr-2"></i>Delete Program
              </button>
            </div>
          )}
        </div>
      )}
    </EditModal>

    {/* Phase Details Modal */}
    {isPhaseModalOpen && selectedPhase && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Close Button */}
            <button 
              onClick={() => setIsPhaseModalOpen(false)}
              className="float-right text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            
            {/* Phase Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-vb-blue text-white rounded-full flex items-center justify-center shadow-lg">
                  <i className={`${selectedPhase.timeframe === 'JAN-MAR' ? 'fas fa-clipboard-list' : 
                    selectedPhase.timeframe === 'APRIL' ? 'fas fa-graduation-cap' :
                    selectedPhase.timeframe === 'APRIL-MAY' ? 'fas fa-handshake' :
                    selectedPhase.timeframe === 'JUNE' ? 'fas fa-users' :
                    selectedPhase.timeframe === 'ONGOING' ? 'fas fa-network-wired' : 'fas fa-calendar'} text-lg`}></i>
                </div>
                <span className="inline-block bg-vb-navy text-white text-sm font-bold px-4 py-2 rounded-full">
                  {selectedPhase.timeframe === 'APRIL-MAY' ? 'APR-MAY' : 
                   selectedPhase.timeframe === 'ONGOING' ? '∞' : selectedPhase.timeframe}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-vb-navy mb-4">
                {selectedPhase.title}
              </h2>
              
              <p className="text-vb-medium text-base leading-relaxed mb-6">
                {selectedPhase.description}
              </p>
            </div>
            
            {/* Phase Highlights */}
            {selectedPhase.highlights && selectedPhase.highlights.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-vb-navy mb-4">Key Features:</h3>
                <ul className="space-y-3">
                  {selectedPhase.highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-vb-blue mr-3 mt-1">•</span>
                      <span className="text-vb-medium">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default AcceleratorPrograms;