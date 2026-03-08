"use client"

import Link from "next/link"
import { Shield, ArrowRight, Home, Zap } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-[rgb(236,226,208)]" />
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(221,220,104,0.2) 0%, rgba(236,226,208,0.05) 60%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 w-full max-w-[560px] text-center">
        {/* Animated 404 number */}
        <div className="mb-8 relative">
          <div
            className="text-9xl font-black text-[rgb(59,52,31)] opacity-20 select-none pointer-events-none"
            style={{
              animation: "float 4s ease-in-out infinite",
            }}
          >
            404
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: "pulse 2s ease-in-out infinite",
            }}
          >
            <div className="w-24 h-24 rounded-full border-2 border-[rgb(221,220,104)]/40" />
          </div>
        </div>

        {/* Content */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[rgb(59,52,31)] tracking-tight mb-4">
            Page not found
          </h1>
          <p className="text-lg text-[rgb(59,52,31)]/60 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you took a wrong turn.
          </p>
        </div>

        {/* Glass card with suggestions */}
        <div
          className="rounded-2xl border border-[rgb(221,220,104)]/30 p-8 mb-8 shadow-lg"
          style={{ background: "rgba(236,226,208,0.6)", backdropFilter: "blur(12px)" }}
        >
          <p className="text-sm text-[rgb(59,52,31)]/50 font-medium mb-6 uppercase tracking-widest">Quick links</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Home button */}
            <Link
              href="/"
              className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-[rgb(59,52,31)]/15 bg-[rgb(59,52,31)]/5 hover:bg-[rgb(59,52,31)]/10 text-[rgb(59,52,31)] font-semibold text-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>

            {/* Dashboard button */}
            <Link
              href="/dashboard"
              className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-[rgb(59,52,31)]/15 bg-[rgb(59,52,31)]/5 hover:bg-[rgb(59,52,31)]/10 text-[rgb(59,52,31)] font-semibold text-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Primary CTA */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2.5 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group"
        >
          Return to Home
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Floating elements */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[rgb(221,220,104)]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[rgb(221,220,104)]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }
      `}</style>
    </div>
  )
}
