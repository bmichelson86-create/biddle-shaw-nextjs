"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Nav, { type NavItem } from "./Nav";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Insurance Services", href: "/services" },
  { label: "Customer Service", href: "/customer-service" },
  { label: "Contact Us", href: "/contact" },
];

const ADDRESS = ["301 Junipero Serra Blvd., Suite 204", "San Francisco, CA 94127"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-light transition-shadow ${
        scrolled ? "shadow-md shadow-black/10" : ""
      }`}
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-8">
        <Link
          href="/"
          aria-label="Biddle-Shaw Insurance Services home"
          className="flex flex-col leading-none font-display"
        >
          <span
            className="uppercase tracking-wider"
            style={{ color: "#A81010", fontSize: "32px", fontWeight: 500 }}
          >
            BIDDLE-SHAW
          </span>
          <span
            className="italic"
            style={{ color: "#353535", fontSize: "22px", fontWeight: 300 }}
          >
            Insurance Services, Inc.
          </span>
          <span className="block md:hidden text-[12px] text-[#666666] font-normal mt-0.5 not-italic font-body">
            Mon–Fri  8:30am – 5:30pm
          </span>
        </Link>

        <address
          className="hidden lg:block not-italic font-body text-sm leading-snug text-right"
          style={{ color: "#353535" }}
        >
          {ADDRESS.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </address>

        <Nav items={NAV_ITEMS} theme="light" />

        <Link
          href="/quote"
          className="hidden md:inline-block bg-red text-light font-display uppercase tracking-wider text-sm px-5 py-2.5 hover:bg-red/90 transition-colors"
        >
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
