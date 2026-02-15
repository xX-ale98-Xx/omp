export interface TreatmentSession {
  id: string
  patientId: string
  data: string // ISO date
  distretto: string
  tipo: string
  durata: number // minuti
  obiettivi: string
  trattamento: string
  note: string
  programId: string
}
