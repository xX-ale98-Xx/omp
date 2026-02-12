# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OhMyPhysio (OMP) — a physiotherapy management web application built with Next.js 15 App Router, React 19, TypeScript, Supabase, and shadcn/ui. Deployed on **Vercel**.

## Commands

```bash
pnpm dev              # Dev server with Turbopack
pnpm build            # Production build with Turbopack
pnpm start            # Start production server
pnpm lint             # ESLint (v9 flat config)
pnpm format:write     # Prettier format all files
pnpm format:check     # Check formatting
```

Package manager is **pnpm**. No test framework is configured. No CI/CD pipeline exists yet.

## Key Libraries

| Library | Purpose | Used in |
|---|---|---|
| `@supabase/ssr` + `@supabase/supabase-js` | Auth & database | Auth flow, middleware, data access |
| `zod` | Schema validation | Server actions (form validation) |
| `next-themes` | Dark/light mode | Theme provider, toggle button |
| `sonner` | Toast notifications | Patient detail sections (save/delete feedback) |
| `@tanstack/react-table` | Data tables | Dashboard block (`dashboard-01`) |
| `@dnd-kit/*` | Drag-and-drop | Dashboard block (`dashboard-01`) |
| `recharts` | Charts | Dashboard block (`dashboard-01`) |
| `date-fns` | Date formatting/locale | DatePickerField (Italian locale) |
| `vaul` | Drawer component | shadcn drawer primitive |
| `lucide-react` | Icons (primary) | Throughout the app |
| `@heroicons/react`, `@tabler/icons-react`, `react-icons` | Icons (secondary) | Various components |

> **Note**: Prisma (`@prisma/client`, `prisma`) and `@auth/prisma-adapter` are installed but **not configured** — no schema exists. They can be removed or set up when needed.

## Project Structure

