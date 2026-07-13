import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "NGO Empati", "kesihatan mental", "Malaysia", "sukarelawan", "kaunseling",
    "Kamar Empati", "sokongan rakan sebaya", "advokasi pulih mental", "derma",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    locale: "ms_MY",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: "/images/event-komuniti-1.jpeg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F4",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Kuala Lumpur", addressCountry: "MY" },
  sameAs: Object.values(site.socials),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className={jakarta.variable}>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
