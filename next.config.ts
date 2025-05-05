import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'
import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

if (process.env.NODE_ENV === 'development') {
  setupDevPlatform()
}

const nextConfig: NextConfig = {}

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json'
  }
})
export default withNextIntl(nextConfig)
