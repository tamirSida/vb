import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';

interface HeaderProps {
  showNavigation?: boolean;
  isAcceleratorPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNavigation = true, isAcceleratorPage = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [navigationData, setNavigationData] = useState({
    applicationUrl: '#',
    contactEmail: 'adam@versionbravo.com',
    applyNowUrl: '#'
  });
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

  // Load navigation data from Firestore
  useEffect(() => {
    if (isAcceleratorPage) {
      const loadData = async () => {
        try {
          const data = await getDocument('navigation');
          if (data) {
            setNavigationData(data as any);
          }
        } catch (error) {
          console.error('Error loading navigation data:', error);
        }
      };
      loadData();
    }
  }, [isAcceleratorPage]);

  const handleEditNavigation = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveNavigation = async (data: any) => {
    try {
      const updatedData = {
        applicationUrl: data.applicationUrl,
        contactEmail: data.contactEmail,
        applyNowUrl: data.applyNowUrl,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('navigation', updatedData);
      setNavigationData(updatedData);
      setIsEditModalOpen(false);
      console.log('Navigation data saved successfully');
    } catch (error) {
      console.error('Error saving navigation data:', error);
    }
  };

  return (
    <header className="bg-light shadow-sm border-b border-secondary sticky top-0 z-30">
      <div className="container-max px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <Image 
                src="/images/brand/vb-logo.png" 
                alt="Version Bravo"
                width={160}
                height={80}
                className="h-12 cursor-pointer"
                style={{ width: 'auto' }}
              />
            </Link>
          </div>
          
          {/* Center section - different for accelerator page */}
          {isAcceleratorPage ? (
            <div className="hidden md:flex items-center justify-center flex-1">
              <nav className="flex items-center space-x-8">
                <Link href="http://localhost:3000/accelerator/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Why VB
                </Link>
                <Link href="/accelerator/team" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Team
                </Link>
                <Link href="/accelerator/program" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Accelerator
                </Link>
                <Link href="/accelerator/application" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Application
                </Link>
                <Link href="/accelerator/portfolio" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Portfolio
                </Link>
                <Link href="/accelerator/mentors" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Mentors
                </Link>
              </nav>
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                <span className="text-gray-700 font-black-ops font-semibold text-xs uppercase tracking-wider">
                  Combat Veterans • Proven Operators
                </span>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            {/* Hidden Admin Access - Multiple Options */}
            
            {/* Option 1: Tiny dot in corner */}
            <Link href="/admin">
              <div className="hidden md:block w-2 h-2 bg-gray-400 hover:bg-kizna-electric rounded-full opacity-30 hover:opacity-100 transition-all duration-300 cursor-pointer"></div>
            </Link>
            
            {/* Option 2: Copyright symbol - uncomment to use instead */}
            {/* <Link href="/admin">
              <span className="hidden md:block text-xs text-gray-400 hover:text-kizna-electric transition-colors cursor-pointer select-none">©</span>
            </Link> */}
            
            {/* Option 3: Invisible area - uncomment to use instead */}
            {/* <Link href="/admin">
              <div className="hidden md:block w-8 h-8 cursor-pointer"></div>
            </Link> */}
            
            {showNavigation && !isAcceleratorPage && (
              <button className="hidden md:block bg-gray-700 hover:bg-gray-600 text-white font-black-ops px-4 py-2 rounded-lg font-medium transition-colors">
                Apply Now
              </button>
            )}
            
            {isAcceleratorPage && (
              <div className="hidden md:flex items-center space-x-3">
                <EditableSection
                  sectionName="Apply Now Button"
                  onEdit={handleEditNavigation}
                  className="inline-block"
                >
                  <a href={navigationData.applyNowUrl} className="bg-transparent border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors no-underline">
                    Apply Now
                  </a>
                </EditableSection>
                <EditableSection
                  sectionName="Contact Email"
                  onEdit={handleEditNavigation}
                  className="inline-block"
                >
                  <a href={`mailto:${navigationData.contactEmail}`} className="bg-transparent border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors no-underline">
                    Get in Touch
                  </a>
                </EditableSection>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            {(showNavigation || isAcceleratorPage) && (
              <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <span className={`bg-gray-700 h-0.5 w-6 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`bg-gray-700 h-0.5 w-6 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`bg-gray-700 h-0.5 w-6 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {(showNavigation || isAcceleratorPage) && isMenuOpen && (
          <div className="md:hidden bg-light border-t border-secondary">
            <nav className="px-4 py-4 space-y-3">
              {isAcceleratorPage ? (
                <>
                  <Link 
                    href="http://localhost:3000/accelerator/"
                    className="block text-dark hover:text-gray-700 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Why VB
                  </Link>
                  <Link 
                    href="/accelerator/team" 
                    className="block text-dark hover:text-gray-700 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Team
                  </Link>
                  <Link 
                    href="/accelerator/program" 
                    className="block text-dark hover:text-gray-700 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Accelerator
                  </Link>
                  <Link 
                    href="/accelerator/application"
                    className="block text-dark hover:text-gray-700 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Application
                  </Link>
                  <Link 
                    href="/accelerator/portfolio" 
                    className="block text-dark hover:text-gray-700 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Portfolio
                  </Link>
                  <Link 
                    href="/accelerator/mentors" 
                    className="block text-dark hover:text-gray-700 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mentors
                  </Link>
                </>
              ) : (
                <>
                  <a 
                    href="#team" 
                    className="block text-dark hover:text-gray-700 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Team
                  </a>
                  <a 
                    href="#programs" 
                    className="block text-dark hover:text-gray-700 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Programs
                  </a>
                  <a 
                    href="#portfolio" 
                    className="block text-dark hover:text-gray-700 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Portfolio
                  </a>
                  <a 
                    href="#contact" 
                    className="block text-dark hover:text-gray-700 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </a>
                </>
              )}
              {/* Mobile admin access - also discrete */}
              <Link href="/admin">
                <div 
                  className="w-full flex justify-center py-2 mb-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-3 h-3 bg-gray-400 hover:bg-kizna-electric rounded-full opacity-40 hover:opacity-100 transition-all"></div>
                </div>
              </Link>
              <div className="space-y-3">
                <a 
                  href={isAcceleratorPage ? navigationData.applyNowUrl : '#'}
                  className="block w-full bg-transparent border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors text-center no-underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Apply Now
                </a>
                {isAcceleratorPage && (
                  <a 
                    href={`mailto:${navigationData.contactEmail}`}
                    className="block w-full bg-transparent border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors text-center no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get in Touch
                  </a>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Edit Modal for Navigation */}
      {isAcceleratorPage && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveNavigation}
          title="Edit Navigation Links"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Apply Now URL</label>
              <input
                type="text"
                name="applyNowUrl"
                defaultValue={navigationData.applyNowUrl}
                className="admin-input w-full"
                placeholder="https://apply.versionbravoventures.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                defaultValue={navigationData.contactEmail}
                className="admin-input w-full"
                placeholder="adam@versionbravo.com"
              />
            </div>
          </div>
        </EditModal>
      )}
    </header>
  );
};

export default Header;