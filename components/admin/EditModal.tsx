'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  title: string;
  children: React.ReactNode;
}

export default function EditModal({ 
  isOpen, 
  onClose, 
  onSave, 
  title, 
  children 
}: EditModalProps) {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = () => {
    const form = document.getElementById('edit-form') as HTMLFormElement;
    if (form) {
      const data = new FormData(form);
      const formObject: any = {};
      
      // Process form data with proper type handling
      for (const [key, value] of Array.from(data.entries())) {
        const input = form.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        
        if (input) {
          if (input.type === 'number') {
            // Handle number inputs - convert to number or null if empty
            const stringValue = value.toString().trim();
            if (stringValue === '') {
              formObject[key] = null;
            } else {
              const numValue = parseFloat(stringValue);
              formObject[key] = isNaN(numValue) ? null : numValue;
            }
          } else if (input.tagName === 'SELECT' && key === 'testimonialId') {
            // Handle testimonialId select - convert to number or null
            const stringValue = value.toString().trim();
            if (stringValue === '' || stringValue === 'null') {
              formObject[key] = null;
            } else {
              const numValue = parseInt(stringValue, 10);
              formObject[key] = isNaN(numValue) ? null : numValue;
            }
          } else {
            // Handle text inputs, textareas, and other selects
            formObject[key] = value.toString().trim();
          }
        } else {
          // Fallback for inputs not found
          formObject[key] = value.toString().trim();
        }
      }
      
      onSave(formObject);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-kizna-navy/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.9 }}
        className="glass-effect bg-kizna-dark/90 p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gradient">{title}</h2>
          <button
            onClick={onClose}
            className="admin-btn text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <form id="edit-form" className="mb-6">
          {children}
        </form>
        
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onClose}
            className="admin-btn text-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="admin-btn bg-kizna-electric text-kizna-dark"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}