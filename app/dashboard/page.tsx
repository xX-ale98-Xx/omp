import { StatsCards } from '@/components/dashboard-home/stats-cards'
import { TodayAppointments } from '@/components/dashboard-home/today-appointments'
import { QuickActions } from '@/components/dashboard-home/quick-actions'

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-6 py-6 text-white shadow-sm dark:from-brand-800 dark:to-brand-600">
        <h1 className="text-2xl font-bold tracking-tight">Buongiorno!</h1>
        <p className="mt-1 text-sm text-white/80">
          Ecco la panoramica del tuo studio di oggi.
        </p>
      </div>
      <StatsCards />
      <div className="grid gap-6 lg:grid-cols-2">
        <TodayAppointments />
        <QuickActions />
      </div>
    </div>
  )
}
