'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="size-5" />

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
      title={isDark ? 'Tema chiaro' : 'Tema scuro'}
      className="relative flex cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
    >
      <Sun
        className="size-5 transition-all duration-300"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
          position: isDark ? 'absolute' : 'relative',
        }}
      />
      <Moon
        className="size-5 transition-all duration-300"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
          position: isDark ? 'relative' : 'absolute',
        }}
      />
    </button>
  )
}
