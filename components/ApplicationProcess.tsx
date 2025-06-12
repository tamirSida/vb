import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteData } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

const ApplicationProcess: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<'header' | 'step' | 'commitments' | 'add-step' | 'add-commitment'>('header');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [applicationData, setApplicationData] = useState(siteData.applicationProcess);
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');
  
  // Animation refs
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const commitmentsRef = useRef<HTMLDivElement>(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-50px" });
  const isCommitmentsInView = useInView(commitmentsRef, { once: true, margin: "-50px" });

  const handleEditHeader = () => {
    setEditingType('header');
    setIsEditModalOpen(true);
  };

  const handleEditStep = (index: number) => {
    setEditingIndex(index);
    setEditingType('step');
    setIsEditModalOpen(true);
  };

  const handleEditCommitments = () => {
    setEditingType('commitments');
    setIsEditModalOpen(true);
  };

  const handleAddStep = () => {
    setEditingType('add-step');
    setIsEditModalOpen(true);
  };

  const handleAddCommitment = () => {
    setEditingType('add-commitment');
    setIsEditModalOpen(true);
  };

  const handleDeleteStep = async () => {
    try {
      const updatedSteps = applicationData.steps.filter((_, index) => index !== editingIndex);
      const updatedData = {
        ...applicationData,
        steps: updatedSteps,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('applicationProcess', updatedData);
      setApplicationData(updatedData);
      
      console.log('Application step deleted successfully');
      setIsEditModalOpen(false);
      setEditingIndex(-1);
    } catch (error) {
      console.error('Error deleting application step:', error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingType === 'header') {
        const updatedData = {
          ...applicationData,
          title: data.title,
          timeline: data.timeline,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('applicationProcess', updatedData);
        setApplicationData(updatedData);
      } else if (editingType === 'commitments') {
        const updatedData = {
          ...applicationData,
          commitments: data.commitments.split('\n').filter((c: string) => c.trim()),
          updatedAt: new Date().toISOString()
        };
        await updateDocument('applicationProcess', updatedData);
        setApplicationData(updatedData);
      }
      console.log('Application process data saved successfully');
      setIsEditModalOpen(false);
      setEditingIndex(null);
    } catch (error) {
      console.error('Error saving application process data:', error);
    }
  };

  // Load data from Firestore on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getDocument('applicationProcess');
        if (data) {
          setApplicationData(data as any);
        }
      } catch (error) {
        console.error('Error loading application process data:', error);
      }
    };
    
    loadData();
  }, []);
  
  return (
    <>
      <section id="applicationProcess" className="section-padding bg-secondary">
        
        <div className="container-max">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <EditableSection 
              sectionName="Application Process Header"
              onEdit={handleEditHeader}
            >
              <div className="text-center mb-12">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-vb-navy mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {applicationData.title}
                </motion.h2>
                <motion.p 
                  className="text-xl text-vb-medium max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {applicationData.timeline} — transparent, veteran-to-veteran evaluation
                </motion.p>
              </div>
            </EditableSection>
          </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <motion.div
            ref={timelineRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isTimelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-vb-navy mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Application Timeline
            </motion.h3>
            <div className="space-y-6">
              {applicationData.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isTimelineInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + (index * 0.1),
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <EditableSection
                    sectionName={`${step.week}`}
                    onEdit={() => handleEditStep(index)}
                    className="flex items-start group"
                  >
                    <motion.div 
                      className="bg-vb-navy text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 font-semibold group-hover:bg-vb-blue transition-colors"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {index + 1}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-vb-navy text-lg group-hover:text-vb-blue transition-colors">{step.week}</h4>
                      <p className="text-vb-medium">{step.activity}</p>
                      {step.details && (
                        <p className="text-sm text-vb-light mt-1">{step.details}</p>
                      )}
                    </div>
                  </EditableSection>
                </motion.div>
              ))}
              
              {/* Add Step Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 + (applicationData.steps.length * 0.1) }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <EditableSection 
                  sectionName="Add New Step"
                  onEdit={handleAddStep}
                  className="flex items-center justify-center p-4 border-2 border-dashed border-vb-light rounded-lg hover:border-vb-blue transition-colors"
                  isAddButton={true}
                >
                  <div className="text-center text-vb-light hover:text-vb-blue transition-colors">
                    <motion.i 
                      className="fas fa-plus text-xl mb-1"
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    />
                    <p className="text-sm font-medium">Add New Step</p>
                  </div>
                </EditableSection>
              </motion.div>
            </div>
          </motion.div>

          {/* Commitments */}
          <motion.div
            ref={commitmentsRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isCommitmentsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-vb-navy mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isCommitmentsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our Commitments to You
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isCommitmentsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <EditableSection
                sectionName="Commitments List"
                onEdit={handleEditCommitments}
                className="bg-light rounded-lg p-6 shadow-md border border-secondary hover:shadow-lg transition-shadow"
              >
                <ul className="space-y-4">
                  {applicationData.commitments.map((commitment, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isCommitmentsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.8 + (index * 0.1),
                        ease: "easeOut"
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="bg-vb-navy text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isCommitmentsInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.8 + (index * 0.1) + 0.2,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.2,
                          backgroundColor: "#2563eb",
                          transition: { duration: 0.2 }
                        }}
                      >
                        ✓
                      </motion.div>
                      <span className="text-vb-navy">{commitment}</span>
                    </motion.li>
                  ))}
                </ul>
              </EditableSection>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isCommitmentsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1.0 + (applicationData.commitments.length * 0.1) }}
              className="mt-8"
            >
              <EditableSection
                sectionName="Application CTA"
                onEdit={() => setIsEditModalOpen(true)}
              >
                <motion.button 
                  className="bg-vb-navy hover:bg-vb-blue text-white w-full text-lg py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCommitmentsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 1.2 + (applicationData.commitments.length * 0.1) }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isCommitmentsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 1.4 + (applicationData.commitments.length * 0.1) }}
                  >
                    Start Your Application
                  </motion.span>
                </motion.button>
              </EditableSection>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Edit Modal */}
    <EditModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      onSave={handleSave}
      title={
        editingType === 'header' ? "Edit Application Process Header" :
        editingType === 'step' ? `Edit ${applicationData.steps[editingIndex || 0]?.week || 'Step'}` :
        editingType === 'add-step' ? "Add New Application Step" :
        editingType === 'commitments' ? "Edit Commitments" :
        "Edit Application CTA"
      }
    >
      {editingType === 'header' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Title</label>
            <input
              type="text"
              name="title"
              defaultValue={applicationData.title}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Timeline Description</label>
            <input
              type="text"
              name="timeline"
              defaultValue={applicationData.timeline}
              className="admin-input w-full"
            />
          </div>
        </div>
      ) : editingType === 'step' || editingType === 'add-step' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Week/Phase</label>
            <input
              type="text"
              name="week"
              defaultValue={editingIndex !== null ? applicationData.steps[editingIndex]?.week : ''}
              className="admin-input w-full"
              placeholder="e.g., Week 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Activity</label>
            <input
              type="text"
              name="activity"
              defaultValue={editingIndex !== null ? applicationData.steps[editingIndex]?.activity : ''}
              className="admin-input w-full"
              placeholder="e.g., 1–3 Intro Meetings"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Details (optional)</label>
            <textarea
              name="details"
              defaultValue={editingIndex !== null ? applicationData.steps[editingIndex]?.details : ''}
              className="admin-input w-full h-20 resize-none"
              placeholder="Additional details about this step"
            />
          </div>
          {editingType === 'step' && (
            <div className="pt-4 border-t border-gray-600">
              <button 
                onClick={handleDeleteStep}
                className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
              >
<i className="fas fa-trash mr-2"></i>Delete Step
              </button>
            </div>
          )}
        </div>
      ) : editingType === 'commitments' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Commitments (one per line)</label>
            <textarea
              name="commitments"
              defaultValue={applicationData.commitments.join('\n')}
              className="admin-input w-full h-32 resize-none"
              placeholder="Weekly progress updates throughout process&#10;Maximum 3-week timeline&#10;Transparent feedback at every stage"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Button Text</label>
            <input
              type="text"
              defaultValue="Start Your Application"
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Button Link</label>
            <input
              type="text"
              defaultValue="#"
              className="admin-input w-full"
              placeholder="https://apply.versionbravoventures.com"
            />
          </div>
        </div>
      )}
    </EditModal>
  </>
  );
};

export default ApplicationProcess;