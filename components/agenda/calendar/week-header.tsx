'use client'

import { cn } from '@/lib/utils'
import { formatWeekDayShort, isToday } from '@/lib/calendar-utils'

interface WeekHeaderProps {
  days: Date[]
}

export function WeekHeader({ days }: WeekHeaderProps) {
  return (
    <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b">
      <div /> {/* Spacer for time column */}
      {days.map((day) => {
        const today = isToday(day)
        return (
          <div
            key={day.toISOString()}
            className="flex flex-col items-center gap-1 py-2"
          >
            <span
              className={cn(
                'text-xs font-medium',
                today ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {formatWeekDayShort(day)}
            </span>
            <span
              className={cn(
                'flex size-8 items-center justify-center rounded-full text-sm font-semibold',
                today
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground'
              )}
            >
              {day.getDate()}
            </span>
          </div>
        )
      })}
    </div>
  )
}
