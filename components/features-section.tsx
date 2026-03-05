import { ScanLine, UserCheck, FileText, ArrowRight } from "lucide-react"

const features = [
  {
    icon: ScanLine,
    tag: "Core Feature",
    title: "Job Scam Detector",
    description:
      "Paste a job post or link and Sentinel analyzes it using AI to detect suspicious patterns, fake recruiters, and scam indicators in seconds.",
    bullets: [
      "Domain & email verification",
      "Salary range plausibility check",
      "Suspicious language detection",
      "Cross-reference with known scam databases",
    ],
    cta: "Scan a Job Post",
  },
  {
    icon: UserCheck,
    tag: "Verification",
    title: "Recruiter & Company Verification",
    description:
      "Verify whether a recruiter actually works at the company by analyzing public signals from professional profiles and company registries.",
    bullets: [
      "LinkedIn profile cross-match",
      "Company domain verification",
      "Employment history signals",
      "Corporate registration lookup",
    ],
    cta: "Verify a Recruiter",
  },
  {
    icon: FileText,
    tag: "Optimization",
    title: "Resume & Profile Optimizer",
    description:
      "Improve your resume and LinkedIn profile with AI suggestions that increase ATS compatibility and recruiter visibility dramatically.",
    bullets: [
      "ATS keyword optimization",
      "Format & structure analysis",
      "Skills gap identification",
      "LinkedIn profile scoring",
    ],
    cta: "Optimize My Profile",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-28 px-6 bg-[rgb(236,226,208)]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-[rgb(59,52,31)]/30" />
          <span className="text-[rgb(59,52,31)]/50 text-xs font-semibold uppercase tracking-widest">
            Features
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[rgb(59,52,31)] leading-tight text-balance max-w-xl">
            Everything You Need to Apply With Confidence
          </h2>
          <p className="text-[rgb(59,52,31)]/50 text-base leading-relaxed max-w-xs md:text-right">
            Three powerful tools. One unified platform.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, tag, title, description, bullets, cta }) => (
            <div
              key={title}
              className="group relative rounded-2xl p-6 border border-[rgb(59,52,31)]/10 bg-white/50 hover:bg-white/80 hover:border-[rgb(221,220,104)]/60 hover:shadow-xl transition-all duration-300 flex flex-col gap-5 cursor-pointer"
              style={{ backdropFilter: "blur(12px)" }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center border border-[rgb(221,220,104)]/40 transition-all group-hover:scale-105"
                style={{ background: "rgba(221,220,104,0.18)" }}
              >
                <Icon className="w-5 h-5 text-[rgb(59,52,31)]" strokeWidth={2} />
              </div>

              {/* Tag */}
              <span className="text-[rgb(59,52,31)]/40 text-xs font-semibold uppercase tracking-widest">
                {tag}
              </span>

              {/* Title & desc */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[rgb(59,52,31)] leading-snug">{title}</h3>
                <p className="text-sm text-[rgb(59,52,31)]/55 leading-relaxed">{description}</p>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-2 mt-auto">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-[rgb(59,52,31)]/60">
                    <span
                      className="mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(221,220,104,0.3)" }}
                    >
                      <span className="w-1 h-1 rounded-full bg-[rgb(59,52,31)]" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA link */}
              <a
                href="#cta"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[rgb(59,52,31)] group-hover:text-[rgb(59,52,31)] mt-2 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0"
              >
                {cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
