'use client'

import Link from 'next/link'
import { Badge } from '@/components/shadcn/ui/badge'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/ui/accordion'
import { mockExercises } from '@/lib/mock-exercises'
import { getPatientFullName, formatDateIT } from '@/lib/patient-utils'
import type { ExerciseProgram } from '@/types/exercise'

const statusVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  attivo: 'default',
  completato: 'secondary',
  sospeso: 'outline',
}

const statusLabel: Record<string, string> = {
  attivo: 'Attivo',
  completato: 'Completato',
  sospeso: 'Sospeso',
}

function getExerciseName(id: string): string {
  return mockExercises.find((e) => e.id === id)?.nome ?? id
}

export function ProgramCard({ program }: { program: ExerciseProgram }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium">{program.nome}</h4>
            <Link
              href={`/dashboard/pazienti/${program.patientId}`}
              className="text-muted-foreground text-sm hover:underline"
            >
              {getPatientFullName(program.patientId)}
            </Link>
          </div>
          <Badge variant={statusVariant[program.stato] ?? 'outline'}>
            {statusLabel[program.stato] ?? program.stato}
          </Badge>
        </div>
        <div className="text-muted-foreground mt-2 text-xs">
          {formatDateIT(program.dataInizio)} → {formatDateIT(program.dataFine)} ·{' '}
          {program.esercizi.length} esercizi
        </div>
        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="exercises" className="border-none">
            <AccordionTrigger className="py-2 text-sm">Dettaglio esercizi</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {program.esercizi.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>{getExerciseName(ex.exerciseId)}</span>
                    <span className="text-muted-foreground">
                      {ex.serie}x{ex.ripetizioni} · rec. {ex.tempoRecupero}
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
