'use client'

import { useState } from 'react'
import { Pencil, Save, X } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
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
import type { Anagrafica } from '@/types/patient'

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function getSessoLabel(sesso: string | null) {
  if (sesso === 'M') return 'Maschio'
  if (sesso === 'F') return 'Femmina'
  if (sesso === 'Altro') return 'Altro'
  return '—'
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <span className="text-sm">{value || '—'}</span>
    </div>
  )
}

// ─── View Mode ──────────────────────────────────────────────────────────────

function AnagraficaView({
  anagrafica,
  onEdit,
}: {
  anagrafica: Anagrafica
  onEdit: () => void
}) {
  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Dati Anagrafici</h3>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="size-3.5" />
            Modifica
          </Button>
        </div>

        {/* Dati Personali */}
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Dati Personali
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="Nome" value={anagrafica.nome} />
            <InfoRow label="Cognome" value={anagrafica.cognome} />
            <InfoRow label="Sesso" value={getSessoLabel(anagrafica.sesso)} />
            <InfoRow label="Data di nascita" value={formatDate(anagrafica.dataNascita)} />
            <InfoRow label="Luogo di nascita" value={anagrafica.luogoNascita} />
            <InfoRow label="Stato di nascita" value={anagrafica.statoNascita} />
            <InfoRow label="Codice Fiscale" value={anagrafica.codiceFiscale} />
            <InfoRow label="Carta d'Identità" value={anagrafica.cartaIdentita} />
          </div>
        </div>

        {/* Residenza */}
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Residenza
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="Indirizzo residenza" value={anagrafica.indirizzoResidenza} />
            <InfoRow label="Indirizzo domicilio" value={anagrafica.indirizzoDomicilio} />
            <InfoRow label="CAP" value={anagrafica.cap} />
          </div>
        </div>

        {/* Contatti */}
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Contatti
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoRow label="Telefono" value={anagrafica.telefono} />
            <InfoRow label="Email" value={anagrafica.email} />
          </div>
        </div>

        {/* Sanitarie */}
        <div>
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Informazioni Sanitarie
          </p>
          <Separator className="mb-3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="ASL di appartenenza" value={anagrafica.aslAppartenenza} />
            <InfoRow label="Medico curante" value={anagrafica.medicoCurante} />
            <InfoRow
              label="Tipo assicurazione"
              value={anagrafica.tipoAssicurazione ?? '—'}
            />
            <InfoRow label="Compagnia assicurativa" value={anagrafica.compagniaAssicurativa} />
            <InfoRow label="N. di polizza" value={anagrafica.numeroPolizza} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Edit Mode ──────────────────────────────────────────────────────────────

function AnagraficaEdit({
  anagrafica,
  onSave,
  onCancel,
}: {
  anagrafica: Anagrafica
  onSave: (data: Anagrafica) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<Anagrafica>({ ...anagrafica })

  function update<K extends keyof Anagrafica>(key: K, value: Anagrafica[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
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
              <h3 className="text-base font-semibold">Modifica Dati Anagrafici</h3>
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

            {/* Dati Personali */}
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Dati Personali
              </p>
              <Separator className="mb-1" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-nome">Nome</FieldLabel>
                <Input
                  id="edit-nome"
                  value={form.nome}
                  onChange={(e) => update('nome', e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-cognome">Cognome</FieldLabel>
                <Input
                  id="edit-cognome"
                  value={form.cognome}
                  onChange={(e) => update('cognome', e.target.value)}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel>Sesso</FieldLabel>
                <RadioGroup
                  value={form.sesso ?? ''}
                  onValueChange={(v) => update('sesso', v as Anagrafica['sesso'])}
                  className="flex gap-4"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="M" id="edit-sesso-m" />
                    <label htmlFor="edit-sesso-m" className="text-sm">M</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="F" id="edit-sesso-f" />
                    <label htmlFor="edit-sesso-f" className="text-sm">F</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Altro" id="edit-sesso-altro" />
                    <label htmlFor="edit-sesso-altro" className="text-sm">Altro</label>
                  </div>
                </RadioGroup>
              </Field>
              <Field>
                <FieldLabel>Data di nascita</FieldLabel>
                <DatePickerField
                  name="dataNascita"
                  value={form.dataNascita}
                  placeholder="Seleziona data"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-luogoNascita">Luogo di nascita</FieldLabel>
                <Input
                  id="edit-luogoNascita"
                  value={form.luogoNascita}
                  onChange={(e) => update('luogoNascita', e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-statoNascita">Stato di nascita</FieldLabel>
                <Input
                  id="edit-statoNascita"
                  value={form.statoNascita}
                  onChange={(e) => update('statoNascita', e.target.value)}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-codiceFiscale">Codice Fiscale</FieldLabel>
                <Input
                  id="edit-codiceFiscale"
                  value={form.codiceFiscale}
                  onChange={(e) => update('codiceFiscale', e.target.value)}
                  className="uppercase"
                  maxLength={16}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-cartaIdentita">Carta d&apos;Identità</FieldLabel>
                <Input
                  id="edit-cartaIdentita"
                  value={form.cartaIdentita}
                  onChange={(e) => update('cartaIdentita', e.target.value)}
                />
              </Field>
            </div>

            {/* Residenza */}
            <div className="mt-2">
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Residenza
              </p>
              <Separator className="mb-1" />
            </div>

            <Field>
              <FieldLabel htmlFor="edit-residenza">Indirizzo di residenza</FieldLabel>
              <Input
                id="edit-residenza"
                value={form.indirizzoResidenza}
                onChange={(e) => update('indirizzoResidenza', e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-domicilio">Indirizzo di domicilio</FieldLabel>
              <Input
                id="edit-domicilio"
                value={form.indirizzoDomicilio}
                onChange={(e) => update('indirizzoDomicilio', e.target.value)}
              />
            </Field>

            <Field className="max-w-32">
              <FieldLabel htmlFor="edit-cap">CAP</FieldLabel>
              <Input
                id="edit-cap"
                value={form.cap}
                onChange={(e) => update('cap', e.target.value)}
                maxLength={5}
              />
            </Field>

            {/* Contatti */}
            <div className="mt-2">
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Contatti
              </p>
              <Separator className="mb-1" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-telefono">Telefono</FieldLabel>
                <Input
                  id="edit-telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => update('telefono', e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-email">Email</FieldLabel>
                <Input
                  id="edit-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
              </Field>
            </div>

            {/* Sanitarie */}
            <div className="mt-2">
              <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                Informazioni Sanitarie
              </p>
              <Separator className="mb-1" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-asl">ASL di appartenenza</FieldLabel>
                <Input
                  id="edit-asl"
                  value={form.aslAppartenenza}
                  onChange={(e) => update('aslAppartenenza', e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-medico">Medico curante</FieldLabel>
                <Input
                  id="edit-medico"
                  value={form.medicoCurante}
                  onChange={(e) => update('medicoCurante', e.target.value)}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel>Tipo assicurazione</FieldLabel>
                <Select
                  value={form.tipoAssicurazione ?? ''}
                  onValueChange={(v) =>
                    update('tipoAssicurazione', v as Anagrafica['tipoAssicurazione'])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SSN">SSN</SelectItem>
                    <SelectItem value="Privata">Privata</SelectItem>
                    <SelectItem value="Mista">Mista</SelectItem>
                    <SelectItem value="Nessuna">Nessuna</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-compagnia">Compagnia assicurativa</FieldLabel>
                <Input
                  id="edit-compagnia"
                  value={form.compagniaAssicurativa}
                  onChange={(e) => update('compagniaAssicurativa', e.target.value)}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="edit-polizza">N. di polizza</FieldLabel>
              <Input
                id="edit-polizza"
                value={form.numeroPolizza}
                onChange={(e) => update('numeroPolizza', e.target.value)}
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

interface AnagraficaSectionProps {
  anagrafica: Anagrafica
  onSave: (data: Anagrafica) => void
}

export function AnagraficaSection({ anagrafica, onSave }: AnagraficaSectionProps) {
  const [isEditing, setIsEditing] = useState(false)

  function handleSave(data: Anagrafica) {
    onSave(data)
    setIsEditing(false)
    toast.success('Anagrafica salvata')
  }

  if (isEditing) {
    return (
      <AnagraficaEdit
        anagrafica={anagrafica}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    )
  }

  return <AnagraficaView anagrafica={anagrafica} onEdit={() => setIsEditing(true)} />
}
