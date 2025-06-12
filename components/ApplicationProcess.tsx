import React, { useState, useEffect } from 'react';
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
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <EditableSection 
            sectionName="Application Process Header"
            onEdit={handleEditHeader}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-vb-navy mb-4">
                {applicationData.title}
              </h2>
              <p className="text-xl text-vb-medium max-w-3xl mx-auto">
                {applicationData.timeline} — transparent, veteran-to-veteran evaluation
              </p>
            </div>
          </EditableSection>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h3 className="text-2xl font-bold text-vb-navy mb-6">Application Timeline</h3>
            <div className="space-y-6">
              {applicationData.steps.map((step, index) => (
                <EditableSection
                  key={index}
                  sectionName={`${step.week}`}
                  onEdit={() => handleEditStep(index)}
                  className="flex items-start"
                >
                  <div className="bg-vb-navy text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-vb-navy text-lg">{step.week}</h4>
                    <p className="text-vb-medium">{step.activity}</p>
                    {step.details && (
                      <p className="text-sm text-vb-light mt-1">{step.details}</p>
                    )}
                  </div>
                </EditableSection>
              ))}
              
              {/* Add Step Button */}
              <EditableSection 
                sectionName="Add New Step"
                onEdit={handleAddStep}
                className="flex items-center justify-center p-4 border-2 border-dashed border-vb-light rounded-lg"
                isAddButton={true}
              >
                <div className="text-center text-vb-light hover:text-vb-blue transition-colors">
                  <i className="fas fa-plus text-xl mb-1"></i>
                  <p className="text-sm font-medium">Add New Step</p>
                </div>
              </EditableSection>
            </div>
          </div>

          {/* Commitments */}
          <div>
            <h3 className="text-2xl font-bold text-vb-navy mb-6">Our Commitments to You</h3>
            <EditableSection
              sectionName="Commitments List"
              onEdit={handleEditCommitments}
              className="bg-light rounded-lg p-6 shadow-md border border-secondary"
            >
              <ul className="space-y-4">
                {applicationData.commitments.map((commitment, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-vb-navy text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                      ✓
                    </div>
                    <span className="text-vb-navy">{commitment}</span>
                  </li>
                ))}
              </ul>
            </EditableSection>

            <EditableSection
              sectionName="Application CTA"
              onEdit={() => setIsEditModalOpen(true)}
              className="mt-8"
            >
              <button className="bg-vb-navy hover:bg-vb-blue text-white w-full text-lg py-4 rounded-lg font-semibold transition-colors">
                Start Your Application
              </button>
            </EditableSection>
          </div>
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