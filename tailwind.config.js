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
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}