const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'index.html'),
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      display: ['Alegreya Sans SC', ...defaultTheme.fontFamily.sans],
    },
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
    screens: {
      ...defaultTheme.screens,
      sm: {
        raw: `(min-width: ${defaultTheme.screens.sm}) and (min-height: ${defaultTheme.screens.sm})`,
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
