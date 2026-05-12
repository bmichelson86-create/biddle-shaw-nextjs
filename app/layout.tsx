import type { Metadata, Viewport } from "next";
import { Oswald, Oxygen } from "next/font/google";
import "./globals.css";

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import UtilityBar from "@/components/layout/UtilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileEmailTab from "@/components/layout/MobileEmailTab";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const oxygen = Oxygen({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-oxygen",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biddle-Shaw Insurance Services",
  description:
    "Independent insurance brokerage serving families and businesses with tailored coverage.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Biddle-Shaw Insurance Services, Inc.",
  url: "https://www.biddleshaw.com",
  telephone: "+1-415-586-7200",
  email: "info@biddleshaw.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "301 Junipero Serra Blvd., Suite 204",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94127",
    addressCountry: "US",
  },
  openingHours: "Mo-Fr 08:30-17:30",
  areaServed: ["California", "Arizona", "Colorado", "Nevada", "Texas"],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${oxygen.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <UtilityBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileEmailTab />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
