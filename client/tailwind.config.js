/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand tokens — mirror the CSS custom properties in styles/index.css
        black: '#080A10',
        deep: '#0D1520',
        surface: '#121E30',
        electric: {
          DEFAULT: '#1E82FF',
          lt: '#50B4FF',
          dim: '#1060CC',
        },
        gold: {
          DEFAULT: '#C8A864',
          lt: '#DCC078',
          dk: '#8C6E37',
        },
        white: '#FAFAFF',
        silver: '#B4BCC8',
        smoke: '#8C94A2',
        // Per-venue accents
        venue: {
          salle: '#1E82FF',
          salon: '#C8A864',
          jardins: '#5AC878',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        body: ['Raleway', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.18em',
      },
      boxShadow: {
        glow: '0 0 20px rgba(30,130,255,0.4)',
        'glow-lg': '0 0 40px rgba(30,130,255,0.45)',
        'glow-gold': '0 0 24px rgba(200,168,100,0.35)',
      },
      transitionTimingFunction: {
        // No bouncy springs — ease-out / ease-in-out only
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 500ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scroll-hint': 'scroll-hint 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
