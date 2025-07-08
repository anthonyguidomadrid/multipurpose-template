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
}