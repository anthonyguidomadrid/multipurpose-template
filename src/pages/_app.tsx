import { AppProps, AppType } from 'next/app'
import getTheme from '@/theme/theme'
import Head from 'next/head'
import '../styles/global.css'
import { getContact, getMenu, getReviews, getSettings } from '@/lib/contentful'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import 'swiper/css'
import 'swiper/css/pagination'
import { getImageUrl } from '@/helpers/link'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import CssBaseline from '@mui/material/CssBaseline'
import { OrganizationJsonLd } from 'next-seo'
import { Testimonial } from '@/lib/types'
import { Oswald, Mrs_Saint_Delafield, Open_Sans } from 'next/font/google'
import { GoogleAnalytics } from 'nextjs-google-analytics'

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

const App: AppType = ({ Component, pageProps }: AppProps) => {
  const { settings, contact, menu, reviews } = pageProps
  const { locale, websiteName, faviconPng, faviconSvg, faviconIco } = settings
  const router = useRouter()

  useEffect(() => {
    if (locale !== router.locale) {
      router.push(router.asPath, router.asPath, { locale })
    }
  }, [locale, router])

  const faviconPngUrl = getImageUrl(faviconPng.fields.file.url)
  const faviconSvgUrl = getImageUrl(faviconSvg.fields.file.url)
  const faviconIcoUrl = getImageUrl(faviconIco.fields.file.url)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const socialMediaUrls = [
    contact.facebookUrl,
    contact.instagramUrl,
    contact.linkedInUrl,
    contact.twitterUrl,
  ].filter(Boolean)

  return (
    <>
      <OrganizationJsonLd
        type="LocalBusiness"
        id={siteUrl}
        name={websiteName}
        url={siteUrl}
        logo={faviconPngUrl}
        sameAs={socialMediaUrls}
        contactPoint={[
          {
            telephone: contact.phone,
            contactType: 'customer service',
            email: contact.email,
          },
        ]}
        address={{
          streetAddress: contact.address.fields.streetAddress,
          addressLocality: contact.address.fields.city,
          addressRegion: contact.address.fields.region,
          postalCode: contact.address.fields.postalCode,
          addressCountry: contact.address.fields.country,
        }}
        reviews={reviews.map(({ fields: { title, description, author, date } }: Testimonial) => ({
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
            className={`${openSans.className} ${oswald.className} ${mrsSaintDelafield.className}`}
            {...pageProps}
          />
        </PageWrapper>
      </ThemeProvider>
    </>
  )
}

App.getInitialProps = async () => {
  const settings = await getSettings()
  const contact = await getContact()
  const menu = await getMenu()
  const reviews = await getReviews()
  return { pageProps: { settings, contact, menu, reviews } }
}

export default appWithTranslation(App)
