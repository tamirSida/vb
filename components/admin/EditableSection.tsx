'use client';

import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { motion } from 'framer-motion';

interface EditableSectionProps {
  children: React.ReactNode;
  sectionName: string;
  onEdit?: () => void;
  className?: string;
  isAddButton?: boolean;
}

export default function EditableSection({ 
  children, 
  sectionName, 
  onEdit, 
  className = "",
  isAddButton = false
}: EditableSectionProps) {
  const { isAdminMode } = useAdmin();
  const [isHovered, setIsHovered] = useState(false);

  // Don't show add buttons if not in admin mode
  if (!isAdminMode && isAddButton) {
    return null;
  }

  if (!isAdminMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-2 right-2 z-40"
        >
          <button
            onClick={onEdit}
            className="admin-btn bg-kizna-electric text-kizna-dark shadow-lg"
          >
            ✏️ Edit {sectionName}
          </button>
        </motion.div>
      )}
      
      {isAdminMode && (
        <div className="absolute inset-0 border-2 border-kizna-electric/30 rounded-lg pointer-events-none" />
      )}
    </div>
  );
}