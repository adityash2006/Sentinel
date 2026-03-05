import { ArrowRight, ScanLine, Zap } from "lucide-react"
import { Shield } from "lucide-react"

export function CtaSection() {
  return (
    <section id="cta" className="py-28 px-6 relative overflow-hidden" style={{ background: "rgb(59,52,31)" }}>
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(221,220,104,0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(221,220,104,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center border border-[rgb(221,220,104)]/30 shadow-xl"
          style={{ background: "rgba(221,220,104,0.12)" }}
        >
          <Shield className="w-8 h-8 text-[rgb(221,220,104)]" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[rgb(236,226,208)] leading-tight text-balance">
            Stop Guessing.{" "}
            <span className="text-[rgb(221,220,104)]">Start Verifying.</span>
          </h2>
          <p className="text-[rgb(236,226,208)]/50 text-lg leading-relaxed max-w-xl mx-auto">
            Join thousands of job seekers who use Sentinel to protect their time and land better opportunities.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#"
            className="group inline-flex items-center gap-2.5 bg-[rgb(221,220,104)] text-[rgb(59,52,31)] font-bold px-8 py-4 rounded-xl text-base shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            <Zap className="w-4 h-4" />
            Try Sentinel Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2.5 border border-[rgb(221,220,104)]/30 text-[rgb(236,226,208)] font-semibold px-8 py-4 rounded-xl text-base hover:border-[rgb(221,220,104)]/60 hover:bg-white/5 transition-all"
          >
            <ScanLine className="w-4 h-4" />
            Scan Your First Job Post
          </a>
        </div>

        {/* Social proof micro */}
        <div className="flex items-center gap-6 pt-4">
          <div className="flex -space-x-2">
            {["JD", "SK", "RP", "AL"].map((init, i) => (
              <div
                key={init}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-[rgb(236,226,208)] border-2 border-[rgb(59,52,31)]"
                style={{
                  background: [
                    "rgb(100,90,60)",
                    "rgb(80,73,45)",
                    "rgb(120,110,70)",
                    "rgb(90,82,52)",
                  ][i],
                  zIndex: 4 - i,
                }}
              >
                {init}
              </div>
            ))}
          </div>
          <p className="text-[rgb(236,226,208)]/40 text-sm">
            <span className="text-[rgb(221,220,104)] font-semibold">2,400+</span> job seekers protected
          </p>
        </div>

        {/* Fine print */}
        <p className="text-[rgb(236,226,208)]/25 text-xs">
          No credit card required. Free scans available daily.
        </p>
      </div>
    </section>
  )
}
