export type DistrettoMuscolare =
  | 'Cervicale'
  | 'Spalla'
  | 'Gomito/Polso'
  | 'Dorsale/Lombare'
  | 'Anca'
  | 'Ginocchio'
  | 'Caviglia/Piede'
  | 'Globale'

export interface Exercise {
  id: string
  nome: string
  descrizione: string
  distretto: DistrettoMuscolare
  videoUrl: string
  immagineUrl: string
  difficolta: 'Facile' | 'Medio' | 'Difficile'
  attrezzatura: string
}

export interface ProgramExercise {
  exerciseId: string
  serie: number
  ripetizioni: number
  tempoRecupero: string
  note: string
}

export type ProgramStatus = 'attivo' | 'completato' | 'sospeso'

export interface ExerciseProgram {
  id: string
  patientId: string
  nome: string
  descrizione: string
  esercizi: ProgramExercise[]
  stato: ProgramStatus
  dataInizio: string // ISO date
  dataFine: string // ISO date
  createdAt: string // ISO datetime
}
