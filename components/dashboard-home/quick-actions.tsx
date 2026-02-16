'use client'

import Link from 'next/link'
import { CalendarPlus, Receipt, UserPlus, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'

const actions = [
  {
    label: 'Nuova seduta',
    href: '/dashboard/agenda',
    icon: CalendarPlus,
    iconBg: 'bg-blue-50 dark:bg-blue-950/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    label: 'Nuovo paziente',
    href: '/dashboard/pazienti/nuovo',
    icon: UserPlus,
    iconBg: 'bg-brand-100 dark:bg-brand-900/40',
    iconColor: 'text-brand-600 dark:text-brand-400',
  },
  {
    label: 'Nuova fattura',
    href: '/dashboard/fatturazione',
    icon: Receipt,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="rounded-lg bg-amber-50 p-1.5 dark:bg-amber-950/40">
            <Zap className="size-4 text-amber-600 dark:text-amber-400" />
          </div>
          Azioni Rapide
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
          >
            <div className={`rounded-lg p-2 ${action.iconBg}`}>
              <action.icon className={`size-4 ${action.iconColor}`} />
            </div>
            <span className="text-sm font-medium">{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
