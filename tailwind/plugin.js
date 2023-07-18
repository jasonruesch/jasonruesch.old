const plugin = require('tailwindcss/plugin');
const { Button, Input } = require('./components');
const { HeightContentBox } = require('./utilities');
const presets = require('./presets');

module.exports = plugin.withOptions(
  () =>
    ({ addUtilities, addComponents }) => {
      addUtilities(HeightContentBox);

      addComponents(Button);
      addComponents(Input);
    },
  () => ({
    ...presets,
  })
);
