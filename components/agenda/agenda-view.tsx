'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/shadcn/ui/button'
import { mockAppointments } from '@/lib/mock-appointments'
import { AppointmentCard } from './appointment-card'
import { NewAppointmentDialog } from './new-appointment-dialog'
import type { Appointment } from '@/types/appointment'

function formatDateItalian(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function AgendaView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)

  const dateStr = getDateString(selectedDate)
  const dayAppointments = appointments
    .filter((a) => a.data === dateStr)
    .sort((a, b) => a.oraInizio.localeCompare(b.oraInizio))

  function goDay(offset: number) {
    setSelectedDate((prev) => {
      const next = new Date(prev)
      next.setDate(next.getDate() + offset)
      return next
    })
  }

  function goToday() {
    setSelectedDate(new Date())
  }

  function handleMarkCompleted(id: string) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, stato: 'completato' as const } : a))
    )
    toast.success('Appuntamento completato')
  }

  function handleMarkPaid(id: string) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, pagamento: 'pagato' as const } : a))
    )
    toast.success('Pagamento registrato')
  }

  function handleAddAppointment(appointment: Appointment) {
    setAppointments((prev) => [...prev, appointment])
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agenda</h1>
          <p className="text-muted-foreground capitalize">{formatDateItalian(dateStr)}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border">
            <Button variant="ghost" size="icon" onClick={() => goDay(-1)}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={goToday}>
              Oggi
            </Button>
            <Button variant="ghost" size="icon" onClick={() => goDay(1)}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <NewAppointmentDialog selectedDate={dateStr} onAdd={handleAddAppointment} />
        </div>
      </div>

      {/* Appointments */}
      {dayAppointments.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Nessun appuntamento per questa giornata</p>
        </div>
      ) : (
        <div className="space-y-3">
          {dayAppointments.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              onMarkCompleted={handleMarkCompleted}
              onMarkPaid={handleMarkPaid}
            />
          ))}
        </div>
      )}
    </div>
  )
}
