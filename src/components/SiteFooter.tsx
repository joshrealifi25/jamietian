"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SITE, NAV_LINKS_FLAT } from "@/lib/constants";

const ease = [0.83, 0, 0.17, 1] as const;

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

const socialPlatforms = ["instagram", "facebook", "linkedin", "youtube", "twitter"] as const;

export function SiteFooter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer ref={ref} className="bg-rf-page text-white">
      <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-12 md:py-16">
        {/* Top row: Logo left, social icons right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-center justify-between"
        >
          <Link href="/">
            {SITE.logo ? (
              <Image
                src={SITE.logo}
                alt={SITE.name}
                width={160}
                height={40}
                className="h-7 w-auto"
              />
            ) : (
              <span className="font-serif text-xl uppercase tracking-[0.22em] text-white leading-none">
                {SITE.name}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-5">
            {socialPlatforms
              .filter((platform) => SITE.social[platform])
              .map((platform) => (
                <a
                  key={platform}
                  href={SITE.social[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rf-muted hover:text-rf-accent transition-colors duration-300"
                  aria-label={`${SITE.name} on ${platform}`}
                >
                  {socialIcons[platform]}
                </a>
              ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="rf-divider my-8 origin-left"
        />

        {/* Middle: Nav links in a single row */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="flex flex-wrap items-center gap-x-8 gap-y-3 py-2"
        >
          {NAV_LINKS_FLAT.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rf-eyebrow text-rf-muted hover:text-rf-accent transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="rf-divider my-8 origin-right"
        />

        {/* Bottom: DRE disclaimer, legal links, copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <p className="text-[13px] text-rf-muted/50 leading-relaxed max-w-2xl">
            {SITE.dre.disclaimer} Equal Housing Opportunity. All material
            presented herein is intended for information purposes only. While
            this information is believed to be correct, it is represented subject
            to errors, omissions, changes, or withdrawal without notice.
          </p>

          <div className="flex items-center gap-6 flex-shrink-0">
            <Link
              href="/privacy"
              className="text-[13px] text-rf-muted/50 hover:text-rf-accent transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[13px] text-rf-muted/50 hover:text-rf-accent transition-colors duration-300"
            >
              Terms
            </Link>
            <span className="text-[13px] text-rf-muted/40">
              {SITE.copyright}
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
