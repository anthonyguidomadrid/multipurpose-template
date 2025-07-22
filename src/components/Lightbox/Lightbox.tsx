import Lightbox from 'react-image-lightbox'
import { Image } from '@/lib/types'
import 'react-image-lightbox/style.css'

interface GalleryLightBoxProps {
  setLightboxOpen: (open: boolean) => void
  galleryImages: Image[]
  photoIndex: number
  setPhotoIndex: (index: number) => void
}

export const GalleryLightbox = ({
  setLightboxOpen,
  galleryImages,
  photoIndex,
  setPhotoIndex,
}: GalleryLightBoxProps) => {
  const imagesUrl = galleryImages.map((img) => img.fields.file.url)

  return (
    <Lightbox
      mainSrc={imagesUrl[photoIndex]}
      nextSrc={imagesUrl[(photoIndex + 1) % imagesUrl.length]}
      prevSrc={imagesUrl[(photoIndex + imagesUrl.length - 1) % imagesUrl.length]}
      onCloseRequest={() => setLightboxOpen(false)}
      onMovePrevRequest={() =>
        setPhotoIndex((photoIndex + imagesUrl.length - 1) % imagesUrl.length)
      }
      onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % imagesUrl.length)}
      imageCaption={galleryImages[photoIndex].fields.description}
    />
  )
}