```
omp-app/
├── .claude/
│   └── plans/                        # Saved plans for crash recovery (see Planning Rules)
│       └── claude_plan.txt           # Current/latest plan
│
├── app/                              # Next.js App Router
│   ├── (dashboard)/                  # Route group with sidebar layout (DEPRECATED)
│   │   ├── account/                  # Account page
│   │   ├── home/                     # Home page
│   │   ├── prova/                    # Component catalog (dev-only)
│   │   └── layout.tsx                # Dashboard layout (sidebar + content)
│   ├── auth/
│   │   └── confirm/route.ts          # Auth callback (email verify, OAuth)
│   ├── dashboard/                    # Main dashboard area (shadcn block layout)
│   │   ├── layout.tsx                # Dashboard layout (sticky header + sidebar)
│   │   ├── page.tsx                  # Dashboard home
│   │   ├── data.json                 # Dashboard mock data
│   │   ├── pazienti/                 # Patient management
│   │   │   ├── page.tsx              # Patient list (search + grid)
│   │   │   ├── nuovo/page.tsx        # New patient form (anagrafica)
│   │   │   └── [id]/
│   │   │       ├── page.tsx          # Patient detail (server → shell)
│   │   │       └── loading.tsx       # Skeleton loading state
│   │   ├── agenda/page.tsx           # Stub — In arrivo
│   │   ├── cartella-clinica/page.tsx # Stub — In arrivo
│   │   ├── teleriabilitazione/page.tsx # Stub — In arrivo
│   │   ├── fatturazione/page.tsx     # Stub — In arrivo
│   │   ├── analytics/page.tsx        # Stub — In arrivo
│   │   ├── marketplace/page.tsx      # Stub — In arrivo
│   │   ├── formazione/page.tsx       # Stub — In arrivo
│   │   └── impostazioni/page.tsx     # Stub — In arrivo
│   ├── error/                        # Error pages
│   ├── landing/                      # Landing page (full implementation)
│   ├── login/                        # Login page
│   ├── signup/                       # Signup page
│   ├── layout.tsx                    # Root layout (theme provider)
│   └── page.tsx                      # Root page (auth redirect → /dashboard or /landing)
│
├── components/
│   ├── pazienti/                     # Patient feature components
│   │   ├── patient-detail-shell.tsx  # Main client shell (tabs + state management)
│   │   ├── patient-header.tsx        # Avatar (editable), name, age, contacts, sport toggle
│   │   ├── forms/
│   │   │   ├── anagrafica-form.tsx   # New patient form (create)
│   │   │   └── date-picker-field.tsx # Reusable DatePicker with Italian locale
│   │   └── sections/                 # Patient detail tab sections (all have view/edit mode)
│   │       ├── anagrafica-section.tsx
│   │       ├── stile-vita-section.tsx
│   │       ├── sportivo-section.tsx
│   │       ├── test-fisici-section.tsx
│   │       ├── anamnesi-generale-section.tsx
│   │       ├── anamnesi-specifica-section.tsx  # NRS pain slider (0-10, color-coded)
│   │       ├── referti-section.tsx              # Medical reports list
│   │       ├── referto-card.tsx                 # Expandable report card
│   │       └── referto-form-dialog.tsx          # Add/edit report dialog
│   ├── dashboard/                    # Old dashboard components (DEPRECATED, see (dashboard) group)
│   ├── landing/                      # Landing page section components (10 sections)
│   ├── dark-light/                   # Theme toggle
│   │   └── ThemeToggleButton.tsx
│   └── shadcn/
│       ├── blocks/                   # shadcn page templates
│       │   ├── dashboard-01/components/  # Dashboard block components (sidebar, header)
│       │   ├── login-03/components/      # Login form block
│       │   └── signup-03/components/     # Signup form block
│       └── ui/                       # shadcn UI primitives
│
├── hooks/
│   └── use-mobile.ts                 # Mobile breakpoint hook
│
├── lib/
│   ├── utils.ts                      # cn() utility (clsx + tailwind-merge)
│   └── mock-patients.ts             # Mock patient data (6 patients, 2 fully populated)
│
├── types/
│   └── patient.ts                    # Patient TypeScript types (7 categories + Patient)
│
├── providers/
│   └── theme-provider.tsx            # next-themes wrapper
│
├── public/                           # Static assets
│   └── OMP_logo.svg                  # App logo
│
├── styles/
│   ├── globals.css                   # Main styles + semantic tokens + @theme (light/dark)
│   ├── harmonized-palette.css        # OKLCH color palette (immutable source of truth)
│   └── autofillFix.css               # Browser autofill styling fix
│
├── utils/
│   ├── actions/
│   │   ├── actions.tsx               # Server actions (login, signup, Google OAuth, logout)
│   │   └── patient-actions.ts        # Patient server actions (mock)
│   ├── supabase/
│   │   ├── client.ts                 # Supabase browser client
│   │   ├── server.ts                 # Supabase server client
│   │   └── middleware.ts             # Auth session management
│   └── ui/fonts.ts                   # Google Fonts (Inter, Lusitana)
│
├── components.json                    # shadcn/ui CLI configuration
├── middleware.ts                      # Next.js middleware (auth protection)
└── .env                               # Environment variables (gitignored)
```

## Architecture

### Routing & Layouts

- **Next.js App Router** (`app/` directory) with Server Components by default
- **Root page** (`/`) is a server component that checks authentication: authenticated users → `/dashboard`, unauthenticated → `/landing`
- **`/dashboard`** is the main area with a sticky header, collapsible sidebar, and all app pages
- Dashboard layout: `SidebarProvider` → `AppSidebar` (collapsible) + `SidebarInset` (scrollable content area with sticky `SiteHeader`)
- `(dashboard)` route group is **deprecated** — being replaced by `/dashboard` routes
- `/login` and `/signup` are the auth pages (shadcn-based)
- All sidebar links now have corresponding pages (8 stubs + pazienti + dashboard home)

### Patient Detail Architecture

The patient detail page (`/dashboard/pazienti/[id]`) follows this pattern:

