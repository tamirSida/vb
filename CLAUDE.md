# VBV Website - CMS Admin Access

## Website Structure

### Landing Page (/)
- Clean "Version Bravo" group landing page
- Three main paths: Non-Profit, Accelerator, Investment Fund
- Uses VB logo without text for clean design
- No navigation menu for focused user experience

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

## CMS Features

### Editable Sections
All website sections are fully editable:
- Hero Section (headlines, subheadline, all 3 buttons & URLs)
- Why Choose VB section
- Our Programs section
- Team section (name, title, military background, LinkedIn) 
- Mentor Network section (with LinkedIn links)
- Portfolio Highlights section
- Fund Structure section
- Application & Diligence Process section
- Ready to Join the Mission CTA section

### Team Management
- Clean cards with: Name, Title, Military Background, LinkedIn icon
- General Partners section (founders)
- Team & Advisors section
- Add/delete functionality
- LinkedIn integration with real profile links

### Advanced Features
- **Add New Section**: Insert custom sections anywhere on the page
- **FontAwesome Icon Selector**: Visual dropdown with 24 popular icons
- **Glass Morphism Styling**: Kizna-inspired electric blue design
- **Firebase Infrastructure**: Ready for SDK integration
- **Auto-logout Redirect**: Returns to home page on logout
- **Back to Website** links on all admin pages

## Known Issues & Fixes

### Missing Media Files
The public directory was excluded from git. To fix:
1. Remove `public` from .gitignore (line 83)
2. Add all public files: `git add public/`
3. Commit and push to deploy images and assets

### TypeScript Build Fixes
- Updated useFirestore hook with proper type constraints
- Added FirestoreDocument interface for Firestore integration
- Fixed TeamMember and PortfolioCompany interfaces with optional id
- Removed deprecated bio field references

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