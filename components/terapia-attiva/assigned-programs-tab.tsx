'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/shadcn/ui/input'
import { mockPrograms } from '@/lib/mock-programs'
import { getPatientFullName } from '@/lib/patient-utils'
import { ProgramCard } from './program-card'
import { NewProgramDialog } from './new-program-dialog'
import type { ExerciseProgram } from '@/types/exercise'

export function AssignedProgramsTab() {
  const [programs, setPrograms] = useState<ExerciseProgram[]>(mockPrograms)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = programs.filter((p) => {
    if (!searchQuery) return true
    const patientName = getPatientFullName(p.patientId).toLowerCase()
    return (
      patientName.includes(searchQuery.toLowerCase()) ||
      p.nome.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  function handleAddProgram(program: ExerciseProgram) {
    setPrograms((prev) => [...prev, program])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            placeholder="Cerca per paziente o programma..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <NewProgramDialog onAdd={handleAddProgram} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          Nessun programma trovato
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      )}
    </div>
  )
}
