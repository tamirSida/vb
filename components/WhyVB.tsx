import React from 'react';
import { siteData } from '../data/content';

const WhyVB: React.FC = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {siteData.whyVB.title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.whyVB.points.map((point, index) => {
            const icons = [
              "fas fa-users", // Team of successful operators
              "fas fa-network-wired", // Unparalleled network
              "fas fa-handshake", // We understand the veteran entrepreneur
              "fas fa-graduation-cap", // Accelerator built by veterans
              "fas fa-star" // Experienced advisory board
            ];
            
            return (
              <div key={index} className="bg-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-secondary">
                <div className="flex items-start">
                  <div className="bg-gray-700 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <i className={`${icons[index]} text-lg`}></i>
                  </div>
                  <p className="text-dark leading-relaxed">{point}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyVB;