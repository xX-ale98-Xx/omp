'use client'

import { cn } from '@/lib/utils'
import { getInitials, getAvatarColor } from '@/lib/patient-utils'
import { formatRelativeTime } from '@/lib/chat-utils'

interface ConversationItemProps {
  patientId: string
  patientName: string
  patientSurname: string
  lastMessage: string
  lastTimestamp: string
  unreadCount: number
  isSelected: boolean
  onClick: () => void
}

export function ConversationItem({
  patientId,
  patientName,
  patientSurname,
  lastMessage,
  lastTimestamp,
  unreadCount,
  isSelected,
  onClick,
}: ConversationItemProps) {
  const initials = getInitials(patientName, patientSurname)
  const avatarColor = getAvatarColor(patientId)

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors',
        isSelected ? 'bg-accent' : 'hover:bg-muted/50'
      )}
    >
      <div
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white',
          avatarColor
        )}
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-medium">
            {patientName} {patientSurname}
          </span>
          <span className="text-muted-foreground shrink-0 text-xs">
            {formatRelativeTime(lastTimestamp)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground truncate text-xs">{lastMessage}</p>
          {unreadCount > 0 && (
            <span className="ml-2 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
