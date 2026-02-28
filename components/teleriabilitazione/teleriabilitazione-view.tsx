'use client'

import { useState } from 'react'
import type { TelerehabSession } from '@/types/telerehab'
import { mockTelerehabSessions } from '@/lib/mock-telerehab'
import { SessionManagementView } from './session-management-view'
import { ActiveCallView } from './active-call-view'

export function TeleriabilitazioneView() {
  const [sessions, setSessions] = useState<TelerehabSession[]>(mockTelerehabSessions)
  const [activeSession, setActiveSession] = useState<TelerehabSession | null>(null)

  function handleStartCall(session: TelerehabSession) {
    const updated = sessions.map((s) =>
      s.id === session.id ? { ...s, stato: 'in_corso' as const } : s
    )
    setSessions(updated)
    setActiveSession({ ...session, stato: 'in_corso' })
  }

  function handleEndCall(notes: string) {
    if (!activeSession) return
    const updated = sessions.map((s) =>
      s.id === activeSession.id ? { ...s, stato: 'completata' as const, note: notes } : s
    )
    setSessions(updated)
    setActiveSession(null)
  }

  if (activeSession) {
    return <ActiveCallView session={activeSession} onEndCall={handleEndCall} />
  }

  return <SessionManagementView sessions={sessions} onStartCall={handleStartCall} />
}
