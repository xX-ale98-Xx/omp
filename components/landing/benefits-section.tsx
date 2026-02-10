import { Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'

const physioBenefits = [
  'Maggiore controllo clinico sui percorsi riabilitativi',
  'Decisioni basate su dati oggettivi, non su impressioni',
  'Meno tempo in burocrazia, piu tempo per i pazienti',
  'Possibilita di seguire piu pazienti senza perdere qualita',
]

const patientBenefits = [
  'Guida continua anche a casa, non solo in studio',
  'Maggiore sicurezza nell\'esecuzione degli esercizi',
  'Recupero piu veloce grazie al monitoraggio costante',
  'Meno spostamenti e piu flessibilita nel percorso',
]

function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check className="text-primary mt-0.5 size-5 shrink-0" />
          <span className="text-sm">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function BenefitsSection() {
  return (
    <section id="vantaggi" className="bg-background scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-lusitana)] mb-12 text-center text-3xl font-bold md:text-4xl">
          I vantaggi per tutti
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Per il Fisioterapista</CardTitle>
            </CardHeader>
            <CardContent>
              <BenefitList items={physioBenefits} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Per il Paziente</CardTitle>
            </CardHeader>
            <CardContent>
              <BenefitList items={patientBenefits} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
