// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getSlugs } = require('./src/helpers/getSlugs')

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      process.env.NEXT_PUBLIC_ALLOW_ROBOTS === 'true'
        ? { userAgent: '*', allow: '/' }
        : { userAgent: '*', disallow: '/' },
    ],
  },
  additionalPaths: async () => {
    const events = await getSlugs('event')
    const services = await getSlugs('service')

    const props = {
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    }
    return [
      ...events.map((e) => ({ loc: `/events/${e.slug}`, ...props })),
      ...services.map((s) => ({ loc: `/services/${s.slug}`, ...props })),
    ]
  },
}
