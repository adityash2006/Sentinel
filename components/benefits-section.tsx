import { ShieldCheck, Clock, TrendingUp, Target, Star } from "lucide-react"

const benefits = [
  {
    icon: ShieldCheck,
    title: "Avoid job scams",
    description: "Identify fraudulent listings before you invest your time or personal information.",
  },
  {
    icon: Clock,
    title: "Save hours verifying recruiters",
    description: "What used to take hours of manual research now takes under 10 seconds.",
  },
  {
    icon: TrendingUp,
    title: "Increase interview callback rate",
    description: "Optimized profiles land 3x more recruiter responses on average.",
  },
  {
    icon: Target,
    title: "Improve your ATS score",
    description: "Get past automated filters and land in front of real human recruiters.",
  },
]

const testimonials = [
  {
    quote:
      "Sentinel helped me detect a fake recruiter before I wasted time applying. The trust score showed clear red flags I would have missed completely.",
    name: "Marcus T.",
    role: "Software Engineer",
    initials: "MT",
    rating: 5,
  },
  {
    quote:
      "My profile ATS score jumped from 54 to 88 in one session. Got three recruiter calls the following week. This tool is genuinely game-changing.",
    name: "Priya K.",
    role: "Product Manager",
    initials: "PK",
    rating: 5,
  },
  {
    quote:
      "I was almost scammed by a 'dream job' that looked completely legitimate. Sentinel caught the domain mismatch instantly. Saved me weeks of stress.",
    name: "Jordan L.",
    role: "UX Designer",
    initials: "JL",
    rating: 5,
  },
]

const integrations = [
  { name: "LinkedIn", abbr: "in" },
  { name: "Indeed", abbr: "In" },
  { name: "Glassdoor", abbr: "Gd" },
  { name: "Wellfound", abbr: "WF" },
  { name: "Lever", abbr: "Lv" },
  { name: "Greenhouse", abbr: "GH" },
]

export function BenefitsSection() {
  return (
    <>
      {/* Benefits */}
      <section className="py-28 px-6" style={{ background: "rgb(59,52,31)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[rgb(221,220,104)]/50" />
                <span className="text-[rgb(221,220,104)]/70 text-xs font-semibold uppercase tracking-widest">
                  Benefits
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[rgb(236,226,208)] leading-tight text-balance">
                Apply With{" "}
                <span className="text-[rgb(221,220,104)]">Confidence</span>
              </h2>
              <p className="text-[rgb(236,226,208)]/50 text-lg leading-relaxed">
                Stop second-guessing every opportunity. Sentinel gives you the clarity you need to act decisively.
              </p>
              <a
                href="#cta"
                className="inline-flex items-center gap-2 bg-[rgb(221,220,104)] text-[rgb(59,52,31)] font-bold px-6 py-3 rounded-xl text-sm self-start shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Start for Free
              </a>
            </div>

            {/* Right: benefit list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl p-5 border border-white/8 flex flex-col gap-3 hover:border-[rgb(221,220,104)]/30 transition-colors"
                  style={{ background: "rgba(236,226,208,0.05)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(221,220,104,0.15)" }}
                  >
                    <Icon className="w-4 h-4 text-[rgb(221,220,104)]" strokeWidth={2} />
                  </div>
                  <h3 className="text-[rgb(236,226,208)] font-semibold text-sm">{title}</h3>
                  <p className="text-[rgb(236,226,208)]/45 text-xs leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-6 border-y border-[rgb(59,52,31)]/10" style={{ background: "rgb(236,226,208)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[rgb(59,52,31)]/40 text-xs font-semibold uppercase tracking-widest mb-10">
            Analyzes data from platforms you already use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {integrations.map(({ name, abbr }) => (
              <div
                key={name}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-[rgb(59,52,31)]/12 bg-white/60 hover:bg-white/90 hover:border-[rgb(221,220,104)]/50 transition-all cursor-default"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-[rgb(236,226,208)]"
                  style={{ background: "rgb(59,52,31)" }}
                >
                  {abbr}
                </div>
                <span className="text-sm font-medium text-[rgb(59,52,31)]/70">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-28 px-6" style={{ background: "rgb(236,226,208)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[rgb(59,52,31)]/30" />
            <span className="text-[rgb(59,52,31)]/50 text-xs font-semibold uppercase tracking-widest">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[rgb(59,52,31)] leading-tight text-balance mb-14 max-w-2xl">
            Trusted by Job Seekers Who&apos;ve Been There
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ quote, name, role, initials, rating }) => (
              <div
                key={name}
                className="rounded-2xl p-6 border border-[rgb(59,52,31)]/10 bg-white/50 hover:bg-white/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5"
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[rgb(221,220,104)] text-[rgb(221,220,104)]"
                    />
                  ))}
                </div>
                <p className="text-sm text-[rgb(59,52,31)]/70 leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-[rgb(59,52,31)]/8">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[rgb(236,226,208)] shrink-0"
                    style={{ background: "rgb(59,52,31)" }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[rgb(59,52,31)]">{name}</p>
                    <p className="text-xs text-[rgb(59,52,31)]/45">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
