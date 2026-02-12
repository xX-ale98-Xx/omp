'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { mockPatients } from '@/lib/mock-patients'
import { PatientListHeader } from '@/components/pazienti/patient-list-header'
import { PatientGrid } from '@/components/pazienti/patient-grid'
import { PatientEmptyState } from '@/components/pazienti/patient-empty-state'

export default function PazientiPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('created') === '1') {
      toast.success('Paziente creato con successo')
      router.replace('/dashboard/pazienti', { scroll: false })
    }
  }, [searchParams, router])

  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return mockPatients
    const q = searchQuery.toLowerCase()
    return mockPatients.filter((p) => {
      const { nome, cognome, codiceFiscale, telefono, email } = p.anagrafica
      return (
        nome.toLowerCase().includes(q) ||
        cognome.toLowerCase().includes(q) ||
        codiceFiscale.toLowerCase().includes(q) ||
        telefono.includes(q) ||
        email.toLowerCase().includes(q)
      )
    })
  }, [searchQuery])

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <PatientListHeader onSearch={setSearchQuery} />

      {mockPatients.length === 0 ? (
        <PatientEmptyState />
      ) : filteredPatients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground text-sm">
            Nessun paziente trovato per &ldquo;{searchQuery}&rdquo;
          </p>
        </div>
      ) : (
        <PatientGrid patients={filteredPatients} />
      )}
    </div>
  )
}
