/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        leela: {
          bg: '#FAF7F2',         // Palatial Warm Ivory
          linen: '#F4EFE6',      // Champagne Linen
          pearl: '#FFFFFF',      // Pure Alabaster White
          cream: '#FDFBF7',      // Soft Silk Cream
          card: '#FFFFFF',       // Card Background
          border: '#E8DCB8',     // Royal Champagne Gold Hairline
          borderHover: '#C5A059',// Vibrant Gold Border on Hover
          espresso: '#1A1613',   // Primary Imperial Dark Charcoal
          heading: '#241E19',    // Deep Royal Bronze Charcoal
          body: '#4A4036',       // Refined Body Text
          muted: '#7A6E5F',      // Secondary Taupe
          dark: '#16120E',       // Grounding Footer Deep Espresso
        },
        gold: {
          50: '#FDFBF7',
          100: '#FAF2DE',
          200: '#F4E3BC',
          300: '#E7CE8E',
          400: '#D5B45F',
          500: '#B89225',        // Leela Antique Royal Gold
          600: '#9E781A',
          700: '#7E5C10',
          800: '#5F440B',
          900: '#432E05',
        },
        eden: {
          black: '#1A1613',
          dark: '#FAF7F2',
          surface: '#F5EFE6',
          card: '#FFFFFF',
          muted: '#EDE4D4',
          border: 'rgba(184, 146, 37, 0.25)',
          accent: '#1E3A2F',
          glow: 'rgba(184, 146, 37, 0.15)',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DFCDAB 0%, #C5A059 50%, #997534 100%)',
        'gold-radial': 'radial-gradient(circle, rgba(197,160,89,0.12) 0%, rgba(250,247,242,0) 70%)',
        'palace-hero': 'linear-gradient(180deg, rgba(26,22,19,0.45) 0%, rgba(26,22,19,0.75) 60%, rgba(250,247,242,1) 100%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 12px rgba(184, 146, 37, 0.18)',
        'gold-md': '0 8px 24px -4px rgba(184, 146, 37, 0.22)',
        'gold-lg': '0 16px 36px -6px rgba(184, 146, 37, 0.28)',
        'palace-card': '0 4px 20px -2px rgba(58, 45, 20, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'palace-hover': '0 14px 30px -4px rgba(184, 146, 37, 0.2), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
