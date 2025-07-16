import { Image } from '@/lib/types'

export const getImageDetails = (image: Image) => {
  return {
    imageUrl: `https:${image.fields.file.url}`,
    imageWidth: image.fields.file.details?.image?.width,
    imageHeight: image.fields.file.details?.image?.height,
    imageDescription: image.fields.description,
  }
}
