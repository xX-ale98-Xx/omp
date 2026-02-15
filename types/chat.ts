export type ChatSender = 'fisioterapista' | 'paziente'

export interface ChatMessage {
  id: string
  patientId: string
  mittente: ChatSender
  testo: string
  timestamp: string // ISO datetime
  letto: boolean
}
