'use client'

import { Button } from '@/components/shadcn/ui/button'
import ThemeToggle from '@/components/dark-light/ThemeToggleButton'
import { Mail, Plus, Trash2, Download, Heart, Settings, Search, ArrowRight } from 'lucide-react'

const variants = [
  'default',
  'destructive',
  'outline',
  'sidebar',
  'secondary',
  'ghost',
  'link',
] as const

const sizes = ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const

const variantLabels: Record<(typeof variants)[number], string> = {
  default: 'Default (Primary)',
  destructive: 'Destructive',
  outline: 'Outline',
  sidebar: 'Sidebar',
  secondary: 'Secondary',
  ghost: 'Ghost',
  link: 'Link',
}

const sizeLabels: Record<(typeof sizes)[number], string> = {
  default: 'Default',
  xs: 'Extra Small',
  sm: 'Small',
  lg: 'Large',
  icon: 'Icon',
  'icon-xs': 'Icon XS',
  'icon-sm': 'Icon SM',
  'icon-lg': 'Icon LG',
}

function isIconSize(size: string): boolean {
  return size.startsWith('icon')
}

export default function ProvaPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catalogo Componenti</h1>
          <p className="text-muted-foreground mt-1 text-sm">Solo per sviluppo</p>
        </div>
        <ThemeToggle />
      </div>

      <hr className="border-border" />

      {/* ==================== VARIANTI ==================== */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Varianti Button</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Ogni variante in stato normale, con icona e disabled
          </p>
        </div>

        <div className="grid gap-6">
          {variants.map((variant) => (
            <div
              key={variant}
              className="bg-card border-border space-y-3 rounded-lg border p-5"
            >
              <h3 className="text-sm font-medium">{variantLabels[variant]}</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant={variant}>
                  {variant === 'link' ? 'Link testuale' : variantLabels[variant]}
                </Button>
                <Button variant={variant}>
                  <Mail />
                  Con icona
                </Button>
                <Button variant={variant} disabled>
                  Disabled
                </Button>
                <Button variant={variant} disabled>
                  <Mail />
                  Disabled + icona
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border" />

      {/* ==================== DIMENSIONI ==================== */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Dimensioni</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Tutte le 8 size disponibili (4 testo + 4 icon-only)
          </p>
        </div>

        {/* Text sizes */}
        <div className="bg-card border-border space-y-3 rounded-lg border p-5">
          <h3 className="text-sm font-medium">Dimensioni con testo</h3>
          <div className="flex flex-wrap items-end gap-3">
            {sizes
              .filter((s) => !isIconSize(s))
              .map((size) => (
                <div key={size} className="flex flex-col items-center gap-1.5">
                  <Button size={size}>
                    <Plus />
                    {sizeLabels[size]}
                  </Button>
                  <span className="text-muted-foreground text-xs">{size}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Icon sizes */}
        <div className="bg-card border-border space-y-3 rounded-lg border p-5">
          <h3 className="text-sm font-medium">Dimensioni icon-only</h3>
          <div className="flex flex-wrap items-end gap-3">
            {sizes
              .filter((s) => isIconSize(s))
              .map((size) => (
                <div key={size} className="flex flex-col items-center gap-1.5">
                  <Button size={size}>
                    <Plus />
                  </Button>
                  <span className="text-muted-foreground text-xs">{size}</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ==================== MATRICE VARIANTE x SIZE ==================== */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Matrice Varianti x Dimensioni</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Ogni variante in tutte le dimensioni testo
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-border border-b">
                <th className="text-muted-foreground p-3 text-left text-xs font-medium">
                  Variante
                </th>
                {sizes
                  .filter((s) => !isIconSize(s))
                  .map((size) => (
                    <th
                      key={size}
                      className="text-muted-foreground p-3 text-center text-xs font-medium"
                    >
                      {size}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => (
                <tr key={variant} className="border-border border-b last:border-0">
                  <td className="p-3 text-sm font-medium">{variantLabels[variant]}</td>
                  {sizes
                    .filter((s) => !isIconSize(s))
                    .map((size) => (
                      <td key={size} className="p-3 text-center">
                        <Button variant={variant} size={size}>
                          Testo
                        </Button>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="border-border" />

      {/* ==================== ICON BUTTONS PER VARIANTE ==================== */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Icon Buttons per Variante</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Ogni variante nelle 4 dimensioni icon-only
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-border border-b">
                <th className="text-muted-foreground p-3 text-left text-xs font-medium">
                  Variante
                </th>
                {sizes
                  .filter((s) => isIconSize(s))
                  .map((size) => (
                    <th
                      key={size}
                      className="text-muted-foreground p-3 text-center text-xs font-medium"
                    >
                      {size}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {variants
                .filter((v) => v !== 'link')
                .map((variant) => (
                  <tr key={variant} className="border-border border-b last:border-0">
                    <td className="p-3 text-sm font-medium">{variantLabels[variant]}</td>
                    {sizes
                      .filter((s) => isIconSize(s))
                      .map((size) => (
                        <td key={size} className="p-3 text-center">
                          <Button variant={variant} size={size}>
                            <Plus />
                          </Button>
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="border-border" />

      {/* ==================== CON ICONE DIVERSE ==================== */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Bottoni con icone diverse</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Esempi realistici con varie icone lucide
          </p>
        </div>

        <div className="bg-card border-border space-y-3 rounded-lg border p-5">
          <div className="flex flex-wrap gap-3">
            <Button>
              <Mail />
              Invia email
            </Button>
            <Button variant="destructive">
              <Trash2 />
              Elimina
            </Button>
            <Button variant="outline">
              <Download />
              Scarica
            </Button>
            <Button variant="secondary">
              <Heart />
              Preferiti
            </Button>
            <Button variant="sidebar">
              <Settings />
              Impostazioni
            </Button>
            <Button variant="ghost">
              <Search />
              Cerca
            </Button>
            <Button variant="link">
              Vai avanti
              <ArrowRight />
            </Button>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ==================== STATI SPECIALI ==================== */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Stati speciali</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Full width */}
          <div className="bg-card border-border space-y-3 rounded-lg border p-5">
            <h3 className="text-sm font-medium">Full Width</h3>
            <div className="space-y-2">
              <Button className="w-full">Primary full width</Button>
              <Button variant="outline" className="w-full">
                Outline full width
              </Button>
              <Button variant="secondary" className="w-full">
                Secondary full width
              </Button>
            </div>
          </div>

          {/* Loading */}
          <div className="bg-card border-border space-y-3 rounded-lg border p-5">
            <h3 className="text-sm font-medium">Loading (spinner)</h3>
            <div className="space-y-2">
              <Button disabled className="w-full">
                <svg
                  className="size-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Caricamento...
              </Button>
              <Button variant="destructive" disabled className="w-full">
                <svg
                  className="size-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Eliminazione...
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
