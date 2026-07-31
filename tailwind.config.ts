import type { Config } from 'tailwindcss';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#171717',
        light: '#FFFFFF',
        paper: '#FFFFFF',
        greige: '#F6F6F6',
        accent: '#A81828',
        'accent-crystal': '#881018',
        card: '#1A1A1A',
        'card-border': '#2A2A2A',
        'text-primary': '#FFFFFF',
        'text-muted': '#A0A0A0',
        'text-dark': '#0A0A0A',
        'text-dark-muted': '#555555',
        gold: '#A81828',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        script: ['var(--font-signature)', 'cursive'],
      },
      boxShadow: {
        soft: '0 1px 1px rgba(28,26,22,0.03), 0 12px 34px -14px rgba(28,26,22,0.16)',
        'soft-lg': '0 2px 4px rgba(28,26,22,0.04), 0 28px 60px -20px rgba(28,26,22,0.22)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
