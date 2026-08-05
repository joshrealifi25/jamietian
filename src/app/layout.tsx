import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { AGENT } from "@/config/agent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const TITLE = `${AGENT.name} | Los Angeles Luxury Real Estate`;

export const metadata: Metadata = {
  metadataBase: new URL(AGENT.domain),
  title: {
    default: TITLE,
    template: `%s | ${AGENT.name}`,
  },
  description: AGENT.description,
  keywords: [
    AGENT.name,
    `${AGENT.name} realtor`,
    `${AGENT.name} real estate agent`,
    `${AGENT.name} ${AGENT.brokerage.name}`,
    "Los Angeles luxury real estate",
    "Beverly Hills real estate agent",
    "Los Angeles real estate advisor",
    ...AGENT.serviceAreas.map((area) => `${area} realtor`),
    "sell home Los Angeles",
    "buy home Los Angeles",
    "California luxury homes",
  ],
  authors: [{ name: AGENT.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: AGENT.name,
    title: TITLE,
    description: AGENT.description,
    images: [{ url: "/images/brand/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: AGENT.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sameAs = Object.values(AGENT.social).filter(Boolean);
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["RealEstateAgent", "Person"],
              name: AGENT.name,
              url: AGENT.domain,
              image: `${AGENT.domain}${AGENT.headshot}`,
              description: AGENT.description,
              jobTitle: "Real Estate Broker",
              telephone: AGENT.phoneHref.replace("tel:", ""),
              email: AGENT.email,
              knowsLanguage: AGENT.languages,
              worksFor: {
                "@type": "RealEstateAgent",
                name: AGENT.brokerage.legalName,
                address: AGENT.brokerage.address.full,
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: AGENT.brokerage.address.street,
                addressLocality: AGENT.brokerage.address.city,
                addressRegion: AGENT.brokerage.address.state,
                postalCode: AGENT.brokerage.address.zip,
                addressCountry: "US",
              },
              areaServed: AGENT.serviceAreas.map((name) => ({
                "@type": "City",
                name,
                containedInPlace: { "@type": "State", name: "California" },
              })),
              knowsAbout: [
                "Luxury real estate sales",
                "Los Angeles residential real estate",
                "Real estate pricing strategy",
                "Real estate negotiation",
                "1031 exchanges",
              ],
              award: AGENT.credentials,
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "Real Estate Broker License",
                recognizedBy: {
                  "@type": "GovernmentOrganization",
                  name: "California Department of Real Estate",
                },
                identifier: `DRE #${AGENT.dre}`,
              },
              ...(sameAs.length > 0 ? { sameAs } : {}),
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
