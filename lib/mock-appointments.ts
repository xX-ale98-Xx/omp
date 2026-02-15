import type { Appointment } from '@/types/appointment'

// Helper: today's date as ISO string
function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

function getYesterday(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

function getTomorrow(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

function getDaysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

function getDaysFromNow(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

export const mockAppointments: Appointment[] = [
  // Oggi - 6 appuntamenti
  {
    id: 'apt1',
    patientId: 'p1',
    data: getToday(),
    oraInizio: '09:00',
    oraFine: '09:45',
    tipo: 'Fisioterapia',
    note: 'Seduta di recupero ginocchio dx',
    stato: 'programmato',
    pagamento: 'da_pagare',
    importo: 60,
  },
  {
    id: 'apt2',
    patientId: 'p2',
    data: getToday(),
    oraInizio: '10:00',
    oraFine: '10:45',
    tipo: 'Terapia Manuale',
    note: 'Trattamento cervicale',
    stato: 'programmato',
    pagamento: 'da_pagare',
    importo: 70,
  },
  {
    id: 'apt3',
    patientId: 'p3',
    data: getToday(),
    oraInizio: '11:00',
    oraFine: '11:30',
    tipo: 'Prima Visita',
    note: 'Valutazione iniziale',
    stato: 'programmato',
    pagamento: 'da_pagare',
    importo: 80,
  },
  {
    id: 'apt4',
    patientId: 'p4',
    data: getToday(),
    oraInizio: '14:00',
    oraFine: '14:45',
    tipo: 'Fisioterapia',
    note: 'Riabilitazione spalla',
    stato: 'programmato',
    pagamento: 'da_pagare',
    importo: 60,
  },
  {
    id: 'apt5',
    patientId: 'p1',
    data: getToday(),
    oraInizio: '15:00',
    oraFine: '15:30',
    tipo: 'Controllo',
    note: 'Verifica progressi',
    stato: 'programmato',
    pagamento: 'pagato',
    importo: 40,
  },
  {
    id: 'apt6',
    patientId: 'p5',
    data: getToday(),
    oraInizio: '16:00',
    oraFine: '16:45',
    tipo: 'Terapia Manuale',
    note: 'Lombalgia cronica',
    stato: 'programmato',
    pagamento: 'da_pagare',
    importo: 70,
  },
  // Ieri - 3 completati
  {
    id: 'apt7',
    patientId: 'p2',
    data: getYesterday(),
    oraInizio: '09:00',
    oraFine: '09:45',
    tipo: 'Fisioterapia',
    note: 'Esercizi cervicale',
    stato: 'completato',
    pagamento: 'pagato',
    importo: 60,
  },
  {
    id: 'apt8',
    patientId: 'p6',
    data: getYesterday(),
    oraInizio: '10:30',
    oraFine: '11:15',
    tipo: 'Fisioterapia',
    note: 'Caviglia post-distorsione',
    stato: 'completato',
    pagamento: 'pagato',
    importo: 60,
  },
  {
    id: 'apt9',
    patientId: 'p1',
    data: getYesterday(),
    oraInizio: '14:00',
    oraFine: '14:45',
    tipo: 'Terapia Manuale',
    note: 'Ginocchio dx',
    stato: 'completato',
    pagamento: 'da_pagare',
    importo: 70,
  },
  // Domani - 3 programmati
  {
    id: 'apt10',
    patientId: 'p3',
    data: getTomorrow(),
    oraInizio: '09:30',
    oraFine: '10:15',
    tipo: 'Fisioterapia',
    note: 'Seconda seduta',
    stato: 'programmato',
    pagamento: 'da_pagare',
    importo: 60,
  },
  {
    id: 'apt11',
    patientId: 'p4',
    data: getTomorrow(),
    oraInizio: '11:00',
    oraFine: '11:45',
    tipo: 'Terapia Manuale',
    note: 'Spalla dx',
    stato: 'programmato',
    pagamento: 'da_pagare',
    importo: 70,
  },
  {
    id: 'apt12',
    patientId: 'p2',
    data: getTomorrow(),
    oraInizio: '15:00',
    oraFine: '15:45',
    tipo: 'Fisioterapia',
    note: 'Cervicale - follow up',
    stato: 'programmato',
    pagamento: 'da_pagare',
    importo: 60,
  },
  // Giorni passati
  {
    id: 'apt13',
    patientId: 'p1',
    data: getDaysAgo(3),
    oraInizio: '10:00',
    oraFine: '10:45',
    tipo: 'Fisioterapia',
    note: 'Recupero funzionale ginocchio',
    stato: 'completato',
    pagamento: 'pagato',
    importo: 60,
  },
  {
    id: 'apt14',
    patientId: 'p5',
    data: getDaysAgo(5),
    oraInizio: '09:00',
    oraFine: '09:45',
    tipo: 'Prima Visita',
    note: 'Valutazione iniziale lombalgia',
    stato: 'completato',
    pagamento: 'pagato',
    importo: 80,
  },
  {
    id: 'apt15',
    patientId: 'p6',
    data: getDaysAgo(2),
    oraInizio: '16:00',
    oraFine: '16:45',
    tipo: 'Controllo',
    note: 'Verifica caviglia',
    stato: 'cancellato',
    pagamento: 'da_pagare',
    importo: 40,
  },
  // Giorni futuri
  {
    id: 'apt16',
    patientId: 'p1',
    data: getDaysFromNow(3),
    oraInizio: '09:00',
    oraFine: '09:45',
    tipo: 'Fisioterapia',
    note: 'Seduta progressiva ginocchio',
    stato: 'programmato',
    pagamento: 'da_pagare',
    importo: 60,
  },
  {
    id: 'apt17',
    patientId: 'p6',
    data: getDaysFromNow(4),
    oraInizio: '11:00',
    oraFine: '11:45',
    tipo: 'Fisioterapia',
    note: 'Caviglia - rinforzo',
    stato: 'programmato',
    pagamento: 'da_pagare',
    importo: 60,
  },
  {
    id: 'apt18',
    patientId: 'p2',
    data: getDaysFromNow(5),
    oraInizio: '14:00',
    oraFine: '14:45',
    tipo: 'Terapia Manuale',
    note: 'Cervicale - fase mantenimento',
    stato: 'programmato',
    pagamento: 'da_pagare',
    importo: 70,
  },
]
