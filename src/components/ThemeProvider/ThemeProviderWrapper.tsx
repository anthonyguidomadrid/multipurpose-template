'use client'
import { getSettings } from '@/lib/contentful'
import getTheme from '@/theme/theme'
import createTheme from '@mui/material/styles/createTheme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { useEffect, useState } from 'react'

type ThemeProviderWrapperProps = {
  children: React.ReactNode
}

export default function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  const [theme, setTheme] = useState(createTheme())

  useEffect(() => {
    const loadTheme = async () => {
      const settings = await getSettings()
      const customTheme = getTheme(settings)

      setTheme(customTheme)
    }

    loadTheme()
  }, [])
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
