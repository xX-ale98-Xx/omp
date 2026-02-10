import Image from 'next/image'
import { Separator } from '@/components/shadcn/ui/separator'

export default function LandingFooter() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Separator className="mb-8" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/OMP_logo.svg" alt="OhMyPhysio" width={24} height={24} />
            <span className="font-[family-name:var(--font-lusitana)] text-sm font-bold">
              OhMyPhysio
            </span>
          </div>
          <nav className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Termini
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Contatti
            </a>
          </nav>
          <p className="text-muted-foreground text-sm">&copy; 2026 OhMyPhysio</p>
        </div>
      </div>
    </footer>
  )
}
