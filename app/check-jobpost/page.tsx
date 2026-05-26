'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Shield, Search, CheckCircle2, AlertTriangle, TrendingUp,
  Zap, Eye, Users, Target, Lock, RotateCcw, ArrowLeft,
} from 'lucide-react'



interface AgentResult {
  score: number
  summary: string
  cautionFlags: string[]
  positiveSignals: string[]
}

interface AnalysisReport {
  trustScore: number
  verdict: 'SAFE' | 'CAUTION' | 'LIKELY_SCAM'
  verdictLabel: string
  aiSummary: string
  cautionFlags: string[]
  positiveSignals: string[]
  agents: {
    profileConsistency: AgentResult
    historicalBehavior: AgentResult
    linguisticPattern: AgentResult
    organizationVerification: AgentResult
    reputationNetwork: AgentResult
  }
}

// ─── Agent metadata ────────────────────────────────────────────────────────────

const AGENTS = [
  { key: 'profileConsistency', icon: Eye, title: 'Profile Consistency Agent', subtext: 'Checking bio vs claims mismatch' },
  { key: 'historicalBehavior', icon: Target, title: 'Historical Behavior Agent', subtext: 'Scanning past posts and engagement patterns' },
  { key: 'linguisticPattern', icon: Zap, title: 'Linguistic & Pattern Agent', subtext: 'Analyzing tone, urgency, and suspicious phrasing' },
  { key: 'organizationVerification', icon: Lock, title: 'Organization Verification Agent', subtext: 'Searching for public evidence of hiring activity' },
  { key: 'reputationNetwork', icon: Users, title: 'Reputation & Network Agent', subtext: 'Analyzing followers, engagement, and trust indicators' },
] as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getVerdictStyle(verdict: string) {
  if (verdict === 'SAFE') return { ring: 'bg-green-100/60 border-green-200/40', dot: 'bg-green-600', text: 'text-green-700', stroke: 'rgb(34,197,94)' }
  if (verdict === 'CAUTION') return { ring: 'bg-amber-100/60 border-amber-200/40', dot: 'bg-amber-500', text: 'text-amber-700', stroke: 'rgb(245,158,11)' }
  return { ring: 'bg-red-100/60 border-red-200/40', dot: 'bg-red-600', text: 'text-red-700', stroke: 'rgb(220,38,38)' }
}

