'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Dumbbell, Plus, Stethoscope } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import { Badge } from '@/components/shadcn/ui/badge'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/ui/accordion'
import { mockSessions } from '@/lib/mock-sessions'
import { mockPrograms } from '@/lib/mock-programs'
import { mockExercises } from '@/lib/mock-exercises'
import { formatDateIT } from '@/lib/patient-utils'
import type { TreatmentSession } from '@/types/session'
import type { ExerciseProgram } from '@/types/exercise'

const DISTRETTI = [
  'Cervicale',
  'Spalla',
  'Gomito/Polso',
  'Dorsale/Lombare',
  'Anca',
  'Ginocchio',
  'Caviglia/Piede',
  'Globale',
]

const TIPI_SEDUTA = ['Prima Visita', 'Fisioterapia', 'Terapia Manuale', 'Controllo']

const programStatusVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  attivo: 'default',
  completato: 'secondary',
  sospeso: 'outline',
}

const programStatusLabel: Record<string, string> = {
  attivo: 'Attivo',
  completato: 'Completato',
  sospeso: 'Sospeso',
}

function getExerciseName(id: string): string {
  return mockExercises.find((e) => e.id === id)?.nome ?? id
}

// ── Session Card ──────────────────────────────────────────────────────────────

function SessionCard({ session }: { session: TreatmentSession }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{formatDateIT(session.data)}</span>
              <Badge variant="outline">{session.distretto}</Badge>
              <Badge variant="secondary">{session.tipo}</Badge>
            </div>
            <p className="text-muted-foreground text-sm">{session.durata} min</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </Button>
        </div>
        {expanded && (
          <div className="mt-3 space-y-2 border-t pt-3">
            {session.obiettivi && (
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">Obiettivi</p>
                <p className="text-sm">{session.obiettivi}</p>
              </div>
            )}
            {session.trattamento && (
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">Trattamento</p>
                <p className="text-sm">{session.trattamento}</p>
              </div>
            )}
            {session.note && (
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">Note</p>
                <p className="text-sm">{session.note}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ── New Session Dialog ────────────────────────────────────────────────────────

function NewSessionDialog({
  patientId,
  onAdd,
}: {
  patientId: string
  onAdd: (session: TreatmentSession) => void
}) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    data: new Date().toISOString().split('T')[0],
    distretto: '',
    tipo: '',
    durata: '45',
    obiettivi: '',
    trattamento: '',
    note: '',
  })

  function handleSubmit() {
    if (!form.distretto || !form.tipo) {
      toast.error('Compilare distretto e tipo')
      return
    }
    const session: TreatmentSession = {
      id: `ses-${Date.now()}`,
      patientId,
      data: form.data,
      distretto: form.distretto,
      tipo: form.tipo,
      durata: parseInt(form.durata) || 45,
      obiettivi: form.obiettivi,
      trattamento: form.trattamento,
      note: form.note,
      programId: '',
    }
    onAdd(session)
    toast.success('Seduta aggiunta')
    setOpen(false)
    setForm({
      data: new Date().toISOString().split('T')[0],
      distretto: '',
      tipo: '',
      durata: '45',
      obiettivi: '',
      trattamento: '',
      note: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-1 size-4" />
          Nuova seduta
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuova Seduta</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Data</label>
            <Input
              type="date"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Distretto</label>
            <Select value={form.distretto} onValueChange={(v) => setForm({ ...form, distretto: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona distretto" />
              </SelectTrigger>
              <SelectContent>
                {DISTRETTI.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Tipo</label>
            <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona tipo" />
              </SelectTrigger>
              <SelectContent>
                {TIPI_SEDUTA.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Durata (min)</label>
            <Input
              type="number"
              value={form.durata}
              onChange={(e) => setForm({ ...form, durata: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Obiettivi</label>
            <Textarea
              value={form.obiettivi}
              onChange={(e) => setForm({ ...form, obiettivi: e.target.value })}
              rows={2}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Trattamento</label>
            <Textarea
              value={form.trattamento}
              onChange={(e) => setForm({ ...form, trattamento: e.target.value })}
              rows={2}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Note</label>
            <Textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={2}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSubmit}>Salva</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Program Card ──────────────────────────────────────────────────────────────

function ProgramCard({ program }: { program: ExerciseProgram }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium">{program.nome}</h4>
            <p className="text-muted-foreground text-sm">{program.descrizione}</p>
          </div>
          <Badge variant={programStatusVariant[program.stato] ?? 'outline'}>
            {programStatusLabel[program.stato] ?? program.stato}
          </Badge>
        </div>
        <div className="text-muted-foreground mt-2 flex gap-4 text-xs">
          <span>
            {formatDateIT(program.dataInizio)} → {formatDateIT(program.dataFine)}
          </span>
          <span>{program.esercizi.length} esercizi</span>
        </div>
        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="exercises" className="border-none">
            <AccordionTrigger className="py-2 text-sm">Dettaglio esercizi</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {program.esercizi.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>{getExerciseName(ex.exerciseId)}</span>
                    <span className="text-muted-foreground">
                      {ex.serie}x{ex.ripetizioni} · rec. {ex.tempoRecupero}
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

interface PercorsoTabProps {
  patientId: string
}

export function PercorsoTab({ patientId }: PercorsoTabProps) {
  const [sessions, setSessions] = useState<TreatmentSession[]>(
    mockSessions.filter((s) => s.patientId === patientId).sort((a, b) => b.data.localeCompare(a.data))
  )

  const programs = mockPrograms
    .filter((p) => p.patientId === patientId)
    .sort((a, b) => b.dataInizio.localeCompare(a.dataInizio))

  function handleAddSession(session: TreatmentSession) {
    setSessions((prev) => [session, ...prev])
  }

  return (
    <div className="space-y-8">
      {/* Sedute */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="size-5" />
            <h3 className="text-lg font-semibold">Sedute ({sessions.length})</h3>
          </div>
          <NewSessionDialog patientId={patientId} onAdd={handleAddSession} />
        </div>
        {sessions.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nessuna seduta registrata</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => (
              <SessionCard key={s.id} session={s} />
            ))}
          </div>
        )}
      </div>

      {/* Programmi Assegnati */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Dumbbell className="size-5" />
          <h3 className="text-lg font-semibold">Programmi Assegnati ({programs.length})</h3>
        </div>
        {programs.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nessun programma assegnato</p>
        ) : (
          <div className="space-y-3">
            {programs.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
