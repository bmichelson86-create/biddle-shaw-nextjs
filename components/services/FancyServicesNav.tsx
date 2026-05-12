"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PANEL_BG = "#4a4a4a";
const PANEL_RED = "#a81010";
const PANEL_BG_BY_SLUG: Record<string, string> = {
  "auto": PANEL_RED,
  "home": PANEL_BG,
  "landlord-protection": PANEL_RED,
  "condo": PANEL_BG,
  "renters": PANEL_RED,
  "umbrella": PANEL_BG,
  "commercial-workers-comp": PANEL_RED,
};

type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    slug: "auto",
    title: "Auto",
    short: "Daily drivers, classics, and everything in between.",
    description:
      "Coverage built around how you actually drive — commuter, classic, or both. We compare carriers across California for liability, collision, comprehensive, and uninsured-motorist limits that fit your situation, and we write agreed-value policies for collector vehicles where they belong.",
    image: "/images/hero-1.webp",
  },
  {
    slug: "home",
    title: "Home",
    short: "Replacement-cost coverage for California realities.",
    description:
      "Home policies tuned to wildfire exposure, earthquake considerations, and rebuild costs that rarely match purchase price. We walk you through extended replacement cost, ordinance-or-law, water backup, and scheduled property — closing the gaps a base policy leaves open.",
    image: "/images/hero-2.webp",
  },
  {
    slug: "landlord-protection",
    title: "Landlord Protection",
    short: "DP-3 policies for single units and small portfolios.",
    description:
      "Built for tenant-occupied property: dwelling and other-structures coverage on a replacement-cost basis, premises liability sized for landlords, loss of rents while a covered claim is repaired, and optional vandalism and ordinance-or-law endorsements layered in where they make sense.",
    image: "/images/landlord-feat.webp",
  },
  {
    slug: "condo",
    title: "Condo",
    short: "Coverage for your unit where the HOA master policy stops.",
    description:
      "Coverage for your unit, personal property, and liability — filling the gaps your HOA master policy leaves behind. We customize limits for improvements, loss assessment, and temporary living expenses.",
    image: "/images/condo-feat.webp",
  },
  {
    slug: "renters",
    title: "Renters",
    short: "Cents-on-the-dollar protection for what you own.",
    description:
      "The most cost-effective policy most people will ever buy — belongings, liability, and additional living expenses if your unit becomes uninhabitable. We size limits to your actual life, not an arbitrary default, and most policies bind in under fifteen minutes.",
    image: "/images/renters-feat.webp",
  },
  {
    slug: "umbrella",
    title: "Umbrella",
    short: "An extra million when the base limits aren't enough.",
    description:
      "Umbrella coverage sits on top of your auto, home, and other underlying policies — kicking in when a serious claim exceeds those limits. We right-size it against your assets, income, and exposures, so one bad event doesn't put your savings or home at risk.",
    image: "/images/umbrella-feat.webp",
  },
  {
    slug: "commercial-workers-comp",
    title: "Commercial & Workers Comp",
    short: "BOPs, GL, commercial auto, and California-mandated WC.",
    description:
      "Coverage that scales with your operation: commercial general liability, business owners policies, commercial auto, and professional liability. Workers compensation written with payroll-aware classification so audit surprises don't cost you six figures at year end.",
    image: "/images/commerical-workers-comp-feat.webp",
  },
];

export default function FancyServicesNav() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const openFromHash = () => {
      const slug = window.location.hash.replace(/^#/, "");
      if (!slug) return;
      const idx = SERVICES.findIndex((s) => s.slug === slug);
      if (idx >= 0) setActiveIndex(idx);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex]);

  const close = () => {
    setActiveIndex(null);
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  const active = activeIndex !== null ? SERVICES[activeIndex] : null;

  return (
    <section
      aria-label="Insurance services"
      className="relative w-full overflow-hidden"
    >
      <ul
        className="
          flex flex-col
          min-[750px]:grid min-[750px]:grid-cols-2 min-[750px]:grid-rows-3
          min-[1400px]:grid-cols-7 min-[1400px]:grid-rows-1
          min-[1400px]:h-screen
        "
      >
        {SERVICES.map((service, i) => (
          <li
            key={service.slug}
            className="
              relative overflow-hidden
              h-[25vh] min-h-[180px]
              min-[750px]:h-[50vh] min-[750px]:min-h-0
              min-[1400px]:h-full
              border-b border-white last:border-b-0
              min-[750px]:[&:nth-child(odd)]:border-r min-[750px]:[&:nth-child(odd)]:border-white
              min-[1400px]:border-b-0 min-[1400px]:border-r min-[1400px]:border-white
              min-[1400px]:last:border-r-0
              group
            "
            style={{ backgroundColor: PANEL_BG_BY_SLUG[service.slug] ?? PANEL_BG }}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Open ${service.title} details`}
              className="
                relative w-full h-full text-left
                flex flex-col justify-between
                p-6 md:p-8
                text-white
                transition-transform duration-500 ease-out
                group-hover:scale-[1.01]
              "
            >
              <span
                aria-hidden
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-30
                  transition-opacity duration-500 ease-out
                  bg-cover bg-center
                "
                style={{ backgroundImage: `url(${service.image})` }}
              />

              <span className="relative z-10">
                <span className="block font-display uppercase tracking-wider text-2xl md:text-3xl leading-tight">
                  {service.title}
                </span>
                <span className="mt-3 block font-body text-sm md:text-base text-white/85 leading-snug max-w-xs">
                  {service.short}
                </span>
              </span>

              <span
                className="
                  relative z-10 self-start mt-4
                  inline-flex items-center gap-2
                  font-display uppercase tracking-wider text-xs md:text-sm
                  border border-white/70 px-4 py-2
                  transition-colors duration-300
                  group-hover:bg-white group-hover:text-black
                "
              >
                Get a Quote
                <span aria-hidden>→</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.slug}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fancy-nav-title"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-stretch overflow-hidden min-h-screen"
            style={{ backgroundColor: PANEL_BG }}
          >
            <motion.div
              key={`${active.slug}-image`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={active.image}
                alt=""
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </motion.div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col justify-center text-white">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="
                  absolute top-6 right-6 md:top-10 md:right-10
                  w-12 h-12 flex items-center justify-center
                  border border-white/70 text-white
                  hover:bg-white hover:text-black
                  transition-colors
                "
              >
                <span className="sr-only">Close</span>
                <span aria-hidden className="text-2xl leading-none">×</span>
              </button>

              <motion.h2
                id="fancy-nav-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display uppercase tracking-wider text-4xl md:text-6xl leading-tight"
                style={{ color: "#ffffff" }}
              >
                {active.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-2xl font-body text-base md:text-lg leading-relaxed"
                style={{ color: "#ffffff" }}
              >
                {active.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link
                  href={`/quote?type=${active.slug}`}
                  className="font-display uppercase tracking-wider text-sm md:text-base px-6 py-3 border border-white bg-transparent !text-white hover:bg-white hover:!text-[#4a4a4a] transition-colors"
                  style={{ borderRadius: 5 }}
                >
                  Get Instant Quote
                </Link>
                <Link
                  href={`/services/${active.slug}`}
                  className="font-display uppercase tracking-wider text-sm md:text-base px-6 py-3 border border-white bg-transparent !text-white hover:bg-white hover:!text-[#4a4a4a] transition-colors"
                  style={{ borderRadius: 5 }}
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
