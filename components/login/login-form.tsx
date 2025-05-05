'use client'

import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

interface LoginFormProps {
  onSuccess?: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const t = useTranslations('login.form')
  const [isLoading, setIsLoading] = useState({
    google: false,
    github: false,
    email: false
  })

  const handleSignIn = async (provider: 'google' | 'github' | 'resend') => {
    setIsLoading((prev) => ({ ...prev, [provider]: true }))
    try {
      const result = await signIn(provider, {
        redirect: false
      })

      if (result?.ok && !result?.error && onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error(`${t('errorMessage', { provider })}:`, error)
    } finally {
      setIsLoading((prev) => ({ ...prev, [provider]: false }))
    }
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => handleSignIn('google')} disabled={isLoading.google} className="w-full">
        {isLoading.google ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.98h3.9c2.26-2.09 3.52-5.17 3.52-8.8z"
            />
            <path
              fill="#34A853"
              d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-2.98c-1.08.72-2.45 1.16-4.03 1.16-3.09 0-5.71-2.08-6.65-4.9h-4.04v3.07c1.97 3.9 6.02 6.56 10.69 6.56z"
            />
            <path
              fill="#FBBC05"
              d="M5.605 14.37c-.25-.72-.38-1.48-.38-2.27s.14-1.55.38-2.27v-3.07h-4.04c-.8 1.57-1.27 3.33-1.27 5.34s.46 3.77 1.27 5.34l4.04-3.07z"
            />
            <path
              fill="#EA4335"
              d="M12.255 4.93c1.73 0 3.28.59 4.51 1.74l3.45-3.45c-2.07-1.94-4.78-3.13-7.96-3.13-4.67 0-8.72 2.66-10.69 6.56l4.04 3.07c.94-2.82 3.56-4.79 6.65-4.79z"
            />
          </svg>
        )}
        {t('continueWithGoogle')}
      </Button>
    </div>
  )
}
