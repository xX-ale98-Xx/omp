import { Button } from '@/components/shadcn/ui/button'

export default function Prova() {
  return (
    <div className="space-y-12 p-8">
      <h1 className="mb-8 text-4xl font-bold">Button Showcase</h1>

      {/* ==================== VARIANTI ==================== */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Varianti</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default (Primary)</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* ==================== DIMENSIONI ==================== */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Dimensioni</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </Button>
        </div>
      </section>

      {/* ==================== COMBINAZIONI ==================== */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Combinazioni Varianti + Dimensioni</h2>

        {/* Default */}
        <div className="mb-6">
          <h3 className="text-muted-foreground mb-2 text-lg font-medium">Default (Primary)</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="default" size="sm">
              Small Primary
            </Button>
            <Button variant="default" size="default">
              Default Primary
            </Button>
            <Button variant="default" size="lg">
              Large Primary
            </Button>
          </div>
        </div>

        {/* Destructive */}
        <div className="mb-6">
          <h3 className="text-muted-foreground mb-2 text-lg font-medium">Destructive</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="destructive" size="sm">
              Small Delete
            </Button>
            <Button variant="destructive" size="default">
              Default Delete
            </Button>
            <Button variant="destructive" size="lg">
              Large Delete
            </Button>
          </div>
        </div>

        {/* Outline */}
        <div className="mb-6">
          <h3 className="text-muted-foreground mb-2 text-lg font-medium">Outline</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              Small Outline
            </Button>
            <Button variant="outline" size="default">
              Default Outline
            </Button>
            <Button variant="outline" size="lg">
              Large Outline
            </Button>
          </div>
        </div>

        {/* Secondary */}
        <div className="mb-6">
          <h3 className="text-muted-foreground mb-2 text-lg font-medium">Secondary</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm">
              Small Secondary
            </Button>
            <Button variant="secondary" size="default">
              Default Secondary
            </Button>
            <Button variant="secondary" size="lg">
              Large Secondary
            </Button>
          </div>
        </div>

        {/* Ghost */}
        <div className="mb-6">
          <h3 className="text-muted-foreground mb-2 text-lg font-medium">Ghost</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" size="sm">
              Small Ghost
            </Button>
            <Button variant="ghost" size="default">
              Default Ghost
            </Button>
            <Button variant="ghost" size="lg">
              Large Ghost
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== STATI ==================== */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Stati</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* ==================== CON ICONE ==================== */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Con Icone</h2>
        <div className="flex flex-wrap gap-4">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Aggiungi
          </Button>
          <Button variant="destructive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            Elimina
          </Button>
          <Button variant="outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download
          </Button>
        </div>
      </section>

      {/* ==================== FULL WIDTH ==================== */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Full Width</h2>
        <div className="space-y-3">
          <Button className="w-full">Full Width Primary</Button>
          <Button variant="secondary" className="w-full">
            Full Width Secondary
          </Button>
          <Button variant="outline" className="w-full">
            Full Width Outline
          </Button>
        </div>
      </section>

      {/* ==================== LOADING STATE (custom) ==================== */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Loading (con spinner custom)</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>
            <svg
              className="mr-2 -ml-1 h-4 w-4 animate-spin"
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
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </Button>
        </div>
      </section>

      {/* ==================== DARK MODE PREVIEW ==================== */}
      <section className="rounded-lg bg-gray-900 p-6 dark:bg-gray-100">
        <h2 className="mb-4 text-2xl font-semibold text-white dark:text-black">
          Preview Dark Mode
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>
    </div>
  )
}
