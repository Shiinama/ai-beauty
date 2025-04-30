import type { MetadataRoute } from 'next'

export const runtime = 'edge'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: '/test'
    }
  ]
}
