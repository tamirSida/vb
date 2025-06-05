import React, { useRef, useEffect } from 'react';
import { siteData } from '../data/content';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // When video ends, pause on the final frame
      video.pause();
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video Only */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        <source src="/videos/hero-background.webm" type="video/webm" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 container-max section-padding text-white">
        <div className="max-w-4xl">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/images/brand/vbv-logo.png" 
              alt="Version Bravo Ventures Logo"
              className="h-24 md:h-32 lg:h-40 w-auto"
            />
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center bg-gray-800/40 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-500/30 mb-6">
              <span className="text-gray-200 font-semibold text-sm uppercase tracking-wider">
                Combat Veterans • Proven Operators
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="block text-gray-100">Investing in Veterans</span>
            <span className="block text-white">Who Conquered</span>
            <span className="block text-gray-100">the Impossible</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl leading-relaxed">
            {siteData.hero.subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              {siteData.hero.ctaPrimary}
            </button>
            <button className="border-2 border-gray-300 text-gray-200 hover:bg-gray-200 hover:text-dark font-semibold py-4 px-8 rounded-lg transition-all duration-300">
              {siteData.hero.ctaSecondary}
            </button>
          </div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;