"use client";

import { useEffect, useState, use } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Answer {
  score: number;
  feedback: string;
  transcript: string;
  fillerWordCount: number;
  strengths: string;
  improvements: string;
}

interface Question {
  question: string;
  category: string;
  answer?: Answer;
}

interface SessionReport {
  overallScore: number;
  questions: Question[];
}

export default function ReportDashboard({ params }: { params: Promise<{ sessionId: string }> }) {
  const unwrappedParams = use(params);
  const [report, setReport] = useState<SessionReport | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/interview/${unwrappedParams.sessionId}/report`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch report');
        const data = await response.json();
        setReport(data);
      } catch (err) {
        toast({ title: 'Error', description: 'Could not load report.', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [unwrappedParams.sessionId]);

  if (loading) return <div className="text-center mt-20">Generating your report...</div>;
  if (!report) return <div className="text-center mt-20">Report not found.</div>;

  const totalFillerWords = report.questions.reduce((acc, q) => acc + (q.answer?.fillerWordCount || 0), 0);

  return (
    <div className="container max-w-5xl py-12 mx-auto space-y-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Interview Performance Report</h1>
        <div className="flex gap-4">
          <Card className="w-48">
            <CardContent className="pt-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">{report.overallScore?.toFixed(1) || 'N/A'}/10</div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </CardContent>
          </Card>
          <Card className="w-48">
            <CardContent className="pt-6">
              <div className="text-5xl font-bold text-amber-500 mb-2">{totalFillerWords}</div>
              <p className="text-sm text-muted-foreground">Total Filler Words</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold">Question Details</h2>
        <Accordion type="single" collapsible className="w-full">
          {report.questions.map((q, idx) => (
            <AccordionItem value={`item-${idx}`} key={idx}>
              <AccordionTrigger className="text-left">
                <div className="flex justify-between items-center w-full pr-4">
                  <span className="font-medium mr-4">Q{idx + 1}: {q.question}</span>
                  {q.answer ? (
                    <Badge variant={q.answer.score >= 7 ? "default" : "secondary"}>
                      {q.answer.score}/10
                    </Badge>
                  ) : (
                    <Badge variant="outline">Skipped</Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-b-lg border-t space-y-4">
                {q.answer ? (
                  <>
                    <div>
                      <h4 className="font-semibold mb-1">Your Transcript:</h4>
                      <p className="text-sm text-muted-foreground italic border-l-2 pl-4 border-slate-300">
                        "{q.answer.transcript}"
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-1">Strengths:</h4>
                        <p className="text-sm">{q.answer.strengths}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-700 mb-1">Areas for Improvement:</h4>
                        <p className="text-sm">{q.answer.improvements}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Detailed Feedback:</h4>
                      <p className="text-sm">{q.answer.feedback}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Filler words detected: {q.answer.fillerWordCount}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">No answer was provided for this question.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}