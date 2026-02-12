'use client'

import Link from 'next/link'
import { MoreHorizontal, Phone, Mail, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import { Avatar, AvatarFallback } from '@/components/shadcn/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import type { Patient } from '@/types/patient'
import { calcolaEta, getInitials, getAvatarColor } from '@/lib/patient-utils'
import { cn } from '@/lib/utils'

interface PatientCardProps {
  patient: Patient
}

export function PatientCard({ patient }: PatientCardProps) {
  const { anagrafica } = patient
  const eta = calcolaEta(anagrafica.dataNascita)
  const initials = getInitials(anagrafica.nome, anagrafica.cognome)
  const avatarColor = getAvatarColor(patient.id)

  return (
    <Card className="group relative transition-shadow hover:shadow-md">
      <Link
        href={`/dashboard/pazienti/${patient.id}`}
        className="absolute inset-0 z-0"
        aria-label={`Visualizza ${anagrafica.nome} ${anagrafica.cognome}`}
      />

      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="size-10">
            <AvatarFallback className={cn(avatarColor, 'text-white text-sm font-medium')}>
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold">
                {anagrafica.nome} {anagrafica.cognome}
              </h3>
            </div>

            <div className="mt-0.5 flex items-center gap-2">
              {eta !== null && (
                <span className="text-muted-foreground text-xs">{eta} anni</span>
              )}
              {anagrafica.sesso && (
                <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
                  {anagrafica.sesso}
                </Badge>
              )}
              {patient.isSportivo && (
                <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400 px-1.5 py-0 text-[10px]">
                  Sportivo
                </Badge>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Azioni paziente"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/pazienti/${patient.id}`}>
                  <Eye className="size-4" />
                  Visualizza
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3 space-y-1.5">
          {anagrafica.telefono && (
            <a
              href={`tel:${anagrafica.telefono}`}
              className="text-muted-foreground hover:text-foreground relative z-10 flex items-center gap-2 text-xs transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="size-3 shrink-0" />
              <span className="truncate">{anagrafica.telefono}</span>
            </a>
          )}
          {anagrafica.email && (
            <a
              href={`mailto:${anagrafica.email}`}
              className="text-muted-foreground hover:text-foreground relative z-10 flex items-center gap-2 text-xs transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="size-3 shrink-0" />
              <span className="truncate">{anagrafica.email}</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
