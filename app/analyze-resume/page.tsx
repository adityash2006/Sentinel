"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Upload, FileText, ArrowRight, AlertCircle, CheckCircle2, Sparkles, Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
type AnalysisResult = {
  score: number
  match_percentage: number | null
  strengths: string[]
  improvements: string[]
  
}
export default function AnalyzeResumePage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [dragActive, setDragActive] = useState(false);
  const [jd, setjd] = useState("");
  const router=useRouter();

  const defaultAnalysis: AnalysisResult = {
  score: 0,
  match_percentage: 20,
  strengths: [],
  improvements: [],
 
}
  const [analysisresult,setanalysisresult]=useState<AnalysisResult>(defaultAnalysis);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".pdf")) {
        setFile(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return

    setLoading(true);
   const formData=new FormData();
   formData.append("resume",file);
   formData.append("jobDescription", jd);
     try {
      
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/analyze-resume`,
          {
           method:"POST",
           body:formData
          }
        );
          const result=await res.json();
        setanalysisresult(result.message);
        console.log(analysisresult);
      
   
        // console.log(result);
      } catch (error) {
        console.log("File upload logic error");
       console.log(error);
      }
       setLoading(false);
    setAnalyzed(true);
   
  }

  const handleReset = () => {
    setFile(null)
    setAnalyzed(false)
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[rgb(236,226,208)] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(221,220,104,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
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
              {/* <Link
                href="/signin"
                className="text-sm font-medium text-[rgb(59,52,31)]/70 hover:text-[rgb(59,52,31)] transition-colors"
              >
                Sign In
              </Link> */}
              <Link
                href="/dashboard"
                className="text-sm font-semibold bg-[rgb(59,52,31)] text-[rgb(236,226,208)] px-4 py-2 rounded-lg hover:bg-[rgb(59,52,31)]/90 transition-all"
              >
                <ArrowLeft />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[640px]">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgb(59,52,31)]/10 border border-[rgb(221,220,104)]/40 mb-6">
              <FileText className="w-8 h-8 text-[rgb(59,52,31)]" strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl font-bold text-[rgb(59,52,31)] tracking-tight mb-3">
              Analyze Your Resume
            </h1>
            <p className="text-lg text-[rgb(59,52,31)]/60 leading-relaxed max-w-md mx-auto">
              Get instant insights on your resume strength, ATS compatibility, and tips to improve your chances of getting hired.
            </p>
          </div>

          {!analyzed ? (
            /* Upload Section */
            <form onSubmit={handleAnalyze} className="space-y-6">
              {/* Upload Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 text-center cursor-pointer ${
                  dragActive
                    ? "border-[rgb(221,220,104)] bg-[rgb(221,220,104)]/8"
                    : "border-[rgb(59,52,31)]/20 bg-[rgb(59,52,31)]/4 hover:border-[rgb(221,220,104)]/40 hover:bg-[rgb(221,220,104)]/5"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                  required
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${
                        dragActive
                          ? "bg-[rgb(221,220,104)]/25 text-[rgb(221,220,104)]"
                          : "bg-[rgb(59,52,31)]/10 text-[rgb(59,52,31)]"
                      }`}
                    >
                      <Upload className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[rgb(59,52,31)]">
                        {file ? file.name : "Drop your resume here"}
                      </p>
                      <p className="text-sm text-[rgb(59,52,31)]/50 mt-1">
                        {file
                          ? `Selected • ${(file.size / 1024).toFixed(1)} KB`
                          : "or click to browse (PDF only)"}
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              <div><p className="mb-4">JOB DESCRITION (optional) </p>
                    <input type="text" onChange={(e)=>setjd(e.target.value)} className="p-3 border-3 border-[rgb(59,52,31)]/20 rounded-lg text-black w-full" />
                </div>                           
              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Sparkles, label: "ATS Score" },
                  { icon: CheckCircle2, label: "Improvements" },
                  { icon: AlertCircle, label: "Red Flags" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[rgb(59,52,31)]/15 bg-white/40"
                  >
                    <Icon className="w-5 h-5 text-[rgb(59,52,31)]" strokeWidth={2} />
                    <span className="text-xs font-medium text-[rgb(59,52,31)]/60 uppercase tracking-widest">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={!file || loading}
                className="w-full cursor-pointer flex items-center justify-center gap-3 bg-[rgb(59,52,31)] text-[rgb(236,226,208)] font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing your resume...
                  </>
                ) : (
                  <>
                    Generate Insights
                    <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>

              {/* Info box */}
              <div className="flex gap-3 p-4 rounded-xl bg-[rgb(59,52,31)]/8 border border-[rgb(59,52,31)]/15">
                <AlertCircle className="w-5 h-5 text-[rgb(59,52,31)] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-sm text-[rgb(59,52,31)]/70">
                  Your resume is analyzed locally and securely. We never store your data.
                </p>
              </div>
            </form>
          )  : (
            /* Results Section */
            <div className="space-y-8 animate-fade-in-up">
              {/* Score card */}
              <div
                className="rounded-2xl border border-[rgb(221,220,104)]/30 p-8 shadow-lg"
                style={{ background: "rgba(236,226,208,0.6)", backdropFilter: "blur(12px)" }}
              >
                <div className="text-center mb-8">
                  <p className="text-sm text-[rgb(59,52,31)]/50 uppercase tracking-widest font-medium mb-4">
                    GEMINI BASED ATS Compatibility Score
                  </p>
                  <div className="inline-flex items-end gap-2 mb-6">
                    <span className="text-6xl font-bold text-[rgb(59,52,31)]">{analysisresult.score}</span>
                    <span className="text-2xl text-[rgb(59,52,31)]/50 pb-2">/100</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[rgb(59,52,31)]/12 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[rgb(221,220,104)] to-[rgb(221,220,104)]/60 rounded-full transition-all duration-1000"
                      style={{ width: `${analysisresult.score}%` }}
                    />
                  </div>
                </div>
              </div>
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-[rgb(59,52,31)]">Strengths in your Resume</h3>
                <div className="space-y-3">
                  {analysisresult.strengths.map((tip, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-[rgb(221,220,104)]/30 bg-[rgb(221,220,104)]/8">
                      <div className="w-6 h-6 rounded-full bg-[rgb(221,220,104)]/40 flex items-center justify-center text-[rgb(59,52,31)] font-semibold text-sm shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm text-[rgb(59,52,31)]/70 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Improvements section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[rgb(59,52,31)]">Suggested improvements</h3>
                <div className="space-y-3">
                  {analysisresult.improvements.map((tip, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-[rgb(221,220,104)]/30 bg-[rgb(221,220,104)]/8">
                      <div className="w-6 h-6 rounded-full bg-[rgb(221,220,104)]/40 flex items-center justify-center text-[rgb(59,52,31)] font-semibold text-sm shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm text-[rgb(59,52,31)]/70 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full cursor-pointer text-sm font-medium text-[rgb(59,52,31)]/60 hover:text-[rgb(59,52,31)] py-3 rounded-xl border border-[rgb(59,52,31)]/15 hover:bg-[rgb(59,52,31)]/5 transition-all"
              >
                Analyze Another Resume
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none" style={{
        background: "linear-gradient(to top, rgba(236,226,208,0.4), transparent)",
      }} />
    </div>
  )
}
