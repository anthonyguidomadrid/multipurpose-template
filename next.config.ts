import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'es-CO', 'fr-BE'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
}

export default nextConfig
