import Image from 'next/image'
import 'swiper/css/effect-fade'
import { Swiper } from 'swiper/react'
import { motion } from 'framer-motion'
import styled from '@mui/material/styles/styled'
import Box from '@mui/material/Box'

export const HomeHeaderContainer = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  height: '60vh',
}))

export const MotionHeaderTitleWrapper = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  width: '100%',
  padding: theme.spacing(2),
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.common.white,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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

