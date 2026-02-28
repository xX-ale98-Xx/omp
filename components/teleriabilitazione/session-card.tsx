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
    <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
      {/* Time */}
      <div className="w-16 shrink-0 text-center">
        <p className="text-sm font-semibold">{session.oraInizio}</p>
        <p className="text-xs text-muted-foreground">{session.oraFine}</p>
      </div>

      {/* Avatar */}
      <Avatar className="size-10 shrink-0">
        <AvatarFallback className={`${avatarColor} text-sm font-medium text-white`}>
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{nome} {cognome}</p>
        <p className="truncate text-sm text-muted-foreground">{session.motivo}</p>
      </div>

      {/* Status + Action */}
      <div className="flex shrink-0 items-center gap-2">
        {getStatusBadge(session.stato)}
        {canStart && (
          <Button size="sm" onClick={() => onStartCall(session)}>
            <Phone className="mr-1.5 size-3.5" />
            Avvia Chiamata
          </Button>
        )}
      </div>
    </div>
  )
}
