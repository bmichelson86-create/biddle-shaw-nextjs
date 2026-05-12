# Components

> Single source of truth for props, styling, and behavior. Tokens defined in [[ARCHITECTURE]].

---

## Layout

### `<UtilityBar>`
- **File**: `components/layout/UtilityBar.tsx`
- **Purpose**: Thin top strip above Header — phone, hours, social.
- **Props**: none (content static via constants).
- **Background**: `bg-darker` (`#222222`)
- **Text**: `text-light/80`, font `font-body`, size `text-xs`, tracking-wide.
- **Layout**: Flex row, `justify-between`, `h-9`, container-padded. Hidden below `md` (mobile collapses to header only).
- **Left group** (gap-6, no `/` separator): phone (`tel:` link) → hours (`text-light/50` muted span) → "Email an Agent" pill button (see below).
- **"Email an Agent" stroke-reveal link** (CSS module: `components/layout/UtilityBar.module.css`, classes `.strokeBtn`, `.actualText`, `.hoverText`):
  - Anchor: `next/link` `<Link href="/email-an-agent">` (internal route — opens in the same tab; the previous external `https://www.biddleshaw.com/email-an-agent.html` + `target="_blank"` is retired now that the route exists locally). Two stacked spans, each containing `&nbsp;Email an Agent&nbsp;`: `.actualText` (the resting outlined label) and `.hoverText` (the wipe-in red overlay, `aria-hidden`).
  - CSS variables on `.strokeBtn`: `--border-right: 4px`, `--text-stroke-color: rgba(255, 255, 255, 0.9)`, `--animation-color: #a81010`, `--fs-size: 13px`.
  - Typography: `font-family: inherit` (Oxygen body), `font-size: var(--fs-size)`, `letter-spacing: 2px`, `text-transform: uppercase`, `line-height: 1`.
  - Resting state: `color: transparent` with `-webkit-text-stroke: 1px var(--text-stroke-color)` — text reads as a thin white outline. No background or border on the anchor itself.
  - `.hoverText`: absolutely positioned over `.actualText`, `width: 0%`, `overflow: hidden`, `white-space: nowrap`, with `color: var(--animation-color)`, `-webkit-text-stroke: 1px var(--animation-color)`, `border-right: var(--border-right) solid var(--animation-color)`, `filter: drop-shadow(0 0 6px var(--animation-color))`. Width transitions `0% → 100%` over `0.5s cubic-bezier(0.6, 0, 0.4, 1)` on `:hover` / `:focus-visible`, sweeping a glowing red copy of the label across the button left-to-right with a trailing red caret. `prefers-reduced-motion` disables the transition.
  - The previous `.bubbles` block has been removed from `app/globals.css` — utility-bar styles now live entirely in the CSS module.
- **Right group** (gap-5, `/` separators): Facebook / LinkedIn / Instagram social links.
- **Behavior**: Static; no animation. `tel:`, external, and `mailto:` links use `text-red` on hover.

### `<Header>`
- **File**: `components/layout/Header.tsx`
- **Purpose**: Sticky brand bar — logo, `<Nav>`, primary CTA.
- **Props**: none.
- **Background**: `#ffffff` (white), border-bottom `border-light`.
- **Logo**: Text-only (no image). Two-line stacked, left-aligned:
  - Line 1: `BIDDLE-SHAW` — Oswald, `32px`, `font-weight: 500`, color `#A81010`, uppercase, tracking-wider.
  - Line 2: `Insurance Services, Inc.` — Oswald italic, `22px`, `font-weight: 300`, color `#353535`.
- **Address (lg+ only)**: Two stacked lines, body font, `text-sm`, color `#353535`, right-aligned, sits between logo and Nav.
  - `301 Junipero Serra Blvd., Suite 204`
  - `San Francisco, CA 94127`
- **Nav**: Receives `theme="light"` so links render dark on white.
- **CTA**: "Get a Quote" — `bg-red text-light font-display uppercase tracking-wider px-5 py-2.5 hover:bg-red/90`.
- **Layout**: `sticky top-0 z-40`, `h-16 md:h-20`, container-padded, flex row.
- **Behavior**: Adds shadow on scroll past 8px (Framer Motion `useScroll`).

### `<Nav>`
- **File**: `components/layout/Nav.tsx`
- **Purpose**: Primary navigation links + dropdown + mobile drawer.
- **Props**: `items: NavItem[]`, `theme?: "light" | "dark"` (default `"dark"`). `NavItem = { label: string; href: string; children?: { label: string; href: string }[] }`. Light theme renders link text + hamburger in `text-dark`/`bg-dark`; dark theme renders them in `text-light`/`bg-light`.
- **Items (canonical)**:
  1. `Home` → `/`
  2. `Insurance Services` → `/services` *(direct link, no dropdown)* — clicking goes straight to the `/services` landing page where `<FancyServicesNav>` is the centerpiece. Per-service entry points are inside that page (panel click opens the inline tab); detail pages at `/services/<slug>` remain reachable via the overlay's "Learn More" CTA and via direct URL.
  3. `Customer Service` → `/customer-service`
  4. `Contact Us` → `/contact`
