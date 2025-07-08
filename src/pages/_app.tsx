import { AppProps, AppType } from 'next/app'
import getTheme from '@/theme/theme'
import Head from 'next/head'
import '../styles/global.css'
import { getContact, getMenu, getSettings } from '@/lib/contentful'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import 'swiper/css'
import 'swiper/css/pagination'
import { getImageUrl } from '@/helpers/link'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import CssBaseline from '@mui/material/CssBaseline'

const App: AppType = ({ Component, pageProps }: AppProps) => {
  const { settings, contact, menu } = pageProps
  const { locale, bodyFont, websiteName, faviconPng, faviconSvg, faviconIco } = settings
  const router = useRouter()

  useEffect(() => {
    if (locale !== router.locale) {
      router.push(router.asPath, router.asPath, { locale })
    }
  }, [locale, router])

  const fontFamily = bodyFont.replaceAll(' ', '+')
  const googleFontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`

  const faviconPngUrl = getImageUrl(faviconPng.fields.file.url)
  const faviconSvgUrl = getImageUrl(faviconSvg.fields.file.url)
  const faviconIcoUrl = getImageUrl(faviconIco.fields.file.url)

  return (
    <>
      <Head>
        <html lang={locale || router.locale} />
        <link href={googleFontUrl} rel="stylesheet" />
        <link rel="icon" href={faviconIcoUrl} sizes="16x16 32x32 48x48" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="32x32" href={faviconPngUrl} />
        <link rel="icon" type="image/png" sizes="16x16" href={faviconPngUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href={faviconPngUrl} />
        <link rel="icon" type="image/svg+xml" href={faviconSvgUrl} />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={getTheme(settings)}>
        <PageWrapper contact={contact} websiteName={websiteName} menu={menu}>
          <Component {...pageProps} />
        </PageWrapper>
      </ThemeProvider>
    </>
  )
}

App.getInitialProps = async () => {
  const settings = await getSettings()
  const contact = await getContact()
  const menu = await getMenu()
  return { pageProps: { settings, contact, menu } }
}

export default appWithTranslation(App)
