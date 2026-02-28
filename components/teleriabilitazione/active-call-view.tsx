'use client'

import { useState, useEffect, useRef } from 'react'
import { Avatar, AvatarFallback } from '@/components/shadcn/ui/avatar'
import type { TelerehabSession } from '@/types/telerehab'
import { mockPatients } from '@/lib/mock-patients'
import { getInitials, getAvatarColor } from '@/lib/patient-utils'
import { CallControls } from './call-controls'
import { SessionNotesPanel } from './session-notes-panel'

interface ActiveCallViewProps {
  session: TelerehabSession
  onEndCall: (notes: string) => void
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const parts = []
  if (h > 0) parts.push(String(h).padStart(2, '0'))
  parts.push(String(m).padStart(2, '0'))
  parts.push(String(s).padStart(2, '0'))
  return parts.join(':')
}

export function ActiveCallView({ session, onEndCall }: ActiveCallViewProps) {
  const [elapsed, setElapsed] = useState(0)
  const [micOn, setMicOn] = useState(true)
  const [videoOn, setVideoOn] = useState(true)
  const [screenShare, setScreenShare] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState(session.note)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const patient = mockPatients.find((p) => p.id === session.patientId)
  const nome = patient?.anagrafica.nome ?? ''
  const cognome = patient?.anagrafica.cognome ?? ''
  const initials = getInitials(nome || '?', cognome || '?')
  const avatarColor = getAvatarColor(session.patientId)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  function handleEndCall() {
    if (timerRef.current) clearInterval(timerRef.current)
    onEndCall(notes)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Top bar: patient info + timer */}
      <div className="flex items-center justify-between border-b bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback className={`${avatarColor} text-xs font-medium text-white`}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{nome} {cognome}</p>
            <p className="text-xs text-muted-foreground">{session.motivo}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 dark:bg-red-950/40">
          <span className="size-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-sm font-mono font-semibold text-red-700 dark:text-red-400">
            {formatDuration(elapsed)}
          </span>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className="relative flex flex-1 items-center justify-center bg-zinc-900 dark:bg-zinc-950">
          {/* Patient placeholder */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="size-28 shadow-2xl">
              <AvatarFallback className={`${avatarColor} text-3xl font-bold text-white`}>
                {initials}
              </AvatarFallback>
            </Avatar>
            <p className="text-lg font-medium text-zinc-300">
              {nome} {cognome}
            </p>
            {!videoOn && (
              <p className="text-sm text-zinc-500">Videocamera disattivata</p>
            )}
          </div>

          {/* PiP "Tu" */}
          <div className="absolute right-4 bottom-4 flex size-32 items-center justify-center rounded-xl border-2 border-white/20 bg-zinc-800 shadow-lg sm:size-40">
            <div className="flex flex-col items-center gap-1">
              <div className="flex size-12 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                Tu
              </div>
              {!videoOn && (
                <p className="text-xs text-zinc-500">Camera off</p>
              )}
            </div>
          </div>
        </div>

        {/* Notes panel (toggle) */}
        {showNotes && (
          <SessionNotesPanel
            notes={notes}
            onNotesChange={setNotes}
            onClose={() => setShowNotes(false)}
          />
        )}
      </div>

      {/* Controls bar */}
      <CallControls
        micOn={micOn}
        videoOn={videoOn}
        screenShare={screenShare}
        showNotes={showNotes}
        onToggleMic={() => setMicOn(!micOn)}
        onToggleVideo={() => setVideoOn(!videoOn)}
        onToggleScreenShare={() => setScreenShare(!screenShare)}
        onToggleNotes={() => setShowNotes(!showNotes)}
        onEndCall={handleEndCall}
      />
    </div>
  )
}
