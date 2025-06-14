import React, { useState, useEffect } from 'react';
import { siteData } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

const Programs: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [editingType, setEditingType] = useState<'header' | 'program' | 'add'>('header');
  const [programsData, setProgramsData] = useState({
    title: 'Our Programs',
    description: 'Two pathways for veteran entrepreneurs to access our network, expertise, and capital',
    programs: siteData.programs
  });
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

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

  const handleDeleteProgram = async () => {
    try {
      const updatedPrograms = programsData.programs.filter(program => program.name !== editingProgram.name);
      const updatedData = {
        ...programsData,
        programs: updatedPrograms,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('programs', updatedData);
      setProgramsData(updatedData);
      
      console.log('Program deleted successfully');
      setIsEditModalOpen(false);
      setEditingProgram(null);
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingType === 'header') {
        // Update section header
        const updatedData = {
          title: data.title,
          description: data.description,
          programs: programsData.programs,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('programs', updatedData);
        setProgramsData(updatedData);
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
          ...programsData,
          programs: [...programsData.programs, newProgram],
          updatedAt: new Date().toISOString()
        };
        await updateDocument('programs', updatedData);
        setProgramsData(updatedData);
      } else {
        // Update existing program
        const programIndex = programsData.programs.findIndex(p => p.name === editingProgram.name);
        if (programIndex !== -1) {
          const updatedPrograms = [...programsData.programs];
          updatedPrograms[programIndex] = {
            name: data.name,
            description: data.description,
            duration: data.duration,
            investment: data.investment,
            equity: data.equity,
            highlights: data.highlights.split('\n').filter((h: string) => h.trim())
          };
          const updatedData = {
            ...programsData,
            programs: updatedPrograms,
            updatedAt: new Date().toISOString()
          };
          await updateDocument('programs', updatedData);
          setProgramsData(updatedData);
        }
      }
      console.log('Programs data saved successfully');
      setIsEditModalOpen(false);
      setEditingProgram(null);
    } catch (error) {
      console.error('Error saving programs data:', error);
    }
  };

  // Load Programs data from Firestore on component mount
  useEffect(() => {
    const loadProgramsData = async () => {
      try {
        const data = await getDocument('programs');
        if (data) {
          setProgramsData(data as any);
        }
      } catch (error) {
        console.error('Error loading programs data:', error);
      }
    };
    
    loadProgramsData();
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
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {programsData.title}
              </h2>
              <p className="text-xl text-medium max-w-3xl mx-auto">
                {programsData.description}
              </p>
            </div>
          </EditableSection>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {programsData.programs.map((program, index) => (
            <EditableSection
              key={index}
              sectionName={`${program.name} Program`}
              onEdit={() => handleEditProgram(program)}
              className="bg-light text-dark p-8 rounded-xl shadow-lg border border-secondary hover:shadow-xl transition-shadow"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-700">{program.name}</h3>
                <p className="text-medium mb-4">{program.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-gray-700 font-semibold">Duration:</span>
                    <p className="text-dark">{program.duration}</p>
                  </div>
                  <div>
                    <span className="text-gray-700 font-semibold">Investment:</span>
                    <p className="text-dark">{program.investment}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-gray-700 font-semibold mb-3">Program Highlights:</h4>
                <ul className="space-y-2">
                  {program.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gray-700 mr-2">•</span>
                      <span className="text-medium">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </EditableSection>
          ))}
          
          {/* Add Program Button */}
          <EditableSection 
            sectionName="Add New Program"
            onEdit={handleAddProgram}
            className="bg-light/50 border-2 border-dashed border-gray-300 p-8 rounded-xl flex items-center justify-center min-h-[300px]"
            isAddButton={true}
          >
            <div className="text-center text-gray-500 hover:text-gray-700 transition-colors">
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
              defaultValue={programsData.title}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Description</label>
            <textarea
              name="description"
              defaultValue={programsData.description}
              className="admin-input w-full h-20 resize-none"
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
            <label className="block text-sm font-medium text-gray-300 mb-1">Equity</label>
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
  </>
  );
};

export default Programs;