import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[80vh] flex items-center justify-center bg-rf-page px-6">
        <div className="max-w-2xl text-center">
          <p className="text-rf-accent font-serif text-[120px] md:text-[180px] font-light leading-none mb-4 select-none">
            404
          </p>
          <div className="w-16 h-px bg-rf-accent mx-auto mb-8" />
          <h1 className="font-serif text-3xl md:text-4xl text-rf-heading mb-4">
            Page not found.
          </h1>
          <p className="text-rf-muted text-base md:text-lg leading-relaxed mb-12 max-w-md mx-auto">
            The page you are looking for may have moved or no longer exists.
            Let us help you find what you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="rf-btn-primary">
              Back to Home
            </Link>
            <Link href="/contact" className="rf-btn-ghost">
              Contact Us
            </Link>
          </div>

          <div className="mt-16 pt-12 border-t border-rf-border">
            <p className="text-xs tracking-[0.2em] uppercase text-rf-muted mb-6">
              Quick Links
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { label: "Buy", href: "/buy" },
                { label: "Sell", href: "/sell" },
                { label: "Listings", href: "/listings" },
                { label: "Sold", href: "/properties/sold" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "About", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-rf-muted hover:text-rf-accent transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
