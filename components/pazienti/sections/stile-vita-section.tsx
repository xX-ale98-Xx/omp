'use client'

import { useState } from 'react'
import { Pencil, Save, X } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/ui/radio-group'
import { Slider } from '@/components/shadcn/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import { Separator } from '@/components/shadcn/ui/separator'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/shadcn/ui/field'
import { toast } from 'sonner'
import type { StileVita } from '@/types/patient'

// ─── Constants ──────────────────────────────────────────────────────────────

const ALCOOL_OPTIONS = ['Nessuno', 'Occasionale', 'Moderato', 'Frequente']
const FUMO_OPTIONS = ['No', 'Ex-fumatore', 'Sì, occasionale', 'Sì, abituale']
const ATTIVITA_OPTIONS = ['Sedentario', 'Leggera', 'Moderata', 'Intensa']
const DIETA_OPTIONS = ['Onnivora', 'Vegetariana', 'Vegana', 'Senza glutine', 'Altro']
const FREQUENZA_OPTIONS = ['Mai', '1-2 v/sett', '3-4 v/sett', '5+ v/sett']
const STATO_CIVILE_OPTIONS = [
  'Celibe/Nubile',
  'Sposato/a',
  'Convivente',
  'Divorziato/a',
  'Vedovo/a',
]

function stressLabel(value: number) {
  if (value <= 2) return 'Basso'
  if (value <= 5) return 'Moderato'
  if (value <= 7) return 'Alto'
  return 'Molto alto'
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <span className="text-sm">{value || '—'}</span>
    </div>
  )
}

// ─── View ───────────────────────────────────────────────────────────────────