- **About Us**: Removed from the canonical nav. There is no `/about` route — the agency story lives in the home page's `<AboutSection>` only. `/about` 404s naturally; no redirect is wired.
- **Desktop**: Inline flex row, `font-display uppercase text-sm tracking-wider`, gap-8, `text-light` → `text-red` on hover, underline-offset-4 on active route. The component still supports a hover/focus dropdown (`bg-dark border border-mid`) for any item that supplies `children`, but **no current item does** — Insurance Services is now a flat link, so no chevron is rendered and no dropdown opens.
- **Mobile**: Hamburger button (visible `<md`) opens a partial-width slide drawer + dimmed backdrop. Wrapped in `AnimatePresence` so exit animations play on close.
  - **Backdrop**: `fixed inset-0 z-40`, `backgroundColor: rgba(0, 0, 0, 0.5)`, opacity fade (`0 → 1`, `duration 0.3`, `ease [0.25, 0.1, 0.25, 1]`). Clicking it closes the drawer (same effect as the X button).
  - **Drawer panel**: `fixed top-0 right-0 z-50`, `width: 80vw` capped to `max-width: 320px`, `height: 100vh`, `backgroundColor: #353535`. Slides in from the right via Framer Motion `initial={{ x: "100%" }} → animate={{ x: 0 }} → exit={{ x: "100%" }}`, `duration 0.3`, `ease [0.25, 0.1, 0.25, 1]`. `role="dialog"` + `aria-modal="true"`.
  - **Links inside drawer**: Stack vertically full-width, Oswald uppercase `text-2xl tracking-wider`, white. Active route renders in `#a81010` (inline style, beats the global hover/transition rules). Each link closes the drawer on click. Items with `children` keep their inline `+/−` collapsible expander.
  - **Close X**: top-right corner of the drawer, `text-3xl text-light`.
  - **Body scroll lock + Escape-to-close** still wired via the existing `useEffect` keyed on `drawerOpen`.
- **Behavior**: Active route via `usePathname()`. ESC closes drawer/dropdown. Body scroll locked while drawer open. Dropdown closes on outside click and on link navigation.

### `<MobileEmailTab>`
- **File**: `components/layout/MobileEmailTab.tsx`
- **Purpose**: Always-visible vertical "EMAIL AN AGENT" tab pinned to the right edge of the viewport on mobile only — gives small-screen visitors a one-tap path to `/email-an-agent` without depending on the hamburger drawer or the (mobile-hidden) UtilityBar.
- **Mount**: Rendered once in `app/layout.tsx`, inside `<SmoothScrollProvider>` after `<Footer />`, so it appears on every route.
- **Visibility**: `className="md:hidden"` — desktop is fully unaffected.
- **Position**: `fixed; bottom: 20px; right: 16px`, `z-index: 45` (sits below the mobile nav drawer at `z-50` / its `z-40` backdrop). Anchored to the bottom-right floating-action corner — replaces the previous vertical right-edge tab; all `writing-mode`, `text-orientation`, and `rotate(180deg)` styling has been removed.
- **Surface**: solid `bg #a81010`, `color: #ffffff`, `padding: 12px 18px`, `border-radius: 4px`, `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4)` for lift off the page.
- **Layout**: `className="md:hidden flex items-center"` — flex row so the icon and label sit on a single horizontal baseline.
- **Icon**: Lucide `Mail` at `size={14}`, `aria-hidden`, `margin-right: 6px` — paired with the label.
- **Label**: "Email an Agent" rendered horizontally in Oswald (`font-display`), `text-transform: uppercase`, `font-size: 13px`, `font-weight: 700`, `letter-spacing: 2px`.
- **Link**: `next/link` `<Link href="/email-an-agent">`, `aria-label="Email an Agent"` for screen readers.
- **Behavior**: Pure link — no state, no JS handlers. Fires the App Router's `template.tsx` page transition like any other internal navigation.

### `<Footer>`
- **File**: `components/layout/Footer.tsx`
- **Purpose**: Site-wide footer — contact block, services links, legal.
- **Props**: none.
- **Background**: `bg-darker` with thin `border-t border-mid`.
- **Text**: `text-light/70`, body font, `text-sm`.
- **Layout**: 4-column grid on `md+` (Brand | Services | Company | Contact), single column on mobile. Bottom strip with copyright + privacy/terms links, `border-t border-mid/50 mt-12 pt-6`.
- **Company column links**: Customer Service, Contact Us. (No "About Us" link — `/about` does not exist.)
- **Heading style**: `font-display uppercase text-light text-xs tracking-widest` per column.
- **Canonical contact data**:
  - **Address**: 301 Junipero Serra Blvd., Suite 204, San Francisco, CA 94127
  - **Email**: info@biddleshaw.com
  - **Phone**: 415-586-7200 / 415-586-2500
  - **Copyright**: © 2026 Biddle-Shaw Insurance Services, Inc. All Rights Reserved

