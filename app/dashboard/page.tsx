import { StatsCards } from '@/components/dashboard-home/stats-cards'
import { TodayAppointments } from '@/components/dashboard-home/today-appointments'
import { QuickActions } from '@/components/dashboard-home/quick-actions'

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Panoramica del tuo studio</p>
      </div>
      <StatsCards />
      <div className="grid gap-6 lg:grid-cols-2">
        <TodayAppointments />
        <QuickActions />
      </div>
    </div>
  )
}
