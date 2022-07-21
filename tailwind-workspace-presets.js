const defaultTheme = require('tailwindcss/defaultTheme');
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
      screens: {
        'sm-min-h': { raw: `(min-height: ${defaultTheme.screens.sm})` },
      },
      spacing: {
        18: '72px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
