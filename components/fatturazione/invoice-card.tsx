'use client'

import Link from 'next/link'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent } from '@/components/shadcn/ui/card'
import { getPatientFullName, formatDateIT, formatCurrency } from '@/lib/patient-utils'
import type { Invoice } from '@/types/invoice'

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  pagata: {
    label: 'Pagata',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  non_pagata: {
    label: 'Non pagata',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
  parziale: {
    label: 'Parziale',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  },
}

interface InvoiceCardProps {
  invoice: Invoice
  onMarkPaid?: (id: string) => void
}

export function InvoiceCard({ invoice, onMarkPaid }: InvoiceCardProps) {
  const status = statusConfig[invoice.stato] ?? statusConfig.non_pagata

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="min-w-[90px]">
            <p className="text-sm font-medium">{invoice.numero}</p>
            <p className="text-muted-foreground text-xs">{formatDateIT(invoice.dataEmissione)}</p>
          </div>
          <div>
            <Link
              href={`/dashboard/pazienti/${invoice.patientId}`}
              className="text-sm font-medium hover:underline"
            >
              {getPatientFullName(invoice.patientId)}
            </Link>
            <p className="text-muted-foreground text-xs">{invoice.descrizione}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">{formatCurrency(invoice.importo)}</span>
          <Badge className={status.className} variant="outline">
            {status.label}
          </Badge>
          {invoice.stato !== 'pagata' && (
            <Button variant="ghost" size="sm" onClick={() => onMarkPaid?.(invoice.id)}>
              Segna pagata
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
