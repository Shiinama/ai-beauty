'use client'

import { useState, useRef } from 'react'

import { scorePortrait } from '@/actions/imageToText'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// 定义人像评分结果的类型
type PortraitScore = {
  overall_score: number
  facial_features: {
    eyes: number
    nose: number
    mouth: number
    facial_structure: number
  }
  technical_aspects: {
    lighting: number
    composition: number
    clarity: number
    color_balance: number
  }
  expression: number
  strengths: string[]
  areas_for_improvement: string[]
  summary: string
}

export const TextButton = () => {
  const [image, setImage] = useState<File | null>(null)
  const [response, setResponse] = useState<AiImageToTextOutput>()
  const [portraitScore, setPortraitScore] = useState<PortraitScore | null>(null)
  const [scoreLoading, setScoreLoading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
      // 清除之前的结果
      setResponse(undefined)
      setPortraitScore(null)
    }
  }

  const analyzePortrait = async () => {
    if (!image) {
      alert('Please select an image first')
      return
    }

    setScoreLoading(true)
    try {
      // Convert the image to binary data
      const imageBuffer = await image.arrayBuffer()
      const imageData = new Uint8Array(imageBuffer)

      const scoreData = await scorePortrait({ buffer: imageData })
      setPortraitScore(scoreData as PortraitScore)
    } catch (error) {
      console.error('Error analyzing portrait:', error)
    } finally {
      setScoreLoading(false)
    }
  }

  // 渲染评分条
  const renderScoreBar = (score: number, label: string) => (
    <div className="mb-2">
      <div className="mb-1 flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{score}/10</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200">
        <div
          className="h-2.5 rounded-full"
          style={{
            width: `${score * 10}%`,
            backgroundColor: getScoreColor(score)
          }}
        ></div>
      </div>
    </div>
  )

  // 根据分数获取颜色
  const getScoreColor = (score: number) => {
    if (score >= 8) return '#10b981' // 绿色
    if (score >= 6) return '#3b82f6' // 蓝色
    if (score >= 4) return '#f59e0b' // 黄色
    return '#ef4444' // 红色
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 p-4">
      <Card className="border-2 border-gray-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">AI 人像分析工具</CardTitle>
          <CardDescription>上传一张人像照片，AI 将分析照片并提供详细评分和建议</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <label htmlFor="image-upload" className="font-medium">
              上传人像照片
            </label>
            <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
            {image && (
              <div className="mt-4 flex justify-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="max-h-80 rounded-lg object-contain shadow-md"
                />
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              onClick={analyzePortrait}
              disabled={!image || scoreLoading}
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              {scoreLoading ? '分析中...' : '人像评分'}
            </Button>
          </div>

          {portraitScore && (
            <Card className="mt-8 overflow-hidden border-0 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white">人像评分结果</CardTitle>
                  <div className="flex items-center rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                    <span className="mr-1 text-3xl font-bold text-white">{portraitScore.overall_score}</span>
                    <span className="text-sm text-white/80">/10</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
                  <p className="text-gray-700 italic">{portraitScore.summary}</p>
                </div>

                <div className="mb-8 grid gap-8 md:grid-cols-2">
                  <div className="rounded-lg bg-white p-5 shadow-sm">
                    <h4 className="mb-4 font-semibold text-blue-700">面部特征</h4>
                    {renderScoreBar(portraitScore.facial_features.eyes, '眼睛')}
                    {renderScoreBar(portraitScore.facial_features.nose, '鼻子')}
                    {renderScoreBar(portraitScore.facial_features.mouth, '嘴巴')}
                    {renderScoreBar(portraitScore.facial_features.facial_structure, '面部结构')}
                  </div>

                  <div className="rounded-lg bg-white p-5 shadow-sm">
                    <h4 className="mb-4 font-semibold text-purple-700">技术方面</h4>
                    {renderScoreBar(portraitScore.technical_aspects.lighting, '光线')}
                    {renderScoreBar(portraitScore.technical_aspects.composition, '构图')}
                    {renderScoreBar(portraitScore.technical_aspects.clarity, '清晰度')}
                    {renderScoreBar(portraitScore.technical_aspects.color_balance, '色彩平衡')}
                  </div>
                </div>

                <div className="mb-8 rounded-lg bg-white p-5 shadow-sm">
                  <h4 className="mb-4 font-semibold text-indigo-700">表情评分</h4>
                  {renderScoreBar(portraitScore.expression, '表情')}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-green-50 p-5 shadow-sm">
                    <h4 className="mb-3 font-semibold text-green-700">优势</h4>
                    <ul className="list-disc space-y-1 pl-5">
                      {portraitScore.strengths.map((strength, index) => (
                        <li key={index} className="text-green-700">
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-amber-50 p-5 shadow-sm">
                    <h4 className="mb-3 font-semibold text-amber-700">改进空间</h4>
                    <ul className="list-disc space-y-1 pl-5">
                      {portraitScore.areas_for_improvement.map((area, index) => (
                        <li key={index} className="text-amber-700">
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {response && !portraitScore && (
            <div className="mt-8 rounded-md border bg-gray-50 p-4 shadow-sm">
              <h3 className="mb-2 font-medium">AI 描述:</h3>
              <p className="whitespace-pre-wrap">{JSON.stringify(response)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
