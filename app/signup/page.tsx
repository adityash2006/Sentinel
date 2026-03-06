"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Eye, EyeOff, ArrowRight, Mail, Lock, User, CheckCircle2 } from "lucide-react"

const perks = [
  "Instant job post scam detection",
  "Recruiter identity verification",
  "ATS resume scoring & tips",
]

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
  const strengthLabel = ["", "Weak", "Fair", "Strong"]
  const strengthColor = ["", "bg-red-400", "bg-[rgb(221,220,104)]", "bg-green-500"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-[rgb(236,226,208)]" />
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Radial glow — offset to the left so split feels balanced */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(221,220,104,0.22) 0%, rgba(236,226,208,0.05) 60%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 w-full max-w-[900px] grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-2xl overflow-hidden border border-[rgb(221,220,104)]/25">

        {/* Left panel — dark brand panel */}
        <div
          className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden"
          style={{ background: "rgb(59,52,31)" }}
        >
          {/* Subtle dot grid on dark bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(221,220,104,0.1) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Glow blob */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(221,220,104,0.15) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-[rgb(221,220,104)] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Shield className="w-4.5 h-4.5 text-[rgb(59,52,31)]" strokeWidth={2.5} />
              </div>
              <span className="text-[rgb(236,226,208)] font-semibold text-lg tracking-tight">Sentinel</span>
            </Link>
          </div>

          <div className="relative z-10 flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-bold text-[rgb(236,226,208)] leading-tight tracking-tight text-balance">
                Your shield against job fraud
              </h2>
              <p className="text-[rgb(236,226,208)]/50 text-sm leading-relaxed mt-3">
                Join thousands of job seekers who apply with confidence — every single day.
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[rgb(221,220,104)]/15 border border-[rgb(221,220,104)]/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[rgb(221,220,104)]" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-[rgb(236,226,208)]/70">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom social proof */}
          <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-white/08">
            <div className="flex -space-x-2">
              {["#A8B5C8", "#C4B49A", "#8FAF8A", "#C4A882"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[rgb(59,52,31)]"
                  style={{ background: color }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-xs text-[rgb(236,226,208)]/45">
              <strong className="text-[rgb(221,220,104)] font-semibold">2,400+</strong> job seekers protected this month
            </p>
          </div>
        </div>

        {/* Right panel — form */}
        <div style={{ background: "rgba(236,226,208,0.75)", backdropFilter: "blur(16px)" }}>
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center pt-8 pb-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[rgb(59,52,31)] flex items-center justify-center">
                <Shield className="w-4.5 h-4.5 text-[rgb(221,220,104)]" strokeWidth={2.5} />
              </div>
              <span className="text-[rgb(59,52,31)] font-semibold text-lg tracking-tight">Sentinel</span>
            </Link>
          </div>

          <div className="p-7 lg:p-10">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-[rgb(59,52,31)] tracking-tight">Create your account</h1>
              <p className="text-sm text-[rgb(59,52,31)]/50 mt-1">Free forever. No credit card needed.</p>
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-[rgb(59,52,31)]/15 bg-white/60 hover:bg-white/80 text-[rgb(59,52,31)] font-medium text-sm py-3 rounded-xl transition-all hover:shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M17.64 9.2045c0-.638-.0573-1.2518-.164-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.567 2.6836-3.874 2.6836-6.6l-.0001.001z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.4673-.8059 5.9564-2.1805l-2.9087-2.2582c-.8059.54-1.8368.8591-3.0477.8591-2.3445 0-4.3282-1.5845-5.036-3.7145H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71c-.18-.54-.2827-1.1168-.2827-1.71s.1018-1.17.2827-1.71V4.9582H.9574C.3477 6.173 0 7.5482 0 9s.3477 2.827.9574 4.0418L3.964 10.71z" fill="#FBBC05"/>
                <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4627.8918 11.4255 0 9 0 5.4818 0 2.4382 2.0168.9574 4.9582L3.964 7.29C4.6718 5.16 6.6555 3.5795 9 3.5795z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[rgb(59,52,31)]/12" />
              <span className="text-xs text-[rgb(59,52,31)]/40 font-medium">or sign up with email</span>
              <div className="flex-1 h-px bg-[rgb(59,52,31)]/12" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-[rgb(59,52,31)]/70 uppercase tracking-widest">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(59,52,31)]/35" strokeWidth={2} />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgb(59,52,31)]/15 bg-white/60 text-[rgb(59,52,31)] text-sm placeholder:text-[rgb(59,52,31)]/30 focus:outline-none focus:ring-2 focus:ring-[rgb(221,220,104)]/60 focus:border-[rgb(221,220,104)] transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-[rgb(59,52,31)]/70 uppercase tracking-widest">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(59,52,31)]/35" strokeWidth={2} />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgb(59,52,31)]/15 bg-white/60 text-[rgb(59,52,31)] text-sm placeholder:text-[rgb(59,52,31)]/30 focus:outline-none focus:ring-2 focus:ring-[rgb(221,220,104)]/60 focus:border-[rgb(221,220,104)] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-semibold text-[rgb(59,52,31)]/70 uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(59,52,31)]/35" strokeWidth={2} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-[rgb(59,52,31)]/15 bg-white/60 text-[rgb(59,52,31)] text-sm placeholder:text-[rgb(59,52,31)]/30 focus:outline-none focus:ring-2 focus:ring-[rgb(221,220,104)]/60 focus:border-[rgb(221,220,104)] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[rgb(59,52,31)]/35 hover:text-[rgb(59,52,31)]/60 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength meter */}
                {password.length > 0 && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            passwordStrength >= level ? strengthColor[passwordStrength] : "bg-[rgb(59,52,31)]/12"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[rgb(59,52,31)]/50 font-medium w-10 text-right">
                      {strengthLabel[passwordStrength]}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm" className="text-xs font-semibold text-[rgb(59,52,31)]/70 uppercase tracking-widest">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(59,52,31)]/35" strokeWidth={2} />
                  <input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Re-enter your password"
                    className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-white/60 text-[rgb(59,52,31)] text-sm placeholder:text-[rgb(59,52,31)]/30 focus:outline-none focus:ring-2 focus:ring-[rgb(221,220,104)]/60 transition-all ${
                      confirm.length > 0 && confirm !== password
                        ? "border-red-400/60 focus:border-red-400"
                        : "border-[rgb(59,52,31)]/15 focus:border-[rgb(221,220,104)]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[rgb(59,52,31)]/35 hover:text-[rgb(59,52,31)]/60 transition-colors"
                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirm.length > 0 && confirm !== password && (
                  <p className="text-xs text-red-500/80">Passwords do not match</p>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer group mt-1">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`w-4.5 h-4.5 mt-0.5 rounded border shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                    agreed
                      ? "bg-[rgb(59,52,31)] border-[rgb(59,52,31)]"
                      : "bg-white/60 border-[rgb(59,52,31)]/25 group-hover:border-[rgb(59,52,31)]/50"
                  }`}
                >
                  {agreed && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path d="M1 4L3.5 6.5L9 1" stroke="rgb(221,220,104)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-xs text-[rgb(59,52,31)]/55 leading-relaxed">
                  I agree to Sentinel&apos;s{" "}
                  <Link href="/terms" className="text-[rgb(59,52,31)] font-medium hover:underline underline-offset-2 decoration-[rgb(221,220,104)]">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[rgb(59,52,31)] font-medium hover:underline underline-offset-2 decoration-[rgb(221,220,104)]">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !agreed || (confirm.length > 0 && confirm !== password)}
                className="mt-1 w-full flex items-center justify-center gap-2.5 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold text-sm py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[rgb(236,226,208)]/30 border-t-[rgb(236,226,208)] animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Free Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer stripe */}
          <div className="px-7 lg:px-10 py-4 border-t border-[rgb(59,52,31)]/08 bg-[rgb(59,52,31)]/04 flex items-center justify-center">
            <p className="text-sm text-[rgb(59,52,31)]/55">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-[rgb(59,52,31)] hover:underline underline-offset-2 decoration-[rgb(221,220,104)]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      
    </div>
  )
}
