'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, List, CalendarDays, CalendarRange, Grid3X3 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/shadcn/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn/ui/toggle-group'
import { mockAppointments } from '@/lib/mock-appointments'
import { formatMonthYear } from '@/lib/calendar-utils'
import { AgendaListView } from './agenda-list-view'
import { DayView } from './calendar/day-view'
import { WeekView } from './calendar/week-view'
import { MonthView } from './calendar/month-view'
import { NewAppointmentDialog } from './new-appointment-dialog'
import type { Appointment } from '@/types/appointment'

type ViewMode = 'lista' | 'giorno' | 'settimana' | 'mese'

function formatDateItalian(date: Date): string {
  return date.toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function AgendaPageView() {
  const [viewMode, setViewMode] = useState<ViewMode>('settimana')
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)

  function navigate(direction: number) {
    setCurrentDate((prev) => {
      const next = new Date(prev)
      switch (viewMode) {
        case 'lista':
        case 'giorno':
          next.setDate(next.getDate() + direction)
          break
        case 'settimana':
          next.setDate(next.getDate() + direction * 7)
          break
        case 'mese':
          next.setMonth(next.getMonth() + direction)
          break
      }
      return next
    })
  }

  function goToday() {
    setCurrentDate(new Date())
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

  function handleDayClick(date: Date) {
    setCurrentDate(date)
    setViewMode('giorno')
  }

  const dateLabel =
    viewMode === 'mese'
      ? formatMonthYear(currentDate)
      : formatDateItalian(currentDate)

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header with gradient */}
      <div className="flex flex-col gap-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-6 py-6 text-primary-foreground shadow-sm dark:from-brand-500 dark:to-brand-300">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Agenda</h1>
            <p className="mt-1 text-sm capitalize text-primary-foreground/80">{dateLabel}</p>
          </div>
          <div className="flex items-center gap-2">
            <NewAppointmentDialog
              selectedDate={getDateString(currentDate)}
              onAdd={handleAddAppointment}
            />
          </div>
        </div>
      </div>

      {/* Controls: view toggle + navigation */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ToggleGroup
          type="single"
          variant="outline"
          value={viewMode}
          onValueChange={(v) => v && setViewMode(v as ViewMode)}
        >
          <ToggleGroupItem value="lista" aria-label="Vista lista">
            <List className="size-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Lista</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="giorno" aria-label="Vista giorno">
            <CalendarDays className="size-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Giorno</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="settimana" aria-label="Vista settimana">
            <CalendarRange className="size-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Settimana</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="mese" aria-label="Vista mese">
            <Grid3X3 className="size-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Mese</span>
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="flex items-center rounded-md border">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={goToday}>
            Oggi
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate(1)}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* View content */}
      {viewMode === 'lista' && (
        <AgendaListView
          appointments={appointments}
          selectedDate={currentDate}
          onMarkCompleted={handleMarkCompleted}
          onMarkPaid={handleMarkPaid}
        />
      )}
      {viewMode === 'giorno' && (
        <DayView currentDate={currentDate} appointments={appointments} />
      )}
      {viewMode === 'settimana' && (
        <WeekView currentDate={currentDate} appointments={appointments} />
      )}
      {viewMode === 'mese' && (
        <MonthView
          currentDate={currentDate}
          appointments={appointments}
          onDayClick={handleDayClick}
        />
      )}
    </div>
  )
}
