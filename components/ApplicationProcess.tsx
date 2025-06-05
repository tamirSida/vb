import React from 'react';
import { siteData } from '../data/content';

const ApplicationProcess: React.FC = () => {
  const { applicationProcess } = siteData;
  
  return (
    <section className="section-padding bg-secondary">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {applicationProcess.title}
          </h2>
          <p className="text-xl text-medium max-w-3xl mx-auto">
            {applicationProcess.timeline} — transparent, veteran-to-veteran evaluation
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h3 className="text-2xl font-bold text-dark mb-6">Application Timeline</h3>
            <div className="space-y-6">
              {applicationProcess.steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark text-lg">{step.week}</h4>
                    <p className="text-medium">{step.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commitments */}
          <div>
            <h3 className="text-2xl font-bold text-dark mb-6">Our Commitments to You</h3>
            <div className="bg-light rounded-lg p-6 shadow-md border border-secondary">
              <ul className="space-y-4">
                {applicationProcess.commitments.map((commitment, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                      ✓
                    </div>
                    <span className="text-dark">{commitment}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button className="bg-gray-700 hover:bg-gray-600 text-white w-full text-lg py-4 rounded-lg font-semibold transition-colors">
                Start Your Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;