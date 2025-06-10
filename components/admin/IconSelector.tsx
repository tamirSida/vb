'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface IconSelectorProps {
  selectedIcon: string;
  onIconSelect: (icon: string) => void;
  className?: string;
}

const POPULAR_ICONS = [
  { class: 'fas fa-users', name: 'Users/Team' },
  { class: 'fas fa-network-wired', name: 'Network' },
  { class: 'fas fa-handshake', name: 'Partnership' },
  { class: 'fas fa-graduation-cap', name: 'Education' },
  { class: 'fas fa-star', name: 'Quality/Premium' },
  { class: 'fas fa-rocket', name: 'Growth/Launch' },
  { class: 'fas fa-shield-alt', name: 'Security/Protection' },
  { class: 'fas fa-lightbulb', name: 'Innovation/Ideas' },
  { class: 'fas fa-chart-line', name: 'Growth/Analytics' },
  { class: 'fas fa-target', name: 'Goals/Targeting' },
  { class: 'fas fa-cog', name: 'Settings/Process' },
  { class: 'fas fa-heart', name: 'Care/Passion' },
  { class: 'fas fa-trophy', name: 'Achievement/Award' },
  { class: 'fas fa-medal', name: 'Recognition/Honor' },
  { class: 'fas fa-fire', name: 'Hot/Trending' },
  { class: 'fas fa-bolt', name: 'Speed/Energy' },
  { class: 'fas fa-gem', name: 'Value/Premium' },
  { class: 'fas fa-crown', name: 'Leadership/Premium' },
  { class: 'fas fa-globe', name: 'Global/World' },
  { class: 'fas fa-money-bill-wave', name: 'Finance/Money' },
  { class: 'fas fa-briefcase', name: 'Business/Work' },
  { class: 'fas fa-building', name: 'Company/Corporate' },
  { class: 'fas fa-laptop-code', name: 'Technology/Development' },
  { class: 'fas fa-mobile-alt', name: 'Mobile/Apps' }
];

export default function IconSelector({ selectedIcon, onIconSelect, className = "" }: IconSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customIcon, setCustomIcon] = useState('');

  const handleIconSelect = (iconClass: string) => {
    onIconSelect(iconClass);
    setIsOpen(false);
  };

  const handleCustomIconSubmit = () => {
    if (customIcon.trim()) {
      onIconSelect(customIcon.trim());
      setCustomIcon('');
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-300 mb-1">Icon</label>
      
      {/* Selected Icon Display */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="admin-input w-full flex items-center justify-between cursor-pointer hover:border-kizna-electric transition-colors"
      >
        <div className="flex items-center space-x-3">
          <i className={`${selectedIcon} text-kizna-electric`}></i>
          <span className="text-gray-300">{selectedIcon}</span>
        </div>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-gray-400`}></i>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 mt-1 w-full bg-kizna-dark border border-kizna-blue/30 rounded-md shadow-lg max-h-64 overflow-y-auto"
        >
          {/* Custom Icon Input */}
          <div className="p-3 border-b border-kizna-blue/20">
            <div className="flex space-x-2">
              <input
                type="text"
                value={customIcon}
                onChange={(e) => setCustomIcon(e.target.value)}
                placeholder="e.g., fas fa-star"
                className="admin-input flex-1 text-sm"
              />
              <button
                onClick={handleCustomIconSubmit}
                className="admin-btn text-xs px-2 py-1 bg-kizna-teal text-white"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Enter any FontAwesome class</p>
          </div>

          {/* Popular Icons Grid */}
          <div className="p-2">
            <p className="text-xs text-gray-400 mb-2 px-1">Popular Icons:</p>
            <div className="grid grid-cols-4 gap-1">
              {POPULAR_ICONS.map((icon) => (
                <button
                  key={icon.class}
                  onClick={() => handleIconSelect(icon.class)}
                  className={`p-2 rounded hover:bg-kizna-blue/20 transition-colors group relative ${
                    selectedIcon === icon.class ? 'bg-kizna-electric/20 text-kizna-electric' : 'text-gray-300'
                  }`}
                  title={icon.name}
                >
                  <i className={`${icon.class} text-lg`}></i>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {icon.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}