---

## Sections

### `<HeroCarousel>`
- **File**: `components/home/HeroCarousel.tsx`
- **Purpose**: Full-width home hero with rotating slides + caption overlay.
- **Props**: `slides: { image: string; caption: string; alt?: string }[]`
- **Container**: Full-width, `h-[500px]`, `relative overflow-hidden`. Images cover the slide (`object-cover`).
- **Default images**: `/images/hero-1.webp`, `/images/hero-2.webp`, `/images/hero-3.webp` (3 slides).
- **Caption box**: `position: absolute; top: 80px; left: 0`, background `rgba(53, 53, 53, 0.4)`, `box-shadow: 1px 2px 2px #353535`, padding `5px 5px 5px 20px`, width `57%` on `md+` / `90%` on mobile.
- **Caption text (H2)**: Oswald, **60px on `md+`, 32px on mobile**, `font-weight: 300`, `color: #ffffff`, `text-transform: uppercase`, `line-height: 65px`, `text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8)`.
- **Controls**: Left/right arrow buttons, vertically centered, `w-12 h-12`, semi-transparent dark background, white chevron, hover bumps opacity. Hidden on small screens? — visible at all widths per spec.
- **Behavior**:
  - Auto-advance every **5s**, pause on hover or while user has focus inside the carousel.
  - **GSAP** handles slide transitions: cross-fade (opacity 0 ↔ 1, 0.7s, `power2.out`) between absolutely-stacked slides.
  - **GSAP** also handles the caption: on each slide-index change, a `useEffect` runs `gsap.fromTo(captionRef, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })`. Replaces the previous Framer Motion `AnimatePresence` caption — caption is now a plain `<div ref={captionRef}>` whose content updates by index while GSAP drives the fade-up. Auto-advance and arrow controls unaffected.
- **Accessibility**: Arrow buttons labeled "Previous slide" / "Next slide". Container `role="region"` with `aria-roledescription="carousel"`. Each slide image has descriptive `alt`.

### `<QuoteForm>`
- **File**: `components/home/QuoteForm.tsx`
- **Purpose**: Compact line-of-business selector that routes to the quote page.
- **Props**: none.
- **Section background**: `#ffffff`, full width, padded vertically (`py-16 md:py-20`).
- **Heading**: `font-display` "Looking to SAVE on your INSURANCE POLICIES?" — Oswald, large, color `text-dark`. Emphasis words ("SAVE", "INSURANCE POLICIES") rendered in `text-red`.
- **Sub-heading**: `font-display` "Get a QUOTE NOW!" — Oswald, smaller, "QUOTE NOW!" in `text-red`.
- **Select dropdown** (Oxygen body font): options match the canonical 7-item service list — Auto (incl. Classic Car), Home, Landlord Protection, Condo Insurance, Renters, Umbrella, Commercial & Workers Compensation. Default placeholder "Select coverage type".
- **Button**: "Get Instant California Insurance Quotes" — background `#A81010`, hover `#8f0e0e`, color `#ffffff`, `border-radius: 5px`, Oswald uppercase tracking-wider.
- **Layout**: Inline row on `md+` (select grows, button right). **Mobile: stacks vertically** with full-width select then full-width button.
- **Behavior**: Client component. On submit with no selection → inline error message (`text-red text-sm`) below field, plus `aria-invalid` on select. On valid submit → `router.push('/quote?type=<slug>')`.

