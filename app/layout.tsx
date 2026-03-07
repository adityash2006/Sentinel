import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sentinel — Verify Opportunities. Avoid Scams.',
  description:
    'Sentinel helps job seekers verify recruiters, analyze job posts, and optimize their profiles so they can apply with confidence.',
  keywords: ['job scam detector', 'recruiter verification', 'resume optimizer', 'ATS score', 'job fraud'],
  openGraph: {
    title: 'Sentinel — Verify Opportunities. Avoid Scams.',
    description:
      'AI-powered job scam detection, recruiter verification, and resume optimization.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sentinel — Verify Opportunities. Avoid Scams.',
    description: 'AI-powered job scam detection and recruiter verification.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
