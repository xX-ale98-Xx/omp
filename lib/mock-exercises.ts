import type { Exercise } from '@/types/exercise'

export const mockExercises: Exercise[] = [
  // Cervicale
  {
    id: 'ex1',
    nome: 'Flessione cervicale attiva',
    descrizione:
      'Portare il mento verso il petto in modo controllato, mantenere 5 secondi e tornare alla posizione iniziale.',
    distretto: 'Cervicale',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Facile',
    attrezzatura: 'Nessuna',
  },
  {
    id: 'ex2',
    nome: 'Retrazione cervicale (chin tuck)',
    descrizione:
      'Retrarre il mento portandolo indietro come a creare un doppio mento, mantenere 10 secondi.',
    distretto: 'Cervicale',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Facile',
    attrezzatura: 'Nessuna',
  },
  // Spalla
  {
    id: 'ex3',
    nome: 'Pendolo di Codman',
    descrizione:
      'Inclinati in avanti con il braccio rilassato, oscillare il braccio in piccoli cerchi per 1 minuto.',
    distretto: 'Spalla',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Facile',
    attrezzatura: 'Nessuna',
  },
  {
    id: 'ex4',
    nome: 'Extrarotazione con elastico',
    descrizione:
      'Con il gomito a 90° e aderente al fianco, ruotare l\'avambraccio verso l\'esterno contro la resistenza dell\'elastico.',
    distretto: 'Spalla',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Medio',
    attrezzatura: 'Elastico',
  },
  // Gomito/Polso
  {
    id: 'ex5',
    nome: 'Flessione/estensione polso con peso',
    descrizione:
      'Seduti con l\'avambraccio appoggiato sulla coscia, flettere ed estendere il polso con un piccolo manubrio.',
    distretto: 'Gomito/Polso',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Facile',
    attrezzatura: 'Manubrio 1-2 kg',
  },
  {
    id: 'ex6',
    nome: 'Pronazione/supinazione con martello',
    descrizione:
      'Impugnare un martello per il manico ed eseguire rotazioni dell\'avambraccio.',
    distretto: 'Gomito/Polso',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Medio',
    attrezzatura: 'Martello o manubrio',
  },
  // Dorsale/Lombare
  {
    id: 'ex7',
    nome: 'Cat-Cow (gatto-cammello)',
    descrizione:
      'In quadrupedia, alternare inarcamento e flessione della colonna con movimenti lenti e controllati.',
    distretto: 'Dorsale/Lombare',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Facile',
    attrezzatura: 'Tappetino',
  },
  {
    id: 'ex8',
    nome: 'Bird-Dog',
    descrizione:
      'In quadrupedia, estendere simultaneamente braccio destro e gamba sinistra, alternando. Mantenere 5 secondi.',
    distretto: 'Dorsale/Lombare',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Medio',
    attrezzatura: 'Tappetino',
  },
  // Anca
  {
    id: 'ex9',
    nome: 'Ponte gluteo (bridge)',
    descrizione:
      'Supini con ginocchia piegate, sollevare il bacino contraendo i glutei. Mantenere 5 secondi.',
    distretto: 'Anca',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Facile',
    attrezzatura: 'Tappetino',
  },
  {
    id: 'ex10',
    nome: 'Clamshell con elastico',
    descrizione:
      'Sdraiati su un fianco con elastico sopra le ginocchia, aprire il ginocchio superiore mantenendo i piedi uniti.',
    distretto: 'Anca',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Medio',
    attrezzatura: 'Elastico',
  },
  // Ginocchio
  {
    id: 'ex11',
    nome: 'Squat parziale a parete',
    descrizione:
      'Schiena alla parete, scendere fino a 45° di flessione del ginocchio e mantenere 10 secondi.',
    distretto: 'Ginocchio',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Medio',
    attrezzatura: 'Nessuna',
  },
  {
    id: 'ex12',
    nome: 'Estensione del ginocchio da seduto',
    descrizione:
      'Seduti, estendere il ginocchio lentamente fino alla completa estensione, mantenere 5 secondi e scendere.',
    distretto: 'Ginocchio',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Facile',
    attrezzatura: 'Cavigliera (opzionale)',
  },
  {
    id: 'ex13',
    nome: 'Step-up laterale',
    descrizione:
      'Salire su un gradino lateralmente con la gamba interessata, controllare la discesa.',
    distretto: 'Ginocchio',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Difficile',
    attrezzatura: 'Step/gradino',
  },
  // Caviglia/Piede
  {
    id: 'ex14',
    nome: 'Dorsiflessione con elastico',
    descrizione:
      'Seduti con l\'elastico attorno alla pianta del piede, tirare il piede verso di sé contro resistenza.',
    distretto: 'Caviglia/Piede',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Facile',
    attrezzatura: 'Elastico',
  },
  {
    id: 'ex15',
    nome: 'Equilibrio monopodalico su tavoletta',
    descrizione:
      'In piedi su un piede su tavoletta propriocettiva, mantenere l\'equilibrio per 30 secondi.',
    distretto: 'Caviglia/Piede',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Difficile',
    attrezzatura: 'Tavoletta propriocettiva',
  },
  // Globale
  {
    id: 'ex16',
    nome: 'Plank frontale',
    descrizione:
      'Posizione di plank su avambracci, mantenere l\'allineamento testa-piedi per il tempo indicato.',
    distretto: 'Globale',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Medio',
    attrezzatura: 'Tappetino',
  },
  {
    id: 'ex17',
    nome: 'Stretching catena posteriore',
    descrizione:
      'In piedi, piegamento in avanti con ginocchia leggermente piegate, allungare la catena posteriore per 30 secondi.',
    distretto: 'Globale',
    videoUrl: '',
    immagineUrl: '',
    difficolta: 'Facile',
    attrezzatura: 'Nessuna',
  },
]
