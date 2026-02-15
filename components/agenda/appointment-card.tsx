'use client'

import Link from 'next/link'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { getPatientFullName, formatCurrency } from '@/lib/patient-utils'
import type { Appointment } from '@/types/appointment'

const statusConfig: Record<
  string,
  { label: string; variant: 'outline' | 'default' | 'destructive' }
> = {
  programmato: { label: 'Programmato', variant: 'outline' },
  completato: { label: 'Completato', variant: 'default' },
  cancellato: { label: 'Cancellato', variant: 'destructive' },
}

const paymentConfig: Record<string, { label: string; className: string }> = {
  pagato: { label: 'Pagato', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  da_pagare: { label: 'Da pagare', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
}

interface AppointmentCardProps {
  appointment: Appointment
  onMarkCompleted?: (id: string) => void
  onMarkPaid?: (id: string) => void
}

export function AppointmentCard({
  appointment,
  onMarkCompleted,
  onMarkPaid,
}: AppointmentCardProps) {
  const status = statusConfig[appointment.stato] ?? statusConfig.programmato
  const payment = paymentConfig[appointment.pagamento] ?? paymentConfig.da_pagare

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="min-w-[100px] text-sm font-medium tabular-nums">
            {appointment.oraInizio} - {appointment.oraFine}
          </div>
          <div>
            <Link
              href={`/dashboard/pazienti/${appointment.patientId}`}
              className="text-sm font-medium hover:underline"
            >
              {getPatientFullName(appointment.patientId)}
            </Link>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span>{appointment.tipo}</span>
              <span>·</span>
              <span>{formatCurrency(appointment.importo)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={status.variant}>{status.label}</Badge>
          <Badge className={payment.className} variant="outline">
            {payment.label}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {appointment.stato !== 'completato' && (
                <DropdownMenuItem onClick={() => onMarkCompleted?.(appointment.id)}>
                  Segna completato
                </DropdownMenuItem>
              )}
              {appointment.pagamento !== 'pagato' && (
                <DropdownMenuItem onClick={() => onMarkPaid?.(appointment.id)}>
                  Segna pagato
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
