import { ReactNode } from 'react'

import { redirect } from '@/i18n/navigation'
import { auth } from '@/lib/auth'

export const runtime = 'edge'

export default async function AdminLayout({ children, locale }: { children: ReactNode; locale: string }) {
  const s = await auth()
  if (s?.user?.id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    redirect({
      href: '/',
      locale: locale
    })
  }
  return <div className="py-8">{children}</div>
}
