import Link from 'next/link'
import React from 'react'

import Logo from '@/components/logo'

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-start justify-between">
          <div className="mb-8 w-full md:mb-0 md:w-1/2 lg:w-1/3">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-gray-600 dark:text-gray-400">
              Empowering conversations with AI. Experience the future of communication with LinkAI.
            </p>
          </div>
          <div className="mb-8 w-full md:mb-0 md:w-1/2 lg:w-1/3">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Contact</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">For inquiries, please contact:</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="mailto:contact@yourdomain.com" className="transition-colors hover:text-blue-500">
                contact@yourdomain.com
              </Link>
            </p>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Response time: Within 24-48 hours</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription-terms"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400"
                >
                  Subscription Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2024 Cozyai LLC. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
