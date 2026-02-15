export type InvoiceStatus = 'pagata' | 'non_pagata' | 'parziale'

export interface InvoiceItem {
  descrizione: string
  quantita: number
  prezzoUnitario: number
  totale: number
}

export interface Invoice {
  id: string
  numero: string
  patientId: string
  dataEmissione: string // ISO date
  dataScadenza: string // ISO date
  importo: number
  stato: InvoiceStatus
  descrizione: string
  voci: InvoiceItem[]
}
