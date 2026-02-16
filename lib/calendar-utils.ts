/**
 * Calendar utility functions for the Agenda views.
 */

/** Return the Monday of the week containing `date`. */
export function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay() // 0=Sun .. 6=Sat
  const diff = day === 0 ? -6 : 1 - day // shift to Monday
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

/** Return 7 consecutive days starting from Monday of the week containing `date`. */
export function getWeekDays(date: Date): Date[] {
  const start = getWeekStart(date)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

/** Return a 6×7 grid (array of 42 dates) for a calendar month view. */
export function getMonthGrid(date: Date): Date[] {
  const first = new Date(date.getFullYear(), date.getMonth(), 1)
  const startDay = first.getDay() === 0 ? 6 : first.getDay() - 1 // Monday-based
  const gridStart = new Date(first)
  gridStart.setDate(first.getDate() - startDay)

  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart)
    d.setDate(gridStart.getDate() + i)
    return d
  })
}

/** Pixel position (top offset) for a time string "HH:mm" given pxPerHour and start hour. */
export function getTimePosition(time: string, pxPerHour: number, startHour: number = 8): number {
  const [h, m] = time.split(':').map(Number)
  return (h - startHour) * pxPerHour + (m / 60) * pxPerHour
}

/** Height in pixels for an appointment from `start` to `end`. */
export function getAppointmentHeight(
  start: string,
  end: string,
  pxPerHour: number
): number {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  const durationMinutes = (eh * 60 + em) - (sh * 60 + sm)
  return (durationMinutes / 60) * pxPerHour
}

export function isToday(date: Date): boolean {
  const now = new Date()
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  )
}

const WEEKDAY_SHORT_IT = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM']

export function formatWeekDayShort(date: Date): string {
  const day = date.getDay() // 0=Sun
  const idx = day === 0 ? 6 : day - 1
  return WEEKDAY_SHORT_IT[idx]
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })
}

/** Get ISO date string YYYY-MM-DD from a Date. */
export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0]
}
