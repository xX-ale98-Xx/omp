import type { ChatMessage } from '@/types/chat'

function getDaysAgoISO(n: number, hour: number, minute: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

export const mockChatMessages: ChatMessage[] = [
  // Conversazione con p1 (Marco Rossi)
  {
    id: 'msg1',
    patientId: 'p1',
    mittente: 'fisioterapista',
    testo: 'Buongiorno Marco, come sta il ginocchio oggi? Ha fatto gli esercizi del programma?',
    timestamp: getDaysAgoISO(3, 9, 0),
    letto: true,
  },
  {
    id: 'msg2',
    patientId: 'p1',
    mittente: 'paziente',
    testo: 'Buongiorno dottore! Sì, ho fatto tutti gli esercizi. Il ginocchio va meglio, solo un po\' di rigidità al mattino.',
    timestamp: getDaysAgoISO(3, 10, 15),
    letto: true,
  },
  {
    id: 'msg3',
    patientId: 'p1',
    mittente: 'fisioterapista',
    testo: 'Ottimo, la rigidità mattutina è normale in questa fase. Continui con il programma e aggiunga 5 minuti di stretching appena sveglio.',
    timestamp: getDaysAgoISO(3, 10, 30),
    letto: true,
  },
  {
    id: 'msg4',
    patientId: 'p1',
    mittente: 'paziente',
    testo: 'Perfetto, grazie! Volevo anche chiederle: posso riprendere a camminare veloce o è ancora presto?',
    timestamp: getDaysAgoISO(2, 8, 45),
    letto: true,
  },
  {
    id: 'msg5',
    patientId: 'p1',
    mittente: 'fisioterapista',
    testo: 'Può iniziare con camminate veloci di 15-20 minuti su terreno piano. Se non avverte dolore, aumenti gradualmente. Ne parliamo alla prossima seduta.',
    timestamp: getDaysAgoISO(2, 11, 0),
    letto: true,
  },
  // Conversazione con p2 (Laura Bianchi)
  {
    id: 'msg6',
    patientId: 'p2',
    mittente: 'fisioterapista',
    testo: 'Buongiorno Laura, le ricordo la seduta di domani alle 10:00. Ha qualche aggiornamento sulla cervicale?',
    timestamp: getDaysAgoISO(2, 14, 0),
    letto: true,
  },
  {
    id: 'msg7',
    patientId: 'p2',
    mittente: 'paziente',
    testo: 'Ciao! Sì, confermo per domani. La cervicale migliora lentamente, ma ho ancora cefalea 2-3 volte a settimana. Ho provato a cambiare posizione alla scrivania come mi aveva suggerito.',
    timestamp: getDaysAgoISO(2, 15, 30),
    letto: true,
  },
  {
    id: 'msg8',
    patientId: 'p2',
    mittente: 'fisioterapista',
    testo: 'Bene che abbia iniziato con la postura. Domani valutiamo insieme se aggiungere qualche esercizio specifico per la cefalea tensiva.',
    timestamp: getDaysAgoISO(2, 16, 0),
    letto: true,
  },
  {
    id: 'msg9',
    patientId: 'p2',
    mittente: 'paziente',
    testo: 'Grazie dottore, a domani!',
    timestamp: getDaysAgoISO(2, 16, 10),
    letto: true,
  },
  {
    id: 'msg10',
    patientId: 'p2',
    mittente: 'paziente',
    testo: 'Buongiorno, stamattina mi sono svegliata con un dolore forte al collo. Devo preoccuparmi o è un episodio isolato?',
    timestamp: getDaysAgoISO(0, 7, 30),
    letto: false,
  },
]
