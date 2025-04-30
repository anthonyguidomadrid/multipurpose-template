import { styled } from '@mui/material'
import { Swiper } from 'swiper/react'

export const Slider = styled(Swiper)(({ theme }) => ({
  height: '600px',
  [theme.breakpoints.up('sm')]: {
    height: '400px',
  },
  [theme.breakpoints.up('md')]: {
    height: '300px',
  },
}))
