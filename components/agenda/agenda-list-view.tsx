'use client'

import { CalendarOff } from 'lucide-react'
import { AppointmentCard } from './appointment-card'
import type { Appointment } from '@/types/appointment'

interface AgendaListViewProps {
  appointments: Appointment[]
  selectedDate: Date
  onMarkCompleted: (id: string) => void
  onMarkPaid: (id: string) => void
}

function getDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function AgendaListView({
  appointments,
  selectedDate,
  onMarkCompleted,
  onMarkPaid,
}: AgendaListViewProps) {
  const dateStr = getDateString(selectedDate)
  const dayAppointments = appointments
    .filter((a) => a.data === dateStr)
    .sort((a, b) => a.oraInizio.localeCompare(b.oraInizio))

  if (dayAppointments.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <CalendarOff className="text-muted-foreground size-6" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Nessun appuntamento</p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Non ci sono appuntamenti per questa giornata
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {dayAppointments.map((apt) => (
        <AppointmentCard
          key={apt.id}
          appointment={apt}
          onMarkCompleted={onMarkCompleted}
          onMarkPaid={onMarkPaid}
        />
      ))}
    </div>
  )
}
