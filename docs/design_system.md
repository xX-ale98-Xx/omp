# Design System - Panoramica Generale

> **RECAP**: Documento di architettura del design system dell'applicazione. Descrive la filosofia, lo stack tecnologico, le convenzioni di naming, e il workflow di sviluppo. Consulta questo file per capire le decisioni architetturali, onboarding nuovi membri, o pianificare evoluzioni del sistema.

---

## 📋 Indice

- [Filosofia](#filosofia)
- [Architettura](#architettura)
- [Sistema Colori](#sistema-colori)
  - [Palette Base](#palette-base)
  - [Token Semantici](#token-semantici)
  - [Hover Logic](#hover-logic)
- [Componenti](#componenti)
  - [Stack Tecnologico](#stack-tecnologico)
  - [Librerie di Supporto](#librerie-di-supporto)
  - [Pattern di Customizzazione](#pattern-di-customizzazione)
- [Struttura File](#struttura-file)
- [Workflow Sviluppo](#workflow-sviluppo)
  - [Aggiungere un Nuovo Componente shadcn](#1-aggiungere-un-nuovo-componente-shadcn)
  - [Customizzare il Componente](#2-customizzare-il-componente)
  - [Usare il Componente](#3-usare-il-componente)
- [Best Practices](#best-practices)
- [Convenzioni di Naming](#convenzioni-di-naming)
  - [Varianti](#varianti)
  - [Dimensioni](#dimensioni)
  - [Colori Custom](#colori-custom)
- [Metriche di Qualità](#metriche-di-qualità)
  - [Accessibilità](#accessibilità)
  - [Performance](#performance)
  - [Developer Experience](#developer-experience)
- [Roadmap](#roadmap)
- [Documentazione Correlata](#documentazione-correlata)
- [Contributing](#contributing)
- [Supporto](#supporto)
- [Changelog](#changelog)

---

## 🎯 Filosofia

Il nostro design system è costruito per:

1. **Coerenza** - Stessa esperienza utente in tutta l'app
2. **Accessibilità** - WCAG 2.2 Level AA garantito
3. **Manutenibilità** - Modifiche centralizzate, effetto globale
4. **Performance** - CSS minimo grazie a Tailwind JIT
5. **Developer Experience** - Type-safe, autocomplete, documentato

[↑ Torna all'indice](#-indice)

---

## 🏗️ Architettura

```
┌─────────────────────────────────────┐
│     harmonized-palette.css          │  ← Source of truth (NON modificare)
│  Colori base OKLCH (100-900)        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         global.css                   │  ← Token semantici
│  :root { --primary: var(...) }      │
│  .dark { --primary: var(...) }      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Componenti Tailwind             │  ← Utilizzo
│  className="bg-primary text-..."     │
└─────────────────────────────────────┘
```

[↑ Torna all'indice](#-indice)

---

## 🎨 Sistema Colori

### Palette Base

Generata con [Harmonizer](https://harmonizer.evilmartians.com/) in spazio OKLCH:

- **Turquoise** (185°) - Brand principale
- **Coral** (25°) - Warning/Destructive
- **Turmeric** (105°) - Secondary
- **Green** (145°) - Success
- **Azure** (225°) - Accent
- **Grays** (acromatici) - Neutri

[↑ Torna all'indice](#-indice)

### Token Semantici

| Funzione | Light | Dark | Uso |
|----------|-------|------|-----|
| Primary | turquoise-600 | turquoise-500 | CTA, azioni principali |
| Secondary | turmeric-600 | turmeric-500 | Azioni secondarie |
| Success | green-600 | green-500 | Conferme, stati positivi |
| Warning/Destructive | coral-600 | coral-500 | Alert, azioni pericolose |
| Accent | azure-600 | azure-500 | Hover, highlight |

[↑ Torna all'indice](#-indice)

### Hover Logic

- **Light**: 600 → 700 (più scuro)
- **Dark**: 500 → 400 (più chiaro)

Garantisce contrasto ottimale in entrambi i temi.

[↑ Torna all'indice](#-indice)

---

## 🧩 Componenti

### Stack Tecnologico

- **Tailwind CSS v4** - Utility-first framework
- **shadcn/ui** - Componenti headless copy-paste
- **CVA** - Class Variance Authority per varianti
- **Radix UI** - Primitives accessibili (sotto shadcn)

[↑ Torna all'indice](#-indice)

### Librerie di Supporto

```json
{
  "clsx": "Concatenazione condizionale classi",
  "tailwind-merge": "Risoluzione conflitti Tailwind",
  "class-variance-authority": "Gestione varianti type-safe",
  "@radix-ui/react-slot": "Composizione componenti"
}
```

[↑ Torna all'indice](#-indice)

### Pattern di Customizzazione

#### 1. Componenti Semplici (es. Button)
```tsx
// Modifica solo CVA
const buttonVariants = cva('base', {
  variants: {
    variant: {
      custom: 'bg-primary hover:bg-primary-hover'  // ← Aggiungi qui
    }
  }
})
```

#### 2. Componenti Composti (es. Alert)
```tsx
// Contenitore: aggiungi variants in CVA
// Sub-componenti: modifica classi in cn()

const alertVariants = cva('...', {
  variants: {
    variant: {
      custom: '...'  // ← Contenitore
    }
  }
})

const AlertTitle = ({ className }) => (
  <h5 className={cn('custom-classes', className)} />
  //                 ↑ Sub-componente
)
```

[↑ Torna all'indice](#-indice)

---

## 📁 Struttura File

```
root/
├── styles/
│   ├── README.md                ← Guida colori
│   └── harmonized-palette.css   ← Palette base
├── components/
│   └── shadcn/
│       └── ui/
│           ├── CUSTOMIZATION_GUIDE.md  ← Guida shadcn
│           ├── button.tsx
│           ├── badge.tsx
│           ├── alert.tsx
│           └── ...altri componenti
├── lib/
│   └── utils.ts                 ← cn() utility
└── docs/
    └── DESIGN_SYSTEM.md         ← Questo file
```

[↑ Torna all'indice](#-indice)

---

## 🔧 Workflow Sviluppo

### 1. Aggiungere un Nuovo Componente shadcn

```bash
# Installa componente
npx shadcn@latest add button

# File creato: components/shadcn/ui/button.tsx
```

[↑ Torna all'indice](#-indice)

### 2. Customizzare il Componente

```tsx
// 1. Apri components/shadcn/ui/button.tsx
// 2. Trova const buttonVariants = cva(...)
// 3. Aggiungi/modifica variants:

variants: {
  variant: {
    default: 'bg-primary hover:bg-primary-hover',
    custom: 'bg-success hover:bg-success-hover',  // ← Nuova!
  }
}
```

[↑ Torna all'indice](#-indice)

### 3. Usare il Componente

```tsx
import { Button } from '@/components/shadcn/ui/button'

<Button variant="custom">
  Click me
</Button>
```

[↑ Torna all'indice](#-indice)

---

## ✅ Best Practices

### 1. Token Semantici > Colori Diretti

```tsx
❌ className="bg-turquoise-600"
✅ className="bg-primary"
```

### 2. Hover Espliciti > Opacity

```tsx
❌ hover:bg-primary/90
✅ hover:bg-primary-hover
```

### 3. CVA per Varianti > Logica Condizionale

```tsx
❌ const classes = variant === 'custom' ? 'bg-...' : '...'
✅ const variants = cva('...', { variants: { custom: '...' } })
```

### 4. Sempre defaultVariants

```tsx
✅ defaultVariants: { variant: 'default', size: 'md' }
```

### 5. Testa in Dark Mode

```tsx
// Forza dark mode durante sviluppo
<html className="dark">
```

[↑ Torna all'indice](#-indice)

---

## 🎯 Convenzioni di Naming

### Varianti

```tsx
// Azioni
default, primary, secondary, tertiary

// Stati
success, warning, error, info

// Contesti medici
scheduled, completed, cancelled, inProgress

// Enfasi
subtle, outline, ghost, link
```

[↑ Torna all'indice](#-indice)

### Dimensioni

```tsx
xs, sm, default/md, lg, xl, icon, full
```

[↑ Torna all'indice](#-indice)

### Colori Custom

```tsx
// Prefisso semantico + tipo
--myPrimary-bg
--myPrimary-hover
--mySuccess-bg
```

[↑ Torna all'indice](#-indice)

---

## 📊 Metriche di Qualità

### Accessibilità

- ✅ Contrasti WCAG AA (4.5:1 testo, 3:1 UI)
- ✅ Focus indicators visibili
- ✅ Semantic HTML
- ✅ ARIA attributes (via Radix)

[↑ Torna all'indice](#-indice)

### Performance

- ✅ CSS < 50KB (Tailwind JIT)
- ✅ No runtime CSS-in-JS
- ✅ Tree-shaking automatico
- ✅ Critical CSS inline

[↑ Torna all'indice](#-indice)

### Developer Experience

- ✅ TypeScript strict mode
- ✅ Autocomplete per varianti (CVA)
- ✅ Documentazione inline
- ✅ Esempi per ogni componente

[↑ Torna all'indice](#-indice)

---

## 🚀 Roadmap

### v1.1 (Q1 2026)
- [ ] Aggiungere varianti mediche a tutti i componenti
- [ ] Componenti custom domain-specific (AppointmentCard, PatientBadge)
- [ ] Storybook per visual testing

### v1.2 (Q2 2026)
- [ ] Animazioni micro-interactions
- [ ] Varianti responsive size
- [ ] Themes switcher UI

### v2.0 (Q3 2026)
- [ ] Multiple brand themes
- [ ] Component playground
- [ ] Design tokens JSON export

[↑ Torna all'indice](#-indice)

---

## 📚 Documentazione Correlata

- **Guida Colori**: [`styles/README.md`](../styles/README.md)
- **Guida Componenti**: [`components/ui/CUSTOMIZATION_GUIDE.md`](../components/ui/CUSTOMIZATION_GUIDE.md)
- **Tailwind Docs**: https://tailwindcss.com/
- **shadcn/ui Docs**: https://ui.shadcn.com/

[↑ Torna all'indice](#-indice)

---

## 🤝 Contributing

### Prima di Modificare Componenti

1. Leggi `components/shadcn/ui/CUSTOMIZATION_GUIDE.md`
2. Testa in light e dark mode
3. Verifica contrasti accessibilità
4. Documenta varianti custom con commenti
5. Aggiorna questa doc se necessario

### Aggiungere Nuovi Colori

1. **NON** modificare `harmonized-palette.css`
2. Aggiungi token semantico in `globals.css`
3. Mappa in `@theme`
4. Documenta in `styles/README.md`

[↑ Torna all'indice](#-indice)

---

## 📞 Supporto

**Domande sul design system?**

1. Consulta la documentazione:
   - Colori → `styles/README.md`
   - Componenti → `components/shadcn/ui/CUSTOMIZATION_GUIDE.md`
   - Overview → Questo file

2. Contatta:
   - Lead Design: [nome]
   - Lead Frontend: [nome]

[↑ Torna all'indice](#-indice)

---

## 📝 Changelog

### v1.0.0 (Gennaio 2026)
- ✨ Setup iniziale design system
- ✨ Palette armonizzata OKLCH
- ✨ Token semantici light/dark
- ✨ Customizzazione shadcn/ui
- 📚 Documentazione completa

[↑ Torna all'indice](#-indice)

---

**Creato con** ❤️ **dal team [Nome Azienda]**  
**Ultima modifica**: Gennaio 2026