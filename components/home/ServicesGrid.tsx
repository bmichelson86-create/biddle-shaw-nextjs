"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Car,
  Home,
  Building2,
  Building,
  Shield,
  Umbrella,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Service = {
  title: string;
  slug: string;
  Icon: LucideIcon;
};

const SERVICES: Service[] = [
  { title: "Auto Insurance", slug: "auto", Icon: Car },
  { title: "Home Insurance", slug: "home", Icon: Home },
  {
    title: "Landlord Protection",
    slug: "landlord-protection",
    Icon: Building2,
  },
  {
    title: "Condo Insurance",
    slug: "condo",
    Icon: Building,
  },
  {
    title: "Renters Insurance",
    slug: "renters",
    Icon: Shield,
  },
  {
    title: "Umbrella Insurance",
    slug: "umbrella",
    Icon: Umbrella,
  },
  {
    title: "Commercial & Workers Comp",
    slug: "commercial-workers-comp",
    Icon: Briefcase,
  },
];

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".services-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, root);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
        {SERVICES.map((service, i) => {
          const { Icon } = service;
          const isLast = i === SERVICES.length - 1;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`services-card group flex flex-row items-center justify-start text-left py-4 px-6 md:flex-col md:items-center md:justify-center md:text-center md:py-[25px] md:px-[20px] transition-colors hover:bg-darker ${
                isLast ? "" : "border-b border-[#1a1a1a] md:border-b-0 md:border-r md:border-r-[#1a1a1a]"
              }`}
              style={{ backgroundColor: "#353535" }}
            >
              <div className="flex items-center justify-center text-[#a81010] group-hover:text-white transition-colors duration-300 flex-shrink-0 mr-4 md:mr-0 md:mb-4 md:w-16 md:h-16">
                <Icon
                  className="w-8 h-8 md:w-12 md:h-12"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
              <h3 className="font-display uppercase text-white text-base md:text-lg tracking-wider leading-snug">
                {service.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
