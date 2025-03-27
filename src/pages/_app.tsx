import { AppProps } from 'next/app'
import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import getTheme from '@/theme/theme'
import Head from 'next/head'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  const { settings } = pageProps

  if (!settings) {
    return <CircularProgress />
  }

  return (
    <>
      <Head>
        <html lang={settings?.locale || 'en'} />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={getTheme(settings)}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
