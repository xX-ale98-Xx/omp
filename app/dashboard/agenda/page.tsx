import { CalendarDays } from 'lucide-react'

export default function AgendaPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <CalendarDays className="text-muted-foreground size-12" />
        <h1 className="text-2xl font-semibold">Agenda</h1>
        <p className="text-muted-foreground">In arrivo</p>
      </div>
    </div>
  )
}
