'use client';

import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { motion } from 'framer-motion';
import EditModal from './EditModal';

interface SectionManagerProps {
  onAddSection: (sectionType: string, position: number) => void;
  position: number;
}

const SECTION_TYPES = [
  { type: 'hero', name: 'Hero Section', icon: 'fas fa-star', description: 'Large banner with title and CTA buttons' },
  { type: 'text', name: 'Text Block', icon: 'fas fa-align-left', description: 'Rich text content section' },
  { type: 'image-text', name: 'Image + Text', icon: 'fas fa-image', description: 'Side-by-side image and text' },
  { type: 'features', name: 'Features Grid', icon: 'fas fa-th', description: 'Grid of features with icons' },
  { type: 'team', name: 'Team Section', icon: 'fas fa-users', description: 'Team member profiles' },
  { type: 'testimonials', name: 'Testimonials', icon: 'fas fa-quote-left', description: 'Customer testimonials' },
  { type: 'cta', name: 'Call to Action', icon: 'fas fa-bullhorn', description: 'Action-focused section' },
  { type: 'gallery', name: 'Image Gallery', icon: 'fas fa-images', description: 'Photo or logo gallery' },
  { type: 'stats', name: 'Statistics', icon: 'fas fa-chart-bar', description: 'Number highlights' },
  { type: 'faq', name: 'FAQ Section', icon: 'fas fa-question-circle', description: 'Frequently asked questions' }
];

export default function SectionManager({ onAddSection, position }: SectionManagerProps) {
  const { isAdminMode } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');

  if (!isAdminMode) return null;

  const handleSectionSelect = (sectionType: string) => {
    setSelectedType(sectionType);
    setIsModalOpen(true);
  };

  const handleConfirmAdd = () => {
    if (selectedType) {
      onAddSection(selectedType, position);
      setIsModalOpen(false);
      setSelectedType('');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative my-8"
      >
        <div className="flex items-center justify-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-kizna-electric/30 to-transparent"></div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mx-4 glass-effect bg-kizna-dark/80 hover:bg-kizna-electric hover:text-kizna-dark text-kizna-electric border border-kizna-electric/30 px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 font-medium"
          >
            <i className="fas fa-plus"></i>
            <span>Add New Section</span>
          </button>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-kizna-electric/30 to-transparent"></div>
        </div>
      </motion.div>

      {/* Section Selection Modal */}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedType('');
        }}
        onSave={handleConfirmAdd}
        title="Add New Section"
      >
        <div className="space-y-6">
          <p className="text-gray-300 text-center">
            Choose a section type to add to your website:
          </p>
          
          <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {SECTION_TYPES.map((section) => (
              <button
                key={section.type}
                onClick={() => setSelectedType(section.type)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedType === section.type
                    ? 'border-kizna-electric bg-kizna-electric/10 text-kizna-electric'
                    : 'border-gray-600 bg-kizna-dark/50 text-gray-300 hover:border-kizna-blue hover:bg-kizna-blue/10'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <i className={`${section.icon} text-lg mt-1 flex-shrink-0`}></i>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm mb-1">{section.name}</h3>
                    <p className="text-xs opacity-75 leading-tight">{section.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedType && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-kizna-electric/10 border border-kizna-electric/30 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3 mb-2">
                <i className={`${SECTION_TYPES.find(s => s.type === selectedType)?.icon} text-kizna-electric`}></i>
                <h4 className="font-medium text-kizna-electric">
                  {SECTION_TYPES.find(s => s.type === selectedType)?.name}
                </h4>
              </div>
              <p className="text-gray-300 text-sm">
                {SECTION_TYPES.find(s => s.type === selectedType)?.description}
              </p>
            </motion.div>
          )}

          <div className="pt-4 border-t border-gray-600">
            <p className="text-xs text-gray-400 text-center">
              The new section will be added at position {position + 1} on the page
            </p>
          </div>
        </div>
      </EditModal>
    </>
  );
}