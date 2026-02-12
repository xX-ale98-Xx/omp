'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
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
import { Field, FieldGroup, FieldLabel } from '@/components/shadcn/ui/field'
import { DatePickerField } from '@/components/pazienti/forms/date-picker-field'
import type { RefertoMedico } from '@/types/patient'

const TIPO_ESAME_OPTIONS = [
  'Radiografia',
  'Risonanza Magnetica',
  'TAC',
  'Ecografia',
  'Elettromiografia',
  'Esame del sangue',
  'Altro',
]

function emptyReferto(): Omit<RefertoMedico, 'id'> {
  return {
    tipoEsame: '',
    dataReferto: null,
    medicoRefertante: '',
    descrizione: '',
    immagineUrl: '',
    raccomandazioniTerapeutiche: '',
  }
}

interface RefertoFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  referto?: RefertoMedico | null
  onSave: (data: Omit<RefertoMedico, 'id'>) => void
}

export function RefertoFormDialog({
  open,
  onOpenChange,
  referto,
  onSave,
}: RefertoFormDialogProps) {
  const isEditing = !!referto
  const [form, setForm] = useState<Omit<RefertoMedico, 'id'>>(
    referto ? { ...referto } : emptyReferto()
  )
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  // Reset form when dialog opens with different referto
  function handleOpenChange(isOpen: boolean) {
    if (isOpen) {
      setForm(referto ? { ...referto } : emptyReferto())
      setFileName(null)
    }
    onOpenChange(isOpen)
  }

  function update<K extends keyof Omit<RefertoMedico, 'id'>>(
    key: K,
    value: Omit<RefertoMedico, 'id'>[K]
  ) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setFileName(file.name)
      // Mock: in production this would upload the file
      update('immagineUrl', `mock://${file.name}`)
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      update('immagineUrl', `mock://${file.name}`)
    }
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
          <DialogTitle>{isEditing ? 'Modifica Referto' : 'Nuovo Referto'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica i dati del referto medico.'
              : 'Inserisci i dati del referto medico.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel>Tipo esame</FieldLabel>
              <Select
                value={form.tipoEsame}
                onValueChange={(v) => update('tipoEsame', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo esame..." />
                </SelectTrigger>
                <SelectContent>
                  {TIPO_ESAME_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel>Data referto</FieldLabel>
                <DatePickerField
                  name="dataReferto"
                  value={form.dataReferto}
                  placeholder="Seleziona data"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-medico-ref">Medico refertante</FieldLabel>
                <Input
                  id="edit-medico-ref"
                  value={form.medicoRefertante}
                  onChange={(e) => update('medicoRefertante', e.target.value)}
                  placeholder="Dr. / Dr.ssa..."
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="edit-descrizione-ref">Descrizione</FieldLabel>
              <Textarea
                id="edit-descrizione-ref"
                value={form.descrizione}
                onChange={(e) => update('descrizione', e.target.value)}
                placeholder="Esito dell'esame, conclusioni diagnostiche..."
                rows={4}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-raccomandazioni">Raccomandazioni terapeutiche</FieldLabel>
              <Textarea
                id="edit-raccomandazioni"
                value={form.raccomandazioniTerapeutiche}
                onChange={(e) => update('raccomandazioniTerapeutiche', e.target.value)}
                placeholder="Indicazioni del medico..."
                rows={2}
              />
            </Field>

            {/* File upload area (mock) */}
            <Field>
              <FieldLabel>Immagine / Documento</FieldLabel>
              <div
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                }`}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragActive(true)
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleFileDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="text-muted-foreground mb-2 size-8" />
                {fileName ? (
                  <p className="text-sm font-medium">{fileName}</p>
                ) : (
                  <>
                    <p className="text-sm font-medium">
                      Trascina qui il file o clicca per selezionare
                    </p>
                    <p className="text-muted-foreground text-xs">
                      JPG, PNG, PDF (solo anteprima, upload non attivo)
                    </p>
                  </>
                )}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                />
              </div>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annulla
            </Button>
            <Button type="submit">{isEditing ? 'Salva modifiche' : 'Aggiungi referto'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
