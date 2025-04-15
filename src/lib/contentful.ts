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

export const getName = async () => {
  const response = await client.getEntries({
    content_type: 'test',
  })
  return response.items[0].fields.name as string
}

export const getHomePage = async () => {
  const response = await client.getEntries({
    content_type: 'home',
  })

  if (response.items.length === 0) {
    throw new Error('No Home page data found in Contentful')
  }

  return response.items[0].fields as unknown as HomePage
}
