import { CANONICAL_URL, LINK_ROWS, SITE } from "@/lib/links";

export function personJsonLd() {
  const sameAs = LINK_ROWS.filter((row) => row.external).map((row) => row.href);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: CANONICAL_URL,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phoneHref.replace("tel:", ""),
    sameAs,
  };
}
