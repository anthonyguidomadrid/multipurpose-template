import type { NextConfig } from 'next'
import nextI18NextConfig from './next-i18next.config'
import withBundleAnalyzer from '@next/bundle-analyzer'

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const hostHas = (value: string) => ({ type: 'host', value }) as const
const headerHas = (key: string, value: string) => ({ type: 'header', key, value }) as const

const getCanonicalSiteUrl = () => {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || '').trim()
  if (!raw) return null
  try {
    const url = new URL(raw)
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.replace(/^www\./, '')
    }
    return url
  } catch {
    return null
  }
}

const nextConfig: NextConfig = {
  i18n: nextI18NextConfig.i18n,
  trailingSlash: false,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'swiper',
      'react-h5-audio-player',
      'react-image-lightbox',
      'react-scroll',
      '@react-google-maps/api',
    ],
  },
  async redirects() {
    const canonicalUrl = getCanonicalSiteUrl()
    if (!canonicalUrl) return []

    const canonicalHost = canonicalUrl.host
    const canonicalOrigin = canonicalUrl.origin

    const hasWww = canonicalHost.startsWith('www.')
    const wwwHost = hasWww ? canonicalHost : `www.${canonicalHost}`
    const nonWwwHost = hasWww ? canonicalHost.replace(/^www\./, '') : canonicalHost
    const nonCanonicalHost = hasWww ? nonWwwHost : wwwHost

    return [
      // Normalize hostname (www <-> non-www) to match NEXT_PUBLIC_SITE_URL.
      {
        source: '/:path*',
        has: [hostHas(nonCanonicalHost)],
        destination: `${canonicalOrigin}/:path*`,
        permanent: true,
      },
      // Normalize protocol to HTTPS when canonical origin is HTTPS.
      ...(canonicalUrl.protocol === 'https:'
        ? [
            {
              source: '/:path*',
              has: [hostHas(canonicalHost), headerHas('x-forwarded-proto', 'http')],
              destination: `${canonicalOrigin}/:path*`,
              permanent: true,
            },
          ]
        : []),
    ]
  },
}

export default withAnalyzer(nextConfig)
