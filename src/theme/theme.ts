import { createTheme } from '@mui/material/styles'

type ThemeSettings = {
  primaryColor?: string
  secondaryColor?: string
  titleFont?: string
  bodyFont?: string
}

const getTheme = (settings: ThemeSettings) =>
  createTheme({
    palette: {
      primary: {
        main: settings.primaryColor || '#1976d2',
      },
      secondary: {
        main: settings.secondaryColor || '#dc004e',
      },
    },
    typography: {
      fontFamily: `${settings.bodyFont}, Arial, sans-serif`,
      h1: {
        fontFamily: `${settings.titleFont}, cursive`,
      },
      h2: {
        fontFamily: `${settings.titleFont}, cursive`,
      },
    },
  })

export default getTheme
