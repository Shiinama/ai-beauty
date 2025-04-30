import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ErrorResultCardProps {
  error: string
  onRetry: () => void
}

export const ErrorResultCard = ({ error, onRetry }: ErrorResultCardProps) => {
  return (
    <Card className="overflow-hidden border-0 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-red-900/50 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Analysis Error</h2>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-6 rounded-lg bg-gray-800/50 p-4">
          <p className="text-gray-300">{error}</p>
        </div>

        <Button
          onClick={onRetry}
          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}
