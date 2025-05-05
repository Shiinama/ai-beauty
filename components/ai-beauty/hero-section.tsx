'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export const HeroSection = () => {
  const t = useTranslations('aiBeauty.hero')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
        {t('title')}
      </h1>
      <p className="mx-auto max-w-2xl text-lg text-gray-400">{t('description')}</p>
    </motion.div>
  )
}
