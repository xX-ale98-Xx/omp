'use client'

import { NoteFisioterapistaSection } from '../sections/note-fisioterapista-section'
import { AnamnesiSpecificaSection } from '../sections/anamnesi-specifica-section'
import { AnamnesiGeneraleSection } from '../sections/anamnesi-generale-section'
import { TestFisiciSection } from '../sections/test-fisici-section'
import type {
  AnamnesiGenerale,
  AnamnesiSpecifica,
  TestFisici,
  NotaFisioterapista,
  Sesso,
} from '@/types/patient'

interface ValutazioneTabProps {
  noteFisioterapista: NotaFisioterapista[]
  anamnesiGenerale: AnamnesiGenerale
  anamnesiSpecifica: AnamnesiSpecifica
  testFisici: TestFisici
  sesso: Sesso | null
  onSaveNoteFisioterapista: (data: NotaFisioterapista[]) => void
  onSaveAnamnesiGenerale: (data: AnamnesiGenerale) => void
  onSaveAnamnesiSpecifica: (data: AnamnesiSpecifica) => void
  onSaveTestFisici: (data: TestFisici) => void
}

export function ValutazioneTab({
  noteFisioterapista,
  anamnesiGenerale,
  anamnesiSpecifica,
  testFisici,
  sesso,
  onSaveNoteFisioterapista,
  onSaveAnamnesiGenerale,
  onSaveAnamnesiSpecifica,
  onSaveTestFisici,
}: ValutazioneTabProps) {
  return (
    <div className="space-y-6">
      <NoteFisioterapistaSection
        note={noteFisioterapista}
        onSave={onSaveNoteFisioterapista}
      />
      <AnamnesiSpecificaSection
        data={anamnesiSpecifica}
        onSave={onSaveAnamnesiSpecifica}
      />
      <AnamnesiGeneraleSection
        data={anamnesiGenerale}
        sesso={sesso}
        onSave={onSaveAnamnesiGenerale}
      />
      <TestFisiciSection data={testFisici} onSave={onSaveTestFisici} />
    </div>
  )
}
