import { Box, Grid2, Paper, PaperTypeMap, styled, Typography } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import Image from 'next/image'
import Link from 'next/link'

export const FooterWrapper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(6, 2),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
})) as OverridableComponent<PaperTypeMap<object, 'div'>>

export const ImageGrid = styled(Image)(() => ({
  width: '100%',
  height: '100%',
  aspectRatio: '1/1',
  objectFit: 'cover',
  borderRadius: 1,
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease-in-out',
  },
}))

export const CopywrightWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  background: theme.palette.background.paper,
  padding: theme.spacing(0, 2, 2),
  color: theme.palette.common.white,
}))

export const FooterLink = styled(Link)(() => ({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

export const FooterTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}))

export const ContactInfoWrapper = styled(Grid2)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
}))

export const ContactWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-start',
  },
}))