### `<FancyServicesNav>`
- **File**: `components/services/FancyServicesNav.tsx`
- **Purpose**: Centerpiece of `/services`. Seven-panel "fancy navigation" block (React conversion of nat-davydova's fancy-navigation-block) — each panel teases a service and opens a full-viewport tab overlay with image, full description, and quote CTAs. **Not used on home** (home retains `<ServicesGrid>`).
- **Props**: none (services list is internal, mirrors the canonical 7-item set).
- **Services (canonical, ordered)**: Auto, Home, Landlord Protection, Condo, Renters, Umbrella, Commercial & Workers Comp.
- **Per-panel imagery (`SERVICES[].image`)**: Drives both the collapsed-panel hover backdrop (30% opacity) and the expanded-modal backdrop (35% opacity). Real assets in place for 5 of 7 panels (Phase 6):
  - `auto` → `/images/hero-1.webp` *(placeholder)*
  - `home` → `/images/hero-2.webp` *(placeholder)*
  - `landlord-protection` → `/images/landlord-feat.webp`
  - `condo` → `/images/condo-feat.webp`
  - `renters` → `/images/renters-feat.webp`
  - `umbrella` → `/images/umbrella-feat.webp`
  - `commercial-workers-comp` → `/images/commerical-workers-comp-feat.webp`
  Dark overlay treatment is uniform across all 7 panels — backdrop is `#4a4a4a` charcoal in the modal, image rendered with `next/image` `fill` + `objectFit: cover` at the documented opacity. White text overrides on heading/description/CTAs are unchanged.
- **Collapsed panel backgrounds (alternating red / charcoal)**: The closed grid panels alternate between brand red and charcoal grey, slug-keyed via the `PANEL_BG_BY_SLUG` map at the top of the file:
  - `auto` → `#a81010` (red)
  - `home` → `#4a4a4a` (charcoal)
  - `landlord-protection` → `#a81010` (red)
  - `condo` → `#4a4a4a` (charcoal)
  - `renters` → `#a81010` (red)
  - `umbrella` → `#4a4a4a` (charcoal)
  - `commercial-workers-comp` → `#a81010` (red)
  Constants: `PANEL_RED = "#a81010"`, `PANEL_BG = "#4a4a4a"`. Title and tagline remain `text-white` on every panel regardless of background.
- **Expanded overlay background (unchanged)**: Stays uniform `#4a4a4a` charcoal — the alternating red/charcoal pattern lives only on the closed grid. Overlay text and CTA color rules below are unaffected.
- **Borders**: `border-white` between panels (bottom on mobile, right between columns on tablet, right between columns on desktop).
- **Layout**:
  - Mobile (default): vertical stack, each panel `h-[25vh]` with `min-h-[180px]`.
  - Tablet (`min-[750px]`): `grid-cols-2`, each panel `h-[50vh]`. With 7 panels the last row contains a single half-width orphan panel; the explicit nth-child border-b-0 overrides on items 5/6 were removed so only `last:border-b-0` (item 7) drops its bottom rule.
  - Desktop (`min-[1400px]`): `grid-cols-7 grid-rows-1`, section is `h-screen`, each panel fills full height.
- **Panel content**: Service title (Oswald uppercase, large, `text-white`), short tagline (Oxygen, `text-white/85`), and a `Get a Quote →` outline button. **No icons appear in `<FancyServicesNav>`** — the Lucide centered-icon placeholder has been removed; icons live exclusively in `<ServicesGrid>`. Hover reveals the faint hero background image (`opacity 30%`) and a subtle scale (`1.01`).
- **Tab overlay (open state)**: Fixed full-viewport panel (`fixed inset-0 z-50 min-h-screen overflow-hidden`), accent background matching the source panel, service image as a low-opacity backdrop (35%). Body scroll locked while open.
  - **Open/close transition**: Framer Motion `AnimatePresence` + `motion.div` with `initial={{ opacity: 0, height: 0 }}` → `animate={{ opacity: 1, height: "auto" }}` → `exit={{ opacity: 0, height: 0 }}`, `transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}`. The wrapper carries `overflow-hidden` so the height collapse reads cleanly without inner content spilling during the animation.
  - **Image transition**: Framer Motion fade + slight scale (`scale 1.04 → 1`, `0.5s`, custom cubic).
  - **Content stagger**: H2 → description → CTA group, each `y: 24 → 0` with delays `0.10s / 0.18s / 0.26s` (Framer Motion, replacing the original SCSS transitions).
  - **Overlay text colors**: Heading, description, and CTA labels are `#ffffff` on the `#4a4a4a` charcoal background. **Explicit overrides required** because `app/globals.css` sets `h1–h6 { color: var(--color-dark) }` and `body { color: var(--color-text) }` (so `<p>` inherits dark by default). Implementation: `<motion.h2>` (the title) and `<motion.p>` (the description) carry `style={{ color: "#ffffff" }}` inline to beat the element-level globals; the two CTA `<Link>` anchors use Tailwind's important-prefixed `!text-white` plus `hover:!text-[#4a4a4a]` so the hover color override survives any inherited rule. Do not rely on inheritance — every text node in this overlay forces white explicitly.
  - **CTAs (matched outline pair)**: Both `Get Instant Quote` (→ `/quote?type=<slug>`) and `Learn More` (→ `/services/<slug>`) render as identical outline buttons — `border-white`, `text-white`, `bg-transparent`, `border-radius: 5px`, Oswald uppercase tracking-wider. Hover fills the button white and switches the label to `#4a4a4a`. Replaces the prior asymmetric pair (white-pill primary + outline secondary).
  - **Close**: top-right `×` button, plus `Escape` key.
- **Accessibility**: Each panel is a `<button>` with `aria-label="Open <Title> details"`. Overlay is `role="dialog" aria-modal="true"` with `aria-labelledby` pointing at the H2. Focus visible via default browser ring; Escape closes.
- **Conversion notes (vs. original)**: Pug → JSX; SCSS classList toggling → React `useState<number | null>(activeIndex)`; CSS keyframe transitions → Framer Motion `AnimatePresence`. No external JS — all interactivity through React state.
- **Hash deep-linking**: On mount and on `hashchange`, the component reads `window.location.hash` and opens the matching slug's tab. This is what lets the Header's `Insurance Services` dropdown items (`/services#auto`, etc.) land users directly inside the open tab. Closing the overlay clears the hash via `history.replaceState` so re-clicking the same anchor reopens cleanly.

### `<ServicesGrid>`
- **File**: `components/home/ServicesGrid.tsx`
- **Purpose**: Top-level service category cards row.
- **Props**: none (services list is internal).
- **Services (canonical, ordered)**: Auto Insurance, Home Insurance, Landlord Protection, Condo Insurance, Renters Insurance, Umbrella Insurance, Commercial & Workers Comp.
- **Icons**: Lucide React (`lucide-react`) — `Car` (Auto), `Home` (Home), `Building2` (Landlord Protection), `Building` (Condo), `Shield` (Renters), `Umbrella` (Umbrella), `Briefcase` (Commercial & Workers Comp). Rendered at `width={48}` `height={48}` with `strokeWidth={1.5}`. Wrapped in a `flex items-center justify-center` div carrying `text-[#a81010] group-hover:text-white transition-colors duration-300` — icon is brand red at rest, fades to white on card hover. Card has `group` className so the wrapper picks up the hover. Replaces the prior `.webp` icon files + gray-square fallback (legacy `/public/images/icons/` assets and `ICONS_AVAILABLE` flag are no longer used).
- **Layout**: 7 columns on `lg+`, 3 columns on `md`, 2 columns on mobile. No gap (cards meet flush).
- **Card**: `background: #353535`, `padding: 25px 20px 10px`, `border-right: 1px solid #1a1a1a` (omitted on last card with `last:border-r-0`). Whole card is a link to `/services/<slug>`.
- **Card content**: Icon centered (square ~64px), H3 below — Oswald, uppercase, white, centered.
- **Behavior**: GSAP ScrollTrigger — cards stagger fade-up via `gsap.fromTo` (`{ opacity: 0, y: 50 } → { opacity: 1, y: 0 }`, `duration: 0.6`, `ease: "power2.out"`, `stagger: 0.1`) when section enters viewport. ScrollTrigger: `start: "top 85%"`, `once: true`. Cards selected via `gsap.utils.toArray(".services-card")`.
- **Lifecycle (App Router-safe)**: Implemented with a plain `useEffect` (not `useGSAP`) that wraps tween creation in `gsap.context(..., sectionRef.current)` and returns `() => ctx.revert()` so every ScrollTrigger this component creates is killed on unmount — including on client-side route changes back to `/`. After tween creation a `setTimeout(() => ScrollTrigger.refresh(), 100)` defers position recalculation past the Next.js page-transition fade so triggers latch onto final scroll positions, not transient values during the `template.tsx` enter animation. The cleanup also clears the timer. Fixes a bug where returning to `/` from another route left a stale ScrollTrigger pinning scroll at the grid until hard refresh. We do **not** call `ScrollTrigger.getAll().forEach(t => t.kill())` — `ctx.revert()` scopes the kill to this component only, leaving `<AboutSection>`'s trigger intact.

### `<AboutSection>`
- **File**: `components/home/AboutSection.tsx`
- **Purpose**: Agency intro copy + quick-quote sidebar.
- **Props**: none (canonical content, internal).
- **Section background**: `#ffffff`, full width, padded vertically.
- **Layout**: 2/3 main content left, 1/3 sidebar right on `md+` (`md:grid-cols-3` with main spanning 2). **Mobile: single column, sidebar below content.**
- **Eyebrow**: "About Us" — Oswald, uppercase, `text-sm tracking-widest`, `font-weight: 300`, color `text-red` (`#A81010`), sits directly above the H1 inside the left column. There is no top-of-section "ABOUT US" header — the eyebrow only lives in the left column.
- **H1**: "Insurance Agency in San Francisco, CA | Biddle-Shaw Insurance Services, Inc." — Oswald, `font-weight: 300`, left-aligned, color `#000000`.
- **Body paragraphs (Oxygen)**: Agency purpose, dedication to excellence, contact us today.
- **States served line**: California, Arizona, Colorado, Nevada, Texas — bolded inline.
- **Left-column scroll reveal**: Client component (`"use client"`). On scroll-in, GSAP ScrollTrigger fades + slides up each `[data-reveal]` element in the left column, in source order: eyebrow → H1 → each body paragraph → States Served line. `gsap.fromTo({ opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.15 })`. ScrollTrigger config: `trigger: leftColumn`, `start: "top 80%"`, `scrub: false`, `once: true`. Wired via `useRef` + `useEffect` with `gsap.context(..., root)` and `() => ctx.revert()` cleanup. After tween creation a `setTimeout(() => ScrollTrigger.refresh(), 100)` re-measures positions once the route transition has settled (matches the same App Router-safe lifecycle pattern used in `<ServicesGrid>`). Right sidebar (`<QuickQuoteSidebar>`) is unaffected.
- **Sidebar**: `background: #eaeaea`, `padding: 10px 10px 20px`. Contains:
  - H2 "Get A Quote" — Oswald, `40px`, `font-weight: 300`, `text-dark`.
  - Quick-quote `<select>` with the same canonical 6 coverage options as `<QuoteForm>` (Auto incl. Classic Car, Home, Landlord Protection, Renters, Umbrella, Commercial & Workers Compensation).
  - Submit button: `bg #A81010`, white text, Oswald uppercase, `border-radius: 5px`, full-width within sidebar.
- **Behavior**: Sidebar form mirrors `<QuoteForm>` validation + routing (`router.push('/quote?type=<slug>')`).

### `<FeaturedServices>`
- **File**: `components/home/FeaturedServices.tsx`
- **Purpose**: 3 marquee services side-by-side (Auto, Home, Commercial).
- **Props**: none (items canonical, internal).
- **Section background**: `#4c4c4c` (`bg-mid`), full width, padded vertically.
- **Section heading**: "OUR INSURANCE SERVICES" — Oswald, `40px`, color `#ffffff`, `font-weight: 300`, centered.
- **Items**: Auto → `/services/auto`, Home → `/services/home`, Commercial → `/services/commercial-workers-comp`. The Commercial card's "Read More" previously pointed at `/services/commercial`, which 404s — the canonical slug for this service across `<Nav>`, `<FancyServicesNav>`, `<ServicesGrid>`, and the `app/services/[slug]` `generateStaticParams` keys is `commercial-workers-comp`. Real images at `public/images/{auto,home,commercial}-feat.webp`; **fall back to `/images/hero-{1,2,3}.webp` while assets pending**.
- **Card**:
  - Image top, `border: 3px solid #A81010`, `aspect-[4/3]`, `object-cover`.
  - Heading: Oswald, white, bold, large.
  - Description: Oxygen body, white, short paragraph.
  - "Read More" link: white, uppercase, **float right** at card bottom, hover underline color `#f51818`.
- **Layout**: `grid-cols-3` on `md+`, single column on mobile.
- **Behavior**: Framer Motion `whileHover={{ y: -4 }}` lift on each card.

### `<Reviews>`
- **File**: `components/home/Reviews.tsx`
- **Purpose**: Single-card testimonial carousel.
- **Used on**: home (`app/page.tsx`) and `/contact` (`app/contact/page.tsx`, rendered below the contact form/map block inside the page section, wrapped in `mt-16` for breathing room). Same component imported in both places — no per-page variants.
- **Props**: none (5 reviews canonical, internal).
- **Section background**: `#ffffff`, full width, padded vertically.
- **Section heading**: "WHAT OUR CLIENTS SAY" — Oswald, `44px`, `font-weight: 300`, color `#000000`, centered.
- **Rating row** (centered, below heading): 5 filled stars in `#A81010` + text "5/5 · 12 reviews".
- **Carousel**: One review visible at a time, full width, mobile single column.
  - **Avatar**: 80px circle, `background: #eaeaea`, centered initials in `text-dark` Oswald.
  - **Client name**: Oswald, uppercase, centered, `text-dark`.
  - **Review text**: Oxygen, `16px`, color `#4e4e4b`, centered, max-prose width.
- **Controls**: Left/right arrow buttons (same style as `<HeroCarousel>`), auto-advance every **6s**, pause on hover/focus.
- **Transitions**: Framer Motion — current slide fades + slides horizontally on index change (`opacity 0, x: 20` → `opacity 1, x: 0`, `exit x: -20`), 0.4s.
- **CTAs (centered, below carousel)**:
  - Primary button "Write a Review" → `bg #A81010`, white, Oswald uppercase, `border-radius: 5`.
  - Text link "View All Reviews" → `https://maps.google.com/?cid=biddleshaw` (`target="_blank"`, `rel="noopener noreferrer"`), Oswald uppercase, color `text-dark`, hover `text-red`.

---

---

## Pages

### `/customer-service` (`app/customer-service/page.tsx`)
- **Purpose**: Self-service hub modeled on the legacy `biddleshaw.com/customer-service.html` — H1, intro paragraph (lifted verbatim from the live site: "Please use our customer service center to view your insurance policies, print insurance ID cards, update your contact information, download documents, and more."), then a two-column block.
- **Layout**: `lg:grid-cols-12` — `<aside>` spans 4, EZLynx portal column spans 8. Single column under `lg`.
- **Left column ("My Account")**: `bg #222222` heading strip, then 4 stacked rows on `bg #353535`. Each row is a `<Link>` with the `.service-card` class (icon + Oswald uppercase title + chevron, divided by `border-mid/40`). On hover the global `.service-card::before` pseudo (40px circle, top-right corner) scales `1 → 28` over **0.35s ease-out**, sweeping `#A81010` across the row; text/icon crossfade to white over **0.5s ease-out**. Items: Get ID Cards, Request For Change, Make Payments, Get Certificates — each linked to `/contact?topic=…` placeholders.
- **Right column ("Client Portal sign-in")**: `<ClientPortalSignIn>` (`components/forms/ClientPortalSignIn.tsx`). Replaces the earlier EZLynx iframe.
  - **Container**: `.client-portal-form` — flex column, gap `10px`, `width: 100%` (fills column on mobile), `max-width: 350px` only at `min-width: 768px` (so the card stretches full-width when it stacks under `lg`), padding `20px`, `border-radius: 20px`, `bg #1a1a1a`, white text, `1px solid #333` border.
  - **Title** (`.form-title`): "Sign In to Client Center", Oswald 22px/600, color `#A81010`, with two stacked `::before`/`::after` 16px circles parked at `left: 0` (the `::after` runs the `pulse` keyframes — `scale 0.9 → 1.8`, `opacity 1 → 0`, 1s linear infinite). `prefers-reduced-motion` halts the animation.
  - **Fields**: floating-label pattern — `<label><input required placeholder=" "/><span>Label</span></label>`. Inputs are `bg #333`, white, `border-radius: 10px`, `padding: 20px 5px 5px 10px`. The `<span>` label sits inside the input, dropping to `top: 12.5px` while `:placeholder-shown`, snapping back to `top: 0`, `0.7em`, `font-weight: 600`, `color #A81010` when `:focus` or `:valid` (so a filled field keeps the label aloft). Two fields: Email Address + Password.
  - **Submit** (`.submit-btn`): full-width, `bg #A81010` → hover `#8f0e0e`, `border-radius: 10px`, Oswald uppercase, letter-spacing `1px`. Disabled while submitting (600ms placeholder; real auth handler TBD).
  - **Forgot link** (`.forgot-link`): right-aligned, 13px, `#A81010`, hover underline. Links to `/contact?topic=password-reset`.
  - **Divider** (`.divider`): plain centered "or", `rgba(255,255,255,0.4)`, 13px (no rule lines — just the label).
  - **Google button** (`.google-btn`): transparent fill, `1px solid #555` → hover `#A81010`, multi-color Google G inline SVG + "Sign in with Google". Stub (no OAuth wired).
  - **Helper text** (`.helper-text`): centered, 13px, `rgba(255,255,255,0.6)` — "Use the email address you gave your agent".
  - **Class names are exactly as supplied** (no BEM `__` underscore variant) so the provided CSS reference matches 1:1.
- **Notes vs. legacy site**: Legacy lists `View Policies / Print ID Cards / Add Driver` and has no portal embed. This rebuild keeps the canonical 4-action set on the left and replaces the right column with our own sign-in surface.

### `/email-an-agent` (`app/email-an-agent/page.tsx`)
- **Purpose**: Local destination for the UtilityBar's "Email an Agent" link, replacing the previous external `biddleshaw.com/email-an-agent.html` jump. Client component.
- **Layout**: H1 "EMAIL AN AGENT" (Oswald uppercase 300, `#000000`) above a 2-column grid (`lg:grid-cols-2`, single column under `lg`).
- **Left column**: Intro paragraph — "Prefer to reach out directly? Send us a message and one of our agents will get back to you promptly." Followed by stacked contact blocks with eyebrow labels (Oswald uppercase, `text-xs tracking-widest`, `text-dark/70`):
  - **Phone**: `415-586-7200` as `tel:+14155867200`, `text-red`.
  - **Address**: 301 Junipero Serra Blvd., Suite 204, San Francisco, CA 94127.
  - **Hours**: Mon–Fri 8:30am – 5:30pm.
- **Right column**: `.contact-form` panel (reuses the global `app/globals.css` `.contact-form` styling shared with `/contact`) with floating-label fields:
  - Full Name (required)
  - Email Address (required, regex-validated)
  - Phone Number (optional)
  - Insurance Type (`<select>` with the canonical 6 options — Auto incl. Classic Car, Home, Landlord Protection, Renters, Umbrella, Commercial & Workers Compensation)
  - Message textarea (required)
- **Submit button**: `bg-[#a81010] hover:bg-[#8f0e0e] text-white font-display uppercase tracking-wider px-6 py-3`, `border-radius: 5px`. Disabled while submitting.
- **Behavior**: UI-only — no backend handler wired. On valid submit, 600ms placeholder delay, then a `role="status"` success message: **"Thank you! An agent will be in touch shortly."** Form state resets after success. Inline `.err` messages on invalid required fields.

### `<FaqAccordion>`
- **File**: `components/ui/FaqAccordion.tsx`
- **Purpose**: Reusable accordion for AEO-optimized FAQ blocks on service detail pages. Renders the visible Q&A list that pairs 1:1 with the page's `FAQPage` JSON-LD payload.
- **Props**: `items: { question: string; answer: string }[]` (exported as `FaqItem`).
- **Behavior**: One item open at a time — click an open item to close it. Tracked by `useState<number | null>(openIndex)`.
- **Animation**: Framer Motion `AnimatePresence` + `motion.div` `height: 0 → auto` and `opacity: 0 → 1`, `duration 0.3`, `ease [0.25, 0.1, 0.25, 1]`. Outer `motion.div` carries `overflow: hidden` so the height collapse reads cleanly.
- **Layout**:
  - Container: `border-t border-gray-200 mt-16`.
  - Section heading: "FREQUENTLY ASKED QUESTIONS" — Oswald uppercase, `font-weight: 300`, `font-size: 32px`, `color: #000000`, `mb-8 mt-12`.
  - Each item (`<li>`): `border-b border-gray-200 py-4`.
  - Question button: `flex justify-between items-center` row, full-width, Oswald uppercase, `font-size: 18px`, `color: #353535`, `cursor-pointer`, with `aria-expanded` / `aria-controls` pointing at the panel.
  - Open/close indicator: `+` (closed) / `−` (open), `color: #a81010`, `font-size: 24px`, `lineHeight: 1`, `marginLeft: 16`, `aria-hidden`.
  - Answer panel: `role="region"` with `aria-labelledby` referencing the button id. Inner `<p>` is Oxygen body, `color: #4e4e4b`, `font-size: 15px`, `line-height: 1.7`, `pt-3 pb-2`.
- **AEO contract**: The exact string passed in `items[i].answer` must match the corresponding `acceptedAnswer.text` value in the page's `FAQPage` JSON-LD (generated by `lib/faqSchema.ts`). Edit them as a pair — never one without the other.
- **Where used**: Rendered conditionally at the bottom of `app/services/[slug]/page.tsx` when the slug's `SERVICES[slug].faqs` array is present. All 7 services currently ship 4 FAQs each.

### `lib/faqSchema.ts`
- **File**: `lib/faqSchema.ts`
- **Purpose**: Server-side helper that builds a `schema.org` `FAQPage` JSON-LD object from a `FaqItem[]`. Imported by service pages and injected via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(items)) }} />` inside the rendered page body.
- **Export**: `buildFaqJsonLd(items: FaqItem[])` → `{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } }, ...] }`.
- **Pairing rule**: This helper is the only place that emits answer text into JSON-LD. As long as both the visible accordion and the schema script consume the same `FaqItem[]` from `SERVICES[slug].faqs`, the two stay byte-identical automatically.

## Primitives (forthcoming — not in this build phase)
### `<Button>` `<Card>` `<Container>`

## Page Transitions

### `app/template.tsx` (active)
- **File**: `app/template.tsx`
- **Purpose**: Subtle fade + slide-up on every route change. Next.js App Router remounts `template.tsx` on each navigation (unlike `layout.tsx`, which persists), so a single `motion.div` wrapper around `{children}` is enough — no explicit `AnimatePresence` needed at this boundary.
- **Animation**: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` → `exit={{ opacity: 0, y: -20 }}`, `duration: 0.35`, `ease: [0.25, 0.1, 0.25, 1]` (custom cubic-bezier).
- **Layout**: `motion.div` wraps `{children}` with `style={{ width: "100%" }}` so the transition wrapper never collapses or shifts the page.
- **Scope**: Wraps every page rendered through the root layout (i.e., everything under `app/`). Does **not** animate sub-route layouts independently — there is one global page transition.
- **Why a template, not a layout edit**: keeping `app/layout.tsx` untouched means `<SmoothScrollProvider>`, `<UtilityBar>`, `<Header>`, and `<Footer>` do **not** flicker between routes — only the page body fades.
- **Reduced motion**: Framer Motion respects `prefers-reduced-motion` automatically when `MotionConfig reducedMotion="user"` is set globally. **Not yet wired** — Phase 5 task.

