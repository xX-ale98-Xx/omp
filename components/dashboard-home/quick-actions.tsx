'use client'

import Link from 'next/link'
import { CalendarPlus, Receipt, UserPlus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Button } from '@/components/shadcn/ui/button'

const actions = [
  {
    label: 'Nuova seduta',
    href: '/dashboard/agenda',
    icon: CalendarPlus,
  },
  {
    label: 'Nuovo paziente',
    href: '/dashboard/pazienti/nuovo',
    icon: UserPlus,
  },
  {
    label: 'Nuova fattura',
    href: '/dashboard/fatturazione',
    icon: Receipt,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Azioni Rapide</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Button key={action.label} variant="outline" asChild>
            <Link href={action.href}>
              <action.icon className="mr-2 size-4" />
              {action.label}
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
