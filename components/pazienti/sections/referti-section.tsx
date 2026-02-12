'use client'

import { useState } from 'react'
import { Plus, FileText } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import { RefertoCard } from './referto-card'
import { RefertoFormDialog } from './referto-form-dialog'
import { toast } from 'sonner'
import type { RefertoMedico } from '@/types/patient'

interface RefertiSectionProps {
  referti: RefertoMedico[]
  onSave: (referti: RefertoMedico[]) => void
}

export function RefertiSection({ referti, onSave }: RefertiSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingReferto, setEditingReferto] = useState<RefertoMedico | null>(null)

  function handleAdd(data: Omit<RefertoMedico, 'id'>) {
    const newReferto: RefertoMedico = {
      ...data,
      id: `r-${Date.now()}`,
    }
    onSave([newReferto, ...referti])
    toast.success('Referto aggiunto')
  }

  function handleEdit(data: Omit<RefertoMedico, 'id'>) {
    if (!editingReferto) return
    const updated = referti.map((r) =>
      r.id === editingReferto.id ? { ...data, id: editingReferto.id } : r
    )
    onSave(updated)
    setEditingReferto(null)
    toast.success('Referto aggiornato')
  }

  function handleDelete(id: string) {
    onSave(referti.filter((r) => r.id !== id))
    toast.success('Referto eliminato')
  }

  function openEditDialog(referto: RefertoMedico) {
    setEditingReferto(referto)
    setDialogOpen(true)
  }

  function openAddDialog() {
    setEditingReferto(null)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Referti Medici</h3>
        <Button size="sm" onClick={openAddDialog}>
          <Plus className="size-4" />
          Aggiungi referto
        </Button>
      </div>

      {referti.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-12">
            <FileText className="text-muted-foreground size-12" />
            <p className="text-muted-foreground text-base font-medium">Nessun referto</p>
            <p className="text-muted-foreground text-sm">
              Aggiungi il primo referto medico per questo paziente.
            </p>
            <Button variant="outline" size="sm" onClick={openAddDialog} className="mt-2">
              <Plus className="size-4" />
              Aggiungi referto
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {referti.map((referto) => (
            <RefertoCard
              key={referto.id}
              referto={referto}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <RefertoFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        referto={editingReferto}
        onSave={editingReferto ? handleEdit : handleAdd}
      />
    </div>
  )
}
