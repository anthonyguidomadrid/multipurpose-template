import { Box, styled } from '@mui/material'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Swiper } from 'swiper/react'
import { motion } from 'framer-motion'

export const MotionHeaderTitleWrapper = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  padding: theme.spacing(5),
  margin: theme.spacing(5),
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  color: theme.palette.common.white,
}))

export const ImageSlider = styled(Swiper)(() => ({
  width: '100%',
  height: '60vh',
  position: 'relative',
  zIndex: 0,
}))

export const SliderImage = styled(Image)(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}))

export const SliderFilter = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  opacity: 0.3,
  zIndex: 2,
}))
