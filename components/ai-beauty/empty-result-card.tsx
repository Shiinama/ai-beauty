'use client'

import { Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

interface EmptyResultCardProps {
  triggerFileInput: () => void
  scoreLoading: boolean
}

export const EmptyResultCard = ({ triggerFileInput, scoreLoading }: EmptyResultCardProps) => {
  const t = useTranslations('aiBeauty.emptyResult')

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl border-0 bg-gray-900/30 p-8 text-center backdrop-blur-sm">
      <div className="mb-4 rounded-full bg-gray-800 p-4">
        <Sparkles className="h-8 w-8 text-purple-400" />
      </div>
      <h3 className="mb-2 text-xl font-medium text-white">{t('title')}</h3>
      <p className="mb-6 text-gray-400">{t('description')}</p>
      <div className="w-full max-w-xs">
        <Button
          onClick={triggerFileInput}
          disabled={scoreLoading}
          className="w-full bg-gray-800 text-white hover:bg-gray-700"
        >
          {t('buttonText')}
        </Button>
      </div>
    </div>
  )
}
