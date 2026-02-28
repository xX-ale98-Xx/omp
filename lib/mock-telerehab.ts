import type { TelerehabSession } from '@/types/telerehab'

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

function getDaysFromNow(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

export const mockTelerehabSessions: TelerehabSession[] = [
  // Oggi - 5 sessioni
  {
    id: 'ts1',
    patientId: 'p1',
    data: getToday(),
    oraInizio: '09:00',
    oraFine: '09:30',
    motivo: 'Esercizi di rinforzo ginocchio dx',
    stato: 'completata',
    note: 'Paziente ha eseguito tutti gli esercizi correttamente. Lieve dolore residuo.',
  },
  {
    id: 'ts2',
    patientId: 'p2',
    data: getToday(),
    oraInizio: '10:00',
    oraFine: '10:30',
    motivo: 'Stretching cervicale guidato',
    stato: 'programmata',
    note: '',
  },
  {
    id: 'ts3',
    patientId: 'p4',
    data: getToday(),
    oraInizio: '11:30',
    oraFine: '12:00',
    motivo: 'Riabilitazione spalla post-intervento',
    stato: 'programmata',
    note: '',
  },
  {
    id: 'ts4',
    patientId: 'p3',
    data: getToday(),
    oraInizio: '14:00',
    oraFine: '14:30',
    motivo: 'Esercizi posturali',
    stato: 'programmata',
    note: '',
  },
  {
    id: 'ts5',
    patientId: 'p6',
    data: getToday(),
    oraInizio: '16:00',
    oraFine: '16:30',
    motivo: 'Propriocezione caviglia',
    stato: 'programmata',
    note: '',
  },
  // Prossimi giorni - 3 sessioni
  {
    id: 'ts6',
    patientId: 'p1',
    data: getDaysFromNow(1),
    oraInizio: '09:30',
    oraFine: '10:00',
    motivo: 'Progressione esercizi ginocchio',
    stato: 'programmata',
    note: '',
  },
  {
    id: 'ts7',
    patientId: 'p5',
    data: getDaysFromNow(2),
    oraInizio: '11:00',
    oraFine: '11:30',
    motivo: 'Esercizi lombalgia',
    stato: 'programmata',
    note: '',
  },
  {
    id: 'ts8',
    patientId: 'p2',
    data: getDaysFromNow(3),
    oraInizio: '15:00',
    oraFine: '15:30',
    motivo: 'Follow-up cervicale',
    stato: 'programmata',
    note: '',
  },
]
