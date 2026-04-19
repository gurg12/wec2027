/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#000b3a',
          800: '#0b1f3a',
          900: '#000617',
        },
        sky: {
          DEFAULT: '#7eb9ef',
          600: '#4aabdb',
          100: '#e6f2fc',
        },
        ivory: '#faf8f0',
        cream: '#f1ecdc',
        gold: {
          DEFAULT: '#ffd600',
          600: '#f5c518',
          200: '#fff4a6',
        },
      },
      fontFamily: {
        display: ['"Montserrat"', 'system-ui', 'sans-serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
        serif: ['"Lora"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0, 11, 58, 0.18)',
        gold: '0 0 0 4px rgba(255, 214, 0, 0.25)',
        card: '0 4px 20px -8px rgba(0, 11, 58, 0.25)',
        // Hard modern shadows (no blur, strong offset)
        'hard-gold':    '6px 6px 0 rgba(255,214,0,0.55)',
        'hard-gold-sm': '3px 3px 0 rgba(255,214,0,0.50)',
        'hard-sky':     '6px 6px 0 rgba(126,185,239,0.45)',
        'hard-sky-sm':  '3px 3px 0 rgba(126,185,239,0.40)',
        'hard-white':   '6px 6px 0 rgba(255,255,255,0.10)',
        'hard-navy':    '6px 6px 0 rgba(0,11,58,0.95)',
      },
      maxWidth: {
        content: '72rem',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'spin-slower': 'spin 60s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'navy-grid':
          "linear-gradient(rgba(255,214,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
