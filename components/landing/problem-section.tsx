import { Eye, TrendingDown, BarChart3, Puzzle, MessageSquare, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/shadcn/ui/card'

const clinicalProblems = [
  {
    icon: Eye,
    title: 'Mancanza di visibilita',
    description: 'Non sai se i pazienti eseguono gli esercizi a casa, ne come li eseguono.',
  },
  {
    icon: TrendingDown,
    title: 'Scarsa aderenza terapeutica',
    description:
      'Senza guida continua, i pazienti abbandonano i programmi riabilitativi troppo presto.',
  },
  {
    icon: BarChart3,
    title: 'Valutazioni soggettive',
    description: 'Le decisioni cliniche si basano su sensazioni, non su dati oggettivi e misurabili.',
  },
]

const orgProblems = [
  {
    icon: Puzzle,
    title: 'Strumenti frammentati',
    description: 'Agenda, cartelle cliniche, fatturazione e comunicazioni su piattaforme diverse.',
  },
  {
    icon: MessageSquare,
    title: 'Comunicazione inefficiente',
    description: 'Messaggi sparsi tra WhatsApp, email e telefonate. Nessuna tracciabilita.',
  },
  {
    icon: Clock,
    title: 'Troppo tempo in burocrazia',
    description:
      'Ore sprecate in attivita amministrative che tolgono tempo alla cura dei pazienti.',
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
    <Card>
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
        <h2 className="font-[family-name:var(--font-lusitana)] mb-12 text-center text-3xl font-bold md:text-4xl">
          Le sfide della fisioterapia moderna
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Clinical */}
          <div>
            <h3 className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
              Sfide Cliniche
            </h3>
            <div className="flex flex-col gap-4">
              {clinicalProblems.map((p) => (
                <ProblemCard key={p.title} {...p} />
              ))}
            </div>
          </div>
          {/* Organizational */}
          <div>
            <h3 className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
              Sfide Organizzative
            </h3>
            <div className="flex flex-col gap-4">
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
