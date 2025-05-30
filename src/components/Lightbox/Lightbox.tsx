import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

interface GalleryLightBoxProps {
  images: string[]
  setLightboxOpen: (open: boolean) => void
  galleryImages: { fields: { description: string } }[]
  photoIndex: number
  setPhotoIndex: (index: number) => void
}

export const GalleryLightbox = ({
  images,
  setLightboxOpen,
  galleryImages,
  photoIndex,
  setPhotoIndex,
}: GalleryLightBoxProps) => (
  <Lightbox
    mainSrc={images[photoIndex]}
    nextSrc={images[(photoIndex + 1) % images.length]}
    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
    onCloseRequest={() => setLightboxOpen(false)}
    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
    imageCaption={galleryImages[photoIndex].fields.description}
  />
)
