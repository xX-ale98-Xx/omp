export default function ChiSiamoSection() {
  return (
    <section id="chi-siamo" className="bg-background scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-bold md:text-4xl">
            Chi siamo
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Siamo un team di fisioterapisti e sviluppatori con un obiettivo comune: portare la
            tecnologia al servizio della riabilitazione. OhMyPhysio nasce dall&apos;esperienza
            diretta sul campo — dalle frustrazioni quotidiane della gestione clinica e dal desiderio
            di offrire ai pazienti una continuità di cura vera, anche fuori dallo studio.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Uniamo competenze cliniche approfondite a un approccio tech-first per costruire
            strumenti che i professionisti della fisioterapia vogliono davvero usare.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6">
          {[
            { value: '10+', label: 'Anni di esperienza clinica' },
            { value: '500+', label: 'Professionisti coinvolti nella ricerca' },
            { value: '3', label: 'Università partner' },
            { value: '1', label: 'Missione chiara' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-muted flex flex-col gap-2 rounded-xl border p-6"
            >
              <span className="text-primary font-[family-name:var(--font-fraunces)] text-4xl font-bold">
                {stat.value}
              </span>
              <span className="text-muted-foreground text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
