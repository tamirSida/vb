'use client';

import React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { motion } from 'framer-motion';

export default function AdminToggle() {
  const { isAdmin, isAdminMode, toggleAdminMode } = useAdmin();

  if (!isAdmin) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-32 right-4 z-50"
    >
      <button
        onClick={toggleAdminMode}
        className={`admin-btn ${
          isAdminMode 
            ? 'bg-kizna-electric text-kizna-dark neon-glow' 
            : 'text-kizna-electric'
        }`}
      >
{isAdminMode ? <><i className="fas fa-lock mr-2"></i>Exit Admin</> : <><i className="fas fa-cog mr-2"></i>Admin Mode</>}
      </button>
    </motion.div>
  );
}