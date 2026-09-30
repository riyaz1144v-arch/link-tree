"use client";

import { CopyButton } from "@/components/CopyButton";
import { LINK_ROWS } from "@/lib/links";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function LinkRows() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const motionOk = document.documentElement.classList.contains("motion-ok");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!motionOk || reduced) return;

      const rows = section.querySelectorAll<HTMLElement>(".link-row-reveal");
      gsap.to(rows, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="links"
      ref={sectionRef}
      className="py-[var(--spacing-8)]"
      aria-labelledby="links-heading"
    >
      <div className="container-grid">
        <h2 id="links-heading" className="sr-only">
          Links
        </h2>
        <ul className="hairline-t border-[var(--color-hairline)]">
          {LINK_ROWS.map((row) => (
            <li
              key={row.id}
              className="link-row-reveal hairline-b border-[var(--color-hairline)] transition-[border-color] duration-[var(--duration-base)] ease-[var(--ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:border-[var(--color-amber)]"
            >
              <div className="group flex min-h-[var(--spacing-7)] items-stretch">
                <a
                  href={row.href}
                  {...(row.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex min-h-[var(--spacing-7)] min-w-0 flex-1 items-center gap-[var(--spacing-3)] py-[var(--spacing-3)] pr-[var(--spacing-2)] [@media(hover:hover)]:group-hover:[&_.row-name]:translate-x-[var(--spacing-2)]"
                >
                  <span className="w-[var(--spacing-7)] shrink-0 text-label text-[var(--color-amber)] md:w-[var(--spacing-8)]">
                    {row.index}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="row-name font-display block text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)] font-semibold tracking-[-0.02em] transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] motion-reduce:transition-none">
                      {row.label}
                    </span>
                    <span className="mt-[var(--spacing-1)] block truncate text-[var(--color-muted)] text-[length:var(--text-body)]">
                      {row.secondary}
                    </span>
                  </span>
                  {!row.copyable ? (
                    <ArrowUpRight
                      className="row-arrow shrink-0 text-[var(--color-ink-secondary)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:rotate-45"
                      size={22}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  ) : null}
                </a>
                {row.copyable && row.copyText ? (
                  <>
                    <CopyButton value={row.copyText} label={row.label} />
                    <a
                      href={row.href}
                      className="inline-flex min-h-[var(--spacing-7)] min-w-[var(--spacing-7)] items-center justify-center px-[var(--spacing-2)] text-[var(--color-ink-secondary)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] hover:text-[var(--color-amber)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:rotate-45"
                      aria-label={`Open ${row.label}`}
                    >
                      <ArrowUpRight size={22} strokeWidth={1.5} aria-hidden />
                    </a>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
