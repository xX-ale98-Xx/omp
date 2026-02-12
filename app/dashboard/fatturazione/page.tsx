import { Receipt } from 'lucide-react'

export default function FatturazionePage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <Receipt className="text-muted-foreground size-12" />
        <h1 className="text-2xl font-semibold">Fatturazione</h1>
        <p className="text-muted-foreground">In arrivo</p>
      </div>
    </div>
  )
}
