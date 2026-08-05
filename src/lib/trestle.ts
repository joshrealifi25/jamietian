import { cache } from "react";
import type { Listing, SoldProperty } from "@/types/property";
import { listings as staticListings } from "@/data/listings";
import { soldProperties as staticSold } from "@/data/sold-properties";
import { buildListingAgent } from "@/lib/roster";
import { AGENT_DRE_DIGITS } from "@/config/agent";

/**
 * Trestle (CoreLogic) RESO Web API integration, scoped to a single agent.
 *
 * Configure via environment variables:
 *   TRESTLE_CLIENT_ID      — API Connection client id from the Trestle dashboard
 *   TRESTLE_CLIENT_SECRET  — API Connection client secret
 *   TRESTLE_OFFICE_MLS_ID  — the brokerage's office MLS id(s), comma-separated
 *   TRESTLE_AGENT_DRE      — optional override; defaults to the DRE in
 *                            src/config/agent.ts
 *   TRESTLE_API_BASE       — optional, defaults to the production endpoint
 *
 * Queries fetch the brokerage's office inventory (the proven server-side
 * filter), then narrow to the agent in memory by DRE-license digits — feed
 * license formatting varies, so digit-normalized matching beats a server-side
 * string equality. When credentials are absent (local dev, preview builds)
 * every getter falls back to the static data in src/data/.
 */

const API_BASE =
  process.env.TRESTLE_API_BASE ?? "https://api-prod.corelogic.com/trestle";
