import { AppProps, AppType } from 'next/app'
import getTheme from '@/theme/theme'
import Head from 'next/head'
import { getContact, getMenu, getReviews, getSettings } from '@/lib/contentful'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import 'swiper/css'
import 'swiper/css/pagination'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalBusinessJsonLd } from 'next-seo'
import { Contact, Image, Menu, Testimonial, ThemeSettings } from '@/lib/types'
import {
  Oswald,
  Mrs_Saint_Delafield,
  Open_Sans,
  Poiret_One,
  Splash,
  Just_Me_Again_Down_Here,
} from 'next/font/google'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { getImageDetails } from '@/helpers/image'
import { BLOCKS, Document } from '@contentful/rich-text-types'

type AppSettings = ThemeSettings & {
  faviconPng: Image
  faviconSvg: Image
  faviconIco: Image
}

const EMPTY_RICH_TEXT: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [],
}

const FALLBACK_IMAGE: Image = {
  fields: {
    title: '',
    description: '',
    file: {
      url: '/images/home-page.jpg',
      fileName: 'home-page.jpg',
      contentType: 'image/jpeg',
      details: {
        size: 0,
        image: {
          width: 1200,
          height: 800,
        },
      },
    },
  },
}

const getFallbackSettings = (): AppSettings => ({
  websiteName: 'Website',
  locale: 'en',
  faviconPng: FALLBACK_IMAGE,
  faviconSvg: FALLBACK_IMAGE,
  faviconIco: FALLBACK_IMAGE,
  pageNotFoundBackgroundImage: FALLBACK_IMAGE,
})

const getFallbackContact = (): Contact => ({
  email: '',
  phone: '',
  galleryImages: [],
  privacyPolicy: EMPTY_RICH_TEXT,
  address: {
    fields: {
      streetAddress: '',
      city: '',
      region: '',
      postalCode: '',
      country: '',
    },
  },
})

