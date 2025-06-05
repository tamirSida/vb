import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-vbv-gray to-gray-700 text-white">
      <div className="container-max text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Join the Mission?
        </h2>
        <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Whether you're a veteran entrepreneur ready to scale or an investor looking to back the next generation of military-trained founders, we're here to help.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <button className="btn-primary bg-vbv-gold hover:bg-yellow-600 text-gray-700 flex-1">
            Apply to Accelerator
          </button>
          <button className="btn-secondary border-white text-white hover:bg-white hover:text-gray-700 flex-1">
            Become an LP
          </button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-600">
          <p className="text-gray-300 mb-4">Stay updated on our portfolio and programs</p>
          <div className="flex max-w-sm mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-vbv-gold"
            />
            <button className="bg-vbv-gold hover:bg-yellow-600 text-gray-700 px-6 py-2 rounded-r-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;