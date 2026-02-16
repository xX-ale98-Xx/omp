'use client'

import Link from 'next/link'
import { Badge } from '@/components/shadcn/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn/ui/popover'
import { cn } from '@/lib/utils'
import { getInitials, getAvatarColor, getPatientFullName, formatCurrency } from '@/lib/patient-utils'
import type { Appointment } from '@/types/appointment'

const statusConfig: Record<string, { label: string; variant: 'outline' | 'default' | 'destructive' }> = {
  programmato: { label: 'Programmato', variant: 'outline' },
  completato: { label: 'Completato', variant: 'default' },
  cancellato: { label: 'Cancellato', variant: 'destructive' },
}

interface AppointmentPopoverProps {
  appointment: Appointment
  children: React.ReactNode
}

export function AppointmentPopover({ appointment, children }: AppointmentPopoverProps) {
  const fullName = getPatientFullName(appointment.patientId)
  const nameParts = fullName.split(' ')
  const initials = getInitials(nameParts[0] || '', nameParts[1] || '')
  const avatarColor = getAvatarColor(appointment.patientId)
  const status = statusConfig[appointment.stato] ?? statusConfig.programmato

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-72" side="right" align="start">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex size-10 items-center justify-center rounded-full text-sm font-semibold text-white',
                avatarColor
              )}
            >
              {initials}
            </div>
            <div>
              <p className="font-medium">{fullName}</p>
              <p className="text-muted-foreground text-xs">{appointment.tipo}</p>
            </div>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Orario</span>
              <span className="font-medium">
                {appointment.oraInizio} - {appointment.oraFine}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Importo</span>
              <span className="font-medium">{formatCurrency(appointment.importo)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stato</span>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
            {appointment.note && (
              <p className="text-muted-foreground border-t pt-2 text-xs">{appointment.note}</p>
            )}
          </div>
          <Link
            href={`/dashboard/pazienti/${appointment.patientId}`}
            className="text-primary block text-sm font-medium hover:underline"
          >
            Vedi Scheda &rarr;
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}