const CLIENT_ID = process.env.TRESTLE_CLIENT_ID;
const CLIENT_SECRET = process.env.TRESTLE_CLIENT_SECRET;
const OFFICE_IDS = (process.env.TRESTLE_OFFICE_MLS_ID ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const licenseDigits = (s: string | undefined | null) =>
  (s ?? "").replace(/\D/g, "").replace(/^0+/, "");

const AGENT_DRE =
  licenseDigits(process.env.TRESTLE_AGENT_DRE) || AGENT_DRE_DIGITS;

const isAgentLicense = (license: string | undefined) =>
  AGENT_DRE !== "" && licenseDigits(license) === AGENT_DRE;

const ACTIVE_REVALIDATE = 900; // 15 min
const SOLD_REVALIDATE = 3600; // 1 hour
const SOLD_LOOKBACK_MONTHS = 36;

export const isTrestleConfigured = Boolean(CLIENT_ID && CLIENT_SECRET);

interface TrestleMedia {
  MediaURL?: string;
  Order?: number;
  MediaCategory?: string;
}

interface TrestleProperty {
  ListingKey: string;
  ListingId?: string;
  UnparsedAddress?: string;
  StreetNumber?: string;
  StreetName?: string;
  StreetSuffix?: string;
  UnitNumber?: string;
  City?: string;
  StateOrProvince?: string;
  PostalCode?: string;
  ListPrice?: number;
  ClosePrice?: number;
  CloseDate?: string;
  StandardStatus?: string;
  PropertyType?: string;
  BedroomsTotal?: number;
  BathroomsFull?: number;
  BathroomsHalf?: number;
  BathroomsTotalInteger?: number;
  LivingArea?: number;
  PublicRemarks?: string;
  SubdivisionName?: string;
  MLSAreaMajor?: string;
  ListingContractDate?: string;
  ListAgentFullName?: string;
  ListAgentStateLicense?: string;
  ListAgentDirectPhone?: string;
  ListAgentEmail?: string;
  BuyerAgentFullName?: string;
  BuyerAgentStateLicense?: string;
  BuyerAgentDirectPhone?: string;
  BuyerAgentEmail?: string;
  ListOfficeMlsId?: string;
  BuyerOfficeMlsId?: string;
  Latitude?: number;
  Longitude?: number;
  MajorChangeType?: string;
  MajorChangeTimestamp?: string;
  OriginalEntryTimestamp?: string;
  Media?: TrestleMedia[];
}

// ---------------------------------------------------------------------------
// Auth — client-credentials token, cached in module scope until near expiry.
// ---------------------------------------------------------------------------

let tokenCache: { token: string; expiresAt: number } | null = null;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) return tokenCache.token;

  // Trestle rate-limits the token endpoint. Next.js builds prerender pages
  // in parallel workers (each with its own module scope), so bursts of
  // token requests can hit 429 — retry with backoff instead of failing
  // the whole query over to static fallback data.
  let lastStatus = 0;
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`${API_BASE}/oidc/connect/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        scope: "api",
      }),
      // No cache directive: POSTs bypass Next's data cache already, and an
      // explicit no-store would force every listing route to render
      // dynamically instead of prerendering at build time.
    });

    if (res.ok) {
      const data = (await res.json()) as {
        access_token: string;
        expires_in: number;
      };
      tokenCache = {
        token: data.access_token,
        // refresh 2 minutes before actual expiry
        expiresAt: Date.now() + (data.expires_in - 120) * 1000,
      };
      return tokenCache.token;
    }

    lastStatus = res.status;
    if (res.status !== 429) break;
    const retryAfter = Number(res.headers.get("retry-after"));
    const wait = retryAfter > 0 ? retryAfter * 1000 : 1500 * 2 ** attempt + Math.random() * 500;
    await sleep(Math.min(wait, 15000));
  }
  throw new Error(`Trestle token request failed: ${lastStatus}`);
}

// ---------------------------------------------------------------------------
// OData query helper
// ---------------------------------------------------------------------------

async function queryResource<T>(
  resource: string,
  params: Record<string, string>,
  revalidate: number,
): Promise<T[]> {
  const token = await getToken();
  const results: T[] = [];
  let url: string | null =
    `${API_BASE}/odata/${resource}?` + new URLSearchParams(params).toString();

  // Follow @odata.nextLink pagination, capped defensively.
  for (let page = 0; url && page < 10; page++) {
    const res: Response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      next: { revalidate, tags: ["trestle"] },
    });
    if (!res.ok) {
      throw new Error(`Trestle query failed: ${res.status} ${await res.text()}`);
    }
    const data = (await res.json()) as {
      value: T[];
      "@odata.nextLink"?: string;
    };
    results.push(...data.value);
    url = data["@odata.nextLink"] ?? null;
  }
  return results;
}

const queryProperties = (
  params: Record<string, string>,
  revalidate: number,
): Promise<TrestleProperty[]> =>
  queryResource<TrestleProperty>("Property", params, revalidate);

// Keep responses small (Next.js fetch cache caps entries at 2 MB):
// select only mapped fields and cap photos per listing.
const SELECT_FIELDS = [
  "ListingKey",
  "ListingId",
  "UnparsedAddress",
  "StreetNumber",
  "StreetName",
  "StreetSuffix",
  "UnitNumber",
  "City",
  "StateOrProvince",
  "PostalCode",
  "ListPrice",
  "ClosePrice",
  "CloseDate",
  "StandardStatus",
  "PropertyType",
  "BedroomsTotal",
  "BathroomsFull",
  "BathroomsHalf",
  "BathroomsTotalInteger",
  "LivingArea",
  "PublicRemarks",
  "SubdivisionName",
  "MLSAreaMajor",
  "ListingContractDate",
  "ListAgentFullName",
  "ListAgentStateLicense",
  "ListAgentDirectPhone",
  "ListAgentEmail",
  "BuyerAgentFullName",
  "BuyerAgentStateLicense",
  "BuyerAgentDirectPhone",
  "BuyerAgentEmail",
  "ListOfficeMlsId",
  "BuyerOfficeMlsId",
  "Latitude",
  "Longitude",
].join(",");

const mediaExpand = (top: number) =>
  `Media($select=MediaURL,Order,MediaCategory;$orderby=Order;$top=${top})`;

function officeFilter(field: string): string | null {
  if (OFFICE_IDS.length === 0) return null;
  const clauses = OFFICE_IDS.map((id) => `${field} eq '${id}'`);
  return clauses.length === 1 ? clauses[0] : `(${clauses.join(" or ")})`;
}

// ---------------------------------------------------------------------------
// RESO → site model mapping
// ---------------------------------------------------------------------------

const FALLBACK_IMAGE = "/images/properties/1830-westholme.jpg";

const formatUsd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

function kebab(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildAddress(p: TrestleProperty): string {
  if (p.UnparsedAddress) {
    // UnparsedAddress often includes ", City, ST Zip" — keep the street part.
    return p.UnparsedAddress.split(",")[0].trim();
  }
  return [p.StreetNumber, p.StreetName, p.StreetSuffix, p.UnitNumber ? `#${p.UnitNumber}` : ""]
    .filter(Boolean)
    .join(" ")
    .trim();
}

