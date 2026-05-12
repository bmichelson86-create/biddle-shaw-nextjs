"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Review = {
  name: string;
  text: string;
};

const REVIEWS: Review[] = [
  {
    name: "Maria G.",
    text: "Biddle-Shaw shopped four carriers in a single afternoon and saved us nearly $600 a year on our auto and home bundle. Honest, fast, and easy to work with.",
  },
  {
    name: "James P.",
    text: "Switched our small construction company over and finally feel like we have a broker who actually picks up the phone. Renewals have been painless ever since.",
  },
  {
    name: "Lila R.",
    text: "I was anxious about getting my first homeowners policy. They walked me through every line item and made sure I understood what I was paying for. Highly recommend.",
  },
  {
    name: "Devon S.",
    text: "Quick quote, clear comparison, no upsell. Got better coverage on our condo for less than what we were paying. Refreshing experience.",
  },
  {
    name: "Aisha N.",
    text: "Filed our first claim through them last spring — handled with care and resolved without surprises. Exactly what you want from an insurance partner.",
  },
];

const TOTAL_REVIEWS = 12;
const AUTO_ADVANCE_MS = 6000;

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    const total = REVIEWS.length;
    setIndex(((next % total) + total) % total);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => goTo(index + 1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, goTo]);

  const review = REVIEWS[index];

  return (
    <section
      className="bg-white w-full py-16 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2
          className="font-display uppercase text-center"
          style={{ color: "#000000", fontSize: "44px", fontWeight: 300 }}
        >
          What Our Clients Say
        </h2>

        <div className="mt-4 flex items-center justify-center gap-3 font-body text-sm">
          <div aria-label="5 out of 5 stars" className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} aria-hidden style={{ color: "#A81010" }}>
                ★
              </span>
            ))}
          </div>
          <span className="text-text">
            5/5 · {TOTAL_REVIEWS} reviews
          </span>
        </div>

        <div className="relative mt-10 mx-auto max-w-3xl min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center text-center px-12"
            >
              <div
                aria-hidden
                className="w-20 h-20 rounded-full flex items-center justify-center font-display text-dark text-xl"
                style={{ backgroundColor: "#eaeaea" }}
              >
                {initials(review.name)}
              </div>
              <h3 className="mt-5 font-display uppercase text-dark text-xl tracking-wider">
                {review.name}
              </h3>
              <p
                className="mt-4 font-body leading-relaxed max-w-prose"
                style={{ color: "#4e4e4b", fontSize: "16px" }}
              >
                “{review.text}”
              </p>
            </motion.article>
          </AnimatePresence>

          <button
            type="button"
            aria-label="Previous review"
            onClick={() => goTo(index - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-light/60 hover:bg-light text-dark transition-colors"
          >
            <span aria-hidden className="text-2xl leading-none">‹</span>
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => goTo(index + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-light/60 hover:bg-light text-dark transition-colors"
          >
            <span aria-hidden className="text-2xl leading-none">›</span>
          </button>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="https://maps.google.com/?cid=biddleshaw"
            className="font-display uppercase tracking-wider text-white px-6 py-3 transition-colors"
            style={{ backgroundColor: "#A81010", borderRadius: 5 }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#8f0e0e")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#A81010")
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Write a Review
          </a>
          <a
            href="https://maps.google.com/?cid=biddleshaw"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display uppercase tracking-wider text-dark hover:text-red transition-colors"
          >
            View All Reviews →
          </a>
        </div>
      </div>
    </section>
  );
}
