'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Spinner } from '@/components/shadcn/ui/spinner'
import { Checkbox } from '@/components/shadcn/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card'
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/shadcn/ui/field'
import { Separator } from '@/components/shadcn/ui/separator'
import { DatePickerField } from './date-picker-field'
import { createPatientAction, type CreatePatientState } from '@/utils/actions/patient-actions'

export function AnagraficaForm() {
  const initialState: CreatePatientState = { errors: {}, message: null }
  const [state, formAction, pending] = useActionState(createPatientAction, initialState)
  const [stessaResidenza, setStessaResidenza] = useState(false)

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/pazienti">
            <ArrowLeft className="size-4" />
            Torna alla lista
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Nuovo Paziente</CardTitle>
          <CardDescription>
            Inserisci i dati anagrafici. Potrai aggiungere le altre informazioni in seguito.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              {/* ── Dati Personali ─────────────────────────────── */}
              <div>
                <h3 className="text-sm font-medium">Dati Personali</h3>
                <Separator className="mt-2" />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="nome">Nome *</FieldLabel>
                  <Input id="nome" name="nome" required placeholder="Mario" />
                  {state.errors?.nome && (
                    <p className="text-destructive text-sm">{state.errors.nome[0]}</p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="cognome">Cognome *</FieldLabel>
                  <Input id="cognome" name="cognome" required placeholder="Rossi" />
                  {state.errors?.cognome && (
                    <p className="text-destructive text-sm">{state.errors.cognome[0]}</p>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel>Sesso</FieldLabel>
                  <RadioGroup name="sesso" defaultValue="" className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="M" id="sesso-m" />
                      <label htmlFor="sesso-m" className="text-sm">M</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="F" id="sesso-f" />
                      <label htmlFor="sesso-f" className="text-sm">F</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="Altro" id="sesso-altro" />
                      <label htmlFor="sesso-altro" className="text-sm">Altro</label>
                    </div>
                  </RadioGroup>
                </Field>
                <Field>
                  <FieldLabel>Data di nascita</FieldLabel>
                  <DatePickerField name="dataNascita" placeholder="Seleziona data" />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="luogoNascita">Luogo di nascita</FieldLabel>
                  <Input id="luogoNascita" name="luogoNascita" placeholder="Roma" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="statoNascita">Stato di nascita</FieldLabel>
                  <Input id="statoNascita" name="statoNascita" placeholder="Italia" defaultValue="Italia" />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="codiceFiscale">Codice Fiscale</FieldLabel>
                  <Input
                    id="codiceFiscale"
                    name="codiceFiscale"
                    placeholder="RSSMRA85C15H501Z"
                    className="uppercase"
                    maxLength={16}
                  />
                  {state.errors?.codiceFiscale && (
                    <p className="text-destructive text-sm">{state.errors.codiceFiscale[0]}</p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="cartaIdentita">Carta d&apos;Identit&agrave;</FieldLabel>
                  <Input id="cartaIdentita" name="cartaIdentita" placeholder="CA12345AB" />
                </Field>
              </div>

              {/* ── Residenza ──────────────────────────────────── */}
              <div className="mt-2">
                <h3 className="text-sm font-medium">Residenza</h3>
                <Separator className="mt-2" />
              </div>

              <Field>
                <FieldLabel htmlFor="indirizzoResidenza">Indirizzo di residenza</FieldLabel>
                <Input
                  id="indirizzoResidenza"
                  name="indirizzoResidenza"
                  placeholder="Via Roma 42, 00185 Roma"
                />
              </Field>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="stessaResidenza"
                  checked={stessaResidenza}
                  onCheckedChange={(c) => setStessaResidenza(c === true)}
                />
                <label htmlFor="stessaResidenza" className="text-sm">
                  Domicilio uguale alla residenza
                </label>
              </div>

              {!stessaResidenza && (
                <Field>
                  <FieldLabel htmlFor="indirizzoDomicilio">Indirizzo di domicilio</FieldLabel>
                  <Input
                    id="indirizzoDomicilio"
                    name="indirizzoDomicilio"
                    placeholder="Via Milano 10, 20121 Milano"
                  />
                </Field>
              )}

              <input
                type="hidden"
                name="domicilioUgualeResidenza"
                value={stessaResidenza ? '1' : '0'}
              />

              <Field className="max-w-32">
                <FieldLabel htmlFor="cap">CAP</FieldLabel>
                <Input id="cap" name="cap" placeholder="00185" maxLength={5} />
              </Field>

              {/* ── Contatti ───────────────────────────────────── */}
              <div className="mt-2">
                <h3 className="text-sm font-medium">Contatti</h3>
                <Separator className="mt-2" />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="telefono">Telefono</FieldLabel>
                  <Input id="telefono" name="telefono" type="tel" placeholder="+39 333 1234567" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" name="email" type="email" placeholder="mario.rossi@email.it" />
                  {state.errors?.email && (
                    <p className="text-destructive text-sm">{state.errors.email[0]}</p>
                  )}
                </Field>
              </div>

              {/* ── Informazioni Sanitarie ─────────────────────── */}
              <div className="mt-2">
                <h3 className="text-sm font-medium">Informazioni Sanitarie</h3>
                <Separator className="mt-2" />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="aslAppartenenza">ASL di appartenenza</FieldLabel>
                  <Input id="aslAppartenenza" name="aslAppartenenza" placeholder="ASL Roma 1" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="medicoCurante">Medico curante</FieldLabel>
                  <Input id="medicoCurante" name="medicoCurante" placeholder="Dr. Bianchi" />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="tipoAssicurazione">Tipo assicurazione</FieldLabel>
                  <Select name="tipoAssicurazione">
                    <SelectTrigger id="tipoAssicurazione">
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
                  <FieldLabel htmlFor="compagniaAssicurativa">Compagnia assicurativa</FieldLabel>
                  <Input
                    id="compagniaAssicurativa"
                    name="compagniaAssicurativa"
                    placeholder="UniSalute"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="numeroPolizza">N. di polizza</FieldLabel>
                <Input id="numeroPolizza" name="numeroPolizza" placeholder="US-2024-12345" />
              </Field>

              {/* ── Error message ──────────────────────────────── */}
              {state.message && (
                <p className="text-destructive text-center text-sm">{state.message}</p>
              )}

              {/* ── Actions ───────────────────────────────────── */}
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/pazienti">Annulla</Link>
                </Button>
                <Button type="submit" disabled={pending}>
                  {pending && <Spinner data-icon="inline-start" />}
                  Salva Paziente
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
