import { COMMON_PAGE_WRAPPER } from '@/constants/spacing'
import { Grid2, styled } from '@mui/material'
import Image from 'next/image'

export const AboutContainer = styled(Grid2)(({ theme }) => ({
  ...COMMON_PAGE_WRAPPER,
  padding: theme.spacing(4),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(8, 2),
  },
}))

export const AboutImage = styled(Image)(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  maxHeight: '400px',
  [theme.breakpoints.up('lg')]: {
    maxHeight: '600px',
  },
}))
