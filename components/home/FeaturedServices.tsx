"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Feature = {
  title: string;
  href: string;
  description: string;
  image: string;
};

// Real assets will live at /images/{auto,home,commercial}-feat.webp.
// Until then, fall back to the hero images.
const FEATURES: Feature[] = [
  {
    title: "Auto Insurance",
    href: "/services/auto",
    description:
      "Coverage that keeps you moving — from daily commuters to weekend road trips. Compare California carriers in one stop.",
    image: "/images/auto-feat.webp",
  },
  {
    title: "Home Insurance",
    href: "/services/home",
    description:
      "Protect the place that matters most. Tailored homeowner policies with coverage for property, liability, and belongings.",
    image: "/images/home-feat.webp",
  },
  {
    title: "Commercial Insurance",
    href: "/services/commercial-workers-comp",
    description:
      "Business-grade protection for owners, operators, and contractors across San Francisco and the Bay Area.",
    image: "/images/commercial-feat.webp",
  },
];

export default function FeaturedServices() {
  return (
    <section className="w-full py-16 md:py-24" style={{ backgroundColor: "#4c4c4c" }}>
      <div className="mx-auto max-w-7xl px-6">
        <h2
          className="font-display uppercase text-center text-white"
          style={{ fontSize: "40px", fontWeight: 300 }}
        >
          Our Insurance Services
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((item) => (
            <motion.article
              key={item.href}
              whileHover={{ y: -4 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              className="flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{ border: "3px solid #A81010" }}
                />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 pt-5">
                <h3 className="font-display uppercase text-white text-2xl md:text-3xl font-bold tracking-wide">
                  {item.title}
                </h3>
                <p className="font-body text-white/85 text-sm md:text-base leading-relaxed mt-3">
                  {item.description}
                </p>
                <div className="mt-auto pt-5 flow-root">
                  <Link
                    href={item.href}
                    className="float-right font-body uppercase text-white text-sm tracking-wider transition-colors hover:underline"
                    style={{ textDecorationColor: "#f51818" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#f51818")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#ffffff")
                    }
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
