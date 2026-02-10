import { Microscope, Layers, ShieldCheck, Sparkles } from 'lucide-react'

const differentiators = [
  {
    icon: Microscope,
    title: 'IA Clinica, Non Generica',
    description:
      'Algoritmi addestrati specificamente per la fisioterapia, non soluzioni generiche riadattate.',
  },
  {
    icon: Layers,
    title: 'Tutto in Uno',
    description:
      'Gestione dello studio e riabilitazione intelligente integrate in un\'unica piattaforma.',
  },
  {
    icon: ShieldCheck,
    title: 'Sicuro e Conforme',
    description:
      'Conforme al GDPR e alle normative sanitarie italiane. I dati dei pazienti sono al sicuro.',
  },
  {
    icon: Sparkles,
    title: "Semplicita d'Uso",
    description:
      'Progettato per clinici, non per tecnici. Interfaccia intuitiva che si impara in pochi minuti.',
  },
]

export default function DifferentiatorSection() {
  return (
    <section id="perche-omp" className="bg-primary text-primary-foreground scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-lusitana)] mb-12 text-center text-3xl font-bold md:text-4xl">
          Perche scegliere OhMyPhysio?
        </h2>
        <div className="grid gap-10 sm:grid-cols-2">
          {differentiators.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex gap-4">
                <div className="bg-primary-foreground/20 flex size-12 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                  <p className="text-primary-foreground/80 text-sm">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
