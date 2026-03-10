'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertTriangle, User, LogOut } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem('token');

      if (!token) {
        router.replace('/signin');
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status !== 201) {
          router.replace('/signin');
        } else {
          setAuthorized(true);
          // Extract user name from localStorage or set default
          const user = localStorage.getItem('user');
          if (user) {
            try {
              const userData = JSON.parse(user);
              setUserName(userData.name || 'User');
            } catch {
              setUserName('User');
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/signin');
      }

      setChecking(false);
    }

    checkAuth();
  }, [router]);

  function logout() {
    localStorage.removeItem('token');
    router.replace('/signin');
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[rgb(236,226,208)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-[rgb(59,52,31)]/20 border-t-[rgb(221,220,104)] rounded-full animate-spin"></div>
          <p className="text-[rgb(59,52,31)] font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[rgb(236,226,208)] dot-grid">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[rgb(236,226,208)]/80 border-b border-[rgb(221,220,104)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[rgb(221,220,104)] rounded-lg flex items-center justify-center">
              <span className="font-bold text-[rgb(59,52,31)]">S</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-[rgb(59,52,31)]">Sentinel</h1>
              <p className="text-xs text-[rgb(59,52,31)]/60">Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[rgb(59,52,31)]">Welcome, {userName}</p>
              <p className="text-xs text-[rgb(59,52,31)]/60">Verify. Analyze. Optimize.</p>
            </div>
            <button
              onClick={logout}
              className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-medium hover:bg-[rgb(59,52,31)]/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Welcome Section */}
        <div className="mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-[rgb(59,52,31)] mb-4 text-balance">
            Your Job Safety Hub
          </h2>
          <p className="text-lg text-[rgb(59,52,31)]/70 max-w-2xl">
            Protect yourself from job scams, verify recruiters, and optimize your resume with AI-powered insights.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Analyze Resume */}
          <div className="group glass-card rounded-2xl p-8 overflow-hidden relative border border-[rgb(221,220,104)]/25 hover:border-[rgb(221,220,104)]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(221,220,104)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 bg-[rgb(221,220,104)]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[rgb(221,220,104)]/30 transition-colors">
                <CheckCircle2 className="w-7 h-7 text-[rgb(232, 228, 31)]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[rgb(59,52,31)] mb-3">
                Resume Analyzer
              </h3>

              {/* Description */}
              <p className="text-[rgb(59,52,31)]/70 mb-6 leading-relaxed">
                Upload your resume and get instant ATS compatibility scores, keyword optimization tips, and actionable insights to pass automated screening systems.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8 py-4 border-y border-[rgb(221,220,104)]/20">
                <div>
                  <p className="text-sm text-[rgb(59,52,31)]/60">ATS Score</p>
                  <p className="text-xl font-bold text-[rgb(84,85,52)]">87/100</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(59,52,31)]/60">Keywords</p>
                  <p className="text-xl font-bold text-[rgb(84,85,52)]">24</p>
                </div>
              </div>

              {/* Button */}
              <Link
                href="/analyze-resume"
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold rounded-xl hover:bg-[rgb(59,52,31)]/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
              >
                Analyze Resume
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 2: Check Job Post */}
          <div className="group glass-card rounded-2xl p-8 overflow-hidden relative border border-[rgb(221,220,104)]/25 hover:border-[rgb(221,220,104)]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(221,220,104)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 bg-[rgb(221,220,104)]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[rgb(221,220,104)]/30 transition-colors">
                <AlertTriangle className="w-7 h-7 text-[rgb(232, 228, 31)]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[rgb(59,52,31)] mb-3">
                Job Post Checker
              </h3>

              {/* Description */}
              <p className="text-[rgb(59,52,31)]/70 mb-6 leading-relaxed">
                Analyze job postings to detect red flags and scams. Get instant alerts on suspicious listings, unrealistic offers, and fraudulent recruiters.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8 py-4 border-y border-[rgb(221,220,104)]/20">
                <div>
                  <p className="text-sm text-[rgb(59,52,31)]/60">Scams Detected</p>
                  <p className="text-xl font-bold text-[rgb(84,85,52)]">1,234</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(59,52,31)]/60">Accuracy</p>
                  <p className="text-xl font-bold text-[rgb(84,85,52)]">98%</p>
                </div>
              </div>

              {/* Button */}
              <Link
                href="/check-jobpost"
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold rounded-xl hover:bg-[rgb(59,52,31)]/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
              >
                Check Job Post
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 3: Scan My Profile */}
          <div className="group glass-card rounded-2xl p-8 overflow-hidden relative border border-[rgb(221,220,104)]/25 hover:border-[rgb(221,220,104)]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(221,220,104)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 bg-[rgb(221,220,104)]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[rgb(221,220,104)]/30 transition-colors">
                <User className="w-7 h-7 text-[rgb(232, 228, 31)]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[rgb(59,52,31)] mb-3">
                Profile Optimizer
              </h3>

              {/* Description */}
              <p className="text-[rgb(59,52,31)]/70 mb-6 leading-relaxed">
                Scan and optimize your LinkedIn and social profiles. Get AI-driven recommendations to improve your professional presence and attract quality opportunities.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8 py-4 border-y border-[rgb(221,220,104)]/20">
                <div>
                  <p className="text-sm text-[rgb(59,52,31)]/60">Profile Score</p>
                  <p className="text-xl font-bold text-[rgb(84,85,52)]">92/100</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(59,52,31)]/60">Tips</p>
                  <p className="text-xl font-bold text-[rgb(84,85,52)]">12</p>
                </div>
              </div>

              {/* Button */}
              <Link
                href="/scan-myprofile"
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold rounded-xl hover:bg-[rgb(59,52,31)]/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
              >
                Scan Profile
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card-dark rounded-2xl p-12 text-center border border-[rgb(221,220,104)]/15 overflow-hidden relative">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[rgb(221,220,104)] opacity-5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-[rgb(236,226,208)] mb-3">
              Pro Tips & Best Practices
            </h3>
            <p className="text-[rgb(236,226,208)]/80 mb-6 max-w-2xl mx-auto">
              Check back regularly to stay updated on the latest job scam tactics and recruiter verification insights. Your safety is our priority.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[rgb(221,220,104)] text-[rgb(59,52,31)] font-semibold rounded-xl hover:bg-[rgb(221,220,104)]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Back to Home
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
