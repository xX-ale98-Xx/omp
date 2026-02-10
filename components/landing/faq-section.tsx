import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/ui/accordion'

const faqs = [
  {
    question: 'Come funziona il monitoraggio con intelligenza artificiale?',
    answer:
      "La nostra IA utilizza la computer vision per analizzare l'esecuzione degli esercizi tramite la fotocamera dello smartphone o del tablet del paziente. Vengono rilevati angoli articolari, velocita di movimento e correttezza dell'esecuzione, fornendo feedback in tempo reale e report dettagliati al fisioterapista.",
  },
  {
    question: 'Quanto tempo serve per configurare la piattaforma?',
    answer:
      "L'onboarding e rapido e guidato. In media, uno studio e operativo in meno di un'ora. Il nostro team ti accompagna passo dopo passo nella configurazione iniziale, dall'importazione dei dati alla creazione dei primi programmi di esercizi.",
  },
  {
    question: 'I dati dei pazienti sono sicuri?',
    answer:
      'Assolutamente. OhMyPhysio e conforme al GDPR e alle normative sanitarie italiane. Tutti i dati sono crittografati in transito e a riposo, con server situati in Europa. Ogni accesso e tracciato e i permessi sono granulari per ruolo.',
  },
  {
    question: 'Serve hardware speciale per i pazienti?',
    answer:
      "No, basta uno smartphone o un tablet con fotocamera. Non servono sensori, wearable o dispositivi aggiuntivi. L'app funziona direttamente dal browser, senza installazioni.",
  },
  {
    question: 'Posso integrare OhMyPhysio con i miei strumenti attuali?',
    answer:
      'Stiamo lavorando a integrazioni con i principali software gestionali e di fatturazione usati dagli studi fisioterapici italiani. Contattaci per discutere le tue esigenze specifiche e verificare la compatibilita.',
  },
  {
    question: 'Quanto costa?',
    answer:
      "Offriamo piani flessibili in base al numero di fisioterapisti e pazienti attivi. Prenota una demo gratuita per ricevere un preventivo personalizzato e scoprire il piano piu adatto al tuo studio.",
  },
  {
    question: 'Che tipo di supporto offrite?',
    answer:
      "Ogni studio ha un referente dedicato per l'onboarding iniziale. Dopo l'attivazione, offriamo supporto via email e chat, una knowledge base completa e sessioni di formazione periodiche per sfruttare al meglio la piattaforma.",
  },
]

export default function FaqSection() {
  return (
    <section id="faq" className="bg-background scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-lusitana)] mb-12 text-center text-3xl font-bold md:text-4xl">
          Domande frequenti
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
