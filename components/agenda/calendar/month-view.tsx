'use client'

import { cn } from '@/lib/utils'
import { getMonthGrid, isToday, toDateString } from '@/lib/calendar-utils'
import { getPatientFullName } from '@/lib/patient-utils'
import type { Appointment } from '@/types/appointment'

const WEEKDAY_LABELS = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM']

interface MonthViewProps {
  currentDate: Date
  appointments: Appointment[]
  onDayClick: (date: Date) => void
}

export function MonthView({ currentDate, appointments, onDayClick }: MonthViewProps) {
  const grid = getMonthGrid(currentDate)
  const currentMonth = currentDate.getMonth()

  // Group appointments by date string
  const appointmentsByDate = new Map<string, Appointment[]>()
  for (const apt of appointments) {
    const existing = appointmentsByDate.get(apt.data)
    if (existing) {
      existing.push(apt)
    } else {
      appointmentsByDate.set(apt.data, [apt])
    }
  }

  return (
    <div className="rounded-lg border">
      {/* Weekday header */}
      <div className="grid grid-cols-7 border-b">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-muted-foreground py-2 text-center text-xs font-medium"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid - 6 rows of 7 days */}
      <div className="grid grid-cols-7">
        {grid.map((day, i) => {
          const dateStr = toDateString(day)
          const dayApts = appointmentsByDate.get(dateStr) || []
          const isCurrentMonth = day.getMonth() === currentMonth
          const today = isToday(day)

          return (
            <button
              key={i}
              onClick={() => onDayClick(day)}
              className={cn(
                'flex min-h-[80px] flex-col border-b border-r p-1.5 text-left transition-colors hover:bg-muted/50 md:min-h-[100px]',
                !isCurrentMonth && 'opacity-40'
              )}
            >
              <span
                className={cn(
                  'mb-1 inline-flex size-7 items-center justify-center rounded-full text-sm',
                  today
                    ? 'bg-primary text-primary-foreground font-bold'
                    : 'text-foreground'
                )}
              >
                {day.getDate()}
              </span>

              {/* Appointment indicators */}
              <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                {dayApts.slice(0, 3).map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-brand-100 dark:bg-brand-900/30 border-brand-500 truncate rounded border-l-2 px-1 text-[10px] leading-tight"
                  >
                    <span className="hidden font-medium sm:inline">
                      {getPatientFullName(apt.patientId).split(' ')[0]}
                    </span>{' '}
                    <span className="text-muted-foreground">{apt.oraInizio}</span>
                  </div>
                ))}
                {dayApts.length > 3 && (
                  <span className="text-muted-foreground text-[10px]">
                    +{dayApts.length - 3} altri
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
