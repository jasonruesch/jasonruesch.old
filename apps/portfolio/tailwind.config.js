const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const colors = require('tailwindcss/colors');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../tailwind.config.js')],
  dark: 'class',
  content: [
    join(__dirname, 'pages/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, 'components/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        // Theme colors
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
          DEFAULT: 'var(--color-primary)',
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
          DEFAULT: 'var(--color-secondary)',
        },
        neutral: {
          ...colors.neutral,
          DEFAULT: 'var(--color-neutral)',
        },
        error: 'var(--color-error)',
        success: 'var(--color-success)',
      },
      backgroundColor: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
      },
      textColor: {
        on: {
          primary: 'var(--color-on-primary)',
          secondary: 'var(--color-on-secondary)',
          background: 'var(--color-on-background)',
          surface: 'var(--color-on-surface)',
          error: 'var(--color-on-error)',
          success: 'var(--color-on-success)',
        },
      },
      ringColor: {
        on: {
          background: {
            5: 'var(--color-ring-on-background-5)',
            75: 'var(--color-ring-on-background-75)',
          },
          surface: {
            5: 'var(--color-ring-on-surface-5)',
            75: 'var(--color-ring-on-surface-75)',
          },
        },
      },
      divideColor: {
        on: {
          background: 'var(--color-divide-on-background)',
          surface: 'var(--color-divide-on-surface)',
        },
      },
    },
  },
  plugins: [],
};
