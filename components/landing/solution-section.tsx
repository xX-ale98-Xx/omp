import { Brain, ClipboardList } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'

const pillars = [
  {
    icon: ClipboardList,
    title: 'Gestione Clinica',
    description:
      'Crea piani di riabilitazione su misura con una libreria di esercizi pronta all’uso e aggiungi facilmente i tuoi esercizi.',
  },
  {
    icon: Brain,
    title: 'Gestione Operativa',
    description:
      "Agenda, cartelle cliniche, fatturazione e comunicazioni in un unico strumento. L'IA semplifica le attività ripetitive: meno strumenti, meno confusione e più tempo per i pazienti.",
  },
]

export default function SolutionSection() {
  return (
    <section id="soluzione" className="bg-background scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center font-[family-name:var(--font-fraunces)] text-3xl font-bold md:text-4xl">
          Una piattaforma, due dimensioni integrate
        </h2>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg">
          OhMyPhysio unisce la gestione clinica e operativa in un&apos;unica soluzione, pensata da
          professionisti come te.
        </p>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <Card key={pillar.title} className="h-full text-center">
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
