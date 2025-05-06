'use server'

import { eq } from 'drizzle-orm'

import { locales } from '@/i18n/routing'
import { createAI } from '@/lib/ai'
import { createDb } from '@/lib/db'
import { posts } from '@/lib/db/schema'

interface ArticleGenerationParams {
  keyword: string
  locale?: string // Add locale parameter for language support
}

interface BatchArticleGenerationParams {
  keywords: string[]
  locale?: string // Add locale parameter for batch generation
}

// Helper function to get language name from locale code
function getLanguageNameFromLocale(localeCode: string): string {
  const locale = locales.find((l) => l.code === localeCode)
  if (locale) {
    return locale.name
  }
  return 'English' // Default to English if locale not found
}

export async function generateArticle({ keyword, locale = 'en' }: ArticleGenerationParams) {
  const languageName = getLanguageNameFromLocale(locale)

  const systemPrompt = `
  You are an SEO content writer. Your job is write blog post optimized for keyword, title and outline. Please use "keywords" as the keyword to search the first 20 search results on Google, and record their article structure and titles. Then, based on these contents, output an article that conforms to Google SEO logic and user experience. 

  Format requirements:
  - Start with a single H1 title (# Title) that is EXACTLY 50 characters or less
  - The title must include the main keyword and be compelling for readers
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
  
  Language requirement:
  - Write the entire article in ${languageName} language
  - Ensure the content is culturally appropriate for ${languageName}-speaking audiences
  - Use proper grammar, idioms, and expressions specific to ${languageName}
  ${locale === 'ar' ? '- Follow right-to-left (RTL) text conventions' : ''}
  
  Produce original, accurate, and valuable content of at least 10,000 tokens. Output ONLY the article content, starting with the H1 title.`

  const userPrompt = `Create an article about "${keyword}" in ${languageName} language. Optimize it for search engines while maintaining high-quality, valuable content for readers.`

  try {
    const cloudflareAI = createAI()

    const analysisResult = await cloudflareAI.run('@cf/meta/llama-4-scout-17b-16e-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      stream: false,
      max_tokens: 16000
    })

    if (typeof analysisResult === 'object') {
      const content = analysisResult.response
      let extractedTitle = ''
      if (!extractedTitle) {
        // Try to extract title from the first line of content (assuming it's in # format)
        const titleMatch = content.match(/^#\s+(.+)$/m)
        extractedTitle = titleMatch ? titleMatch[1].trim() : 'Untitled Article'
      }

      const finalSlug = createSlug(extractedTitle)

      const excerpt = await generateArticleExcerpt(content, locale)

      return {
        title: extractedTitle,
        slug: finalSlug,
        content,
        excerpt,
        locale // Store the locale with the article
      }
    }
  } catch (error) {
    console.error('Error generating article:', error)
    throw new Error('Failed to generate article content')
  }
}

async function generateArticleExcerpt(content: string, locale = 'en') {
  try {
    const languageName = getLanguageNameFromLocale(locale)
    const cloudflareAI = createAI()

    const analysisResult = await cloudflareAI.run('@cf/meta/llama-4-scout-17b-16e-instruct', {
      messages: [
        {
          role: 'system',
          content: `You are a professional content editor. Your task is to create a concise, SEO-friendly excerpt for the article content to be used as a meta description. 
            
            Requirements: 
            1) Be compelling and engaging
            2) Include the main keyword naturally
            3) Be STRICTLY UNDER 140 characters (ideally 130-140 characters)
            4) Provide value and encourage clicks
            5) Write the excerpt in ${languageName} language
            ${locale === 'ar' ? '6) Follow right-to-left (RTL) text conventions' : ''}
            
            CRITICAL INSTRUCTION: Return ONLY the plain text excerpt with no additional commentary, formatting, or explanations. Do not include quotation marks, labels, or any text besides the excerpt itself. The entire response must be usable as a meta description without any editing.`
        },
        { role: 'user', content: content }
      ],
      stream: false,
      max_tokens: 10000
    })

    if (typeof analysisResult === 'object') {
      return analysisResult.response
    }

    return ''
  } catch (error) {
    console.error('Error generating excerpt:', error)
    return content.substring(0, 150) + '...' // Fallback to simple truncation
  }
}

// 从标题创建 slug
function createSlug(title: string): string {
  return encodeURIComponent(
    title
      .toLowerCase()
      .replace(/\s+/g, '-') // 将空格替换为连字符
      .replace(/-+/g, '-') // 移除多余的连字符
      .trim()
  )
}

// 将生成的文章保存到数据库
export async function saveGeneratedArticle(
  article: {
    title: string
    slug: string
    content: string
    excerpt: string
    locale?: string
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
    locale: article.locale || 'en', // Add locale to database
    publishedAt: publishImmediately ? new Date() : undefined,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  await database.insert(posts).values(postData)
}

// Update the getAllArticles function
export async function getAllArticles(locale?: string) {
  const database = createDb()
  const query = database.select().from(posts).orderBy(posts.createdAt)

  // If locale is provided, filter by locale
  if (locale) {
    return await query.where(eq(posts.locale, locale))
  }

  return await query
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
    locale?: string
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
  const { keywords, locale = 'en' } = params
  const concurrencyLimit = 10
  const results = []

  // Process keywords in batches of concurrencyLimit
  for (let i = 0; i < keywords.length; i += concurrencyLimit) {
    const batch = keywords.slice(i, i + concurrencyLimit)

    // Generate articles in this batch concurrently
    const batchPromises = batch.map(async (keyword) => {
      try {
        const article = await generateArticle({ keyword, locale })
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
    locale?: string
    selected?: boolean
  }>,
  publishImmediately = true
) {
  const database = createDb()
  const results = []

  const articlesToSave = articles.filter((article) => article.selected !== false)

  const batchSize = 10
  for (let i = 0; i < articlesToSave.length; i += batchSize) {
    const batch = articlesToSave.slice(i, i + batchSize)

    const savePromises = batch.map(async (article) => {
      try {
        // Prepare article data
        const postData = {
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          locale: article.locale || 'en', // Add locale to database
          publishedAt: publishImmediately ? new Date() : undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        await database.insert(posts).values(postData)
        return {
          title: article.title,
          status: 'success'
        }
      } catch (error) {
        return {
          title: article.title,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    })

    // Wait for all operations in this batch to complete
    const batchResults = await Promise.all(savePromises)
    results.push(...batchResults)
  }

  return results
}
