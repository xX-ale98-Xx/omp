'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import { mockPatients } from '@/lib/mock-patients'
import { formatCurrency } from '@/lib/patient-utils'
import type { Invoice, InvoiceItem } from '@/types/invoice'

interface NewInvoiceDialogProps {
  nextNumber: string
  onAdd: (invoice: Invoice) => void
}

const emptyItem: InvoiceItem = {
  descrizione: '',
  quantita: 1,
  prezzoUnitario: 60,
  totale: 60,
}

export function NewInvoiceDialog({ nextNumber, onAdd }: NewInvoiceDialogProps) {
  const [open, setOpen] = useState(false)
  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({
    patientId: '',
    dataEmissione: today,
    dataScadenza: '',
  })
  const [items, setItems] = useState<InvoiceItem[]>([{ ...emptyItem }])

  function addItem() {
    setItems((prev) => [...prev, { ...emptyItem }])
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  function updateItem(index: number, field: keyof InvoiceItem, value: string | number) {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item
        const updated = { ...item, [field]: value }
        if (field === 'quantita' || field === 'prezzoUnitario') {
          updated.totale = Number(updated.quantita) * Number(updated.prezzoUnitario)
        }
        return updated
      })
    )
  }

  const totale = items.reduce((sum, item) => sum + item.totale, 0)

  function handleSubmit() {
    if (!form.patientId) {
      toast.error('Selezionare un paziente')
      return
    }
    const validItems = items.filter((item) => item.descrizione)
    if (validItems.length === 0) {
      toast.error('Aggiungere almeno una voce')
      return
    }
    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      numero: nextNumber,
      patientId: form.patientId,
      dataEmissione: form.dataEmissione,
      dataScadenza: form.dataScadenza || form.dataEmissione,
      importo: totale,
      stato: 'non_pagata',
      descrizione: validItems.map((i) => i.descrizione).join(', '),
      voci: validItems,
    }
    onAdd(invoice)
    toast.success('Fattura creata')
    setOpen(false)
    setForm({ patientId: '', dataEmissione: today, dataScadenza: '' })
    setItems([{ ...emptyItem }])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-1 size-4" />
          Nuova Fattura
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nuova Fattura</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Numero:</span>
            <span className="text-sm">{nextNumber}</span>
          </div>
          <div>
            <label className="text-sm font-medium">Paziente</label>
            <Select
              value={form.patientId}
              onValueChange={(v) => setForm({ ...form, patientId: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona paziente" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.anagrafica.nome} {p.anagrafica.cognome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Data emissione</label>
              <Input
                type="date"
                value={form.dataEmissione}
                onChange={(e) => setForm({ ...form, dataEmissione: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Data scadenza</label>
              <Input
                type="date"
                value={form.dataScadenza}
                onChange={(e) => setForm({ ...form, dataScadenza: e.target.value })}
              />
            </div>
          </div>

          {/* Voci */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Voci</label>
              <Button type="button" variant="ghost" size="sm" onClick={addItem}>
                <Plus className="mr-1 size-3" />
                Aggiungi voce
              </Button>
            </div>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Voce {i + 1}</span>
                    {items.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => removeItem(i)}
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder="Descrizione"
                    value={item.descrizione}
                    onChange={(e) => updateItem(i, 'descrizione', e.target.value)}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs">Qtà</label>
                      <Input
                        type="number"
                        value={item.quantita}
                        onChange={(e) =>
                          updateItem(i, 'quantita', parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs">Prezzo unit.</label>
                      <Input
                        type="number"
                        value={item.prezzoUnitario}
                        onChange={(e) =>
                          updateItem(i, 'prezzoUnitario', parseFloat(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs">Totale</label>
                      <Input value={formatCurrency(item.totale)} disabled />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-3">
            <span className="text-sm font-semibold">Totale</span>
            <span className="text-lg font-bold">{formatCurrency(totale)}</span>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSubmit}>Crea</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
