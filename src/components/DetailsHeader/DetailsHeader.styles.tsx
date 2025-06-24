import { Box, Breadcrumbs, styled } from '@mui/material'
import Link from 'next/link'

export const DetailsHeaderWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: 200,
  display: 'flex',
  alignItems: 'flex-end',
  color: theme.palette.common.white,
  overflow: 'hidden',
  mb: 4,
  transition: 'min-height 0.3s ease-in-out',
  backgroundColor: theme.palette.background.paper,

  [theme.breakpoints.up('md')]: {
    minHeight: 320,
  },
}))

export const BackgroundImage = styled(Box)<{ backgroundImage: string; backgroundPosition: string }>(
  ({ backgroundImage, backgroundPosition }) => ({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: backgroundPosition,
    zIndex: 1,
    filter: 'opacity(0.7)',
  })
)

export const Overlay = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  width: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}))

export const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  color: theme.palette.common.white,
}))

export const BreadcrumbLabel = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textTransform: 'uppercase',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))
