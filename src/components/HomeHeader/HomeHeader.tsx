import { Header } from '@/lib/types'
import { Box, Button, Grid2, Typography } from '@mui/material'
import { SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { MotionHeaderTitleWrapper, ImageSlider, SliderImage } from './HomeHeader.styles'
import { motion } from 'framer-motion'

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const HomeHeader: React.FC<Header> = ({ title, subtitle, sliderImages, ctaButtonText }) => {
  return (
    <Grid2 container>
      <Grid2 size={{ xs: 12, md: 4 }} order={{ xs: 2, md: 1 }}>
        <MotionHeaderTitleWrapper variants={staggerContainer} initial="hidden" animate="show">
          <motion.div variants={fadeInUp}>
            <Typography variant="h6">{subtitle}</Typography>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Typography variant="h1">{title}</Typography>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Box>
              <Button variant="contained">{ctaButtonText}</Button>
            </Box>
          </motion.div>
        </MotionHeaderTitleWrapper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 8 }} order={{ xs: 1, md: 2 }}>
        <ImageSlider
          modules={[Autoplay, EffectFade]}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          effect="fade"
        >
          {sliderImages.map(({ fields: imageFields }, index) => (
            <SwiperSlide key={index}>
              <SliderImage
                src={`https:${imageFields.file.url}`}
                alt={imageFields.description || `Slide ${index + 1}`}
                width={imageFields.file.details.image.width}
                height={imageFields.file.details.image.height}
              />
            </SwiperSlide>
          ))}
        </ImageSlider>
      </Grid2>
    </Grid2>
  )
}
