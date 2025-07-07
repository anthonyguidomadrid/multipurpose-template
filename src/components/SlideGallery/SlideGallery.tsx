import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Image } from '@/lib/types'
import 'swiper/css/navigation'
import { useState } from 'react'
import { GalleryLightbox } from '../Lightbox/Lightbox'
import { GalleryImage } from './SlideGallery.styles'
import { motion } from 'framer-motion'
import { FADE_IN_VARIANTS } from '@/constants/animation'
import { getImageUrl } from '@/helpers/link'

interface SlideGalleryProps {
  images: Image[]
}

export const SlideGallery: React.FC<SlideGalleryProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  return (
    <>
      <Swiper
        spaceBetween={30}
        grabCursor={true}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {images.map(({ fields }, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
              variants={FADE_IN_VARIANTS}
            >
              <GalleryImage
                src={getImageUrl(fields.file.url)}
                alt={fields.title}
                width={fields.file.details.image.width}
                height={fields.file.details.image.height}
                onClick={() => {
                  setPhotoIndex(index)
                  setLightboxOpen(true)
                }}
                data-testid={`slide-gallery-image-${index}`}
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      {lightboxOpen && (
        <GalleryLightbox
          setLightboxOpen={setLightboxOpen}
          galleryImages={images}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      )}
    </>
  )
}
