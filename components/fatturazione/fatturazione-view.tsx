'use client'

import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/shadcn/ui/card'
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
import { InvoiceCard } from './invoice-card'
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

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fatturazione</h1>
          <p className="text-muted-foreground">Gestisci le fatture dei tuoi pazienti</p>
        </div>
        <NewInvoiceDialog nextNumber={nextNumber} onAdd={handleAddInvoice} />
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

      {/* Summary bar */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Totale fatturato</p>
            <p className="text-xl font-bold">{formatCurrency(totFatturato)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Incassato</p>
            <p className="text-xl font-bold text-green-600">{formatCurrency(totIncassato)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Da incassare</p>
            <p className="text-xl font-bold text-red-600">{formatCurrency(totDaIncassare)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice list */}
      {filtered.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          Nessuna fattura trovata
        </p>
      ) : (
        <div className="space-y-3">
          {filtered
            .sort((a, b) => b.dataEmissione.localeCompare(a.dataEmissione))
            .map((inv) => (
              <InvoiceCard key={inv.id} invoice={inv} onMarkPaid={handleMarkPaid} />
            ))}
        </div>
      )}
    </div>
  )
}
