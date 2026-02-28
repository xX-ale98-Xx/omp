'use client'

import { useState } from 'react'
import {
  Eye,
  Target,
  TrendingUp,
  MessageSquare,
  Bell,
  StickyNote,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
} from 'lucide-react'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import type { NotaFisioterapista, CategoriaNota, PrioritaNota } from '@/types/patient'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function getCategoriaIcon(categoria: CategoriaNota) {
  switch (categoria) {
    case 'Osservazione clinica':
      return <Eye className="size-5" />
    case 'Obiettivo terapeutico':
      return <Target className="size-5" />
    case 'Evoluzione':
      return <TrendingUp className="size-5" />
    case 'Comunicazione paziente':
      return <MessageSquare className="size-5" />
    case 'Promemoria':
      return <Bell className="size-5" />
    case 'Altro':
      return <StickyNote className="size-5" />
  }
}

function getPrioritaBorderClass(priorita: PrioritaNota) {
  switch (priorita) {
    case 'alta':
      return 'border-l-[var(--myWarning)]'
    case 'media':
      return 'border-l-[var(--mySecondary)]'
    case 'bassa':
      return 'border-l-[var(--mySuccess)]'
  }
}

function getPrioritaBadgeClass(priorita: PrioritaNota) {
  switch (priorita) {
    case 'alta':
      return 'bg-[var(--myWarning)]/15 text-[var(--myWarning)] hover:bg-[var(--myWarning)]/20'
    case 'media':
      return 'bg-[var(--mySecondary)]/15 text-[var(--mySecondary)] hover:bg-[var(--mySecondary)]/20'
    case 'bassa':
      return 'bg-[var(--mySuccess)]/15 text-[var(--mySuccess)] hover:bg-[var(--mySuccess)]/20'
  }
}

function getPrioritaLabel(priorita: PrioritaNota) {
  switch (priorita) {
    case 'alta':
      return 'Alta'
    case 'media':
      return 'Media'
    case 'bassa':
      return 'Bassa'
  }
}

interface NotaFisioterapistaCardProps {
  nota: NotaFisioterapista
  onEdit: (nota: NotaFisioterapista) => void
  onDelete: (id: string) => void
}

export function NotaFisioterapistaCard({ nota, onEdit, onDelete }: NotaFisioterapistaCardProps) {
  const [expanded, setExpanded] = useState(false)
  const isLong = nota.contenuto.length > 150

  return (
    <Card className={`border-l-4 ${getPrioritaBorderClass(nota.priorita)}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-muted-foreground mt-0.5 shrink-0">
            {getCategoriaIcon(nota.categoria)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{nota.categoria}</Badge>
              <Badge variant="outline" className={getPrioritaBadgeClass(nota.priorita)}>
                {getPrioritaLabel(nota.priorita)}
              </Badge>
              <span className="text-muted-foreground text-sm">
                {formatDate(nota.dataCreazione)}
              </span>
            </div>

            <p className="mt-1.5 text-sm font-medium">{nota.titolo}</p>

            <p className="text-muted-foreground mt-1 text-sm">
              {expanded || !isLong
                ? nota.contenuto
                : `${nota.contenuto.slice(0, 150)}...`}
            </p>

            {expanded && nota.dataModifica !== nota.dataCreazione && (
              <p className="text-muted-foreground mt-2 text-xs">
                Modificata il {formatDate(nota.dataModifica)}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1">
            {isLong && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => onEdit(nota)}
            >
              <Pencil className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive size-8"
              onClick={() => onDelete(nota.id)}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
