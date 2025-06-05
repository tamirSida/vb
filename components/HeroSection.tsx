import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
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
    <section className="relative min-h-[20vh] sm:min-h-[18vh] md:min-h-[25vh] lg:min-h-[28vh] flex items-center overflow-hidden">
      {/* Background Video for Desktop */}
      <div className="hidden md:block absolute inset-0 bg-black z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          <source src="/videos/hero-background.webm" type="video/webm" />
        </video>
      </div>
      
      {/* Background Image for Mobile */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image
          src="/images/hero/vbv-hero.jpg"
          alt="Version Bravo Ventures Hero"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 container-max px-4 py-2 sm:py-4 md:py-4 lg:py-6 text-white">
        <div className="max-w-4xl">
          {/* Logo */}
          <div className="mb-3 sm:mb-6 md:mb-8">
            <Image 
              src="/images/brand/vbv-logo.png" 
              alt="Version Bravo Ventures Logo"
              width={192}
              height={192}
              className="h-16 sm:h-24 md:h-28 lg:h-32 w-auto"
              priority
            />
          </div>

          <div className="mb-3 sm:mb-4 md:mb-6">
            <div className="inline-flex items-center bg-gray-800/40 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-full border border-gray-500/30 mb-3 sm:mb-6">
              <span className="text-gray-200 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Combat Veterans • Proven Operators
              </span>
            </div>
          </div>
          
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-6 md:mb-6">
            <span className="block text-gray-100">Investing in Veterans</span>
            <span className="block text-white">Who Conquered</span>
            <span className="block text-gray-100">the Impossible</span>
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl mb-3 sm:mb-6 md:mb-6 text-gray-200 max-w-2xl leading-relaxed">
            {siteData.hero.subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-8 md:mb-12">
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 sm:py-4 sm:px-8 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-sm sm:text-base">
              {siteData.hero.ctaPrimary}
            </button>
            <button className="border-2 border-gray-300 text-gray-200 hover:bg-gray-200 hover:text-dark font-semibold py-2 px-4 sm:py-4 sm:px-8 rounded-lg transition-all duration-300 text-sm sm:text-base">
              {siteData.hero.ctaSecondary}
            </button>
          </div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;