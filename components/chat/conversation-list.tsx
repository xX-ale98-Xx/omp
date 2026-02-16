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
    <div className="flex h-full flex-col">
      <div className="border-b px-4 py-4">
        <h2 className="text-lg font-semibold">Messaggi</h2>
        <p className="text-muted-foreground text-xs">{conversations.length} conversazioni</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
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
