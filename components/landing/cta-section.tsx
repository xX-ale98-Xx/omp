import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'

export default function CtaSection() {
  return (
    <section id="demo" className="bg-muted scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-lusitana)] mb-4 text-3xl font-bold md:text-4xl">
          Pronto a trasformare il tuo studio?
        </h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
          Scopri come OhMyPhysio puo migliorare la qualita della cura e semplificare la gestione
          del tuo studio. Prenota una demo gratuita senza impegno.
        </p>
        <Button size="lg" asChild>
          <a href="mailto:info@ohmyphysio.it">
            Prenota una demo
            <ArrowRight className="size-4" />
          </a>
        </Button>
        <p className="text-muted-foreground mt-4 text-sm">
          Nessun impegno. Nessuna carta di credito richiesta.
        </p>
      </div>
    </section>
  )
}
