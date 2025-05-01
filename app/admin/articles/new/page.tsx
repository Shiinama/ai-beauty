'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { generateArticle, saveGeneratedArticle } from '@/actions/ai-content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

export const runtime = 'edge'

export default function NewArticlePage() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedArticle, setGeneratedArticle] = useState<{
    title: string
    slug: string
    content: string
    excerpt: string
  }>()
  const [isSaving, setIsSaving] = useState(false)
  const [publishImmediately, setPublishImmediately] = useState(true)

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      toast.error('Please enter a keyword')
      return
    }

    setIsGenerating(true)
    try {
      const article = await generateArticle({ keyword: keyword.trim() })
      setGeneratedArticle(article)
      toast.success('Article generated successfully')
    } catch (error) {
      console.error('Error generating article:', error)
      toast.error('Failed to generate article, please try again')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!generatedArticle) return

    setIsSaving(true)
    try {
      await saveGeneratedArticle(generatedArticle, publishImmediately)
      toast.success(publishImmediately ? 'Article published' : 'Article saved as draft')
      router.push('/admin/articles')
    } catch (error) {
      console.error('Error saving article:', error)
      toast.error('Failed to save article, please try again')
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    if (!generatedArticle) return
    setGeneratedArticle({
      ...generatedArticle,
      [field]: e.target.value
    })
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Create New Article</h1>

      <div className="border-border bg-card mb-6 rounded-lg border p-6 shadow">
        <div className="mb-4">
          <Label htmlFor="keyword">Keyword</Label>
          <div className="mt-4 flex gap-2">
            <Input
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter article keyword"
              disabled={isGenerating}
            />
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Article'}
            </Button>
          </div>
        </div>
      </div>

      {generatedArticle && (
        <div className="border-border bg-card rounded-lg border p-6 shadow">
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={generatedArticle.title} onChange={(e) => handleInputChange(e, 'title')} />
          </div>

          <div className="mb-4">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={generatedArticle.excerpt}
              onChange={(e) => handleInputChange(e, 'excerpt')}
              rows={3}
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={generatedArticle.content}
              onChange={(e) => handleInputChange(e, 'content')}
              rows={20}
              className="font-mono"
            />
          </div>

          <div className="mb-6 flex items-center space-x-2">
            <Switch id="published" checked={publishImmediately} onCheckedChange={setPublishImmediately} />
            <Label htmlFor="published">Publish immediately</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => router.push('/admin/articles')}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Article'}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
