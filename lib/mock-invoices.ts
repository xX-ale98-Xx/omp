import type { Invoice } from '@/types/invoice'

function getCurrentMonth(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function getLastMonth(): string {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export const mockInvoices: Invoice[] = [
  // Mese corrente
  {
    id: 'inv1',
    numero: 'FT-2026-001',
    patientId: 'p1',
    dataEmissione: `${getCurrentMonth()}-02`,
    dataScadenza: `${getCurrentMonth()}-17`,
    importo: 240,
    stato: 'pagata',
    descrizione: 'Ciclo fisioterapia ginocchio dx - 4 sedute',
    voci: [
      { descrizione: 'Seduta fisioterapia', quantita: 4, prezzoUnitario: 60, totale: 240 },
    ],
  },
  {
    id: 'inv2',
    numero: 'FT-2026-002',
    patientId: 'p2',
    dataEmissione: `${getCurrentMonth()}-05`,
    dataScadenza: `${getCurrentMonth()}-20`,
    importo: 210,
    stato: 'non_pagata',
    descrizione: 'Terapia manuale cervicale - 3 sedute',
    voci: [
      { descrizione: 'Terapia manuale', quantita: 3, prezzoUnitario: 70, totale: 210 },
    ],
  },
  {
    id: 'inv3',
    numero: 'FT-2026-003',
    patientId: 'p3',
    dataEmissione: `${getCurrentMonth()}-08`,
    dataScadenza: `${getCurrentMonth()}-23`,
    importo: 80,
    stato: 'pagata',
    descrizione: 'Prima visita e valutazione',
    voci: [
      { descrizione: 'Prima visita fisioterapica', quantita: 1, prezzoUnitario: 80, totale: 80 },
    ],
  },
  {
    id: 'inv4',
    numero: 'FT-2026-004',
    patientId: 'p4',
    dataEmissione: `${getCurrentMonth()}-10`,
    dataScadenza: `${getCurrentMonth()}-25`,
    importo: 180,
    stato: 'non_pagata',
    descrizione: 'Riabilitazione spalla - 3 sedute',
    voci: [
      { descrizione: 'Seduta fisioterapia', quantita: 3, prezzoUnitario: 60, totale: 180 },
    ],
  },
  {
    id: 'inv5',
    numero: 'FT-2026-005',
    patientId: 'p1',
    dataEmissione: `${getCurrentMonth()}-12`,
    dataScadenza: `${getCurrentMonth()}-27`,
    importo: 130,
    stato: 'pagata',
    descrizione: 'Terapia manuale + controllo',
    voci: [
      { descrizione: 'Terapia manuale', quantita: 1, prezzoUnitario: 70, totale: 70 },
      { descrizione: 'Visita di controllo', quantita: 1, prezzoUnitario: 40, totale: 40 },
      { descrizione: 'Taping neuromuscolare', quantita: 1, prezzoUnitario: 20, totale: 20 },
    ],
  },
  // Mese scorso
  {
    id: 'inv6',
    numero: 'FT-2026-006',
    patientId: 'p2',
    dataEmissione: `${getLastMonth()}-10`,
    dataScadenza: `${getLastMonth()}-25`,
    importo: 280,
    stato: 'pagata',
    descrizione: 'Ciclo terapia manuale cervicale - 4 sedute',
    voci: [
      { descrizione: 'Terapia manuale', quantita: 4, prezzoUnitario: 70, totale: 280 },
    ],
  },
  {
    id: 'inv7',
    numero: 'FT-2026-007',
    patientId: 'p5',
    dataEmissione: `${getLastMonth()}-15`,
    dataScadenza: `${getLastMonth()}-30`,
    importo: 140,
    stato: 'pagata',
    descrizione: 'Prima visita + 1 seduta fisioterapia',
    voci: [
      { descrizione: 'Prima visita fisioterapica', quantita: 1, prezzoUnitario: 80, totale: 80 },
      { descrizione: 'Seduta fisioterapia', quantita: 1, prezzoUnitario: 60, totale: 60 },
    ],
  },
  {
    id: 'inv8',
    numero: 'FT-2026-008',
    patientId: 'p6',
    dataEmissione: `${getLastMonth()}-20`,
    dataScadenza: `${getLastMonth()}-28`,
    importo: 120,
    stato: 'non_pagata',
    descrizione: 'Fisioterapia caviglia - 2 sedute',
    voci: [
      { descrizione: 'Seduta fisioterapia', quantita: 2, prezzoUnitario: 60, totale: 120 },
    ],
  },
  {
    id: 'inv9',
    numero: 'FT-2026-009',
    patientId: 'p1',
    dataEmissione: `${getLastMonth()}-05`,
    dataScadenza: `${getLastMonth()}-20`,
    importo: 300,
    stato: 'pagata',
    descrizione: 'Ciclo recupero ginocchio - 5 sedute',
    voci: [
      { descrizione: 'Seduta fisioterapia', quantita: 5, prezzoUnitario: 60, totale: 300 },
    ],
  },
  {
    id: 'inv10',
    numero: 'FT-2026-010',
    patientId: 'p3',
    dataEmissione: `${getLastMonth()}-22`,
    dataScadenza: `${getLastMonth()}-30`,
    importo: 60,
    stato: 'parziale',
    descrizione: 'Seduta fisioterapia',
    voci: [
      { descrizione: 'Seduta fisioterapia', quantita: 1, prezzoUnitario: 60, totale: 60 },
    ],
  },
]