```
page.tsx (Server Component)
  └── Fetches patient from mock data, passes to client shell
      └── PatientDetailShell (Client Component)
          ├── Breadcrumb: Dashboard > Pazienti > [Nome]
          ├── PatientHeader: avatar (editable), info, sport toggle
          └── Tabs (7 sections, "Sportivo" conditional)
              ├── AnagraficaSection
              ├── StileVitaSection
              ├── SportivoSection (only if isSportivo)
              ├── TestFisiciSection
              ├── AnamnesiGeneraleSection
              ├── AnamnesiSpecificaSection (NRS pain slider)
              └── RefertiSection (card list + dialog)
```

**Section View/Edit Pattern** (used by all 7 sections):
```tsx
// Each section manages its own view/edit state
const [isEditing, setIsEditing] = useState(false)

// View mode: formatted data in grid, "Modifica" button
// Edit mode: form with controlled inputs, "Salva" / "Annulla" buttons
// On save: calls onSave(data), shows toast.success(), returns to view
```

**Patient types** (`types/patient.ts`):
- `Anagrafica`, `StileVita`, `PazienteSportivo`, `TestFisici`
- `AnamnesiGenerale`, `AnamnesiSpecifica`, `RefertoMedico`
- `Patient` (aggregate with all sections + `isSportivo` flag)

**Mock data** (`lib/mock-patients.ts`):
- 6 patients total. p1 (Marco Rossi) and p2 (Laura Bianchi) have all sections fully populated with realistic clinical data and medical reports. Others have only anagrafica.

### Authentication

- **Supabase Auth** with `@supabase/ssr` for cookie-based session management
- Middleware (`middleware.ts` → `utils/supabase/middleware.ts`) protects all routes, redirecting unauthenticated users to `/login` and authenticated users away from `/login` and `/signup`
- Public routes: `/`, `/login`, `/signup`, `/auth`, `/error`, `/landing`
- Auth mutations use **Server Actions** in `utils/actions/actions.tsx` (login, signup, Google OAuth, logout)
- Auth callback flow: `/auth/confirm/route.ts` handles email verification and OAuth code exchange, with open-redirect protection via `sanitizeRedirectPath()`
- Supabase has a `profiles` table with a trigger that auto-creates a profile on user signup

### Database

- **Supabase PostgreSQL** accessed via Supabase client (not Prisma)
- Server-side client: `utils/supabase/server.ts`; browser client: `utils/supabase/client.ts`
- Database schema is evolving — currently only the `profiles` table is in use
- Patient data is **entirely mock** for now — no database tables exist yet

### Form & Error Handling Patterns

Forms use React 19's `useActionState` hook with Server Actions:

```tsx
// Pattern: useActionState + Server Action + Zod validation
const [state, formAction, pending] = useActionState(login, initialState)

<form action={formAction}>
  <Input name="email" />
  {state.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
  <Button type="submit" disabled={pending}>
    {pending && <Spinner />}
    Login
  </Button>
</form>
```

**Server action return shape** (follow this pattern for new actions):
```tsx
type ActionState = {
  errors?: { [field: string]: string[] }  // Field-level validation errors (from Zod)
  message?: string | null                  // General error/success message
  success?: boolean | null                 // Outcome flag (used in signup)
}
```

- **Validation**: Zod schemas validate form input server-side; field errors are returned and displayed inline
- **Loading**: `pending` from `useActionState` disables the submit button and shows a spinner
- **Success**: redirect via `redirect()` (login) or return success state (signup)
- **Toast notifications**: `sonner` is actively used in patient sections for save/delete/update feedback

### UI Components & Design System

- **shadcn/ui** components live in `components/shadcn/ui/` — these are owned code, freely modifiable
- **Installed shadcn components**: accordion, badge, button, calendar, card, checkbox, dialog, field, input, popover, progress, radio-group, select, separator, skeleton, slider, spinner, switch, tabs, textarea (+ many more)
- **shadcn blocks** (page templates) in `components/shadcn/blocks/` (dashboard-01, login-03, signup-03)
- **shadcn CLI config**: `components.json` — style: `new-york`, aliases point ui to `@/components/shadcn/ui`, blocks to `@/components/shadcn/blocks`
- Custom components in `components/pazienti/`, `components/dark-light/`, `components/landing/`
- Built on Radix UI primitives, styled with **Tailwind CSS v4**, variants via CVA (Class Variance Authority)
- Tailwind v4 has **no `tailwind.config.ts`** — configuration is done via the `@theme` directive in `styles/globals.css`
- `cn()` utility from `lib/utils.ts` for class merging (clsx + tailwind-merge)
- **Tabs**: modified to use `text-primary` / `bg-primary` for active state (not default foreground)

