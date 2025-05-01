'use server'

import { eq } from 'drizzle-orm'
import OpenAI from 'openai'

import { createDb } from '@/lib/db'
import { posts } from '@/lib/db/schema'

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
})

interface ArticleGenerationParams {
  keyword: string
}

interface BatchArticleGenerationParams {
  keywords: string[]
}

export async function generateArticle({ keyword }: ArticleGenerationParams): Promise<{
  title: string
  slug: string
  content: string
  excerpt: string
}> {
  const systemPrompt = `
  You are an SEO content writer. Your job is write blog post optimized for keyword, title and outline.Please use "keywords" as the keyword to search the first 20 search results on Google, and record their article structure and titles. Then, based on these contents, output an article that conforms to Google SEO logic and user experience. 

  Format requirements:
  - Use markdown formatting with proper heading structure (# for H1, ## for H2, etc.)
  - Include well-formatted paragraphs, lists, and other elements as appropriate
  - Maintain a professional, informative tone
  
  SEO requirements:
  - Include the main keyword in H1 and some H2 headings
  - Use related keywords and LSI terms throughout
  - Maintain 2-3% keyword density
  - Include the keyword in first and last paragraphs
  - Make the first paragraph suitable for a meta description
  - Answer common user questions related to the keyword
  - Use short paragraphs and clear structure
  - Include bullet points and lists where appropriate
  - Add internal linking opportunities where relevant
  
  Produce original, accurate, and valuable content of at least 4,000 tokens. Output ONLY the article content.`

  const userPrompt = `Create an article about "${keyword}". Optimize it for search engines while maintaining high-quality, valuable content for readers.`

  try {
    // Call OpenAI API to generate content
    const response = await openai.chat.completions.create({
      model: 'chatgpt-4o-latest', // or use other available models
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 6000
    })

    // Extract generated content
    const content = response.choices[0]?.message?.content || ''

    let extractedTitle = ''
    if (!extractedTitle) {
      // Try to extract title from the first line of content (assuming it's in # format)
      const titleMatch = content.match(/^#\s+(.+)$/m)
      extractedTitle = titleMatch ? titleMatch[1].trim() : 'Untitled Article'
    }

    const finalSlug = createSlug(extractedTitle)

    const excerpt = await generateArticleExcerpt(content)

    return {
      title: extractedTitle,
      slug: finalSlug,
      content,
      excerpt
    }
  } catch (error) {
    console.error('Error generating article:', error)
    throw new Error('Failed to generate article content')
  }
}

async function generateArticleExcerpt(content: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use a smaller model for generating excerpts
      messages: [
        {
          role: 'system',
          content:
            'You are a professional content editor. Create a concise, SEO-friendly excerpt for the following article content. The excerpt should be compelling, include the main keyword naturally, and be no more than 150-160 characters to work well as a meta description.'
        },
        { role: 'user', content: content }
      ],
      temperature: 0.5,
      max_tokens: 150
    })

    return response.choices[0]?.message?.content?.trim() || ''
  } catch (error) {
    console.error('Error generating excerpt:', error)
    return content.substring(0, 150) + '...' // Fallback to simple truncation
  }
}

// 从标题创建 slug
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 将空格替换为连字符
    .replace(/-+/g, '-') // 移除多余的连字符
    .trim()
}

// 将生成的文章保存到数据库
export async function saveGeneratedArticle(
  article: {
    title: string
    slug: string
    content: string
    excerpt: string
  },
  publishImmediately = true
) {
  const database = createDb()

  // 准备文章数据
  const postData = {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    publishedAt: publishImmediately ? new Date() : undefined,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  await database.insert(posts).values(postData)
}

// 获取所有文章
export async function getAllArticles() {
  const database = createDb()
  return await database.select().from(posts).orderBy(posts.createdAt)
}

// 根据 slug 获取单篇文章
export async function getArticleBySlug(slug: string) {
  const database = createDb()
  const result = await database.select().from(posts).where(eq(posts.slug, slug))
  return result[0] || null
}

// 更新文章
export async function updateArticle(
  slug: string,
  data: {
    title?: string
    content?: string
    excerpt?: string
    publishedAt?: Date | null
  }
) {
  const database = createDb()

  // 如果标题更新了，可能需要更新 slug
  const updateData: any = {
    ...data,
    updatedAt: new Date()
  }

  if (data.title) {
    updateData.slug = createSlug(data.title)
  }

  await database.update(posts).set(updateData).where(eq(posts.slug, slug))

  // 返回更新后的文章
  return getArticleBySlug(updateData.slug || slug)
}

// 删除文章
export async function deleteArticle(slug: string) {
  const database = createDb()
  await database.delete(posts).where(eq(posts.slug, slug))
  return { success: true }
}

export async function generateBatchArticles(params: BatchArticleGenerationParams) {
  const { keywords } = params
  const concurrencyLimit = 10
  const results = []

  // Process keywords in batches of concurrencyLimit
  for (let i = 0; i < keywords.length; i += concurrencyLimit) {
    const batch = keywords.slice(i, i + concurrencyLimit)

    // Generate articles in this batch concurrently
    const batchPromises = batch.map(async (keyword) => {
      try {
        const article = await generateArticle({ keyword })
        return {
          keyword,
          article,
          status: 'success'
        }
      } catch (error) {
        return {
          keyword,
          error: error instanceof Error ? error.message : 'Unknown error',
          status: 'error'
        }
      }
    })

    // Wait for all articles in this batch to complete
    const batchResults = await Promise.all(batchPromises)
    results.push(...batchResults)
  }

  return results
}

export async function saveBatchArticles(
  articles: Array<{
    title: string
    slug: string
    content: string
    excerpt: string
  }>,
  publishImmediately = true
) {
  const database = createDb()
  const results = []

  for (const article of articles) {
    try {
      // Prepare article data
      const postData = {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        publishedAt: publishImmediately ? new Date() : undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await database.insert(posts).values(postData)
      results.push({
        title: article.title,
        status: 'success'
      })
    } catch (error) {
      results.push({
        title: article.title,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  return results
}
