import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { siteData } from '../data/content';
import EditableSection from './admin/EditableSection';
import EditModal from './admin/EditModal';
import { useSimpleFirestore } from '../hooks/useSimpleFirestore';

interface HeroSectionProps {
  showScrollIndicator?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ showScrollIndicator = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [heroData, setHeroData] = useState(siteData.hero);
  const [countdown, setCountdown] = useState(siteData.hero.countdownDuration || 10);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const { updateDocument, getDocument } = useSimpleFirestore('siteContent');

  const handleSkip = () => {
    router.push('/accelerator');
  };

  const handleEditHero = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveHero = async (data: any) => {
    try {
      const updatedData = {
        ...data,
        countdownDuration: parseInt(data.countdownDuration) || 10,
        updatedAt: new Date().toISOString()
      };
      await updateDocument('hero', updatedData);
      setHeroData({ ...heroData, ...updatedData });
      setCountdown(updatedData.countdownDuration);
      console.log('Hero data saved successfully');
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving hero data:', error);
    }
  };

  // Load hero data from Firestore on component mount
  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const data = await getDocument('hero');
        if (data) {
          const heroData = data as any;
          setHeroData(heroData);
          setCountdown(heroData.countdownDuration || 10);
        }
      } catch (error) {
        console.error('Error loading hero data:', error);
      }
    };
    
    loadHeroData();
  }, []);

  // Auto-start countdown immediately after component mounts
  useEffect(() => {
    setIsCountdownActive(true);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (!isCountdownActive) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Redirect to accelerator when countdown reaches 0
      router.push('/accelerator');
    }
  }, [countdown, isCountdownActive, router]);

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
    <>
      <EditableSection 
        sectionName="Hero Section"
        onEdit={handleEditHero}
        className="relative h-screen w-full flex items-center overflow-hidden"
      >
      {/* Background Video for Desktop */}
      <div className="hidden md:block absolute inset-0 bg-black z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
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
              src="/images/brand/vb-logo-notxt.png" 
              alt="Version Bravo Logo"
              width={876}
              height={867}
              className="h-16 sm:h-24 md:h-28 lg:h-32 w-auto"
              priority
              unoptimized
            />
          </div>

          
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black-ops font-bold leading-tight mb-3 sm:mb-6 md:mb-6">
            <span className="block text-white">{heroData.headline}</span>
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 text-gray-200 max-w-3xl leading-relaxed font-black-ops">
            {heroData.subheadline}
          </p>
          
          {/* Countdown Section */}
          <div className="flex flex-col items-center justify-center max-w-3xl">
            <div className="text-center mb-8">
              <div className="text-lg sm:text-xl md:text-2xl font-black-ops text-gray-300 mb-4">
                Joining the action in
              </div>
              
              {/* Countdown Number */}
              <div className="text-6xl sm:text-8xl md:text-9xl font-black-ops font-bold text-white mb-6 animate-pulse">
                {countdown}
              </div>
              
              {/* Spinner */}
              <div className="flex justify-center mb-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
              
              {/* Skip Button */}
              <button
                onClick={handleSkip}
                className="bg-gray-600/50 hover:bg-gray-500/70 text-white font-black-ops font-medium py-2 px-6 rounded-lg transition-all duration-300 text-sm border border-gray-500/30 hover:border-gray-400/50 backdrop-blur-sm"
              >
                Skip
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      )}
      </EditableSection>

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveHero}
        title="Edit Hero Section"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Headline</label>
            <input
              type="text"
              name="headline"
              defaultValue={heroData.headline}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Subheadline</label>
            <textarea
              name="subheadline"
              defaultValue={heroData.subheadline}
              className="admin-input w-full h-24 resize-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Non-Profit Button Text</label>
              <input
                type="text"
                name="nonProfitCta"
                defaultValue={heroData.nonProfitCta}
                className="admin-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Non-Profit URL</label>
              <input
                type="url"
                name="nonProfitUrl"
                defaultValue={heroData.nonProfitUrl}
                className="admin-input w-full"
                placeholder="https://..."
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Accelerator Button Text</label>
              <input
                type="text"
                name="acceleratorCta"
                defaultValue={heroData.acceleratorCta}
                className="admin-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Accelerator URL</label>
              <input
                type="url"
                name="acceleratorUrl"
                defaultValue={heroData.acceleratorUrl}
                className="admin-input w-full"
                placeholder="https://www.versionbravo.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Fund Button Text</label>
              <input
                type="text"
                name="fundCta"
                defaultValue={heroData.fundCta}
                className="admin-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Fund URL</label>
              <input
                type="url"
                name="fundUrl"
                defaultValue={heroData.fundUrl}
                className="admin-input w-full"
                placeholder="/fund"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Countdown Duration (seconds)</label>
            <input
              type="number"
              name="countdownDuration"
              defaultValue={heroData.countdownDuration || 10}
              className="admin-input w-full"
              min="1"
              max="60"
              placeholder="10"
            />
            <p className="text-xs text-gray-400 mt-1">How long (in seconds) before auto-redirecting to accelerator page</p>
          </div>
        </div>
      </EditModal>
    </>
  );
};

export default HeroSection;