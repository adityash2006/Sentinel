"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Shield } from "lucide-react"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#cta" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[rgb(236,226,208)]/90 backdrop-blur-md border-b border-[rgb(221,220,104)]/30 shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[rgb(59,52,31)] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 text-[rgb(221,220,104)]" strokeWidth={2.5} />
          </div>
          <span className="text-[rgb(59,52,31)] font-semibold text-lg tracking-tight">
            Sentinel
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-[rgb(59,52,31)]/70 hover:text-[rgb(59,52,31)] transition-colors hover-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#features"
            className="text-sm font-medium text-[rgb(59,52,31)]/70 hover:text-[rgb(59,52,31)] transition-colors px-4 py-2"
          >
            Sign In
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 text-sm font-semibold bg-[rgb(59,52,31)] text-[rgb(236,226,208)] px-5 py-2.5 rounded-xl hover:bg-[rgb(59,52,31)]/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[rgb(59,52,31)] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[rgb(236,226,208)] border-b border-[rgb(221,220,104)]/30 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-[rgb(59,52,31)]/80 hover:text-[rgb(59,52,31)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="inline-flex items-center justify-center text-sm font-semibold bg-[rgb(59,52,31)] text-[rgb(236,226,208)] px-5 py-3 rounded-xl mt-2"
          >
            Get Started Free
          </a>
        </div>
      )}
    </header>
  )
}
