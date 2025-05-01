import { unstable_noStore } from 'next/cache'

import { getAllArticles } from '@/actions/ai-content'

import type { MetadataRoute } from 'next'

export const runtime = 'edge'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  unstable_noStore()

  const allArticles = await getAllArticles()

  const publishedArticles = allArticles
    .filter((article) => article.publishedAt)
    .map((i) => ({
      url: `https://ai-beauty-analyzer.com/blog/${i.slug}`
    }))

  return [
    {
      url: 'https://ai-beauty-analyzer.com'
    },
    {
      url: 'https://ai-beauty-analyzer.com/about'
    },
    ...publishedArticles
  ]
}
