import { AGENT } from "@/config/agent";

/**
 * SITE is derived from the agent config — edit src/config/agent.ts, not this
 * file, when instantiating the template for a new agent.
 */
export const SITE = {
  name: AGENT.name,
  tagline: AGENT.tagline,
  description: AGENT.description,
  url: AGENT.domain,
  email: AGENT.email,
  phone: AGENT.phone,
  phoneFormatted: AGENT.phone,
  phoneHref: AGENT.phoneHref,
  calendly: AGENT.calendly,
  logo: AGENT.logo,
  koqiUrl: "https://koqi.ai",
  address: AGENT.brokerage.address,
  dre: {
    agent: AGENT.dre,
    agentDisplay: `DRE #${AGENT.dre}`,
    brokerage: AGENT.brokerage.dre,
    brokerageDisplay: `DRE #${AGENT.brokerage.dre}`,
    disclaimer: `Information deemed reliable but not guaranteed. ${AGENT.name}, California DRE #${AGENT.dre}. ${AGENT.brokerage.legalName}, California Department of Real Estate License #${AGENT.brokerage.dre}.`,
  },
  social: AGENT.social,
  copyright: `© ${new Date().getFullYear()} ${AGENT.name}. All rights reserved.`,
} as const;

export interface NavLink {
  label: string;
  href: string;
  /** Renders as a dropdown on desktop; flattened in mobile menu + footer */
  children?: readonly { label: string; href: string }[];
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  {
    label: "Properties",
    href: "/listings",
    children: [
      { label: "Featured Listings", href: "/listings" },
      { label: "Sold Properties", href: "/properties/sold" },
    ],
  },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Every leaf destination — for surfaces that need a flat list (mobile menu, footer). */
export const NAV_LINKS_FLAT: readonly { label: string; href: string }[] =
  NAV_LINKS.flatMap((l) => (l.children ? l.children : [l]));

export const ANALYTICS_EVENTS = {
  CTA_BUY_SELL: "cta_click_buy_sell",
  CTA_CONTACT: "cta_click_contact",
  PROPERTY_CLICK: "property_card_click",
  SOLD_MAP_CLICK: "sold_property_map_click",
  LEAD_SUBMIT: "lead_form_submit",
} as const;
