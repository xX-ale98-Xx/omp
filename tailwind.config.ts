import type { Config } from 'tailwindcss';
// import { colors } from './theme/colors';
import forms from '@tailwindcss/forms'; // ✅ import ESM style

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#E1F5F3',
          200: '#B4E5E0',
          300: '#7ED6CB',
          400: '#44C3B4',
          main: '#109C90',  //main color of the brand
          600: '#0D8A80',
          700: '#0A726A',
          800: '#075C56',
          900: '#044240',
          hover: '#2AE9D9',
  },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [forms], 
};

export default config;
