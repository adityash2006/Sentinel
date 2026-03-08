"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Eye, EyeOff, ArrowRight, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [wrongpassword,setwrongpassword]=useState("");
  const router=useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    e.preventDefault()
    setLoading(true);
    const response=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signin`, {
  method: "POST",
  body: JSON.stringify({ email, password }),
  headers: {
    "Content-Type": "application/json",
  },
});
const res=await response.json();
  if(response.status==201){
      const token=res.token;
      localStorage.setItem("token",token);
      router.push("/dashboard");
  }else{
    setwrongpassword(res.message);
  }
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-[rgb(236,226,208)]" />
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(221,220,104,0.25) 0%, rgba(236,226,208,0.05) 60%, transparent 80%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[rgb(59,52,31)] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-[rgb(221,220,104)]" strokeWidth={2.5} />
            </div>
            <span className="text-[rgb(59,52,31)] font-semibold text-xl tracking-tight">Sentinel</span>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[rgb(59,52,31)] tracking-tight">Welcome back</h1>
            <p className="text-sm text-[rgb(59,52,31)]/55 mt-1">Sign in to your Sentinel account</p>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl shadow-xl border border-[rgb(221,220,104)]/30 overflow-hidden"
          style={{ background: "rgba(236,226,208,0.7)", backdropFilter: "blur(16px)" }}
        >
          <div className="p-7">
            {/* Social sign-in */}
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
              <span className="text-xs text-[rgb(59,52,31)]/40 font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-[rgb(59,52,31)]/12" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold text-[rgb(59,52,31)]/70 uppercase tracking-widest">
                    Password
                  </label>
                 
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(59,52,31)]/35" strokeWidth={2} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)
                      setwrongpassword("");
                    }
                    }
                    placeholder="••••••••"
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
              </div>
              {wrongpassword && (
                  <p className="text-xs text-red-500/80">{wrongpassword}</p>
                )}
              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 cursor-pointer w-full flex items-center justify-center gap-2.5 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold text-sm py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[rgb(236,226,208)]/30 border-t-[rgb(236,226,208)] animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer stripe */}
          <div className="px-7 py-4 border-t border-[rgb(59,52,31)]/08 bg-[rgb(59,52,31)]/04 flex items-center justify-center">
            <p className="text-sm text-[rgb(59,52,31)]/55">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[rgb(59,52,31)] hover:underline underline-offset-2 decoration-[rgb(221,220,104)]"
              >
                Create one free
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom trust line */}
        <p className="text-center text-xs text-[rgb(59,52,31)]/35 mt-6">
          Protected by Sentinel&apos;s end-to-end encryption. We never sell your data.
        </p>
      </div>
    </div>
  )
}
