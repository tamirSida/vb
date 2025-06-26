import React from 'react';

const SkipLinks: React.FC = () => {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <a href="#navigation" className="skip-link">
        Skip to navigation
      </a>
      <style jsx>{`
        .skip-links {
          position: absolute;
          top: -100px;
          left: 0;
          z-index: 1000;
        }
        
        .skip-link {
          position: absolute;
          top: -100px;
          left: 8px;
          padding: 8px 16px;
          background: #000;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 600;
          white-space: nowrap;
          transition: top 0.3s;
        }
        
        .skip-link:focus {
          top: 8px;
        }
        
        .skip-link:hover {
          background: #333;
        }
      `}</style>
    </div>
  );
};

export default SkipLinks;