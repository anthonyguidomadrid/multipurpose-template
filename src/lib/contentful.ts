import { createClient, EntriesQueries, EntrySkeletonType } from 'contentful'
import { HomePage, ThemeSettings } from './types'

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'master',
})

export const getSettings = async () => {
  const response = await client.getEntries({
    content_type: 'settings',
  })

  if (response.items.length === 0) {
    throw new Error('No settings found in Contentful')
  }

  return {
    ...response.items[0].fields,
    locale: response.items[0].sys.locale?.slice(0, 2),
  } as ThemeSettings
}

export const getContact = async () => {
  const response = await client.getEntries({
    content_type: 'contact',
  })
  if (response.items.length === 0) {
    throw new Error('No contact info found in Contentful')
  }
  return response.items[0].fields
}

export const getMenu = async () => {
  const response = await client.getEntries({
    content_type: 'menu',
    include: 1,
  })
  if (response.items.length === 0) {
    throw new Error('No menu found in Contentful')
  }
  return response.items[0].fields
}

export const getHomePage = async () => {
  const homePage = await client.getEntries({
    content_type: 'home',
    include: 2,
    limit: 1,
  })

  return homePage.items[0].fields as unknown as HomePage
}

export const getDetailsBySlug = async (slug: string, contentType: string) => {
  const response = await client.getEntries({
    content_type: contentType,
    'fields.slug': slug,
  })

  if (response.items.length === 0) {
    throw new Error(`No details found for slug: ${slug} and content type: ${contentType}`)
  }

  return response.items[0].fields
}

export const getOtherDetails = async (slug: string, contentType: string) => {
  const query: EntriesQueries<EntrySkeletonType, undefined> & { order?: string } = {
    content_type: contentType,
  }
  if (contentType === 'event') {
    query.order = 'fields.startDate'
  }

  const response = await client.getEntries(query)

  if (response.items.length === 0) {
    return []
  }
  const otherDetails = response.items.filter((item) => item.fields.slug !== slug)
  return otherDetails
}

export const getCtaByType = async (type: string) => {
  const response = await client.getEntries({
    content_type: 'cta',
    'fields.type': type,
  })

  if (response.items.length === 0) {
    throw new Error(`No CTA found for type: ${type}`)
  }

  return response.items[0].fields
}

export const getReviews = async () => {
  const response = await client.getEntries({
    content_type: 'testimonial',
  })

  if (response.items.length === 0) {
    return []
  }

  return response.items
}
