"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, NAV_LINKS_FLAT, SITE } from "@/lib/constants";
import { AGENT } from "@/config/agent";

/* Fame Estate easing: cubic-bezier(0.83, 0, 0.17, 1) */
const FAME_EASE = [0.83, 0, 0.17, 1] as const;
const STAGGER_DELAY = 0.025; // seconds between each link animation

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ────────────────────── HEADER BAR ────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 rf-header-bg ${
          scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-5">
          {/* ── Logo / wordmark ── */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            {SITE.logo ? (
              <Image
                src={SITE.logo}
                alt={SITE.name}
                width={160}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
            ) : (
              <span className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl uppercase tracking-[0.22em] text-white leading-none">
                  {SITE.name}
                </span>
                <span className="rf-eyebrow text-[9px] text-white/50 mt-1.5">
                  {AGENT.title} &middot; {SITE.dre.agentDisplay}
                </span>
              </span>
            )}
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="rf-eyebrow rf-nav-link text-white/80 group-hover:text-rf-accent group-focus-within:text-rf-accent inline-flex items-center gap-1.5"
                    aria-haspopup="true"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="text-[8px] translate-y-[1px] transition-transform duration-300 group-hover:rotate-180"
                    >
                      &#9662;
                    </span>
                  </Link>
                  {/* Dropdown — hover/focus bridge via padding-top */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-300">
                    <div className="bg-black/95 backdrop-blur-sm border border-white/10 py-2 min-w-[200px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-3 rf-eyebrow text-white/70 hover:text-rf-accent hover:bg-white/5 whitespace-nowrap"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rf-eyebrow rf-nav-link text-white/80 hover:text-rf-accent"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="rf-btn-primary rf-nav-cta text-white/80 hover:text-rf-accent"
            >
              Get Your Valuation
              <span aria-hidden="true" className="inline-block ml-1">&#8594;</span>
            </Link>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden relative z-10 p-2 -mr-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-7 flex flex-col items-end gap-[6px]">
              <span
                className={`rf-burger-line w-full ${
                  mobileOpen ? "rotate-[-45deg] translate-y-[-1px]" : ""
                }`}
              />
              <span
                className={`rf-burger-line w-[70%] ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`rf-burger-line ${
                  mobileOpen ? "w-full rotate-45 translate-y-[1px]" : "w-1/2"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ────────────────────── MOBILE OVERLAY ────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: FAME_EASE }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center lg:hidden"
          >
            <nav className="flex flex-col gap-0 px-8">
              {NAV_LINKS_FLAT.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * STAGGER_DELAY,
                    ease: FAME_EASE,
                  }}
                  className="border-b border-white/10"
                >
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className="flex items-center gap-4 py-5 group"
                  >
                    <span className="rf-mobile-index text-white/30 font-mono text-xs tabular-nums">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    <span className="rf-mobile-label text-white text-[clamp(1.5rem,5vw,2.5rem)] font-bold uppercase group-hover:text-rf-accent">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* CTA in mobile menu */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + NAV_LINKS_FLAT.length * STAGGER_DELAY,
                  ease: FAME_EASE,
                }}
                className="mt-10"
              >
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className="rf-btn-primary text-rf-accent text-lg"
                >
                  Get Your Valuation
                  <span aria-hidden="true" className="inline-block ml-1">&#8594;</span>
                </Link>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + NAV_LINKS_FLAT.length * STAGGER_DELAY,
                  ease: FAME_EASE,
                }}
                className="mt-12 flex flex-col gap-1"
              >
                <a
                  href={SITE.phoneHref}
                  className="rf-body-sm rf-mobile-contact text-white/50 hover:text-white"
                >
                  {SITE.phoneFormatted}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="rf-body-sm rf-mobile-contact text-white/50 hover:text-white"
                >
                  {SITE.email}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
