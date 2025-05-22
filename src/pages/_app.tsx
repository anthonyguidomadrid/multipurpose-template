import { AppProps } from 'next/app'
import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import getTheme from '@/theme/theme'
import Head from 'next/head'
import '../styles/global.css'
import { getSettings } from '@/lib/contentful'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }: AppProps) {
  const { settings } = pageProps
  const locale = settings?.locale
  const router = useRouter()

  useEffect(() => {
    if (locale !== router.locale) {
      router.push(router.asPath, router.asPath, { locale })
    }
  }, [locale, router])

  if (!settings) {
    return <CircularProgress />
  }

  const fontFamily = settings.bodyFont.replaceAll(' ', '+')
  const googleFontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`

  return (
    <>
      <Head>
        <html lang={locale || router.locale} />
        <link href={googleFontUrl} rel="stylesheet" />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={getTheme(settings)}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

App.getInitialProps = async () => {
  const settings = await getSettings()
  return { pageProps: { settings } }
}

export default appWithTranslation(App)
