import React, { useState } from 'react';
import { siteData } from '../data/content';

const Team: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const founders = siteData.team.filter(member => member.isFounder);
  const team = siteData.team.filter(member => !member.isFounder);

  return (
    <section className="section-padding bg-primary text-dark">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-dark">Leadership</span> <span className="text-gray-700">Team</span>
          </h2>
          <p className="text-xl text-medium max-w-3xl mx-auto">
            Combat veterans turned successful entrepreneurs and operators
          </p>
        </div>

        {/* Founders Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-700 mb-8 text-center">Founders</h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((member, index) => (
              <div key={index} className="bg-light rounded-xl overflow-hidden border-2 border-secondary hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="flex justify-center pt-6 mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-xl">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-dark mb-2">{member.name}</h4>
                  <p className="text-gray-700 font-semibold mb-3 text-sm">{member.title}</p>
                  <p className="text-medium mb-4 text-sm">{member.bio}</p>
                  
                  <div className="border-t border-secondary pt-4 space-y-2">
                    <div>
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Military:</span>
                      <p className="text-sm text-dark">{member.military}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Education:</span>
                      <p className="text-sm text-dark">{member.education}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-8 text-center">Team & Advisors</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="relative bg-light rounded-lg overflow-hidden border border-secondary hover:border-gray-700 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="flex justify-center pt-3 mb-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-bold text-dark mb-1">{member.name}</h4>
                  <p className="text-gray-700 font-semibold mb-2 text-xs">{member.title}</p>
                  
                  <div className="space-y-1">
                    {member.military !== "N/A" && (
                      <div>
                        <span className="text-xs text-medium">{member.military}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover overlay with bullets */}
                {hoveredMember === index && member.bullets && (
                  <div className="absolute inset-0 bg-light/95 backdrop-blur-sm p-4 flex flex-col justify-start overflow-y-auto border-2 border-gray-700">
                    <h4 className="text-sm font-bold text-dark mb-1">{member.name}</h4>
                    <p className="text-gray-700 font-semibold mb-3 text-xs">{member.title}</p>
                    <ul className="space-y-1">
                      {member.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-xs text-dark flex items-start">
                          <span className="text-gray-700 mr-2 flex-shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;