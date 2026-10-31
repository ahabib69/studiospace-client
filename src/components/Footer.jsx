"use client";
import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "./Navbar";
import { categories, categoryLabels } from "@/lib/api";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_1fr_1.2fr] pb-14">
          <div>
            <Logo />
            <p className="muted text-sm leading-7 mt-5 max-w-xs">
              Good ideas deserve the right space. Connecting independent
              creators with extraordinary places to make things happen.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                aria-label="Instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={18} />
              </a>
              <a
                aria-label="X"
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.5 5.4 22H2.2l8.3-9.5L.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
                </svg>
              </a>
              <a
                aria-label="LinkedIn"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="footer-title">Find your way</h3>
            {[
              ["/studios", "Explore studios"],
              ["/how-it-works", "How it works"],
              ["/about", "Our story"],
              ["/add-studio", "Become a host"],
            ].map(([url, label]) => (
              <Link className="footer-link" href={url} key={url}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="footer-title">Made for your craft</h3>
            {categories.map((c, i) => (
              <Link
                className="footer-link"
                href={`/studios?category=${encodeURIComponent(c)}`}
                key={c}
              >
                {categoryLabels[i]}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="footer-title">Stay in the creative loop</h3>
            <p className="text-sm muted mb-5">
              New spaces. Fresh inspiration. No noise.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success(
                  "You’re on the list. Thanks for your interest! This demo does not store emails.",
                );
                e.target.reset();
              }}
            >
              <input
                className="input input-bordered w-full min-w-0"
                type="email"
                placeholder="Your email address"
                aria-label="Newsletter email"
                required
              />
              <button
                className="btn btn-primary btn-square"
                aria-label="Subscribe"
              >
                <ArrowUpRight size={20} />
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-base-300 py-7 flex flex-col md:flex-row justify-between gap-4 text-xs muted">
          <p>
            © {new Date().getFullYear()} StudioSpace. Built for the
            independently creative.
          </p>
          <div className="flex gap-5">
            <Link href="/terms">Terms of use</Link>
            <Link href="/privacy">Privacy policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
