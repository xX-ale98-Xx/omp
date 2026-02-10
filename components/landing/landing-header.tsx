'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shadcn/ui/sheet'
import ThemeToggle from '@/components/dark-light/ThemeToggleButton'

const navLinks = [
  { href: '#problemi', label: 'Problemi' },
  { href: '#soluzione', label: 'Soluzione' },
  { href: '#come-funziona', label: 'Come funziona' },
  { href: '#vantaggi', label: 'Vantaggi' },
  { href: '#perche-omp', label: 'Perche OMP' },
  { href: '#faq', label: 'FAQ' },
]

export default function LandingHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-2">
          <Image src="/OMP_logo.svg" alt="OhMyPhysio" width={32} height={32} />
          <span className="font-[family-name:var(--font-lusitana)] text-lg font-bold">
            OhMyPhysio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/login">Accedi</Link>
          </Button>
          <Button asChild>
            <a href="#demo">Richiedi una demo</a>
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 p-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-foreground hover:text-primary text-base transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="border-border my-2 border-t" />
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">Accedi</Link>
                </Button>
                <Button asChild className="w-full">
                  <a href="#demo" onClick={() => setOpen(false)}>
                    Richiedi una demo
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
