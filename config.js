/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/

module.exports = {
  build: {
    browsersync: {
      watch: ['emails/src'],
    },
    components: {
      root: 'emails//src/components',
    },
    layouts: {
      root: 'emails/src/layouts',
    },
    templates: {
      source: 'emails/src/templates',
      destination: {
        path: 'dist/emails',
      },
      assets: {
        source: 'emails/src/images',
        destination: 'images',
      },
    },
    tailwind: {
      css: 'emails/src/styles/styles.css',
      config: 'emails/tailwind.config.js',
    },
  },
};
