import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { auth } from '@/lib/auth'

export const runtime = 'edge'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const s = await auth()
  if (s?.user?.id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    redirect('/')
  }
  return <div className="container mx-auto py-8">{children}</div>
}