const getFallbackMenu = (): Menu => ({
  logo: FALLBACK_IMAGE,
  menuItems: [],
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const mrsSaintDelafield = Mrs_Saint_Delafield({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
})

const poiretOne = Poiret_One({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const splash = Splash({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const justMeAgainDownHere = Just_Me_Again_Down_Here({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const App: AppType = ({ Component, pageProps }: AppProps) => {
  const rawSettings = pageProps?.settings as AppSettings | undefined
  const rawContact = pageProps?.contact as Contact | undefined
  const rawMenu = pageProps?.menu as Menu | undefined

  const fallbackSettings = getFallbackSettings()
  const fallbackContact = getFallbackContact()
  const fallbackMenu = getFallbackMenu()

  const settings: AppSettings = {
    ...fallbackSettings,
    ...rawSettings,
    faviconPng: rawSettings?.faviconPng ?? fallbackSettings.faviconPng,
    faviconSvg: rawSettings?.faviconSvg ?? fallbackSettings.faviconSvg,
    faviconIco: rawSettings?.faviconIco ?? fallbackSettings.faviconIco,
    pageNotFoundBackgroundImage:
      rawSettings?.pageNotFoundBackgroundImage ?? fallbackSettings.pageNotFoundBackgroundImage,
  }

  const contact: Contact = {
    ...fallbackContact,
    ...rawContact,
    galleryImages: rawContact?.galleryImages ?? fallbackContact.galleryImages,
    privacyPolicy: rawContact?.privacyPolicy ?? fallbackContact.privacyPolicy,
    address: rawContact?.address ?? fallbackContact.address,
  }

  const menu: Menu = {
    ...fallbackMenu,
    ...rawMenu,
    logo: rawMenu?.logo ?? fallbackMenu.logo,
    menuItems: rawMenu?.menuItems ?? fallbackMenu.menuItems,
  }
  const reviews: Testimonial[] = (pageProps?.reviews as Testimonial[] | undefined) ?? []

  const { locale, websiteName, faviconPng, faviconSvg, faviconIco } = settings
  const router = useRouter()

  useEffect(() => {
    if (locale !== router.locale) {
      router.push(router.asPath, router.asPath, { locale })
    }
  }, [locale, router])

  // Keep favicons stable and local (also matches Playwright expectations).
  // Contentful-driven favicons can still be wired back in later if desired.
  const faviconPngUrl = '/favicon.png'
  const faviconSvgUrl = '/favicon.svg'
  const faviconIcoUrl = '/favicon.ico'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const socialMediaUrls = [
    contact.facebookUrl,
    contact.instagramUrl,
    contact.linkedInUrl,
    contact.twitterUrl,
  ].filter((url): url is string => Boolean(url))

  return (
    <>
      <LocalBusinessJsonLd
        type="LocalBusiness"
        name={websiteName}
        url={siteUrl}
        image={getImageDetails(menu.logo).imageUrl}
        telephone={contact.phone}
        email={contact.email}
        sameAs={socialMediaUrls}
        address={
          contact.address && {
            streetAddress: contact.address.fields.streetAddress,
            addressLocality: contact.address.fields.city,
            addressRegion: contact.address.fields.region,
            postalCode: contact.address.fields.postalCode,
            addressCountry: contact.address.fields.country,
          }
        }
        review={reviews.map(({ fields: { title, description, author, date } }: Testimonial) => ({
          author,
          datePublished: date,
          name: title,
          reviewBody: description,
          reviewRating: {
            ratingValue: '5',
          },
        }))}
      />
      <Head>
        <html lang={locale || router.locale} />
        <link rel="icon" href={faviconIcoUrl} sizes="16x16 32x32 48x48" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="32x32" href={faviconPngUrl} />
        <link rel="icon" type="image/png" sizes="16x16" href={faviconPngUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href={faviconPngUrl} />
        <link rel="icon" type="image/svg+xml" href={faviconSvgUrl} />
      </Head>
      <GoogleAnalytics trackPageViews />
      <CssBaseline />
      <ThemeProvider theme={getTheme(settings)}>
        <PageWrapper contact={contact} websiteName={websiteName} menu={menu}>
          <Component
            className={`${openSans.className} ${oswald.className} ${mrsSaintDelafield.className} ${poiretOne.className} ${splash.className} ${justMeAgainDownHere.className}`}
            {...pageProps}
          />
        </PageWrapper>
      </ThemeProvider>
    </>
  )
}

App.getInitialProps = async () => {
  let settings = getFallbackSettings()
  let contact = getFallbackContact()
  let menu = getFallbackMenu()
  let reviews: Testimonial[] = []

  try {
    const fetched = (await getSettings()) as AppSettings
    settings = {
      ...settings,
      ...fetched,
      faviconPng: fetched?.faviconPng ?? settings.faviconPng,
      faviconSvg: fetched?.faviconSvg ?? settings.faviconSvg,
      faviconIco: fetched?.faviconIco ?? settings.faviconIco,
      pageNotFoundBackgroundImage:
        fetched?.pageNotFoundBackgroundImage ?? settings.pageNotFoundBackgroundImage,
    }
  } catch (error) {
    console.error('Contentful getSettings failed in _app.getInitialProps', error)
  }

  try {
    const fetched = (await getContact()) as Contact
    contact = {
      ...contact,
      ...fetched,
      galleryImages: fetched?.galleryImages ?? contact.galleryImages,
      privacyPolicy: fetched?.privacyPolicy ?? contact.privacyPolicy,
      address: fetched?.address ?? contact.address,
    }
  } catch (error) {
    console.error('Contentful getContact failed in _app.getInitialProps', error)
  }

  try {
    const fetched = (await getMenu()) as Menu
    menu = {
      ...menu,
      ...fetched,
      logo: fetched?.logo ?? menu.logo,
      menuItems: fetched?.menuItems ?? menu.menuItems,
    }
  } catch (error) {
    console.error('Contentful getMenu failed in _app.getInitialProps', error)
  }

  try {
    reviews = (await getReviews()) as unknown as Testimonial[]
  } catch (error) {
    console.error('Contentful getReviews failed in _app.getInitialProps', error)
  }

  return { pageProps: { settings, contact, menu, reviews } }
}

export default appWithTranslation(App)
