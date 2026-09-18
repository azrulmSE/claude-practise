# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## 2026-09-18

### Changed
- Ignore local Claude config dir (`/.claude/`) in `.gitignore` (`202eead`)

## 2026-09-13

### Added
- Login page at `/login` under new `(auth)` route group, w/ split layout (form + showcase illustration) (`0dcc0fc`)
- `login` server action w/ Zod validation, generic invalid-credentials error, and email preserved on failure
- Stub credential check (`src/lib/auth-stub.ts`, server-only) for demo user — no real session yet
- Marketing landing page under `(marketing)` route group: hero, features, product tour, pricing, FAQ, site header/footer
- Motion helpers (`Reveal`, `Stagger`) + shared motion presets (`src/lib/motion.ts`)
- shadcn/ui primitives: accordion, badge, button, card, checkbox, input, label, tabs
- `Logo` component
- `DESIGN.md` design guidelines and `task/20260911_task.md` task spec
- Deps: `motion`, `radix-ui`, `shadcn`, `lucide-react`, `class-variance-authority`, `zod`, `server-only`, `tw-animate-css`, `cn`

### Changed
- `globals.css` expanded w/ theme tokens for shadcn
- Root `layout.tsx` updated

### Removed
- Default Create Next App `src/app/page.tsx` (replaced by `(marketing)/page.tsx`)

### Known limitations
- No session/cookie creation after login; `remember` flag parsed but unused (TODO)
- Auth stub uses hardcoded demo creds — replace w/ real provider before release

## 2026-09-11

### Added
- Initial project scaffold from Create Next App (Next.js, TypeScript, Tailwind, ESLint, Bun) (`caacc26`)
