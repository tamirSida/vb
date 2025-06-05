import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-light shadow-sm border-b border-secondary sticky top-0 z-30">
      <div className="container-max px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image 
              src="/images/brand/vbv-logo.png" 
              alt="Version Bravo Ventures"
              width={96}
              height={48}
              className="h-12 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#team" className="text-dark hover:text-gray-700 font-medium transition-colors">Team</a>
            <a href="#programs" className="text-dark hover:text-gray-700 font-medium transition-colors">Programs</a>
            <a href="#portfolio" className="text-dark hover:text-gray-700 font-medium transition-colors">Portfolio</a>
            <a href="#contact" className="text-dark hover:text-gray-700 font-medium transition-colors">Contact</a>
          </nav>
          
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;