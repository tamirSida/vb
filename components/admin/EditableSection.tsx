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
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  onClick?: () => void;
}

export default function EditableSection({ 
  children, 
  sectionName, 
  onEdit, 
  className = "",
  isAddButton = false,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
  onClick
}: EditableSectionProps) {
  const { isAdminMode } = useAdmin();
  const [isHovered, setIsHovered] = useState(false);

  // Don't show add buttons if not in admin mode
  if (!isAdminMode && isAddButton) {
    return null;
  }

  if (!isAdminMode) {
    return (
      <div 
        className={className} 
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-2 right-2 z-40 flex gap-1"
        >
          {/* Move Up Button */}
          {canMoveUp && onMoveUp && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              className="admin-btn bg-blue-500 text-white shadow-lg p-2"
              title="Move Up"
            >
              <i className="fas fa-chevron-up"></i>
            </button>
          )}
          
          {/* Move Down Button */}
          {canMoveDown && onMoveDown && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
              className="admin-btn bg-blue-500 text-white shadow-lg p-2"
              title="Move Down"
            >
              <i className="fas fa-chevron-down"></i>
            </button>
          )}
          
          {/* Edit Button */}
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="admin-btn bg-kizna-electric text-kizna-dark shadow-lg"
            >
              <i className="fas fa-edit mr-2"></i>Edit {sectionName}
            </button>
          )}
        </motion.div>
      )}
      
      {isAdminMode && (
        <div className="absolute inset-0 border-2 border-kizna-electric/30 rounded-lg pointer-events-none" />
      )}
    </div>
  );
}