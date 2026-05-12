"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-gray-200 mt-16">
      <h2
        className="font-display uppercase mb-8 mt-12"
        style={{ fontWeight: 300, fontSize: 32, color: "#000000" }}
      >
        Frequently Asked Questions
      </h2>

      <ul role="list">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;
          return (
            <li
              key={item.question}
              className="border-b border-gray-200 py-4"
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex justify-between items-center text-left font-display uppercase cursor-pointer"
                style={{ fontSize: 18, color: "#353535" }}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  style={{
                    color: "#a81010",
                    fontSize: 24,
                    lineHeight: 1,
                    marginLeft: 16,
                  }}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="font-body pt-3 pb-2"
                      style={{
                        color: "#4e4e4b",
                        fontSize: 15,
                        lineHeight: 1.7,
                      }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
