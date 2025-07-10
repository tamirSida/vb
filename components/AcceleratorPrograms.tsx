import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteData, Program } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import ImageInsert from './admin/ImageInsert';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';
import { useAdmin } from '../contexts/AdminContext';

// Common icon options for timeline phases
const TIMELINE_ICONS = [
  { icon: 'fas fa-clipboard-list', label: 'Application' },
  { icon: 'fas fa-graduation-cap', label: 'Education' },
  { icon: 'fas fa-handshake', label: 'Partnership' },
  { icon: 'fas fa-users', label: 'Team' },
  { icon: 'fas fa-network-wired', label: 'Network' },
  { icon: 'fas fa-calendar', label: 'Calendar' },
  { icon: 'fas fa-rocket', label: 'Launch' },
  { icon: 'fas fa-lightbulb', label: 'Ideas' },
  { icon: 'fas fa-chart-line', label: 'Growth' },
  { icon: 'fas fa-dollar-sign', label: 'Investment' },
  { icon: 'fas fa-trophy', label: 'Achievement' },
  { icon: 'fas fa-cogs', label: 'Development' },
  { icon: 'fas fa-presentation', label: 'Presentation' },
  { icon: 'fas fa-star', label: 'Success' },
  { icon: 'fas fa-flag', label: 'Milestone' },
  { icon: 'fas fa-globe', label: 'Global' },
  { icon: 'fas fa-building', label: 'Business' },
  { icon: 'fas fa-code', label: 'Technology' },
  { icon: 'fas fa-heart', label: 'Passion' },
  { icon: 'fas fa-shield-alt', label: 'Security' }
];

