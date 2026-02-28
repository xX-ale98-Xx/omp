'use client'

import { useState } from 'react'
import { Plus, ClipboardPen } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import { NotaFisioterapistaCard } from './nota-fisioterapista-card'
import { NotaFisioterapistaDialog } from './nota-fisioterapista-dialog'
import { toast } from 'sonner'
import type { NotaFisioterapista, CategoriaNota, PrioritaNota } from '@/types/patient'

type NotaFormData = {
  titolo: string
  contenuto: string
  categoria: CategoriaNota
  priorita: PrioritaNota
}

interface NoteFisioterapistaSectionProps {
  note: NotaFisioterapista[]
  onSave: (note: NotaFisioterapista[]) => void
}

export function NoteFisioterapistaSection({ note, onSave }: NoteFisioterapistaSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingNota, setEditingNota] = useState<NotaFisioterapista | null>(null)

  function handleAdd(data: NotaFormData) {
    const now = new Date().toISOString()
    const newNota: NotaFisioterapista = {
      ...data,
      id: `n-${Date.now()}`,
      dataCreazione: now,
      dataModifica: now,
    }
    onSave([newNota, ...note])
    toast.success('Nota aggiunta')
  }

  function handleEdit(data: NotaFormData) {
    if (!editingNota) return
    const updated = note.map((n) =>
      n.id === editingNota.id
        ? { ...data, id: editingNota.id, dataCreazione: editingNota.dataCreazione, dataModifica: new Date().toISOString() }
        : n
    )
    onSave(updated)
    setEditingNota(null)
    toast.success('Nota aggiornata')
  }

  function handleDelete(id: string) {
    onSave(note.filter((n) => n.id !== id))
    toast.success('Nota eliminata')
  }

  function openEditDialog(nota: NotaFisioterapista) {
    setEditingNota(nota)
    setDialogOpen(true)
  }

  function openAddDialog() {
    setEditingNota(null)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardPen className="text-muted-foreground size-5" />
          <h3 className="text-base font-semibold">
            Note del Fisioterapista ({note.length})
          </h3>
        </div>
        <Button size="sm" onClick={openAddDialog}>
          <Plus className="size-4" />
          Nuova nota
        </Button>
      </div>

      {note.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-12">
            <ClipboardPen className="text-muted-foreground size-12" />
            <p className="text-muted-foreground text-base font-medium">Nessuna nota</p>
            <p className="text-muted-foreground text-sm">
              Aggiungi la prima nota clinica per questo paziente.
            </p>
            <Button variant="outline" size="sm" onClick={openAddDialog} className="mt-2">
              <Plus className="size-4" />
              Nuova nota
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {note.map((nota) => (
            <NotaFisioterapistaCard
              key={nota.id}
              nota={nota}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <NotaFisioterapistaDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        nota={editingNota}
        onSave={editingNota ? handleEdit : handleAdd}
      />
    </div>
  )
}
