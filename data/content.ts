// Content data structure - CMS-ready for future integration

export interface TeamMember {
  id?: string;
  name: string;
  title?: string;
  image: string;
  military: string;
  linkedinUrl?: string;
  isFounder: boolean;
}

export interface PortfolioCompany {
  id?: string;
  name: string;
  description: string;
  logo: string;
  metrics?: {
    investment?: string;
    valuation?: string;
    tvpi?: string;
    irr?: string;
    status?: string;
  };
}

export interface Program {
  name: string;
  description: string;
  duration: string;
  investment: string;
  equity: string;
  highlights: string[];
}

export interface Mentor {
  name: string;
  company: string;
  image: string;
  linkedinUrl: string;
  flag?: string;
}

export const siteData = {
  hero: {
    headline: "Version Bravo",
    subheadline: "Empowering veteran entrepreneurs through education, acceleration, and investment - from battlefield leadership to business success.",
    nonProfitCta: "Non-Profit Program",
    nonProfitUrl: "/non-profit",
    acceleratorCta: "VB Accelerator",
    acceleratorUrl: "/accelerator",
    fundCta: "Investment Fund",
    fundUrl: "/fund"
  },
  
  whyVB: {
    title: "Why Entrepreneurs Choose Version Bravo",
    points: [
      "Team of successful operators with a track record as value-add advisors — we are not passive; we're in the trenches with our founders",
      "Unparalleled network of entrepreneurs, industry experts, veteran foundations, military transition orgs",
      "We understand the veteran entrepreneur — shared experience, trust, mindset",
      "Accelerator built by and for veteran entrepreneurs — 4 years, 58 combat veteran founders graduated",
      "Experienced advisory board — decades of VC + technical expertise across sectors/stages"
    ]
  },

  programs: [
    {
      name: "VB Accelerator",
      description: "Our flagship 10-week program for veteran entrepreneurs",
      duration: "10 weeks",
      investment: "$100,000",
      equity: "3.33%",
      highlights: [
        "10-day bootcamp in Israel and USA",
        "16–20 startups per cohort", 
        "1-on-1 mentorship",
        "Final demo day in Palo Alto, CA"
      ]
    },
    {
      name: "Alpha-Bet Program",
      description: "Online program providing access to curriculum and mentors",
      duration: "10 weeks",
      investment: "Philanthropic funding",
      equity: "No equity",
      highlights: [
        "500–1,000 applicants → 100–150 participants/year",
        "Access to proprietary content, mentors, curriculum",
        "Funded by philanthropy + government",
        "Online lessons + workshops"
      ]
    }
  ] as Program[],

  team: [
    {
      name: "Nuri Golan",
      image: "/images/team/nuri-golan.jpg",
      military: "Captain (Res.) Shayetet-13 (IL Navy SEALs)",
      linkedinUrl: "https://www.linkedin.com/in/nurigolan/",
      isFounder: true
    },
    {
      name: "Adam Weiner", 
      image: "/images/team/adam-weiner.jpg",
      military: "IDF Paratrooper",
      linkedinUrl: "https://www.linkedin.com/in/weineradam/",
      isFounder: true
    },
    {
      name: "Dr. Gali Einav",
      title: "IL Academic Lead",
      image: "/images/team/gali-einav.jpg",
      military: "8200 IDF",
      linkedinUrl: "https://www.linkedin.com/in/gali-einav-ph-d-6771aa1/",
      isFounder: false
    },
    {
      name: "Prof. Tommy Knapp",
      title: "US Academic Lead",
      image: "/images/team/tommy-knapp.jpg",
      military: "N/A",
      linkedinUrl: "https://www.linkedin.com/in/tommyknapp1/",
      isFounder: false
    },
    {
      name: "Yotam Dagan",
      title: "Director of Growth",
      image: "/images/team/yotam-dagan.jpg",
      military: "CDR (Res.) Shayetet-13",
      linkedinUrl: "https://www.linkedin.com/in/yotam-dagan-abaa14b/",
      isFounder: false
    },
    {
      name: "Jeff Ross",
      title: "US Veteran Network Lead",
      image: "/images/team/jeff-ross.jpg",
      military: "Special Operations Chief Petty Officer (Res.), US Navy SEALs",
      linkedinUrl: "https://www.linkedin.com/in/jeff-ross-64183143/",
      isFounder: false
    },
    {
      name: "Eden Golan",
      title: "Program Manager",
      image: "/images/team/eden-golan.jpg",
      military: "N/A",
      linkedinUrl: "https://www.linkedin.com/in/edenzgolan/",
      isFounder: false
    },
    {
      name: "Grant Goldberg",
      title: "Director of Program and Operations",
      image: "/images/team/grant-goldberg.jpg",
      military: "Special Forces, Nahal Brigade IDF",
      linkedinUrl: "https://www.linkedin.com/in/ggoldberg27/",
      isFounder: false
    },
    {
      name: "Tamir Sida",
      title: "Tech Stack Architect & AI/Web Dev Mentor",
      image: "/images/team/tamir-sida.jpg",
      military: "Chief of Operations (Res.), 55th Brigade, IDF",
      linkedinUrl: "https://www.linkedin.com/in/tamir-sida/",
      isFounder: false
    }
  ] as TeamMember[],

  portfolio: [
    {
      name: "Defiance ETFs",
      description: "Defense and aerospace focused ETF",
      logo: "/images/portfolio/defiance.png",
      metrics: {
        investment: "$260K pre-seed",
        valuation: "$200M",
        tvpi: "14.61",
        status: "Active"
      }
    },
    {
      name: "TrialKit",
      description: "Clinical trial management platform",
      logo: "/images/portfolio/trialkit.png",
      metrics: {
        investment: "$25K → $150K",
        irr: "1,726%",
        status: "Seed $4.25M via UpWest"
      }
    },
    {
      name: "Guild",
      description: "Security and defense solutions (Kaj Larsen)",
      logo: "/images/portfolio/guild.png",
      metrics: {
        status: "Acquired by Siebert (SIEB)"
      }
    },
    {
      name: "Skana Robotics",
      description: "Expendable naval drones led by veteran fighters",
      logo: "/images/portfolio/skana.png",
      metrics: {
        status: "Preparing seed round"
      }
    },
    {
      name: "Brecourt Solutions",
      description: "Non-violent tech for gun violence protection",
      logo: "/images/portfolio/brecourt.png",
      metrics: {
        status: "Jeff Ross joined as Network Lead"
      }
    },
    {
      name: "Protego Health",
      description: "AI-powered appeals automation for denied medical claims",
      logo: "/images/portfolio/protego.png",
      metrics: {
        status: "Planning Seed Q2 2025"
      }
    }
  ] as PortfolioCompany[],

  mentors: [
    { name: "Rami Lachter", company: "Co-Founder - Flare", image: "/images/mentors/rami-lachter.jpg", linkedinUrl: "https://www.linkedin.com/in/ramilachter/", flag: "🇮🇱" },
    { name: "Isaac Zafarani", company: "Co-Founder - Vero, EXO (Acq.)", image: "/images/mentors/isaac-zafarani.jpg", linkedinUrl: "https://www.linkedin.com/in/isaac-zafarani-a9752313/", flag: "🇺🇸" },
    { name: "Tal Brown", company: "Co-Founder - Zone 7", image: "/images/mentors/tal-brown.jpg", linkedinUrl: "https://www.linkedin.com/in/talbrown/", flag: "🇺🇸" },
    { name: "Avner Braverman", company: "Founder - Voia", image: "/images/mentors/avner-braverman.jpg", linkedinUrl: "https://www.linkedin.com/in/avnerbraverman/", flag: "🇺🇸" },
    { name: "Oriel Raveh", company: "Founder - Tipping Point", image: "/images/mentors/oriel-raveh.jpg", linkedinUrl: "https://www.linkedin.com/in/oriel-raveh/", flag: "🇮🇱" },
    { name: "Sonny Tai", company: "Founder - Acute", image: "/images/mentors/sonny-tai.jpg", linkedinUrl: "https://www.linkedin.com/in/sonny-tai/", flag: "🇺🇸" },
    { name: "Yochai Rozenblat", company: "Serial Entrepreneur", image: "/images/mentors/yochai-rozenblat.jpg", linkedinUrl: "https://www.linkedin.com/in/yochai-rozenblat-b8845412/", flag: "🇮🇱" },
    { name: "Rob Huberty", company: "Co-Founder - ZeroEyes", image: "/images/mentors/rob-huberty.jpg", linkedinUrl: "https://www.linkedin.com/in/rob-huberty-605991a2/", flag: "🇺🇸" }
  ] as Mentor[],

  investmentCriteria: {
    title: "Investment Criteria",
    initial: [
      "Founder–Market Fit – Are they the right person for this market?",
      "Market Opportunity / Business Viability – Is the space venture-scale?",
      "Unique Value Proposition – Competitive edge, differentiation"
    ],
    followOn: "Signals of PMF, discipline, traction, team synergy"
  },

  programSchedule: {
    title: "Annual Program Schedule",
    quarters: [
      { period: "JAN–MAR", activity: "Deal sourcing" },
      { period: "APR–JUN", activity: "VB Accelerator (Spring)" },
      { period: "JUL–SEP", activity: "Alpha-Bet (Winter)" },
      { period: "OCT–DEC", activity: "Alpha-Bet (Fall) + recruiting" }
    ]
  },

  fundMechanics: {
    title: "Fund Structure",
    details: {
      carriedInterest: "20%",
      managementFee: "1.25% avg.",
      charitableDonation: "5% of GP profit donated to veteran orgs",
      minInvestment: "$100K", 
      gpCommitment: "2%",
      investmentPeriod: "2 years (1-year extension)",
      fundLife: "10 years (2-year extension)",
      structure: "U.S. fund",
      targetSize: "$5M"
    }
  },

  applicationProcess: {
    title: "Application & Diligence Process",
    timeline: "3-week streamlined process",
    steps: [
      {
        week: "Week 1",
        activity: "1–3 Intro Meetings",
        details: "Company receives a go/no-go for continued diligence"
      },
      {
        week: "Week 2", 
        activity: "1–2 Domain Expert Meetings/Calls",
        details: "Leveraging our extensive advisory network"
      },
      {
        week: "Week 3",
        activity: "Final Diligence & Decision",
        details: "Follow-on inquiries, investment decision, unanimous approval required from both partners"
      }
    ],
    commitments: [
      "Weekly progress updates throughout process",
      "Maximum 3-week timeline from application to decision", 
      "Transparent feedback at every stage (including detailed deal memo)"
    ]
  }
};

export default siteData;