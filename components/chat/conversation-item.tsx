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
  const hasUnread = unreadCount > 0

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg pl-4 pr-5 py-3.5 text-left transition-colors',
        isSelected ? 'bg-accent' : 'hover:bg-muted/50'
      )}
    >
      {/* Avatar — no indicator dot here */}
      <div
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white',
          avatarColor
        )}
      >
        {initials}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Row 1: Name + unread dot (if any) + Timestamp */}
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-sm',
              hasUnread ? 'font-semibold' : 'font-medium'
            )}
          >
            {patientName} {patientSurname}
          </span>
          {hasUnread && (
            <span className="size-2 shrink-0 rounded-full bg-primary" />
          )}
          <span className="shrink-0 text-[10px] text-muted-foreground">
            {formatRelativeTime(lastTimestamp)}
          </span>
        </div>

        {/* Row 2: Preview + unread count badge — slot always reserved */}
        <div className="mt-0.5 flex items-center gap-2">
          <p
            className={cn(
              'min-w-0 flex-1 truncate text-xs',
              hasUnread ? 'font-medium text-foreground' : 'text-muted-foreground'
            )}
          >
            {lastMessage}
          </p>
          {/* Fixed-width slot — always takes space so text never touches the right edge */}
          <div className="flex w-5 shrink-0 justify-end">
            {hasUnread && (
              <span
                className={cn(
                  'flex items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-primary-foreground',
                  unreadCount > 9 ? 'min-w-[20px] px-1 py-0.5' : 'size-[18px]'
                )}
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
