import { ThemeSettings } from '@/lib/types'
import { createTheme } from '@mui/material/styles'

const getTheme = ({
  primaryColor,
  secondaryColor,
  bodyFont,
  bodyColor,
  titleFont,
  neutralColor,
  accentColor,
}: ThemeSettings) =>
  createTheme({
    palette: {
      primary: {
        main: primaryColor || '#1976d2',
      },
      secondary: {
        main: secondaryColor || '#dc004e',
      },
      text: {
        primary: bodyColor || '#000000',
        secondary: '#ffffff',
      },
      background: {
        default: neutralColor || '#ffffff',
        paper: accentColor || '#f5f5f5',
      },
    },
    typography: {
      fontFamily: `${bodyFont}, Arial, sans-serif`,
      h1: {
        fontFamily: `${titleFont}, cursive`,
      },
      h2: {
        fontFamily: `${titleFont}, cursive`,
      },
    },
  })

export default getTheme
