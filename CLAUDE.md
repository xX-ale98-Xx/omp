# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OhMyPhysio (OMP) — a physiotherapy management web application built with Next.js 15 App Router, React 19, TypeScript, Supabase, and shadcn/ui.

## Commands

```bash
pnpm dev              # Dev server with Turbopack
pnpm build            # Production build with Turbopack
pnpm start            # Start production server
pnpm lint             # ESLint
pnpm format:write     # Prettier format all files
pnpm format:check     # Check formatting
```

Package manager is **pnpm**. No test framework is configured.

## Project Structure

```
omp-app/
├── app/                              # Next.js App Router
│   ├── (dashboard)/                  # Route group with sidebar layout
│   │   ├── account/                  # Account page
│   │   ├── home/                     # Home page
│   │   ├── prova/                    # Test page
│   │   └── layout.tsx                # Dashboard layout (sidebar + content)
│   ├── auth/
│   │   ├── confirm/route.ts          # Auth callback (email verify, OAuth)
│   │   └── signout/                  # Sign out route
│   ├── dashboard/                    # Standalone dashboard (shadcn block)
│   │   ├── page.tsx
│   │   └── data.json
│   ├── error/                        # Error pages
│   ├── landing/                      # Landing page
│   ├── login/                        # Login page (current)
│   ├── login_old/                    # Login page (deprecated)
│   ├── signup/                       # Signup page (current)
│   ├── signup_old/                   # Signup page (deprecated)
│   ├── layout.tsx                    # Root layout (theme provider)
│   └── page.tsx                      # Root page (landing)
│
├── components/
│   ├── authPages/                    # Legacy auth components (deprecated)
│   ├── dashboard/                    # Custom dashboard components
│   │   ├── dropdown.tsx
│   │   ├── header.tsx
│   │   ├── nav-links.tsx
│   │   └── sidenav.tsx
│   ├── dark-light/                   # Theme toggle
│   │   └── ThemeToggleButton.tsx
│   └── shadcn/
│       ├── blocks/                   # shadcn page templates
│       │   ├── dashboard-01/components/  # Dashboard block components
│       │   ├── login-03/components/      # Login form block
│       │   └── signup-03/components/     # Signup form block
│       └── ui/                       # shadcn UI primitives (button, card, input, etc.)
│
├── docs/
│   └── design_system.md              # Design system documentation
│
├── hooks/
│   └── use-mobile.ts                 # Mobile breakpoint hook
│
├── lib/
│   └── utils.ts                      # cn() utility
│
├── providers/
│   └── theme-provider.tsx            # next-themes wrapper
│
├── styles/
│   ├── globals.css                   # Main styles + semantic tokens
│   ├── harmonized-palette.css        # OKLCH color palette (immutable source of truth)
│   ├── autofillFix.css               # Browser autofill styling fix
│   └── theme.css
│
├── utils/
│   ├── actions/actions.tsx           # Server actions (login, signup, logout)
│   ├── supabase/
│   │   ├── client.ts                 # Supabase browser client
│   │   ├── server.ts                 # Supabase server client
│   │   └── middleware.ts             # Auth session management
│   └── ui/fonts.ts                   # Google Fonts (Inter, Lusitana)
│
├── middleware.ts                      # Next.js middleware (auth protection)
└── .env                               # Environment variables
```

## Architecture

### Routing & Layouts

- **Next.js App Router** (`app/` directory) with Server Components by default
- `(dashboard)` route group has its own layout with sidebar navigation
- `/dashboard` is a separate route using the shadcn dashboard-01 block template
- `/login` and `/signup` are the current auth pages (shadcn-based); `login_old/` and `signup_old/` are deprecated

### Authentication

- **Supabase Auth** with `@supabase/ssr` for cookie-based session management
- Middleware (`middleware.ts` → `utils/supabase/middleware.ts`) protects all routes, redirecting unauthenticated users to `/login`
- Public routes: `/login`, `/signup`, `/auth`, `/error`, `/landing`
- Auth mutations use **Server Actions** in `utils/actions/actions.tsx` (login, signup, Google OAuth, logout)
- Auth callback flow: `/auth/confirm/route.ts` handles email verification and OAuth code exchange
- Supabase has a `profiles` table with a trigger that auto-creates a profile on user signup

### Database

- **Supabase PostgreSQL** accessed via Supabase client (not Prisma — Prisma is installed but not configured with a schema)
- Server-side client: `utils/supabase/server.ts`; browser client: `utils/supabase/client.ts`
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (client-side), `SUPABASE_SERVICE_ROLE_KEY` (server-only)

### UI Components & Design System

- **shadcn/ui** components live in `components/shadcn/ui/` — these are owned code, freely modifiable
- **shadcn blocks** (page templates) in `components/shadcn/blocks/` (dashboard-01, login-03, signup-03)
- Custom components in `components/dashboard/`, `components/dark-light/`
- Built on Radix UI primitives, styled with Tailwind CSS v4, variants via CVA (Class Variance Authority)
- `cn()` utility from `lib/utils.ts` for class merging (clsx + tailwind-merge)

### Design System Color Architecture

```
harmonized-palette.css  →  globals.css  →  Tailwind classes
(OKLCH base colors)       (semantic tokens)   (bg-primary, text-foreground, etc.)
```

- `styles/harmonized-palette.css` is the **immutable** source of truth for base colors (OKLCH)
- `styles/globals.css` maps base colors to semantic tokens (`--primary`, `--background`, `--card`, etc.) with light/dark variants
- Custom semantic tokens: `--myPrimary`, `--mySecondary`, `--mySuccess`, `--myWarning`
- Always use semantic Tailwind classes (`bg-primary`, `text-muted-foreground`), never raw palette values
- Full design system documentation: `docs/design_system.md`
- Component customization guide: `components/shadcn/ui/customization_guide.md`

## Key Conventions

- **Server Actions over API routes** — use `'use server'` functions for mutations, don't create API routes
- **Import alias**: `@/*` maps to project root
- **Code style** (Prettier): single quotes, no semicolons, 100 char width, trailing commas (ES5)
- **Theme**: dark/light mode via `next-themes`, toggled with `ThemeToggleButton`
- **Validation**: Zod schemas for form input validation in server actions
- **Icons**: lucide-react is the primary icon library (also has heroicons, tabler, react-icons installed)
