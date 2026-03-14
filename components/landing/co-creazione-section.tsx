import { ArrowRight, Lightbulb, MessageCircle, Rocket } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Raccontaci le tue sfide',
    description:
      'Una call di 30 minuti con il team OMP. Vogliamo conoscere la tua routine lavorativa, capire le sfide che affronti e scoprire quali attività ti rallentano e ti fanno perdere tempo.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Contribuisci alle funzionalità',
    description:
      'Le tue idee entrano nel processo di design, le confronteremo con quelle di altri professionisti come te per individuare punti in comune. Validazioni e feedback sul prototipo ci aiuteranno a creare uno strumento di lavoro che risponda davvero alle vostre esigenze quotidiane',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Diventa un co-creatore',
    description:
      'Entra in anteprima nel mondo OMP! e sblocca 12 mesi gratuiti di accesso alla piattaforma. Scopri strumenti esclusivi pensati per semplificare il tuo lavoro e ottimizzare il tempo in studio.',
  },
]

export default function CoCreazioneSection() {
  return (
    <section
      id="co-creazione"
      className="bg-primary text-primary-foreground relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          opacity: 0.08,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="border-primary-foreground/30 bg-primary-foreground/15 mb-4 inline-block rounded-full border px-4 py-1 text-sm font-medium">
            Partecipa
          </span>
          <h2 className="font-[family-name:var(--font-fraunces)] mt-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            Creiamo OMP
            <br />
            insieme a te
          </h2>
          <p className="text-primary-foreground/80 mx-auto mt-6 max-w-xl text-lg">
            Non vogliamo indovinare di cosa hai bisogno. 
            <br />
            Vogliamo ascoltarti, capire le tue sfide
            quotidiane e progettare con te la piattaforma che ti aiuta ad affontarle.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="border-primary-foreground/20 bg-primary-foreground/10 relative overflow-hidden rounded-2xl border p-8"
              >
                {/* Large decorative icon in background */}
                <Icon
                  className="text-primary-foreground/10 pointer-events-none absolute -right-4 -top-4 size-32"
                  aria-hidden="true"
                />

                <span className="text-primary-foreground/60 font-[family-name:var(--font-fraunces)] text-3xl font-bold">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="text-primary-foreground/75 mt-2 text-sm">{step.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold"
            asChild
          >
            <a href="mailto:info@ohmyphysio.it?subject=Co-Creazione OMP">
              Voglio partecipare
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <p className="text-primary-foreground/60 mt-4 text-sm">
            Clicca per prenotare una call con il team di OMP! ed entra a far parte del progetto Co-Creatori.
          </p>
        </div>
      </div>
    </section>
  )
}
