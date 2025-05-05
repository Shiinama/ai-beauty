'use client'

import { useTranslations } from 'next-intl'

export const PromotionSection = () => {
  const t = useTranslations('aiBeauty.promotion')

  const tags = [
    t('tags.beautyScoreTest'),
    t('tags.aiAttractivenessTest'),
    t('tags.faceAnalysis'),
    t('tags.onlineSkinAnalysis'),
    t('tags.faceScore')
  ]

  return (
    <div className="mt-8 rounded-xl border-0 bg-gradient-to-r from-purple-900/70 to-pink-900/70 p-8 text-center backdrop-blur-sm">
      <h2 className="mb-3 text-2xl font-bold text-white">{t('title')}</h2>
      <p className="mb-6 text-gray-300">{t('description')}</p>
      <div className="mb-4 flex flex-wrap justify-center gap-2 text-xs text-gray-300">
        {tags.map((tag, index) => (
          <span key={index} className="rounded-full bg-white/10 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
