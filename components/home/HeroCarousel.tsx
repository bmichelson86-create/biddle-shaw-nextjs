"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

export type HeroSlide = {
  image: string;
  caption: string;
  alt?: string;
};

const AUTO_ADVANCE_MS = 5000;
const FADE_DURATION = 0.7;

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndex = useRef(0);
  const captionRef = useRef<HTMLDivElement | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const total = slides.length;
      const normalized = ((next % total) + total) % total;
      setIndex(normalized);
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = window.setTimeout(() => goTo(index + 1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, goTo, slides.length]);

  useEffect(() => {
    const outgoing = slideRefs.current[prevIndex.current];
    const incoming = slideRefs.current[index];
    if (!incoming) return;

    if (outgoing && outgoing !== incoming) {
      gsap.to(outgoing, {
        opacity: 0,
        duration: FADE_DURATION,
        ease: "power2.out",
      });
    }
    gsap.fromTo(
      incoming,
      { opacity: outgoing && outgoing !== incoming ? 0 : 1 },
      { opacity: 1, duration: FADE_DURATION, ease: "power2.out" },
    );
    prevIndex.current = index;
  }, [index]);

  useEffect(() => {
    if (!captionRef.current) return;
    gsap.fromTo(
      captionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );
  }, [index]);

  if (!slides.length) return null;

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      className="relative w-full h-[500px] overflow-hidden bg-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          ref={(el) => {
            slideRefs.current[i] = el;
          }}
          aria-hidden={i !== index}
          className="absolute inset-0"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt={slide.alt ?? slide.caption}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={captionRef}
          className="absolute left-0 w-[90%] md:w-[57%]"
          style={{
            top: "80px",
            backgroundColor: "rgba(53, 53, 53, 0.4)",
            boxShadow: "1px 2px 2px #353535",
            padding: "5px 5px 5px 20px",
          }}
        >
          <h2
            className="font-display uppercase text-[28px] sm:text-[32px] md:text-[60px] leading-[34px] sm:leading-[38px] md:leading-[65px]"
            style={{
              fontWeight: 300,
              color: "#ffffff",
              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.8)",
            }}
          >
            {slides[index].caption}
          </h2>
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-dark/50 hover:bg-dark/80 text-white transition-colors pointer-events-auto"
      >
        <span aria-hidden className="text-2xl leading-none">‹</span>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-dark/50 hover:bg-dark/80 text-white transition-colors pointer-events-auto"
      >
        <span aria-hidden className="text-2xl leading-none">›</span>
      </button>
    </section>
  );
}
