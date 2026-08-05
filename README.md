# Jamie Tian — Agent Site (Agent Site Template)

The personal real estate website of **Jamie Tian** (Realtor® | Broker-Owner,
DRE #01920120) — and the pilot of a reusable **solo-agent website template**
built on the RealiFi Realty site foundation.

Live MLS-backed listings and sold history (Trestle/CoreLogic RESO API),
scoped to a single agent by DRE. Next.js 16 App Router, React 19,
Tailwind v4, framer-motion.

## The template idea

One codebase, config-driven. Everything agent-specific lives in:

- **`src/config/agent.ts`** — identity, DRE, stats, markets, credentials,
  brokerage compliance info, socials, branding
- **`public/images/agent/`** — headshot + OG image
- **Env vars** — MLS credentials and lead-email routing (see `.env.example`)

To spin up a site for another agent: use GitHub's **Use this template**,
edit `agent.config.ts`, swap the two images, create a Vercel project, paste
env vars, point the domain. ~30 minutes; no code changes.

Full architecture, page map, SEO strategy, and per-agent deploy playbook:
[`docs/agent-site-template-plan.md`](docs/agent-site-template-plan.md).

## Develop

```bash
npm install
npm run dev
```

Without Trestle credentials the site renders static sample data. Copy
`.env.example` to `.env.local` and fill in credentials for live MLS data.

Quality gate:

```bash
npm run check   # lint + typecheck + build
```

## Data scoping

Queries hit the brokerage's office-scoped Trestle feed (the proven
server-side filter), then narrow **in memory** to the agent by DRE license
digits — feed license formatting varies, so digit-normalized matching beats
server-side string equality:

- **Actives:** agent on the list side
- **Solds (36-month lookback):** agent on the list side, buyer side, or both
  (double-ended), with representation labeled on each property

## Compliance

Every page footer shows the agent's license and the responsible broker
(RealiFi Realty, Inc. — DRE #02210728) per CA DRE display rules, plus the
MLS information disclaimer and Equal Housing Opportunity notice. Keep them.
