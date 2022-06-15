/** @type {import('tailwindcss').Config} */
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  dark: 'class',
  content: [
    join(__dirname, 'pages/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: 'var(--color-background)',
      },
      textColor: {
        on: {
          background: 'var(--color-on-background)',
        },
      },
    },
  },
  plugins: [],
};
