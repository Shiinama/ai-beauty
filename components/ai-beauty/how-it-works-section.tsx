'use client'

import { useTranslations } from 'next-intl'

export const HowItWorksSection = () => {
  const t = useTranslations('aiBeauty.howItWorks')

  const steps = [
    {
      number: 1,
      title: t('steps.1.title'),
      description: t('steps.1.description')
    },
    {
      number: 2,
      title: t('steps.2.title'),
      description: t('steps.2.description')
    },
    {
      number: 3,
      title: t('steps.3.title'),
      description: t('steps.3.description')
    }
  ]

  return (
    <div className="rounded-xl border-0 bg-gray-900/50 p-8 backdrop-blur-sm">
      <h2 className="mb-8 text-center text-2xl font-bold text-white">{t('title')}</h2>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900/50 text-2xl">
              {step.number}
            </div>
            <h3 className="mb-2 text-lg font-medium text-white">{step.title}</h3>
            <p className="text-sm text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
