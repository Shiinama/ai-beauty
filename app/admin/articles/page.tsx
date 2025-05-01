import Link from 'next/link'

import { getAllArticles } from '@/actions/ai-content'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export const runtime = 'edge'

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Article Management</h1>
        <div>
          <Link href="/admin/articles/new">
            <Button>Create New Article</Button>
          </Link>
          <Link href="/admin/articles/batch">
            <Button className="ml-4">Batch Create</Button>
          </Link>
        </div>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-lg border shadow">
        <table className="divide-border min-w-full divide-y">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Title
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Created Date
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Status
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-border bg-card divide-y">
            {articles.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-muted-foreground px-6 py-4 text-center">
                  No articles found
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{article.title}</div>
                    <div className="text-muted-foreground truncate text-sm">{article.slug}</div>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {formatDate(article.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                        article.publishedAt ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-400'
                      }`}
                    >
                      {article.publishedAt ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <Link
                      href={`/admin/articles/edit/${article.slug}`}
                      className="mr-4 text-indigo-400 hover:text-indigo-300"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="mr-4 text-blue-400 hover:text-blue-300"
                      target="_blank"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
