import type { Metadata } from 'next'
import { inter, lusitana } from '@/utils/ui/fonts'
import '@/styles/globals.css'
import '@/styles/personal.css'
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
    <html lang="en" className="">
      <body className={`${inter.className} ${inter.variable} ${lusitana.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
