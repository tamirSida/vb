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
        
        <div className="mb-6">
          {children}
        </div>
        
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onClose}
            className="admin-btn text-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({})}
            className="admin-btn bg-kizna-electric text-kizna-dark"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}