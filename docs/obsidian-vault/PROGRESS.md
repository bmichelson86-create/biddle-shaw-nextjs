# Progress

## Phase 0 — Setup
- [x] Create project directory `biddle-shaw/`
- [x] Scaffold Next.js 14 (TS, Tailwind, App Router)
- [x] Install GSAP, @gsap/react, Lenis, Framer Motion
- [x] Create Obsidian vault at `docs/obsidian-vault/`
- [x] Configure brand tokens (Tailwind v4 `@theme` in `app/globals.css`)
- [x] Set up Lenis provider (`SmoothScrollProvider`)
- [x] Add fonts (Oswald display, Oxygen body via `next/font/google`)

## Phase 1 — Vault & Spec Authoring
- [x] Author `ARCHITECTURE.md` (stack, tokens, fonts, dir tree, rendering strategy)
- [x] Author `COMPONENTS.md` (full specs for layout + home sections)
- [x] Maintain vault as canonical source of truth (continuously updated)

## Phase 2 — Layout Shell
- [x] `<UtilityBar>` (phone, hours, social — `bg-darker`)
- [x] `<Header>` (white bg, text logo, address, sticky, scroll shadow)
- [x] `<Nav>` (desktop dropdown for Insurance Services, mobile drawer, light/dark theme prop)
- [x] `<Footer>` (4-col grid, real contact data, copyright 2026)

## Phase 3 — Home Page Sections
- [x] `<HeroCarousel>` — 3 slides, captions, arrows, auto-advance 5s, GSAP fade
- [x] `<QuoteForm>` — 9 coverage options, validation, red CTA
- [x] `<ServicesGrid>` — 6 cards `bg #353535`, GSAP ScrollTrigger stagger fade-up. **Mounted on home (`app/page.tsx`).**
- [x] `<FancyServicesNav>` — 6-panel viewport-height nav (React port of fancy-navigation-block), Framer Motion tab overlay with image + full description + quote CTAs. Now lives at `components/services/FancyServicesNav.tsx` and powers `/services` instead of the home page.
- [x] `<FeaturedServices>` — 3 blocks (Auto/Home/Commercial), red-bordered images, Read More float-right, Framer Motion hover lift
- [x] `<AboutSection>` — H1, agency copy, states served, `bg #eaeaea` sidebar quote form
- [x] `<Reviews>` — 5-slide carousel, avatars, 5/5 rating, Write/View Reviews CTAs *(just built — flag if further iteration needed)*

## Phase 4 — Inner Pages *(in progress)*
Scope narrowed: blog dropped; about story now lives in the home `<AboutSection>`. Remaining inner pages:
- [x] `/services/[slug]` detail pages — dynamic route, SSG via `generateStaticParams`, `dynamicParams = false`. 6 routes built: auto, home, landlord-protection, renters, umbrella, commercial-workers-comp. Each page: 340px hero banner (placeholder `/images/hero-1.webp`), breadcrumb (Home › Insurance Services › [name]), 2/3 main copy + 1/3 `<QuickQuoteSidebar>`. Service-specific 3-paragraph placeholder copy.
- [x] `/services` landing page — short heading + lede, then `<FancyServicesNav>` as the centerpiece (`app/services/page.tsx`). Header's Insurance Services dropdown now uses `/services#<slug>` anchors; FancyServicesNav reads the hash on mount + `hashchange` to auto-open the matching tab. Detail pages at `/services/<slug>` still exist and are reached via the overlay's "Learn More" CTA.
- [x] `/customer-service` page — H1 "Customer Service" (Oswald uppercase) + intro paragraph quoted from the legacy site, then a 4/8 two-column block. Left: `<aside>` "My Account" with 4 stacked rows (Get ID Cards / Request For Change / Make Payments / Get Certificates) using the `.service-card` global hover (red circle scales `1 → 28` over 0.35s ease-out from top-right corner; text/icon crossfade to white over 0.5s). Right: `<ClientPortalSignIn>` (`components/forms/ClientPortalSignIn.tsx`) — `bg #1a1a1a` panel, "Sign In to Client Center" title with a pulsing red dot, email + password fields with `#A81010` focus ring, red submit button, Forgot-password link, "or" divider, Google sign-in stub, and "Use the email address you gave your agent" footer. Auth handler is a placeholder — real backend (EZLynx or successor) still needs wiring.
- [x] `/contact` page (`app/contact/page.tsx`) — client component, two-column layout. Left: H1 "Contact Us" (Oswald uppercase 300), office address, two `tel:` phones in red, `mailto:` email, business hours (Mon–Fri 8:30am–5:30pm), Google Maps embed iframe. Right: `.contact-form` styled panel mirroring `.client-portal-form` (`bg #1a1a1a`, pulsing red dot title, floating-label fields, `#A81010` focus ring) with First/Last Name row, Email, Phone, Insurance Type select (canonical 6 options), Message textarea, "Send Message" submit (`bg #A81010`). Inline validation runs before submit; placeholder async handler (600ms) shows success message. Real form handler still TBD.
- [x] `/quote` page (`app/quote/page.tsx`) — server component. Breadcrumb (Home › Compare Quotes), H1 "Compare Quotes" (Oswald uppercase 300), security/confidentiality intro paragraph, then a full-width embedded `<iframe id="cpIframe" title="Secure Live Insurance Quoting">` pointing at AgentInsure's live quoting portal: `https://www.agentinsure.com/compare/auto-insurance-home-insurance/bshawins/quote.aspx` (height 1600px, width 100%, border 0, lazy-loaded). The page does not yet read the inbound `?type=<slug>` query param — AgentInsure handles line-of-business selection inside the embedded UI; routing the param into the iframe (or pre-selecting on landing) is a follow-up.

