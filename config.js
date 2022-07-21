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
      watch: ['apps/emails'],
    },
    components: {
      root: 'apps/emails/components',
    },
    layouts: {
      root: 'apps/emails/layouts',
    },
    templates: {
      source: 'apps/emails/templates',
      destination: {
        path: 'tmp/apps/emails',
      },
      assets: {
        source: 'apps/emails/images',
        destination: 'images',
      },
    },
    tailwind: {
      css: 'apps/emails/styles/tailwind.css',
      config: 'apps/emails/tailwind.config.js',
    },
  },
};
