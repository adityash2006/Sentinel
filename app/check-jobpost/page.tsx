'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Search, CheckCircle2, AlertTriangle, TrendingUp, Zap, Eye, Users, Target, Lock } from 'lucide-react'

export default function JobAnalysisPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [currentAgent, setCurrentAgent] = useState(0)

  const agents = [
    { icon: Eye, title: 'Profile Consistency Agent', subtext: 'Checking bio vs claims mismatch' },
    { icon: Target, title: 'Historical Behavior Agent', subtext: 'Scanning past posts and engagement patterns' },
    { icon: Zap, title: 'Linguistic & Pattern Agent', subtext: 'Analyzing tone, urgency, and suspicious phrasing' },
    { icon: Lock, title: 'Organization Verification Agent', subtext: 'Searching for public evidence of hiring activity' },
    { icon: Users, title: 'Reputation & Network Agent', subtext: 'Analyzing followers, engagement, and trust indicators' },
  ]

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setCurrentAgent(0)

    // Simulate agent pipeline with staggered timing
    for (let i = 0; i < agents.length; i++) {
      await new Promise((r) => setTimeout(r, 1200))
      setCurrentAgent(i + 1)
    }

    await new Promise((r) => setTimeout(r, 500))
    setLoading(false)
    setAnalyzed(true)
  }

  return (
    <div className="relative min-h-screen bg-[rgb(236,226,208)] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(221,220,104,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Navbar */}
      <nav className="relative z-20 border-b border-[rgb(59,52,31)]/10 bg-[rgb(236,226,208)]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[rgb(59,52,31)] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 text-[rgb(221,220,104)]" strokeWidth={2.5} />
              </div>
              <span className="text-[rgb(59,52,31)] font-semibold text-lg tracking-tight">Sentinel</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-[rgb(59,52,31)]/70 hover:text-[rgb(59,52,31)] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/signin"
                className="text-sm font-semibold bg-[rgb(59,52,31)] text-[rgb(236,226,208)] px-5 py-2.5 rounded-xl hover:bg-[rgb(59,52,31)]/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-16 min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-[680px]">
          {!loading && !analyzed ? (
            /* STATE 1: INPUT */
            <div className="space-y-8 animate-fade-in-up">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgb(59,52,31)]/10 border border-[rgb(221,220,104)]/40 mb-6">
                  <Search className="w-8 h-8 text-[rgb(59,52,31)]" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl font-bold text-[rgb(59,52,31)] tracking-tight mb-3">
                  Analyze Job Post
                </h1>
                <p className="text-lg text-[rgb(59,52,31)]/60 leading-relaxed max-w-md mx-auto">
                  Paste a LinkedIn or X job post or recruiter profile URL to instantly detect scams and verify authenticity.
                </p>
              </div>

              {/* Input Form */}
              <form onSubmit={handleAnalyze} className="space-y-6">
                {/* URL Input */}
                <div className="relative group">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste LinkedIn or X job post or profile URL…"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-[rgb(59,52,31)]/20 bg-white/60 text-[rgb(59,52,31)] placeholder-[rgb(59,52,31)]/40 focus:outline-none focus:border-[rgb(221,220,104)] focus:ring-2 focus:ring-[rgb(221,220,104)]/30 transition-all text-lg"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(59,52,31)]/40 pointer-events-none" />
                </div>

                {/* Helper text */}
                <p className="text-sm text-[rgb(59,52,31)]/60 text-center">
                  We automatically analyze recruiter profile, history, and behavior patterns
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="w-full flex items-center justify-center gap-3 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed group text-lg"
                >
                  <Search className="w-5 h-5" strokeWidth={2} />
                  Analyze Post
                </button>
              </form>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[rgb(59,52,31)]/15">
                {[
                  { icon: CheckCircle2, label: 'Instant Analysis', desc: 'Real-time results' },
                  { icon: AlertTriangle, label: 'Red Flags', desc: 'Detects suspicious patterns' },
                  { icon: TrendingUp, label: 'Trust Score', desc: 'Comprehensive breakdown' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="text-center p-4">
                    <Icon className="w-6 h-6 text-[rgb(221,220,104)] mx-auto mb-2" strokeWidth={1.5} />
                    <p className="font-semibold text-[rgb(59,52,31)] text-sm">{label}</p>
                    <p className="text-xs text-[rgb(59,52,31)]/50 mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : loading ? (
            /* STATE 2: LOADING */
            <div className="space-y-12">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgb(221,220,104)]/15 border border-[rgb(221,220,104)]/40 mb-6 animate-pulse">
                  <Zap className="w-8 h-8 text-[rgb(221,220,104)]" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-bold text-[rgb(59,52,31)] tracking-tight">
                  Analyzing Job Post
                </h2>
                <p className="text-[rgb(59,52,31)]/60 mt-2">AI agents working in real-time...</p>
              </div>

              {/* Agent Pipeline */}
              <div className="space-y-4">
                {agents.map((agent, idx) => {
                  const Icon = agent.icon
                  const isCompleted = idx < currentAgent
                  const isActive = idx === currentAgent

                  return (
                    <div
                      key={idx}
                      className={`relative p-6 rounded-2xl transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-50/60 border border-green-200/40'
                          : isActive
                          ? 'bg-[rgb(221,220,104)]/15 border border-[rgb(221,220,104)]/50 scale-105'
                          : 'bg-[rgb(59,52,31)]/4 border border-[rgb(59,52,31)]/15 opacity-40'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                            isCompleted
                              ? 'bg-green-200/60 text-green-700'
                              : isActive
                              ? 'bg-[rgb(221,220,104)]/40 text-[rgb(59,52,31)] animate-pulse'
                              : 'bg-[rgb(59,52,31)]/15 text-[rgb(59,52,31)]/40'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
                          ) : (
                            <Icon className="w-6 h-6" strokeWidth={2} />
                          )}
                        </div>

                        <div className="flex-1">
                          <h3
                            className={`font-semibold text-lg transition-colors ${
                              isActive || isCompleted
                                ? 'text-[rgb(59,52,31)]'
                                : 'text-[rgb(59,52,31)]/60'
                            }`}
                          >
                            {agent.title}
                          </h3>
                          <p
                            className={`text-sm transition-colors ${
                              isActive || isCompleted
                                ? 'text-[rgb(59,52,31)]/70'
                                : 'text-[rgb(59,52,31)]/40'
                            }`}
                          >
                            {agent.subtext}
                          </p>
                        </div>

                        {isActive && (
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <div
                                key={i}
                                className="w-1.5 h-6 rounded-full bg-[rgb(221,220,104)] animate-pulse"
                                style={{
                                  animationDelay: `${i * 150}ms`,
                                  animationDuration: '1s',
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Progress info */}
              <div className="text-center">
                <p className="text-sm text-[rgb(59,52,31)]/60">
                  Step {currentAgent} of {agents.length} • Almost done...
                </p>
              </div>
            </div>
          ) : (
            /* STATE 3: RESULTS */
            <div className="space-y-8 animate-fade-in-up">
              {/* Trust Score Card */}
              <div
                className="rounded-2xl border border-[rgb(221,220,104)]/40 p-8 shadow-lg"
                style={{ background: 'rgba(236,226,208,0.7)', backdropFilter: 'blur(12px)' }}
              >
                <div className="text-center mb-8">
                  <p className="text-sm text-[rgb(59,52,31)]/50 uppercase tracking-widest font-medium mb-4">
                    Trust Score
                  </p>

                  {/* Circular Score */}
                  <div className="flex justify-center mb-8">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(59,52,31,0.1)" strokeWidth="4" />
                        <circle
                          cx="60"
                          cy="60"
                          r="56"
                          fill="none"
                          stroke="rgb(221,220,104)"
                          strokeWidth="4"
                          strokeDasharray={`${(72 / 100) * 351} 351`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-[rgb(59,52,31)]">72</span>
                        <span className="text-xs text-[rgb(59,52,31)]/60 uppercase tracking-widest font-medium">Safe</span>
                      </div>
                    </div>
                  </div>

                  {/* Status color coding */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/60 border border-green-200/40 mb-6">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                    <span className="text-sm font-semibold text-green-700">This post appears legitimate</span>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="mb-6 p-4 rounded-xl bg-[rgb(59,52,31)]/4 border border-[rgb(59,52,31)]/15">
                  <p className="text-sm text-[rgb(59,52,31)]/80 leading-relaxed">
                    This posting shows positive indicators including consistent profile information, legitimate company verification, and realistic job requirements. However, some minor caution flags are present.
                  </p>
                </div>
              </div>

              {/* Red Flags Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" strokeWidth={2} />
                  <h3 className="text-lg font-bold text-[rgb(59,52,31)]">Caution Flags</h3>
                </div>
                <div className="space-y-2">
                  {[
                    'Vague job description lacks specific responsibilities',
                    'Salary range seems higher than market average',
                  ].map((flag, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg bg-red-50/60 border border-red-200/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                      <p className="text-sm text-red-700">{flag}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Positive Signals Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" strokeWidth={2} />
                  <h3 className="text-lg font-bold text-[rgb(59,52,31)]">Positive Signals</h3>
                </div>
                <div className="space-y-2">
                  {[
                    'Verified company profile with active hiring history',
                    'Consistent recruiter profile with multiple successful placements',
                    'No suspicious external links or urgent language patterns',
                    'Professional company domain and legitimate contact information',
                  ].map((signal, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg bg-green-50/60 border border-green-200/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" />
                      <p className="text-sm text-green-700">{signal}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Breakdown */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[rgb(59,52,31)]">How This Was Analyzed</h3>
                <p className="text-sm text-[rgb(59,52,31)]/60 mb-4">
                  Final Trust Score is calculated as a weighted combination of all agents
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    { agent: 'Profile Consistency', score: 72 },
                    { agent: 'Historical Behavior', score: 65 },
                    { agent: 'Linguistic Analysis', score: 80 },
                    { agent: 'Organization Verification', score: 78 },
                    { agent: 'Reputation Score', score: 68 },
                  ].map(({ agent, score }) => (
                    <div key={agent} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[rgb(59,52,31)]">{agent}</p>
                        <p className="text-sm font-bold text-[rgb(221,220,104)]">{score}/100</p>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[rgb(59,52,31)]/12 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[rgb(221,220,104)] to-[rgb(221,220,104)]/60 rounded-full transition-all duration-1000"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div
                className="rounded-2xl border border-[rgb(59,52,31)]/15 p-8 text-center"
                style={{ background: 'rgba(59,52,31,0.08)' }}
              >
                <h3 className="text-lg font-bold text-[rgb(59,52,31)] mb-3">
                  Want to analyze more posts?
                </h3>
                <p className="text-sm text-[rgb(59,52,31)]/60 mb-6">
                  Create an account to save analysis history and get detailed reports.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2.5 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                >
                  Create Free Account
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </Link>
              </div>

              {/* Reset button */}
              <button
                onClick={() => {
                  setUrl('')
                  setAnalyzed(false)
                  setCurrentAgent(0)
                }}
                className="w-full text-sm font-medium text-[rgb(59,52,31)]/60 hover:text-[rgb(59,52,31)] py-3 rounded-xl border border-[rgb(59,52,31)]/15 hover:bg-[rgb(59,52,31)]/5 transition-all"
              >
                Analyze Another Post
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer glow */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(236,226,208,0.4), transparent)',
        }}
      />
    </div>
  )
}