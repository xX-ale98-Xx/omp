'use client'

import { useState, useMemo } from 'react'
import { Euro, TrendingUp, TrendingDown } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import { mockInvoices } from '@/lib/mock-invoices'
import { mockPatients } from '@/lib/mock-patients'
import { formatCurrency } from '@/lib/patient-utils'
import { InvoiceTable } from './invoice-table'
import { NewInvoiceDialog } from './new-invoice-dialog'
import type { Invoice } from '@/types/invoice'

function getMonthOptions(): { value: string; label: string }[] {
  const months: { value: string; label: string }[] = [{ value: 'all', label: 'Tutti i mesi' }]
  const now = new Date()
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })
    months.push({ value, label })
  }
  return months
}

export function FatturazioneView() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [filterPatient, setFilterPatient] = useState('all')
  const [filterMonth, setFilterMonth] = useState('all')

  const monthOptions = useMemo(() => getMonthOptions(), [])

  const filtered = invoices.filter((inv) => {
    const matchesPatient = filterPatient === 'all' || inv.patientId === filterPatient
    const matchesMonth = filterMonth === 'all' || inv.dataEmissione.startsWith(filterMonth)
    return matchesPatient && matchesMonth
  })

  const totFatturato = filtered.reduce((sum, inv) => sum + inv.importo, 0)
  const totIncassato = filtered
    .filter((inv) => inv.stato === 'pagata')
    .reduce((sum, inv) => sum + inv.importo, 0)
  const totDaIncassare = totFatturato - totIncassato

  const nextNumber = `FT-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`

  function handleMarkPaid(id: string) {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, stato: 'pagata' as const } : inv))
    )
    toast.success('Fattura segnata come pagata')
  }

  function handleAddInvoice(invoice: Invoice) {
    setInvoices((prev) => [...prev, invoice])
  }

  const summaryCards = [
    {
      title: 'Totale Fatturato',
      value: formatCurrency(totFatturato),
      icon: Euro,
      iconBg: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      valueColor: 'text-blue-700 dark:text-blue-400',
    },
    {
      title: 'Incassato',
      value: formatCurrency(totIncassato),
      icon: TrendingUp,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      valueColor: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      title: 'Da Incassare',
      value: formatCurrency(totDaIncassare),
      icon: TrendingDown,
      iconBg: 'bg-red-50 dark:bg-red-950/40',
      iconColor: 'text-red-600 dark:text-red-400',
      valueColor: 'text-red-700 dark:text-red-400',
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header with gradient */}
      <div className="flex flex-col gap-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-6 py-6 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between dark:from-brand-800 dark:to-brand-600">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fatturazione</h1>
          <p className="mt-1 text-sm text-white/80">Gestisci le fatture dei tuoi pazienti</p>
        </div>
        <NewInvoiceDialog nextNumber={nextNumber} onAdd={handleAddInvoice} />
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.title} className="gap-4 py-5">
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={filterPatient} onValueChange={setFilterPatient}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Paziente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i pazienti</SelectItem>
            {mockPatients.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.anagrafica.nome} {p.anagrafica.cognome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterMonth} onValueChange={setFilterMonth}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Mese" />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                <span className="capitalize">{m.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Invoice table */}
      <InvoiceTable invoices={filtered} onMarkPaid={handleMarkPaid} />
    </div>
  )
}
