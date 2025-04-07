import { Header } from '@/lib/types'
import { Button, Grid2, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade';
import Image from 'next/image'
import { Autoplay, EffectFade } from 'swiper/modules'

export const HomeHeader: React.FC<Header> = ({ title, subtitle, sliderImages, ctaButtonText }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={5}>
        <Typography variant="h6">{subtitle}</Typography>
        <Typography variant="h1">{title}</Typography>
        <Button variant="contained">{ctaButtonText}</Button>
      </Grid2>
      <Grid2 size={7}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          effect="fade"
          style={{ width: '100%', height: '400px' }}
        >
          {sliderImages.map(({ fields: imageFields }, index) => (
            <SwiperSlide key={index}>
              <Image
                src={`https:${imageFields.file.url}`}
                alt={imageFields.description || `Slide ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                width={imageFields.file.details.image.width}
                height={imageFields.file.details.image.height}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid2>
    </Grid2>
  )
}
