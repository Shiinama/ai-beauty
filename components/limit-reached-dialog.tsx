'use client'

import { Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { useRouter } from '@/i18n/navigation'

interface LimitReachedDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LimitReachedDialog({ open, onOpenChange }: LimitReachedDialogProps) {
  const router = useRouter()
  const t = useTranslations('limitReachedDialog')
  const about = useTranslations('about')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('maybeLaterButton')}
          </Button>
          <Button variant="outline" onClick={() => router.push(about('team.productUrl'))}>
            {t('visitButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
