'use client'

import { useTranslations } from 'next-intl'

export const FAQSection = () => {
  const t = useTranslations('aiBeauty.faq')

  const faqs = [
    {
      question: t('items.accuracy.question'),
      answer: t('items.accuracy.answer')
    },
    {
      question: t('items.comparison.question'),
      answer: t('items.comparison.answer')
    },
    {
      question: t('items.calculation.question'),
      answer: t('items.calculation.answer')
    },
    {
      question: t('items.privacy.question'),
      answer: t('items.privacy.answer')
    },
    {
      question: t('items.skinAnalysis.question'),
      answer: t('items.skinAnalysis.answer')
    },
    {
      question: t('items.improvement.question'),
      answer: t('items.improvement.answer')
    }
  ]

  return (
    <div className="mt-8 rounded-xl border-0 bg-gray-900/50 p-8 backdrop-blur-sm">
      <h2 className="mb-8 text-center text-2xl font-bold text-white">{t('title')}</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-lg bg-gray-800/50 p-5">
            <h3 className="mb-2 font-medium text-purple-400">{faq.question}</h3>
            <p className="text-sm text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
