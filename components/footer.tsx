'use client'

import { useTranslations } from 'next-intl'
import React from 'react'

import Logo from '@/components/logo'
import { Link } from '@/i18n/navigation'

const Footer: React.FC = () => {
  const t = useTranslations('footer')
  const siteInfoT = useTranslations('siteInfo')
  const aboutT = useTranslations('about')

  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-start justify-between">
          <div className="mb-8 w-full md:mb-0 md:w-1/2 lg:w-1/3">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-gray-400">{siteInfoT('meta.description')}</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="mb-4 text-lg font-semibold text-gray-200">{t('quickLinks.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://craveu.ai/?utm_source=ai_beauty"
                  className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                >
                  {t('quickLinks.craveUAI')}
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.globenewswire.com/news-release/2025/04/29/3069801/0/en/Experience-the-Best-AI-Girlfriend-with-CraveU-AI.html"
                  className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                >
                  {t('quickLinks.craveUAIPr')}
                </Link>
              </li>
              <li>
                <Link
                  href="https://craveu.ai/creator-benefit"
                  className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                >
                  {t('quickLinks.craveUAICreatorBenefit')}
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm text-gray-400 transition-colors hover:text-blue-400">
                  {t('quickLinks.blogs')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 text-center text-sm text-gray-400">
          {`© ${new Date().getFullYear()} ${aboutT('team.company')}. ${t('copyright')}`}
        </div>
      </div>
    </footer>
  )
}

export default Footer
