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

const statusVariant: Record<string, 'outline' | 'default' | 'destructive' | 'secondary'> = {
  programmato: 'outline',
  completato: 'default',
  cancellato: 'destructive',
}

const statusLabel: Record<string, string> = {
  programmato: 'Programmato',
  completato: 'Completato',
  cancellato: 'Cancellato',
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
          <Clock className="size-5" />
          Appuntamenti di oggi
        </CardTitle>
      </CardHeader>
      <CardContent>
        {todayAppointments.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nessun appuntamento oggi</p>
        ) : (
          <div className="space-y-3">
            {todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium tabular-nums">
                    {apt.oraInizio} - {apt.oraFine}
                  </div>
                  <div>
                    <Link
                      href={`/dashboard/pazienti/${apt.patientId}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {getPatientFullName(apt.patientId)}
                    </Link>
                    <p className="text-muted-foreground text-xs">{apt.tipo}</p>
                  </div>
                </div>
                <Badge variant={statusVariant[apt.stato] ?? 'outline'}>
                  {statusLabel[apt.stato] ?? apt.stato}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
