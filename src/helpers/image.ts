import { Image } from '@/lib/types'

export const getImageDetails = (image: Image) => {
  const rawUrl = image?.fields?.file?.url || ''
  const imageUrl = rawUrl.startsWith('//')
    ? `https:${rawUrl}`
    : rawUrl.startsWith('http') || rawUrl.startsWith('/')
      ? rawUrl
      : rawUrl

  return {
    imageUrl,
    imageWidth: image?.fields?.file?.details?.image?.width ?? 100,
    imageHeight: image?.fields?.file?.details?.image?.height ?? 100,
    imageDescription: image?.fields?.description || '',
  }
}
