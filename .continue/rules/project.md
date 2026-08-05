<!-- AUTO-GENERATED from AGENTS.md — do not edit directly.
     Run `bash scripts/sync-agent-rules.sh` to regenerate. -->

---
description: Project conventions for AI Website Clone Template
alwaysApply: true
---
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Site Template — Jamie Tian pilot

## What This Is
A reusable solo-agent real estate website, forked from the RealiFi Realty
brokerage site. One codebase, config-driven: every agent-specific fact lives
in `src/config/agent.ts` plus env vars. To spin up a site for a new agent,
edit that one file, swap the assets in `public/images/agent/`, set env vars,
deploy. **No other source file should hard-code the agent's identity.**

Full architecture and reuse playbook: `docs/agent-site-template-plan.md`.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4, framer-motion, custom `rf-*` utility classes in `globals.css`
- **Data:** Trestle (CoreLogic) RESO Web API in `src/lib/trestle.ts` — office-scoped queries narrowed in memory to the agent's DRE license digits
- **Email:** Resend via `src/lib/alert-email.ts` (contact-form leads only)
- **Deployment:** Vercel

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Architecture Rules
- `src/config/agent.ts` is the single source of truth for identity, stats,
  markets, brokerage compliance info, and branding. `src/lib/constants.ts`
  derives `SITE` from it; components read `SITE`/`AGENT`, never literals.
- MLS scoping: `getActiveListings` keeps only the agent's list side;
  `getSoldProperties` keeps closings where the agent held either side
  (representation seller/buyer/both). Matching is by DRE digits via
  `licenseDigits()` — never server-side license string equality.
- Compliance: every page footer must show the agent's name + DRE and the
  responsible broker's name + DRE (CA DRE requirement). Don't remove it.
- When no logo is configured, header/footer render the agent name as a text
  wordmark.
- Static data in `src/data/listings.ts` / `sold-properties.ts` is dev/demo
  fallback only (used when Trestle credentials are absent).

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes, no inline styles
- 2-space indentation; mobile-first responsive

## Notes
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` to
  regenerate platform-specific instruction files.
