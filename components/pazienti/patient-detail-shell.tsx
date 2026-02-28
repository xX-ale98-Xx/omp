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
import { PercorsoTab } from './tabs/percorso-tab'
import { ProfiloTab } from './tabs/profilo-tab'
import { ValutazioneTab } from './tabs/valutazione-tab'
import { ComunicazioneTab } from './tabs/comunicazione-tab'
import type { Patient } from '@/types/patient'

const TAB_CONFIG = [
  { value: 'percorso', label: 'Percorso' },
  { value: 'profilo', label: 'Profilo' },
  { value: 'valutazione', label: 'Valutazione' },
  { value: 'comunicazione', label: 'Comunicazione' },
] as const

interface PatientDetailShellProps {
  patient: Patient
}

export function PatientDetailShell({ patient: initialPatient }: PatientDetailShellProps) {
  const [patient, setPatient] = useState<Patient>(initialPatient)
  const [isSportivo, setIsSportivo] = useState(initialPatient.isSportivo)

  function handlePatientUpdate(updates: Partial<Patient>) {
    setPatient((prev) => ({ ...prev, ...updates }))
  }

  const fullName = `${patient.anagrafica.nome} ${patient.anagrafica.cognome}`

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
            <BreadcrumbPage>{fullName}</BreadcrumbPage>
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
      <Tabs defaultValue="percorso">
        <TabsList
          variant="line"
          className="w-full justify-start overflow-x-auto overflow-y-hidden"
        >
          {TAB_CONFIG.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="shrink-0">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="percorso">
          <PercorsoTab patientId={patient.id} />
        </TabsContent>

        <TabsContent value="profilo">
          <ProfiloTab
            anagrafica={patient.anagrafica}
            stileVita={patient.stileVita}
            sportivo={patient.sportivo}
            refertiMedici={patient.refertiMedici}
            isSportivo={isSportivo}
            onSaveAnagrafica={(data) => handlePatientUpdate({ anagrafica: data })}
            onSaveStileVita={(data) => handlePatientUpdate({ stileVita: data })}
            onSaveSportivo={(data) => handlePatientUpdate({ sportivo: data })}
            onSaveReferti={(data) => handlePatientUpdate({ refertiMedici: data })}
          />
        </TabsContent>

        <TabsContent value="valutazione">
          <ValutazioneTab
            noteFisioterapista={patient.noteFisioterapista}
            anamnesiGenerale={patient.anamnesiGenerale}
            anamnesiSpecifica={patient.anamnesiSpecifica}
            testFisici={patient.testFisici}
            sesso={patient.anagrafica.sesso}
            onSaveNoteFisioterapista={(data) => handlePatientUpdate({ noteFisioterapista: data })}
            onSaveAnamnesiGenerale={(data) => handlePatientUpdate({ anamnesiGenerale: data })}
            onSaveAnamnesiSpecifica={(data) => handlePatientUpdate({ anamnesiSpecifica: data })}
            onSaveTestFisici={(data) => handlePatientUpdate({ testFisici: data })}
          />
        </TabsContent>

        <TabsContent value="comunicazione">
          <ComunicazioneTab
            patientId={patient.id}
            patientName={fullName}
            perspective="fisioterapista"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
