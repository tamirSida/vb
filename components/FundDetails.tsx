import React from 'react';
import { siteData } from '../data/content';

const FundDetails: React.FC = () => {
  const { fundMechanics } = siteData;
  
  return (
    <section className="section-padding bg-gray-700 text-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {fundMechanics.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transparent, veteran-focused fund structure designed for long-term success
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <h3 className="text-gray-100 font-semibold mb-4">Fund Economics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Carried Interest:</span>
                <span className="font-semibold">{fundMechanics.details.carriedInterest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Management Fee:</span>
                <span className="font-semibold">{fundMechanics.details.managementFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">GP Commitment:</span>
                <span className="font-semibold">{fundMechanics.details.gpCommitment}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <h3 className="text-gray-100 font-semibold mb-4">Investment Terms</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Target Size:</span>
                <span className="font-semibold">{fundMechanics.details.targetSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Min Investment:</span>
                <span className="font-semibold">{fundMechanics.details.minInvestment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Structure:</span>
                <span className="font-semibold">{fundMechanics.details.structure}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-6">
            <h3 className="text-gray-100 font-semibold mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Investment Period:</span>
                <span className="font-semibold text-sm">{fundMechanics.details.investmentPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Fund Life:</span>
                <span className="font-semibold text-sm">{fundMechanics.details.fundLife}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gray-100/20 border border-gray-100 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="text-gray-100 font-semibold mb-2">Mission-Driven Impact</h4>
            <p className="text-gray-200">
              {fundMechanics.details.charitableDonation}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundDetails;