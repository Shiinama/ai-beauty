'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

const Logo = () => {
  const t = useTranslations('siteInfo')

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image alt="logo" src="/logo.svg" width={32} height={32} />
      <p className="text-xl font-semibold">{t('brandName')}</p>
    </Link>
  )
}

export default Logo
