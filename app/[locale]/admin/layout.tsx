import { ReactNode } from 'react'

import { redirect } from '@/i18n/navigation'
import { auth } from '@/lib/auth'

export const runtime = 'edge'

export default async function AdminLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const s = await auth()
  if (s?.user?.id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    redirect({
      href: '/',
      locale
    })
  }
  return <div className="py-8">{children}</div>
}
