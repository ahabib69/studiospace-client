"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Menu, X, ArrowUpRight, UserRound } from "lucide-react";
import { useState } from "react";
import { useSession } from "./Providers";
import ThemeToggle from "./ThemeToggle";
const links = [
  ["/", "Home"],
  ["/studios", "Explore Studios"],
  ["/how-it-works", "How It Works"],
  ["/about", "About Us"],
];
export function Logo() {
  return (
    <Link href="/" className="logo">
      <Aperture size={29} strokeWidth={1.6} className="text-primary" />
      Studio<span className="font-normal">Space</span>
      <span className="text-primary text-xl leading-none">.</span>
    </Link>
  );
}
export default function Navbar() {
  const path = usePathname(),
    { user, loading, logout } = useSession();
  const [mobile, setMobile] = useState(false),
    [account, setAccount] = useState(false);
  const accountLinks = [
    ["/dashboard", "Dashboard"],
    ["/add-studio", "Add New Studio"],
    ["/my-listings", "My Studio Listings"],
    ["/my-bookings", "My Bookings"],
  ];
  return (
    <header className="site-header">
      <div className="shell flex items-center justify-between h-20 gap-3">
        <Logo />
        <nav
          className="hidden lg:flex items-center gap-7"
          aria-label="Main navigation"
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${path === href || (href === "/studios" && path.startsWith("/studios/")) ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : user ? (
            <div
              className="relative"
              onMouseEnter={() => setAccount(true)}
              onMouseLeave={() => setAccount(false)}
            >
              <button
                onClick={() => setAccount(!account)}
                className="avatar-button"
                aria-label="Open account menu"
                aria-expanded={account}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <UserRound size={22} />
                )}
              </button>
              {account && (
                <div className="account-menu">
                  <p className="px-3 py-3 border-b border-base-300 mb-2">
                    <strong className="block">{user.name}</strong>
                    <span className="muted text-xs break-all">
                      {user.email}
                    </span>
                  </p>
                  {accountLinks.map(([href, label]) => (
                    <Link
                      href={href}
                      key={href}
                      onClick={() => setAccount(false)}
                    >
                      {label}
                    </Link>
                  ))}
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/login" className="btn btn-ghost btn-sm">
                Log in
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Join the space <ArrowUpRight size={14} />
              </Link>
            </div>
          )}
          <button
            className="btn btn-ghost btn-circle lg:hidden"
            onClick={() => setMobile(!mobile)}
            aria-label="Toggle menu"
            aria-expanded={mobile}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobile && (
        <nav
          className="shell pb-5 grid gap-1 lg:hidden"
          aria-label="Mobile navigation"
        >
          {[
            ...links,
            ...(!user
              ? [
                  ["/login", "Login"],
                  ["/register", "Register"],
                ]
              : accountLinks),
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`p-3 rounded-lg ${path === href ? "bg-base-200 text-primary" : ""}`}
              onClick={() => setMobile(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
