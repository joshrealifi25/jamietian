export interface ListingAgent {
  name: string;
  phone?: string;
  email?: string;
  license?: string;
  /** Filled when the MLS agent matches the site roster */
  photo?: string;
  role?: string;
  slug?: string;
  /** Which side of a closed sale our agent was on */
  representation?: "seller" | "buyer" | "both";
  /** True when the deal was RealiFi's but the agent is no longer on the
   *  roster — render the brokerage identity instead of a personal profile */
  isBrokerage?: boolean;
}

export interface Property {
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  priceFormatted: string;
  beds: number;
  baths: number;
  sqft: number;
  description?: string;
  image: string;
  images?: string[];
  status: "active" | "pending" | "sold";
  soldDate?: string;
  neighborhood?: string;
  features?: string[];
  agent?: ListingAgent;
  lat?: number;
  lng?: number;
}

export interface SoldProperty extends Property {
  status: "sold";
  soldDate: string;
  soldPrice: number;
  soldPriceFormatted: string;
}

export interface Listing extends Property {
  status: "active" | "pending";
  listDate?: string;
  openHouse?: string;
  mlsNumber?: string;
}
