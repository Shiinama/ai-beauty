import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Camera } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PortraitScore } from '@/types/portrait-score'
import { getScoreColor } from '@/utils/score-utils'

interface AnalysisResultCardProps {
  portraitScore: PortraitScore
}

export const AnalysisResultCard = ({ portraitScore }: AnalysisResultCardProps) => {
  const renderScoreBar = (score: number, label: string) => (
    <div className="mb-4">
      <div className="mb-1 flex justify-between">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-medium text-gray-300">{score}/10</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score * 10}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: getScoreColor(score) }}
        />
      </div>
    </div>
  )

  return (
    <Card className="overflow-hidden border-0 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Attractiveness Score</h2>
          <div className="flex items-center rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="mr-1 text-3xl font-bold text-white">{portraitScore.overall_score}</span>
            <span className="text-sm text-white/80">/10</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-6 rounded-lg bg-gray-800/50 p-4">
          <p className="text-gray-300 italic">{portraitScore.summary}</p>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 font-medium text-purple-400">Facial Features</h3>
          {renderScoreBar(portraitScore.facial_features.eyes, 'Eyes')}
          {renderScoreBar(portraitScore.facial_features.nose, 'Nose')}
          {renderScoreBar(portraitScore.facial_features.mouth, 'Mouth')}
          {renderScoreBar(portraitScore.facial_features.facial_structure, 'Facial Structure')}
        </div>

        <Separator className="my-6 bg-gray-800" />

        <div className="mb-6">
          <h3 className="mb-3 font-medium text-blue-400">Skin Analysis</h3>
          {renderScoreBar(portraitScore.technical_aspects.clarity, 'Skin Clarity')}
          {renderScoreBar(portraitScore.technical_aspects.color_balance, 'Skin Tone')}
          {renderScoreBar(portraitScore.technical_aspects.lighting, 'Complexion')}
          {renderScoreBar(portraitScore.technical_aspects.composition, 'Overall Balance')}
        </div>

        <Separator className="my-6 bg-gray-800" />

        <div className="mb-6">
          <h3 className="mb-3 font-medium text-pink-400">Expression & Presence</h3>
          {renderScoreBar(portraitScore.expression, 'Attractiveness Impact')}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-green-900/20 p-4">
            <h4 className="mb-3 flex items-center font-medium text-green-400">
              <Sparkles className="mr-2 h-4 w-4" />
              Your Beauty Strengths
            </h4>
            <ul className="space-y-2">
              {portraitScore.strengths.map((strength, index) => (
                <li key={index} className="flex items-start text-sm">
                  <ArrowRight className="mt-0.5 mr-2 h-3 w-3 text-green-500" />
                  <span className="text-green-300">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-amber-900/20 p-4">
            <h4 className="mb-3 flex items-center font-medium text-amber-400">
              <Camera className="mr-2 h-4 w-4" />
              Enhancement Tips
            </h4>
            <ul className="space-y-2">
              {portraitScore.areas_for_improvement.map((area, index) => (
                <li key={index} className="flex items-start text-sm">
                  <ArrowRight className="mt-0.5 mr-2 h-3 w-3 text-amber-500" />
                  <span className="text-amber-300">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
