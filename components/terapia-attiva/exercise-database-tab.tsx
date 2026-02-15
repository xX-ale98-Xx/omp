'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/shadcn/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import { mockExercises } from '@/lib/mock-exercises'
import { ExerciseCard } from './exercise-card'
import { NewExerciseDialog } from './new-exercise-dialog'
import type { Exercise, DistrettoMuscolare } from '@/types/exercise'

const DISTRETTI: DistrettoMuscolare[] = [
  'Cervicale',
  'Spalla',
  'Gomito/Polso',
  'Dorsale/Lombare',
  'Anca',
  'Ginocchio',
  'Caviglia/Piede',
  'Globale',
]

export function ExerciseDatabaseTab() {
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises)
  const [filterDistretto, setFilterDistretto] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = exercises.filter((ex) => {
    const matchesDistretto =
      filterDistretto === 'all' || ex.distretto === filterDistretto
    const matchesSearch =
      !searchQuery || ex.nome.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDistretto && matchesSearch
  })

  function handleAddExercise(exercise: Exercise) {
    setExercises((prev) => [...prev, exercise])
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative max-w-xs flex-1">
            <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              placeholder="Cerca esercizio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterDistretto} onValueChange={setFilterDistretto}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Distretto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i distretti</SelectItem>
              {DISTRETTI.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <NewExerciseDialog onAdd={handleAddExercise} />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          Nessun esercizio trovato
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))}
        </div>
      )}
    </div>
  )
}
