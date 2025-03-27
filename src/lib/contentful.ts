import { createClient } from 'contentful'

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

  const settings = response.items[0].fields

  return {
    locale: settings.locale as string,
    primaryColor: settings.primaryColor as string,
    secondaryColor: settings.secondaryColor as string,
    titleFont: settings.titleFont as string,
    bodyFont: settings.bodyFont as string,
  }
}

export const getName = async () => {
  const response = await client.getEntries({
    content_type: 'test',
  })
  console.log({ response })
  return response.items[0].fields.name as string
}
