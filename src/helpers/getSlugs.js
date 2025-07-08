// Used for next-sitemap config
// eslint-disable-next-line @typescript-eslint/no-require-imports
const contentful = require('contentful')

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'master',
})

async function getSlugs(content_type) {
  const response = await client.getEntries({
    content_type,
    select: ['fields.slug'],
  })
  return response.items?.map((item) => ({ slug: String(item.fields.slug ?? '') })) ?? []
}

module.exports = { getSlugs }
