/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Champagne & Light" tokens — mirror styles/index.css custom props
        ivory: '#F6F1E7',
        cream: '#FCFAF4',
        sand: '#EFE7D6',
        pearl: '#FBF9F3',
        gold: {
          DEFAULT: '#C19A4D',
          lt: '#E3CB8E',
          soft: '#D8BD83',
          dk: '#8C6E33',
        },
        ink: '#2B241A',
        muted: '#6F6555',
        faint: '#9A8F7C',
        noir: '#14110B',
        espresso: '#211A11',
        night: '#0F1620',
        moon: '#AAC4DA',
        // Per-venue accents
        venue: {
          salle: '#C19A4D', // indoor — champagne gold
          jardin: '#7C8B5A', // outdoor — olive/sage green
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['Jost', 'system-ui', 'sans-serif'],
        label: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.22em',
      },
      boxShadow: {
        glow: '0 0 28px rgba(227,203,142,0.45)',
        'glow-lg': '0 0 48px rgba(227,203,142,0.5)',
        soft: '0 18px 50px -20px rgba(43,36,26,0.35)',
        lift: '0 30px 70px -30px rgba(43,36,26,0.45)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'scroll-hint': 'scroll-hint 1.8s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
