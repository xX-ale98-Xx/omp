import { BarChart3 } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <BarChart3 className="text-muted-foreground size-12" />
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground">In arrivo</p>
      </div>
    </div>
  )
}
