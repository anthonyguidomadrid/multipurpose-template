import { getImageUrl } from '@/helpers/link'
import { Seo as SeoType } from '@/lib/types'
import Head from 'next/head'

export const Seo: React.FC<SeoType> = ({ metaTitle, metaDescription, ogImage }) => {
  const ogImageUrl = getImageUrl(ogImage.fields.file.url)

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Head>
  )
}
