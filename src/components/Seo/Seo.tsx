import { getImageDetails } from '@/helpers/image'
import { Seo as SeoType } from '@/lib/types'
import Head from 'next/head'
import { generateNextSeo } from 'next-seo/pages'
import { useRouter } from 'next/router'

const stripQueryAndHash = (path: string) => path.split('#')[0].split('?')[0]

const normalizeSiteUrl = (siteUrl: string) => {
  if (!siteUrl) return ''
  try {
    const url = new URL(siteUrl)
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.replace(/^www\./, '')
    }
    return url.origin
  } catch {
    return siteUrl
  }
}

const joinUrl = (baseUrl: string, path: string) => {
  const trimmedBase = baseUrl.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${trimmedBase}${normalizedPath}`
}

const toAbsoluteUrl = (url: string, siteUrl: string) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('//')) return `https:${url}`
  if (url.startsWith('/')) {
    if (!siteUrl) return url
    return joinUrl(siteUrl, url)
  }
  return url
}

export const Seo: React.FC<SeoType> = ({ metaTitle, metaDescription, ogImage }) => {
  const router = useRouter()
  const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || '')
  const path = stripQueryAndHash(router.asPath || '/')
  const canonical = siteUrl ? joinUrl(siteUrl, path) : undefined

  const ogImageUrl = toAbsoluteUrl(getImageDetails(ogImage).imageUrl, siteUrl)

  return (
    <Head>
      {generateNextSeo({
        title: metaTitle,
        description: metaDescription,
        canonical,
        openGraph: {
          title: metaTitle,
          description: metaDescription,
          url: canonical,
          siteName: siteUrl ? new URL(siteUrl).hostname : undefined,
          images: [{ url: ogImageUrl, width: 1200, height: 630 }],
        },
        twitter: {
          cardType: 'summary_large_image',
        },
      })}
    </Head>
  )
}
