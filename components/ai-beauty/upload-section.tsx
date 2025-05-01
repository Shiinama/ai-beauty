import { motion } from 'framer-motion'
import { Upload, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type UploadSectionProps = {
  image: File | null
  scoreLoading: boolean
  fileInputRef: React.RefObject<HTMLInputElement | null>
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  triggerFileInput: () => void
  analyzePortrait: () => Promise<void>
}

export const UploadSection = ({
  image,
  scoreLoading,
  fileInputRef,
  handleImageUpload,
  triggerFileInput,
  analyzePortrait
}: UploadSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden border-0 bg-gray-900/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-white">Face Analysis Test</h2>
            <p className="text-gray-400">
              Upload your selfie for an instant attractiveness score and detailed facial feature analysis. Similar to
              Prettyscale but with advanced AI technology.
            </p>
          </div>

          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />

          {!image ? (
            <div
              onClick={triggerFileInput}
              className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-800/50 p-6 transition-all hover:border-purple-500 hover:bg-gray-800"
            >
              <div className="mb-4 rounded-full bg-gray-800 p-3">
                <Upload className="h-6 w-6 text-purple-400" />
              </div>
              <p className="mb-1 font-medium text-white">Upload your selfie</p>
              <p className="text-sm text-gray-400">JPG, PNG, or GIF (max. 3MB)</p>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-xl">
              <img src={URL.createObjectURL(image)} alt="Portrait preview" className="h-64 w-full object-cover" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium text-white">{image.name}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="border-gray-700 bg-black/50 text-white hover:bg-black/70"
                  >
                    Change
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={analyzePortrait}
            disabled={!image || scoreLoading}
            className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
          >
            {scoreLoading ? (
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Analyzing Face...
              </div>
            ) : (
              <div className="flex items-center">
                <Sparkles className="mr-2 h-4 w-4" />
                Get Your Attractiveness Score
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      <FeaturesList />
    </motion.div>
  )
}

const FeaturesList = () => {
  return (
    <div className="mt-8 rounded-xl border-0 bg-gray-900/50 p-6 backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-medium text-white">Complete Face Analysis</h3>
      <div className="space-y-3">
        {[
          { icon: '👁️', text: 'Facial features score (eyes, nose, mouth, structure)' },
          { icon: '✨', text: 'Overall attractiveness rating on a scale of 1-10' },
          { icon: '🔍', text: 'Skin analysis and complexion assessment' },
          { icon: '📊', text: 'Comparison with beauty standards and personalized tips' }
        ].map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-3 text-xl">{feature.icon}</div>
            <p className="text-sm text-gray-400">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
