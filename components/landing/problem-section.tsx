import { Eye, TrendingDown, BarChart3, Puzzle, MessageSquare, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/shadcn/ui/card'

const clinicalProblems = [
  {
    icon: Eye,
    title: 'Mancanza di chiarezza sul percorso del paziente',
    description:
      'Hai difficoltà a sapere quali programmi hai assegnato ai tuoi pazienti e perdi informazioni importanti.',
  },
  {
    icon: TrendingDown,
    title: 'Gestione disorganizzata dei programmi',
    description:
      'I protocolli riabilitativi che prepari sono sparsi tra appunti e documenti, rendendo difficile garantire continuità e ordine.',
  },
  {
    icon: BarChart3,
    title: 'Report limitati e frammentati',
    description:
      'Raccogliere e analizzare i progressi dei tuoi pazienti è complicato e ti fa perdere tempo.',
  },
]

const orgProblems = [
  {
    icon: Puzzle,
    title: 'Strumenti frammentati',
    description: 'Usi diversi software per gestire: agenda, cartelle cliniche, fatturazione e comunicazioni.',
  },
  {
    icon: MessageSquare,
    title: 'Comunicazione caotica',
    description: 'Ti arrivano messaggi sparsi tra WhatsApp, email e telefonate. Nessuna tracciabilità.',
  },
  {
    icon: Clock,
    title: 'Burocrazia eccessiva',
    description:
      'Sprechi diverse ore in attività amministrative che tolgono tempo alla cura dei pazienti.',
  },
]

function ProblemCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <Card className="h-full">
      <CardContent className="flex gap-4 pt-6">
        <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
          <Icon className="size-5" />
        </div>
        <div>
          <h3 className="mb-1 font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProblemSection() {
  return (
    <section id="problemi" className="bg-muted scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-fraunces)] mb-12 text-center text-3xl font-bold md:text-4xl">
          Le sfide della fisioterapia moderna
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Clinical */}
          <div>
            <h3 className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
              Sfide Cliniche
            </h3>
            <div className="grid h-full auto-rows-fr gap-4">
              {clinicalProblems.map((p) => (
                <ProblemCard key={p.title} {...p} />
              ))}
            </div>
          </div>
          {/* Organizational */}
          <div className="mt-4 md:mt-0">
            <h3 className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
              Sfide Organizzative
            </h3>
            <div className="grid h-full auto-rows-fr gap-4">
              {orgProblems.map((p) => (
                <ProblemCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
