import type { Metadata } from 'next'
import { inter, lusitana } from '@/utils/ui/fonts'
import { ThemeProvider } from '@/providers/theme-provider'

import '@/styles/globals.css'
import '@/styles/autofillFix.css'

export const metadata: Metadata = {
  title: 'OhMyPhysio - OMP!',
  description: 'Landing page for OMP application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} ${lusitana.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
