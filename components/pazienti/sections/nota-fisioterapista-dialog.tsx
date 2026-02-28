'use client'

import { useState } from 'react'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/ui/radio-group'
import { Field, FieldGroup, FieldLabel } from '@/components/shadcn/ui/field'
import type { NotaFisioterapista, CategoriaNota, PrioritaNota } from '@/types/patient'

const CATEGORIA_OPTIONS: CategoriaNota[] = [
  'Osservazione clinica',
  'Obiettivo terapeutico',
  'Evoluzione',
  'Comunicazione paziente',
  'Promemoria',
  'Altro',
]

const PRIORITA_OPTIONS: { value: PrioritaNota; label: string }[] = [
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Media' },
  { value: 'bassa', label: 'Bassa' },
]

type NotaFormData = Omit<NotaFisioterapista, 'id' | 'dataCreazione' | 'dataModifica'>

function emptyNota(): NotaFormData {
  return {
    titolo: '',
    contenuto: '',
    categoria: 'Osservazione clinica',
    priorita: 'media',
  }
}

interface NotaFisioterapistaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nota?: NotaFisioterapista | null
  onSave: (data: NotaFormData) => void
}

export function NotaFisioterapistaDialog({
  open,
  onOpenChange,
  nota,
  onSave,
}: NotaFisioterapistaDialogProps) {
  const isEditing = !!nota
  const [form, setForm] = useState<NotaFormData>(
    nota
      ? { titolo: nota.titolo, contenuto: nota.contenuto, categoria: nota.categoria, priorita: nota.priorita }
      : emptyNota()
  )

  function handleOpenChange(isOpen: boolean) {
    if (isOpen) {
      setForm(
        nota
          ? { titolo: nota.titolo, contenuto: nota.contenuto, categoria: nota.categoria, priorita: nota.priorita }
          : emptyNota()
      )
    }
    onOpenChange(isOpen)
  }

  function update<K extends keyof NotaFormData>(key: K, value: NotaFormData[K]) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Modifica Nota' : 'Nuova Nota'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica i dati della nota del fisioterapista.'
              : 'Inserisci una nuova nota clinica.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="nota-titolo">Titolo</FieldLabel>
              <Input
                id="nota-titolo"
                value={form.titolo}
                onChange={(e) => update('titolo', e.target.value)}
                placeholder="Titolo della nota..."
              />
            </Field>

            <Field>
              <FieldLabel>Categoria</FieldLabel>
              <Select
                value={form.categoria}
                onValueChange={(v) => update('categoria', v as CategoriaNota)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona categoria..." />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIA_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Priorita</FieldLabel>
              <RadioGroup
                value={form.priorita}
                onValueChange={(v) => update('priorita', v as PrioritaNota)}
                className="flex gap-4"
              >
                {PRIORITA_OPTIONS.map((opt) => (
                  <div key={opt.value} className="flex items-center gap-2">
                    <RadioGroupItem value={opt.value} id={`priorita-${opt.value}`} />
                    <label htmlFor={`priorita-${opt.value}`} className="cursor-pointer text-sm">
                      {opt.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="nota-contenuto">Contenuto</FieldLabel>
              <Textarea
                id="nota-contenuto"
                value={form.contenuto}
                onChange={(e) => update('contenuto', e.target.value)}
                placeholder="Osservazioni cliniche, obiettivi, note..."
                rows={5}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annulla
            </Button>
            <Button type="submit">{isEditing ? 'Salva modifiche' : 'Aggiungi nota'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
