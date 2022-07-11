const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      inherit: colors.inherit,
      black: colors.black,
      white: colors.white,
      cyan: colors.cyan,
      fuchsia: colors.fuchsia,
      violet: colors.violet,
      teal: colors.teal,
      neutral: colors.neutral,
      red: colors.red,
      green: colors.green,
    },
    boxShadow: {
      DEFAULT: defaultTheme.boxShadow.DEFAULT,
      sm: defaultTheme.boxShadow.sm,
      md: defaultTheme.boxShadow.md,
      lg: defaultTheme.boxShadow.lg,
    },
    extend: {
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
