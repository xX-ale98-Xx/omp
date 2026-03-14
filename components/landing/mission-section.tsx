export default function MissionSection() {
  return (
    <section id="mission" className="bg-muted scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-fraunces)] mb-8 text-3xl font-bold md:text-4xl">
          La nostra mission
        </h2>
        <blockquote className="text-foreground font-[family-name:var(--font-fraunces)] mb-8 text-2xl font-medium leading-snug md:text-3xl">
          &ldquo;Rendere ogni fisioterapista più efficace, ogni paziente più autonomo e ogni
          percorso di cura più umano.&rdquo;
        </blockquote>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
          Crediamo che l&apos;intelligenza artificiale non sostituisca il professionista — lo
          amplifica. OhMyPhysio mette l&apos;IA al servizio del giudizio clinico, liberando tempo
          prezioso per ciò che conta davvero: la relazione con il paziente.
        </p>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
          Stiamo costruendo la piattaforma che avremmo voluto avere noi stessi: intuitiva, potente
          e progettata attorno al flusso di lavoro reale del fisioterapista.
        </p>
      </div>
    </section>
  )
}
