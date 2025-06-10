import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-light shadow-sm border-b border-secondary sticky top-0 z-30">
      <div className="container-max px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image 
              src="/images/brand/vbv-logo.png" 
              alt="Version Bravo Ventures"
              width={160}
              height={80}
              className="h-20 brightness-0"
              style={{ width: 'auto', filter: 'brightness(0) saturate(100%) invert(22%) sepia(12%) saturate(733%) hue-rotate(202deg) brightness(91%) contrast(95%)' }}
            />
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#team" className="text-dark hover:text-gray-700 font-medium transition-colors">Team</a>
            <a href="#programs" className="text-dark hover:text-gray-700 font-medium transition-colors">Programs</a>
            <a href="#portfolio" className="text-dark hover:text-gray-700 font-medium transition-colors">Portfolio</a>
            <a href="#contact" className="text-dark hover:text-gray-700 font-medium transition-colors">Contact</a>
          </nav>
          
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
            
            <button className="hidden md:block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Apply Now
            </button>
            
            {/* Mobile Menu Button */}
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
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-light border-t border-secondary">
            <nav className="px-4 py-4 space-y-3">
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
              {/* Mobile admin access - also discrete */}
              <Link href="/admin">
                <div 
                  className="w-full flex justify-center py-2 mb-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-3 h-3 bg-gray-400 hover:bg-kizna-electric rounded-full opacity-40 hover:opacity-100 transition-all"></div>
                </div>
              </Link>
              <button 
                className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;