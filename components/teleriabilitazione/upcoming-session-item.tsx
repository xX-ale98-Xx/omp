import { CalendarDays } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/shadcn/ui/avatar'
import type { TelerehabSession } from '@/types/telerehab'
import { mockPatients } from '@/lib/mock-patients'
import { getInitials, getAvatarColor } from '@/lib/patient-utils'

interface UpcomingSessionItemProps {
  session: TelerehabSession
}

function formatDateIT(isoDate: string): string {
  const d = new Date(isoDate + 'T00:00:00')
  return d.toLocaleDateString('it-IT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function UpcomingSessionItem({ session }: UpcomingSessionItemProps) {
  const patient = mockPatients.find((p) => p.id === session.patientId)
  if (!patient) return null

  const { nome, cognome } = patient.anagrafica
  const initials = getInitials(nome, cognome)
  const avatarColor = getAvatarColor(session.patientId)

  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <Avatar className="size-9 shrink-0">
        <AvatarFallback className={`${avatarColor} text-xs font-medium text-white`}>
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{nome} {cognome}</p>
        <p className="truncate text-xs text-muted-foreground">{session.motivo}</p>
      </div>

      <div className="shrink-0 text-right">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays className="size-3" />
          {formatDateIT(session.data)}
        </div>
        <p className="text-xs font-medium">{session.oraInizio}</p>
      </div>
    </div>
  )
}
