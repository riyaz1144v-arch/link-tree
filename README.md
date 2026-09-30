# SK Riyaz Rahaman — Link Hub

Single-page link hub built with Next.js 15 (App Router), Tailwind CSS v4, GSAP + ScrollTrigger, and Lenis.

## Assumptions

- Hero photo lives at `public/images/riyaz.jpg` (PNG source is fine; Next/Image serves it as configured).
- Canonical / OG base URL defaults to `https://link-portfolio.vercel.app`. Override with `NEXT_PUBLIC_SITE_URL` on Vercel.
- Accent colors use the spec defaults (`#E8913C`, `#2E6B72`), which match the warm highlights and cool foliage in the portrait.
- Footer year is **2026** per brief.

## Design tokens

Defined in `app/globals.css` under `@theme inline`:

| Token | Value |
| --- | --- |
| Ground / secondary | `#0A0C0E` / `#101317` |
| Ink / secondary / muted | `#EDE7DC` / `#9EA5A8` / `#6C7378` |
| Amber / teal | `#E8913C` / `#2E6B72` |
| Hairline | `rgb(237 231 220 / 0.13)` |
| Spacing | 4, 8, 16, 24, 32, 48, 64, 96, 128 px |
| Type ramp | display, h1, h2, lede, body, label |
| Radius | pill (buttons), 0 (rows) |
| Easing / duration | ease-out cubic, 200–1200 ms |

Fonts: **Syne** (600–800) for wordmark/headings, **Sora** (400–600) for body via `next/font`.

## Structure

```
app/           layout, page, metadata, OG, icons, sitemap, robots
components/    Loader, Nav, PortalHero, Statement, LinkRows, CopyButton, Close, shell/scroll helpers
lib/links.ts   Single source of truth for URLs and copy
lib/motion.ts  Loader session key and motion constants
public/images/ riyaz.jpg
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npx tsc --noEmit
```

## Motion notes

- `.motion-ok` on `<html>` gates initial hidden states; reduced-motion and no-JS get a fully readable static layout (portal open).
- Loader is capped at 3s, skipped per session via `sessionStorage`, and hands off with the same split-panel reveal as the hero.
- Lenis drives smooth scroll; `ScrollTrigger.update` runs on Lenis scroll and `gsap.ticker` drives `lenis.raf`.
