'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { ScrollArea } from '@/components/shadcn/ui/scroll-area'
import { cn } from '@/lib/utils'
import { getInitials, getAvatarColor } from '@/lib/patient-utils'
import { formatChatTime } from '@/lib/chat-utils'
import type { ChatMessage, ChatSender } from '@/types/chat'

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
          {formatChatTime(message.timestamp)}
        </p>
      </div>
    </div>
  )
}

interface ChatPanelProps {
  patientId: string
  patientName: string
  patientSurname: string
  messages: ChatMessage[]
  onSendMessage: (patientId: string, text: string) => void
  onBack?: () => void
  showBackButton?: boolean
}

export function ChatPanel({
  patientId,
  patientName,
  patientSurname,
  messages,
  onSendMessage,
  onBack,
  showBackButton,
}: ChatPanelProps) {
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const mySender: ChatSender = 'fisioterapista'

  const initials = getInitials(patientName, patientSurname)
  const avatarColor = getAvatarColor(patientId)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  function handleSend() {
    const text = newMessage.trim()
    if (!text) return
    onSendMessage(patientId, text)
    setNewMessage('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        {showBackButton && (
          <Button variant="ghost" size="icon" className="size-8" onClick={onBack}>
            <ArrowLeft className="size-4" />
          </Button>
        )}
        <div
          className={cn(
            'flex size-9 items-center justify-center rounded-full text-sm font-semibold text-white',
            avatarColor
          )}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium">
            {patientName} {patientSurname}
          </h3>
          <Link
            href={`/dashboard/pazienti/${patientId}`}
            className="text-muted-foreground text-xs hover:underline"
          >
            Vedi Scheda
          </Link>
        </div>
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
