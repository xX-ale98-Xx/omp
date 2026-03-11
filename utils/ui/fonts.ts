import { Inter, Fraunces } from 'next/font/google'

export const inter = Inter({
  variable: '--font-inter',
  weight: ['200', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const fraunces = Fraunces({
  variable: '--font-fraunces',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})
