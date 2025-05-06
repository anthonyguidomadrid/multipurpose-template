import { ThemeSettings } from '@/lib/types'
import { createTheme } from '@mui/material/styles'

const DEFAULT_COLORS = {
  PRIMARY: '#1976d2',
  SECONDARY: '#dc004e',
  BODY: '#000000',
  NEUTRAL: '#ffffff',
  ACCENT: '#f5f5f5',
  TITLEFONT: 'Roboto, cursive',
  BODYFONT: 'Arial, sans-serif',
}

const DEFAULT_FONTS = {
  TITLE: 'Roboto, cursive',
  BODY: 'Arial, sans-serif',
}

const getTheme = ({
  primaryColor,
  secondaryColor,
  bodyFont,
  bodyColor,
  titleFont,
  neutralColor,
  accentColor,
}: ThemeSettings) => {
  return createTheme({
    palette: {
      primary: {
        main: primaryColor || DEFAULT_COLORS.PRIMARY,
      },
      secondary: {
        main: secondaryColor || DEFAULT_COLORS.SECONDARY,
      },
      text: {
        primary: bodyColor || DEFAULT_COLORS.BODY,
        secondary: DEFAULT_COLORS.BODY,
      },
      background: {
        default: neutralColor || DEFAULT_COLORS.NEUTRAL,
        paper: accentColor || DEFAULT_COLORS.ACCENT,
      },
    },
    typography: {
      fontFamily: `${bodyFont || DEFAULT_FONTS.BODY}`,
      h1: {
        fontFamily: `${titleFont || DEFAULT_FONTS.TITLE}`,
        fontSize: '6rem',
        ['@media (max-width:600px)']: {
          fontSize: '5rem',
        },
      },
      h2: {
        fontFamily: `${titleFont || DEFAULT_FONTS.TITLE}`,
        color: secondaryColor || DEFAULT_COLORS.SECONDARY,
      },
      h3: {
        textTransform: 'uppercase',
        fontSize: '1.5rem',
      },
      h6: {
        textTransform: 'uppercase',
        fontWeight: 100,
        fontSize: '1.25rem',
        marginBottom: '0.5rem',
        ['@media (max-width:600px)']: {
          fontSize: '1rem',
        },
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            color: '#ffffff',
          },
        },
      },
    },
  })
}

export default getTheme
