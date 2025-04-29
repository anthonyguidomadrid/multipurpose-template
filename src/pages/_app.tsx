import { AppProps } from 'next/app'
import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import getTheme from '@/theme/theme'
import Head from 'next/head'
import '../styles/global.css'
import { getSettings } from '@/lib/contentful'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
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

  return (
    <>
      <Head>
        <html lang={locale || router.locale} />
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
