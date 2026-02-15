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
    },
    {
      title: 'Sedute Oggi',
      value: seduteOggi.toString(),
      icon: Activity,
      description: 'Appuntamenti programmati',
    },
    {
      title: 'Fatturato Mese',
      value: formatCurrency(fatturatoMese),
      icon: Euro,
      description: 'Mese corrente',
    },
    {
      title: 'Pagamenti in Sospeso',
      value: pagamentiSospeso.toString(),
      icon: CreditCard,
      description: 'Fatture non pagate',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-muted-foreground text-xs">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
