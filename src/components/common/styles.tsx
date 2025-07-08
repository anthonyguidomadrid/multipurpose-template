import Box from "@mui/material/Box"
import Grid2 from "@mui/material/Grid2"
import styled from "@mui/material/styles/styled"

export const SectionWrapper = styled(Grid2)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto',
  padding: theme.spacing(4),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(8, 2),
  },
}))

export const SectionWithBackground = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  paddingTop: theme.spacing(8),
}))

export const BackgroundImage = styled(Box)<{
  backgroundImage: string
  backgroundPosition?: string
}>(({ backgroundImage, backgroundPosition }) => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: backgroundPosition || 'center',
  zIndex: 1,
  filter: 'opacity(0.7)',
}))

export const Overlay = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  width: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}))
