import { styled } from '@mui/material'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Swiper } from 'swiper/react'
import { motion } from 'framer-motion'

export const MotionHeaderTitleWrapper = styled(motion.div)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  color: theme.palette.common.white,
  height: '100%',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}))

export const ImageSlider = styled(Swiper)(() => ({ width: '100%', height: '400px' }))

export const SliderImage = styled(Image)(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}))
