# Version Bravo Ventures – Landing Page

A high-performance, SEO-optimized landing site for **Version Bravo Ventures (VBV)** — a veteran-led accelerator and venture fund investing in founders who have already conquered the impossible.

## 🚀 Project Goals

- Present VBV's mission, programs, and track record to investors and applicants
- Build trust through team bios, success stories, and fund structure transparency
- Drive applications to the Accelerator and engagement from potential LPs
- SEO-optimized with scalable architecture (CMS integration-ready)

---

## 🧱 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) – React-based, supports server-side rendering and static site generation for SEO
- **Styling:** Tailwind CSS
- **Deployment:** Vercel or Netlify (static export supported)
- **CMS Integration (future):** Structured to support Sanity, Contentful, or Strapi via API

---

## 📁 Project Structure

```
/pages
  index.tsx           # Main landing page
  _app.tsx           # Next.js app wrapper
/components
  HeroSection.tsx    # Opening pitch and CTA
  WhyVB.tsx         # Why choose Version Bravo
  Programs.tsx      # Accelerator + Alpha-Bet
  Team.tsx          # Leadership team bios
  Portfolio.tsx     # Portfolio companies and metrics
  FundDetails.tsx   # Fund mechanics and structure
  ApplicationProcess.tsx # Timeline and process
  CTA.tsx           # Call to action section
/data
  content.ts        # Static content (CMS-ready structure)
/public
  /images
    /team          # Team headshots
    /portfolio     # Company logos
    /brand         # VBV logos and assets
    /hero          # Hero section images
  robots.txt       # SEO crawling instructions
/styles
  globals.css      # Global styles with Tailwind
```

---

## ⚙️ Getting Started

1. **Install dependencies**
```bash
npm install
```

2. **Run locally**
```bash
npm run dev
```

3. **Open http://localhost:3000**

## 📸 Required Images

Before running the site, add these images to the specified directories:

### Team Photos (`/public/images/team/`)
- `adam-weiner.jpg` - Adam Weiner headshot
- `nuri-golan.jpg` - Nuri Golan headshot  
- `tamir-sida.jpg` - Tamir Sida headshot

### Portfolio Logos (`/public/images/portfolio/`)
- `defiance.png` - Defiance ETFs logo
- `trialkit.png` - TrialKit logo
- `guild.png` - Guild logo
- `skana.png` - Skana Robotics logo

### Brand Assets (`/public/images/brand/`)
- `vbv-logo.png` - Main VBV logo (transparent background)
- `favicon.ico` - Website favicon

### Hero Section (`/public/images/hero/`)
- `vbv-hero.jpg` - Main hero image (team photo or relevant image)

### SEO Image (`/public/images/`)
- `og-image.jpg` - Social media sharing image (1200x630px recommended)

---

## 🔧 Build & Deploy

**Build for production:**
```bash
npm run build
```

**Export static site:**
```bash
npm run export
```

**Deploy to Vercel:**
```bash
npx vercel --prod
```

---

## 🧩 Future Upgrades (Optional)

- **Integrate CMS:** Replace `/data/content.ts` with CMS fetch (e.g., Sanity via getStaticProps)
- **Analytics:** Add Google Analytics or Vercel Web Analytics
- **Form Handling:** Integrate contact/application forms
- **Blog:** Add `/blog` route for articles and updates
- **Dark Mode & Accessibility:** Enhanced UX features

---

## 🔐 SEO Features

- ✅ Dynamic `<head>` metadata per page
- ✅ Open Graph tags for social sharing
- ✅ Fast load times with Next.js optimization
- ✅ Semantic HTML structure
- ✅ Sitemap and robots.txt
- ✅ Schema.org structured data

---

## 🤝 Contributing

This project was initially structured for Version Bravo Ventures. Contributors welcome - please fork or submit pull requests for improvements.

---

**Built with:** Next.js, TypeScript, Tailwind CSS  
**Author:** Version Bravo Ventures Team