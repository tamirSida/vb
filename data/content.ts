// Content data structure - CMS-ready for future integration

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  military: string;
  education: string;
  isFounder: boolean;
  bullets?: string[];
}

export interface PortfolioCompany {
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

export const siteData = {
  hero: {
    headline: "Investing in Veteran Entrepreneurs Who Have Already Conquered the Impossible",
    subheadline: "Version Bravo Ventures is an accelerator and venture fund run by combat veterans turned successful entrepreneurs.",
    ctaPrimary: "Apply to VB Accelerator",
    ctaSecondary: "Invest in the Fund"
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
      title: "Managing Director, Version Bravo, Alpha-Bet (NGO)",
      bio: "VP Lear Innovation Ventures, Co-Founder/CEO EXO (Acq. by Lear)",
      image: "/images/team/nuri-golan.jpg",
      military: "Captain (Res.) Shayetet-13 (IL Navy SEALs)",
      education: "B.Sc. Aerospace Engineering - George Washington Univ., MBA Technion",
      isFounder: true,
      bullets: [
        "Managing Director, Version Bravo, Alpha-Bet (NGO)",
        "VP Lear Innovation Ventures",
        "Co-Founder/CEO, EXO (Acq. by Lear)",
        "Co-Founder/CEO, Sosivio",
        "Co-Founder/Chairman, Navmatic (Acq. by SuperPedestrian)",
        "Captain (Res.) Shayetet-13 (IL Navy SEALs)",
        "B.Sc. Aerospace Engineering - George Washington Univ.",
        "MBA, Entrepreneurship and Innovation - Technion"
      ]
    },
    {
      name: "Adam Weiner", 
      title: "Chief Mentor, Version Bravo, Alpha-Bet (NGO)",
      bio: "Co-Founder/COO EXO (Acq. by Lear), Director of Innovation Lear",
      image: "/images/team/adam-weiner.jpg",
      military: "IDF Paratrooper",
      education: "BA Political Science – U. Arizona, MBA Technion",
      isFounder: true,
      bullets: [
        "Chief Mentor, Version Bravo, Alpha-Bet (NGO)",
        "Co-Founder/COO, EXO (Acq. by Lear)",
        "Co-Founder/COO, Sosivio",
        "Co-Founder/Board Member, Navmatic (Acq. by SuperPedestrian)",
        "Director of Innovation, Lear Innovation Ventures",
        "IDF Paratrooper",
        "BA, Political Science – U. Arizona",
        "MBA, Entrepreneurship and Innovation - Technion"
      ]
    },
    {
      name: "Dr. Gali Einav",
      title: "IL Academic Lead",
      bio: "Professor of Digital Media & Entrepreneurship",
      image: "/images/team/gali-einav.jpg",
      military: "N/A",
      education: "PhD Interactive Television - Columbia University",
      isFounder: false,
      bullets: [
        "Head of International Undergraduate Program in Entrepreneurship and the 'Upstart' program at Adelson School of Entrepreneurship, Reichman Univ.",
        "Prof. of Digital Media, Reichman University",
        "Prof. Digital Media/Entrepreneurship, Katz School of Marketing, Yeshiva Univ.",
        "Led Digital Insight & Innovation Research Group, NBC Universal",
        "Advisory Board Member, Nielsen Innovate & Yeshiva Univ. Innovation Lab",
        "MA, Communications and Journalism - The Hebrew Univ. of Jerusalem",
        "PhD, Interactive Television - Columbia University"
      ]
    },
    {
      name: "Prof. Tommy Knapp",
      title: "US Academic Lead",
      bio: "Academic Director, USC Entrepreneurship",
      image: "/images/team/tommy-knapp.jpg",
      military: "N/A",
      education: "BBA & MBA - University of Southern California",
      isFounder: false,
      bullets: [
        "Academic Dir., Master's of Science in Entrepreneurship & Innovation, USC",
        "Associate Prof. of Clinical Entrepreneurship @ Lloyd Greif Center for Entrepreneurial Studies @ Univ. of Southern California",
        "Founder, Club Sportswear & Honolua Surf Co.",
        "Partner, Blue Jay Bay Ventures",
        "Board Member, Ameritas",
        "BBA & MBA, Communications and Journalism - Univ. of Southern California"
      ]
    },
    {
      name: "Yotam Dagan",
      title: "Director of Growth",
      bio: "Co-Founder/CEO, Dugri Inc. Clinical Psychologist",
      image: "/images/team/yotam-dagan.jpg",
      military: "CDR (Res.) Shayetet-13",
      education: "M.A. Clinical Psychology, MC MPA Harvard",
      isFounder: false,
      bullets: [
        "Co-Founder/CEO, Dugri Inc.",
        "Clinical Psychologist",
        "Founder, Momentum (IDF Transition Program for released soldiers), Maoz (Network of Leaders), & Co-Impact",
        "CDR (Res.) Shayetet-13 (Chief Instructor & Unit Psychologist)",
        "M.A., Clinical Psychology - University of Haifa",
        "MC MPA, Harvard University"
      ]
    },
    {
      name: "Jeff Ross",
      title: "US Veteran Network Lead",
      bio: "CEO & Co-Founder Brecourt Solutions Inc.",
      image: "/images/team/jeff-ross.jpg",
      military: "Special Operations Chief Petty Officer (Res.), US Navy SEALs",
      education: "B.S. Biology/Medical Science - Western Illinois University",
      isFounder: false,
      bullets: [
        "CEO & Co-Founder Brecourt Solutions Inc.",
        "Greater Chicago Area FOB Leader, SEAL Future Foundation",
        "Special Operations Chief Petty Officer (Res.), US Navy SEALs",
        "B.S. Biology/Medical Science - Western Illinois University"
      ]
    },
    {
      name: "Eden Golan",
      title: "Program Manager",
      bio: "Former Associate Producer at Vogue, Google",
      image: "/images/team/eden-golan.jpg",
      military: "N/A",
      education: "M.B.A - Tel Aviv University",
      isFounder: false,
      bullets: [
        "Associate Producer, Vogue",
        "Chief of Staff, CRO Office, Dick Clark Productions",
        "Associate Producer, Manifold",
        "Producer/Product Manager, Google",
        "M.B.A - Tel Aviv University"
      ]
    },
    {
      name: "Grant Goldberg",
      title: "Director of Program and Operations",
      bio: "Associate Director at AFINS, YU Innovation Lab",
      image: "/images/team/grant-goldberg.jpg",
      military: "Special Forces, Nahal Brigade IDF",
      education: "B.S. Sports Industry/Logistics",
      isFounder: false,
      bullets: [
        "Associate Director, AFINS",
        "Assistant Director, YU Innovation Lab",
        "Special Forces, Nahal Brigade IDF",
        "B.S. Sports Industry/Logistics"
      ]
    },
    {
      name: "Tamir Sida",
      title: "Tech Stack Architect & AI/Web Dev Mentor",
      bio: "Chief of Operations (Res.), 55th Brigade, IDF",
      image: "/images/team/tamir-sida.jpg",
      military: "Chief of Operations (Res.), 55th Brigade, IDF",
      education: "Computer Science and Entrepreneurship - Reichman University",
      isFounder: false,
      bullets: [
        "Tech Stack Architect & AI/Web Dev Mentor",
        "Chief of Operations (Res.), 55th Brigade, IDF",
        "Project & Product Manager leading complex technology programs in defense and innovation sectors",
        "AI/ML-focused software and full-stack web application developer",
        "Advisor to senior military leadership on data infrastructure and decision-support platforms",
        "Currently completing a double major in Computer Science and Entrepreneurship at Reichman University"
      ]
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
    { name: "Rami Lachter", company: "Co-Founder - Flare", image: "/images/mentors/rami-lachter.jpg" },
    { name: "Isaac Zafarani", company: "Co-Founder - Vero, EXO (Acq.)", image: "/images/mentors/isaac-zafarani.jpg" },
    { name: "Tal Brown", company: "Co-Founder - Zone 7", image: "/images/mentors/tal-brown.jpg" },
    { name: "Avner Braverman", company: "Founder - Voia", image: "/images/mentors/avner-braverman.jpg" },
    { name: "Oriel Raveh", company: "Founder - Tipping Point", image: "/images/mentors/oriel-raveh.jpg" },
    { name: "Sonny Tai", company: "Founder - Acute", image: "/images/mentors/sonny-tai.jpg" },
    { name: "Yochai Rozenblat", company: "Serial Entrepreneur", image: "/images/mentors/yochai-rozenblat.jpg" },
    { name: "Rob Huberty", company: "Co-Founder - ZeroEyes", image: "/images/mentors/rob-huberty.jpg" }
  ],

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
    timeline: "1 month total",
    steps: [
      {
        week: "Week 1",
        activity: "1–3 intro calls"
      },
      {
        week: "Week 2", 
        activity: "1–2 domain expert calls"
      },
      {
        week: "Week 3",
        activity: "Diligence + follow-ups"
      },
      {
        week: "Week 4",
        activity: "Decision (must be unanimous)"
      }
    ],
    commitments: [
      "Weekly updates",
      "1-month timeline max", 
      "Transparent feedback (including deal memo)"
    ]
  }
};

export default siteData;