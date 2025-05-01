import Link from 'next/link'

import { getAllArticles } from '@/actions/ai-content'
import { formatDate } from '@/lib/utils'

export const runtime = 'edge'

export default async function BlogPage() {
  const allArticles = await getAllArticles()

  // Only show published articles
  const publishedArticles = allArticles.filter((article) => article.publishedAt)

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Blog Posts</h1>

      {publishedArticles.length === 0 ? (
        <p className="text-muted-foreground text-center">No articles available</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publishedArticles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="bg-card block overflow-hidden rounded-lg border shadow transition-shadow hover:shadow-md"
            >
              <div className="p-6">
                <h2 className="text-card-foreground mb-2 text-xl font-semibold">{article.title}</h2>
                <p className="text-muted-foreground mb-4 text-sm">{formatDate(article.publishedAt)}</p>
                <p className="text-card-foreground/80">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