## Phase 5 — Animation & Polish *(complete)*
- [x] Audit all GSAP/Framer Motion timings for cohesion — three core motion surfaces aligned (page transitions, ServicesGrid stagger, Hero caption, FancyServicesNav overlay)
- [x] Add page-transition wrapper (Framer Motion) — `app/template.tsx`, `opacity 0/y 20 → opacity 1/y 0 → exit y -20`, `duration 0.35`, `ease [0.25, 0.1, 0.25, 1]`, full-width wrapper
- [x] `<ServicesGrid>` GSAP ScrollTrigger stagger — `fromTo({ opacity: 0, y: 50 } → { opacity: 1, y: 0 })`, `duration 0.6`, `power2.out`, `stagger 0.1`, `start "top 85%"`, `once: true`
- [x] `<HeroCarousel>` caption GSAP fade-up on slide change — `fromTo({ opacity: 0, y: 30 } → { opacity: 1, y: 0 })`, `duration 0.5`, `power2.out`, runs in `useEffect` keyed on slide index. Replaces prior Framer Motion `AnimatePresence` caption
- [x] `<FancyServicesNav>` overlay open/close — Framer Motion `AnimatePresence` + `motion.div` with `opacity + height: 0 → auto`, `duration 0.4`, `ease [0.25, 0.1, 0.25, 1]`, `overflow-hidden` wrapper
- [ ] Section-level scroll reveals (FadeIn, ScrollReveal wrappers)
- [ ] Reduced-motion handling (`prefers-reduced-motion`)
- [ ] Image optimization pass (sizes, priority, blur placeholders)
- [ ] SEO metadata per route
- [ ] Lighthouse target ≥ 95 across performance/accessibility/best-practices/SEO

## Phase 6 — Real Asset Replacement *(in progress)*
- [ ] Real hero images: `public/images/hero-1.webp`, `hero-2.webp`, `hero-3.webp` *(currently Unsplash placeholders)*
- [x] Service icon set — replaced with Lucide React icons in `<ServicesGrid>` (`Car`, `Home`, `Building2`, `Shield`, `Umbrella`, `Briefcase`) at 48px / `strokeWidth 1.5`, `#a81010` → white on `group-hover`. `ICONS_AVAILABLE` flag and `.webp` icon files retired.
- [ ] Featured service images: `public/images/{auto,home,commercial}-feat.webp` *(currently reusing hero images)*
- [x] `<FancyServicesNav>` real panel imagery for 4 of 6 panels — Landlord Protection (`/images/landlord-feat.webp`), Renters (`/images/renters-feat.webp`), Umbrella (`/images/umbrella-feat.webp`), Commercial & Workers Comp (`/images/commerical-workers-comp-feat.webp`). Auto and Home still use hero-1/hero-2 placeholders. Existing dark-overlay treatment (35% image opacity over `#4a4a4a` charcoal in expanded modal; 30% on collapsed-panel hover) applies uniformly across all 6 panels.
- [ ] Service banner images: `public/images/services/{auto,home,landlord-protection,renters,umbrella,commercial-workers-comp}.webp` *(currently all use `/images/hero-1.webp`)*
- [ ] Real Google Maps `cid` for "View All Reviews" / "Write a Review" links

