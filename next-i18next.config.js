const path = require('path')

const i18nextConfig = {
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'es-CO', 'fr-BE'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: path.resolve('./public/locales'),
}

module.exports = i18nextConfig
