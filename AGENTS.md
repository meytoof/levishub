# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server with Turbopack (http://localhost:3000)
npm run build        # prisma generate + next build
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript check (no test suite exists)
```

If the dev server crashes with `routesManifest.dataRoutes is not iterable`, delete `.next/` and restart.

CSS `@import` rules (e.g. fonts) must be placed **before** `@import "tailwindcss"` in `globals.css` — Tailwind v4 expands inline and pushes any later `@import` past real rules, which is invalid CSS.

## Architecture

### Route groups

| Group | Path | Auth | Purpose |
|---|---|---|---|
| `(marketing)` | `/`, `/services`, `/pricing`, `/contact`, etc. | Public | Agency website |
| `(auth)` | `/login`, `/register` | Public | NextAuth credentials flow |
| `(client)` | `/dashboard` | `CLIENT` role | Client backoffice |
| `admin` | `/admin/*` | `ADMIN` role | Admin backoffice |
| `demo` | `/demo/*` | Public | Demo site showcases |

### Two completely separate design systems

**Marketing** (`(marketing)/`) — Tailwind CSS + Motion/GSAP animations, dual light/dark theme via `next-themes`. The theme toggle is surfaced in the navbar.

**Backoffice** (`admin/` + `(client)/`) — custom CSS in `src/components/ui/backoffice/backoffice-dark.css`, always dark. Layout component: `BackofficeLayoutDark.tsx`. **Never import Tailwind classes into backoffice pages, never import backoffice CSS into marketing pages.**

### Authentication

NextAuth v4, JWT strategy, credentials provider only (`src/lib/auth.ts`). The session extends with `role: "ADMIN" | "CLIENT"` and `clientId?: string`. On login, ADMIN is redirected to `/admin`, CLIENT to `/dashboard`.

Client registration is invitation-only: admin creates an `Invitation` with a token → client receives email → hits `/register?token=...` → `RegisterClient.tsx` validates the token via `/api/invitations/validate` before allowing form submission.

### Multi-tenancy

Every client-facing query must be scoped by `session.user.clientId`. The `Client` model owns `User[]`, `Ticket[]`, `Invoice[]`, `Site[]`. Always check `session.user.role` and `session.user.clientId` in API routes.

### Database

Prisma ORM, PostgreSQL in production (SQLite referenced in older docs but the schema uses `provider = "postgresql"`). `prisma generate` runs automatically on `npm run build`. To apply schema changes in dev: `npx prisma migrate dev`.

### Animation stack

- **GSAP + ScrollTrigger** — pinning effects, scroll-driven timelines (services slides, hero parallax)
- **Motion (Framer Motion)** — component-level animations, AnimatePresence, spring physics
- **Lenis** — smooth scroll provider wrapping the marketing layout
- Components that use GSAP must be `"use client"` and register the plugin inside `useEffect` or at module level guarded by `typeof window !== "undefined"`

### Awwwards redesign branch (`feat/awwwards-redesign`)

Active branch with 8-phase redesign. Foundation components added:
- `src/components/ui/smooth-scroll-provider.tsx` — Lenis wrapper (used in marketing layout)
- `src/components/ui/text-cursor.tsx` — contextual text cursor, activated by `data-cursor="Voir"` etc. on any element
- `src/components/ui/grain-overlay.tsx` — SVG noise film grain overlay
- Clash Display loaded via `@import url('https://api.fontshare.com/v2/...')` at the top of `globals.css`; use class `font-display` for headings

### Key globals.css conventions

- Theme switching: `html.dark` selector (not CSS `prefers-color-scheme` alone) because `next-themes` applies the `.dark` class
- Dual-theme pattern: define base styles, then override with `html.dark .class-name { ... }`
- Design tokens live in `:root` block near the top (after `@import` statements)

### API route conventions

All API routes verify the session with `getServerSession(authOptions)`. Admin routes additionally check `session.user.role === "ADMIN"`. The Stripe webhook (`/api/stripe/webhook`) uses the raw body — do not add `bodyParser` to it.

### Email

Nodemailer via `src/lib/email.ts`. Triggered by: contact form (`/api/contact`), ticket status changes, invitation sends, password reset. Requires `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` env vars.

### Required env vars

```
DATABASE_URL          # PostgreSQL connection string
NEXTAUTH_URL          # Full URL (http://localhost:3000 in dev)
NEXTAUTH_SECRET       # Random secret
SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS
STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET / NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```