function sortedPhotos(p: TrestleProperty): string[] {
  return (p.Media ?? [])
    .filter((m) => m.MediaURL && (m.MediaCategory ?? "Photo") === "Photo")
    .sort((a, b) => (a.Order ?? 0) - (b.Order ?? 0))
    .map((m) => m.MediaURL!) ;
}

function baths(p: TrestleProperty): number {
  if (p.BathroomsFull != null) {
    return p.BathroomsFull + (p.BathroomsHalf ?? 0) * 0.5;
  }
  return p.BathroomsTotalInteger ?? 0;
}

function isLease(p: TrestleProperty): boolean {
  return (p.PropertyType ?? "").toLowerCase().includes("lease");
}

function mapCommon(p: TrestleProperty) {
  const address = buildAddress(p);
  const photos = sortedPhotos(p);
  const price = p.ListPrice ?? 0;
  return {
    slug: `${kebab(address)}-${p.ListingId ?? p.ListingKey}`,
    address,
    city: p.City ?? "",
    state: p.StateOrProvince ?? "CA",
    zip: p.PostalCode ?? "",
    price,
    priceFormatted: isLease(p) ? `${formatUsd(price)}/month` : formatUsd(price),
    beds: p.BedroomsTotal ?? 0,
    baths: baths(p),
    sqft: p.LivingArea ?? 0,
    description: p.PublicRemarks,
    image: photos[0] ?? FALLBACK_IMAGE,
    images: photos.length > 0 ? photos : undefined,
    neighborhood: p.SubdivisionName || p.MLSAreaMajor || p.City,
    lat: p.Latitude ?? undefined,
    lng: p.Longitude ?? undefined,
  };
}

const listSideOf = (p: TrestleProperty) => ({
  name: p.ListAgentFullName,
  phone: p.ListAgentDirectPhone,
  email: p.ListAgentEmail,
  license: p.ListAgentStateLicense,
});

const buyerSideOf = (p: TrestleProperty) => ({
  name: p.BuyerAgentFullName,
  phone: p.BuyerAgentDirectPhone,
  email: p.BuyerAgentEmail,
  license: p.BuyerAgentStateLicense,
});

function mapListing(p: TrestleProperty): Listing {
  return {
    ...mapCommon(p),
    status: p.StandardStatus === "Pending" ? "pending" : "active",
    listDate: p.ListingContractDate,
    mlsNumber: p.ListingId,
    // Actives are filtered to our office, so the list agent is always ours.
    agent: buildListingAgent(listSideOf(p)),
  };
}

/**
 * Solds are narrowed to deals where the agent held a side. Work out which
 * side(s) from the license digits and surface the agent with that
 * representation (seller / buyer / both when double-ended).
 */
