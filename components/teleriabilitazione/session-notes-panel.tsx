'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Textarea } from '@/components/shadcn/ui/textarea'

interface SessionNotesPanelProps {
  notes: string
  onNotesChange: (notes: string) => void
  onClose: () => void
}

export function SessionNotesPanel({ notes, onNotesChange, onClose }: SessionNotesPanelProps) {
  return (
    <Card className="w-80 shrink-0 rounded-none border-y-0 border-r-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold">Note Sessione</CardTitle>
        <Button variant="ghost" size="icon" className="size-7" onClick={onClose}>
          <X className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <Textarea
          placeholder="Scrivi le note della seduta..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="min-h-[200px] flex-1 resize-none"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Le note verranno salvate al termine della chiamata
        </p>
      </CardContent>
    </Card>
  )
}
