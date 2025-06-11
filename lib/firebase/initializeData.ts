import { db } from './config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { siteData } from '../../data/content';

export async function initializeFirestoreData() {
  try {
    console.log('Initializing Firestore data...');
    // Check if hero document already exists
    const heroDoc = await getDoc(doc(db, 'siteContent', 'hero'));
    
    if (!heroDoc.exists()) {
      // Initialize hero section data
      await setDoc(doc(db, 'siteContent', 'hero'), {
        headline: siteData.hero.headline,
        subheadline: siteData.hero.subheadline,
        nonProfitCta: siteData.hero.nonProfitCta,
        nonProfitUrl: siteData.hero.nonProfitUrl,
        acceleratorCta: siteData.hero.acceleratorCta,
        acceleratorUrl: siteData.hero.acceleratorUrl,
        updatedAt: new Date().toISOString()
      });
      
      console.log('Firestore initialized with default hero data');
    }

    // Check if whyVB document already exists
    const whyVBDoc = await getDoc(doc(db, 'siteContent', 'whyVB'));
    
    if (!whyVBDoc.exists()) {
      // Initialize WhyVB section data
      await setDoc(doc(db, 'siteContent', 'whyVB'), {
        title: siteData.whyVB.title,
        points: siteData.whyVB.points,
        updatedAt: new Date().toISOString()
      });
      
      console.log('Firestore initialized with default WhyVB data');
    }

    // Check if programs document already exists
    const programsDoc = await getDoc(doc(db, 'siteContent', 'programs'));
    
    if (!programsDoc.exists()) {
      // Initialize Programs section data
      await setDoc(doc(db, 'siteContent', 'programs'), {
        title: 'Our Programs',
        description: 'Two pathways for veteran entrepreneurs to access our network, expertise, and capital',
        programs: siteData.programs,
        updatedAt: new Date().toISOString()
      });
      
      console.log('Firestore initialized with default Programs data');
    }

    // Check if team document already exists
    const teamDoc = await getDoc(doc(db, 'siteContent', 'team'));
    
    if (!teamDoc.exists()) {
      // Initialize Team section data
      await setDoc(doc(db, 'siteContent', 'team'), {
        members: siteData.team,
        updatedAt: new Date().toISOString()
      });
      
      console.log('Firestore initialized with default Team data');
    }

    // Check if portfolio document already exists
    const portfolioDoc = await getDoc(doc(db, 'siteContent', 'portfolio'));
    
    if (!portfolioDoc.exists()) {
      // Initialize Portfolio section data
      await setDoc(doc(db, 'siteContent', 'portfolio'), {
        title: 'Portfolio Highlights',
        description: 'Proven track record of successful investments in veteran-led companies',
        companies: siteData.portfolio,
        updatedAt: new Date().toISOString()
      });
      
      console.log('Firestore initialized with default Portfolio data');
    }

    // Initialize accelerator-specific sections
    const acceleratorProgramsDoc = await getDoc(doc(db, 'siteContent', 'acceleratorPrograms'));
    if (!acceleratorProgramsDoc.exists()) {
      await setDoc(doc(db, 'siteContent', 'acceleratorPrograms'), {
        title: 'Our Accelerator Program',
        description: 'Intensive 10-week program designed for veteran entrepreneurs ready to scale their startups',
        about: 'adam fill here',
        programs: siteData.programs.filter(program => program.name === 'VB Accelerator'),
        updatedAt: new Date().toISOString()
      });
      console.log('Firestore initialized with default Accelerator Programs data');
    }

    const mentorsDoc = await getDoc(doc(db, 'siteContent', 'mentors'));
    if (!mentorsDoc.exists()) {
      await setDoc(doc(db, 'siteContent', 'mentors'), {
        title: 'Mentor Network',
        description: 'Industry experts and successful entrepreneurs providing guidance to our portfolio companies',
        mentors: siteData.mentors,
        updatedAt: new Date().toISOString()
      });
      console.log('Firestore initialized with default Mentors data');
    }

    const applicationProcessDoc = await getDoc(doc(db, 'siteContent', 'applicationProcess'));
    if (!applicationProcessDoc.exists()) {
      await setDoc(doc(db, 'siteContent', 'applicationProcess'), siteData.applicationProcess);
      console.log('Firestore initialized with default Application Process data');
    }

    const acceleratorCTADoc = await getDoc(doc(db, 'siteContent', 'acceleratorCTA'));
    if (!acceleratorCTADoc.exists()) {
      await setDoc(doc(db, 'siteContent', 'acceleratorCTA'), {
        title: 'Ready to Join the Mission?',
        description: "Whether you're a veteran entrepreneur ready to scale or an investor looking to back the next generation of military-trained founders, we're here to help.",
        primaryButtonText: 'Apply to Accelerator',
        primaryButtonUrl: '#',
        secondaryButtonText: 'Become an LP',
        secondaryButtonUrl: '#',
        updatedAt: new Date().toISOString()
      });
      console.log('Firestore initialized with default Accelerator CTA data');
    }
  } catch (error) {
    console.warn('Firestore initialization failed (likely CORS issue in development):', error);
    // Don't throw error - let the app continue with static data
  }
}