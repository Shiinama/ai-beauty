'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { Button } from './ui/button'

const SignOutButton = () => {
  const t = useTranslations('login')
  return (
    <Button variant="outline" onClick={() => signOut()}>
      <LogOut />
      {t('signout')}
    </Button>
  )
}

export default SignOutButton
