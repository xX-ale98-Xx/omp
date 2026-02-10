import { Brain, LayoutDashboard, Repeat } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'

const pillars = [
  {
    icon: Brain,
    title: 'Riabilitazione Intelligente',
    description:
      "Monitoraggio degli esercizi tramite IA, feedback in tempo reale e tracciamento dei progressi. I tuoi pazienti ricevono una guida personalizzata anche quando non sono in studio.",
  },
  {
    icon: LayoutDashboard,
    title: 'Gestione Studio',
    description:
      'Agenda, cartelle cliniche, fatturazione e comunicazioni in un unico posto. Meno strumenti, meno confusione, piu tempo per i pazienti.',
  },
  {
    icon: Repeat,
    title: 'Continuita del Percorso',
    description:
      "Il percorso riabilitativo non si interrompe all'uscita dallo studio. Connessione fluida tra le sessioni in presenza e gli esercizi a casa.",
  },
]

export default function SolutionSection() {
  return (
    <section id="soluzione" className="bg-background scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-lusitana)] mb-4 text-center text-3xl font-bold md:text-4xl">
          Una piattaforma, due dimensioni integrate
        </h2>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg">
          OhMyPhysio unisce la gestione clinica e operativa in un&apos;unica soluzione pensata per i
          fisioterapisti.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <Card key={pillar.title} className="text-center">
                <CardHeader>
                  <div className="bg-primary/10 text-primary mx-auto flex size-12 items-center justify-center rounded-lg">
                    <Icon className="size-6" />
                  </div>
                  <CardTitle className="mt-4">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{pillar.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
