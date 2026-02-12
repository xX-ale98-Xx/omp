'use client'

import { useState } from 'react'
import { Pencil, Save, X } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/ui/radio-group'
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
import { DatePickerField } from '@/components/pazienti/forms/date-picker-field'
import { toast } from 'sonner'
import type { PazienteSportivo } from '@/types/patient'

// ─── Constants ──────────────────────────────────────────────────────────────

const LIVELLO_OPTIONS = ['Amatoriale', 'Agonistico', 'Professionista', 'Elite']
const FREQUENZA_OPTIONS = ['1-2', '3-4', '5-6', '7+']
const SONNO_OPTIONS = ['Scarsa', 'Sufficiente', 'Buona', 'Ottima']

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <span className="text-sm">{value || '—'}</span>
    </div>
  )
}

// ─── View ───────────────────────────────────────────────────────────────────

function SportivoView({
  data,
  onEdit,
}: {
  data: PazienteSportivo
  onEdit: () => void
}) {
  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Profilo Sportivo</h3>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="size-3.5" />
            Modifica
          </Button>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Sport
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="Sport principale" value={data.sportPrincipale} />
            <InfoRow label="Livello" value={data.livello} />
            <InfoRow label="Sport secondari" value={data.sportSecondari} />
            <InfoRow
              label="Anni di pratica"
              value={data.anniPratica != null ? `${data.anniPratica}` : ''}
            />
            <InfoRow
              label="Frequenza allenamenti"
              value={data.frequenzaAllenamenti ? `${data.frequenzaAllenamenti} v/sett` : ''}
            />
            <InfoRow
              label="Ore allenamento"
              value={data.oreAllenamenti != null ? `${data.oreAllenamenti} ore/sett` : ''}
            />
            <InfoRow label="Posizione / Ruolo" value={data.posizioneRuolo} />
            <InfoRow label="Date importanti" value={data.dateImportanti} />
          </div>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Benessere & Recupero
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="Qualità del sonno" value={data.qualitaSonno} />
            <InfoRow
              label="Data target ritorno sport"
              value={formatDate(data.dataTargetRitornoSport)}
            />
          </div>
        </div>

        {data.nutrizioneBase && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
              Nutrizione base
            </p>
            <Separator className="mb-3" />
            <p className="text-sm">{data.nutrizioneBase}</p>
          </div>
        )}

        {data.obiettiviFisiciSpecifici && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
              Obiettivi fisici specifici
            </p>
            <Separator className="mb-3" />
            <p className="text-sm">{data.obiettiviFisiciSpecifici}</p>
          </div>
        )}

        {data.noteCoach && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
              Note coach
            </p>
            <Separator className="mb-3" />
            <p className="text-sm">{data.noteCoach}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Edit ───────────────────────────────────────────────────────────────────

function SportivoEdit({
  data,
  onSave,
  onCancel,
}: {
  data: PazienteSportivo
  onSave: (d: PazienteSportivo) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<PazienteSportivo>({ ...data })

  function update<K extends keyof PazienteSportivo>(key: K, value: PazienteSportivo[K]) {
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
              <h3 className="text-base font-semibold">Modifica Profilo Sportivo</h3>
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

            <div>
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Sport
              </p>
              <Separator className="mb-1" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-sport">Sport principale</FieldLabel>
                <Input
                  id="edit-sport"
                  value={form.sportPrincipale}
                  onChange={(e) => update('sportPrincipale', e.target.value)}
                  placeholder="Es. Calcio, Tennis, Nuoto..."
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-secondari">Sport secondari</FieldLabel>
                <Input
                  id="edit-secondari"
                  value={form.sportSecondari}
                  onChange={(e) => update('sportSecondari', e.target.value)}
                  placeholder="Separati da virgola"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel>Livello</FieldLabel>
              <RadioGroup
                value={form.livello}
                onValueChange={(v) => update('livello', v)}
                className="flex flex-wrap gap-3"
              >
                {LIVELLO_OPTIONS.map((opt) => (
                  <div key={opt} className="flex items-center gap-1.5">
                    <RadioGroupItem value={opt} id={`livello-${opt}`} />
                    <label htmlFor={`livello-${opt}`} className="text-sm">
                      {opt}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="edit-anni">Anni di pratica</FieldLabel>
                <Input
                  id="edit-anni"
                  type="number"
                  min={0}
                  value={form.anniPratica ?? ''}
                  onChange={(e) =>
                    update('anniPratica', e.target.value ? Number(e.target.value) : null)
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Frequenza allenamenti</FieldLabel>
                <Select
                  value={form.frequenzaAllenamenti}
                  onValueChange={(v) => update('frequenzaAllenamenti', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENZA_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt} v/sett
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-ore-all">Ore allenamento</FieldLabel>
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-ore-all"
                    type="number"
                    min={0}
                    step={0.5}
                    value={form.oreAllenamenti ?? ''}
                    onChange={(e) =>
                      update('oreAllenamenti', e.target.value ? Number(e.target.value) : null)
                    }
                    className="max-w-24"
                  />
                  <span className="text-muted-foreground text-sm">ore/sett</span>
                </div>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-ruolo">Posizione / Ruolo</FieldLabel>
                <Input
                  id="edit-ruolo"
                  value={form.posizioneRuolo}
                  onChange={(e) => update('posizioneRuolo', e.target.value)}
                  placeholder="Es. Centrocampista, Ala destra..."
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-date-imp">Date importanti</FieldLabel>
                <Input
                  id="edit-date-imp"
                  value={form.dateImportanti}
                  onChange={(e) => update('dateImportanti', e.target.value)}
                  placeholder="Es. Campionato regionale 15/06"
                />
              </Field>
            </div>

            {/* Benessere */}
            <div className="mt-2">
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Benessere & Recupero
              </p>
              <Separator className="mb-1" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel>Qualità del sonno</FieldLabel>
                <RadioGroup
                  value={form.qualitaSonno}
                  onValueChange={(v) => update('qualitaSonno', v)}
                  className="flex flex-wrap gap-3"
                >
                  {SONNO_OPTIONS.map((opt) => (
                    <div key={opt} className="flex items-center gap-1.5">
                      <RadioGroupItem value={opt} id={`sonno-${opt}`} />
                      <label htmlFor={`sonno-${opt}`} className="text-sm">
                        {opt}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </Field>
              <Field>
                <FieldLabel>Data target ritorno sport</FieldLabel>
                <DatePickerField
                  name="dataTargetRitornoSport"
                  value={form.dataTargetRitornoSport}
                  placeholder="Seleziona data"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="edit-nutrizione">Nutrizione base</FieldLabel>
              <Textarea
                id="edit-nutrizione"
                value={form.nutrizioneBase}
                onChange={(e) => update('nutrizioneBase', e.target.value)}
                placeholder="Descrivi regime alimentare sportivo..."
                rows={2}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-obiettivi-sport">Obiettivi fisici specifici</FieldLabel>
              <Textarea
                id="edit-obiettivi-sport"
                value={form.obiettiviFisiciSpecifici}
                onChange={(e) => update('obiettiviFisiciSpecifici', e.target.value)}
                placeholder="Es. Recupero completo ginocchio, migliorare resistenza..."
                rows={2}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-note-coach">Note coach</FieldLabel>
              <Textarea
                id="edit-note-coach"
                value={form.noteCoach}
                onChange={(e) => update('noteCoach', e.target.value)}
                placeholder="Indicazioni dal preparatore atletico o allenatore..."
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

interface SportivoSectionProps {
  data: PazienteSportivo
  onSave: (d: PazienteSportivo) => void
}

export function SportivoSection({ data, onSave }: SportivoSectionProps) {
  const [isEditing, setIsEditing] = useState(false)

  function handleSave(d: PazienteSportivo) {
    onSave(d)
    setIsEditing(false)
    toast.success('Profilo sportivo salvato')
  }

  if (isEditing) {
    return (
      <SportivoEdit data={data} onSave={handleSave} onCancel={() => setIsEditing(false)} />
    )
  }

  return <SportivoView data={data} onEdit={() => setIsEditing(true)} />
}
