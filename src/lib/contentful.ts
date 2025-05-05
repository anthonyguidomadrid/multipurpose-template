import { createClient } from 'contentful'
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

  return { ...response.items[0].fields, locale: response.items[0].sys.locale } as ThemeSettings
}

export const getHomePage = async () => {
  const header = await client.getEntries({
    content_type: 'header',
  })
  const about = await client.getEntries({
    content_type: 'about',
  })
  const services = await client.getEntries({
    content_type: 'services',
    include: 1,
  })

  const testimonials = await client.getEntries({
    content_type: 'testimonials',
  })

  const podcasts = await client.getEntries({
    content_type: 'podcasts',
  })

  return {
    about: about?.items?.[0]?.fields,
    header: header?.items?.[0]?.fields,
    services: services?.items?.[0]?.fields,
    testimonials: testimonials?.items?.[0]?.fields,
    podcasts: podcasts?.items?.[0]?.fields,
  } as unknown as HomePage
}
