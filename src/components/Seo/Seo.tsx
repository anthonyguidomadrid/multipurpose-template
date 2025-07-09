import { getImageUrl } from '@/helpers/link'
import { Seo as SeoType } from '@/lib/types'
import { NextSeo } from 'next-seo'

export const Seo: React.FC<SeoType> = ({ metaTitle, metaDescription, ogImage }) => {
  const ogImageUrl = getImageUrl(ogImage.fields.file.url)

  return (
    <NextSeo
      title={metaTitle}
      description={metaDescription}
      openGraph={{
        title: metaTitle,
        description: metaDescription,
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      }}
      twitter={{
        cardType: 'summary_large_image',
      }}
    />
  )
}
