import type { Metadata } from 'next'
import { inter, fraunces } from '@/utils/ui/fonts'
import { ThemeProvider } from '@/providers/theme-provider'

import '@/styles/globals.css'
import '@/styles/autofillFix.css'

export const metadata: Metadata = {
  title: 'OhMyPhysio - OMP!',
  description: 'Landing page for OMP application',
  icons: {
    icon: '/Favicon_200px_dark.svg',
    apple: '/Favicon_200px_dark.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} ${fraunces.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