## Phase 7.3 — Full Security & Bug Audit *(complete)*
**No CRITICAL findings.** TypeScript clean (`npx tsc --noEmit`); `npm run build` clean, 16 routes still prerender. Findings + fixes:

### WARNING — fixed
- **Dead Footer links**: `Footer.tsx` linked `/privacy` and `/terms`, but neither route exists in `app/`. Both would have 404'd in production. **Fix**: removed the bottom-strip `<ul>` entirely (kept the copyright line). Re-add once real legal copy has been written and reviewed — shipping stub "coming soon" pages would have looked worse than no link.
- **Footer "Insurance Services" column missing Condo**: Phase 7.1 added Condo across `<ServicesGrid>`, `<FancyServicesNav>`, `<QuoteForm>`, `<QuickQuoteSidebar>`, `/contact`, `/email-an-agent`, and `app/services/[slug]`, but the Footer's services list was skipped. **Fix**: added `{ label: "Condo Insurance", href: "/services/condo" }` between Landlord Protection and Renters.
- **`.gitignore` would have blocked `.env.example`**: rule `.env*` matched the placeholder file too, so a future `git init` + `git add .` would have excluded it. **Fix**: added `!.env.example` exception immediately below the `.env*` rule. (Repo isn't initialized as git yet — this was a latent bug.)

### INFO — flagged, intentionally not fixed
- **`<UtilityBar>` social links `href="#"`** (Facebook, LinkedIn, Instagram) — placeholders until the real social URLs are confirmed by the owner. Behavior on click is a no-op page-jump, not a 404. Leaving as-is per existing convention.
- **`<Reviews>` Maps URL `https://maps.google.com/?cid=biddleshaw`** — the `cid` value is a string placeholder; Google expects a numeric place ID. Already tracked in Phase 6 (`Real Google Maps cid for "View All Reviews" / "Write a Review" links`). External link is correctly attributed with `target="_blank" rel="noopener noreferrer"`.
- **Filename typo `commerical-workers-comp-feat.webp`** (missing the second "m") — both the asset on disk and every code reference use the same misspelling, so it works. Renaming would touch 3+ files and ARCHITECTURE.md/COMPONENTS.md without a functional benefit. Leaving as-is.
- **User-task slugs `/services/landlord` and `/services/commercial`** were named in the audit spec — the canonical slugs are `/services/landlord-protection` and `/services/commercial-workers-comp` (and have been since Phase 4). Both real slugs prerender in the build; the shorter slugs don't exist and were never referenced from code.

### Scans run (all clean)
- **Secrets / env audit** — `grep` for `sk-`, `api_key`, `apiKey`, `secret`, `password`, `token`, `NEXT_PUBLIC_`, `process.env` across `.ts/.tsx/.js/.json/.env`: only matches are the "Password" UI label in `ClientPortalSignIn.tsx` (no actual auth wired) and one `queue-microtask` URL in `package-lock.json`. No real env vars consumed in source; `.env.example` is placeholders only; no `.env` / `.env.local` / `.env.production` files exist on disk.
- **`console.*` audit** — zero `console.log`/`warn`/`error`/`info`/`debug` calls anywhere in `*.ts` / `*.tsx`.
- **External links audit** — 4 distinct external hosts: `https://maps.google.com/?cid=biddleshaw` (Reviews, placeholder), `https://www.google.com/maps?q=...&output=embed` (contact iframe), `https://www.agentinsure.com/compare/auto-insurance-home-insurance/bshawins/quote.aspx` (quote iframe), `https://www.biddleshaw.com` (JSON-LD `url` field), plus `https://schema.org` as `@context`. All `target="_blank"` anchors carry `rel="noopener noreferrer"`. No suspicious or unattributed URLs.
- **Form actions audit** — zero `action=` attributes; zero `fetch()` / `axios` calls; every form (`/contact`, `/email-an-agent`, `/customer-service` sign-in, `<QuoteForm>`, `<QuickQuoteSidebar>`) is UI-only with an `onSubmit` handler. No user data leaves the browser. Real backend integration remains a deferred Phase 7 item.
- **Route audit** — 7 page routes (`/`, `/contact`, `/customer-service`, `/email-an-agent`, `/quote`, `/services`, `/services/[slug]`) + 7 SSG slug params (auto, home, landlord-protection, condo, renters, umbrella, commercial-workers-comp) = 16 prerendered pages. Every `Link href` value in code maps to an existing route after the Footer fix.
- **`.map()` + `key` audit** — every list render uses a stable key (`item.href`, `item.label`, `slide.image`, `state`, `action.title`, `service.slug`, etc.). Two map paths use index keys for fully-static content (`service.paragraphs.map((p, i) => <p key={i}>`, `Array.from({length: 5}).map((_, i) => ...)` for star icons) — acceptable since order and length never change.
- **`alt` audit** — every `<Image>` carries an `alt` prop. Two intentional `alt=""` (FancyServicesNav backdrop, service hero banner) are decorative-image-correct (already documented in Phase 7).
- **`"use client"` audit** — all 16 files using hooks / Framer Motion / GSAP / browser APIs carry the directive at the top. No hydration-mismatch risk surfaced by the audit.
- **Image-asset audit** — every `/images/<file>.webp` reference in code (12 distinct paths) resolves to a real file in `public/images/`. No external image URLs in `<Image>` `src`. `public/images/icons/` directory is empty (Lucide replaced the bitmap icons in Phase 5/6) and is not referenced anywhere.

## Phase 7.2 — AEO FAQ Accordions on every service page *(complete)*
- [x] **`<FaqAccordion>`** (`components/ui/FaqAccordion.tsx`) — reusable client component, one-item-open-at-a-time, Framer Motion `AnimatePresence` height + opacity 0→auto/1 (0.3s, custom cubic). Container `border-t border-gray-200 mt-16`; items `border-b border-gray-200 py-4`; Oswald-uppercase 18px questions (`#353535`) with `+`/`−` indicator in `#a81010`; Oxygen 15px / 1.7 answers in `#4e4e4b`; "FREQUENTLY ASKED QUESTIONS" heading (Oswald 300, 32px, `#000`, `mb-8`).
- [x] **`lib/faqSchema.ts`** — `buildFaqJsonLd(items)` helper returning a `schema.org` `FAQPage` object. Imported by `app/services/[slug]/page.tsx` and injected via `<script type="application/ld+json" dangerouslySetInnerHTML={...}>` rendered inside the page body. Visible accordion + JSON-LD share the same `FaqItem[]` source on `SERVICES[slug].faqs`, so the two strings stay byte-identical by construction.
- [x] **FAQs authored for all 7 services** (4 each, 28 total). All answers follow AEO rules — direct answer in the first sentence, 40–60 words, and at least one answer per page mentions "San Francisco" or "California". Verbatim copy supplied by spec for: auto, home, landlord-protection, condo, renters, umbrella, commercial-workers-comp.
- [x] **Single-template wiring** — FAQ rendering lives in the existing `app/services/[slug]/page.tsx` (the canonical service detail template). When `SERVICES[slug].faqs` is present, the accordion + JSON-LD render below the main content; routes without `faqs` skip the block entirely. No per-service page files needed.
- [x] **Build verification** — `npx tsc --noEmit` clean; `npm run build` clean (Next 16.2.4, Turbopack), 16 routes prerendered as before (no new routes — FAQs are content additions to existing service detail pages). Dev probe of `/services/condo` confirmed visible "Frequently Asked Questions" heading + `FAQPage` JSON-LD payload + matching answer strings.

## Phase 7.1 — Condo Insurance added as a full service *(complete)*
- [x] **`<ServicesGrid>`** — 7th card "Condo Insurance" inserted between Landlord Protection and Renters; uses Lucide `Building` icon at 48px/`strokeWidth 1.5`, matching the existing red-at-rest / white-on-hover treatment. Grid bumped `lg:grid-cols-6` → `lg:grid-cols-7` so the row still fits on desktop without wrap.
- [x] **`<FancyServicesNav>`** — new "Condo" panel between Landlord Protection and Renters with `image: /images/condo-feat.webp`. `PANEL_BG_BY_SLUG` map re-alternated so the new sequence is auto=red / home=grey / landlord=red / **condo=grey** / renters=red / umbrella=grey / commercial=red. Desktop grid bumped `min-[1400px]:grid-cols-6` → `min-[1400px]:grid-cols-7`. The nth-child border-b-0 overrides on items 5/6 were removed (only `last:border-b-0` on item 7 now). Tablet (`min-[750px]`) still uses `grid-cols-2`; with 7 items the last row contains a single half-width orphan panel — accepted tradeoff, layout-wise.
- [x] **Service detail page** — Condo is added to the canonical `app/services/[slug]/page.tsx` dynamic route via the `SERVICES` record (and `SLUG_TO_NAV_LABEL`). It lives at `/services/condo` exactly like every other service detail page; no separate `app/services/condo/page.tsx` file (would have duplicated the template and diverged from the pattern). Adds an optional `heroImage` field to `ServiceContent` so condo uses `/images/condo-feat.webp` for its hero banner; other slugs continue to fall back to `/images/hero-1.webp`.
- [x] **Quote/contact dropdowns updated everywhere** — Condo Insurance inserted (between Landlord Protection and Renters) in `<QuoteForm>`, `<QuickQuoteSidebar>`, `app/contact/page.tsx`, and `app/email-an-agent/page.tsx`. Canonical option list is now 7 entries.
- [x] **Build verification** — `npx tsc --noEmit` clean; `npm run build` clean (Next 16.2.4, Turbopack). 16 routes prerendered (was 15), `/services/[slug]` SSG params now: auto, home, landlord-protection, **condo**, renters, umbrella, commercial-workers-comp.

## Phase 7.4 — GitHub Connected *(complete — 2026-05-12)*
- [x] **Safety scan** — `.gitignore` confirmed covering `.env*`, `node_modules`, `.next/`, `out/` (with `!.env.example` exception). Source grep for `sk-`, `apiKey`, `api_key`, `secret`, `password` clean — only match is the `<input type="password">` field placeholder in `ClientPortalSignIn.tsx`. No `.env` / `.env.local` / `.env.production` files exist on disk; nothing secret in tracked files.
- [x] **Repo pushed** — single squashed commit `Biddle-Shaw Next.js rebuild — Phases 1-9 complete` (54 files, 4463 insertions) on top of the original CNA scaffold. Branch renamed `master → main`. Remote `origin` → `https://github.com/bmichelson86-create/biddle-shaw-nextjs.git`. `git push -u origin main` succeeded; working tree clean; `.env*` files verified NOT in `git ls-files`.
- [x] **Build re-verified post-push** — `npx tsc --noEmit` clean; `npm run build` clean (Next 16.2.4, Turbopack); **16 static pages prerendered** (`/`, `/_not-found`, `/contact`, `/customer-service`, `/email-an-agent`, `/quote`, `/services`, `/services/[slug]` × 7: auto, home, landlord-protection, condo, renters, umbrella, commercial-workers-comp).
- **Status: ready for Vercel deployment.** Connect the GitHub repo in Vercel; framework auto-detects Next.js; no env vars required for first deploy.

## Phase 7 — QA + Launch *(complete — build is clean and ready for Vercel deployment)*
- [x] **LocalBusiness JSON-LD** — `app/layout.tsx` injects an `InsuranceAgency` schema.org block via `<script type="application/ld+json">` (name, url, telephone, email, full PostalAddress, `Mo-Fr 08:30-17:30`, `areaServed: [CA, AZ, CO, NV, TX]`, `priceRange: "$$"`).
- [x] **Mobile responsive QA at 320 / 375 / 768** — verified: `<ServicesGrid>` `grid-cols-2 md:grid-cols-3 lg:grid-cols-6`; `<FeaturedServices>` and `<AboutSection>` collapse to single column under `md`; `<Footer>` is `md:grid-cols-4` (single column on mobile); `<QuoteForm>` `flex-col md:flex-row` (full-width stack on mobile); `/email-an-agent`, `/contact`, and `/customer-service` all `lg:grid-cols-*` with single-column mobile fallback. Fixed: `<HeroCarousel>` caption now scales `text-[28px] sm:text-[32px] md:text-[60px]` with matching `leading-[34px] sm:leading-[38px] md:leading-[65px]` (the previous fixed `lineHeight: 65px` overflowed on 320px).
- [x] **Lighthouse perf prep** — `next/font/google` (Oswald + Oxygen) with `display: swap`; `<Image>` everywhere with LCP-only `priority` on `HeroCarousel` slide 0 (per ARCHITECTURE.md "priority only on the LCP image"); no `loading="eager"` on below-fold images; `export const viewport` exposes `width=device-width, initial-scale=1`; remaining `alt=""` instances are intentional (decorative backdrops on `FancyServicesNav` and `/services/[slug]` hero banner).
- [x] **Vercel deploy prep** — `next.config.ts` carries only `allowedDevOrigins: ["192.168.1.94"]` (dev-only, harmless in prod); no `localhost` URLs anywhere in source; `package.json` has `build: next build` and `start: next start`; AgentInsure iframe still uses the canonical absolute URL `https://www.agentinsure.com/compare/auto-insurance-home-insurance/bshawins/quote.aspx`; `.env.example` added (placeholders only — no env vars are actually consumed today).
- [x] **Build verification** — `npx tsc --noEmit` clean; `npm run build` clean (Next 16.2.4, Turbopack), originally 15 routes prerendered (`/`, `/_not-found`, `/contact`, `/customer-service`, `/email-an-agent`, `/quote`, `/services`, `/services/[slug]` × 6: auto, home, landlord-protection, renters, umbrella, commercial-workers-comp). After Phase 7.1, the count is 16 — `/services/condo` added.
- [ ] Cross-browser QA (Chrome, Safari, Firefox, mobile Safari, Chrome Android) — manual pass deferred to post-deploy
- [ ] Accessibility audit (axe, keyboard nav, screen reader pass) — manual pass deferred to post-deploy
- [ ] Real form handler (`/api/quote`) — backend integration deferred (forms remain UI-only)
- [ ] Analytics (provider TBD) — placeholder env vars listed in `.env.example`
- [ ] Domain DNS → `biddleshaw.com` — owner action
- [ ] Deploy to Vercel — owner action; project is build-clean and ready

## Install Commands (reference)
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
npm install gsap @gsap/react lenis framer-motion
```

## Session Notes
- About section copy finalized (3 paragraphs + states-served line) in `components/home/AboutSection.tsx`. Extended `/about` page no longer needed — story lives on home.
- `<QuickQuoteSidebar>` extracted to `components/forms/QuickQuoteSidebar.tsx` and reused by `<AboutSection>` and every `/services/[slug]` page. Service detail pages pre-select the slug as `defaultType`.
- Service banner currently uses `/images/hero-1.webp` placeholder for all 6 routes. Real assets pending at `public/images/services/{slug}.webp`.
- Blog removed from `<Header>` nav items and `<Footer>` company column. `/blog` route dropped from Phase 4 scope.
- Header background confirmed `#ffffff` (white). Initial `bg-dark` spec was overridden once the text logo was introduced — subtitle would have been invisible on dark.
- All brand colors confirmed against master.css token set: `--color-red #A81010`, `--color-dark #353535`, `--color-darker #222222`, `--color-mid #4c4c4c`, `--color-text #4e4e4b`, `--color-light #eaeaea`. Defined once in Tailwind v4 `@theme` block in `app/globals.css`.
- Hero images currently use Unsplash placeholders (converted to `.webp` via `sharp`, q=82). Real photography pending.
- Service icons currently render as gray placeholder squares; toggle by dropping the 6 `.webp` files into `public/images/icons/` and flipping `ICONS_AVAILABLE` in `ServicesGrid.tsx`.
- Featured service cards reuse hero images as placeholders pending dedicated `-feat.webp` assets.

## SESSION 2026-05-07 — Customer Service & Utility Bar Polish
- ✅ `/customer-service` mobile layout fixed — two-column grid now collapses to `grid-cols-1` on mobile, both cards full-width (`.client-portal-form` `max-width: 350px` gated to `min-width: 768px`, `width: 100%` on mobile), chevron decorations contained with `overflow-hidden` on `.service-card`.
- ✅ `<AboutSection>` — "ABOUT US" eyebrow label added to left column above the H1 (red `#A81010`, Oswald uppercase, `text-sm tracking-widest`, `font-weight: 300`); removed from any header position. GSAP ScrollTrigger staggered text scroll reveal implemented (`opacity 0 → 1`, `y: 40 → 0`, `0.15s` stagger, `start: "top 80%"`, `scrub: false`, `once: true`) wired with `useRef` + `useEffect` + `gsap.context`.
- ✅ "About Us" nav item removed from `Nav.tsx` entirely (canonical nav is now Home / Insurance Services / Customer Service / Contact Us — see `Header.tsx` `NAV_ITEMS`).
- ✅ `/about` page and directory deleted — no redirect (route 404s naturally; no `app/about/` directory existed at session start, confirmed gone).
- ✅ "About Us" quick link removed from `Footer.tsx` Company column.
- ✅ `<UtilityBar>` — "Email an Agent" link added to the left side alongside phone and hours, `href="https://www.biddleshaw.com/email-an-agent.html"`, opens in new tab (`target="_blank"`, `rel="noopener noreferrer"`).
- ✅ `<UtilityBar>` — "Email an Agent" styled with text-stroke reveal animation: white outline at rest (`color: transparent` + `-webkit-text-stroke: 1px rgba(255,255,255,0.9)`), `#A81010` red fill reveal on hover via `.hoverText` width `0% → 100%` over `0.5s cubic-bezier(0.6,0,0.4,1)`, with red `border-right: 4px` caret and red `drop-shadow(0 0 6px)` glow. Implemented in `components/layout/UtilityBar.module.css`. Previous `.bubbles` block removed from `globals.css`.
- ✅ Phone + hours text colors normalized to white in the utility bar (parent container now `text-white`; the `text-light/50` muted hours override removed).

## Next Steps (carried forward)
- [x] `app/template.tsx` page transitions (Framer Motion fade + slide) — DONE (y:20 → 0 → -20, 0.35s, custom cubic-bezier `[0.25, 0.1, 0.25, 1]`)
- [x] GSAP ScrollTrigger stagger on `<ServicesGrid>` — DONE (y:50 → 0, 0.6s, 0.1s stagger, "top 85%", once)
- [x] Replace placeholder icons in `<ServicesGrid>` — DONE via Lucide React (`Car`, `Home`, `Building2`, `Shield`, `Umbrella`, `Briefcase`)
- [ ] Real hero images for `<FancyServicesNav>` panels — NOT YET DONE (panels currently show large centered Lucide icon at 80px / `#a81010` as a placeholder visual; same icon mapping as `<ServicesGrid>`)
- [x] Mobile responsive QA at 320px / 375px / 768px — DONE (HeroCarousel caption fluid, all section grids verified collapsing single-column under `md`)
- [ ] Lighthouse audit, target 90+ mobile — deferred to post-deploy (perf prerequisites in place)
- [x] LocalBusiness JSON-LD structured data — DONE (injected via `<head>` script in `app/layout.tsx`)
- [ ] Vercel deployment — owner action; project is build-clean and ready
- [ ] AgentInsure admin — fix "Serro" typo in their portal — NOT YET DONE (external)

## Related
- [[ARCHITECTURE]]
- [[COMPONENTS]]
