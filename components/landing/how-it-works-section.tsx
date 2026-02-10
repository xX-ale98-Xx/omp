import { ClipboardList, Settings, Smartphone, LineChart } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: ClipboardList,
    title: 'Valutazione iniziale',
    description:
      'Il fisioterapista esegue la valutazione in studio e registra tutto nella piattaforma.',
  },
  {
    number: 2,
    icon: Settings,
    title: 'Piano personalizzato',
    description:
      'Crea un programma di esercizi su misura con video, istruzioni e parametri specifici.',
  },
  {
    number: 3,
    icon: Smartphone,
    title: 'Esercizi a casa con IA',
    description:
      "Il paziente esegue gli esercizi a casa. L'IA monitora l'esecuzione e fornisce feedback in tempo reale.",
  },
  {
    number: 4,
    icon: LineChart,
    title: 'Follow-up basati su dati',
    description:
      'Il fisioterapista analizza i dati raccolti e adatta il percorso terapeutico in modo oggettivo.',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="come-funziona" className="bg-muted scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-lusitana)] mb-12 text-center text-3xl font-bold md:text-4xl">
          Come funziona
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground mb-4 flex size-10 items-center justify-center rounded-full text-lg font-bold">
                  {step.number}
                </div>
                <div className="bg-primary/10 text-primary mb-3 flex size-12 items-center justify-center rounded-lg">
                  <Icon className="size-6" />
                </div>
                <h3 className="mb-2 font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
