'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { Button } from './ui/button'

const SignOutButton = () => {
  return (
    <Button variant="outline" onClick={() => signOut()}>
      <LogOut />
      Sign Out
    </Button>
  )
}

export default SignOutButton
