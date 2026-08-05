export interface Agent {
  slug: string;
  name: string;
  role: string;
  phone: string;
  phoneHref: string;
  email: string;
  dre: string;
  image: string;
  bio?: string;
  specialties?: string[];
  areas?: string[];
  isLeadership?: boolean;
  /** Skip listings/sales sections on the profile (e.g. non-producing founders) */
  hideProperties?: boolean;
}
