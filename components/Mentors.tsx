import React from 'react';
import { siteData } from '../data/content';

const Mentors: React.FC = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Mentor Network
          </h2>
          <p className="text-xl text-medium max-w-3xl mx-auto">
            Industry experts and successful entrepreneurs providing guidance to our portfolio companies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.mentors.map((mentor, index) => (
            <div key={index} className="text-center p-6 bg-light rounded-lg hover:shadow-lg transition-shadow border border-secondary">
              <div className="mb-4">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-gray-700"
                />
              </div>
              <h3 className="font-bold text-gray-700 text-lg mb-2">{mentor.name}</h3>
              {mentor.company && (
                <p className="text-medium text-sm">{mentor.company}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;