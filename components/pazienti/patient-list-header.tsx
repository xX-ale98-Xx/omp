'use client'

import { useState, useTransition, useCallback } from 'react'
import Link from 'next/link'
import { Search, UserPlus } from 'lucide-react'
import { Input } from '@/components/shadcn/ui/input'
import { Button } from '@/components/shadcn/ui/button'

interface PatientListHeaderProps {
  onSearch: (query: string) => void
}

export function PatientListHeader({ onSearch }: PatientListHeaderProps) {
  const [query, setQuery] = useState('')
  const [, startTransition] = useTransition()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setQuery(value)
      startTransition(() => {
        onSearch(value)
      })
    },
    [onSearch]
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-6 py-6 text-white shadow-sm dark:from-brand-800 dark:to-brand-600 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pazienti</h1>
          <p className="mt-1 text-sm text-white/80">Gestisci i tuoi pazienti</p>
        </div>
        <Button
          asChild
          variant="secondary"
          className="bg-white/20 text-white hover:bg-white/30"
        >
          <Link href="/dashboard/pazienti/nuovo">
            <UserPlus className="size-4" />
            <span className="hidden sm:inline">Nuovo Paziente</span>
          </Link>
        </Button>
      </div>

      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
        <Input
          placeholder="Cerca paziente..."
          value={query}
          onChange={handleChange}
          className="w-full pl-9 sm:w-64"
        />
      </div>
    </div>
  )
}
