import { notFound } from 'next/navigation'

import { getArticleBySlug } from '@/actions/ai-content'
import BlogBody from '@/components/blog/blog-body'
import PageError from '@/components/page-error'
import { formatDate } from '@/lib/utils'

export const runtime = 'edge'

interface PostSlugPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PostSlugPageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return <PageError message="Post not found" />
  }

  return {
    title: article.title,
    description: article.excerpt
  }
}

const PostSlugPage = async ({ params }: PostSlugPageProps) => {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article || !article.publishedAt) {
    notFound()
  }

  return (
    <article className="prose prose-invert prose-code:before:hidden prose-code:after:hidden max-w-none">
      <div className="mb-8 text-sm">Publish at {formatDate(article.publishedAt)}</div>
      <BlogBody content={article.content} />
    </article>
  )
}

export default PostSlugPage
