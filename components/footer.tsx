import { Shield, Github, Twitter, Linkedin } from "lucide-react"

const footerLinks = {
  Product: ["Features", "How It Works", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  Connect: ["Contact", "Twitter", "LinkedIn", "GitHub"],
}

export function Footer() {
  return (
    <footer
      className="px-6 py-16 border-t border-white/8"
      style={{ background: "rgb(47, 41, 24)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[rgb(59,52,31)] border border-[rgb(221,220,104)]/30 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[rgb(221,220,104)]" strokeWidth={2.5} />
              </div>
              <span className="text-[rgb(236,226,208)] font-semibold text-lg tracking-tight">
                Sentinel
              </span>
            </div>
            <p className="text-sm text-[rgb(236,226,208)]/35 leading-relaxed max-w-[180px]">
              AI-powered job scam detection and recruiter verification.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[rgb(236,226,208)]/40 hover:text-[rgb(221,220,104)] hover:border-[rgb(221,220,104)]/40 transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[rgb(236,226,208)]/40 hover:text-[rgb(221,220,104)] hover:border-[rgb(221,220,104)]/40 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[rgb(236,226,208)]/40 hover:text-[rgb(221,220,104)] hover:border-[rgb(221,220,104)]/40 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <p className="text-[rgb(236,226,208)]/30 text-xs font-semibold uppercase tracking-widest">
                {category}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[rgb(236,226,208)]/50 hover:text-[rgb(221,220,104)] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/8">
          <p className="text-xs text-[rgb(236,226,208)]/25">
            &copy; {new Date().getFullYear()} Sentinel. All rights reserved.
          </p>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgb(221,220,104)]/20 text-xs text-[rgb(236,226,208)]/30"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
