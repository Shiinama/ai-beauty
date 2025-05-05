import { getTranslations } from 'next-intl/server'

import LoginModal from '@/components/login/login-modal'
import Logo from '@/components/logo'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'

export default async function Header({ className }: { className?: string }) {
  const t = await getTranslations('header')

  return (
    <header className={cn('z-50 container mx-auto flex items-center justify-between p-4', className)}>
      <Logo />
      <section className="flex items-center gap-2 md:gap-6">
        <LoginModal />
        <Button variant="outline" asChild>
          <Link href="/about">{t('about')}</Link>
        </Button>
      </section>
    </header>
  )
}
