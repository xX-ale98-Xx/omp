'use client'

import { useState } from 'react'
import { Eye } from 'lucide-react'
import { Badge } from '@/components/shadcn/ui/badge'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/ui/accordion'
import { mockPatients } from '@/lib/mock-patients'
import { mockAppointments } from '@/lib/mock-appointments'
import { mockPrograms } from '@/lib/mock-programs'
import { mockExercises } from '@/lib/mock-exercises'
import { formatDateIT, formatCurrency } from '@/lib/patient-utils'
import { ComunicazioneTab } from '@/components/pazienti/tabs/comunicazione-tab'

const statusLabel: Record<string, string> = {
  programmato: 'Programmato',
  completato: 'Completato',
  cancellato: 'Cancellato',
}

const statusVariant: Record<string, 'outline' | 'default' | 'destructive'> = {
  programmato: 'outline',
  completato: 'default',
  cancellato: 'destructive',
}

function getExerciseName(id: string): string {
  return mockExercises.find((e) => e.id === id)?.nome ?? id
}

export function PatientDemoView() {
  const [selectedPatientId, setSelectedPatientId] = useState('p1')

  const selectedPatient = mockPatients.find((p) => p.id === selectedPatientId)
  const patientName = selectedPatient
    ? `${selectedPatient.anagrafica.nome} ${selectedPatient.anagrafica.cognome}`
    : ''

  const appointments = mockAppointments
    .filter((a) => a.patientId === selectedPatientId)
    .sort((a, b) => b.data.localeCompare(a.data) || b.oraInizio.localeCompare(a.oraInizio))

  const programs = mockPrograms
    .filter((p) => p.patientId === selectedPatientId)
    .filter((p) => p.stato === 'attivo')

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Demo banner */}
      <div className="flex items-center gap-3 rounded-lg border border-dashed border-amber-500 bg-amber-50 p-4 dark:bg-amber-950/20">
        <Eye className="size-5 text-amber-600" />
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Simulazione vista paziente
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Questa pagina mostra come il paziente vedrebbe la propria area personale
          </p>
        </div>
      </div>

      {/* Patient selector */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Seleziona paziente:</label>
        <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
          <SelectTrigger className="w-[250px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {mockPatients.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.anagrafica.nome} {p.anagrafica.cognome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="appuntamenti">
        <TabsList>
          <TabsTrigger value="appuntamenti">I miei appuntamenti</TabsTrigger>
          <TabsTrigger value="esercizi">I miei esercizi</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="appuntamenti" className="mt-4">
          {appointments.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              Nessun appuntamento
            </p>
          ) : (
            <div className="space-y-3">
              {appointments.map((apt) => (
                <Card key={apt.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium">
                        {formatDateIT(apt.data)} · {apt.oraInizio} - {apt.oraFine}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {apt.tipo}
                        {apt.note && ` — ${apt.note}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{formatCurrency(apt.importo)}</span>
                      <Badge variant={statusVariant[apt.stato] ?? 'outline'}>
                        {statusLabel[apt.stato] ?? apt.stato}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="esercizi" className="mt-4">
          {programs.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              Nessun programma attivo
            </p>
          ) : (
            <div className="space-y-4">
              {programs.map((prog) => (
                <Card key={prog.id}>
                  <CardContent className="p-4">
                    <h4 className="font-medium">{prog.nome}</h4>
                    <p className="text-muted-foreground text-sm">{prog.descrizione}</p>
                    <div className="text-muted-foreground mt-1 text-xs">
                      {formatDateIT(prog.dataInizio)} → {formatDateIT(prog.dataFine)}
                    </div>
                    <Accordion type="single" collapsible className="mt-2">
                      <AccordionItem value="exercises" className="border-none">
                        <AccordionTrigger className="py-2 text-sm">
                          Esercizi ({prog.esercizi.length})
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {prog.esercizi.map((ex, i) => {
                              const exercise = mockExercises.find((e) => e.id === ex.exerciseId)
                              return (
                                <div key={i} className="rounded-md border p-3">
                                  <p className="font-medium">{getExerciseName(ex.exerciseId)}</p>
                                  {exercise?.descrizione && (
                                    <p className="text-muted-foreground mt-1 text-sm">
                                      {exercise.descrizione}
                                    </p>
                                  )}
                                  <p className="text-muted-foreground mt-1 text-xs">
                                    {ex.serie} serie × {ex.ripetizioni} ripetizioni · Recupero:{' '}
                                    {ex.tempoRecupero}
                                  </p>
                                  {ex.note && (
                                    <p className="mt-1 text-xs italic">{ex.note}</p>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="chat" className="mt-4">
          <ComunicazioneTab
            patientId={selectedPatientId}
            patientName={patientName}
            perspective="paziente"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
