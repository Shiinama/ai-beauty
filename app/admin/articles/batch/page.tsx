import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { generateBatchArticles, saveBatchArticles } from '@/actions/ai-content'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

export default function BatchArticlesPage() {
  const router = useRouter()
  const [keywordsInput, setKeywordsInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [publishImmediately, setPublishImmediately] = useState(true)
  const [generatedArticles, setGeneratedArticles] = useState<Array<any>>([])
  const [results, setResults] = useState<Array<any>>([])
  const [selectAll, setSelectAll] = useState(true)

  const handleGenerate = async () => {
    if (!keywordsInput.trim()) {
      toast.error('Please enter at least one keyword')
      return
    }

    // Split keywords by newline and filter out empty lines
    const keywords = keywordsInput
      .split('\n')
      .map((k) => k.trim())
      .filter((k) => k.length > 0)

    if (keywords.length === 0) {
      toast.error('Please enter at least one valid keyword')
      return
    }

    setIsGenerating(true)
    try {
      const articles = await generateBatchArticles({ keywords })

      // Add selected property to each successful article
      const articlesWithSelection = articles.map((item) => ({
        ...item,
        selected: item.status === 'success'
      }))

      setGeneratedArticles(articlesWithSelection)

      const successCount = articles.filter((a) => a.status === 'success').length
      const errorCount = articles.filter((a) => a.status === 'error').length

      toast.success(`Generated ${successCount} articles successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}`)
    } catch (error) {
      console.error('Error generating articles:', error)
      toast.error('Failed to generate articles, please try again')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (generatedArticles.length === 0) {
      toast.error('No articles to save')
      return
    }

    const selectedArticles = generatedArticles
      .filter((item) => item.status === 'success' && item.selected)
      .map((item) => ({
        ...item.article,
        selected: true
      }))

    if (selectedArticles.length === 0) {
      toast.error('No articles selected to save')
      return
    }

    setIsSaving(true)
    try {
      const saveResults = await saveBatchArticles(selectedArticles, publishImmediately)
      setResults(saveResults)

      const successCount = saveResults.filter((r) => r.status === 'success').length
      const errorCount = saveResults.filter((r) => r.status === 'error').length

      toast.success(
        `${successCount} articles ${publishImmediately ? 'published' : 'saved as draft'}${
          errorCount > 0 ? `, ${errorCount} failed` : ''
        }`
      )
    } catch (error) {
      console.error('Error saving articles:', error)
      toast.error('Failed to save articles, please try again')
    } finally {
      setIsSaving(false)
    }
  }

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)

    setGeneratedArticles(
      generatedArticles.map((item) => ({
        ...item,
        selected: item.status === 'success' ? newSelectAll : false
      }))
    )
  }

  const toggleArticleSelection = (index: number) => {
    const updatedArticles = [...generatedArticles]
    updatedArticles[index] = {
      ...updatedArticles[index],
      selected: !updatedArticles[index].selected
    }
    setGeneratedArticles(updatedArticles)

    // Update selectAll state based on whether all successful articles are selected
    const allSuccessfulSelected = updatedArticles
      .filter((item) => item.status === 'success')
      .every((item) => item.selected)

    setSelectAll(allSuccessfulSelected)
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Batch Create Articles</h1>
        <Button variant="outline" onClick={() => router.push('/admin/articles')}>
          Back to Articles
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Enter Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="keywords">Keywords (one per line)</Label>
            <Textarea
              id="keywords"
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              placeholder="Enter keywords, one per line"
              rows={5}
              disabled={isGenerating}
              className="mt-4 font-mono"
            />
          </div>

          <div className="mb-4 flex items-center space-x-2">
            <Switch id="published" checked={publishImmediately} onCheckedChange={setPublishImmediately} />
            <Label htmlFor="published">Publish immediately</Label>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={isGenerating || !keywordsInput.trim()}>
              {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isGenerating ? 'Generating...' : 'Generate Articles'}
            </Button>

            {generatedArticles.length > 0 && (
              <Button
                onClick={handleSave}
                disabled={isSaving || !generatedArticles.some((a) => a.selected && a.status === 'success')}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSaving ? 'Saving...' : 'Save Selected Articles'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {generatedArticles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Articles</span>
              {generatedArticles.some((a) => a.status === 'success') && (
                <div className="flex items-center space-x-2">
                  <Checkbox id="selectAll" checked={selectAll} onCheckedChange={toggleSelectAll} />
                  <Label htmlFor="selectAll" className="text-sm font-normal">
                    Select All
                  </Label>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {generatedArticles.map((item, index) => (
                <div key={index} className="flex items-center rounded border p-2">
                  {item.status === 'success' && (
                    <div className="mr-2">
                      <Checkbox
                        id={`article-${index}`}
                        checked={item.selected}
                        onCheckedChange={() => toggleArticleSelection(index)}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <span className="font-medium">{item.status === 'success' ? item.article.title : item.keyword}</span>
                  </div>
                  <div>
                    {item.status === 'success' ? (
                      <span className="text-green-500">✓ Generated</span>
                    ) : (
                      <span className="text-red-500">✗ Failed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {results.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Save Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="flex items-center rounded border p-2">
                  <div className="flex-1">
                    <span className="font-medium">{result.title}</span>
                  </div>
                  <div>
                    {result.status === 'success' ? (
                      <span className="text-green-500">✓ Saved</span>
                    ) : (
                      <span className="text-red-500">✗ Failed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
