'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Phone, Mail, Dumbbell, Camera } from 'lucide-react'
import { Badge } from '@/components/shadcn/ui/badge'
import { Switch } from '@/components/shadcn/ui/switch'
import type { Patient } from '@/types/patient'

function getInitials(nome: string, cognome: string) {
  return `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase()
}

function calcAge(dataNascita: string | null): number | null {
  if (!dataNascita) return null
  const birth = new Date(dataNascita)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

function getSessoLabel(sesso: string | null) {
  if (sesso === 'M') return 'Maschio'
  if (sesso === 'F') return 'Femmina'
  if (sesso === 'Altro') return 'Altro'
  return 'Non specificato'
}

interface PatientHeaderProps {
  patient: Patient
  isSportivo: boolean
  onToggleSportivo: (value: boolean) => void
}

export function PatientHeader({ patient, isSportivo, onToggleSportivo }: PatientHeaderProps) {
  const { anagrafica } = patient
  const age = calcAge(anagrafica.dataNascita)
  const initials = getInitials(anagrafica.nome, anagrafica.cognome)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleAvatarClick() {
    fileInputRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatarUrl(url)
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
      {/* Avatar */}
      <button
        type="button"
        onClick={handleAvatarClick}
        className="group relative size-16 shrink-0 cursor-pointer rounded-full sm:size-20"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${anagrafica.nome} ${anagrafica.cognome}`}
            fill
            unoptimized
            sizes="80px"
            className="rounded-full object-cover"
          />
        ) : (
          <div className="bg-primary text-primary-foreground flex size-full items-center justify-center rounded-full text-xl font-bold sm:text-2xl">
            {initials}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 transition-colors group-hover:bg-black/40">
          <Camera className="size-5 text-white opacity-0 transition-opacity group-hover:opacity-100 sm:size-6" />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </button>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold sm:text-2xl">
            {anagrafica.nome} {anagrafica.cognome}
          </h1>
          {isSportivo && (
            <Badge variant="default" className="gap-1">
              <Dumbbell className="size-3" />
              Sportivo
            </Badge>
          )}
        </div>

        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          {age !== null && <span>{age} anni</span>}
          <span>{getSessoLabel(anagrafica.sesso)}</span>
          {anagrafica.codiceFiscale && (
            <span className="font-mono text-xs">{anagrafica.codiceFiscale}</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          {anagrafica.telefono && (
            <a
              href={`tel:${anagrafica.telefono}`}
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              <Phone className="size-3.5" />
              {anagrafica.telefono}
            </a>
          )}
          {anagrafica.email && (
            <a
              href={`mailto:${anagrafica.email}`}
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              <Mail className="size-3.5" />
              {anagrafica.email}
            </a>
          )}
        </div>
      </div>

      {/* Toggle sportivo */}
      <div className="flex items-center gap-2 sm:flex-col sm:items-end">
        <label htmlFor="sportivo-toggle" className="text-sm font-medium">
          Paziente sportivo
        </label>
        <Switch
          id="sportivo-toggle"
          checked={isSportivo}
          onCheckedChange={onToggleSportivo}
        />
      </div>
    </div>
  )
}
