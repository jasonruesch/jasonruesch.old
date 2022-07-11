const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../tailwind-workspace-presets')],
  content: [join(__dirname, '**/*.html')],
  theme: {
    extend: {
      screens: {
        dark: { raw: '(prefers-color-scheme: dark)' },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Alegreya Sans SC', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
        },
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        on: {
          background: 'var(--color-on-background)',
          surface: 'var(--color-on-surface)',
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
    backgroundOpacity: false,
    borderOpacity: false,
    boxShadow: false,
    divideOpacity: false,
    placeholderOpacity: false,
    textOpacity: false,
  },
  plugins: [
    require('tailwindcss-mso'),
    require('tailwindcss-box-shadow'),
    require('tailwindcss-email-variants'),
  ],
};
