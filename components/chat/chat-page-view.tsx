'use client'

import { useState, useMemo } from 'react'
import { MessageSquare } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { mockChatMessages } from '@/lib/mock-chat'
import { mockPatients } from '@/lib/mock-patients'
import { ConversationList } from './conversation-list'
import { ChatPanel } from './chat-panel'
import type { ConversationSummary } from './conversation-list'
import type { ChatMessage } from '@/types/chat'

export function ChatPageView() {
  const isMobile = useIsMobile()
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages)

  const conversations = useMemo((): ConversationSummary[] => {
    const grouped = new Map<string, ChatMessage[]>()
    for (const msg of messages) {
      const existing = grouped.get(msg.patientId)
      if (existing) {
        existing.push(msg)
      } else {
        grouped.set(msg.patientId, [msg])
      }
    }

    const summaries: ConversationSummary[] = []
    for (const [patientId, msgs] of grouped) {
      const patient = mockPatients.find((p) => p.id === patientId)
      if (!patient) continue

      const sorted = [...msgs].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      const last = sorted[0]
      const unreadCount = msgs.filter(
        (m) => m.mittente === 'paziente' && !m.letto
      ).length

      summaries.push({
        patientId,
        patientName: patient.anagrafica.nome,
        patientSurname: patient.anagrafica.cognome,
        lastMessage: last.testo,
        lastTimestamp: last.timestamp,
        unreadCount,
      })
    }

    return summaries.sort(
      (a, b) => new Date(b.lastTimestamp).getTime() - new Date(a.lastTimestamp).getTime()
    )
  }, [messages])

  const selectedPatient = selectedPatientId
    ? mockPatients.find((p) => p.id === selectedPatientId)
    : null

  const selectedMessages = selectedPatientId
    ? messages
        .filter((m) => m.patientId === selectedPatientId)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : []

  function handleSendMessage(patientId: string, text: string) {
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      patientId,
      mittente: 'fisioterapista',
      testo: text,
      timestamp: new Date().toISOString(),
      letto: true,
    }
    setMessages((prev) => [...prev, msg])
  }

  function handleSelectConversation(patientId: string) {
    setSelectedPatientId(patientId)
    // Mark messages as read
    setMessages((prev) =>
      prev.map((m) =>
        m.patientId === patientId && m.mittente === 'paziente' && !m.letto
          ? { ...m, letto: true }
          : m
      )
    )
  }

  // Mobile: show either list or panel
  if (isMobile) {
    if (selectedPatientId && selectedPatient) {
      return (
        <div className="flex h-full min-h-0 flex-col">
          <ChatPanel
            patientId={selectedPatientId}
            patientName={selectedPatient.anagrafica.nome}
            patientSurname={selectedPatient.anagrafica.cognome}
            messages={selectedMessages}
            onSendMessage={handleSendMessage}
            onBack={() => setSelectedPatientId(null)}
            showBackButton
          />
        </div>
      )
    }
    return (
      <div className="flex h-full min-h-0 flex-col">
        <ConversationList
          conversations={conversations}
          selectedPatientId={selectedPatientId}
          onSelect={handleSelectConversation}
        />
      </div>
    )
  }

  // Desktop: side by side
  return (
    <div className="flex h-full min-h-0">
      <div className="w-80 shrink-0 border-r">
        <ConversationList
          conversations={conversations}
          selectedPatientId={selectedPatientId}
          onSelect={handleSelectConversation}
        />
      </div>
      <div className="flex-1">
        {selectedPatientId && selectedPatient ? (
          <ChatPanel
            patientId={selectedPatientId}
            patientName={selectedPatient.anagrafica.nome}
            patientSurname={selectedPatient.anagrafica.cognome}
            messages={selectedMessages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <div className="bg-muted rounded-full p-4">
              <MessageSquare className="text-muted-foreground size-8" />
            </div>
            <p className="text-muted-foreground text-sm">
              Seleziona una conversazione per iniziare
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
