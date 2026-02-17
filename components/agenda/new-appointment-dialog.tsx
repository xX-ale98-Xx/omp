'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
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
import type { Appointment } from '@/types/appointment'

const TIPI = ['Prima Visita', 'Fisioterapia', 'Terapia Manuale', 'Controllo']

interface NewAppointmentDialogProps {
  selectedDate: string
  onAdd: (appointment: Appointment) => void
}

export function NewAppointmentDialog({ selectedDate, onAdd }: NewAppointmentDialogProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    patientId: '',
    data: selectedDate,
    oraInizio: '09:00',
    oraFine: '09:45',
    tipo: '',
    importo: '60',
    note: '',
  })

  // Sync date when selectedDate changes
  function handleOpen(isOpen: boolean) {
    setOpen(isOpen)
    if (isOpen) {
      setForm((prev) => ({ ...prev, data: selectedDate }))
    }
  }

  function handleSubmit() {
    if (!form.patientId || !form.tipo) {
      toast.error('Compilare paziente e tipo')
      return
    }
    const appointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: form.patientId,
      data: form.data,
      oraInizio: form.oraInizio,
      oraFine: form.oraFine,
      tipo: form.tipo,
      note: form.note,
      stato: 'programmato',
      pagamento: 'da_pagare',
      importo: parseFloat(form.importo) || 60,
    }
    onAdd(appointment)
    toast.success('Appuntamento creato')
    setOpen(false)
    setForm({
      patientId: '',
      data: selectedDate,
      oraInizio: '09:00',
      oraFine: '09:45',
      tipo: '',
      importo: '60',
      note: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/30"
        >
          <Plus className="mr-1 size-4" />
          Nuovo Appuntamento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuovo Appuntamento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
          <div>
            <label className="text-sm font-medium">Data</label>
            <Input
              type="date"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Ora inizio</label>
              <Input
                type="time"
                value={form.oraInizio}
                onChange={(e) => setForm({ ...form, oraInizio: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Ora fine</label>
              <Input
                type="time"
                value={form.oraFine}
                onChange={(e) => setForm({ ...form, oraFine: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Tipo</label>
            <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona tipo" />
              </SelectTrigger>
              <SelectContent>
                {TIPI.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Importo (€)</label>
            <Input
              type="number"
              value={form.importo}
              onChange={(e) => setForm({ ...form, importo: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Note</label>
            <Textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={2}
            />
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
