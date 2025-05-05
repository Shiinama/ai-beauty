import { notFound } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { UserProvider } from '@/components/providers/user-provider'
import { Toaster } from '@/components/ui/sonner'
import { locales, routing } from '@/i18n/routing'

import type { Metadata } from 'next'

import '../globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('siteInfo.meta')

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/logo.svg'
    },
    authors: [{ name: 'Felix', url: 'https://github.com/Shiinama' }],
    creator: 'Felix',
    openGraph: {
      images: ['/logo.svg']
    },
    alternates: {
      languages: {
        'x-default': process.env.NEXT_PUBLIC_BASE_URL,
        ...Object.fromEntries(
          locales.map((locale) => [locale.code, `${process.env.NEXT_PUBLIC_BASE_URL}/${locale.code}`])
        )
      }
    }
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const currentLocale = locales.find((l) => l.code === locale)

  return (
    <html lang={currentLocale?.code ?? 'en'} dir={currentLocale?.dir || 'ltr'} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider>
          <SessionProvider>
            <UserProvider>
              <Header />
              <Container>{children}</Container>
              <Footer />
            </UserProvider>
          </SessionProvider>
          <Toaster richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
