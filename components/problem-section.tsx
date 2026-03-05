import { AlertTriangle, TrendingDown, Clock, DollarSign } from "lucide-react"

const stats = [
  { value: "14.1M", label: "fake job posts online", icon: AlertTriangle },
  { value: "68%", label: "of job seekers encountered a scam", icon: TrendingDown },
  { value: "11hrs", label: "wasted per scam application", icon: Clock },
  { value: "$3,000", label: "average financial loss per victim", icon: DollarSign },
]

export function ProblemSection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Dark background panel */}
      <div
        className="absolute inset-0"
        style={{ background: "rgb(59,52,31)" }}
      />

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(221,220,104,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-[rgb(221,220,104)]/50" />
          <span className="text-[rgb(221,220,104)]/70 text-xs font-semibold uppercase tracking-widest">
            The Problem
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-[rgb(236,226,208)] leading-tight text-balance max-w-3xl mb-6">
          Job Scams Are Growing{" "}
          <span className="text-[rgb(221,220,104)]">Faster Than Real Opportunities</span>
        </h2>

        <p className="text-[rgb(236,226,208)]/55 text-lg leading-relaxed max-w-2xl mb-16">
          Fake recruiters, misleading job posts, and poor profile visibility cost job seekers time, money, and confidence. The job market is broken — and most people don&apos;t know until it&apos;s too late.
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl p-5 border border-white/8 flex flex-col gap-3"
              style={{ background: "rgba(236,226,208,0.05)" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(221,220,104,0.15)" }}
              >
                <Icon className="w-4 h-4 text-[rgb(221,220,104)]" strokeWidth={2} />
              </div>
              <p className="text-3xl font-bold text-[rgb(236,226,208)]">{value}</p>
              <p className="text-sm text-[rgb(236,226,208)]/50 leading-snug">{label}</p>
            </div>
          ))}
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Fake job post */}
          <div
            className="rounded-2xl p-6 border border-red-500/25"
            style={{ background: "rgba(239,68,68,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-red-400 text-xs font-semibold uppercase tracking-widest">
                Fake Job Post
              </span>
            </div>
            <p className="text-[rgb(236,226,208)]/80 font-semibold mb-1 text-sm">
              Senior Developer — $150K–$200K
            </p>
            <p className="text-[rgb(236,226,208)]/40 text-xs mb-4 leading-relaxed">
              Posted by: john.recruiter1992@gmail.com • No company domain • Asks for SSN upfront
            </p>
            <ul className="flex flex-col gap-1.5">
              {[
                "Unrealistic salary range",
                "Personal email, no company domain",
                "Requests sensitive info early",
                "No verifiable company presence",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-[rgb(236,226,208)]/45">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                    <span className="w-1 h-1 rounded-full bg-red-400" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Verified job post */}
          <div
            className="rounded-2xl p-6 border border-[rgb(221,220,104)]/25"
            style={{ background: "rgba(221,220,104,0.07)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[rgb(221,220,104)]" />
              <span className="text-[rgb(221,220,104)] text-xs font-semibold uppercase tracking-widest">
                Verified Job Post
              </span>
            </div>
            <p className="text-[rgb(236,226,208)]/80 font-semibold mb-1 text-sm">
              Senior Developer — $140K–$165K
            </p>
            <p className="text-[rgb(236,226,208)]/40 text-xs mb-4 leading-relaxed">
              Posted by: sarah.k@acmecorp.com • Domain verified • LinkedIn profile matches
            </p>
            <ul className="flex flex-col gap-1.5">
              {[
                "Realistic, market-aligned salary",
                "Verified corporate email domain",
                "Recruiter confirmed on LinkedIn",
                "Company has 500+ employees verified",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-[rgb(236,226,208)]/60">
                  <span className="w-3.5 h-3.5 rounded-full bg-[rgb(221,220,104)]/20 flex items-center justify-center shrink-0">
                    <span className="w-1 h-1 rounded-full bg-[rgb(221,220,104)]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
