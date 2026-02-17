'use client'

import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { ScrollArea } from '@/components/shadcn/ui/scroll-area'
import { cn } from '@/lib/utils'
import { mockChatMessages } from '@/lib/mock-chat'
import type { ChatMessage, ChatSender } from '@/types/chat'

interface ComunicazioneTabProps {
  patientId: string
  patientName: string
  perspective?: 'fisioterapista' | 'paziente'
}

function formatTime(timestamp: string): string {
  const d = new Date(timestamp)
  return d.toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function ChatBubble({
  message,
  isOwnMessage,
}: {
  message: ChatMessage
  isOwnMessage: boolean
}) {
  return (
    <div className={cn('flex', isOwnMessage ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-2',
          isOwnMessage
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted rounded-bl-md'
        )}
      >
        <p className="text-sm">{message.testo}</p>
        <p
          className={cn(
            'mt-1 text-xs',
            isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'
          )}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  )
}

export function ComunicazioneTab({
  patientId,
  patientName,
  perspective = 'fisioterapista',
}: ComunicazioneTabProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    mockChatMessages.filter((m) => m.patientId === patientId)
  )
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const mySender: ChatSender = perspective

  useEffect(() => {
    // Scroll to bottom on new messages
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  function handleSend() {
    const text = newMessage.trim()
    if (!text) return

    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      patientId,
      mittente: mySender,
      testo: text,
      timestamp: new Date().toISOString(),
      letto: true,
    }
    setMessages((prev) => [...prev, msg])
    setNewMessage('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex min-h-[300px] flex-col rounded-lg border" style={{ height: 'min(500px, 60vh)' }}>
      {/* Header */}
      <div className="border-b px-4 py-3">
        <h3 className="font-medium">{patientName}</h3>
        <p className="text-muted-foreground text-xs">
          {perspective === 'fisioterapista' ? 'Chat con il paziente' : 'Chat con il fisioterapista'}
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-center text-sm">
              Nessun messaggio. Inizia la conversazione.
            </p>
          ) : (
            messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                isOwnMessage={msg.mittente === mySender}
              />
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex items-end gap-2 border-t p-3">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scrivi un messaggio..."
          rows={1}
          className="min-h-[40px] resize-none"
        />
        <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  )
}
