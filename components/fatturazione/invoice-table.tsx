'use client'

import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table'
import { getPatientFullName, formatDateIT, formatCurrency } from '@/lib/patient-utils'
import type { Invoice } from '@/types/invoice'

const statusConfig: Record<string, { label: string; className: string }> = {
  pagata: {
    label: 'Pagata',
    className:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
  },
  non_pagata: {
    label: 'Non pagata',
    className:
      'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800',
  },
  parziale: {
    label: 'Parziale',
    className:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
  },
}

interface InvoiceTableProps {
  invoices: Invoice[]
  onMarkPaid: (id: string) => void
}

export function InvoiceTable({ invoices, onMarkPaid }: InvoiceTableProps) {
  const sorted = [...invoices].sort((a, b) => b.dataEmissione.localeCompare(a.dataEmissione))

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[110px]">Numero</TableHead>
            <TableHead className="w-[100px]">Data</TableHead>
            <TableHead>Paziente</TableHead>
            <TableHead className="hidden md:table-cell">Descrizione</TableHead>
            <TableHead className="w-[110px] text-right">Importo</TableHead>
            <TableHead className="w-[120px]">Stato</TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-muted-foreground h-24 text-center">
                Nessuna fattura trovata
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((inv) => {
              const status = statusConfig[inv.stato] ?? statusConfig.non_pagata
              return (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-sm">{inv.numero}</TableCell>
                  <TableCell className="text-sm">{formatDateIT(inv.dataEmissione)}</TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/pazienti/${inv.patientId}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {getPatientFullName(inv.patientId)}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden max-w-[200px] truncate text-sm md:table-cell">
                    {inv.descrizione}
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold">
                    {formatCurrency(inv.importo)}
                  </TableCell>
                  <TableCell>
                    <Badge className={status.className} variant="outline">
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {inv.stato !== 'pagata' && (
                          <DropdownMenuItem onClick={() => onMarkPaid(inv.id)}>
                            Segna pagata
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/pazienti/${inv.patientId}`}>
                            Vedi paziente
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
