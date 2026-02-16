'use client'

import { cn } from '@/lib/utils'
import { getInitials, getAvatarColor, getPatientFullName } from '@/lib/patient-utils'
import { getTimePosition, getAppointmentHeight } from '@/lib/calendar-utils'
import { AppointmentPopover } from './appointment-popover'
import { PIXELS_PER_HOUR, START_HOUR } from './time-grid'
import type { Appointment } from '@/types/appointment'

interface CalendarAppointmentCardProps {
  appointment: Appointment
}

export function CalendarAppointmentCard({ appointment }: CalendarAppointmentCardProps) {
  const top = getTimePosition(appointment.oraInizio, PIXELS_PER_HOUR, START_HOUR)
  const height = getAppointmentHeight(appointment.oraInizio, appointment.oraFine, PIXELS_PER_HOUR)
  const fullName = getPatientFullName(appointment.patientId)
  const nameParts = fullName.split(' ')
  const initials = getInitials(nameParts[0] || '', nameParts[1] || '')
  const avatarColor = getAvatarColor(appointment.patientId)

  return (
    <AppointmentPopover appointment={appointment}>
      <button
        className={cn(
          'absolute left-0.5 right-0.5 cursor-pointer overflow-hidden rounded-md border-l-4 px-2 py-1 text-left transition-opacity hover:opacity-80',
          'border-brand-500 bg-brand-100 dark:bg-brand-900/30',
          appointment.stato === 'cancellato' && 'opacity-50'
        )}
        style={{ top, height: Math.max(height, 24) }}
      >
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              'flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white',
              avatarColor
            )}
          >
            {initials}
          </div>
          <span className="truncate text-xs font-medium">{fullName}</span>
        </div>
        {height >= 44 && (
          <div className="text-muted-foreground mt-0.5 truncate text-[10px]">
            {appointment.tipo} · {appointment.oraInizio}
          </div>
        )}
      </button>
    </AppointmentPopover>
  )
}
