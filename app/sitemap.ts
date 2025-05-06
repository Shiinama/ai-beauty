import { unstable_noStore } from 'next/cache'

import { getAllArticles } from '@/actions/ai-content'
import { locales } from '@/i18n/routing'

import type { MetadataRoute } from 'next'

export const runtime = 'edge'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  unstable_noStore()

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  // 定义所有路由（不包含语言代码）
  const routes = ['', '/about', '/blogs']

  // 为每个路由和每种语言创建sitemap条目
  const entries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale.code}${route}`
      })
    }
  }

  const allArticles = await getAllArticles()

  const publishedArticles = allArticles
    .filter((article) => article.publishedAt)
    .map((i) => ({
      url: `https://ai-beauty-analyzer.com/${!i.locale || i.locale === 'en' ? '' : i.locale + '/'}blog/${i.slug}`
    }))

  return [...entries, ...publishedArticles]
}
