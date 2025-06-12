# VBV Website - Full CMS Documentation

## Website Structure

### Landing Page (/)
- Clean "Version Bravo" group landing page
- Three main paths: Non-Profit, Accelerator, Investment Fund
- Uses VB logo without text for clean design
- No navigation menu for focused user experience
- **Full CMS Integration**: Hero section, WhyVB, Programs, Team, Portfolio

### Accelerator Page (/accelerator)
- Dedicated accelerator program showcase
- **Full CMS Integration**: All sections editable
- Comprehensive program information and application process
- Mentor network display with LinkedIn integration

### Fund Page (/fund)
- Complete VBV investment fund website
- All original sections: team, programs, portfolio, etc.
- Full CMS functionality with inline editing
- Uses VB logo with text in header

### Non-Profit Page (/non-profit)
- Placeholder "Coming Soon" page
- Professional messaging about future programs
- Clean design consistent with site branding

## Discrete Admin Access Methods

The VBV website has multiple discrete ways to access the admin panel without obvious admin buttons:

### 1. Visual Access - Tiny Gray Dot
- Look for a small gray dot in the header (desktop)
- Click the dot to access admin mode
- Mobile: Small dot in mobile menu

### 2. Keyboard Shortcut
- Press **Ctrl+Shift+A** anywhere on the site

### 3. Logo Click Counter
- Click the header VB logo **7 times** quickly (within 3 seconds)
- Counter resets after 3 seconds of inactivity
- Only works on header logo, not hero section logo

### 4. URL Parameters
- Add `?vbv=admin` to any URL
- Or add `#admin2024` to any URL

### 5. Konami-Style Sequence
Press this sequence of keys in order:
1. ↑ ↑ ↓ ↓ ← → ← → A D M I N

**Step by step:**
- Press **Up Arrow** twice
- Press **Down Arrow** twice  
- Press **Left Arrow** once
- Press **Right Arrow** once
- Press **Left Arrow** once
- Press **Right Arrow** once
- Press the letter **A**
- Press the letter **D** 
- Press the letter **M**
- Press the letter **I**
- Press the letter **N**

## Complete CMS Features

### Core Sections (All Pages)
**Hero Section**
- Editable headline and subheadline
- Three customizable CTA buttons with URLs
- Real-time Firestore sync

**WhyVB Section**
- Editable section title
- Add/edit/delete bullet points
- Dynamic content management

**Programs Section**
- Add/edit/delete programs
- Full program details: name, description, duration, investment, equity
- Program highlights with line-by-line editing

**Team Section**
- Add/edit/delete team members
- Profile management: name, title, military background
- Photo uploads and LinkedIn integration
- General Partners vs Team member categorization

**Portfolio Section**
- Add/edit/delete portfolio companies
- Company details: name, description, logo
- Investment metrics: investment amount, valuation, TVPI, IRR, status

### Accelerator-Specific Sections
**Our Accelerator Program**
- Program title and description editing
- "About the Program" content section
- Program details management

**Mentor Network**
- Add/edit/delete mentors
- Mentor profiles: name, company, photo, LinkedIn
- Visual mentor grid display

**Application & Diligence Process**
- Edit process title and timeline
- Add/edit/delete application steps
- Week-by-week process breakdown
- Commitment list management

**Ready to Join the Mission CTA**
- Customizable headline and description
- Dual CTA buttons with custom text and URLs
- Professional call-to-action management

### Technical Infrastructure
**Firestore Integration**
- Real-time data persistence
- Automatic fallback to static content
- CORS-resistant simple read/write operations
- Production-ready security rules

**Admin Authentication**
- Firebase Authentication integration
- Manual admin user management
- Secure role-based access

**UI/UX Features**
- FontAwesome icons throughout (no emojis)
- Glass morphism styling with Kizna color scheme
- Hover-activated edit buttons
- Professional admin interface
- Mobile-responsive design

## Production Deployment

### Firestore Security Rules
Production-ready rules are in `firestore-production-rules.js`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /siteContent/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Admin User Management
1. Go to Firebase Console → Authentication → Users
2. Add admin users manually with email/password
3. Only create accounts for actual admins
4. Users access admin via discrete methods on website

### Assets & Media
- All images stored in `/public/images/` directory
- VB logo fixed: converted from TIFF to proper PNG format
- Chrome compatibility issue resolved
- All assets committed to repository

### Performance Optimizations
- Firestore operations use simple read/write (no real-time listeners)
- CORS error handling prevents UI breaks
- Automatic fallback to static content
- Optimized image loading with Next.js Image component

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Tech Stack
- Next.js with TypeScript
- Firebase (client SDK ready for admin SDK)
- Framer Motion for animations
- Tailwind CSS with custom Kizna color scheme
- FontAwesome icons

## Admin UX Features
- Exit admin button positioned to avoid overlap with edit buttons
- Multiple escape routes from admin pages
- Discrete access methods for professional appearance
- Consistent admin styling with glass morphism design