// Timeline Phase Card component with connecting lines and icons
const TimelinePhaseCard: React.FC<{ 
  phase: any; 
  index: number;
  onClick: () => void;
  isLast?: boolean;
}> = ({ phase, index, onClick, isLast = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  // Get icon for each phase (with fallback)
  const getPhaseIcon = (phase: any) => {
    return phase.icon || 'fas fa-calendar';
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
              <i className={`${getPhaseIcon(phase)} text-lg`}></i>
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
  const { isAdminMode } = useAdmin();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [editingType, setEditingType] = useState<'header' | 'program' | 'add' | 'about' | 'timelineHeader' | 'timelinePhase' | 'addTimelinePhase' | 'addSquare' | 'editSquare'>('header');
  const [isPhaseModalOpen, setIsPhaseModalOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<any>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: false, margin: "-100px" });
  const [acceleratorData, setAcceleratorData] = useState({
    title: 'Our Accelerator Program',
    description: 'Intensive 10-week program designed for veteran entrepreneurs ready to scale their startups',
    about: 'adam fill here',
    timelineTitle: 'Program Timeline',
    timelineDescription: 'Click on each phase to learn more about the process',
    programs: siteData.programs.filter(program => program.name === 'VB Accelerator'),
    images: [] as any[],
    timeline: [
      {
        timeframe: 'JAN-MAR',
        title: 'Application and Selection Process',
        description: 'Holistic assessment of founder-market fit, the uniqueness of their value proposition, and the overall market opportunity and business viability of their venture.',
        highlights: [
          'Comprehensive founder evaluation',
          'Market opportunity analysis',
          'Business viability assessment'
        ],
        icon: 'fas fa-clipboard-list'
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
        ],
        icon: 'fas fa-graduation-cap'
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
        ],
        icon: 'fas fa-handshake'
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
        ],
        icon: 'fas fa-users'
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
        ],
        icon: 'fas fa-network-wired'
      }
    ]
  });
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

  // Load data from Firestore on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getDocument('acceleratorContent') as any;
        if (data) {
          // Ensure programs have squares array, migrating old structure if needed
          const migratedPrograms = (data.programs || acceleratorData.programs).map((program: any) => {
            if (!program.squares && (program.duration || program.investment || program.equity)) {
              // Migrate old structure to new squares format
              return {
                ...program,
                squares: [
                  ...(program.duration ? [{ id: 'duration', label: 'Duration', value: program.duration }] : []),
                  ...(program.investment ? [{ id: 'investment', label: 'Investment', value: program.investment }] : []),
                  ...(program.equity ? [{ id: 'equity', label: 'What You Receive', value: program.equity }] : [])
                ]
              };
            }
            return program;
          });
          
          setAcceleratorData({
            ...acceleratorData,
            ...data,
            programs: migratedPrograms
          });
        }
      } catch (error) {
        console.error('Error loading accelerator data:', error);
      }
    };
    loadData();
  }, []);

  // Handle image operations
  const handleImageSave = async (imageData: any) => {
    try {
      const updatedImages = [...acceleratorData.images, imageData];
      const updatedData = {
        ...acceleratorData,
        images: updatedImages,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('acceleratorContent', updatedData);
      setAcceleratorData(updatedData);
      console.log('Image added successfully');
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleImageDelete = async (imageId: string) => {
    try {
      const updatedImages = acceleratorData.images.filter((img: any) => img.id !== imageId);
      const updatedData = {
        ...acceleratorData,
        images: updatedImages,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('acceleratorContent', updatedData);
      setAcceleratorData(updatedData);
      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

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

  const handleEditTimelineHeader = () => {
    setEditingType('timelineHeader');
    setIsEditModalOpen(true);
  };

  const handleEditTimelinePhase = (phase: any) => {
    setSelectedPhase(phase);
    setEditingType('timelinePhase');
    setIsEditModalOpen(true);
  };

  const handleAddTimelinePhase = () => {
    setSelectedPhase(null);
    setEditingType('addTimelinePhase');
    setIsEditModalOpen(true);
  };

  const handleDeleteTimelinePhase = async (phase: any) => {
    try {
      // Use both timeframe and title for more specific matching to avoid deleting multiple phases
      const updatedTimeline = acceleratorData.timeline.filter(p => 
        !(p.timeframe === phase.timeframe && p.title === phase.title)
      );
      const updatedData = {
        ...acceleratorData,
        timeline: updatedTimeline,
        updatedAt: new Date().toISOString()
      };
      console.log('Deleting timeline phase from Firebase:', phase);
      const success = await updateDocument('acceleratorContent', updatedData);
      if (success) {
        setAcceleratorData(updatedData);
        console.log('Timeline phase deleted successfully from Firebase');
      } else {
        console.error('Failed to delete timeline phase from Firebase');
      }
    } catch (error) {
      console.error('Error deleting timeline phase:', error);
    }
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
        updatedAt: new Date().toISOString()
      };
      await updateDocument('acceleratorContent', updatedData);
      setAcceleratorData(updatedData);
      
      console.log('Accelerator program deleted successfully');
      setIsEditModalOpen(false);
      setEditingProgram(null);
    } catch (error) {
      console.error('Error deleting accelerator program:', error);
    }
  };

  // Square management functions
  const handleAddSquare = (program: any) => {
    setEditingProgram(program);
    setEditingType('addSquare');
    setIsEditModalOpen(true);
  };

  const handleEditSquare = (program: any, square: any) => {
    setEditingProgram({ ...program, editingSquare: square });
    setEditingType('editSquare');
    setIsEditModalOpen(true);
  };

  const handleDeleteSquare = async (program: any, squareId: string) => {
    try {
      const updatedSquares = (program.squares || []).filter((square: any) => square.id !== squareId);
      const updatedPrograms = acceleratorData.programs.map((p: any) => 
        p.name === program.name ? { ...p, squares: updatedSquares } : p
      );
      
      const updatedData = {
        ...acceleratorData,
        programs: updatedPrograms,
        updatedAt: new Date().toISOString()
      };
      
      await updateDocument('acceleratorContent', updatedData);
      setAcceleratorData(updatedData);
    } catch (error) {
      console.error('Error deleting square:', error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingType === 'header') {
        const updatedData = {
          title: data.title,
          description: data.description,
          about: acceleratorData.about,
          timelineTitle: acceleratorData.timelineTitle,
          timelineDescription: acceleratorData.timelineDescription,
          programs: acceleratorData.programs,
          images: acceleratorData.images,
          timeline: acceleratorData.timeline,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('acceleratorContent', updatedData);
        setAcceleratorData(updatedData);
      } else if (editingType === 'about') {
        const updatedData = {
          ...acceleratorData,
          about: data.about,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('acceleratorContent', updatedData);
        setAcceleratorData(updatedData);
      } else if (editingType === 'program') {
        // Update existing program
        const programIndex = acceleratorData.programs.findIndex(p => p.name === editingProgram.name);
        if (programIndex !== -1) {
          const updatedPrograms = [...acceleratorData.programs];
          updatedPrograms[programIndex] = {
            ...updatedPrograms[programIndex],
            name: data.name,
            description: data.description,
            highlights: data.highlights.split('\n').filter((h: string) => h.trim())
          };
          const updatedData = {
            ...acceleratorData,
            programs: updatedPrograms,
            updatedAt: new Date().toISOString()
          };
          await updateDocument('acceleratorContent', updatedData);
          setAcceleratorData(updatedData);
        }
      } else if (editingType === 'add') {
        // Add new program
        const newProgram: Program = {
          name: data.name,
          description: data.description,
          duration: data.duration || '',
          investment: data.investment || '',
          equity: data.equity || '',
          squares: [],
          highlights: data.highlights.split('\n').filter((h: string) => h.trim())
        };
        const updatedData = {
          ...acceleratorData,
          programs: [...acceleratorData.programs, newProgram],
          updatedAt: new Date().toISOString()
        };
        await updateDocument('acceleratorContent', updatedData);
        setAcceleratorData(updatedData);
      } else if (editingType === 'addSquare') {
        // Add new square to program
        const newSquare = {
          id: `square-${Date.now()}`,
          label: data.label,
          value: data.value
        };
        const programIndex = acceleratorData.programs.findIndex(p => p.name === editingProgram.name);
        if (programIndex !== -1) {
          const updatedPrograms = [...acceleratorData.programs];
          updatedPrograms[programIndex] = {
            ...updatedPrograms[programIndex],
            squares: [...(updatedPrograms[programIndex].squares || []), newSquare]
          };
          const updatedData = {
            ...acceleratorData,
            programs: updatedPrograms,
            updatedAt: new Date().toISOString()
          };
          await updateDocument('acceleratorContent', updatedData);
          setAcceleratorData(updatedData);
        }
      } else if (editingType === 'editSquare') {
        // Edit existing square
        const programIndex = acceleratorData.programs.findIndex(p => p.name === editingProgram.name);
        if (programIndex !== -1) {
          const updatedPrograms = [...acceleratorData.programs];
          const squares = updatedPrograms[programIndex].squares || [];
          const squareIndex = squares.findIndex(s => s.id === editingProgram.editingSquare.id);
          if (squareIndex !== -1) {
            squares[squareIndex] = {
              ...squares[squareIndex],
              label: data.label,
              value: data.value
            };
            updatedPrograms[programIndex] = {
              ...updatedPrograms[programIndex],
              squares: squares
            };
            const updatedData = {
              ...acceleratorData,
              programs: updatedPrograms,
              updatedAt: new Date().toISOString()
            };
            await updateDocument('acceleratorContent', updatedData);
            setAcceleratorData(updatedData);
          }
        }
      } else if (editingType === 'timelineHeader') {
        const updatedData = {
          ...acceleratorData,
          timelineTitle: data.timelineTitle,
          timelineDescription: data.timelineDescription,
          updatedAt: new Date().toISOString()
        };
        console.log('Saving timeline header to Firebase:', updatedData);
        const success = await updateDocument('acceleratorContent', updatedData);
        if (success) {
          setAcceleratorData(updatedData);
          console.log('Timeline header saved successfully to Firebase');
        } else {
          console.error('Failed to save timeline header to Firebase');
        }
      } else if (editingType === 'timelinePhase') {
        // Update timeline phase using both timeframe and title for better matching
        const phaseIndex = acceleratorData.timeline.findIndex(p => 
          p.timeframe === selectedPhase.timeframe && p.title === selectedPhase.title
        );
        if (phaseIndex !== -1) {
          const updatedTimeline = [...acceleratorData.timeline];
          updatedTimeline[phaseIndex] = {
            timeframe: data.timeframe,
            title: data.title,
            description: data.description,
            highlights: data.highlights.split('\n').filter((h: string) => h.trim()),
            icon: data.icon,
            isOngoing: selectedPhase.isOngoing
          };
          const updatedData = {
            ...acceleratorData,
            timeline: updatedTimeline,
            updatedAt: new Date().toISOString()
          };
          console.log('Saving timeline phase to Firebase:', updatedData);
          const success = await updateDocument('acceleratorContent', updatedData);
          if (success) {
            setAcceleratorData(updatedData);
            console.log('Timeline phase saved successfully to Firebase');
            
            // Verify the save by reading back from Firebase
            setTimeout(async () => {
              try {
                const verifyData = await getDocument('acceleratorContent');
                if (verifyData && verifyData.timeline) {
                  console.log('Verification: Timeline data in Firebase:', verifyData.timeline);
                } else {
                  console.warn('Verification: No timeline data found in Firebase');
                }
              } catch (verifyError) {
                console.warn('Verification read failed:', verifyError);
              }
            }, 1000);
          } else {
            console.error('Failed to save timeline phase to Firebase');
          }
        }
      } else if (editingType === 'addTimelinePhase') {
        // Add new timeline phase
        const newPhase = {
          timeframe: data.timeframe,
          title: data.title,
          description: data.description,
          highlights: data.highlights.split('\n').filter((h: string) => h.trim()),
          icon: data.icon,
          isOngoing: data.isOngoing || false
        };
        const updatedData = {
          ...acceleratorData,
          timeline: [...acceleratorData.timeline, newPhase],
          updatedAt: new Date().toISOString()
        };
        console.log('Adding new timeline phase to Firebase:', updatedData);
        const success = await updateDocument('acceleratorContent', updatedData);
        if (success) {
          setAcceleratorData(updatedData);
          console.log('New timeline phase added successfully to Firebase');
        } else {
          console.error('Failed to add new timeline phase to Firebase');
        }
      }
      console.log('Accelerator programs data saved successfully');
      setIsEditModalOpen(false);
      setEditingProgram(null);
      setSelectedPhase(null);
    } catch (error) {
      console.error('Error saving accelerator programs data:', error);
    }
  };

  // Remove duplicate useEffect - already handled above with acceleratorContent document

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

          {/* Image insertion after header */}
          {acceleratorData.images
            .filter((img: any) => img.position === 1)
            .map((img: any) => (
              <ImageInsert
                key={img.id}
                imageData={img}
                onSave={handleImageSave}
                onDelete={handleImageDelete}
                position={1}
                sectionName="Header Image"
              />
            ))}
          <ImageInsert
            onSave={handleImageSave}
            position={1}
            sectionName="Add Image After Header"
            isAddButton={true}
          />

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
                    <h3 className="text-2xl font-bold mb-3 text-vb-navy">
                      {program.name}
                    </h3>
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
                      {(program.squares || [
                        // Fallback to old structure if squares don't exist
                        ...(program.duration ? [{ id: 'duration', label: 'Duration', value: program.duration }] : []),
                        ...(program.investment ? [{ id: 'investment', label: 'Investment', value: program.investment }] : []),
                        ...(program.equity ? [{ id: 'equity', label: 'What You Receive', value: program.equity }] : [])
                      ]).map((square: any, squareIndex: number) => (
                        <motion.div
                          key={square.id}
                          className="bg-white/50 p-4 rounded-lg border border-vb-light/30 relative group"
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            transition: { duration: 0.2 }
                          }}
                        >
                          {isAdminMode && (
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEditSquare(program, square)}
                                className="text-vb-blue hover:text-vb-navy mr-2"
                                title="Edit Square"
                              >
                                <i className="fas fa-edit text-sm"></i>
                              </button>
                              <button
                                onClick={() => handleDeleteSquare(program, square.id)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete Square"
                              >
                                <i className="fas fa-trash text-sm"></i>
                              </button>
                            </div>
                          )}
                          <span className="text-vb-blue font-semibold block mb-1">{square.label}:</span>
                          <motion.p 
                            className="text-vb-navy font-bold text-lg"
                            whileHover={{ scale: 1.1 }}
                          >
                            {square.value}
                          </motion.p>
                        </motion.div>
                      ))}
                      {isAdminMode && (
                        <motion.div
                          className="bg-gray-100/50 p-4 rounded-lg border border-gray-300 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-200/50 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleAddSquare(program)}
                        >
                          <div className="text-center text-gray-500">
                            <i className="fas fa-plus text-2xl mb-2"></i>
                            <p className="text-sm font-medium">Add Square</p>
                          </div>
                        </motion.div>
                      )}
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

          {/* Image insertion between programs and timeline */}
          {acceleratorData.images
            .filter((img: any) => img.position === 2)
            .map((img: any) => (
              <ImageInsert
                key={img.id}
                imageData={img}
                onSave={handleImageSave}
                onDelete={handleImageDelete}
                position={2}
                sectionName="Programs Section Image"
              />
            ))}
          <ImageInsert
            onSave={handleImageSave}
            position={2}
            sectionName="Add Image Before Timeline"
            isAddButton={true}
          />

          {/* Program Timeline Section */}
          <div ref={timelineRef} className="bg-light text-dark rounded-xl shadow-lg border border-secondary overflow-hidden">
            <div className="p-8">
              <EditableSection
                sectionName="Timeline Header"
                onEdit={handleEditTimelineHeader}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h3 className="text-3xl font-bold text-vb-navy mb-4">{acceleratorData.timelineTitle || 'Program Timeline'}</h3>
                  <p className="text-xl text-vb-medium max-w-2xl mx-auto">
                    {acceleratorData.timelineDescription || 'Click on each phase to learn more about the process'}
                  </p>
                </motion.div>
              </EditableSection>
              
              {/* Timeline Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 relative">
                {acceleratorData.timeline && acceleratorData.timeline.length > 0 ? (
                  acceleratorData.timeline.map((phase, index) => (
                    <div key={`${phase.timeframe}-${isTimelineInView ? 'visible' : 'hidden'}`} className="relative group">
                      <EditableSection
                        sectionName={`${phase.title} Phase`}
                        onEdit={() => handleEditTimelinePhase(phase)}
                      >
                        <TimelinePhaseCard
                          phase={phase}
                          index={index}
                          onClick={() => handleViewPhase(phase)}
                          isLast={index === acceleratorData.timeline.length - 1}
                        />
                      </EditableSection>
                      
                      {/* Delete button for timeline phases */}
                      {isAdminMode && (
                        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Delete ${phase.title} phase?`)) {
                                handleDeleteTimelinePhase(phase);
                              }
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg"
                            title="Delete Phase"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 col-span-full">
                    <p className="text-vb-medium">Loading timeline...</p>
                  </div>
                )}
                
                {/* Add New Phase Button */}
                <EditableSection 
                  sectionName="Add New Timeline Phase"
                  onEdit={handleAddTimelinePhase}
                  className="bg-light/50 border-2 border-dashed border-vb-light p-6 rounded-xl flex items-center justify-center min-h-[200px]"
                >
                  <div className="text-center text-vb-medium">
                    <i className="fas fa-plus text-2xl mb-3"></i>
                    <p className="font-medium">Add New Phase</p>
                  </div>
                </EditableSection>
              </div>

              {/* Timeline Phase Management Help Text */}
              <div className="mt-6 text-center text-sm text-vb-medium">
                <p>Click on any phase to edit it, or use the + button to add a new phase</p>
              </div>
            </div>
          </div>

          {/* Image insertion after timeline */}
          {acceleratorData.images
            .filter((img: any) => img.position === 3)
            .map((img: any) => (
              <ImageInsert
                key={img.id}
                imageData={img}
                onSave={handleImageSave}
                onDelete={handleImageDelete}
                position={3}
                sectionName="Timeline Section Image"
              />
            ))}
          <ImageInsert
            onSave={handleImageSave}
            position={3}
            sectionName="Add Image After Timeline"
            isAddButton={true}
          />
          
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
              : editingType === 'timelineHeader'
                ? "Edit Timeline Header"
                : editingType === 'timelinePhase'
                  ? `Edit ${selectedPhase?.title || 'Timeline Phase'}`
                  : editingType === 'addTimelinePhase'
                    ? "Add New Timeline Phase"
                    : editingType === 'addSquare'
                      ? "Add New Square"
                      : editingType === 'editSquare'
                        ? "Edit Square"
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
      ) : editingType === 'timelineHeader' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Timeline Title</label>
            <input
              type="text"
              name="timelineTitle"
              defaultValue={acceleratorData.timelineTitle || 'Program Timeline'}
              className="admin-input w-full"
              placeholder="e.g., Program Timeline"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Timeline Description</label>
            <textarea
              name="timelineDescription"
              defaultValue={acceleratorData.timelineDescription || 'Click on each phase to learn more about the process'}
              className="admin-input w-full h-20 resize-none"
              placeholder="Describe the timeline section..."
            />
          </div>
        </div>
      ) : editingType === 'timelinePhase' || editingType === 'addTimelinePhase' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phase Timeframe</label>
            <input
              type="text"
              name="timeframe"
              defaultValue={selectedPhase?.timeframe || ''}
              className="admin-input w-full"
              placeholder="e.g., JAN-MAR"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phase Title</label>
            <input
              type="text"
              name="title"
              defaultValue={selectedPhase?.title || ''}
              className="admin-input w-full"
              placeholder="e.g., Application and Selection Process"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phase Icon</label>
            <select
              name="icon"
              defaultValue={selectedPhase?.icon || 'fas fa-calendar'}
              className="admin-input w-full"
            >
              {TIMELINE_ICONS.map((iconOption) => (
                <option key={iconOption.icon} value={iconOption.icon}>
                  {iconOption.label}
                </option>
              ))}
            </select>
            <div className="mt-2 text-sm text-gray-400">
              Preview: <i className={selectedPhase?.icon || 'fas fa-calendar'}></i>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phase Description</label>
            <textarea
              name="description"
              defaultValue={selectedPhase?.description || ''}
              className="admin-input w-full h-24 resize-none"
              placeholder="Describe this phase of the program..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phase Highlights (one per line)</label>
            <textarea
              name="highlights"
              defaultValue={selectedPhase?.highlights?.join('\n') || ''}
              className="admin-input w-full h-32 resize-none"
              placeholder="Enter highlights, one per line"
            />
          </div>
          {editingType === 'addTimelinePhase' && (
            <div>
              <label className="flex items-center text-sm text-gray-300">
                <input
                  type="checkbox"
                  name="isOngoing"
                  className="mr-2"
                />
                Mark as ongoing phase
              </label>
            </div>
          )}
        </div>
      ) : (editingType === 'addSquare' || editingType === 'editSquare') ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Square Label</label>
            <input
              type="text"
              name="label"
              defaultValue={editingProgram?.editingSquare?.label || ''}
              className="admin-input w-full"
              placeholder="e.g., Duration, Investment, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Square Value</label>
            <input
              type="text"
              name="value"
              defaultValue={editingProgram?.editingSquare?.value || ''}
              className="admin-input w-full"
              placeholder="e.g., 10 weeks, $100,000, etc."
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