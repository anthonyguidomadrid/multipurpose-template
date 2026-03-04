import { AppProps, AppType } from 'next/app'
import getTheme from '@/theme/theme'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import 'swiper/css'
import 'swiper/css/pagination'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalBusinessJsonLd } from 'next-seo'
import { Contact, Menu, Testimonial } from '@/lib/types'
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
import type { AppSettings } from '@/lib/commonPageProps'

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
  const settings = pageProps?.settings as AppSettings | undefined
  const contact = pageProps?.contact as Contact | undefined
  const menu = pageProps?.menu as Menu | undefined
  const reviews = pageProps?.reviews as Testimonial[] | undefined

  if (!settings || !contact || !menu) {
    throw new Error(
      'Missing global page props (settings/contact/menu). Make sure your page getStaticProps spreads getCommonPageProps(locale).'
    )
  }

  const safeReviews: Testimonial[] = reviews ?? []

  const { locale, websiteName, faviconPng, faviconIco, faviconSvg } = settings
  const router = useRouter()

  useEffect(() => {
    if (locale !== router.locale) {
      router.push(router.asPath, router.asPath, { locale })
    }
  }, [locale, router])
  const faviconPngUrl = faviconPng.fields.file.url
  const faviconSvgUrl = faviconSvg.fields.file.url
  const faviconIcoUrl = faviconIco.fields.file.url
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
        review={safeReviews.map(
          ({ fields: { title, description, author, date } }: Testimonial) => ({
            author: author ? { '@type': 'Person', name: author } : undefined,
            datePublished: date,
            name: title,
            reviewBody: description,
            reviewRating: {
              ratingValue: '5',
            },
          })
        )}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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

export default appWithTranslation(App, nextI18NextConfig)
