import type { TreatmentSession } from '@/types/session'

function getDaysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

export const mockSessions: TreatmentSession[] = [
  // Marco Rossi (p1)
  {
    id: 'ses1',
    patientId: 'p1',
    data: getDaysAgo(21),
    distretto: 'Ginocchio',
    tipo: 'Terapia Manuale',
    durata: 45,
    obiettivi: 'Riduzione dolore e edema, recupero ROM',
    trattamento:
      'Mobilizzazione rotulea, massaggio trasverso profondo su LCM, crioterapia finale',
    note: 'Paziente riferisce dolore 5/10 durante mobilizzazione. ROM flessione 100°.',
    programId: 'prog3',
  },
  {
    id: 'ses2',
    patientId: 'p1',
    data: getDaysAgo(14),
    distretto: 'Ginocchio',
    tipo: 'Fisioterapia',
    durata: 45,
    obiettivi: 'Recupero ROM, inizio rinforzo muscolare',
    trattamento:
      'Esercizi attivi assistiti di flessione/estensione, elettrostimolazione quadricipite, esercizi in catena cinetica chiusa',
    note: 'ROM flessione 115°. Dolore 3/10. Iniziato programma Fase 2.',
    programId: 'prog1',
  },
  {
    id: 'ses3',
    patientId: 'p1',
    data: getDaysAgo(7),
    distretto: 'Ginocchio',
    tipo: 'Fisioterapia',
    durata: 45,
    obiettivi: 'Rinforzo muscolare progressivo, propriocezione',
    trattamento:
      'Squat parziali, step-up, esercizi propriocettivi su tavoletta, stretching catena posteriore',
    note: 'ROM flessione 120°. Dolore 2/10. Buon controllo neuromuscolare.',
    programId: 'prog1',
  },
  {
    id: 'ses4',
    patientId: 'p1',
    data: getDaysAgo(3),
    distretto: 'Ginocchio',
    tipo: 'Terapia Manuale',
    durata: 45,
    obiettivi: 'Mantenimento ROM, lavoro tessuti molli',
    trattamento:
      'Massaggio decontratturante quadricipite e ischio-crurali, mobilizzazione articolare, stretching',
    note: 'Paziente riferisce miglioramento nella camminata. Chiede di poter riprendere corsa leggera.',
    programId: 'prog1',
  },
  // Laura Bianchi (p2)
  {
    id: 'ses5',
    patientId: 'p2',
    data: getDaysAgo(14),
    distretto: 'Cervicale',
    tipo: 'Terapia Manuale',
    durata: 45,
    obiettivi: 'Riduzione contrattura trapezi, miglioramento mobilità cervicale',
    trattamento:
      'Massaggio decontratturante trapezi e SCOM, mobilizzazione cervicale in rotazione e flessione laterale, trazioni cervicali',
    note: 'Contrattura severa bilaterale. Cefalea post-trattamento lieve. Consigliata attenzione alla postura lavorativa.',
    programId: '',
  },
  {
    id: 'ses6',
    patientId: 'p2',
    data: getDaysAgo(7),
    distretto: 'Cervicale',
    tipo: 'Fisioterapia',
    durata: 45,
    obiettivi: 'Rinforzo muscolatura profonda cervicale, educazione posturale',
    trattamento:
      'Esercizi di stabilizzazione cervicale profonda (chin tuck), stretching trapezi e elevatori scapola, educazione ergonomica',
    note: 'Paziente più consapevole della postura. Cefalea ridotta a 2 episodi/settimana.',
    programId: 'prog2',
  },
  {
    id: 'ses7',
    patientId: 'p2',
    data: getDaysAgo(1),
    distretto: 'Cervicale',
    tipo: 'Terapia Manuale',
    durata: 45,
    obiettivi: 'Mantenimento, lavoro punti trigger',
    trattamento:
      'Terapia dei punti trigger trapezio superiore e sub-occipitali, mobilizzazione C5-C6, esercizi attivi in ambulatorio',
    note: 'Miglioramento significativo. Valutare aggiunta esercizi specifici per cefalea tensiva.',
    programId: 'prog2',
  },
  {
    id: 'ses8',
    patientId: 'p2',
    data: getDaysAgo(21),
    distretto: 'Cervicale',
    tipo: 'Prima Visita',
    durata: 60,
    obiettivi: 'Valutazione iniziale, definizione piano terapeutico',
    trattamento:
      'Anamnesi completa, valutazione ROM cervicale, test ortopedici, palpazione, definizione obiettivi terapeutici',
    note: 'ROM cervicale ridotto del 30% in rotazione bilaterale. Contrattura severa trapezi. Piano: 2 sedute/settimana per 8 settimane.',
    programId: '',
  },
]
