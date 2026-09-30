import { LINK_ROWS, SITE } from "@/lib/links";

const portfolio = LINK_ROWS.find((l) => l.id === "portfolio");

export function Close() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden pb-[var(--spacing-4)] pt-[var(--spacing-8)]"
      aria-labelledby="contact-heading"
    >
      <div className="container-grid grid-12 items-end gap-y-[var(--spacing-6)]">
        <div className="col-span-12 md:col-span-6">
          <h2
            id="contact-heading"
            className="font-display text-[length:var(--text-h1)] leading-[var(--text-h1--line-height)] font-semibold tracking-[-0.02em]"
          >
            Get in touch.
          </h2>
          <p className="mt-[var(--spacing-3)] text-[var(--color-muted)] text-[length:var(--text-body)]">
            {SITE.name} — {SITE.year}
          </p>
        </div>
        <div className="col-span-12 flex flex-wrap gap-[var(--spacing-3)] md:col-span-6 md:justify-end">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex min-h-[var(--spacing-7)] items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-hairline)] px-[var(--spacing-4)] text-label text-[10.5px] text-[var(--color-ink)] transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] active:scale-[0.98]"
          >
            Email
          </a>
          {portfolio ? (
            <a
              href={portfolio.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[var(--spacing-7)] items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-hairline)] px-[var(--spacing-4)] text-label text-[10.5px] text-[var(--color-ink)] transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] active:scale-[0.98]"
            >
              Portfolio
            </a>
          ) : null}
        </div>
      </div>

      <div className="container-grid mt-[var(--spacing-8)] hairline-t pt-[var(--spacing-4)]">
        <p className="text-label text-[var(--color-muted)]">Contact</p>
      </div>

      <p
        className="font-display pointer-events-none mt-[var(--spacing-6)] w-full select-none px-[var(--spacing-4)] text-center text-[clamp(3rem,14vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.03em] text-[var(--color-ink)] md:px-[var(--spacing-5)]"
        style={{ transform: "translateY(18%)" }}
        aria-hidden
      >
        {SITE.wordmark}
      </p>
    </footer>
  );
}
