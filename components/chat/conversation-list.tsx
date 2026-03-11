// Conversation-list.tsx
'use client'

import { ScrollArea } from '@/components/shadcn/ui/scroll-area'
import { ConversationItem } from './conversation-item'

interface ConversationSummary {
  patientId: string
  patientName: string
  patientSurname: string
  lastMessage: string
  lastTimestamp: string
  unreadCount: number
}

interface ConversationListProps {
  conversations: ConversationSummary[]
  selectedPatientId: string | null
  onSelect: (patientId: string) => void
}

export function ConversationList({
  conversations,
  selectedPatientId,
  onSelect,
}: ConversationListProps) {
  return (
    <div className="flex h-full flex-1 flex-col px-4">
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold">Messaggi</h2>
        <p className="text-muted-foreground text-xs">{conversations.length} conversazioni</p>
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col w-full flex-1 space-y-1 px-2 py-2">
          {conversations.map((conv) => (
            <ConversationItem
              key={conv.patientId}
              patientId={conv.patientId}
              patientName={conv.patientName}
              patientSurname={conv.patientSurname}
              lastMessage={conv.lastMessage}
              lastTimestamp={conv.lastTimestamp}
              unreadCount={conv.unreadCount}
              isSelected={selectedPatientId === conv.patientId}
              onClick={() => onSelect(conv.patientId)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export type { ConversationSummary }
