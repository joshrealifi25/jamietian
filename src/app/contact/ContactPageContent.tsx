"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { PageSection } from "@/components/layout/PageSection";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { HorizontalReveal } from "@/components/motion/HorizontalReveal";
import { SITE } from "@/lib/constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactPageContent() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement): Record<string, string> {
    const errs: Record<string, string> = {};
    const data = new FormData(form);
    if (!data.get("firstName")?.toString().trim()) errs.firstName = "First name is required";
    if (!data.get("lastName")?.toString().trim()) errs.lastName = "Last name is required";
    const email = data.get("email")?.toString().trim() ?? "";
    if (!email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address";
    if (!(form.querySelector("#contact-privacy") as HTMLInputElement)?.checked)
      errs.privacy = "Please accept the privacy policy";
    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus("submitting");
    try {
      const data = new FormData(form);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          interest: data.get("interest"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
          sourcePage: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Luxury California residence"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 pb-16 md:pb-24 w-full">
          <div className="max-w-5xl">
            <Reveal>
              <p className="rf-eyebrow text-white/70 mb-6">Contact</p>
            </Reveal>
            <h1 className="rf-display text-white mb-6">
              <LineReveal>Start the conversation.</LineReveal>
            </h1>
            <Reveal delay={0.2}>
              <p className="rf-body text-white/70 max-w-2xl">
                Whether you&apos;re ready to buy, sell, or simply weighing your
                options, Jamie is here to help &mdash; clear guidance, no
                pressure.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <PageSection className="bg-rf-surface" width="full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            <HorizontalReveal from="left">
              {status === "success" ? (
                <div className="flex flex-col items-start gap-6 py-12">
                  <div className="w-12 h-12 border border-rf-accent flex items-center justify-center">
                    <svg className="w-6 h-6 text-rf-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="rf-h3">Message sent.</h3>
                  <p className="rf-body max-w-md">
                    Thank you for reaching out. Jamie will be in touch within
                    one business day.
                  </p>
                </div>
              ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-first" className="block text-xs tracking-wider uppercase text-rf-muted mb-2">
                      First Name
                    </label>
                    <input
                      id="contact-first"
                      name="firstName"
                      type="text"
                      required
                      className={`w-full bg-transparent border-b py-3 text-rf-text focus:border-rf-accent outline-none transition-colors ${errors.firstName ? "border-red-500" : "border-rf-border"}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-last" className="block text-xs tracking-wider uppercase text-rf-muted mb-2">
                      Last Name
                    </label>
                    <input
                      id="contact-last"
                      name="lastName"
                      type="text"
                      required
                      className={`w-full bg-transparent border-b py-3 text-rf-text focus:border-rf-accent outline-none transition-colors ${errors.lastName ? "border-red-500" : "border-rf-border"}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs tracking-wider uppercase text-rf-muted mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className={`w-full bg-transparent border-b py-3 text-rf-text focus:border-rf-accent outline-none transition-colors ${errors.email ? "border-red-500" : "border-rf-border"}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs tracking-wider uppercase text-rf-muted mb-2">
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    className="w-full bg-transparent border-b border-rf-border py-3 text-rf-text focus:border-rf-accent outline-none transition-colors"
                    placeholder="(xxx) xxx-xxxx"
                  />
                </div>
                <div>
                  <label htmlFor="contact-interest" className="block text-xs tracking-wider uppercase text-rf-muted mb-2">
                    I&apos;m interested in
                  </label>
                  <select
                    id="contact-interest"
                    name="interest"
                    className="w-full bg-transparent border-b border-rf-border py-3 text-rf-text focus:border-rf-accent outline-none transition-colors appearance-none"
                  >
                    <option value="" className="bg-black">
                      Select one
                    </option>
                    <option value="buying" className="bg-black">
                      Buying a home
                    </option>
                    <option value="selling" className="bg-black">
                      Selling a home
                    </option>
                    <option value="both" className="bg-black">
                      Buying and selling
                    </option>
                    <option value="valuation" className="bg-black">
                      A free home valuation
                    </option>
                    <option value="other" className="bg-black">
                      Something else
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs tracking-wider uppercase text-rf-muted mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-rf-border py-3 text-rf-text focus:border-rf-accent outline-none transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="contact-privacy"
                    required
                    className="mt-1 accent-rf-accent"
                  />
                  <label
                    htmlFor="contact-privacy"
                    className={`text-xs ${errors.privacy ? "text-red-500" : "text-rf-muted"}`}
                  >
                    I agree to the{" "}
                    <Link
                      href="/privacy"
                      className="text-rf-accent hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and consent to being contacted about my inquiry.
                  </label>
                </div>
                {/* Honeypot — hidden from humans, catnip for bots */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                {status === "error" && (
                  <p className="text-sm text-red-500">
                    Something went wrong sending your message. Please try
                    again, or call us at {SITE.phoneFormatted}.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rf-btn-primary disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
              )}
            </HorizontalReveal>
          </div>

          <div className="lg:col-span-2">
            <HorizontalReveal from="right">
              <div className="space-y-10">
                <div>
                  <h3 className="rf-eyebrow mb-4">Office</h3>
                  <p className="rf-body-sm">{SITE.address.street}</p>
                  <p className="rf-body-sm">
                    {SITE.address.city}, {SITE.address.state}{" "}
                    {SITE.address.zip}
                  </p>
                </div>

                <div>
                  <h3 className="rf-eyebrow mb-4">Phone</h3>
                  <a
                    href={SITE.phoneHref}
                    className="rf-body-sm hover:text-rf-accent transition-colors"
                  >
                    {SITE.phoneFormatted}
                  </a>
                </div>

                <div>
                  <h3 className="rf-eyebrow mb-4">Email</h3>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="rf-body-sm hover:text-rf-accent transition-colors"
                  >
                    {SITE.email}
                  </a>
                </div>

                <div>
                  <h3 className="rf-eyebrow mb-4">Schedule a Call</h3>
                  <a
                    href={SITE.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rf-btn-ghost text-xs"
                  >
                    Book on Calendly
                  </a>
                </div>

                <div className="border-t border-rf-border pt-6">
                  <p className="text-xs text-rf-muted/70">
                    {SITE.dre.brokerageDisplay}
                  </p>
                </div>
              </div>
            </HorizontalReveal>
          </div>
        </div>
      </PageSection>
    </>
  );
}
