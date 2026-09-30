export const SITE = {
  name: "SK Riyaz Rahaman",
  wordmark: "SK RIYAZ RAHAMAN",
  wordmarkLine1: "SK RIYAZ",
  wordmarkLine2: "RAHAMAN",
  email: "riyaz1144v@gmail.com",
  phoneDisplay: "+91 90195 02770",
  phoneHref: "tel:+919019502770",
  year: 2026,
} as const;

export type LinkEntry = {
  id: string;
  index: string;
  label: string;
  secondary: string;
  href: string;
  external: boolean;
  copyable: boolean;
  copyText?: string;
};

/** Display order for link rows */
export const LINK_ROWS: LinkEntry[] = [
  {
    id: "portfolio",
    index: "01",
    label: "Portfolio",
    secondary: "e-portfolio-eight-blond.vercel.app",
    href: "https://e-portfolio-eight-blond.vercel.app/",
    external: true,
    copyable: false,
  },
  {
    id: "linkedin",
    index: "02",
    label: "LinkedIn",
    secondary: "riyaz-rahaman",
    href: "https://www.linkedin.com/in/riyaz-rahaman-8189a6407/",
    external: true,
    copyable: false,
  },
  {
    id: "instagram",
    index: "03",
    label: "Instagram",
    secondary: "@_s.riyaz._",
    href: "https://www.instagram.com/_s.riyaz._",
    external: true,
    copyable: false,
  },
  {
    id: "email",
    index: "04",
    label: "Email",
    secondary: SITE.email,
    href: `mailto:${SITE.email}`,
    external: false,
    copyable: true,
    copyText: SITE.email,
  },
  {
    id: "phone",
    index: "05",
    label: "Phone",
    secondary: SITE.phoneDisplay,
    href: SITE.phoneHref,
    external: false,
    copyable: true,
    copyText: SITE.phoneDisplay,
  },
];

export const CANONICAL_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://link-portfolio.vercel.app";
