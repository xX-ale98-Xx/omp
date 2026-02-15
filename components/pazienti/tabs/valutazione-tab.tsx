'use client'

import { AnamnesiGeneraleSection } from '../sections/anamnesi-generale-section'
import { AnamnesiSpecificaSection } from '../sections/anamnesi-specifica-section'
import { TestFisiciSection } from '../sections/test-fisici-section'
import type {
  AnamnesiGenerale,
  AnamnesiSpecifica,
  TestFisici,
  Sesso,
} from '@/types/patient'

interface ValutazioneTabProps {
  anamnesiGenerale: AnamnesiGenerale
  anamnesiSpecifica: AnamnesiSpecifica
  testFisici: TestFisici
  sesso: Sesso | null
  onSaveAnamnesiGenerale: (data: AnamnesiGenerale) => void
  onSaveAnamnesiSpecifica: (data: AnamnesiSpecifica) => void
  onSaveTestFisici: (data: TestFisici) => void
}

export function ValutazioneTab({
  anamnesiGenerale,
  anamnesiSpecifica,
  testFisici,
  sesso,
  onSaveAnamnesiGenerale,
  onSaveAnamnesiSpecifica,
  onSaveTestFisici,
}: ValutazioneTabProps) {
  return (
    <div className="space-y-6">
      <AnamnesiGeneraleSection
        data={anamnesiGenerale}
        sesso={sesso}
        onSave={onSaveAnamnesiGenerale}
      />
      <AnamnesiSpecificaSection
        data={anamnesiSpecifica}
        onSave={onSaveAnamnesiSpecifica}
      />
      <TestFisiciSection data={testFisici} onSave={onSaveTestFisici} />
    </div>
  )
}
