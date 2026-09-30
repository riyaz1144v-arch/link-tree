import { MotionInit } from "@/components/MotionInit";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CANONICAL_URL, SITE } from "@/lib/links";
import { personJsonLd } from "@/lib/json-ld";
import type { Metadata } from "next";
import { Syne, Sora } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
  adjustFontFallback: true,
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sora",
  display: "swap",
  adjustFontFallback: true,
});

const description =
  "Official links for SK Riyaz Rahaman — portfolio, Instagram, LinkedIn, email, and phone in one scroll-driven page.";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_URL),
  title: "SK Riyaz Rahaman — Links",
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SK Riyaz Rahaman — Links",
    description,
    url: CANONICAL_URL,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Riyaz Rahaman — Links",
    description,
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${sora.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/riyaz.jpg" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-[var(--spacing-3)] focus:top-[var(--spacing-3)] focus:z-[200] focus:rounded-[var(--radius-pill)] focus:bg-[var(--color-ground-secondary)] focus:px-[var(--spacing-3)] focus:py-[var(--spacing-2)] focus:text-label focus:text-[var(--color-ink)]"
        >
          Skip to content
        </a>
        <MotionInit />
        <SmoothScroll>
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
