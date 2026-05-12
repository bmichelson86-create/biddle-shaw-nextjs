"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuickQuoteSidebar from "@/components/forms/QuickQuoteSidebar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATES = ["California", "Arizona", "Colorado", "Nevada", "Texas"];

export default function AboutSection() {
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = leftRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            scrub: false,
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
    <section className="bg-white w-full py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        <div ref={leftRef} className="md:col-span-2">
          <p
            data-reveal
            className="font-display uppercase text-red text-sm tracking-widest mb-4"
            style={{ fontWeight: 300 }}
          >
            About Us
          </p>

          <h1
            data-reveal
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-left"
            style={{ color: "#000000", fontWeight: 300 }}
          >
            Insurance Agency in San Francisco, CA | Biddle-Shaw Insurance
            Services, Inc.
          </h1>

          <div className="mt-8 space-y-5 font-body text-text text-base leading-relaxed">
            <p data-reveal>
              Biddle-Shaw Insurance Services is an independent brokerage built
              to give Bay Area families and businesses straightforward,
              competitive coverage. We work for our clients — not a single
              carrier — which means we shop the market on your behalf and
              recommend the policy that actually fits your situation.
            </p>
            <p data-reveal>
              Our team is dedicated to excellence in every interaction: clear
              explanations, honest comparisons, and responsive service when
              life happens. From your first quote through every renewal and
              claim, we stay engaged so you never have to wonder where your
              coverage stands.
            </p>
            <p data-reveal>
              Contact us today to talk through your needs. Whether you're
              insuring a first car, a growing business, or a portfolio of
              properties, we'll put together options that make sense and
              answer every question along the way.
            </p>
            <p data-reveal>
              <span className="font-display uppercase tracking-wider text-dark">
                States served:
              </span>{" "}
              {STATES.map((state, i) => (
                <span key={state}>
                  <strong className="font-bold text-dark">{state}</strong>
                  {i < STATES.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="md:col-span-1">
          <QuickQuoteSidebar idPrefix="about" />
        </div>
      </div>
    </section>
  );
}
