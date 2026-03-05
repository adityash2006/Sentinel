import { Link2, Brain, BadgeCheck, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Paste job link or recruiter profile",
    description:
      "Drop in a job post URL, paste the job description, or share a recruiter's LinkedIn profile. Sentinel accepts any format.",
    detail: "Supports LinkedIn, Indeed, Glassdoor, and plain text",
  },
  {
    number: "02",
    icon: Brain,
    title: "Sentinel analyzes credibility signals",
    description:
      "Our AI engine cross-references 40+ data points — email domains, salary benchmarks, company registries, profile authenticity, and more.",
    detail: "Average analysis time: under 8 seconds",
  },
  {
    number: "03",
    icon: BadgeCheck,
    title: "Receive a trust score + suggestions",
    description:
      "Get a 0–100 trust score with a detailed breakdown of red flags, verification status, and actionable improvement suggestions.",
    detail: "Downloadable report included",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 px-6 relative overflow-hidden">
      {/* Light background */}
      <div
        className="absolute inset-0"
        style={{ background: "rgb(236,226,208)" }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(221,220,104,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-[rgb(59,52,31)]/30" />
          <span className="text-[rgb(59,52,31)]/50 text-xs font-semibold uppercase tracking-widest">
            How It Works
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[rgb(59,52,31)] leading-tight text-balance max-w-xl">
            From Paste to Verified in Under 30 Seconds
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="absolute top-8 left-8 right-8 h-px hidden md:block"
            style={{ background: "linear-gradient(90deg, rgb(221,220,104), rgba(221,220,104,0.2))" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ number, icon: Icon, title, description, detail }, idx) => (
              <div key={number} className="flex flex-col gap-5">
                {/* Step indicator */}
                <div className="flex items-center gap-4">
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-[rgb(221,220,104)]/60 shadow-lg z-10"
                    style={{ background: "rgb(59,52,31)" }}
                  >
                    <Icon className="w-6 h-6 text-[rgb(221,220,104)]" strokeWidth={2} />
                    <span
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-[rgb(59,52,31)]"
                      style={{ background: "rgb(221,220,104)" }}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  {idx < 2 && (
                    <ArrowRight className="w-4 h-4 text-[rgb(59,52,31)]/25 md:hidden" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <p className="text-[rgb(59,52,31)]/30 text-xs font-bold font-mono">{number}</p>
                  <h3 className="text-lg font-bold text-[rgb(59,52,31)] leading-snug">{title}</h3>
                  <p className="text-sm text-[rgb(59,52,31)]/55 leading-relaxed">{description}</p>
                </div>

                {/* Detail chip */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[rgb(59,52,31)]/60 self-start"
                  style={{ background: "rgba(221,220,104,0.18)" }}
                >
                  {detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA inline */}
        <div className="mt-16 flex justify-center">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold px-8 py-4 rounded-xl text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Try It Free — No Account Needed
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
