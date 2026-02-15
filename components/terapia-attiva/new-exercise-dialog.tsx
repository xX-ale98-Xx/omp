'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
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
import type { Exercise, DistrettoMuscolare } from '@/types/exercise'

const DISTRETTI: DistrettoMuscolare[] = [
  'Cervicale',
  'Spalla',
  'Gomito/Polso',
  'Dorsale/Lombare',
  'Anca',
  'Ginocchio',
  'Caviglia/Piede',
  'Globale',
]

const DIFFICOLTA = ['Facile', 'Medio', 'Difficile'] as const

interface NewExerciseDialogProps {
  onAdd: (exercise: Exercise) => void
}

export function NewExerciseDialog({ onAdd }: NewExerciseDialogProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    descrizione: '',
    distretto: '' as string,
    difficolta: '' as string,
    attrezzatura: '',
  })

  function handleSubmit() {
    if (!form.nome || !form.distretto || !form.difficolta) {
      toast.error('Compilare nome, distretto e difficoltà')
      return
    }
    const exercise: Exercise = {
      id: `ex-${Date.now()}`,
      nome: form.nome,
      descrizione: form.descrizione,
      distretto: form.distretto as DistrettoMuscolare,
      videoUrl: '',
      immagineUrl: '',
      difficolta: form.difficolta as Exercise['difficolta'],
      attrezzatura: form.attrezzatura || 'Nessuna',
    }
    onAdd(exercise)
    toast.success('Esercizio aggiunto')
    setOpen(false)
    setForm({ nome: '', descrizione: '', distretto: '', difficolta: '', attrezzatura: '' })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-1 size-4" />
          Nuovo esercizio
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuovo Esercizio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome</label>
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
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Distretto</label>
            <Select
              value={form.distretto}
              onValueChange={(v) => setForm({ ...form, distretto: v })}
            >
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
            <label className="text-sm font-medium">Difficoltà</label>
            <Select
              value={form.difficolta}
              onValueChange={(v) => setForm({ ...form, difficolta: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona difficoltà" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICOLTA.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Attrezzatura</label>
            <Input
              value={form.attrezzatura}
              onChange={(e) => setForm({ ...form, attrezzatura: e.target.value })}
              placeholder="Nessuna"
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
