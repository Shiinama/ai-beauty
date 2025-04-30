'use client'

import { motion } from 'framer-motion'

export const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
        AI Beauty & Attractiveness Test
      </h1>
      <p className="mx-auto max-w-2xl text-lg text-gray-400">
        Get your face score instantly with our advanced AI facial analysis. Discover your beauty score, attractiveness
        rating, and personalized skin analysis in seconds.
      </p>
    </motion.div>
  )
}