function soldAgent(p: TrestleProperty) {
  const listOurs = isAgentLicense(p.ListAgentStateLicense);
  const buyerOurs = isAgentLicense(p.BuyerAgentStateLicense);

  const representation =
    listOurs && buyerOurs
      ? ("both" as const)
      : listOurs
        ? ("seller" as const)
        : buyerOurs
          ? ("buyer" as const)
          : undefined;
  if (!representation) return undefined;

  const agent = buildListingAgent(listOurs ? listSideOf(p) : buyerSideOf(p));
  return agent ? { ...agent, representation } : undefined;
}

function mapSold(p: TrestleProperty): SoldProperty {
  const common = mapCommon(p);
  const soldPrice = p.ClosePrice ?? p.ListPrice ?? 0;
  return {
    ...common,
    status: "sold",
    soldDate: p.CloseDate
      ? new Date(p.CloseDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : "",
    soldPrice,
    soldPriceFormatted: formatUsd(soldPrice),
    price: soldPrice,
    priceFormatted: formatUsd(soldPrice),
    agent: soldAgent(p),
  };
}

// ---------------------------------------------------------------------------
// Public data getters — MLS-backed with static fallback.
// ---------------------------------------------------------------------------

export const getActiveListings = cache(async (): Promise<Listing[]> => {
  if (!isTrestleConfigured) return staticListings;
  try {
    const clauses = ["StandardStatus eq 'Active' or StandardStatus eq 'Pending'"];
    const office = officeFilter("ListOfficeMlsId");
    const filter = office ? `(${clauses[0]}) and ${office}` : clauses[0];
    const rows = await queryProperties(
      {
        $filter: filter,
        $select: SELECT_FIELDS,
        $expand: mediaExpand(24),
        $orderby: "ListPrice desc",
        $top: "100",
      },
      ACTIVE_REVALIDATE,
    );
    // Narrow the office inventory to this agent's list side. An empty result
    // is real (the agent may have no actives) — only errors fall back.
    return rows
      .filter((p) => isAgentLicense(p.ListAgentStateLicense))
      .map(mapListing);
  } catch (err) {
    console.error("[trestle] active listings failed, using static data:", err);
    return staticListings;
  }
});

export const getSoldProperties = cache(async (): Promise<SoldProperty[]> => {
  if (!isTrestleConfigured) return staticSold;
  try {
    const since = new Date();
    since.setMonth(since.getMonth() - SOLD_LOOKBACK_MONTHS);
    const sinceIso = since.toISOString().slice(0, 10);

    const clauses = [`StandardStatus eq 'Closed' and CloseDate ge ${sinceIso}`];
    const listSide = officeFilter("ListOfficeMlsId");
    const buySide = officeFilter("BuyerOfficeMlsId");
    const filter =
      listSide && buySide
        ? `(${clauses[0]}) and (${listSide} or ${buySide})`
        : clauses[0];

    const rows = await queryProperties(
      {
        $filter: filter,
        $select: SELECT_FIELDS,
        $expand: mediaExpand(4),
        $orderby: "CloseDate desc",
        $top: "100",
      },
      SOLD_REVALIDATE,
    );
    // Keep only closings where the agent held the list or buyer side.
    const mapped = rows
      .filter(
        (p) =>
          isAgentLicense(p.ListAgentStateLicense) ||
          isAgentLicense(p.BuyerAgentStateLicense),
      )
      .map(mapSold);
    return mapped.length > 0 ? mapped : staticSold;
  } catch (err) {
    console.error("[trestle] sold properties failed, using static data:", err);
    return staticSold;
  }
});

export const getAllProperties = cache(
  async (): Promise<(Listing | SoldProperty)[]> => {
    const [active, sold] = await Promise.all([
      getActiveListings(),
      getSoldProperties(),
    ]);
    return [...active, ...sold];
  },
);

export async function findPropertyBySlug(
  slug: string,
): Promise<Listing | SoldProperty | undefined> {
  const all = await getAllProperties();
  return all.find((p) => p.slug === slug);
}
