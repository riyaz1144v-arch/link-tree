"use client";

import { SITE } from "@/lib/links";
import Link from "next/link";

const navLinks = [
  { href: "#links", label: "Links" },
  { href: "#contact", label: "Contact" },
] as const;

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--nav-height)] border-b border-[var(--color-hairline)] bg-[rgb(10_12_14_/_0.72)] backdrop-blur-[14px]">
      <div className="container-grid flex h-full items-center justify-between">
        <Link
          href="#top"
          className="font-display text-[15px] font-semibold tracking-[-0.03em] text-[var(--color-ink)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] hover:text-[var(--color-ink)]"
        >
          SK<span className="text-[var(--color-amber)]">.</span>
        </Link>

        <nav
          className="flex items-center gap-[var(--spacing-4)] md:gap-[var(--spacing-5)]"
          aria-label="Primary"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-label text-[10.5px] text-[var(--color-ink-secondary)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] hover:text-[var(--color-amber)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex min-h-[var(--spacing-7)] items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-hairline)] px-[var(--spacing-3)] text-label text-[10.5px] text-[var(--color-ink)] transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] active:scale-[0.98]"
          >
            Email
          </a>
        </nav>
      </div>
    </header>
  );
}
