/**
 * Chat utility functions for the standalone Chat page.
 */

/** Relative time formatted in Italian (e.g. "2 ore fa", "ieri", "3 giorni fa"). */
export function formatRelativeTime(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60_000)
  const diffHours = Math.floor(diffMs / 3_600_000)
  const diffDays = Math.floor(diffMs / 86_400_000)

  if (diffMin < 1) return 'ora'
  if (diffMin < 60) return `${diffMin} min fa`
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'ora' : 'ore'} fa`
  if (diffDays === 1) return 'ieri'
  if (diffDays < 7) return `${diffDays} giorni fa`

  return date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })
}

/** Format chat bubble timestamp. */
export function formatChatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
