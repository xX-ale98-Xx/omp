export type TelerehabSessionStatus =
  | 'programmata'
  | 'in_corso'
  | 'completata'
  | 'cancellata'

export interface TelerehabSession {
  id: string
  patientId: string
  data: string // ISO date (YYYY-MM-DD)
  oraInizio: string // HH:mm
  oraFine: string // HH:mm
  motivo: string
  stato: TelerehabSessionStatus
  note: string
}
