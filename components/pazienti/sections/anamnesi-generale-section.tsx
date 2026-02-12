'use client'

import { useState } from 'react'
import { Pencil, Save, X } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/ui/radio-group'
import { Switch } from '@/components/shadcn/ui/switch'
import { Badge } from '@/components/shadcn/ui/badge'
import { Separator } from '@/components/shadcn/ui/separator'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/shadcn/ui/field'
import { DatePickerField } from '@/components/pazienti/forms/date-picker-field'
import { toast } from 'sonner'
import type { AnamnesiGenerale, Sesso } from '@/types/patient'

// ─── Constants ──────────────────────────────────────────────────────────────

const PERCEZIONE_OPTIONS = ['Pessima', 'Scarsa', 'Discreta', 'Buona', 'Ottima']

function calcBMI(peso: number | null, altezza: number | null): string | null {
  if (!peso || !altezza || altezza === 0) return null
  const h = altezza / 100
  const bmi = peso / (h * h)
  return bmi.toFixed(1)
}

function bmiCategory(bmi: number): { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' } {
  if (bmi < 18.5) return { label: 'Sottopeso', variant: 'secondary' }
  if (bmi < 25) return { label: 'Normopeso', variant: 'default' }
  if (bmi < 30) return { label: 'Sovrappeso', variant: 'outline' }
  return { label: 'Obesità', variant: 'destructive' }
}

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

function BMIBadge({ peso, altezza }: { peso: number | null; altezza: number | null }) {
  const bmiVal = calcBMI(peso, altezza)
  if (!bmiVal) return <span className="text-sm">—</span>
  const num = parseFloat(bmiVal)
  const cat = bmiCategory(num)
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold">{bmiVal}</span>
      <Badge variant={cat.variant}>{cat.label}</Badge>
    </div>
  )
}

// ─── View ───────────────────────────────────────────────────────────────────

