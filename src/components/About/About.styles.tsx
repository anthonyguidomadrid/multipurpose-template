import { styled } from '@mui/material'
import Image from 'next/image'

export const AboutImage = styled(Image)(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  maxHeight: '400px',
  [theme.breakpoints.up('lg')]: {
    maxHeight: '600px',
  },
}))
