'use client'

import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useState, useRef } from 'react'
import { toast } from 'sonner'

import { scorePortrait } from '@/actions/imageToText'
import { hasRemainingFreeAnalysis } from '@/actions/userAnalysis'
import { AnalysisResultCard } from '@/components/ai-beauty/analysis-result-card'
import { EmptyResultCard } from '@/components/ai-beauty/empty-result-card'
import { ErrorResultCard } from '@/components/ai-beauty/error-result-card'
import { UploadSection } from '@/components/ai-beauty/upload-section'
import { LimitReachedDialog } from '@/components/limit-reached-dialog'
import { useUser } from '@/components/providers/user-provider'
import { PortraitScore, PortraitScoreError } from '@/types/portrait-score'

export const AIBeauty = () => {
  const [image, setImage] = useState<File | null>(null)
  const [scoreLoading, setScoreLoading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const session = useSession()
  const [showLimitDialog, setShowLimitDialog] = useState(false)
  const { checkLimitAndAuthentication, userId, refreshUsage } = useUser()

  const [portraitScore, setPortraitScore] = useState<PortraitScore | PortraitScoreError | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      // Check if file size exceeds 3MB (3 * 1024 * 1024 bytes)
      if (file.size > 3 * 1024 * 1024) {
        toast.error('Image size exceeds 3MB limit. Please select a smaller image.')
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        return
      }

      setImage(file)
      setPortraitScore(null)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const analyzePortrait = async () => {
    if (!checkLimitAndAuthentication()) {
      return // UserProvider will automatically show the appropriate dialog if check fails
    }

    if (!image) {
      alert('Please select an image first')
      return
    }

    setScoreLoading(true)
    try {
      const hasRemaining = await hasRemainingFreeAnalysis(session?.data?.user?.id!)

      if (!hasRemaining) {
        setShowLimitDialog(true)
        return
      }
      const imageBuffer = await image.arrayBuffer()
      const imageData = new Uint8Array(imageBuffer)

      const scoreData = await scorePortrait({ buffer: imageData, userId: userId! })
      setPortraitScore(scoreData)
      refreshUsage()
    } catch (error) {
      console.error('Error analyzing portrait:', error)
      setPortraitScore({
        error: 'Failed to analyze your portrait. Please try again.',
        errorDetail: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setScoreLoading(false)
    }
  }

  const renderResultCard = () => {
    if (portraitScore && 'error' in portraitScore) {
      return <ErrorResultCard error={portraitScore.error} onRetry={analyzePortrait} />
    } else if (portraitScore) {
      return <AnalysisResultCard portraitScore={portraitScore} />
    } else {
      return <EmptyResultCard triggerFileInput={triggerFileInput} scoreLoading={scoreLoading} />
    }
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        <UploadSection
          image={image}
          scoreLoading={scoreLoading}
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
          triggerFileInput={triggerFileInput}
          analyzePortrait={analyzePortrait}
        />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {renderResultCard()}
        </motion.div>
      </div>

      <LimitReachedDialog open={showLimitDialog} onOpenChange={setShowLimitDialog} />
    </>
  )
}
