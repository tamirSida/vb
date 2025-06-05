import React from 'react';
import { siteData } from '../data/content';

const Portfolio: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Portfolio Highlights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proven track record of successful investments in veteran-led companies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.portfolio.map((company, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center h-16 mb-4">
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
              
              <h3 className="text-lg font-bold text-gray-700 mb-2 text-center">
                {company.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 text-center">
                {company.description}
              </p>

              {company.metrics && (
                <div className="border-t pt-4 space-y-2">
                  {company.metrics.investment && (
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold text-gray-500">Investment:</span>
                      <span className="text-sm text-gray-700 font-semibold">{company.metrics.investment}</span>
                    </div>
                  )}
                  {company.metrics.tvpi && (
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold text-gray-500">TVPI:</span>
                      <span className="text-sm text-vbv-gold font-bold">{company.metrics.tvpi}</span>
                    </div>
                  )}
                  {company.metrics.irr && (
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold text-gray-500">IRR:</span>
                      <span className="text-sm text-vbv-gold font-bold">{company.metrics.irr}</span>
                    </div>
                  )}
                  {company.metrics.status && (
                    <div className="mt-3">
                      <span className="inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
                        {company.metrics.status}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;