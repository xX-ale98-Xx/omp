'use client'

import { useState } from 'react'
import { Pencil, Save, X } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
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
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import type { AnamnesiSpecifica } from '@/types/patient'

// ─── Constants ──────────────────────────────────────────────────────────────

const TIPOLOGIA_OPTIONS = [
  'Acuto',
  'Sordo',
  'Bruciante',
  'Lancinante',
  'Pulsante',
  'Crampo',
  'Formicolio',
  'Altro',
]

const ESORDIO_OPTIONS = [
  'Improvviso',
  'Graduale',
  'Post-traumatico',
  'Post-chirurgico',
  'Non ricorda',
]

const ANDAMENTO_OPTIONS = [
  'Costante',
  'Intermittente',
  'Peggioramento',
  'Miglioramento',
  'Stabile',
]

// ─── NRS Pain Slider ────────────────────────────────────────────────────────

function nrsColor(value: number): string {
  if (value <= 2) return 'text-green-600 dark:text-green-400'
  if (value <= 5) return 'text-yellow-600 dark:text-yellow-400'
  if (value <= 7) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
}

function nrsLabel(value: number): string {
  if (value === 0) return 'Nessun dolore'
  if (value <= 3) return 'Lieve'
  if (value <= 5) return 'Moderato'
  if (value <= 7) return 'Forte'
  return 'Peggior dolore immaginabile'
}

function NRSDisplay({ value }: { value: number | null }) {
  const v = value ?? 0
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={cn('text-4xl font-bold', nrsColor(v))}>{v}</span>
      <span className={cn('text-sm font-medium', nrsColor(v))}>{nrsLabel(v)}</span>
      <span className="text-muted-foreground text-xs">/10 NRS</span>
    </div>
  )
}

