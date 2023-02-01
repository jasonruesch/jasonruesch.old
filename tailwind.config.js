const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');
const workspacePreset = require('./tailwind-workspace-preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [workspacePreset],
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
    extend: {
      // backgroundImage: {
      //   'beam-light': "url('/images/beams/docs@tinypng.png')",
      //   'beam-dark': "url('/images/beams/docs-dark@tinypng.png')",
      // },
    },
    // variants: {
    //   extend: {
    //     backgroundImage: ['dark'],
    //   },
    // },
  },
  plugins: [require('@tailwindcss/forms')],
};
