import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContattiSection() {
  return (
    <section id="contatti" className="bg-background scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-bold md:text-4xl">
            Contatti
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
            Vuoi saperne di più o costruire OMP con noi? Scrivici, ti risponderemo al più presto.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
          <a
            href="mailto:info@ohmyphysio.it"
            className="bg-muted hover:border-primary flex flex-col items-center gap-3 rounded-xl border p-6 text-center transition-colors"
          >
            <Mail className="text-primary size-6" />
            <span className="font-medium">Email</span>
            <span className="text-muted-foreground text-sm">info@ohmyphysio.it</span>
          </a>

          <div className="bg-muted flex flex-col items-center gap-3 rounded-xl border p-6 text-center">
            <Phone className="text-primary size-6" />
            <span className="font-medium">Telefono</span>
            <span className="text-muted-foreground text-sm">+39 02 0000 0000</span>
          </div>

          <div className="bg-muted flex flex-col items-center gap-3 rounded-xl border p-6 text-center">
            <MapPin className="text-primary size-6" />
            <span className="font-medium">Sede</span>
            <span className="text-muted-foreground text-sm">Milano, Italia</span>
          </div>
        </div>
      </div>
    </section>
  )
}
