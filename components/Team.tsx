import React from 'react';
import Image from 'next/image';
import { siteData } from '../data/content';

const Team: React.FC = () => {
  const founders = siteData.team.filter(member => member.isFounder);
  const team = siteData.team.filter(member => !member.isFounder);

  return (
    <section id="team" className="section-padding bg-primary text-dark">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-dark">Leadership</span> <span className="text-gray-700">Team</span>
          </h2>
          <div className="flex items-center justify-center gap-4 text-xl text-medium max-w-3xl mx-auto">
            <span className="font-semibold">Combat Veterans</span>
            <i className="fas fa-arrow-right text-gray-700 text-2xl"></i>
            <span className="font-semibold">Entrepreneurs</span>
            <i className="fas fa-arrow-right text-gray-700 text-2xl"></i>
            <span className="font-semibold">Investors</span>
          </div>
        </div>

        {/* Founders Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-700 mb-8 text-center">Founders</h3>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((member, index) => (
              <div key={index} className="bg-light rounded-xl overflow-hidden border-2 border-secondary hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="flex justify-center pt-6 mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-xl">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      width={128}
                      height={128}
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
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-light rounded-lg overflow-hidden border border-secondary shadow-md">
                <div className="flex justify-center pt-4 mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover object-top scale-110"
                      priority
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold text-dark mb-1 text-center">{member.name}</h4>
                  <p className="text-gray-700 font-semibold mb-3 text-sm text-center">{member.title}</p>
                  
                  {member.military !== "N/A" && (
                    <div className="mb-3 text-center">
                      <span className="text-xs text-medium font-medium">{member.military}</span>
                    </div>
                  )}

                  {member.bullets && (
                    <div className="mt-3">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;