function StileVitaView({
  data,
  onEdit,
}: {
  data: StileVita
  onEdit: () => void
}) {
  const stressNum = parseInt(data.stressPercepito) || 0

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Stile di Vita</h3>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="size-3.5" />
            Modifica
          </Button>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Abitudini
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="Uso alcool" value={data.usoAlcool} />
            <InfoRow label="Fumo" value={data.fumo} />
            <InfoRow label="Dieta" value={data.dieta} />
            <InfoRow label="Attività fisica" value={data.attivitaFisica} />
            <InfoRow label="Frequenza attività" value={data.frequenzaAttivitaFisica} />
            <InfoRow
              label="Ore seduto/giorno"
              value={data.oreSedutoGiorno != null ? `${data.oreSedutoGiorno} ore` : ''}
            />
          </div>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Personale
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="Stato civile" value={data.statoCivile} />
            <div className="flex flex-col gap-0.5">
              <span className="text-muted-foreground text-xs font-medium">Stress percepito</span>
              <span className="text-sm">
                {data.stressPercepito
                  ? `${data.stressPercepito}/10 — ${stressLabel(stressNum)}`
                  : '—'}
              </span>
            </div>
          </div>
        </div>

        {data.obiettivoTrattamento && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
              Obiettivo Trattamento
            </p>
            <Separator className="mb-3" />
            <p className="text-sm">{data.obiettivoTrattamento}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Edit ───────────────────────────────────────────────────────────────────

function StileVitaEdit({
  data,
  onSave,
  onCancel,
}: {
  data: StileVita
  onSave: (d: StileVita) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<StileVita>({ ...data })

  function update<K extends keyof StileVita>(key: K, value: StileVita[K]) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  const stressNum = parseInt(form.stressPercepito) || 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Modifica Stile di Vita</h3>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                  <X className="size-3.5" />
                  Annulla
                </Button>
                <Button type="submit" size="sm">
                  <Save className="size-3.5" />
                  Salva
                </Button>
              </div>
            </div>

            {/* Abitudini */}
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Abitudini
              </p>
              <Separator className="mb-1" />
            </div>

            <Field>
              <FieldLabel>Uso alcool</FieldLabel>
              <RadioGroup
                value={form.usoAlcool}
                onValueChange={(v) => update('usoAlcool', v)}
                className="flex flex-wrap gap-3"
              >
                {ALCOOL_OPTIONS.map((opt) => (
                  <div key={opt} className="flex items-center gap-1.5">
                    <RadioGroupItem value={opt} id={`alcool-${opt}`} />
                    <label htmlFor={`alcool-${opt}`} className="text-sm">
                      {opt}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </Field>

            <Field>
              <FieldLabel>Fumo</FieldLabel>
              <RadioGroup
                value={form.fumo}
                onValueChange={(v) => update('fumo', v)}
                className="flex flex-wrap gap-3"
              >
                {FUMO_OPTIONS.map((opt) => (
                  <div key={opt} className="flex items-center gap-1.5">
                    <RadioGroupItem value={opt} id={`fumo-${opt}`} />
                    <label htmlFor={`fumo-${opt}`} className="text-sm">
                      {opt}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel>Dieta</FieldLabel>
                <Select value={form.dieta} onValueChange={(v) => update('dieta', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {DIETA_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Stato civile</FieldLabel>
                <Select
                  value={form.statoCivile}
                  onValueChange={(v) => update('statoCivile', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {STATO_CIVILE_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <FieldLabel>Attività fisica</FieldLabel>
              <RadioGroup
                value={form.attivitaFisica}
                onValueChange={(v) => update('attivitaFisica', v)}
                className="flex flex-wrap gap-3"
              >
                {ATTIVITA_OPTIONS.map((opt) => (
                  <div key={opt} className="flex items-center gap-1.5">
                    <RadioGroupItem value={opt} id={`attivita-${opt}`} />
                    <label htmlFor={`attivita-${opt}`} className="text-sm">
                      {opt}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel>Frequenza attività fisica</FieldLabel>
                <Select
                  value={form.frequenzaAttivitaFisica}
                  onValueChange={(v) => update('frequenzaAttivitaFisica', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENZA_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-ore-seduto">Ore seduto al giorno</FieldLabel>
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-ore-seduto"
                    type="number"
                    min={0}
                    max={24}
                    step={0.5}
                    value={form.oreSedutoGiorno ?? ''}
                    onChange={(e) =>
                      update('oreSedutoGiorno', e.target.value ? Number(e.target.value) : null)
                    }
                    className="max-w-24"
                  />
                  <span className="text-muted-foreground text-sm">ore/giorno</span>
                </div>
              </Field>
            </div>

            {/* Stress */}
            <Field>
              <FieldLabel>Stress percepito</FieldLabel>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stressNum}</span>
                  <span className="text-muted-foreground text-sm">{stressLabel(stressNum)}</span>
                </div>
                <Slider
                  value={[stressNum]}
                  onValueChange={([v]) => update('stressPercepito', String(v))}
                  min={0}
                  max={10}
                  step={1}
                />
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>0 — Nessuno</span>
                  <span>5 — Moderato</span>
                  <span>10 — Molto alto</span>
                </div>
              </div>
            </Field>

            {/* Obiettivo */}
            <Field>
              <FieldLabel htmlFor="edit-obiettivo">Obiettivo trattamento</FieldLabel>
              <Textarea
                id="edit-obiettivo"
                value={form.obiettivoTrattamento}
                onChange={(e) => update('obiettivoTrattamento', e.target.value)}
                placeholder="Descrivi l'obiettivo del trattamento..."
                rows={3}
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

// ─── Main ───────────────────────────────────────────────────────────────────

interface StileVitaSectionProps {
  data: StileVita
  onSave: (d: StileVita) => void
}

export function StileVitaSection({ data, onSave }: StileVitaSectionProps) {
  const [isEditing, setIsEditing] = useState(false)

  function handleSave(d: StileVita) {
    onSave(d)
    setIsEditing(false)
    toast.success('Stile di vita salvato')
  }

  if (isEditing) {
    return (
      <StileVitaEdit data={data} onSave={handleSave} onCancel={() => setIsEditing(false)} />
    )
  }

  return <StileVitaView data={data} onEdit={() => setIsEditing(true)} />
}
