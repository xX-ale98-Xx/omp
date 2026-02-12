'use client'

import { useState } from 'react'
import {
  FileImage,
  FileText,
  Scan,
  Stethoscope,
  Zap,
  TestTube,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
} from 'lucide-react'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import type { RefertoMedico } from '@/types/patient'

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function getExamIcon(tipo: string) {
  switch (tipo) {
    case 'Radiografia':
      return <Scan className="size-5" />
    case 'Risonanza Magnetica':
      return <FileImage className="size-5" />
    case 'TAC':
      return <Scan className="size-5" />
    case 'Ecografia':
      return <FileImage className="size-5" />
    case 'Elettromiografia':
      return <Zap className="size-5" />
    case 'Esame del sangue':
      return <TestTube className="size-5" />
    default:
      return <FileText className="size-5" />
  }
}

function getExamBadgeVariant(tipo: string): 'default' | 'secondary' | 'outline' {
  switch (tipo) {
    case 'Risonanza Magnetica':
    case 'TAC':
      return 'default'
    case 'Radiografia':
    case 'Ecografia':
      return 'secondary'
    default:
      return 'outline'
  }
}

interface RefertoCardProps {
  referto: RefertoMedico
  onEdit: (referto: RefertoMedico) => void
  onDelete: (id: string) => void
}

export function RefertoCard({ referto, onEdit, onDelete }: RefertoCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card>
      <CardContent className="p-4">
        {/* Header row */}
        <div className="flex items-start gap-3">
          <div className="text-muted-foreground mt-0.5 shrink-0">
            {getExamIcon(referto.tipoEsame)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={getExamBadgeVariant(referto.tipoEsame)}>
                {referto.tipoEsame || 'Altro'}
              </Badge>
              <span className="text-muted-foreground text-sm">
                {formatDate(referto.dataReferto)}
              </span>
            </div>

            {referto.medicoRefertante && (
              <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                <Stethoscope className="size-3.5" />
                {referto.medicoRefertante}
              </p>
            )}

            {referto.descrizione && (
              <p className="mt-2 text-sm">
                {expanded
                  ? referto.descrizione
                  : referto.descrizione.length > 150
                    ? `${referto.descrizione.slice(0, 150)}...`
                    : referto.descrizione}
              </p>
            )}

            {/* Expanded content */}
            {expanded && referto.raccomandazioniTerapeutiche && (
              <div className="mt-3 rounded-md border p-3">
                <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
                  Raccomandazioni terapeutiche
                </p>
                <p className="text-sm">{referto.raccomandazioniTerapeutiche}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1">
            {(referto.descrizione?.length ?? 0) > 150 ||
            referto.raccomandazioniTerapeutiche ? (
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <ChevronUp className="size-4" />
                ) : (
                  <ChevronDown className="size-4" />
                )}
              </Button>
            ) : null}
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => onEdit(referto)}
            >
              <Pencil className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive size-8"
              onClick={() => onDelete(referto.id)}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
