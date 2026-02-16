'use client'

const START_HOUR = 8
const END_HOUR = 20
const PIXELS_PER_HOUR = 80
const TOTAL_HOURS = END_HOUR - START_HOUR
const TOTAL_HEIGHT = TOTAL_HOURS * PIXELS_PER_HOUR

interface TimeGridProps {
  columns: number
  children?: React.ReactNode
}

export function TimeGrid({ columns, children }: TimeGridProps) {
  const hours = Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => START_HOUR + i)

  return (
    <div className="relative overflow-y-auto" style={{ maxHeight: 'calc(100vh - 16rem)' }}>
      <div className="relative" style={{ height: TOTAL_HEIGHT }}>
        {/* Time labels + gridlines */}
        {hours.map((hour) => {
          const top = (hour - START_HOUR) * PIXELS_PER_HOUR
          return (
            <div key={hour} className="absolute left-0 right-0" style={{ top }}>
              <div className="flex items-start">
                <span className="text-muted-foreground w-[60px] shrink-0 pr-2 text-right text-xs">
                  {String(hour).padStart(2, '0')}:00
                </span>
                <div className="border-border/40 flex-1 border-t border-dashed" />
              </div>
            </div>
          )
        })}

        {/* Content area (appointments go here, positioned absolutely) */}
        <div
          className="absolute top-0 bottom-0 right-0"
          style={{
            left: 60,
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export { START_HOUR, END_HOUR, PIXELS_PER_HOUR, TOTAL_HEIGHT }
