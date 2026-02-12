import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'

export default function PatientDetailPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-semibold">Dettaglio Paziente</h1>
      <p className="text-muted-foreground">In fase di sviluppo</p>
      <Button variant="outline" asChild>
        <Link href="/dashboard/pazienti">
          <ArrowLeft className="size-4" />
          Torna alla lista
        </Link>
      </Button>
    </div>
  )
}