## Providers

### `<SmoothScrollProvider>`
- **File**: `components/providers/SmoothScrollProvider.tsx`
- **Purpose**: Mounts Lenis smooth-scroll for the whole tree and keeps it in sync with GSAP ScrollTrigger so trigger positions stay correct as the page scrolls and after layout/route changes.
- **Lenis options**: `duration: 1.1`, easing `t => Math.min(1, 1.001 - 2^(-10t))`, `smoothWheel: true`. Driven by a single `requestAnimationFrame` loop calling `lenis.raf(time)`.
- **ScrollTrigger sync**:
  - `lenis.on("scroll", ScrollTrigger.update)` — every smooth-scroll tick advances ScrollTrigger so Lenis-driven position stays the source of truth.
  - `ScrollTrigger.addEventListener("refresh", () => lenis.resize())` — when any component calls `ScrollTrigger.refresh()` (e.g., the deferred refresh inside `<ServicesGrid>` / `<AboutSection>`), Lenis re-measures the document height in lockstep, preventing the "stuck at ServicesGrid until hard refresh" symptom that appeared after returning to `/` from another route.
- **Cleanup on unmount**: cancels the RAF, removes the `refresh` listener, calls `lenis.off("scroll", ...)`, and `lenis.destroy()`.

## Animation Wrappers (forthcoming)
### `<FadeIn>` — Framer Motion `whileInView`
### `<ScrollReveal>` — GSAP ScrollTrigger

## Related
- [[ARCHITECTURE]]
- [[PROGRESS]]