function NRSSlider({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center">
        <span className={cn('text-5xl font-bold tabular-nums', nrsColor(value))}>{value}</span>
      </div>
      <p className={cn('text-center text-sm font-medium', nrsColor(value))}>
        {nrsLabel(value)}
      </p>
      <div className="px-1">
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={0}
          max={10}
          step={1}
        />
      </div>
      <div className="text-muted-foreground flex justify-between px-1 text-xs">
        <span>0 — Nessun dolore</span>
        <span>5 — Moderato</span>
        <span>10 — Insopportabile</span>
      </div>
    </div>
  )
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

function AnamnesiSpecificaView({
  data,
  onEdit,
}: {
  data: AnamnesiSpecifica
  onEdit: () => void
}) {
  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Anamnesi Specifica</h3>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="size-3.5" />
            Modifica
          </Button>
        </div>

        {/* Motivo */}
        {data.motivoTerapia && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
              Motivo della Terapia
            </p>
            <Separator className="mb-3" />
            <p className="text-sm">{data.motivoTerapia}</p>
          </div>
        )}

        {/* Dolore */}
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Valutazione Dolore
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr]">
            <NRSDisplay value={data.intensitaDolore} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow label="Localizzazione" value={data.localizzazioneDolore} />
              <InfoRow label="Irradiazione" value={data.irradiazioneDolore} />
              <InfoRow label="Tipologia" value={data.tipologiaDolore} />
              <InfoRow label="Esordio" value={data.esordioProblema} />
              <InfoRow label="Andamento" value={data.andamentoTemporale} />
            </div>
          </div>
        </div>

        {/* Sintomi */}
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Sintomi e Fattori
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoRow label="Sintomi" value={data.sintomi} />
            <InfoRow label="Fattori aggravanti" value={data.fattoriAggravanti} />
            <InfoRow label="Fattori allevianti" value={data.fattoriAllevianti} />
            <InfoRow label="Limitazioni funzionali" value={data.limitazioniFunzionali} />
          </div>
        </div>

        {data.diagnosiPregresse && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
              Diagnosi Pregresse
            </p>
            <Separator className="mb-3" />
            <p className="text-sm">{data.diagnosiPregresse}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Edit ───────────────────────────────────────────────────────────────────

function AnamnesiSpecificaEdit({
  data,
  onSave,
  onCancel,
}: {
  data: AnamnesiSpecifica
  onSave: (d: AnamnesiSpecifica) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<AnamnesiSpecifica>({ ...data })

  function update<K extends keyof AnamnesiSpecifica>(key: K, value: AnamnesiSpecifica[K]) {
    setForm((p) => ({ ...p, [key]: value }))
  }

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
              <h3 className="text-base font-semibold">Modifica Anamnesi Specifica</h3>
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

            {/* Motivo */}
            <Field>
              <FieldLabel htmlFor="edit-motivo">Motivo della terapia</FieldLabel>
              <Textarea
                id="edit-motivo"
                value={form.motivoTerapia}
                onChange={(e) => update('motivoTerapia', e.target.value)}
                placeholder="Descrivi il motivo principale della terapia..."
                rows={3}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-sintomi">Sintomi</FieldLabel>
              <Textarea
                id="edit-sintomi"
                value={form.sintomi}
                onChange={(e) => update('sintomi', e.target.value)}
                placeholder="Descrivi i sintomi riferiti dal paziente..."
                rows={2}
              />
            </Field>

            {/* Dolore */}
            <div className="mt-2">
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Valutazione Dolore
              </p>
              <Separator className="mb-1" />
            </div>

            <Field>
              <FieldLabel>Intensità dolore (NRS)</FieldLabel>
              <NRSSlider
                value={form.intensitaDolore ?? 0}
                onChange={(v) => update('intensitaDolore', v)}
              />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-localizzazione">Localizzazione dolore</FieldLabel>
                <Input
                  id="edit-localizzazione"
                  value={form.localizzazioneDolore}
                  onChange={(e) => update('localizzazioneDolore', e.target.value)}
                  placeholder="Es. Spalla destra, Collo, Lombare..."
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-irradiazione">Irradiazione dolore</FieldLabel>
                <Input
                  id="edit-irradiazione"
                  value={form.irradiazioneDolore}
                  onChange={(e) => update('irradiazioneDolore', e.target.value)}
                  placeholder="Es. Dal collo al braccio dx..."
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Field>
                <FieldLabel>Tipologia dolore</FieldLabel>
                <Select
                  value={form.tipologiaDolore}
                  onValueChange={(v) => update('tipologiaDolore', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOLOGIA_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Esordio del problema</FieldLabel>
                <Select
                  value={form.esordioProblema}
                  onValueChange={(v) => update('esordioProblema', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {ESORDIO_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Andamento temporale</FieldLabel>
                <Select
                  value={form.andamentoTemporale}
                  onValueChange={(v) => update('andamentoTemporale', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {ANDAMENTO_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {/* Fattori */}
            <div className="mt-2">
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Fattori
              </p>
              <Separator className="mb-1" />
            </div>

            <Field>
              <FieldLabel htmlFor="edit-aggravanti">Fattori aggravanti</FieldLabel>
              <Textarea
                id="edit-aggravanti"
                value={form.fattoriAggravanti}
                onChange={(e) => update('fattoriAggravanti', e.target.value)}
                placeholder="Es. Camminare, stare seduto a lungo, sollevare pesi..."
                rows={2}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-allevianti">Fattori allevianti</FieldLabel>
              <Textarea
                id="edit-allevianti"
                value={form.fattoriAllevianti}
                onChange={(e) => update('fattoriAllevianti', e.target.value)}
                placeholder="Es. Riposo, ghiaccio, farmaci, calore..."
                rows={2}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-limitazioni-spec">Limitazioni funzionali</FieldLabel>
              <Textarea
                id="edit-limitazioni-spec"
                value={form.limitazioniFunzionali}
                onChange={(e) => update('limitazioniFunzionali', e.target.value)}
                placeholder="Descrivi le limitazioni funzionali specifiche..."
                rows={2}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-diagnosi">Diagnosi pregresse</FieldLabel>
              <Textarea
                id="edit-diagnosi"
                value={form.diagnosiPregresse}
                onChange={(e) => update('diagnosiPregresse', e.target.value)}
                placeholder="Diagnosi precedenti relative al problema..."
                rows={2}
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

// ─── Main ───────────────────────────────────────────────────────────────────

interface AnamnesiSpecificaSectionProps {
  data: AnamnesiSpecifica
  onSave: (d: AnamnesiSpecifica) => void
}

export function AnamnesiSpecificaSection({ data, onSave }: AnamnesiSpecificaSectionProps) {
  const [isEditing, setIsEditing] = useState(false)

  function handleSave(d: AnamnesiSpecifica) {
    onSave(d)
    setIsEditing(false)
    toast.success('Anamnesi specifica salvata')
  }

  if (isEditing) {
    return (
      <AnamnesiSpecificaEdit
        data={data}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    )
  }

  return <AnamnesiSpecificaView data={data} onEdit={() => setIsEditing(true)} />
}
