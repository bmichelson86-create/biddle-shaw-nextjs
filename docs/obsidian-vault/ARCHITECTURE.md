# Architecture

## Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (tokens via `@theme` in `globals.css`)
- **Animation**: GSAP + `@gsap/react` (`useGSAP` hook), Framer Motion (in-view + page transitions)
- **Smooth Scroll**: Lenis (mounted via `SmoothScrollProvider`, RAF-driven)
- **Deployment**: Vercel (target)

## Color Tokens
CSS custom properties exposed in `:root` and mirrored into Tailwind via `@theme`.

| Token            | Hex       | Purpose                                  |
| ---------------- | --------- | ---------------------------------------- |
| `--color-red`    | `#A81010` | Brand red — CTAs, accents, links on dark |
| `--color-dark`   | `#353535` | Primary dark surface (header, footer)    |
| `--color-darker` | `#222222` | Deepest dark — utility bar, footer base  |
| `--color-mid`    | `#4c4c4c` | Borders, dividers on dark surfaces       |
| `--color-text`   | `#4e4e4b` | Body text on light surfaces              |
| `--color-light`  | `#eaeaea` | Light surface / hairlines on dark        |

Tailwind usage: `bg-red`, `text-dark`, `border-mid`, etc. (token names map directly.)

## Typography
- **Display**: **Oswald** (Google Fonts) — H1–H3, nav links, CTAs. Weights: 400, 500, 700. Tight tracking, uppercase for labels.
- **Body**: **Oxygen** (Google Fonts) — paragraphs, forms, microcopy. Weights: 300, 400, 700.
- Loaded via `next/font/google` in `app/layout.tsx` and exposed as `--font-display` / `--font-body` CSS variables.

## Directory Structure
```
biddle-shaw/
├── app/
│   ├── layout.tsx                  # Root layout — fonts, providers, Header, Footer
│   ├── page.tsx                    # Home (SSG)
│   ├── globals.css                 # Tailwind v4 entry + @theme tokens + base styles
│   └── services/, contact/, customer-service/, quote/, email-an-agent/   # All shipped. No additional routes planned (no /about, no /blog).
├── components/
│   ├── layout/
│   │   ├── UtilityBar.tsx          # Top strip — phone, hours, social
│   │   ├── Header.tsx              # Sticky logo + Nav + CTA shell
│   │   ├── Nav.tsx                 # Primary nav links + mobile drawer
│   │   └── Footer.tsx              # Contact, license, legal, sitemap
│   ├── sections/                   # Hero, Services, About, Reviews, etc.
│   ├── forms/                      # QuoteForm and field primitives
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx
│   └── ui/                         # Button, Card, Container, etc.
├── lib/                            # Utilities, hooks, content loaders
├── public/
│   └── images/                     # All raster assets as .webp
└── docs/obsidian-vault/            # This vault — single source of truth
```

## Rendering Strategy
- **Homepage & marketing pages**: Static (SSG) — generated at build time.
- **Blog (future)**: Incremental Static Regeneration (ISR), `revalidate` on a 1-hour window.
- **Forms (QuoteForm)**: Client component posting to a Route Handler under `app/api/`.
- **Smooth scroll**: Client-side only — `SmoothScrollProvider` is `"use client"` and wraps the app body in `layout.tsx`.

## Asset Rules
- **All raster images served as `.webp`.** No `.jpg`/`.png` in `/public/images/`.
- Use `next/image` for everything; `priority` only on the LCP image.

## Conventions
- One concern per component. No barrel files.
- TypeScript strict; no `any` outside third-party type gaps.
- Tailwind utilities only — no inline styles, no Bootstrap, no CSS modules unless animation-keyframe-bound.
- Client components require `"use client"` at the top and exist only when interactivity demands.

## Canonical Service Set
Seven services drive `<ServicesGrid>`, `<FancyServicesNav>`, `<QuoteForm>`, `<QuickQuoteSidebar>`, and `app/services/[slug]` (kept in lockstep across files):
1. Auto — slug `auto`
2. Home — slug `home`
3. Landlord Protection — slug `landlord-protection`
4. Condo — slug `condo` (`/images/condo-feat.webp`, added Phase 7+)
5. Renters — slug `renters`
6. Umbrella — slug `umbrella`
7. Commercial & Workers Comp — slug `commercial-workers-comp`

Adding a service touches: `components/home/ServicesGrid.tsx` (icon + slug), `components/services/FancyServicesNav.tsx` (panel entry + `PANEL_BG_BY_SLUG` re-alternation), `components/home/QuoteForm.tsx` (dropdown option), `components/forms/QuickQuoteSidebar.tsx` (same dropdown), and `app/services/[slug]/page.tsx` (`SERVICES` record + `SLUG_TO_NAV_LABEL`). The dynamic `[slug]` route with `generateStaticParams` + `dynamicParams = false` is the single template for every service detail page — no per-service `app/services/<slug>/page.tsx` files.

## External Embeds
- **AgentInsure live quoting portal** — embedded on `/quote` via `<iframe id="cpIframe">`.
  - URL: `https://www.agentinsure.com/compare/auto-insurance-home-insurance/bshawins/quote.aspx`
  - Account slug: `bshawins` (Biddle-Shaw's AgentInsure tenant). Update here if the slug ever changes.
  - Iframe attrs: `title="Secure Live Insurance Quoting"`, `height="1600"`, `width="100%"`, `border: 0`, `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`.
  - The portal handles its own line-of-business selection; do not pass our internal `?type=<slug>` into the iframe URL without confirming AgentInsure supports it.

## Related
- [[COMPONENTS]]
- [[PROGRESS]]
