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
        'flex w-auto items-center gap-3 rounded-lg px-4 py-3.5 text-left transition-colors',
        isSelected ? 'bg-muted' : 'hover:bg-muted/50'
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
          {hasUnread && <span className="bg-primary size-2 shrink-0 rounded-full" />}
          <span className="text-muted-foreground shrink-0 text-[10px]">
            {formatRelativeTime(lastTimestamp)}
          </span>
        </div>

        {/* Row 2: Preview + unread count badge — slot always reserved */}
        <div className="mt-0.5 flex flex-1 items-center gap-2">
          <p
            className={cn(
              'min-w-0 flex-1 truncate text-xs',
              hasUnread ? 'text-foreground font-medium' : 'text-muted-foreground'
            )}
          >
            {lastMessage}
          </p>
          {/* Fixed-width slot — always takes space so text never touches the right edge */}
          <div className="flex w-5 shrink-0 justify-end">
            {hasUnread && (
              <span
                className={cn(
                  'bg-primary text-primary-foreground flex items-center justify-center rounded-full text-[10px] leading-none font-bold',
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
