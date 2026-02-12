import Link from 'next/link'
import { Plus } from 'lucide-react'

export function PatientAddCard() {
  return (
    <Link
      href="/dashboard/pazienti/nuovo"
      className="border-muted-foreground/25 hover:border-primary hover:bg-primary/5 flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors"
    >
      <div className="bg-primary/10 rounded-full p-2">
        <Plus className="text-primary size-5" />
      </div>
      <span className="text-muted-foreground text-sm font-medium">Nuovo Paziente</span>
    </Link>
  )
}
