import { Header } from '@/lib/types'
import { SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import {
  MotionHeaderTitleWrapper,
  ImageSlider,
  SliderImage,
  SliderFilter,
  HomeHeaderContainer,
} from './HomeHeader.styles'
import { motion } from 'framer-motion'
import { STAGGER_CONTAINER, FADE_IN_UP } from '@/constants/animation'
import { Link } from 'react-scroll'
import { getImageUrl } from '@/helpers/link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export const HomeHeader: React.FC<Header> = ({ title, subtitle, sliderImages, ctaButtonText }) => {
  return (
    <HomeHeaderContainer>
      <SliderFilter />
      <MotionHeaderTitleWrapper variants={STAGGER_CONTAINER} initial="hidden" animate="show">
        <motion.div variants={FADE_IN_UP}>
          <Typography variant="h6" data-testid="home-subtitle">
            {subtitle}
          </Typography>
        </motion.div>
        <motion.div variants={FADE_IN_UP}>
          <Typography variant="h1" data-testid="home-title">
            {title}
          </Typography>
        </motion.div>
        <motion.div variants={FADE_IN_UP}>
          <Link to="services" smooth={true}>
            <Button variant="contained" data-testid="cta-button" size="large">
              {ctaButtonText}
            </Button>
          </Link>
        </motion.div>
      </MotionHeaderTitleWrapper>
      <ImageSlider
        modules={[Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect="fade"
      >
        {sliderImages.map(({ fields: imageFields }, index) => (
          <SwiperSlide key={index}>
            <SliderImage
              src={getImageUrl(imageFields.file.url)}
              alt={imageFields.description || `Slide ${index + 1}`}
              width={imageFields.file.details.image.width}
              height={imageFields.file.details.image.height}
              data-testid={`slider-image-${index}`}
            />
          </SwiperSlide>
        ))}
      </ImageSlider>
    </HomeHeaderContainer>
  )
}
