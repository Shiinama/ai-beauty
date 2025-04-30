'use client'

import { LogIn } from 'lucide-react'

import { useUser } from '@/components/providers/user-provider'
import SignOutButton from '@/components/sign-out-button'
import { Button } from '@/components/ui/button'
import { UsageBadge } from '@/components/usage-badge'

interface LoginModalProps {
  triggerText?: string
  showIcon?: boolean
}

export default function LoginModal({ triggerText = 'Login', showIcon = true }: LoginModalProps) {
  const { isAuthenticated, showLoginModal } = useUser()

  if (isAuthenticated) {
    return (
      <>
        <UsageBadge />
        <SignOutButton />
      </>
    )
  }

  return (
    <Button variant="outline" onClick={showLoginModal}>
      {showIcon && <LogIn className="mr-2 h-4 w-4" />}
      {triggerText}
    </Button>
  )
}
