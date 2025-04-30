'use client'

import { LogIn } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import LoginForm from '@/components/login/login-form'
import SignOutButton from '@/components/sign-out-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'


interface LoginModalProps {
  triggerText?: string
  showIcon?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export default function LoginModal({
  triggerText = 'Login',
  showIcon = true,
  variant = 'default',
  size = 'default',
  className = ''
}: LoginModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const session = useSession()

  if (session.status === 'authenticated') {
    return <SignOutButton />
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {showIcon && <LogIn className="mr-2 h-4 w-4" />}
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Welcome to Next Template</DialogTitle>
          <DialogDescription className="text-center">Sign in to continue your journey</DialogDescription>
        </DialogHeader>
        <LoginForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
