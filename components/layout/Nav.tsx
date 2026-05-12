"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export default function Nav({
  items,
  theme = "dark",
}: {
  items: NavItem[];
  theme?: "light" | "dark";
}) {
  const baseText = theme === "light" ? "text-dark" : "text-light";
  const burgerColor = theme === "light" ? "bg-dark" : "bg-light";
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setOpenMenu(null);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div ref={navRef} className="hidden md:block">
        <ul className={`flex items-center gap-8 font-display uppercase text-sm tracking-wider ${baseText}`}>
          {items.map((item) => {
            const hasChildren = !!item.children?.length;
            const active = isActive(item.href);
            const menuOpen = openMenu === item.label;

            if (!hasChildren) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition-colors hover:text-red ${
                      active ? "text-red underline underline-offset-4" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  onFocus={() => setOpenMenu(item.label)}
                  onClick={() => setOpenMenu(menuOpen ? null : item.label)}
                  className={`flex items-center gap-1.5 transition-colors hover:text-red ${
                    active ? "text-red" : ""
                  }`}
                >
                  {item.label}
                  <span aria-hidden className="text-[0.7em] leading-none">
                    ▾
                  </span>
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      role="menu"
                      className="absolute left-0 top-full pt-3 min-w-[240px]"
                    >
                      <div className="bg-dark border border-mid py-2">
                        {item.children!.map((c) => (
                          <li key={c.href} role="none">
                            <Link
                              role="menuitem"
                              href={c.href}
                              onClick={() => setOpenMenu(null)}
                              className="block px-5 py-2.5 text-light hover:text-red transition-colors"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </div>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={drawerOpen}
        onClick={() => setDrawerOpen(true)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
      >
        <span className={`block w-6 h-px ${burgerColor}`} />
        <span className={`block w-6 h-px ${burgerColor}`} />
        <span className={`block w-6 h-px ${burgerColor}`} />
      </button>

      <AnimatePresence>
        {drawerOpen && (
          <div className="md:hidden" key="drawer-portal">
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => {
                setDrawerOpen(false);
                setExpandedMobile(null);
              }}
              aria-hidden
              className="fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            />
            <motion.div
              key="drawer-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 z-50 flex flex-col w-[80vw] max-w-[320px]"
              style={{ height: "100vh", backgroundColor: "#353535" }}
            >
              <div className="flex justify-end p-6">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => {
                    setDrawerOpen(false);
                    setExpandedMobile(null);
                  }}
                  className="text-light text-3xl leading-none"
                >
                  ×
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto flex flex-col items-stretch px-8 pb-12 gap-2 font-display uppercase text-2xl tracking-wider text-white">
                {items.map((item) => {
                  const hasChildren = !!item.children?.length;
                  const expanded = expandedMobile === item.label;
                  const active = isActive(item.href);

                  return (
                    <li key={item.href} className="border-b border-mid/40">
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={() => {
                            setDrawerOpen(false);
                            setExpandedMobile(null);
                          }}
                          className="flex-1 py-4 transition-colors hover:text-red"
                          style={active ? { color: "#a81010" } : undefined}
                        >
                          {item.label}
                        </Link>
                        {hasChildren && (
                          <button
                            type="button"
                            aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                            aria-expanded={expanded}
                            onClick={() =>
                              setExpandedMobile(expanded ? null : item.label)
                            }
                            className="px-4 py-4 text-white/70"
                          >
                            {expanded ? "−" : "+"}
                          </button>
                        )}
                      </div>
                      {hasChildren && expanded && (
                        <ul className="pb-4 pl-2 flex flex-col gap-1 text-base normal-case tracking-normal font-body">
                          {item.children!.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={() => {
                                  setDrawerOpen(false);
                                  setExpandedMobile(null);
                                }}
                                className="block py-2 text-white/80 hover:text-red transition-colors"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
