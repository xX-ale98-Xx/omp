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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Pazienti</h1>
        <p className="text-muted-foreground text-sm">Gestisci i tuoi pazienti</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="text-muted-foreground pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
          <Input
            placeholder="Cerca paziente..."
            value={query}
            onChange={handleChange}
            className="w-full pl-9 sm:w-64"
          />
        </div>
        <Button asChild>
          <Link href="/dashboard/pazienti/nuovo">
            <UserPlus className="size-4" />
            <span className="hidden sm:inline">Nuovo Paziente</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
