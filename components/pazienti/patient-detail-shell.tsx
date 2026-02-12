'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn/ui/breadcrumb'
import { PatientHeader } from './patient-header'
import { AnagraficaSection } from './sections/anagrafica-section'
import { StileVitaSection } from './sections/stile-vita-section'
import { SportivoSection } from './sections/sportivo-section'
import { TestFisiciSection } from './sections/test-fisici-section'
import { AnamnesiGeneraleSection } from './sections/anamnesi-generale-section'
import { AnamnesiSpecificaSection } from './sections/anamnesi-specifica-section'
import { RefertiSection } from './sections/referti-section'
import type { Patient } from '@/types/patient'

const TAB_CONFIG = [
  { value: 'anagrafica', label: 'Anagrafica', sportOnly: false },
  { value: 'stile-vita', label: 'Stile di Vita', sportOnly: false },
  { value: 'sportivo', label: 'Sportivo', sportOnly: true },
  { value: 'test-fisici', label: 'Test Fisici', sportOnly: false },
  { value: 'anamnesi-generale', label: 'Anamnesi Generale', sportOnly: false },
  { value: 'anamnesi-specifica', label: 'Anamnesi Specifica', sportOnly: false },
  { value: 'referti', label: 'Referti', sportOnly: false },
] as const

interface PatientDetailShellProps {
  patient: Patient
}

export function PatientDetailShell({ patient: initialPatient }: PatientDetailShellProps) {
  const [patient, setPatient] = useState<Patient>(initialPatient)
  const [isSportivo, setIsSportivo] = useState(initialPatient.isSportivo)

  const visibleTabs = TAB_CONFIG.filter((tab) => !tab.sportOnly || isSportivo)

  function handlePatientUpdate(updates: Partial<Patient>) {
    setPatient((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/pazienti">Pazienti</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {patient.anagrafica.nome} {patient.anagrafica.cognome}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Patient header */}
      <PatientHeader
        patient={patient}
        isSportivo={isSportivo}
        onToggleSportivo={setIsSportivo}
      />

      {/* Tabs */}
      <Tabs defaultValue="anagrafica">
        <TabsList
          variant="line"
          className="w-full justify-start overflow-x-auto overflow-y-hidden"
        >
          {visibleTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="shrink-0">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="anagrafica">
          <AnagraficaSection
            anagrafica={patient.anagrafica}
            onSave={(data) => handlePatientUpdate({ anagrafica: data })}
          />
        </TabsContent>

        <TabsContent value="stile-vita">
          <StileVitaSection
            data={patient.stileVita}
            onSave={(data) => handlePatientUpdate({ stileVita: data })}
          />
        </TabsContent>

        {isSportivo && (
          <TabsContent value="sportivo">
            <SportivoSection
              data={patient.sportivo}
              onSave={(data) => handlePatientUpdate({ sportivo: data })}
            />
          </TabsContent>
        )}

        <TabsContent value="test-fisici">
          <TestFisiciSection
            data={patient.testFisici}
            onSave={(data) => handlePatientUpdate({ testFisici: data })}
          />
        </TabsContent>

        <TabsContent value="anamnesi-generale">
          <AnamnesiGeneraleSection
            data={patient.anamnesiGenerale}
            sesso={patient.anagrafica.sesso}
            onSave={(data) => handlePatientUpdate({ anamnesiGenerale: data })}
          />
        </TabsContent>

        <TabsContent value="anamnesi-specifica">
          <AnamnesiSpecificaSection
            data={patient.anamnesiSpecifica}
            onSave={(data) => handlePatientUpdate({ anamnesiSpecifica: data })}
          />
        </TabsContent>

        <TabsContent value="referti">
          <RefertiSection
            referti={patient.refertiMedici}
            onSave={(data) => handlePatientUpdate({ refertiMedici: data })}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
