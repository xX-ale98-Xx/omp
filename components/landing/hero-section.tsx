import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Badge } from '@/components/shadcn/ui/badge'

export default function HeroSection() {
  return (
    <section className="bg-background scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <Badge variant="outline" className="w-fit">
            IA per la Fisioterapia
          </Badge>
          <h1 className="font-[family-name:var(--font-lusitana)] text-4xl font-bold md:text-5xl lg:text-6xl">
            Fisioterapia intelligente, oltre lo studio
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg">
            Monitoraggio remoto con IA, esercizi guidati e gestione completa dello studio in
            un&apos;unica piattaforma. Segui i tuoi pazienti ovunque si trovino.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="#demo">
                Richiedi una demo
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#come-funziona">Scopri come funziona</a>
            </Button>
          </div>
        </div>

        {/* Visual placeholder */}
        <div className="bg-muted hidden aspect-video items-center justify-center rounded-xl border lg:flex">
          <p className="text-muted-foreground text-sm">Dashboard preview</p>
        </div>
      </div>
    </section>
  )
}
