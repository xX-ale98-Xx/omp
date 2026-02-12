'use client'

import { useState } from 'react'
import { Pencil, Save, X } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { Separator } from '@/components/shadcn/ui/separator'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/shadcn/ui/field'
import { toast } from 'sonner'
import type { TestFisici } from '@/types/patient'

function InfoRow({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <span className="text-sm">
        {value ? (unit ? `${value} ${unit}` : value) : '—'}
      </span>
    </div>
  )
}

// ─── View ───────────────────────────────────────────────────────────────────

function TestFisiciView({
  data,
  onEdit,
}: {
  data: TestFisici
  onEdit: () => void
}) {
  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Test Fisici</h3>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="size-3.5" />
            Modifica
          </Button>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Misurazioni
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoRow label="ROM (Range of Motion)" value={data.rom} />
            <InfoRow label="Forza muscolare" value={data.forzaMuscolare} />
            <InfoRow label="Altezza salto verticale" value={data.altezzaSaltoVerticale} unit="cm" />
            <InfoRow label="Sprint velocity" value={data.sprintVelocity} unit="sec" />
            <InfoRow label="Equilibrio / Sway" value={data.equilibrioSway} />
          </div>
        </div>

        {data.postura && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
              Valutazione Posturale
            </p>
            <Separator className="mb-3" />
            <p className="text-sm">{data.postura}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Edit ───────────────────────────────────────────────────────────────────

function TestFisiciEdit({
  data,
  onSave,
  onCancel,
}: {
  data: TestFisici
  onSave: (d: TestFisici) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<TestFisici>({ ...data })

  function update<K extends keyof TestFisici>(key: K, value: TestFisici[K]) {
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
              <h3 className="text-base font-semibold">Modifica Test Fisici</h3>
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
                Misurazioni
              </p>
              <Separator className="mb-1" />
            </div>

            <Field>
              <FieldLabel htmlFor="edit-rom">ROM (Range of Motion)</FieldLabel>
              <Input
                id="edit-rom"
                value={form.rom}
                onChange={(e) => update('rom', e.target.value)}
                placeholder="Es. Spalla dx: 160°, Ginocchio sx: 130°"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-forza">Forza muscolare</FieldLabel>
              <Input
                id="edit-forza"
                value={form.forzaMuscolare}
                onChange={(e) => update('forzaMuscolare', e.target.value)}
                placeholder="Es. Quadricipite dx: 4/5 MRC"
              />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-salto">Altezza salto verticale</FieldLabel>
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-salto"
                    value={form.altezzaSaltoVerticale}
                    onChange={(e) => update('altezzaSaltoVerticale', e.target.value)}
                    placeholder="35"
                    className="max-w-24"
                  />
                  <span className="text-muted-foreground text-sm">cm</span>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-sprint">Sprint velocity</FieldLabel>
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-sprint"
                    value={form.sprintVelocity}
                    onChange={(e) => update('sprintVelocity', e.target.value)}
                    placeholder="4.2"
                    className="max-w-24"
                  />
                  <span className="text-muted-foreground text-sm">sec</span>
                </div>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="edit-equilibrio">Equilibrio / Sway</FieldLabel>
              <Input
                id="edit-equilibrio"
                value={form.equilibrioSway}
                onChange={(e) => update('equilibrioSway', e.target.value)}
                placeholder="Descrizione qualitativa dell'equilibrio..."
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-postura">Valutazione posturale</FieldLabel>
              <Textarea
                id="edit-postura"
                value={form.postura}
                onChange={(e) => update('postura', e.target.value)}
                placeholder="Descrivi la valutazione posturale..."
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

interface TestFisiciSectionProps {
  data: TestFisici
  onSave: (d: TestFisici) => void
}

export function TestFisiciSection({ data, onSave }: TestFisiciSectionProps) {
  const [isEditing, setIsEditing] = useState(false)

  function handleSave(d: TestFisici) {
    onSave(d)
    setIsEditing(false)
    toast.success('Test fisici salvati')
  }

  if (isEditing) {
    return (
      <TestFisiciEdit data={data} onSave={handleSave} onCancel={() => setIsEditing(false)} />
    )
  }

  return <TestFisiciView data={data} onEdit={() => setIsEditing(true)} />
}
