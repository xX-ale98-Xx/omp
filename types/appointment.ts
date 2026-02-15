export type AppointmentStatus = 'programmato' | 'completato' | 'cancellato'

export type PaymentStatus = 'da_pagare' | 'pagato'

export interface Appointment {
  id: string
  patientId: string
  data: string // ISO date string (YYYY-MM-DD)
  oraInizio: string // HH:mm
  oraFine: string // HH:mm
  tipo: string
  note: string
  stato: AppointmentStatus
  pagamento: PaymentStatus
  importo: number
}
