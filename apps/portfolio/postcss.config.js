const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      configPath: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
