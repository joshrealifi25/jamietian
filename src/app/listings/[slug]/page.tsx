import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProperties, findPropertyBySlug } from "@/lib/trestle";
import { ListingDetailContent } from "./ListingDetailContent";

export const revalidate = 900;
export const dynamicParams = true;

export async function generateStaticParams() {
  const all = await getAllProperties();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await findPropertyBySlug(slug);
  if (!property) return {};

  const title = `${property.address}, ${property.city} | Jamie Tian`;
  const description = property.description
    ? property.description
    : `${property.beds} bed, ${property.baths} bath, ${property.sqft.toLocaleString()} sqft property at ${property.address}, ${property.city}, ${property.state} ${property.zip}. ${property.priceFormatted}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: property.image }],
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await findPropertyBySlug(slug);
  if (!property) notFound();

  const related = (await getAllProperties())
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return <ListingDetailContent property={property} related={related} />;
}
