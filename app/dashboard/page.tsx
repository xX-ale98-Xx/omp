'use client'

import { StatsCards } from '@/components/dashboard-home/stats-cards'
import { TodayAppointments } from '@/components/dashboard-home/today-appointments'
import { QuickActions } from '@/components/dashboard-home/quick-actions'
import { mockAppointments } from '@/lib/mock-appointments'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Buongiorno'
  if (hour >= 12 && hour < 18) return 'Buon pomeriggio'
  return 'Buonasera'
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getTodayAppointmentCount(): number {
  const today = new Date().toISOString().split('T')[0]
  return mockAppointments.filter((a) => a.data === today).length
}

export default function DashboardPage() {
  const greeting = getGreeting()
  const dateStr = getFormattedDate()
  const appointmentCount = getTodayAppointmentCount()

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-6 py-6 text-primary-foreground shadow-sm dark:from-brand-500 dark:to-brand-300">
        <h1 className="text-2xl font-bold tracking-tight">{greeting}!</h1>
        <p className="mt-1 text-sm capitalize text-primary-foreground/80">{dateStr}</p>
        <p className="mt-0.5 text-sm text-primary-foreground/70">
          {appointmentCount === 0
            ? 'Nessun appuntamento in programma oggi'
            : `Hai ${appointmentCount} appuntament${appointmentCount === 1 ? 'o' : 'i'} oggi`}
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
