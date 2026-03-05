'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'omp-sensitive-hidden'

interface SensitiveDataContextValue {
  hidden: boolean
  toggleHidden: () => void
}

const SensitiveDataContext = createContext<SensitiveDataContextValue>({
  hidden: false,
  toggleHidden: () => {},
})

export function SensitiveDataProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'true') setHidden(true)
    } catch {
      // localStorage not available
    }
  }, [])

  function toggleHidden() {
    setHidden((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // localStorage not available
      }
      return next
    })
  }

  return (
    <SensitiveDataContext.Provider value={{ hidden, toggleHidden }}>
      {children}
    </SensitiveDataContext.Provider>
  )
}

export function useSensitiveData() {
  return useContext(SensitiveDataContext)
}

export function SensitiveValue({ value }: { value: string }) {
  const { hidden } = useSensitiveData()
  return <span>{hidden ? '••••' : value}</span>
}
