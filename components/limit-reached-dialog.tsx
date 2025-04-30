'use client'

import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { About } from '@/config/site-info'

interface LimitReachedDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LimitReachedDialog({ open, onOpenChange }: LimitReachedDialogProps) {
  const router = useRouter()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Free Analysis Limit Reached
          </DialogTitle>
          <DialogDescription>
            Try out CraveU AI's exciting role-playing features for a more immersive experience!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Maybe Later
          </Button>
          <Button variant="outline" onClick={() => router.push(About.team.productUrl)}>
            Visit CraveAI
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
