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
  pagato: { label: 'Pagato', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300' },
  da_pagare: { label: 'Da pagare', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300' },
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
      <CardContent className="p-4">
        {/* Top row: time + name + dropdown */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <div className="whitespace-nowrap text-sm font-medium tabular-nums">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 shrink-0">
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
        {/* Bottom row: badges */}
        <div className="mt-2 flex items-center gap-2">
          <Badge variant={status.variant}>{status.label}</Badge>
          <Badge className={payment.className} variant="outline">
            {payment.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
