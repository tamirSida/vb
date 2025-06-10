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
            <Link href="/admin">
              <button className="hidden md:block text-xs bg-kizna-dark hover:bg-kizna-electric hover:text-kizna-dark text-kizna-electric px-3 py-1.5 rounded-md font-medium transition-colors border border-kizna-electric/30">
                Admin Login
              </button>
            </Link>
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
              <Link href="/admin">
                <button 
                  className="w-full text-xs bg-kizna-dark hover:bg-kizna-electric hover:text-kizna-dark text-kizna-electric px-3 py-2 rounded-md font-medium transition-colors border border-kizna-electric/30 mb-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Login
                </button>
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