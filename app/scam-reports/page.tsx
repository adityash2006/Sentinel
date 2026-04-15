'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, ThumbsUp, ThumbsDown, MessageSquare, Share2, Flag, Clock, AlertTriangle, Plus } from 'lucide-react'

interface ScamReport {
  id: string
  userName:string
 
  title: string
  description: string
  upvotes: number
  downvotes: number
 user_vote:string | null
  createdAt: string
 
}

const mockReports: ScamReport[] = [
 {
    id: 'report.id',
  title:' report.title',
  description:'report.description',
  userName:' report.user.name',
  upvotes: 4,
  downvotes: 6,

  user_vote:'UPVOTE' ,
  createdAt:'report.createdAt'
  },
]

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  job: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  recruiter: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
  interview: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  payment: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
}

export default function ScamReportsPage() {
  const [reports, setReports] = useState<ScamReport[]>(mockReports)
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [loading,setloading]=useState(true);
const [loadingVotes, setLoadingVotes] = useState(false);
  useEffect(()=>{
    const  fetchreports=async()=>{
      const token=localStorage.getItem("token");
      if(token){

    const repor= await fetch( `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/scam-reports`,
       {method:"POST",
      headers: {
      "Content-Type": "application/json",
    },
        body:JSON.stringify({
          token
        })
      });
    const result=await repor.json(); 

   
    if(result){
      setReports(result.formattedReports);
      setloading(false);
    }
  }
    }
    fetchreports();
  },[])

  // const reports = filterCategory
  //   ? reports.filter((r) => r.category === filterCategory)
  //   : reports

  const handleVote = async (reportId: string, voteType: 'UPVOTE' | 'DOWNVOTE') => {
   //@ts-ignore
    if (loadingVotes) return;
    setLoadingVotes(true);
    setReports(
      reports.map((report) => {
        if (report.id === reportId) {
          const currentVote = report.user_vote
          let upvotes = report.upvotes
          let downvotes = report.downvotes

         
          if (currentVote === 'UPVOTE') upvotes--
          if (currentVote === 'DOWNVOTE') downvotes--
          let user_vote=null
          
          if (currentVote!='UPVOTE' && voteType === 'UPVOTE') {upvotes++ 
            user_vote='UPVOTE'
          }
          if (currentVote!='DOWNVOTE' && voteType === 'DOWNVOTE') {downvotes++
             user_vote='DOWNVOTE'
          }

          return {
            ...report,
            upvotes,
            downvotes,
            user_vote,
          }
        }
        return report
      })
    )
    try {
    
     
 const token=localStorage.getItem("token");
        const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/vote`,
       {method:"POST",
      headers: {
      "Content-Type": "application/json",
    },
        body:JSON.stringify({
          token,reportId,voteType
        })
      });

         setLoadingVotes(false);
    
    } catch (error) {
      console.log("error while liking or diskling the post",error);
    }finally{
      setLoadingVotes(false);
    }


  }
    if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(236,226,208)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-[rgb(59,52,31)]/20 border-t-[rgb(221,220,104)] rounded-full animate-spin"></div>
          <p className="text-[rgb(59,52,31)] font-medium">Loading reports </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[rgb(236,226,208)] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
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

            <div className="flex items-center gap-4">
             
             
              <Link
                href="/create-scam-report"
                className="inline-flex items-center gap-2 text-sm font-semibold bg-[rgb(59,52,31)] text-[rgb(236,226,208)] px-4 py-2 rounded-lg hover:bg-[rgb(59,52,31)]/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                Report Scam
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 px-4 py-16 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[rgb(59,52,31)]/10 border border-[rgb(221,220,104)]/40 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-[rgb(59,52,31)]" strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl font-bold text-[rgb(59,52,31)] tracking-tight">Scam Reports</h1>
          </div>
          <p className="text-lg text-[rgb(59,52,31)]/60 max-w-2xl leading-relaxed">
            Stay informed about job scams, fraudulent recruiters, and suspicious opportunities. Read real experiences from the community.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setFilterCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterCategory === null
                ? 'bg-[rgb(59,52,31)] text-[rgb(236,226,208)] shadow-md'
                : 'bg-[rgb(59,52,31)]/8 text-[rgb(59,52,31)]/70 hover:bg-[rgb(59,52,31)]/12'
            }`}
          >
            All Reports
          </button>
          {/* {['job', 'recruiter', 'interview', 'payment'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                filterCategory === cat
                  ? 'bg-[rgb(59,52,31)] text-[rgb(236,226,208)] shadow-md'
                  : 'bg-[rgb(59,52,31)]/8 text-[rgb(59,52,31)]/70 hover:bg-[rgb(59,52,31)]/12'
              }`}
            >
              {cat}
            </button>
          ))} */}
        </div>

        {/* Reports list */}
        <div className="space-y-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="glass-card rounded-2xl p-6 sm:p-8 border shadow-sm border-[rgb(221,220,104)]/25 hover:border-[rgb(221,220,104)]/40 transition-all hover:shadow-md group"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[rgb(59,52,31)] text-[rgb(236,226,208)] flex items-center justify-center font-semibold text-sm shrink-0">
                   
                  </div>
                  <div className="min-w-0">
                
                    <p className="font-semibold text-[rgb(59,52,31)]">{report.userName}</p>
                    <div className="flex items-center gap-2 text-xs text-[rgb(59,52,31)]/50">
                      <Clock className="w-3.5 h-3.5" />
                     
                      {new Date(report.createdAt).toLocaleDateString() }
                    </div>
                  </div>
                </div>

                {/* Category badge */}
              
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[rgb(59,52,31)] mb-3 group-hover:text-[rgb(171,114,27)] transition-colors">
                {report.title}
              </h3>

              {/* Description */}
              <p className="text-[rgb(59,52,31)]/70 leading-relaxed mb-6 text-sm sm:text-base">
                {report.description}
              </p>

              {/* Footer - Vote buttons and actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[rgb(59,52,31)]/10">
                {/* Vote buttons */}
                <div className="flex items-center gap-2 ">
                  <button disabled={loadingVotes}
                    onClick={() => handleVote(report.id, 'UPVOTE')}
                    className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                      report.user_vote === 'UPVOTE'
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-[rgb(59,52,31)]/8 text-[rgb(59,52,31)]/60 hover:bg-[rgb(59,52,31)]/12'
                    } ${loadingVotes ? 'cursor-wait':'cursor-pointer'}`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {report.upvotes}
                  </button>

                  <button disabled={loadingVotes}
                    onClick={() => handleVote(report.id, 'DOWNVOTE')}
                    className={`flex  items-center  gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                      report.user_vote ==='DOWNVOTE'
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-[rgb(59,52,31)]/8 text-[rgb(59,52,31)]/60 hover:bg-[rgb(59,52,31)]/12'
                    }  ${loadingVotes ? 'cursor-wait':'cursor-pointer'}  ` }
                  >
                    <ThumbsDown className="w-4 h-4" />
                    {report.downvotes}
                  </button>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg bg-[rgb(59,52,31)]/8 text-[rgb(59,52,31)]/60 hover:bg-[rgb(59,52,31)]/12 transition-all hover:text-[rgb(59,52,31)] group/btn">
                    <MessageSquare className="w-4 h-4" />
                    <span className="sr-only">Reply</span>
                  </button>
                  <button className="p-2 rounded-lg bg-[rgb(59,52,31)]/8 text-[rgb(59,52,31)]/60 hover:bg-[rgb(59,52,31)]/12 transition-all hover:text-[rgb(59,52,31)] group/btn">
                    <Share2 className="w-4 h-4" />
                    <span className="sr-only">Share</span>
                  </button>
                  <button className="p-2 rounded-lg bg-[rgb(59,52,31)]/8 text-[rgb(59,52,31)]/60 hover:bg-red-100 transition-all hover:text-red-700 group/btn">
                    <Flag className="w-4 h-4" />
                    <span className="sr-only">Report</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div
          className="mt-16 rounded-2xl border border-[rgb(59,52,31)]/15 p-8 sm:p-12 text-center"
          style={{ background: 'rgba(59,52,31,0.08)' }}
        >
          <h3 className="text-2xl font-bold text-[rgb(59,52,31)] mb-3">
            Have a scam experience to share?
          </h3>
          <p className="text-[rgb(59,52,31)]/60 mb-6 max-w-lg mx-auto">
            Help protect other job seekers by reporting scams. Your report could prevent someone from losing money or personal data.
          </p>
          <Link
            href="/create-scam-report"
            className="inline-flex items-center justify-center gap-2.5 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold px-8 py-3.5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all group"
          >
            <Plus className="w-5 h-5" />
            Report a Scam
          </Link>
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