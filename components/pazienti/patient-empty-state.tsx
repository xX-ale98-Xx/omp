import Link from 'next/link'
import { Users, UserPlus } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'

export function PatientEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-muted rounded-full p-4">
        <Users className="text-muted-foreground size-10" />
      </div>
      <h2 className="mt-4 text-lg font-semibold">Nessun paziente registrato</h2>
      <p className="text-muted-foreground mt-1 text-sm">Aggiungi il tuo primo paziente</p>
      <Button asChild className="mt-6">
        <Link href="/dashboard/pazienti/nuovo">
          <UserPlus className="size-4" />
          Nuovo Paziente
        </Link>
      </Button>
    </div>
  )
}