function AgentScoreBadge({ score }: { score: number }) {
  const color = score >= 70 ? 'text-green-600' : score >= 40 ? 'text-amber-600' : 'text-red-600'
  return <span className={`text-sm font-bold ${color}`}>{score}/100</span>
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function JobAnalysisPage() {
  const [url, setUrl] = useState('')
  const [postText, setPostText] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentAgent, setCurrentAgent] = useState(-1)
  const [report, setReport] = useState<AnalysisReport | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedUrl = url.trim()
    const trimmedText = postText.trim()
    if (!trimmedUrl && !trimmedText) return

    setLoading(true)
    setReport(null)
    setError(null)
    setCurrentAgent(0)

    // Simulate sequential agent progress UI while the real request is in flight
    const agentTimer = setInterval(() => {
      setCurrentAgent((prev) => {
        if (prev < AGENTS.length - 1) return prev + 1
        clearInterval(agentTimer)
        return prev
      })
    }, 3500)

    try {
      const res = await fetch(
        
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'}/api/jobpost/analyze`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: trimmedUrl || undefined, postText: trimmedText || undefined }),
        }
      )

      clearInterval(agentTimer)
      setCurrentAgent(AGENTS.length) // all done

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Analysis failed. Please try again.')
      }

      const data: AnalysisReport = await res.json()
      await new Promise((r) => setTimeout(r, 400))
      setReport(data)
    } catch (err: any) {
      clearInterval(agentTimer)
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setUrl('')
    setPostText('')
    setReport(null)
    setError(null)
    setCurrentAgent(-1)
  }

  const verdictStyle = report ? getVerdictStyle(report.verdict) : null

  return (
    <div className="relative min-h-screen bg-[rgb(236,226,208)] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(221,220,104,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
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
              <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-[rgb(59,52,31)]/70 hover:text-[rgb(59,52,31)] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-16 min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-[720px]">

          {/* ── STATE 1: INPUT ─────────────────────────────────────────────── */}
          {!loading && !report && (
            <div className="space-y-8 animate-fade-in-up">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgb(59,52,31)]/10 border border-[rgb(221,220,104)]/40 mb-6">
                  <Search className="w-8 h-8 text-[rgb(59,52,31)]" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl font-bold text-[rgb(59,52,31)] tracking-tight mb-3">Analyze Job Post</h1>
                <p className="text-lg text-[rgb(59,52,31)]/60 leading-relaxed max-w-md mx-auto">
                  Paste a recruiter's X/Twitter URL or copy-paste the job post text. Our 5 AI agents will verify its legitimacy.
                </p>
              </div>

              {/* Error banner */}
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50/70 border border-red-200/50">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleAnalyze} className="space-y-4">
                {/* URL Input */}
                <div className="relative group">
                  <input
                    type="text"
                    id="post-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste X/Twitter recruiter or job post URL…"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-[rgb(59,52,31)]/20 bg-white/60 text-[rgb(59,52,31)] placeholder-[rgb(59,52,31)]/40 focus:outline-none focus:border-[rgb(221,220,104)] focus:ring-2 focus:ring-[rgb(221,220,104)]/30 transition-all text-base"
                  />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-[rgb(59,52,31)]/15" />
                  <span className="text-xs text-[rgb(59,52,31)]/40 font-medium uppercase tracking-wider">or paste post text</span>
                  <div className="flex-1 h-px bg-[rgb(59,52,31)]/15" />
                </div>

                {/* Post Text */}
                <textarea
                  id="post-text"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Paste the job post text here…"
                  rows={5}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-[rgb(59,52,31)]/20 bg-white/60 text-[rgb(59,52,31)] placeholder-[rgb(59,52,31)]/40 focus:outline-none focus:border-[rgb(221,220,104)] focus:ring-2 focus:ring-[rgb(221,220,104)]/30 transition-all text-base resize-none"
                />

                <p className="text-sm text-[rgb(59,52,31)]/50 text-center">
                  Providing both URL and post text gives the most accurate results
                </p>

                <button
                  type="submit"
                  id="analyze-btn"
                  disabled={!url.trim() && !postText.trim()}
                  className="w-full flex items-center justify-center gap-3 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed group text-lg"
                >
                  <Search className="w-5 h-5" strokeWidth={2} />
                  Analyze Post
                </button>
              </form>

              {/* Feature pills */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[rgb(59,52,31)]/15">
                {[
                  { icon: CheckCircle2, label: 'Instant Analysis', desc: 'Real-time AI results' },
                  { icon: AlertTriangle, label: 'Red Flags', desc: 'Detects suspicious patterns' },
                  { icon: TrendingUp, label: 'Trust Score', desc: 'Weighted agent breakdown' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="text-center p-4">
                    <Icon className="w-6 h-6 text-[rgb(221,220,104)] mx-auto mb-2" strokeWidth={1.5} />
                    <p className="font-semibold text-[rgb(59,52,31)] text-sm">{label}</p>
                    <p className="text-xs text-[rgb(59,52,31)]/50 mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STATE 2: LOADING ────────────────────────────────────────────── */}
          {loading && (
            <div className="space-y-12">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgb(221,220,104)]/15 border border-[rgb(221,220,104)]/40 mb-6 animate-pulse">
                  <Zap className="w-8 h-8 text-[rgb(221,220,104)]" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-bold text-[rgb(59,52,31)] tracking-tight">Analyzing Job Post</h2>
                <p className="text-[rgb(59,52,31)]/60 mt-2">5 AI agents working in real-time…</p>
              </div>

              <div className="space-y-4">
                {AGENTS.map((agent, idx) => {
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
                          ? 'bg-[rgb(221,220,104)]/15 border border-[rgb(221,220,104)]/50 scale-[1.02]'
                          : 'bg-[rgb(59,52,31)]/4 border border-[rgb(59,52,31)]/15 opacity-40'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                          isCompleted ? 'bg-green-200/60 text-green-700'
                          : isActive ? 'bg-[rgb(221,220,104)]/40 text-[rgb(59,52,31)] animate-pulse'
                          : 'bg-[rgb(59,52,31)]/15 text-[rgb(59,52,31)]/40'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} /> : <Icon className="w-6 h-6" strokeWidth={2} />}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold text-lg ${isActive || isCompleted ? 'text-[rgb(59,52,31)]' : 'text-[rgb(59,52,31)]/60'}`}>
                            {agent.title}
                          </h3>
                          <p className={`text-sm ${isActive || isCompleted ? 'text-[rgb(59,52,31)]/70' : 'text-[rgb(59,52,31)]/40'}`}>
                            {agent.subtext}
                          </p>
                        </div>
                        {isActive && (
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <div
                                key={i}
                                className="w-1.5 h-6 rounded-full bg-[rgb(221,220,104)] animate-pulse"
                                style={{ animationDelay: `${i * 150}ms`, animationDuration: '1s' }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="text-center">
                <p className="text-sm text-[rgb(59,52,31)]/60">
                  Step {Math.min(currentAgent + 1, AGENTS.length)} of {AGENTS.length} • This may take 15–30 seconds
                </p>
              </div>
            </div>
          )}

          {/* ── STATE 3: RESULTS ────────────────────────────────────────────── */}
          {report && verdictStyle && (
            <div className="space-y-8 animate-fade-in-up">

              {/* Trust Score Card */}
              <div className="rounded-2xl border border-[rgb(221,220,104)]/40 p-8 shadow-lg" style={{ background: 'rgba(236,226,208,0.7)', backdropFilter: 'blur(12px)' }}>
                <div className="text-center mb-8">
                  <p className="text-sm text-[rgb(59,52,31)]/50 uppercase tracking-widest font-medium mb-4">Trust Score</p>

                  {/* Circular score */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-36 h-36">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(59,52,31,0.1)" strokeWidth="6" />
                        <circle
                          cx="60" cy="60" r="52"
                          fill="none"
                          stroke={verdictStyle.stroke}
                          strokeWidth="6"
                          strokeDasharray={`${(report.trustScore / 100) * 327} 327`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold text-[rgb(59,52,31)]">{report.trustScore}</span>
                        <span className="text-xs text-[rgb(59,52,31)]/60 uppercase tracking-widest font-medium">/ 100</span>
                      </div>
                    </div>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 ${verdictStyle.ring}`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${verdictStyle.dot}`} />
                    <span className={`text-sm font-semibold ${verdictStyle.text}`}>{report.verdictLabel}</span>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="p-4 rounded-xl bg-[rgb(59,52,31)]/4 border border-[rgb(59,52,31)]/12">
                  <p className="text-sm text-[rgb(59,52,31)]/80 leading-relaxed">{report.aiSummary}</p>
                </div>
              </div>

              {/* Caution Flags */}
              {report.cautionFlags.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" strokeWidth={2} />
                    <h3 className="text-lg font-bold text-[rgb(59,52,31)]">Caution Flags</h3>
                    <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200/40">
                      {report.cautionFlags.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {report.cautionFlags.map((flag, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-lg bg-red-50/60 border border-red-200/40">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                        <p className="text-sm text-red-700">{flag}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Positive Signals */}
              {report.positiveSignals.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" strokeWidth={2} />
                    <h3 className="text-lg font-bold text-[rgb(59,52,31)]">Positive Signals</h3>
                    <span className="ml-auto text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200/40">
                      {report.positiveSignals.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {report.positiveSignals.map((signal, i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-lg bg-green-50/60 border border-green-200/40">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" />
                        <p className="text-sm text-green-700">{signal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agent Breakdown */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[rgb(59,52,31)]">Agent Breakdown</h3>
                  <p className="text-sm text-[rgb(59,52,31)]/60 mt-1">
                    Trust score is a weighted combination of all 5 agent scores
                  </p>
                </div>
                <div className="space-y-5">
                  {AGENTS.map((agentMeta) => {
                    const result = report.agents[agentMeta.key as keyof typeof report.agents]
                    const Icon = agentMeta.icon
                    const barColor = result.score >= 70 ? 'from-green-400 to-green-300' : result.score >= 40 ? 'from-amber-400 to-amber-300' : 'from-red-500 to-red-400'
                    return (
                      <div key={agentMeta.key} className="p-4 rounded-xl bg-white/40 border border-[rgb(59,52,31)]/10 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[rgb(59,52,31)]/8 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-[rgb(59,52,31)]/60" strokeWidth={2} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-semibold text-[rgb(59,52,31)] truncate">{agentMeta.title}</p>
                              <AgentScoreBadge score={result.score} />
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[rgb(59,52,31)]/10 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-1000`}
                            style={{ width: `${result.score}%` }}
                          />
                        </div>
                        <p className="text-xs text-[rgb(59,52,31)]/60 leading-relaxed">{result.summary}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Reset */}
              <button
                id="analyze-another-btn"
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-[rgb(59,52,31)]/70 hover:text-[rgb(59,52,31)] py-3 rounded-xl border border-[rgb(59,52,31)]/15 hover:bg-[rgb(59,52,31)]/5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Analyze Another Post
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer glow */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(236,226,208,0.4), transparent)' }}
      />
    </div>
  )
}