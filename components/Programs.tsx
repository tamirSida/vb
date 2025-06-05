import React from 'react';
import { siteData } from '../data/content';

const Programs: React.FC = () => {
  return (
    <section id="programs" className="section-padding bg-light">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Our Programs
          </h2>
          <p className="text-xl text-medium max-w-3xl mx-auto">
            Two pathways for veteran entrepreneurs to access our network, expertise, and capital
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {siteData.programs.map((program, index) => (
            <div key={index} className="bg-light text-dark p-8 rounded-xl shadow-lg border border-secondary hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-700">{program.name}</h3>
                <p className="text-medium mb-4">{program.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-gray-700 font-semibold">Duration:</span>
                    <p className="text-dark">{program.duration}</p>
                  </div>
                  <div>
                    <span className="text-gray-700 font-semibold">Investment:</span>
                    <p className="text-dark">{program.investment}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-gray-700 font-semibold mb-3">Program Highlights:</h4>
                <ul className="space-y-2">
                  {program.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gray-700 mr-2">•</span>
                      <span className="text-medium">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;