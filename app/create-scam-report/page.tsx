'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, ArrowLeft, AlertTriangle, ChevronDown, Loader } from 'lucide-react'

export default function CreateScamReportPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: '',
    companyName: '',
    scammerContact: '',
    category: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 2000))
    setLoading(false)
    setSubmitted(true)
  }

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      platform: '',
      companyName: '',
      scammerContact: '',
      category: '',
    })
    setSubmitted(false)
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[rgb(236,226,208)] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(221,220,104,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Navbar */}
      <nav className="relative z-20 border-b border-[rgb(59,52,31)]/10 bg-[rgb(236,226,208)]/80 backdrop-blur-lg sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[rgb(59,52,31)] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 text-[rgb(221,220,104)]" strokeWidth={2.5} />
              </div>
              <span className="text-[rgb(59,52,31)] font-semibold text-lg tracking-tight">Sentinel</span>
            </Link>

            <Link
              href="/scam-reports"
              className="inline-flex items-center gap-2 text-sm font-medium text-[rgb(59,52,31)]/70 hover:text-[rgb(59,52,31)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Reports
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[700px]">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgb(59,52,31)]/10 border border-[rgb(221,220,104)]/40 mb-6">
                  <AlertTriangle className="w-8 h-8 text-[rgb(59,52,31)]" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl font-bold text-[rgb(59,52,31)] tracking-tight mb-3">
                  Report a Scam
                </h1>
                <p className="text-lg text-[rgb(59,52,31)]/60 leading-relaxed max-w-md mx-auto">
                  Help protect the job seeker community by sharing your experience. Your report helps others stay safe.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-sm font-semibold text-[rgb(59,52,31)]/70 uppercase tracking-widest">
                    Scam Type *
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[rgb(59,52,31)]/15 bg-white/60 text-[rgb(59,52,31)] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[rgb(221,220,104)]/60 focus:border-[rgb(221,220,104)] transition-all"
                    >
                      <option value="">Select a category</option>
                      <option value="job">Fake Job Posting</option>
                      <option value="recruiter">Fraudulent Recruiter</option>
                      <option value="interview">Suspicious Interview</option>
                      <option value="payment">Upfront Payment Demand</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(59,52,31)]/35 pointer-events-none" />
                  </div>
                </div>

                {/* Scam Title */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-sm font-semibold text-[rgb(59,52,31)]/70 uppercase tracking-widest">
                    Scam Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Fake Google Recruiter - Email Phishing"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[rgb(59,52,31)]/15 bg-white/60 text-[rgb(59,52,31)] text-sm placeholder:text-[rgb(59,52,31)]/30 focus:outline-none focus:ring-2 focus:ring-[rgb(221,220,104)]/60 focus:border-[rgb(221,220,104)] transition-all"
                  />
                </div>

                {/* Platform */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="platform" className="text-sm font-semibold text-[rgb(59,52,31)]/70 uppercase tracking-widest">
                    Platform *
                  </label>
                  <input
                    id="platform"
                    type="text"
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    placeholder="e.g., LinkedIn, Indeed, Email, Phone, etc."
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[rgb(59,52,31)]/15 bg-white/60 text-[rgb(59,52,31)] text-sm placeholder:text-[rgb(59,52,31)]/30 focus:outline-none focus:ring-2 focus:ring-[rgb(221,220,104)]/60 focus:border-[rgb(221,220,104)] transition-all"
                  />
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="companyName" className="text-sm font-semibold text-[rgb(59,52,31)]/70 uppercase tracking-widest">
                    Company/Organization Name *
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g., XYZ Corp, Tech Solutions Inc, etc."
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[rgb(59,52,31)]/15 bg-white/60 text-[rgb(59,52,31)] text-sm placeholder:text-[rgb(59,52,31)]/30 focus:outline-none focus:ring-2 focus:ring-[rgb(221,220,104)]/60 focus:border-[rgb(221,220,104)] transition-all"
                  />
                </div>

                {/* Scammer Contact */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="scammerContact" className="text-sm font-semibold text-[rgb(59,52,31)]/70 uppercase tracking-widest">
                    Scammer Contact (Email/Phone) *
                  </label>
                  <input
                    id="scammerContact"
                    type="text"
                    name="scammerContact"
                    value={formData.scammerContact}
                    onChange={handleInputChange}
                    placeholder="e.g., recruiter@fake-domain.com or +1-XXX-XXX-XXXX"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[rgb(59,52,31)]/15 bg-white/60 text-[rgb(59,52,31)] text-sm placeholder:text-[rgb(59,52,31)]/30 focus:outline-none focus:ring-2 focus:ring-[rgb(221,220,104)]/60 focus:border-[rgb(221,220,104)] transition-all"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-sm font-semibold text-[rgb(59,52,31)]/70 uppercase tracking-widest">
                    Detailed Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your experience in detail. Include red flags you noticed, timeline of events, and any evidence (screenshots, emails, etc.) that can be reviewed. Be as specific as possible to help others identify similar scams."
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-[rgb(59,52,31)]/15 bg-white/60 text-[rgb(59,52,31)] text-sm placeholder:text-[rgb(59,52,31)]/30 focus:outline-none focus:ring-2 focus:ring-[rgb(221,220,104)]/60 focus:border-[rgb(221,220,104)] transition-all resize-none"
                  />
                  <p className="text-xs text-[rgb(59,52,31)]/50">
                    {formData.description.length}/1000 characters
                  </p>
                </div>

                {/* Info box */}
                <div className="flex gap-3 p-4 rounded-xl bg-[rgb(59,52,31)]/8 border border-[rgb(59,52,31)]/15">
                  <AlertTriangle className="w-5 h-5 text-[rgb(59,52,31)] shrink-0 mt-0.5" strokeWidth={2} />
                  <p className="text-sm text-[rgb(59,52,31)]/70">
                    Please provide accurate information. All reports are reviewed by our team before being published. False reports may be removed.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Submitting report...
                    </>
                  ) : (
                    <>
                      Submit Report
                      <AlertTriangle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>

                {/* Back button */}
                <Link
                  href="/scam-reports"
                  className="w-full text-center text-sm font-medium text-[rgb(59,52,31)]/60 hover:text-[rgb(59,52,31)] py-3 rounded-xl border border-[rgb(59,52,31)]/15 hover:bg-[rgb(59,52,31)]/5 transition-all"
                >
                  Cancel
                </Link>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="space-y-8 animate-fade-in-up text-center">
              {/* Success icon */}
              <div className="flex justify-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center animate-bounce"
                  style={{ background: 'rgba(221,220,104,0.2)', border: '2px solid rgb(221,220,104)' }}
                >
                  <svg className="w-10 h-10 text-[rgb(59,52,31)]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Success message */}
              <div>
                <h2 className="text-3xl font-bold text-[rgb(59,52,31)] mb-3">
                  Report Submitted Successfully
                </h2>
                <p className="text-lg text-[rgb(59,52,31)]/60 leading-relaxed">
                  Thank you for helping protect the job seeker community. Our team will review your report within 24 hours.
                </p>
              </div>

              {/* Details */}
              <div
                className="rounded-2xl border border-[rgb(221,220,104)]/30 p-6 space-y-4"
                style={{ background: 'rgba(236,226,208,0.6)', backdropFilter: 'blur(12px)' }}
              >
                <div>
                  <p className="text-sm text-[rgb(59,52,31)]/50 uppercase tracking-widest font-medium mb-1">
                    Scam Type
                  </p>
                  <p className="text-lg font-semibold text-[rgb(59,52,31)] capitalize">
                    {formData.category}
                  </p>
                </div>
                <div className="border-t border-[rgb(59,52,31)]/10 pt-4">
                  <p className="text-sm text-[rgb(59,52,31)]/50 uppercase tracking-widest font-medium mb-1">
                    Company Name
                  </p>
                  <p className="text-lg font-semibold text-[rgb(59,52,31)]">
                    {formData.companyName}
                  </p>
                </div>
              </div>

              {/* Next steps */}
              <div className="space-y-4">
                <h3 className="font-bold text-[rgb(59,52,31)]">What happens next?</h3>
                <ul className="space-y-3 text-left">
                  {[
                    'Our safety team reviews your report',
                    'We verify the information and cross-reference with other reports',
                    'Your report will be published to protect other job seekers',
                    'You can track the status from your dashboard',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-[rgb(59,52,31)]/70">
                      <span className="font-bold text-[rgb(221,220,104)]">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-[rgb(59,52,31)] text-[rgb(236,226,208)] px-8 py-3 rounded-xl hover:bg-[rgb(59,52,31)]/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Submit Another Report
                </button>
                <Link
                  href="/scam-reports"
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold border border-[rgb(59,52,31)]/20 text-[rgb(59,52,31)] px-8 py-3 rounded-xl hover:bg-[rgb(59,52,31)]/5 transition-all"
                >
                  View All Reports
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer glow */}
      <div
        className="absolute bottom-0 right-0 w-full h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(236,226,208,0.4), transparent)',
        }}
      />
    </div>
  )
}