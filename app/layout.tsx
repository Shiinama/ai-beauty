import { SessionProvider } from 'next-auth/react'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://bytespark.me'),
  title: {
    template: '%s | BrandName',
    default: 'BrandName'
  },
  description: 'Think, Write, Code',
  icons: {
    icon: '/logo.svg'
  },
  authors: [{ name: 'Felix', url: 'https://github.com/sdrpsps' }],
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SessionProvider>
            <Header />
            <Container>{children}</Container>
            <Footer />
          </SessionProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