function AnamnesiGeneraleView({
  data,
  sesso,
  onEdit,
}: {
  data: AnamnesiGenerale
  sesso: Sesso | null
  onEdit: () => void
}) {
  const showGynFields = sesso === 'F' || sesso === 'Altro'

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Anamnesi Generale</h3>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="size-3.5" />
            Modifica
          </Button>
        </div>

        {/* Misure */}
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Misure Antropometriche
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoRow
              label="Peso"
              value={data.peso != null ? `${data.peso} kg` : ''}
            />
            <InfoRow
              label="Altezza"
              value={data.altezza != null ? `${data.altezza} cm` : ''}
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-muted-foreground text-xs font-medium">BMI</span>
              <BMIBadge peso={data.peso} altezza={data.altezza} />
            </div>
          </div>
        </div>

        {/* Storia clinica */}
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Storia Clinica
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoRow label="Infortuni pregressi" value={data.infortuniPregressi} />
            <InfoRow
              label="Data ultimo infortunio"
              value={formatDate(data.dataUltimoInfortunio)}
            />
            <InfoRow label="Limitazioni funzionali" value={data.limitazioniFunzionali} />
            <InfoRow label="Patologie croniche note" value={data.patologieCronicheNote} />
            <InfoRow label="Interventi chirurgici" value={data.interventiChirurgici} />
            <InfoRow label="Farmaci abituali" value={data.farmaciAbituali} />
          </div>
        </div>

        {/* Trattamenti */}
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Trattamenti
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoRow label="Terapie fisiche eseguite" value={data.terapieFisicheEseguite} />
            <InfoRow label="Trattamenti complementari" value={data.trattamentiComplementari} />
            <InfoRow label="Allergie note" value={data.allergieNote} />
            <InfoRow label="Percezione condizione" value={data.percezioneCondizione} />
          </div>
        </div>

        {/* Ginecologici */}
        {showGynFields && (data.gravidanza || data.menopausa) && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
              Info Ginecologiche
            </p>
            <Separator className="mb-3" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow label="Gravidanza" value={data.gravidanza} />
              <InfoRow label="Menopausa" value={data.menopausa} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Edit ───────────────────────────────────────────────────────────────────

function AnamnesiGeneraleEdit({
  data,
  sesso,
  onSave,
  onCancel,
}: {
  data: AnamnesiGenerale
  sesso: Sesso | null
  onSave: (d: AnamnesiGenerale) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<AnamnesiGenerale>({ ...data })
  const showGynFields = sesso === 'F' || sesso === 'Altro'

  function update<K extends keyof AnamnesiGenerale>(key: K, value: AnamnesiGenerale[K]) {
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
              <h3 className="text-base font-semibold">Modifica Anamnesi Generale</h3>
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

            {/* Misure */}
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Misure Antropometriche
              </p>
              <Separator className="mb-1" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="edit-peso">Peso</FieldLabel>
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-peso"
                    type="number"
                    min={0}
                    step={0.1}
                    value={form.peso ?? ''}
                    onChange={(e) =>
                      update('peso', e.target.value ? Number(e.target.value) : null)
                    }
                    className="max-w-24"
                  />
                  <span className="text-muted-foreground text-sm">kg</span>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-altezza">Altezza</FieldLabel>
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-altezza"
                    type="number"
                    min={0}
                    value={form.altezza ?? ''}
                    onChange={(e) =>
                      update('altezza', e.target.value ? Number(e.target.value) : null)
                    }
                    className="max-w-24"
                  />
                  <span className="text-muted-foreground text-sm">cm</span>
                </div>
              </Field>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs font-medium">BMI (calcolato)</span>
                <BMIBadge peso={form.peso} altezza={form.altezza} />
              </div>
            </div>

            {/* Storia clinica */}
            <div className="mt-2">
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Storia Clinica
              </p>
              <Separator className="mb-1" />
            </div>

            <Field>
              <FieldLabel htmlFor="edit-infortuni">Infortuni pregressi</FieldLabel>
              <Textarea
                id="edit-infortuni"
                value={form.infortuniPregressi}
                onChange={(e) => update('infortuniPregressi', e.target.value)}
                placeholder="Es. Distorsione caviglia dx (2020), frattura clavicola (2018)..."
                rows={2}
              />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel>Data ultimo infortunio</FieldLabel>
                <DatePickerField
                  name="dataUltimoInfortunio"
                  value={form.dataUltimoInfortunio}
                  placeholder="Seleziona data"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-limitazioni">Limitazioni funzionali</FieldLabel>
                <Textarea
                  id="edit-limitazioni"
                  value={form.limitazioniFunzionali}
                  onChange={(e) => update('limitazioniFunzionali', e.target.value)}
                  placeholder="Descrivi eventuali limitazioni..."
                  rows={2}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="edit-patologie">Patologie croniche note</FieldLabel>
              <Textarea
                id="edit-patologie"
                value={form.patologieCronicheNote}
                onChange={(e) => update('patologieCronicheNote', e.target.value)}
                placeholder="Es. Diabete tipo 2, ipertensione, asma..."
                rows={2}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-chirurgici">Interventi chirurgici</FieldLabel>
              <Textarea
                id="edit-chirurgici"
                value={form.interventiChirurgici}
                onChange={(e) => update('interventiChirurgici', e.target.value)}
                placeholder="Es. Artroscopia ginocchio dx (2019)..."
                rows={2}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-farmaci">Farmaci assunti abitualmente</FieldLabel>
              <Textarea
                id="edit-farmaci"
                value={form.farmaciAbituali}
                onChange={(e) => update('farmaciAbituali', e.target.value)}
                placeholder="Es. Metformina 500mg, Ibuprofene al bisogno..."
                rows={2}
              />
            </Field>

            {/* Trattamenti */}
            <div className="mt-2">
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Trattamenti
              </p>
              <Separator className="mb-1" />
            </div>

            <Field>
              <FieldLabel htmlFor="edit-terapie">Terapie fisiche eseguite</FieldLabel>
              <Textarea
                id="edit-terapie"
                value={form.terapieFisicheEseguite}
                onChange={(e) => update('terapieFisicheEseguite', e.target.value)}
                placeholder="Es. Fisioterapia post-operatoria (10 sedute, 2022)..."
                rows={2}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-complementari">Trattamenti complementari</FieldLabel>
              <Textarea
                id="edit-complementari"
                value={form.trattamentiComplementari}
                onChange={(e) => update('trattamentiComplementari', e.target.value)}
                placeholder="Es. Agopuntura, osteopatia, massaggi..."
                rows={2}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-allergie">Allergie note</FieldLabel>
              <Textarea
                id="edit-allergie"
                value={form.allergieNote}
                onChange={(e) => update('allergieNote', e.target.value)}
                placeholder="Es. Penicillina, lattice, FANS..."
                rows={2}
              />
            </Field>

            <Field>
              <FieldLabel>Percezione della propria condizione</FieldLabel>
              <RadioGroup
                value={form.percezioneCondizione}
                onValueChange={(v) => update('percezioneCondizione', v)}
                className="flex flex-wrap gap-3"
              >
                {PERCEZIONE_OPTIONS.map((opt) => (
                  <div key={opt} className="flex items-center gap-1.5">
                    <RadioGroupItem value={opt} id={`percezione-${opt}`} />
                    <label htmlFor={`percezione-${opt}`} className="text-sm">
                      {opt}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </Field>

            {/* Ginecologici */}
            {showGynFields && (
              <>
                <div className="mt-2">
                  <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                    Info Ginecologiche
                  </p>
                  <Separator className="mb-1" />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="edit-gravidanza">Gravidanza</FieldLabel>
                      <Switch
                        id="edit-gravidanza"
                        checked={form.gravidanza === 'Sì'}
                        onCheckedChange={(v) => update('gravidanza', v ? 'Sì' : 'No')}
                      />
                    </div>
                  </Field>
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="edit-menopausa">Menopausa</FieldLabel>
                      <Switch
                        id="edit-menopausa"
                        checked={form.menopausa === 'Sì'}
                        onCheckedChange={(v) => update('menopausa', v ? 'Sì' : 'No')}
                      />
                    </div>
                  </Field>
                </div>
              </>
            )}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

// ─── Main ───────────────────────────────────────────────────────────────────

interface AnamnesiGeneraleSectionProps {
  data: AnamnesiGenerale
  sesso: Sesso | null
  onSave: (d: AnamnesiGenerale) => void
}

export function AnamnesiGeneraleSection({ data, sesso, onSave }: AnamnesiGeneraleSectionProps) {
  const [isEditing, setIsEditing] = useState(false)

  function handleSave(d: AnamnesiGenerale) {
    onSave(d)
    setIsEditing(false)
    toast.success('Anamnesi generale salvata')
  }

  if (isEditing) {
    return (
      <AnamnesiGeneraleEdit
        data={data}
        sesso={sesso}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    )
  }

  return <AnamnesiGeneraleView data={data} sesso={sesso} onEdit={() => setIsEditing(true)} />
}
