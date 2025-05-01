import Link from 'next/link'
import React from 'react'

import Logo from '@/components/logo'
import { SiteInfo, About } from '@/config/site-info'

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-start justify-between">
          <div className="mb-8 w-full md:mb-0 md:w-1/2 lg:w-1/3">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-gray-400">{SiteInfo.metaDescription}</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="mb-4 text-lg font-semibold text-gray-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://craveu.ai/?utm_source=ai_beauty"
                  className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                >
                  CraveU AI
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.globenewswire.com/news-release/2025/04/29/3069801/0/en/Experience-the-Best-AI-Girlfriend-with-CraveU-AI.html"
                  className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                >
                  CraveU AI Pr
                </Link>
              </li>
              <li>
                <Link
                  href="https://craveu.ai/creator-benefit"
                  className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                >
                  CraveU AI Creator Benefit
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm text-gray-400 transition-colors hover:text-blue-400">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {About.team.company}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
