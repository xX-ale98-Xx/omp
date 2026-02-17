'use client'

import { getWeekDays, toDateString } from '@/lib/calendar-utils'
import { WeekHeader } from './week-header'
import { TimeGrid } from './time-grid'
import { CalendarAppointmentCard } from './calendar-appointment-card'
import type { Appointment } from '@/types/appointment'

interface WeekViewProps {
  currentDate: Date
  appointments: Appointment[]
}

export function WeekView({ currentDate, appointments }: WeekViewProps) {
  const days = getWeekDays(currentDate)

  // Group appointments by day column
  const columnAppointments: Appointment[][] = days.map((day) => {
    const dateStr = toDateString(day)
    return appointments.filter((a) => a.data === dateStr)
  })

  return (
    <div className="overflow-x-auto rounded-lg border">
      <div className="min-w-[640px]">
        <WeekHeader days={days} />
        <TimeGrid columns={7}>
          {columnAppointments.map((dayApts, colIndex) => (
            <div key={colIndex} className="relative border-l first:border-l-0">
              {dayApts.map((apt) => (
                <CalendarAppointmentCard key={apt.id} appointment={apt} />
              ))}
            </div>
          ))}
        </TimeGrid>
      </div>
    </div>
  )
}
