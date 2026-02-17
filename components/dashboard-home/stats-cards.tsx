'use client'

import { Activity, CreditCard, Euro, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { mockPatients } from '@/lib/mock-patients'
import { mockAppointments } from '@/lib/mock-appointments'
import { mockInvoices } from '@/lib/mock-invoices'
import { formatCurrency } from '@/lib/patient-utils'

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

function getCurrentMonth(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function StatsCards() {
  const today = getToday()
  const currentMonth = getCurrentMonth()

  const pazientiAttivi = mockPatients.length
  const seduteOggi = mockAppointments.filter((a) => a.data === today).length
  const fatturatoMese = mockInvoices
    .filter((inv) => inv.dataEmissione.startsWith(currentMonth))
    .reduce((sum, inv) => sum + inv.importo, 0)
  const pagamentiSospeso = mockInvoices.filter((inv) => inv.stato === 'non_pagata').length

  const cards = [
    {
      title: 'Pazienti Attivi',
      value: pazientiAttivi.toString(),
      icon: Users,
      description: 'Pazienti in carico',
      iconBg: 'bg-brand-100 dark:bg-brand-900/40',
      iconColor: 'text-brand-600 dark:text-brand-400',
      valueColor: 'text-brand-700 dark:text-brand-400',
    },
    {
      title: 'Sedute Oggi',
      value: seduteOggi.toString(),
      icon: Activity,
      description: 'Appuntamenti programmati',
      iconBg: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      valueColor: 'text-blue-700 dark:text-blue-400',
    },
    {
      title: 'Fatturato Mese',
      value: formatCurrency(fatturatoMese),
      icon: Euro,
      description: 'Mese corrente',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      valueColor: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      title: 'Pagamenti in Sospeso',
      value: pagamentiSospeso.toString(),
      icon: CreditCard,
      description: 'Fatture non pagate',
      iconBg: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      valueColor: 'text-amber-700 dark:text-amber-400',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="gap-4 py-5 transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-0">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              {card.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${card.iconBg}`}>
              <card.icon className={`size-4 ${card.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.valueColor}`}>{card.value}</div>
            <p className="text-muted-foreground mt-1 text-xs">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
