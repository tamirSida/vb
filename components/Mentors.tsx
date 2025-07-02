import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { siteData, Mentor } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import ImageInsert from './admin/ImageInsert';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

const Mentors: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<any>(null);
  const [editingType, setEditingType] = useState<'header' | 'mentor' | 'add'>('header');
  const [mentorsData, setMentorsData] = useState({
    title: 'Mentor Network',
    description: 'Industry experts and successful entrepreneurs providing guidance to our portfolio companies',
    mentors: siteData.mentors,
    images: [] as any[]
  });
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

  // Handle image operations
  const handleImageSave = async (imageData: any) => {
    try {
      const existingIndex = mentorsData.images.findIndex((img: any) => img.id === imageData.id);
      let updatedImages;
      
      if (existingIndex >= 0) {
        // Update existing image
        updatedImages = [...mentorsData.images];
        updatedImages[existingIndex] = imageData;
      } else {
        // Add new image
        updatedImages = [...mentorsData.images, imageData];
      }
      
      const updatedData = {
        ...mentorsData,
        images: updatedImages,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('mentors', updatedData);
      setMentorsData(updatedData);
      console.log('Image saved successfully');
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleImageDelete = async (imageId: string) => {
    try {
      const updatedImages = mentorsData.images.filter((img: any) => img.id !== imageId);
      const updatedData = {
        ...mentorsData,
        images: updatedImages,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('mentors', updatedData);
      setMentorsData(updatedData);
      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  
  // Animation refs
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-50px" });

  const handleEditHeader = () => {
    setEditingType('header');
    setIsEditModalOpen(true);
  };

  const handleEditMentor = (mentor: any) => {
    setEditingMentor(mentor);
    setEditingType('mentor');
    setIsEditModalOpen(true);
  };

  const handleAddMentor = () => {
    setEditingMentor(null);
    setEditingType('add');
    setIsEditModalOpen(true);
  };

  const handleDeleteMentor = async () => {
    try {
      const updatedMentors = mentorsData.mentors.filter(mentor => mentor.name !== editingMentor.name);
      const updatedData = {
        ...mentorsData,
        mentors: updatedMentors,
        images: mentorsData.images,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('mentors', updatedData);
      setMentorsData(updatedData);
      
      console.log('Mentor deleted successfully');
      setIsEditModalOpen(false);
      setEditingMentor(null);
    } catch (error) {
      console.error('Error deleting mentor:', error);
    }
  };

  const handleMoveUp = async (mentor: Mentor, index: number) => {
    if (index === 0) return;
    
    try {
      const updatedMentors = [...mentorsData.mentors];
      [updatedMentors[index - 1], updatedMentors[index]] = [updatedMentors[index], updatedMentors[index - 1]];
      
      const updatedData = {
        ...mentorsData,
        mentors: updatedMentors,
        images: mentorsData.images,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('mentors', updatedData);
      setMentorsData(updatedData);
      console.log('Mentor moved up successfully');
    } catch (error) {
      console.error('Error moving mentor up:', error);
    }
  };

  const handleMoveDown = async (mentor: Mentor, index: number) => {
    if (index === mentorsData.mentors.length - 1) return;
    
    try {
      const updatedMentors = [...mentorsData.mentors];
      [updatedMentors[index], updatedMentors[index + 1]] = [updatedMentors[index + 1], updatedMentors[index]];
      
      const updatedData = {
        ...mentorsData,
        mentors: updatedMentors,
        images: mentorsData.images,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('mentors', updatedData);
      setMentorsData(updatedData);
      console.log('Mentor moved down successfully');
    } catch (error) {
      console.error('Error moving mentor down:', error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingType === 'header') {
        const updatedData = {
          title: data.title,
          description: data.description,
          mentors: mentorsData.mentors,
          images: mentorsData.images,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('mentors', updatedData);
        setMentorsData(updatedData);
      } else if (editingType === 'add') {
        const newMentor = {
          name: data.name,
          company: data.company,
          image: data.image,
          linkedinUrl: data.linkedinUrl,
          flag: data.flag || ''
        };
        const updatedData = {
          ...mentorsData,
          mentors: [...mentorsData.mentors, newMentor],
          images: mentorsData.images,
          updatedAt: new Date().toISOString()
        };
        await updateDocument('mentors', updatedData);
        setMentorsData(updatedData);
      } else {
        // Update existing mentor
        const mentorIndex = mentorsData.mentors.findIndex(m => m.name === editingMentor.name);
        if (mentorIndex !== -1) {
          const updatedMentors = [...mentorsData.mentors];
          updatedMentors[mentorIndex] = {
            name: data.name,
            company: data.company,
            image: data.image,
            linkedinUrl: data.linkedinUrl,
            flag: data.flag || ''
          };
          const updatedData = {
            ...mentorsData,
            mentors: updatedMentors,
            images: mentorsData.images,
            updatedAt: new Date().toISOString()
          };
          await updateDocument('mentors', updatedData);
          setMentorsData(updatedData);
        }
      }
      console.log('Mentors data saved successfully');
      setIsEditModalOpen(false);
      setEditingMentor(null);
    } catch (error) {
      console.error('Error saving mentors data:', error);
    }
  };

  // Load data from Firestore on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getDocument('mentors');
        if (data) {
          // Merge Firestore data with static data to preserve flags
          const firestoreData = data as any;
          const mergedMentors = firestoreData.mentors?.map((firestoreMentor: any) => {
            const staticMentor = siteData.mentors.find(m => m.name === firestoreMentor.name);
            return {
              ...firestoreMentor,
              flag: firestoreMentor.flag || staticMentor?.flag || ''
            };
          }) || siteData.mentors;
          
          setMentorsData({
            ...firestoreData,
            mentors: mergedMentors,
            images: firestoreData.images || []
          });
        }
      } catch (error) {
        console.error('Error loading mentors data:', error);
      }
    };
    
    loadData();
  }, []);

  return (
    <>
      <section className="section-padding bg-secondary">
        
        <div className="container-max">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <EditableSection 
              sectionName="Mentors Header"
              onEdit={handleEditHeader}
            >
              <div className="text-center mb-12">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-vb-navy mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {mentorsData.title}
                </motion.h2>
                <motion.p 
                  className="text-xl text-vb-medium max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {mentorsData.description}
                </motion.p>
              </div>
            </EditableSection>
          </motion.div>

          {/* Image insertion after header */}
          {mentorsData.images
            .filter((img: any) => img.position === 1)
            .map((img: any) => (
              <ImageInsert
                key={img.id}
                imageData={img}
                onSave={handleImageSave}
                onDelete={handleImageDelete}
                position={1}
                sectionName="Mentors Header Image"
              />
            ))}
          <ImageInsert
            onSave={handleImageSave}
            position={1}
            sectionName="Add Image After Header"
            isAddButton={true}
          />

        <motion.div 
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {mentorsData.mentors.map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isGridInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4 + (index * 0.1),
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <EditableSection
                sectionName={`${mentor.name}`}
                onMoveUp={() => handleMoveUp(mentor, index)}
                onMoveDown={() => handleMoveDown(mentor, index)}
                canMoveUp={index > 0}
                canMoveDown={index < mentorsData.mentors.length - 1}
                onEdit={() => handleEditMentor(mentor)}
                className="text-center p-3 bg-light rounded-lg hover:shadow-xl transition-all duration-300 border border-secondary hover:border-vb-gold h-full relative overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-vb-gold/5 to-vb-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    className="mb-2"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image 
                      src={mentor.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMzYiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMzYiIGN5PSIyNyIgcj0iMTEiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE4IDU4QzE4IDQ5IDI2IDQ1IDM2IDQ1UzU0IDQ5IDU0IDU4IiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo='} 
                      alt={mentor.name}
                      width={72}
                      height={72}
                      className="w-18 h-18 rounded-full object-cover mx-auto border-2 border-vb-blue transition-colors duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMzYiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMzYiIGN5PSIyNyIgcj0iMTEiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE4IDU4QzE4IDQ5IDI2IDQ1IDM2IDQ1UzU0IDQ5IDU0IDU4IiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                      }}
                    />
                  </motion.div>
                  <motion.h3 
                    className="font-bold text-vb-navy text-base mb-1 flex items-center justify-center gap-2 hover:text-vb-blue transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {mentor.name}
                    {mentor.flag && (
                      <span className="text-sm">
                        {mentor.flag}
                      </span>
                    )}
                  </motion.h3>
                  {mentor.company && (
                    <motion.p 
                      className="text-vb-medium text-xs mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + (index * 0.1) + 0.2 }}
                    >
                      {mentor.company}
                    </motion.p>
                  )}
                  {mentor.linkedinUrl && (
                    <motion.div 
                      className="pt-2 border-t border-secondary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (index * 0.1) + 0.3 }}
                    >
                      <motion.a 
                        href={mentor.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors inline-block"
                        whileHover={{ scale: 1.3, rotate: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <i className="fab fa-linkedin text-lg"></i>
                      </motion.a>
                    </motion.div>
                  )}
                </div>
              </EditableSection>
            </motion.div>
          ))}
          
          {/* Add Mentor Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.4 + (mentorsData.mentors.length * 0.1) }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <EditableSection 
              sectionName="Add New Mentor"
              onEdit={handleAddMentor}
              className="text-center p-6 bg-light/50 border-2 border-dashed border-vb-light rounded-lg flex items-center justify-center min-h-[200px] hover:border-vb-blue transition-colors"
              isAddButton={true}
            >
              <div className="text-vb-light hover:text-vb-blue transition-colors">
                <motion.i 
                  className="fas fa-plus text-2xl mb-2"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                />
                <p className="font-medium">Add New Mentor</p>
              </div>
            </EditableSection>
          </motion.div>
        </motion.div>

        {/* Image insertion after mentors grid */}
        {mentorsData.images
          .filter((img: any) => img.position === 2)
          .map((img: any) => (
            <ImageInsert
              key={img.id}
              imageData={img}
              onSave={handleImageSave}
              onDelete={handleImageDelete}
              position={2}
              sectionName="Mentors Grid Image"
            />
          ))}
        <ImageInsert
          onSave={handleImageSave}
          position={2}
          sectionName="Add Image After Mentors"
          isAddButton={true}
        />
      </div>
    </section>

    {/* Edit Modal */}
    <EditModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      onSave={handleSave}
      title={
        editingType === 'header' 
          ? "Edit Mentors Section" 
          : editingType === 'add'
            ? "Add New Mentor"
            : `Edit ${editingMentor?.name || 'Mentor'}`
      }
    >
      {editingType === 'header' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Title</label>
            <input
              type="text"
              name="title"
              defaultValue={mentorsData.title}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Section Description</label>
            <textarea
              name="description"
              defaultValue={mentorsData.description}
              className="admin-input w-full h-20 resize-none"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Mentor Name</label>
            <input
              type="text"
              name="name"
              defaultValue={editingMentor?.name || ''}
              className="admin-input w-full"
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Company/Role</label>
            <input
              type="text"
              name="company"
              defaultValue={editingMentor?.company || ''}
              className="admin-input w-full"
              placeholder="e.g., Co-Founder - TechCorp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              defaultValue={editingMentor?.image || ''}
              className="admin-input w-full"
              placeholder="/images/mentors/mentor-name.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn URL</label>
            <input
              type="url"
              name="linkedinUrl"
              defaultValue={editingMentor?.linkedinUrl || ''}
              className="admin-input w-full"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Flag (optional)</label>
            <select
              name="flag"
              defaultValue={editingMentor?.flag || ''}
              className="admin-input w-full"
            >
              <option value="">No flag</option>
              <option value="🇺🇸">🇺🇸 United States</option>
              <option value="🇮🇱">🇮🇱 Israel</option>
            </select>
          </div>
          {editingType === 'mentor' && (
            <div className="pt-4 border-t border-gray-600">
              <button 
                onClick={handleDeleteMentor}
                className="admin-btn bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white w-full"
              >
<i className="fas fa-trash mr-2"></i>Delete Mentor
              </button>
            </div>
          )}
        </div>
      )}
    </EditModal>
  </>
  );
};

export default Mentors;