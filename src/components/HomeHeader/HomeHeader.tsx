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
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { getImageDetails } from '@/helpers/image'

export const HomeHeader: React.FC<Header> = ({ title, subtitle, sliderImages, ctaButtonText }) => (
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
      {sliderImages.map((image, index) => {
        const { imageUrl, imageDescription, imageWidth, imageHeight } = getImageDetails(image)
        return (
          <SwiperSlide key={index}>
            <SliderImage
              src={imageUrl}
              alt={imageDescription}
              width={imageWidth}
              height={imageHeight}
              data-testid={`slider-image-${index}`}
            />
          </SwiperSlide>
        )
      })}
    </ImageSlider>
  </HomeHeaderContainer>
)
