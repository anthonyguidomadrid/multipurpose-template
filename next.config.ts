import type { NextConfig } from 'next'
import nextI18NextConfig from './next-i18next.config'
import withBundleAnalyzer from '@next/bundle-analyzer'

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  i18n: nextI18NextConfig.i18n,
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
}

export default withAnalyzer(nextConfig)
