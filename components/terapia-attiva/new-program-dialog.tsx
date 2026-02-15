'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Textarea } from '@/components/shadcn/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select'
import { mockPatients } from '@/lib/mock-patients'
import { mockExercises } from '@/lib/mock-exercises'
import type { ExerciseProgram, ProgramExercise } from '@/types/exercise'

interface NewProgramDialogProps {
  onAdd: (program: ExerciseProgram) => void
}

const emptyExercise: ProgramExercise = {
  exerciseId: '',
  serie: 3,
  ripetizioni: 10,
  tempoRecupero: '60s',
  note: '',
}

export function NewProgramDialog({ onAdd }: NewProgramDialogProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    patientId: '',
    nome: '',
    descrizione: '',
    dataInizio: new Date().toISOString().split('T')[0],
    dataFine: '',
  })
  const [exercises, setExercises] = useState<ProgramExercise[]>([{ ...emptyExercise }])

  function addExercise() {
    setExercises((prev) => [...prev, { ...emptyExercise }])
  }

  function removeExercise(index: number) {
    setExercises((prev) => prev.filter((_, i) => i !== index))
  }

  function updateExercise(index: number, field: keyof ProgramExercise, value: string | number) {
    setExercises((prev) =>
      prev.map((ex, i) => (i === index ? { ...ex, [field]: value } : ex))
    )
  }

  function handleSubmit() {
    if (!form.patientId || !form.nome) {
      toast.error('Compilare paziente e nome programma')
      return
    }
    const validExercises = exercises.filter((ex) => ex.exerciseId)
    if (validExercises.length === 0) {
      toast.error('Aggiungere almeno un esercizio')
      return
    }
    const program: ExerciseProgram = {
      id: `prog-${Date.now()}`,
      patientId: form.patientId,
      nome: form.nome,
      descrizione: form.descrizione,
      esercizi: validExercises,
      stato: 'attivo',
      dataInizio: form.dataInizio,
      dataFine: form.dataFine || form.dataInizio,
      createdAt: new Date().toISOString(),
    }
    onAdd(program)
    toast.success('Programma creato')
    setOpen(false)
    setForm({
      patientId: '',
      nome: '',
      descrizione: '',
      dataInizio: new Date().toISOString().split('T')[0],
      dataFine: '',
    })
    setExercises([{ ...emptyExercise }])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-1 size-4" />
          Crea programma
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nuovo Programma</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Paziente</label>
            <Select
              value={form.patientId}
              onValueChange={(v) => setForm({ ...form, patientId: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona paziente" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.anagrafica.nome} {p.anagrafica.cognome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Nome programma</label>
            <Input
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Descrizione</label>
            <Textarea
              value={form.descrizione}
              onChange={(e) => setForm({ ...form, descrizione: e.target.value })}
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Data inizio</label>
              <Input
                type="date"
                value={form.dataInizio}
                onChange={(e) => setForm({ ...form, dataInizio: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Data fine</label>
              <Input
                type="date"
                value={form.dataFine}
                onChange={(e) => setForm({ ...form, dataFine: e.target.value })}
              />
            </div>
          </div>

          {/* Exercises */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Esercizi</label>
              <Button type="button" variant="ghost" size="sm" onClick={addExercise}>
                <Plus className="mr-1 size-3" />
                Aggiungi
              </Button>
            </div>
            <div className="space-y-3">
              {exercises.map((ex, i) => (
                <div key={i} className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Esercizio {i + 1}</span>
                    {exercises.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => removeExercise(i)}
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    )}
                  </div>
                  <Select
                    value={ex.exerciseId}
                    onValueChange={(v) => updateExercise(i, 'exerciseId', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona esercizio" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockExercises.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs">Serie</label>
                      <Input
                        type="number"
                        value={ex.serie}
                        onChange={(e) => updateExercise(i, 'serie', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="text-xs">Ripetizioni</label>
                      <Input
                        type="number"
                        value={ex.ripetizioni}
                        onChange={(e) =>
                          updateExercise(i, 'ripetizioni', parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs">Recupero</label>
                      <Input
                        value={ex.tempoRecupero}
                        onChange={(e) => updateExercise(i, 'tempoRecupero', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSubmit}>Crea</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
