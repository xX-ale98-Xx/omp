'use client'

import { Play } from 'lucide-react'
import { Badge } from '@/components/shadcn/ui/badge'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import type { Exercise } from '@/types/exercise'

const difficultyVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
  Facile: 'secondary',
  Medio: 'default',
  Difficile: 'destructive',
}

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Card className="overflow-hidden">
      {/* Video placeholder */}
      <div className="bg-muted flex h-32 items-center justify-center">
        <Play className="text-muted-foreground size-10" />
      </div>
      <CardContent className="p-4">
        <h4 className="font-medium">{exercise.nome}</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge variant="outline">{exercise.distretto}</Badge>
          <Badge variant={difficultyVariant[exercise.difficolta] ?? 'secondary'}>
            {exercise.difficolta}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">{exercise.descrizione}</p>
        {exercise.attrezzatura && exercise.attrezzatura !== 'Nessuna' && (
          <p className="text-muted-foreground mt-1 text-xs">
            Attrezzatura: {exercise.attrezzatura}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
