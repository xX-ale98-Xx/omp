# Guida alla Customizzazione Componenti shadcn/ui

> **RECAP**: Questa guida spiega come modificare i componenti shadcn/ui per adattarli al nostro design system. Imparerai a usare CVA per aggiungere varianti, cn() per gestire classi, e come customizzare componenti semplici e composti. Consultala quando devi modificare o estendere componenti UI importati da shadcn. I componenti si trovano in `components/shadcn/ui/`.

---

## 📋 Indice

- [Introduzione](#introduzione)
  - [Cos'è shadcn/ui?](#cosè-shadcnui)
  - [Filosofia di Customizzazione](#filosofia-di-customizzazione)
- [Anatomia di un Componente](#anatomia-di-un-componente)
- [Strumenti Chiave](#strumenti-chiave)
  - [CVA (Class Variance Authority)](#cva-class-variance-authority)
  - [cn() Utility](#cn-utility)
  - [Slot (asChild)](#slot-aschild)
- [Customizzazione Base](#customizzazione-base)
  - [Aggiungere una Nuova Variante](#aggiungere-una-nuova-variante)
  - [Modificare Classi Default](#modificare-classi-default)
  - [Modificare Hover Behavior](#modificare-hover-behavior)
- [Componenti Composti](#componenti-composti)
  - [Struttura Tipica](#struttura-tipica)
  - [Come Customizzare](#come-customizzare)
- [Best Practices](#best-practices)
- [Esempi Pratici](#esempi-pratici)
  - [Badge con Varianti Mediche](#esempio-1-badge-con-varianti-mediche)
  - [Alert con Varianti Estese](#esempio-2-alert-con-varianti-estese)
  - [Card Clickabile](#esempio-3-card-clickabile-aschild)
- [Errori Comuni](#errori-comuni)
- [Checklist Pre-Commit](#checklist-pre-commit)
- [Risorse](#risorse)

---

## 🎯 Introduzione

### Cos'è shadcn/ui?

shadcn/ui **NON è una libreria** installata via npm. È una **collezione di componenti** che:
- Copi direttamente nel progetto (`components/shadcn/ui/`)
- Possiedi completamente (non dipendi da pacchetti esterni)
- Customizzi liberamente modificando il codice

> "This is not a component library. It's a collection of re-usable components that **you own**."  
> — shadcn/ui docs

[↑ Torna all'indice](#-indice)

### Filosofia di Customizzazione

**shadcn è FATTO per essere modificato!**

❌ Non pensare: "Non posso toccare questo codice"  
✅ Pensa: "Questo è il MIO componente, lo adatto come serve"

[↑ Torna all'indice](#-indice)

---

## 🔬 Anatomia di un Componente

Ogni componente shadcn segue questa struttura:

```tsx
// 1️⃣ IMPORT (non toccare)
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 2️⃣ VARIANTI CVA (👈 QUI CUSTOMIZZI)
const componentVariants = cva(
  'classi-base-sempre-applicate',
  {
    variants: {
      variant: {
        default: 'classi-variant-default',
        custom: 'classi-variant-custom',
      },
      size: {
        sm: 'classi-size-small',
        lg: 'classi-size-large',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    }
  }
)

// 3️⃣ COMPONENTE REACT (raramente modifichi)
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Component.displayName = 'Component'

// 4️⃣ EXPORT (non toccare)
export { Component, componentVariants }
```

### Regola d'Oro

**Modifichi SOLO la parte 2️⃣ (CVA)** il 99% delle volte.

[↑ Torna all'indice](#-indice)

---

## 🛠️ Strumenti Chiave

### CVA (Class Variance Authority)

Gestisce **varianti** di classi CSS in modo type-safe.

#### Senza CVA (brutto)
```tsx
const classes = variant === 'primary' ? 'bg-blue-500' : 
                variant === 'destructive' ? 'bg-red-500' : 'bg-gray-500'
```

#### Con CVA (pulito)
```tsx
const variants = cva('base', {
  variants: {
    variant: {
      primary: 'bg-blue-500',
      destructive: 'bg-red-500',
    }
  }
})
```

[↑ Torna all'indice](#-indice)

### cn() Utility

Combina classi e risolve conflitti Tailwind.

```tsx
cn('bg-blue-500', 'text-white', 'bg-red-500')
// Risultato: "text-white bg-red-500"
//             ↑ bg-blue-500 rimosso (conflitto)
```

**Perché è importante:**
```tsx
// Componente interno ha bg-primary
// Tu passi bg-green-500 dall'esterno
<Button className="bg-green-500" />

// cn() risolve:
cn('bg-primary', 'bg-green-500') → 'bg-green-500'  ✅
```

[↑ Torna all'indice](#-indice)

### Slot (asChild)

Permette di "fondere" componenti senza creare wrapper.

```tsx
// Senza Slot:
<Button>
  <Link href="/home">Home</Link>
</Button>
// → <button><a>Home</a></button>  ❌ HTML invalido

// Con Slot:
<Button asChild>
  <Link href="/home">Home</Link>
</Button>
// → <a class="button-styles">Home</a>  ✅ Solo <a> con stili Button
```

[↑ Torna all'indice](#-indice)

---

## ✏️ Customizzazione Base

### Aggiungere una Nuova Variante

**Esempio: Button con variante `success`**

```tsx
// components/shadcn/ui/button.tsx

const buttonVariants = cva(
  'inline-flex items-center justify-center ...',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
        
        // ✅ AGGIUNGI QUESTA RIGA:
        success: 'bg-success text-white shadow-sm hover:bg-success-hover',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
      }
    }
  }
)

// ❌ Non toccare il resto del file!
```

**Uso:**
```tsx
<Button variant="success">Conferma Appuntamento</Button>
```

[↑ Torna all'indice](#-indice)

### Modificare Classi Default

**Esempio: Rendere tutti i Button più grandi di default**

```tsx
const buttonVariants = cva(
  // ✅ MODIFICA QUI (classi base):
  'inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold ...',
  //                                               ↑ era rounded-md  ↑ era text-sm
  {
    variants: { ... }
  }
)
```

[↑ Torna all'indice](#-indice)

### Modificare Hover Behavior

**Importante:** Usa sempre hover **espliciti**, non opacity!

```tsx
❌ EVITA:
variant: {
  default: 'bg-primary hover:bg-primary/90',  // Opacity generica
}

✅ PREFERISCI:
variant: {
  default: 'bg-primary hover:bg-primary-hover',  // Colore esplicito da palette
}
```

**Perché?**
- Controllo cromatico preciso
- Coerenza con progressione palette (600→700)
- Dark mode gestito correttamente

[↑ Torna all'indice](#-indice)

---

## 🧩 Componenti Composti

Alcuni componenti shadcn sono **composti** da più sub-componenti.

**Esempio: Alert**

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/shadcn/ui/alert'

<Alert variant="destructive">
  <AlertTitle>Errore</AlertTitle>
  <AlertDescription>Qualcosa è andato storto</AlertDescription>
</Alert>
```

[↑ Torna all'indice](#-indice)

### Struttura Tipica

```tsx
// CONTENITORE (con CVA)
const alertVariants = cva('...', {
  variants: {
    variant: {
      default: '...',
      destructive: '...',
    }
  }
})

const Alert = ({ variant, className }) => (
  <div className={cn(alertVariants({ variant }), className)} />
)

// SUB-COMPONENTI (senza CVA)
const AlertTitle = ({ className }) => (
  <h5 className={cn('mb-1 font-medium', className)} />
)

const AlertDescription = ({ className }) => (
  <div className={cn('text-sm', className)} />
)

export { Alert, AlertTitle, AlertDescription }
```

[↑ Torna all'indice](#-indice)

### Come Customizzare

#### Livello 1: Contenitore (aggiungi variants)

```tsx
const alertVariants = cva('...', {
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      destructive: 'border-destructive/50 bg-destructive/10 text-destructive',
      
      // ✅ AGGIUNGI:
      success: 'border-green-500/50 bg-green-100 text-green-900 dark:bg-green-900/20',
      warning: 'border-turmeric-500/50 bg-turmeric-100 text-turmeric-900',
    }
  }
})
```

#### Livello 2: Sub-componenti (modifica classi default)

```tsx
const AlertTitle = ({ className }) => (
  <h5 className={cn(
    'mb-2 font-bold text-lg',  // ✅ Era: 'mb-1 font-medium'
    className
  )} />
)
```

#### Livello 3: Override al volo (quando usi il componente)

```tsx
<Alert variant="success" className="border-2 shadow-xl">
  <AlertTitle className="text-2xl">Grande Successo!</AlertTitle>
  <AlertDescription className="text-base">Tutto ok</AlertDescription>
</Alert>
```

[↑ Torna all'indice](#-indice)

---

## ✅ Best Practices

### 1. Modifica Solo CVA (99% dei casi)

```tsx
✅ QUESTO:
const buttonVariants = cva('...', {
  variants: {
    variant: {
      custom: 'bg-custom hover:bg-custom-hover',  // ← Aggiungi qui
    }
  }
})

❌ NON QUESTO:
const Button = ({ variant }) => {
  // Non aggiungere logica condizionale qui!
  const customClass = variant === 'custom' ? 'bg-custom' : ''
  return <button className={customClass} />
}
```

### 2. Usa Token Semantici, Non Colori Diretti

```tsx
❌ EVITA:
variant: {
  custom: 'bg-turquoise-600 hover:bg-turquoise-700',
}

✅ PREFERISCI:
variant: {
  custom: 'bg-primary hover:bg-primary-hover',
}
```

### 3. Rispetta defaultVariants

```tsx
const componentVariants = cva('...', {
  variants: {
    variant: { ... },
    size: { ... }
  },
  defaultVariants: {
    variant: 'default',  // ← Sempre specifica
    size: 'default',
  }
})
```

### 4. Testa Sempre senza Props

```tsx
// Dopo aver modificato un componente, testa:
<Button />                     // ← Nessuna prop
<Button variant="custom" />    // ← Con variant
<Button size="lg" />           // ← Solo size
```

### 5. Non Duplicare Prefissi tra Base e Variants

```tsx
❌ EVITA:
const buttonVariants = cva(
  'bg-blue-500 p-4',  // bg-* qui
  {
    variants: {
      variant: {
        destructive: 'bg-red-500',  // bg-* anche qui → confusione
      }
    }
  }
)

✅ PREFERISCI:
const buttonVariants = cva(
  'p-4 transition-colors',  // NO bg-* nella base
  {
    variants: {
      variant: {
        default: 'bg-blue-500',
        destructive: 'bg-red-500',
      }
    },
    defaultVariants: { variant: 'default' }
  }
)
```

### 6. Documenta Varianti Custom

```tsx
const buttonVariants = cva('...', {
  variants: {
    variant: {
      default: 'bg-primary ...',
      
      // ✅ COMMENTA varianti custom:
      // Usato per appuntamenti confermati
      success: 'bg-success text-white hover:bg-success-hover',
      
      // Usato per notifiche mediche
      medical: 'bg-turquoise-100 text-turquoise-900 border-turquoise-300',
    }
  }
})
```

[↑ Torna all'indice](#-indice)

---

## 💡 Esempi Pratici

### Esempio 1: Badge con Varianti Mediche

```tsx
// components/shadcn/ui/badge.tsx

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        
        // ✅ VARIANTI CUSTOM MEDICHE:
        scheduled: 'border-transparent bg-azure-600 text-white',
        completed: 'border-transparent bg-green-600 text-white',
        cancelled: 'border-transparent bg-coral-600 text-white',
        inProgress: 'border-transparent bg-turmeric-600 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Uso:
<Badge variant="scheduled">Programmato</Badge>
<Badge variant="completed">Completato</Badge>
<Badge variant="cancelled">Cancellato</Badge>
```

[↑ Torna all'indice](#-indice)

### Esempio 2: Alert con Varianti Estese

```tsx
// components/shadcn/ui/alert.tsx

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 bg-destructive/10 text-destructive',
        
        // ✅ VARIANTI CUSTOM:
        success: 'border-green-500/50 bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-400 [&>svg]:text-green-600',
        warning: 'border-turmeric-500/50 bg-turmeric-100 text-turmeric-900 dark:bg-turmeric-900/20 [&>svg]:text-turmeric-600',
        info: 'border-azure-500/50 bg-azure-100 text-azure-900 dark:bg-azure-900/20 [&>svg]:text-azure-600',
      },
    },
  }
)

// Uso:
<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Successo</AlertTitle>
  <AlertDescription>Operazione completata</AlertDescription>
</Alert>
```

[↑ Torna all'indice](#-indice)

### Esempio 3: Card Clickabile (asChild)

```tsx
// Uso standard:
<Card>
  <CardHeader>
    <CardTitle>Titolo</CardTitle>
  </CardHeader>
  <CardContent>Contenuto</CardContent>
</Card>

// Card intera clickabile:
<Card asChild>
  <Link href="/appuntamento/123">
    <CardHeader>
      <CardTitle>Appuntamento ore 15:00</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Paziente: Mario Rossi</p>
      <Badge variant="scheduled">Programmato</Badge>
    </CardContent>
  </Link>
</Card>

// Renderizza: <a class="card-styles" href="/appuntamento/123">...</a>
```

[↑ Torna all'indice](#-indice)

---

## 🚨 Errori Comuni

### Errore 1: Modificare il Boilerplate React

```tsx
❌ NON FARE:
const Button = ({ variant, className, ...props }) => {
  // ❌ Aggiungere logica custom qui
  const myCustomLogic = variant === 'special' ? 'custom-class' : ''
  
  return (
    <button className={cn(buttonVariants({ variant }), myCustomLogic, className)} />
  )
}

✅ FAI INVECE:
// Aggiungi la variant in CVA!
const buttonVariants = cva('...', {
  variants: {
    variant: {
      special: 'custom-class',  // ← Qui!
    }
  }
})
```

### Errore 2: Usare asChild con Multipli Children

```tsx
❌ NON FUNZIONA:
<Button asChild>
  <Link href="/a">Link A</Link>
  <Link href="/b">Link B</Link>
</Button>

✅ FUNZIONA:
<Button asChild>
  <Link href="/a">Link A</Link>  {/* Solo UN child */}
</Button>
```

### Errore 3: Dimenticare defaultVariants

```tsx
❌ PROBLEMATICO:
const buttonVariants = cva('transition-colors', {
  variants: {
    variant: {
      default: 'bg-primary',
      destructive: 'bg-destructive',
    }
  }
  // ❌ Nessun defaultVariants!
})

✅ CORRETTO:
const buttonVariants = cva('...', {
  variants: { ... },
  defaultVariants: {
    variant: 'default',  // ← Sempre specifica!
  }
})
```

[↑ Torna all'indice](#-indice)

---

## 📚 Checklist Pre-Commit

Prima di committare modifiche a componenti shadcn:

- [ ] Ho modificato SOLO le parti CVA (variants)?
- [ ] Ho usato token semantici (`bg-primary`, non `bg-turquoise-600`)?
- [ ] Ho specificato `defaultVariants`?
- [ ] Ho testato il componente senza passare props?
- [ ] Ho testato in dark mode?
- [ ] Ho documentato varianti custom con commenti?
- [ ] Gli hover usano colori espliciti (no opacity)?

[↑ Torna all'indice](#-indice)

---

## 📞 Risorse

- **Documentazione stili**: `styles/README.md`
- **shadcn/ui docs**: https://ui.shadcn.com/
- **Tailwind docs**: https://tailwindcss.com/
- **CVA docs**: https://cva.style/

[↑ Torna all'indice](#-indice)

---

**Ultima modifica**: Gennaio 2026  
**Versione**: 1.0.0