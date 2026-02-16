'use client'

import Link from 'next/link'
import { Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Badge } from '@/components/shadcn/ui/badge'
import { mockAppointments } from '@/lib/mock-appointments'
import { getPatientFullName } from '@/lib/patient-utils'

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

const statusConfig: Record<string, { label: string; className: string }> = {
  programmato: {
    label: 'Programmato',
    className: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300',
  },
  completato: {
    label: 'Completato',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300',
  },
  cancellato: {
    label: 'Cancellato',
    className: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300',
  },
}

export function TodayAppointments() {
  const today = getToday()
  const todayAppointments = mockAppointments
    .filter((a) => a.data === today)
    .sort((a, b) => a.oraInizio.localeCompare(b.oraInizio))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-50 p-1.5 dark:bg-blue-950/40">
            <Clock className="size-4 text-blue-600 dark:text-blue-400" />
          </div>
          Appuntamenti di oggi
        </CardTitle>
      </CardHeader>
      <CardContent>
        {todayAppointments.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nessun appuntamento oggi</p>
        ) : (
          <div className="space-y-3">
            {todayAppointments.map((apt) => {
              const status = statusConfig[apt.stato]
              return (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold tabular-nums text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                      {apt.oraInizio}
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/pazienti/${apt.patientId}`}
                        className="text-sm font-medium text-foreground hover:text-primary hover:underline"
                      >
                        {getPatientFullName(apt.patientId)}
                      </Link>
                      <p className="text-muted-foreground text-xs">{apt.tipo}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={status?.className ?? ''}
                  >
                    {status?.label ?? apt.stato}
                  </Badge>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
