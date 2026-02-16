'use client'

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
      <div className="flex flex-1 items-center justify-center py-12">
        <p className="text-muted-foreground">Nessun appuntamento per questa giornata</p>
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
