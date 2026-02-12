export function calcolaEta(dataNascita: string | null): number | null {
  if (!dataNascita) return null
  const nascita = new Date(dataNascita)
  const oggi = new Date()
  let eta = oggi.getFullYear() - nascita.getFullYear()
  const meseCorrente = oggi.getMonth()
  const meseNascita = nascita.getMonth()
  if (meseCorrente < meseNascita || (meseCorrente === meseNascita && oggi.getDate() < nascita.getDate())) {
    eta--
  }
  return eta
}

export function formatDateIT(isoDate: string | null): string {
  if (!isoDate) return ''
  const d = new Date(isoDate)
  return d.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function getInitials(nome: string, cognome: string): string {
  return `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase()
}

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-violet-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-fuchsia-500',
  'bg-lime-500',
] as const

export function getAvatarColor(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}
