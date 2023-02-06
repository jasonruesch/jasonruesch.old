const workspacePrettierConfig = require('../../prettier.config.js');

module.exports = {
  ...workspacePrettierConfig,
  tailwindConfig: './tailwind.config.js',
};
