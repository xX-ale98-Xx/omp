// ─── Anagrafica ──────────────────────────────────────────────────────────────

export type Sesso = 'M' | 'F' | 'Altro'

export type TipoAssicurazione = 'SSN' | 'Privata' | 'Mista' | 'Nessuna'

export interface Anagrafica {
  nome: string
  cognome: string
  sesso: Sesso | null
  dataNascita: string | null // ISO date string
  luogoNascita: string
  statoNascita: string
  codiceFiscale: string
  cartaIdentita: string
  indirizzoResidenza: string
  indirizzoDomicilio: string
  cap: string
  telefono: string
  email: string
  aslAppartenenza: string
  medicoCurante: string
  tipoAssicurazione: TipoAssicurazione | null
  compagniaAssicurativa: string
  numeroPolizza: string
}

// ─── Stile di Vita ───────────────────────────────────────────────────────────

export interface StileVita {
  usoAlcool: string
  fumo: string
  dieta: string
  attivitaFisica: string
  oreSedutoGiorno: number | null
  frequenzaAttivitaFisica: string
  statoCivile: string
  stressPercepito: string
  obiettivoTrattamento: string
}

// ─── Pazienti Sportivi ───────────────────────────────────────────────────────

export interface PazienteSportivo {
  sportPrincipale: string
  livello: string
  sportSecondari: string
  anniPratica: number | null
  frequenzaAllenamenti: string
  oreAllenamenti: number | null
  posizioneRuolo: string
  dateImportanti: string
  obiettiviFisiciSpecifici: string
  qualitaSonno: string
  nutrizioneBase: string
  dataTargetRitornoSport: string | null // ISO date string
  noteCoach: string
}

// ─── Test Fisici ─────────────────────────────────────────────────────────────

export interface TestFisici {
  rom: string
  altezzaSaltoVerticale: string
  sprintVelocity: string
  equilibrioSway: string
  forzaMuscolare: string
  postura: string
}

// ─── Anamnesi Generale ───────────────────────────────────────────────────────

export interface AnamnesiGenerale {
  peso: number | null
  altezza: number | null
  infortuniPregressi: string
  dataUltimoInfortunio: string | null // ISO date string
  limitazioniFunzionali: string
  patologieCronicheNote: string
  interventiChirurgici: string
  farmaciAbituali: string
  terapieFisicheEseguite: string
  trattamentiComplementari: string
  allergieNote: string
  percezioneCondizione: string
  gravidanza: string
  menopausa: string
}

// ─── Anamnesi Specifica ──────────────────────────────────────────────────────

export interface AnamnesiSpecifica {
  motivoTerapia: string
  sintomi: string
  localizzazioneDolore: string
  irradiazioneDolore: string
  tipologiaDolore: string
  intensitaDolore: number | null // 0-10
  fattoriAggravanti: string
  fattoriAllevianti: string
  esordioProblema: string
  andamentoTemporale: string
  limitazioniFunzionali: string
  diagnosiPregresse: string
}

// ─── Referti Medici ──────────────────────────────────────────────────────────

export interface RefertoMedico {
  id: string
  tipoEsame: string
  dataReferto: string | null // ISO date string
  medicoRefertante: string
  descrizione: string
  immagineUrl: string
  raccomandazioniTerapeutiche: string
}

// ─── Paziente completo ───────────────────────────────────────────────────────

export interface Patient {
  id: string
  anagrafica: Anagrafica
  stileVita: StileVita
  sportivo: PazienteSportivo
  testFisici: TestFisici
  anamnesiGenerale: AnamnesiGenerale
  anamnesiSpecifica: AnamnesiSpecifica
  refertiMedici: RefertoMedico[]
  isSportivo: boolean
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}
