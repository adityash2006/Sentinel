import { CheckCircle2, ArrowRight, ScanLine, UserCheck } from "lucide-react"

const trustBadges = [
  "AI-powered analysis",
  "Recruiter verification",
  "Privacy focused",
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-20 px-6">
      {/* Background dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Warm radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(221,220,104,0.22) 0%, rgba(236,226,208,0.1) 50%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgb(221,220,104)]/50 bg-[rgb(221,220,104)]/15 text-[rgb(59,52,31)] text-sm font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(221,220,104)] inline-block animate-pulse" />
          Now in Early Access — Join 2,400+ job seekers
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[rgb(59,52,31)] leading-[1.08] tracking-tight text-balance">
          Verify Opportunities.{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Avoid Scams</span>
            <span
              className="absolute -bottom-1 left-0 right-0 h-3 -z-0 rounded-sm opacity-50"
              style={{ background: "rgb(221,220,104)" }}
            />
          </span>
          .
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl text-lg sm:text-xl text-[rgb(59,52,31)]/60 leading-relaxed text-balance">
          Sentinel helps job seekers verify recruiters, analyze job posts, and optimize their profiles so they can apply with confidence.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {trustBadges.map((badge) => (
            <span key={badge} className="trust-badge">
              <CheckCircle2 className="w-3.5 h-3.5 text-[rgb(59,52,31)]" strokeWidth={2.5} />
              {badge}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <a
            href="#features"
            className="group inline-flex items-center gap-2.5 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold px-7 py-3.5 rounded-xl text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <ScanLine className="w-4 h-4" />
            Check a Job Post
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2.5 border border-[rgb(59,52,31)]/25 text-[rgb(59,52,31)] font-semibold px-7 py-3.5 rounded-xl text-base bg-white/40 hover:bg-white/60 hover:border-[rgb(59,52,31)]/40 transition-all"
          >
            <UserCheck className="w-4 h-4" />
            Scan My Profile
          </a>
        </div>

        {/* Hero Dashboard Card */}
        <div className="w-full max-w-3xl mt-8">
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-[rgb(221,220,104)]/30"
            style={{ background: "rgba(59,52,31,0.96)" }}
          >
            {/* Dashboard header bar */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-[rgb(221,220,104)]/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span className="ml-4 text-white/30 text-xs font-mono">sentinel.app — analysis</span>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Trust Score Card */}
              <div className="sm:col-span-1 rounded-xl p-4 border border-white/10 bg-white/5 flex flex-col gap-3">
                <p className="text-white/50 text-xs font-medium uppercase tracking-widest">Trust Score</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-[rgb(221,220,104)]">78</span>
                  <span className="text-white/40 text-sm mb-1">/100</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "78%", background: "rgb(221,220,104)" }}
                  />
                </div>
                <span className="text-xs text-[rgb(221,220,104)]/80 font-medium">Likely Legitimate</span>
              </div>

              {/* Scam Indicators */}
              <div className="sm:col-span-2 rounded-xl p-4 border border-white/10 bg-white/5 flex flex-col gap-3">
                <p className="text-white/50 text-xs font-medium uppercase tracking-widest">Analysis</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: "Recruiter verified on LinkedIn", ok: true },
                    { label: "Company domain matches email", ok: true },
                    { label: "Salary range is unrealistically high", ok: false },
                    { label: "Request for personal info upfront", ok: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          item.ok ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.ok ? "bg-green-400" : "bg-red-400"
                          }`}
                        />
                      </div>
                      <span className="text-white/70 text-xs">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Score */}
              <div className="sm:col-span-3 rounded-xl p-4 border border-white/10 bg-white/5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white/50 text-xs font-medium uppercase tracking-widest">Profile ATS Score</p>
                  <span className="text-[rgb(221,220,104)] text-xs font-semibold">+12 pts available</span>
                </div>
                <div className="flex gap-2">
                  {["Keywords", "Format", "Skills", "Experience", "Summary"].map((item, i) => (
                    <div key={item} className="flex-1 flex flex-col items-center gap-1.5">
                      <div
                        className="w-full rounded-sm"
                        style={{
                          height: `${[60, 85, 45, 90, 70][i]}%`,
                          minHeight: "12px",
                          maxHeight: "48px",
                          background:
                            i === 2
                              ? "rgba(239,68,68,0.5)"
                              : "rgba(221,220,104,0.4)",
                        }}
                      />
                      <span className="text-white/30 text-[10px] font-medium hidden sm:block">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating label */}
          <p className="text-center text-sm text-[rgb(59,52,31)]/40 mt-4 font-medium">
            Real-time job post analysis — no account required
          </p>
        </div>
      </div>
    </section>
  )
}
