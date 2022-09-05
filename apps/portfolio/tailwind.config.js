const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const workspacePreset = require('../../tailwind-workspace-preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [workspacePreset],
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
