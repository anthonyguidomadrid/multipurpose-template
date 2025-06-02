import { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import getTheme from '@/theme/theme'
import Head from 'next/head'
import '../styles/global.css'
import { getContact, getSettings } from '@/lib/contentful'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { appWithTranslation } from 'next-i18next'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'

function App({ Component, pageProps }: AppProps) {
  const { settings, contact } = pageProps
  const { locale, bodyFont, websiteName } = settings
  const router = useRouter()

  useEffect(() => {
    if (locale !== router.locale) {
      router.push(router.asPath, router.asPath, { locale })
    }
  }, [locale, router])

  const fontFamily = bodyFont.replaceAll(' ', '+')
  const googleFontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`

  return (
    <>
      <Head>
        <html lang={locale || router.locale} />
        <link href={googleFontUrl} rel="stylesheet" />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={getTheme(settings)}>
        <PageWrapper contact={contact} websiteName={websiteName}>
          <Component {...pageProps} />
        </PageWrapper>
      </ThemeProvider>
    </>
  )
}

App.getInitialProps = async () => {
  const settings = await getSettings()
  const contact = await getContact()
  return { pageProps: { settings, contact } }
}

export default appWithTranslation(App)
