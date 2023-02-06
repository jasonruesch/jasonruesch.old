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
      watch: ['apps/emails/src'],
    },
    components: {
      root: 'apps/emails//src/components',
    },
    layouts: {
      root: 'apps/emails/src/layouts',
    },
    templates: {
      source: 'apps/emails/src/templates',
      destination: {
        path: 'dist/apps/emails',
      },
      assets: {
        source: 'apps/emails/src/images',
        destination: 'images',
      },
    },
    tailwind: {
      css: 'apps/emails/src/styles.css',
      config: 'apps/emails/tailwind.config.js',
    },
  },
};
