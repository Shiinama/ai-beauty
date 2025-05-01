import { SessionProvider } from 'next-auth/react'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { UserProvider } from '@/components/providers/user-provider'
import { Toaster } from '@/components/ui/sonner'
import { SiteInfo } from '@/config/site-info'

import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: SiteInfo.metaTitle,
  description: SiteInfo.metaDescription,
  icons: {
    icon: '/favicon.ico'
  },
  authors: [{ name: 'Felix', url: 'https://github.com/Shiinama/ai-beauty' }],
  creator: 'Felix',
  openGraph: {
    images: ['/logo.svg']
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <SessionProvider>
          <UserProvider>
            <Header />
            <Container>{children}</Container>
            <Footer />
          </UserProvider>
        </SessionProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
