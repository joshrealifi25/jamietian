# Agent Site Template — Plan (Jamie Tian pilot)

A reusable solo-agent website template built by forking the RealiFi Realty
brokerage site. One codebase, config-driven; each agent gets their own repo
(via GitHub's template feature), Vercel project, and domain. Jamie Tian is
the pilot.

## Why fork the brokerage site (not rebuild, not multi-tenant)

- **Fork, don't rebuild:** the brokerage site already has the hard parts —
  the Trestle/RESO data layer with all its CRMLS gotchas, listing + sold
  pages with lightboxes, the sold map, neighborhood SEO pages with Market
  Pulse, the contact → Resend lead pipeline, JSON-LD, sitemap. An agent site
  is ~90% the same product with different scoping and voice.
- **Template repo, not multi-tenant:** one deploy serving many agent domains
  is more infrastructure (host routing, per-tenant caching/ISR, shared blast
  radius) than a 20-agent brokerage needs. Separate repos + Vercel projects
  keep each site independently deployable, brandable, and cheap. Revisit
  multi-tenant only if this scales past ~25 sites.
- **Config-driven:** every agent-specific fact lives in `agent.config.ts` +
  env vars. Code never mentions Jamie by name.

## What carries over unchanged

- Next.js 16 / React 19 / Tailwind v4 / shadcn foundation and design system
- `src/lib/trestle.ts` (token handling, 429 retry, $select/Media caps,
  OriginalEntryTimestamp new-listing detection, lease/land handling)
- Listing + sold detail pages, photo lightbox, sold map (Leaflet/CARTO)
- Neighborhood pages + whole-market 30-day Market Pulse
- Contact form → /api/contact → Resend (honeypot + rate limit)
- JSON-LD, sitemap, ISR strategy, image config for api.cotality.com

## What changes

### 1. Data scoping (the core change)
Replace office-ID filters with agent-DRE filters:
- Actives: `ListAgentMlsId eq '<agent>'` (list side only)
- Solds:   `ListAgentMlsId eq '<agent>' or BuyerAgentMlsId eq '<agent>'`
  with the same representation logic (seller / buyer / both) already proven
  in the marketing suite's `soldAgent`/`ourSoldSides`
- Note: Trestle agent identifiers — confirm whether the feed matches on
  `ListAgentMlsId` or `ListAgentStateLicense` for CRMLS; the suite matches
  DRE via `ListAgentStateLicense` digits, which is the reliable key
- Env: `TRESTLE_AGENT_DRE` replaces `TRESTLE_OFFICE_MLS_ID`

### 2. Page map
| Brokerage site | Agent template |
|---|---|
| Home (brokerage hero, belief, recruit CTA) | Home (agent hero, personal stats, "work with me") |
| /agents roster + profiles | **removed** → single /about (bio, credentials, headshot) |
| /listings, /properties/sold | same, agent-scoped |
| /neighborhoods/* | same, limited to the agent's `serviceAreas` |
| /buy, /sell | same copy, agent voice |
| /blog | optional per config (`features.blog`) |
| /contact | same pipeline, leads to the agent |
| Recruiting CTA sections | **removed** (or "referrals" variant) |

### 3. Stats become live and personal
Homepage counters pull from the MLS at build time (same math as the
marketing suite's Year in Review): career/trailing volume, closings, cities
served, years licensed (config). No hand-maintained numbers.

### 4. Emails
- Lead alerts → the agent (plus optional broker CC)
- The brokerage-wide listing-watcher/recap/open-house crons are **omitted**
  from the template (the Koqi marketing suite is the agent's sending tool);
  keep only the contact-form lead email

## `agent.config.ts` (single source of truth)

```ts
export const AGENT = {
  // Identity
  name: "Jamie Tian",
  firstName: "Jamie",
  title: "Broker Associate",           // display title
  dre: "01920120",                      // digits only — drives ALL MLS scoping
  phone: "(310) 717-1321",
  email: "jamie@jamietian.com",
  headshot: "/images/agent/headshot.jpg",
  bio: "…",                             // /about long-form
  languages: ["English", "Mandarin"],   // optional chips
  social: { instagram: "…", linkedin: "…", zillow: "…" },

  // Brokerage (compliance — always shown)
  brokerage: {
    name: "RealiFi Realty",
    dre: "02210728",
    address: "9171 Wilshire Boulevard, Suite 500, Beverly Hills, CA 90210",
    logo: "/images/brand/realifi-mark.svg",
  },

  // Brand
  brand: {
    primary: "#22C3D5",                 // per-agent accent override
    dark: "#0A151A",
    displayFont: "Geist",               // from the shared font registry
  },

  // Market scoping
  serviceAreas: ["Sherman Oaks", "Studio City", "Seal Beach", "Los Angeles"],
  heroMarkets: "Los Angeles • The Valley • Long Beach",

  // Site
  domain: "https://www.jamietian.com",
  calendly: "https://calendly.com/…",
  features: { blog: false, soldMap: true, neighborhoods: true },
} as const;
```

## Env vars per deploy

| Var | Notes |
|---|---|
| `TRESTLE_CLIENT_ID/SECRET` | same feed credentials (one license covers brokerage display; confirm with Trestle that per-agent public sites are covered) |
| `TRESTLE_AGENT_DRE` | scoping key |
| `RESEND_API_KEY` | shared, or per-agent later |
| `LEAD_TO_EMAILS` | agent (+ broker cc) |
| `LEAD_FROM_EMAIL` | e.g. `Jamie Tian <leads@jamietian.com>` (domain verify per site) or shared `alerts@realifirealty.com` to start |
| `NEXT_PUBLIC_SITE_URL` | the agent domain |

## SEO strategy (agent sites win different queries)

- Primary: **name queries** — "Jamie Tian realtor", "Jamie Tian RealiFi" →
  Person + RealEstateAgent JSON-LD with DRE, sameAs socials/Zillow
- Secondary: hyper-local — "{serviceArea} realtor", agent-scoped
  neighborhood pages with live inventory + pulse
- Every listing/sold page canonicalizes to the agent domain (distinct
  content voice from the brokerage site to avoid duplicate-content flags;
  intro copy templates differ deliberately)
- Off-site (per agent): Google Business Profile, Search Console, consistent
  NAP, Zillow/realtor.com profile links

## Compliance (CA DRE + CRMLS — non-negotiable template defaults)

- Every page footer: agent name + license #, responsible broker name +
  license # (RealiFi Realty · DRE #02210728), office address
- IDX rules: listing attribution/disclaimer as on the brokerage site; solds
  shown per CRMLS display policy (same rules already implemented)
- Fair Housing + equal housing logo in footer

## Reuse playbook (agent #2 in ~30 minutes)

1. GitHub → agent-site-template → **"Use this template"** → `site-<agent>`
2. Edit `agent.config.ts` (+ drop headshot/og image in /public)
3. New Vercel project in the Koqi team → import repo → paste env vars
4. Point domain, verify Resend sender if per-agent
5. Smoke-check: home stats, listings scoped correctly, lead email arrives
Template updates flow forward by merging the template repo into agent repos
(or via a scheduled "template sync" action later if drift becomes a chore).

## Phases

- **P1 — Template + Jamie pilot:** fork, config layer, agent scoping,
  page-map changes, live personal stats, compliance footer. Ship on a
  Vercel preview for Jamie's sign-off.
- **P2 — SEO depth:** agent-scoped neighborhood pages, Person JSON-LD,
  sitemap, OG images (agent-branded via the suite's og renderer patterns).
- **P3 — Ecosystem ties:** lead alerts into the send log, "market updates"
  signup wired to the Koqi marketing suite audiences (post contacts API),
  shared font/brand registry with the suite.

## Open decisions (Josh)

1. **Domain per agent** — buy `jamietian.com`-style domains, or start with
   `jamie.realifirealty.com` subdomains (free, instant, still SEO-viable)?
2. **Who owns the repos/Vercel** — RealiFi-Inc org + Koqi team for all agent
   sites (recommended: centralized updates), or per-agent accounts?
3. **Lead routing** — agent only, or agent + broker CC?
4. **How personal is the brand** — RealiFi-framed (nav/footer keep RealiFi
   look, accent color varies) vs fully personal (own palette/logo)? The
   config supports both; pick the default.
5. Confirm with Trestle/CRMLS that the existing IDX license covers
   agent-branded public sites (it typically does for the same brokerage,
   worth a one-line email).
