/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Gray Dominant Theme with Navy Accents
        'primary': '#F8FAFC',     // Very light gray (main background)
        'secondary': '#E2E8F0',   // Light gray
        'accent': '#1E40AF',      // Navy blue (accents only)
        'dark': '#1F2937',        // Dark gray for text
        'medium': '#6B7280',      // Medium gray
        'light': '#FFFFFF',       // Pure white (cards)
        
        // Legacy colors (keep for backwards compatibility)
        'vbv-navy': '#1a365d',
        'vbv-gold': '#d69e2e', 
        'vbv-gray': '#2d3748',
        
        // Blue hierarchy inspired by Version Bravo
        'vb-navy': '#1a365d',        // Main headings (darkest)
        'vb-blue': '#2b4c7d',        // Secondary headings  
        'vb-medium': '#4a6b9e',      // Body text
        'vb-light': '#6b7fbf',       // Supporting text
        'vb-accent': '#0137b7',      // Icons and accents
        
        // Kizna CMS colors for admin interface
        'kizna-navy': '#0a1628',
        'kizna-dark': '#1a202c', 
        'kizna-blue': '#2563eb',
        'kizna-electric': '#00d4ff',
        'kizna-teal': '#0d9488',
        'kizna-lime': '#84cc16',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'black-ops': ['Black Ops One', 'cursive'],
      },
    },
  },
  plugins: [],
}