'use client'

import { CheckCircle2, Clock, Phone } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/shadcn/ui/avatar'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import type { TelerehabSession } from '@/types/telerehab'
import { mockPatients } from '@/lib/mock-patients'
import { getInitials, getAvatarColor } from '@/lib/patient-utils'

interface SessionCardProps {
  session: TelerehabSession
  onStartCall: (session: TelerehabSession) => void
}

function getStatusBadge(stato: TelerehabSession['stato']) {
  switch (stato) {
    case 'completata':
      return (
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          <CheckCircle2 className="mr-1 size-3" />
          Completata
        </Badge>
      )
    case 'programmata':
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
          <Clock className="mr-1 size-3" />
          Programmata
        </Badge>
      )
    case 'in_corso':
      return (
        <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
          <span className="mr-1 size-2 animate-pulse rounded-full bg-amber-500" />
          In corso
        </Badge>
      )
    case 'cancellata':
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400">
          Cancellata
        </Badge>
      )
  }
}

export function SessionCard({ session, onStartCall }: SessionCardProps) {
  const patient = mockPatients.find((p) => p.id === session.patientId)
  if (!patient) return null

  const { nome, cognome } = patient.anagrafica
  const initials = getInitials(nome, cognome)
  const avatarColor = getAvatarColor(session.patientId)
  const canStart = session.stato === 'programmata'

  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg border p-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:p-4">
      {/* Row 1: Time + Avatar + Info */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <div className="w-12 shrink-0 text-center sm:w-14">
          <p className="text-xs font-semibold sm:text-sm">{session.oraInizio}</p>
          <p className="text-[10px] text-muted-foreground sm:text-xs">{session.oraFine}</p>
        </div>

        <Avatar className="size-9 shrink-0 sm:size-10">
          <AvatarFallback className={`${avatarColor} text-sm font-medium text-white`}>
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium sm:text-base">{nome} {cognome}</p>
          <p className="truncate text-xs text-muted-foreground">{session.motivo}</p>
        </div>
      </div>

      {/* Row 2 (mobile) / inline (sm+): Status + Action */}
      <div className="flex items-center justify-between gap-2 sm:justify-end">
        {getStatusBadge(session.stato)}
        {canStart && (
          <Button size="sm" className="shrink-0" onClick={() => onStartCall(session)}>
            <Phone className="size-3.5" />
            <span className="hidden md:inline md:ml-1.5">Avvia Chiamata</span>
          </Button>
        )}
      </div>
    </div>
  )
}
