const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Alegreya Sans SC', ...defaultTheme.fontFamily.sans],
      },
      padding: {
        18: '72px',
      },
      scrollPadding: {
        18: '4.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant }) {
      addVariant('sm-min-h', `@media (min-height: ${defaultTheme.screens.sm})`);
    }),
  ],
};
