import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../../next-i18next.config'

import { getContact, getMenu, getReviews, getSettings } from '@/lib/contentful'
import type { Contact, Image, Menu, Testimonial, ThemeSettings } from '@/lib/types'

export type AppSettings = ThemeSettings & {
  faviconPng: Image
  faviconSvg: Image
  faviconIco: Image
}

export async function getCommonPageProps(locale: string) {
  const safeLocale = locale || 'en'

  const [settings, contact, menu, reviews] = await Promise.all([
    getSettings() as Promise<AppSettings>,
    getContact() as Promise<Contact>,
    getMenu() as Promise<Menu>,
    (getReviews() as unknown as Promise<Testimonial[]>),
  ])

  return {
    ...(await serverSideTranslations(safeLocale, ['common'], nextI18NextConfig)),
    settings,
    contact,
    menu,
    reviews,
  }
}
