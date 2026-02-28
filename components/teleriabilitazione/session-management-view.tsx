'use client'

import { useMemo } from 'react'
import { CalendarClock, CheckCircle2, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import type { TelerehabSession } from '@/types/telerehab'
import { SessionCard } from './session-card'
import { UpcomingSessionItem } from './upcoming-session-item'

interface SessionManagementViewProps {
  sessions: TelerehabSession[]
  onStartCall: (session: TelerehabSession) => void
}

export function SessionManagementView({ sessions, onStartCall }: SessionManagementViewProps) {
  const today = new Date().toISOString().split('T')[0]

  const todaySessions = useMemo(
    () =>
      sessions
        .filter((s) => s.data === today)
        .sort((a, b) => a.oraInizio.localeCompare(b.oraInizio)),
    [sessions, today]
  )

  const upcomingSessions = useMemo(
    () =>
      sessions
        .filter((s) => s.data > today && s.stato === 'programmata')
        .sort((a, b) => a.data.localeCompare(b.data) || a.oraInizio.localeCompare(b.oraInizio)),
    [sessions, today]
  )

  const completedToday = todaySessions.filter((s) => s.stato === 'completata').length
  const totalToday = todaySessions.length

  // Find next scheduled session
  const now = new Date()
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  const nextSession = todaySessions.find(
    (s) => s.stato === 'programmata' && s.oraInizio >= currentTime
  )

  function getMinutesUntil(time: string): number {
    const [h, m] = time.split(':').map(Number)
    const sessionMinutes = h * 60 + m
    const nowMinutes = now.getHours() * 60 + now.getMinutes()
    return Math.max(0, sessionMinutes - nowMinutes)
  }

  const nextInMinutes = nextSession ? getMinutesUntil(nextSession.oraInizio) : null

  const summaryCards = [
    {
      title: 'Sessioni Oggi',
      value: String(totalToday),
      icon: CalendarClock,
      iconBg: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      valueColor: 'text-blue-700 dark:text-blue-400',
    },
    {
      title: 'Prossima fra',
      value: nextInMinutes !== null ? `${nextInMinutes} min` : '—',
      icon: Clock,
      iconBg: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      valueColor: 'text-amber-700 dark:text-amber-400',
    },
    {
      title: 'Completate Oggi',
      value: `${completedToday}/${totalToday}`,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      valueColor: 'text-emerald-700 dark:text-emerald-400',
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Banner */}
      <div className="flex flex-col gap-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-6 py-6 text-primary-foreground shadow-sm dark:from-brand-500 dark:to-brand-300 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teleriabilitazione</h1>
          <p className="mt-1 text-sm text-primary-foreground/80">
            Gestisci le sessioni di riabilitazione a distanza
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.title} className="gap-4 py-5">
            <CardHeader className="flex flex-row items-center justify-between pb-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${card.iconBg}`}>
                <card.icon className={`size-4 ${card.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.valueColor}`}>{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Today's sessions */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sessioni di Oggi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySessions.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Nessuna sessione programmata per oggi
                </p>
              ) : (
                todaySessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    onStartCall={onStartCall}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Upcoming sessions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prossime Sessioni</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSessions.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Nessuna sessione in programma
                </p>
              ) : (
                upcomingSessions.map((session) => (
                  <UpcomingSessionItem key={session.id} session={session} />
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
