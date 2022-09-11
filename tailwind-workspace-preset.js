const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      zinc: colors.zinc,
      red: colors.red,
      green: colors.green,
      cyan: colors.cyan,
      fuchsia: colors.fuchsia,
      violet: colors.violet,
      teal: colors.teal,
    },
    screens: {
      ...defaultTheme.screens,
      sm: {
        raw: `(min-width: ${defaultTheme.screens.sm}) and (min-height: ${defaultTheme.screens.sm})`,
      },
    },
  },
};
