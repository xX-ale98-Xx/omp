'use client'

import Link from 'next/link'
import { CalendarPlus, Receipt, UserPlus, MessageSquare, Dumbbell, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'

const actions = [
  {
    label: 'Nuova seduta',
    description: 'Pianifica un appuntamento',
    href: '/dashboard/agenda',
    icon: CalendarPlus,
    iconBg: 'bg-blue-50 dark:bg-blue-950/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    label: 'Nuovo paziente',
    description: 'Aggiungi un paziente al registro',
    href: '/dashboard/pazienti/nuovo',
    icon: UserPlus,
    iconBg: 'bg-brand-100 dark:bg-brand-900/40',
    iconColor: 'text-brand-600 dark:text-brand-400',
  },
  {
    label: 'Nuova fattura',
    description: 'Emetti una fattura',
    href: '/dashboard/fatturazione',
    icon: Receipt,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    label: 'Invia messaggio',
    description: 'Contatta un paziente',
    href: '/dashboard/chat',
    icon: MessageSquare,
    iconBg: 'bg-violet-50 dark:bg-violet-950/40',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    label: 'Nuovo esercizio',
    description: 'Crea un programma di esercizi',
    href: '/dashboard/terapia-attiva',
    icon: Dumbbell,
    iconBg: 'bg-orange-50 dark:bg-orange-950/40',
    iconColor: 'text-orange-600 dark:text-orange-400',
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
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
          >
            <div className={`shrink-0 rounded-lg p-2 ${action.iconBg}`}>
              <action.icon className={`size-4 ${action.iconColor}`} />
            </div>
            <div className="min-w-0">
              <span className="text-sm font-medium">{action.label}</span>
              <p className="text-muted-foreground truncate text-xs">{action.description}</p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