### Design System Color Architecture

```
harmonized-palette.css  →  globals.css              →  Tailwind classes
(OKLCH base colors)       (semantic tokens + @theme)   (bg-primary, text-foreground, etc.)
```

- `styles/harmonized-palette.css` is the **immutable** source of truth for base colors (OKLCH)
- `styles/globals.css` maps base colors to semantic tokens (`--primary`, `--background`, `--card`, etc.) with light/dark variants, and maps them to Tailwind via `@theme`
- Custom semantic tokens: `--myPrimary`, `--mySecondary`, `--mySuccess`, `--myWarning`, `--myAccent`
- Always use semantic Tailwind classes (`bg-primary`, `text-muted-foreground`), never raw palette values

## Environment Variables

All env vars are in `.env` (gitignored). There is no `.env.example` file yet.

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Client + Server | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Supabase admin key (never expose to client) |
| `SUPABASE_JWT_SECRET` | Server only | JWT verification secret |
| `NEXT_PUBLIC_SITE_URL` | Client + Server | App base URL (e.g. `http://localhost:3000`) |
| `AUTH_SECRET` | Server only | Auth.js secret (added by `npx auth`, not actively used) |
| `POSTGRES_*` | Server only | Direct Postgres connection strings (for future Prisma use) |

> **Note**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` also exists in `.env` as a duplicate of `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Only `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is used in code.

## Key Conventions

- **Language**: all user-facing text (labels, validation messages, toasts, placeholders) must be in **Italian**. Code identifiers and comments can be in either language.
- **Server Actions over API routes** — use `'use server'` functions for mutations, don't create API routes
- **Import alias**: `@/*` maps to project root
- **Code style** (Prettier): single quotes, no semicolons, 100 char width, trailing commas (ES5), Tailwind class sorting (`prettier-plugin-tailwindcss`)
- **Theme**: dark/light mode via `next-themes`, toggled with `ThemeToggleButton` (lucide Sun/Moon icons, 2-state, rotate+fade animation)
- **Validation**: Zod schemas for form input validation in server actions
- **Icons**: `lucide-react` is the primary icon library (also has heroicons, tabler, react-icons installed)
- **Toast**: use `sonner` (`toast.success()`, `toast.error()`) for user feedback on mutations


## Development Rules for Claude Code

These rules guide how new code should be written in this repository. The goal is to keep the MVP maintainable, secure, and consistent without over-engineering.

---

### Planning Rules (MANDATORY)

**This rule is MANDATORY and must ALWAYS be followed without exception.**

Whenever Claude creates or receives a multi-step implementation plan:

1. **ALWAYS save the plan** to a file in `.claude/plans/` before starting execution
2. Use a descriptive filename (e.g., `patient-forms-plan.txt`, `auth-refactor-plan.txt`)
3. The plan file must include:
   - Clear objective
   - Numbered phases/steps
   - Files to create/modify per phase
   - A progress tracker (`[ ]` / `[x]`) at the bottom
4. **Update the progress tracker** after completing each phase
5. If a session crashes or is interrupted, the plan file allows resuming from where work stopped

**Why**: sessions can crash at any time. Without a saved plan, all context is lost and work must be re-planned from scratch. This wastes significant time.

Plan files location: `.claude/plans/`

---

### UI Component Rules (shadcn First)

- When creating new UI, ALWAYS try to build using existing **shadcn/ui components** located in `components/shadcn/ui`.
- Before creating any new custom component, ALWAYS check the **official shadcn/ui component library online** to see if a suitable component already exists but is not yet installed in the project.
- If a matching component exists in the official shadcn registry, install it via the shadcn CLI instead of building a custom solution.
- Do NOT create new base UI primitives (Button, Input, Modal, Dropdown, Card, etc.) if a shadcn equivalent exists either locally **or in the official shadcn library online**.
- Prefer **composition of existing shadcn components** over creating new ones.
- Only create a new custom UI component if:
  1. No suitable shadcn component exists locally
  2. No suitable component exists in the official shadcn library
  In this case, clearly explain why before introducing it.
- Follow the existing design system and always use **semantic Tailwind classes** (e.g. `bg-primary`, `text-muted-foreground`), never raw color values.

**Goal:** keep the UI consistent, leverage the shadcn ecosystem as much as possible, and avoid unnecessary custom components that increase long-term maintenance cost.

---

### Section View/Edit Pattern (Patient Detail)

When creating new patient sections, follow the established pattern:

```tsx
// 1. InfoRow helper for view mode
function InfoRow({ label, value }: { label: string; value: string }) { ... }

// 2. View component: Card with formatted data + "Modifica" button
function SectionView({ data, onEdit }) { ... }

// 3. Edit component: Card with controlled form + "Salva" / "Annulla"
function SectionEdit({ data, onSave, onCancel }) {
  const [form, setForm] = useState({ ...data })
  // Use appropriate inputs: RadioGroup (≤4 opts), Select (>4), Slider (0-10), Switch (boolean)
}

// 4. Main component: manages isEditing state + toast on save
export function Section({ data, onSave }) { ... }
```

---

### Security Rules (Mandatory Double-Check)

Whenever writing or modifying code that touches:
- authentication or authorization
- sessions or cookies
- database queries
- server actions
- user input or form handling

Claude must perform a **security double-check** before finalizing the solution.

Security expectations:
- Always validate and sanitize user input using **Zod** on the server
- Never rely solely on client-side validation for security decisions
- Ensure sensitive logic runs only on the server
- Prevent common vulnerabilities (injection, broken access control, privilege escalation)
- Never expose secrets, service keys, or internal security logic to the client

**Goal:** avoid introducing security regressions as the app grows.

---

### Testing Rules (MVP-Aware)

We are currently in **MVP phase**, so testing should be **prioritized strategically**, not blindly.

#### Tests are REQUIRED for:
- Business logic
- Data validation and transformation logic
- Security-related logic
- Utility functions with non-trivial behavior

#### Tests are OPTIONAL (if time allows) for:
- Complex custom React hooks
- Non-trivial state management

#### Tests are NOT a priority yet for:
- Pure presentational UI components
- Layout wrappers
- Static or marketing pages

When writing tests:
- Cover normal usage and important edge cases
- Prefer meaningful protection over artificial 100% coverage

**Goal:** protect critical logic without slowing down MVP iteration speed.

## Tech Debt

Items marked for cleanup or completion:

| Item | Status | Notes |
|---|---|---|
| `app/(dashboard)/prova/` | Dev-only | Component catalog page; evaluate whether to keep or remove |
| `(dashboard)` route group | Deprecated | `components/dashboard/`, `app/(dashboard)/` — being replaced by `/dashboard` routes |
| Prisma packages | Installed, unused | `@prisma/client`, `@auth/prisma-adapter`, `prisma` — no schema configured |
| `@supabase/auth-helpers-react`, `@supabase/auth-ui-react` | Likely unused | Old Supabase auth packages, superseded by `@supabase/ssr` |
| No `.env.example` | Missing | Should be created for onboarding |
| Patient data mock-only | No backend | All patient data in `lib/mock-patients.ts` — needs Supabase tables |
| `styles/theme.css` | Orphaned | Not imported anywhere, references undefined vars |

## Security

- **Security headers** configured in `next.config.ts`: CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- `poweredByHeader: false` in Next.js config
- **Open redirect protection** in `/auth/confirm` via `sanitizeRedirectPath()` (decoding, backslash normalization, protocol-relative URL blocking, control char stripping)
- **CSRF protection**: all mutations use Server Actions (built-in CSRF tokens), no unprotected route handlers
- **Reverse auth guard**: middleware redirects authenticated users away from `/login` and `/signup`

## Deployment

- **Hosting**: Vercel
- **No CI/CD pipeline** configured (no GitHub Actions, no `vercel.json`)
- **No Docker** setup
