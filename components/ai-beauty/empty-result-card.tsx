import { Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface EmptyResultCardProps {
  triggerFileInput: () => void
  scoreLoading: boolean
}

export const EmptyResultCard = ({ triggerFileInput, scoreLoading }: EmptyResultCardProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl border-0 bg-gray-900/30 p-8 text-center backdrop-blur-sm">
      <div className="mb-4 rounded-full bg-gray-800 p-4">
        <Sparkles className="h-8 w-8 text-purple-400" />
      </div>
      <h3 className="mb-2 text-xl font-medium text-white">Your Face Score Analysis</h3>
      <p className="mb-6 text-gray-400">
        Upload your selfie to get an instant attractiveness rating and detailed facial analysis
      </p>
      <div className="w-full max-w-xs">
        <Button
          onClick={triggerFileInput}
          disabled={scoreLoading}
          className="w-full bg-gray-800 text-white hover:bg-gray-700"
        >
          Start Beauty Test
        </Button>
      </div>
    </div>
  )
}
