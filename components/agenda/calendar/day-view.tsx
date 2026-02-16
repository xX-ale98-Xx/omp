'use client'

import { toDateString } from '@/lib/calendar-utils'
import { TimeGrid } from './time-grid'
import { CalendarAppointmentCard } from './calendar-appointment-card'
import type { Appointment } from '@/types/appointment'

interface DayViewProps {
  currentDate: Date
  appointments: Appointment[]
}

export function DayView({ currentDate, appointments }: DayViewProps) {
  const dateStr = toDateString(currentDate)
  const dayAppointments = appointments.filter((a) => a.data === dateStr)

  return (
    <TimeGrid columns={1}>
      <div className="relative">
        {dayAppointments.map((apt) => (
          <CalendarAppointmentCard key={apt.id} appointment={apt} />
        ))}
      </div>
    </TimeGrid>
  )
}
