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

  const events = await client.getEntries({
    content_type: 'events',
  })

  return {
    about: about?.items?.[0]?.fields,
    header: header?.items?.[0]?.fields,
    services: services?.items?.[0]?.fields,
    testimonials: testimonials?.items?.[0]?.fields,
    podcasts: podcasts?.items?.[0]?.fields || null,
    events: events?.items?.[0]?.fields || null,
  } as unknown as HomePage
}

export const getServiceBySlug = async (slug: string) => {
  const response = await client.getEntries({
    content_type: 'service',
    'fields.slug': slug,
  })

  if (response.items.length === 0) {
    return null
  }

  return response.items[0].fields
}

export const getOtherServices = async (serviceSlug: string) => {
  const response = await client.getEntries({
    content_type: 'service',
  })

  if (response.items.length === 0) {
    return []
  }
  const otherServices = response.items.filter((item) => item.fields.slug !== serviceSlug)
  return otherServices
}

export const getCtaByType = async (type: string) => {
  const response = await client.getEntries({
    content_type: 'cta',
    'fields.type': type,
  })

  if (response.items.length === 0) {
    return null
  }

  return response.items[0].fields
}
