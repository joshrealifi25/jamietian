/**
 * AGENT SITE TEMPLATE — single source of truth.
 *
 * Everything agent-specific lives in this file (plus env vars for secrets).
 * To spin this template up for a new agent: edit this file, drop the agent's
 * headshot + OG image into /public/images/agent/, set the env vars, deploy.
 * No other source file should hard-code the agent's identity.
 */

export const AGENT = {
  // ── Identity ─────────────────────────────────────────────────────────────
  name: "Jamie Tian",
  firstName: "Jamie",
  /** Public-facing title shown under the name. */
  title: "Realtor® | Broker-Owner",
  /** CA DRE license, digits only — drives all MLS scoping and compliance. */
  dre: "01920120",
  phone: "(310) 717-1321",
  phoneHref: "tel:+13107171321",
  email: "jamie@realifirealty.com",
  headshot: "/images/agent/headshot.jpg",
  /** Languages beyond English, shown as chips on About. Empty array to hide. */
  languages: ["English", "Chinese"],

  // ── Positioning ──────────────────────────────────────────────────────────
  tagline: "Los Angeles luxury real estate, guided with clarity.",
  description:
    "Jamie Tian is a Los Angeles luxury real estate advisor and broker-owner with over 14 years of experience, trusted for strategic pricing, decisive negotiation, and calm leadership in high-stakes transactions.",
  /** Short market line for the hero eyebrow. */
  heroMarkets:
    "Beverly Hills · Los Angeles · Manhattan Beach · Sherman Oaks · The Westside",
  /** Marquee strip of markets/neighborhoods served. */
  serviceAreas: [
    "Beverly Hills",
    "Manhattan Beach",
    "Los Angeles",
    "Sherman Oaks",
    "Studio City",
    "Westwood",
    "Brentwood",
    "Santa Monica",
    "West Hollywood",
    "Hollywood Hills",
    "Encino",
    "Culver City",
    "Marina del Rey",
    "Long Beach",
    "Seal Beach",
    "Pasadena",
  ],
  /** Career stats for the About/stat sections. Update as milestones land. */
  stats: {
    salesVolume: { end: 200, prefix: "$", suffix: "M+", label: "In Career Sales" },
    homesSold: { end: 200, prefix: "", suffix: "+", label: "Properties Sold" },
    yearsExperience: { end: 14, prefix: "", suffix: "+", label: "Years of Experience" },
    ranking: { end: 1, prefix: "Top ", suffix: "%", label: "Of LA Agents" },
  },
  /** Credentials & honors, shown on About. */
  credentials: [
    "NAR 30 Under 30 honoree (2017)",
    "National President, Asian Real Estate Association of America (2024 & 2025)",
    "Top 1.5% of real estate professionals nationwide",
    "Leadership roles with NAR, C.A.R., and the Greater LA Association of Realtors",
    "Licensed at 20 while attending UCLA",
  ],

  // ── Brokerage (compliance — shown in footer and About on every deploy) ───
  brokerage: {
    name: "RealiFi Realty",
    legalName: "RealiFi Realty, Inc.",
    dre: "02210728",
    address: {
      street: "9171 Wilshire Boulevard, Suite 500",
      city: "Beverly Hills",
      state: "CA",
      zip: "90210",
      full: "9171 Wilshire Boulevard, Suite 500, Beverly Hills, CA 90210",
    },
  },

  // ── Site ─────────────────────────────────────────────────────────────────
  domain: "https://www.jamietian.com",
  /** Scheduling link for the "book a consultation" CTAs. */
  calendly: "https://calendly.com/realifirealty/buy-and-sell",
  /**
   * Social profiles. Leave a value empty ("") to hide its icon everywhere.
   * Keys must stay in sync with the icon set in SiteFooter.
   */
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    twitter: "",
  },
  /**
   * Optional logo image path (white version for dark headers). When empty,
   * the header and footer render the agent's name as a text wordmark.
   */
  logo: "",
} as const;

/** DRE digits used for MLS attribution matching. */
export const AGENT_DRE_DIGITS = AGENT.dre.replace(/\D/g, "").replace(/^0+/, "");
