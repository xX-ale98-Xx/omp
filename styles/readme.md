# Sistema di Stili - Guida Completa

> **RECAP**: Questo file documenta il sistema di colori e stili dell'applicazione. Spiega come usare la palette armonizzata, i token semantici per light/dark mode, e le best practices per mantenere coerenza cromatica. Consultalo quando devi scegliere colori, customizzare temi, o capire come funziona il sistema di design.

---

## 📋 Indice

- [Panoramica](#panoramica)
- [Struttura File](#struttura-file)
- [Palette Colori](#palette-colori)
  - [Colori Brand (Turquoise)](#colori-brand-turquoise)
  - [Colori Funzionali](#colori-funzionali)
  - [Grays (Neutri)](#grays-neutri)
- [Utilizzo Colori](#utilizzo-colori)
  - [Token Semantici](#token-semantici)
  - [Token Disponibili](#token-disponibili)
  - [Esempi Pratici](#esempi-pratici)
- [Dark Mode](#dark-mode)
  - [Attivazione](#attivazione)
  - [Token Automatici](#token-automatici)
  - [Logica Hover](#logica-hover)
- [Best Practices](#best-practices)
- [FAQ](#faq)
- [Supporto](#supporto)

---

## 🎨 Panoramica

Il nostro design system è basato su:
- **Tailwind CSS v4** - Utility-first framework
- **shadcn/ui** - Componenti headless customizzabili
- **Palette armonizzata** - Generata con [Harmonizer](https://harmonizer.evilmartians.com/)
- **OKLCH** - Spazio colore moderno per accessibilità garantita

### Obiettivi
- ✅ Coerenza cromatica in tutta l'app
- ✅ Contrasti WCAG 2.2 Level AA
- ✅ Dark mode first-class
- ✅ Manutenibilità e scalabilità

[↑ Torna all'indice](#-indice)

---

## 📁 Struttura File

```
root/
└── styles/
    ├── README.md                    ← Questo file
    ├── globals.css                  ← Import principale + token semantici
    ├── harmonized-palette.css       ← Palette base (NON modificare)
    └── ...altri file custom
```

### Ordine di Import

```css
/* globals.css */
@import 'tailwindcss';
@import './harmonized-palette.css';  /* 1. Palette base */

/* 2. Variabili semantiche per temi */
:root { ... }
.dark { ... }

/* 3. Mappatura per Tailwind */
@theme { ... }

/* 4. Base layer */
@layer base { ... }
```

[↑ Torna all'indice](#-indice)

---

## 🎨 Palette Colori

### Colori Brand (Turquoise)

Colore principale dell'applicazione, usato per azioni primarie e brand identity.

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `turquoise-100` | `oklch(0.97 0.03 185)` | - | Sfondi hover leggeri |
| `turquoise-600` | `oklch(0.62 0.15 185)` | - | Primary light mode |
| `turquoise-500` | `oklch(0.74 0.18 185)` | - | Primary dark mode |
| `turquoise-700` | `oklch(0.56 0.13 185)` | - | Hover light mode |

[↑ Torna all'indice](#-indice)

### Colori Funzionali

#### Coral (Warning/Destructive)
Usato per azioni pericolose, alert, errori.

```css
--coral-600: oklch(0.67 0.28 25);   /* Light mode */
--coral-500: oklch(0.78 0.16 25);   /* Dark mode */
```

#### Green (Success)
Usato per conferme, successi, stati positivi.

```css
--green-600: oklch(0.62 0.26 145);  /* Light mode */
--green-500: oklch(0.73 0.31 145);  /* Dark mode */
```

#### Turmeric (Secondary)
Colore secondario, usato per evidenziare info secondarie.

```css
--turmeric-600: oklch(0.64 0.16 105);  /* Light mode */
--turmeric-500: oklch(0.76 0.19 105);  /* Dark mode */
```

#### Azure (Accent)
Usato per hover states, highlight, elementi interattivi.

```css
--azure-600: oklch(0.63 0.16 225);  /* Light mode */
--azure-500: oklch(0.75 0.19 225);  /* Dark mode */
```

[↑ Torna all'indice](#-indice)

### Grays (Neutri)

```css
--gray-50:  oklch(0.95 0 0);  /* Quasi bianco */
--gray-100: oklch(0.9 0 0);   /* Bordi light */
--gray-200: oklch(0.85 0 0);  /* Bordi, input */
--gray-400: oklch(0.65 0 0);  /* Testo secondario */
--gray-500: oklch(0.55 0 0);  /* Testo disabilitato */
--gray-700: oklch(0.35 0 0);  /* Bordi dark */
--gray-800: oklch(0.25 0 0);  /* Superfici dark */
--gray-900: oklch(0.15 0 0);  /* Testo principale light */
```

[↑ Torna all'indice](#-indice)

---

## 🔧 Utilizzo Colori

### Token Semantici

**NON usare direttamente i colori della palette!**  
Usa invece i token semantici definiti in `global.css`.

#### ❌ SBAGLIATO
```tsx
<div className="bg-turquoise-600 text-white">
  Bottone primario
</div>
```

#### ✅ CORRETTO
```tsx
<div className="bg-primary text-primary-foreground">
  Bottone primario
</div>
```

[↑ Torna all'indice](#-indice)

### Token Disponibili

#### Background & Foreground
```tsx
bg-background        /* Sfondo principale app */
bg-background-sec    /* Sfondo card, superfici */
text-foreground      /* Testo principale */
```

#### Colori Funzionali
```tsx
/* Primary (Turquoise) */
bg-primary
hover:bg-primary-hover
text-primary-foreground

/* Secondary (Turmeric) */
bg-secondary
hover:bg-secondary-hover
text-secondary-foreground

/* Success (Green) */
bg-success
hover:bg-success-hover

/* Warning (Coral) */
bg-warning
hover:bg-warning-hover

/* Accent (Azure) */
bg-accent
hover:bg-accent-hover
text-accent-foreground

/* Destructive (Coral) */
bg-destructive
hover:bg-destructive-hover
text-destructive-foreground
```

#### Utility
```tsx
border-border        /* Bordi generici */
bg-muted            /* Sfondi disabilitati */
text-muted-foreground  /* Testo secondario */
ring-ring           /* Focus outline */
```

[↑ Torna all'indice](#-indice)

### Esempi Pratici

#### Button Primario
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary-hover">
  Prenota Appuntamento
</button>
```

#### Alert Successo
```tsx
<div className="bg-success text-white p-4 rounded-lg">
  Appuntamento confermato!
</div>
```

#### Card con Bordo
```tsx
<div className="bg-background-sec border border-border rounded-lg p-6">
  Contenuto card
</div>
```

[↑ Torna all'indice](#-indice)

---

## 🌓 Dark Mode

### Attivazione

Il dark mode si attiva automaticamente aggiungendo la classe `.dark` al root:

```tsx
// layout.tsx o root component
<html className={isDark ? 'dark' : ''}>
  <body>
    {children}
  </body>
</html>
```

[↑ Torna all'indice](#-indice)

### Token Automatici

Tutti i token semantici si adattano automaticamente:

| Token | Light | Dark |
|-------|-------|------|
| `--background` | `#efefef` | `#171717` |
| `--background-sec` | `#ffffff` | `#272727` |
| `--foreground` | `#171717` | `#ffffff` |
| `--primary` | `turquoise-600` | `turquoise-500` |
| `--primary-hover` | `turquoise-700` | `turquoise-400` |

**Non devi fare nulla!** I colori cambiano automaticamente.

[↑ Torna all'indice](#-indice)

### Logica Hover

- **Light mode**: 600 → 700 (più scuro)
- **Dark mode**: 500 → 400 (più chiaro)

Questo garantisce contrasto ottimale in entrambi i temi.

[↑ Torna all'indice](#-indice)

---

## ✅ Best Practices

### 1. Usa Sempre Token Semantici

```tsx
❌ <div className="bg-[#00968a]">
❌ <div className="bg-turquoise-600">
✅ <div className="bg-primary">
```

**Perché?**
- Manutenibilità: cambi il colore in un solo posto
- Dark mode automatico
- Coerenza garantita

### 2. Non Hardcodare Colori

```tsx
❌ <div style={{ backgroundColor: '#00968a' }}>
✅ <div className="bg-primary">
```

### 3. Rispetta la Gerarchia Semantica

```tsx
/* Azioni principali */
bg-primary          → Prenota, Conferma, Salva

/* Azioni secondarie */
bg-secondary        → Annulla, Indietro, Opzioni

/* Azioni pericolose */
bg-destructive      → Elimina, Cancella, Rimuovi

/* Successi */
bg-success          → Completato, Confermato

/* Warning */
bg-warning          → Attenzione, Verifica
```

### 4. Usa Hover Espliciti

```tsx
❌ <button className="bg-primary hover:bg-primary/90">
✅ <button className="bg-primary hover:bg-primary-hover">
```

**Perché?**
- Controllo cromatico preciso
- Progressione coerente (600→700)
- No opacità generiche

### 5. Testa Sempre in Dark Mode

Ogni componente deve essere leggibile e accessibile in entrambi i temi.

```bash
# Toggle dark mode durante sviluppo
<html className="dark">  <!-- Forza dark mode -->
```

[↑ Torna all'indice](#-indice)

---

## 🎯 FAQ

### Come aggiungo un nuovo colore?

1. **NON modificare** `harmonized-palette.css`
2. Definisci un nuovo token semantico in `globals.css`:

```css
:root {
  --myNewColor-bg: var(--neon-600);      /* Light */
  --myNewColor-hover: var(--neon-700);
}

.dark {
  --myNewColor-bg: var(--neon-500);      /* Dark */
  --myNewColor-hover: var(--neon-400);
}
```

3. Mappalo in `@theme`:

```css
@theme {
  --color-myNewColor: var(--myNewColor-bg);
  --color-myNewColor-hover: var(--myNewColor-hover);
}
```

4. Usalo:

```tsx
<div className="bg-myNewColor hover:bg-myNewColor-hover">
```

### Posso usare colori custom per un caso specifico?

Sì, ma solo per casi eccezionali:

```tsx
<div className="bg-[#custom-hex]">  {/* OK per casi una-tantum */}
```

Preferibilmente, aggiungi un token semantico se il colore verrà riusato.

### Come verifico i contrasti?

Usa il [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):

- **Testo normale**: minimo 4.5:1
- **Testo grande (18px+)**: minimo 3:1

Tutti i nostri token rispettano WCAG AA.

[↑ Torna all'indice](#-indice)

---

## 📞 Supporto

Per domande sul design system:
- Consulta `components/shadcn/ui/CUSTOMIZATION_GUIDE.md` per shadcn
- Consulta `docs/DESIGN_SYSTEM.md` per panoramica completa
- Contatta il team design

[↑ Torna all'indice](#-indice)

---

**Ultima modifica**: Gennaio 2026  
**Versione**: 1.0.0