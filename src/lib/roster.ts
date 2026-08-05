import { agents } from "@/data/agents";
import type { ListingAgent } from "@/types/property";

/**
 * Match an MLS listing agent against the site roster so we can show
 * the agent's headshot and role. DRE license number is the reliable key;
 * normalized full name is the fallback.
 */

const digits = (s: string | undefined | null) =>
  (s ?? "").replace(/\D/g, "").replace(/^0+/, "");

const normName = (s: string | undefined | null) =>
  (s ?? "").toLowerCase().replace(/[^a-z]/g, "");

export interface RawAgent {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  license?: string | null;
}

/** Roster match only — returns undefined for agents outside the roster. */
export function matchRosterAgent(raw: RawAgent): ListingAgent | undefined {
  if (!raw.name) return undefined;

  const rosterMatch =
    agents.find((a) => digits(a.dre) !== "" && digits(a.dre) === digits(raw.license)) ??
    agents.find((a) => normName(a.name) === normName(raw.name));

  if (!rosterMatch) return undefined;

  return {
    name: rosterMatch.name,
    phone: rosterMatch.phone || raw.phone || undefined,
    email: rosterMatch.email || raw.email || undefined,
    license: rosterMatch.dre ? `DRE #${rosterMatch.dre}` : undefined,
    photo: rosterMatch.image,
    role: rosterMatch.role,
    slug: rosterMatch.slug,
  };
}

/** Roster match when possible, raw MLS data otherwise (for our own actives). */
export function buildListingAgent(raw: RawAgent): ListingAgent | undefined {
  if (!raw.name) return undefined;

  return (
    matchRosterAgent(raw) ?? {
      name: raw.name,
      phone: raw.phone || undefined,
      email: raw.email || undefined,
      license: digits(raw.license) ? `DRE #${raw.license}` : undefined,
    }
  );
}
