import type { NextConfig } from 'next'
import nextI18NextConfig from './next-i18next.config'

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
}

export default nextConfig
