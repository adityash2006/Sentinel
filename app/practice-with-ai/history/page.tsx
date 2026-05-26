"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {ArrowLeft } from 'lucide-react';

interface SessionHistory {
  id: string;
  jobDescription: string;
  overallScore: number | null;
  createdAt: string;
}

export default function InterviewHistory() {
  const [sessions, setSessions] = useState<SessionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'}/api/interview/history`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch history');
        const data = await response.json();
        setSessions(data);
      } catch (err) {
        toast({ title: 'Error', description: 'Could not load history.', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-[rgb(59,52,31)]/20 border-t-[rgb(221,220,104)] rounded-full animate-spin"></div>
          <p className="text-[rgb(59,52,31)] font-medium">Loading histoy</p>
        </div>
      </div>
    );

  return (
    <div className="container max-w-5xl py-12 mx-auto space-y-8">
      <div className='mb-10'>
        <div className='w-13'>
        <Link href="/practice-with-ai" className="">
              <ArrowLeft/>
            </Link>
            </div>

      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Interview History</h1>
          <p className="text-muted-foreground mt-2">Review your past AI interview practices and feedback.</p>
        </div>
        <Link href="/practice-with-ai">
          <Button className='cursor-pointer'>Start New Interview</Button>
        </Link>
      </div>

      {sessions.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="text-muted-foreground">You haven't practiced any interviews yet.</div>
            <Link href="/practice-with-ai">
              <Button variant="outline">Practice Now</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <Card key={session.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={session.overallScore && session.overallScore >= 7 ? "default" : "secondary"}>
                    {session.overallScore ? `${session.overallScore.toFixed(1)}/10` : 'Incomplete'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(session.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <CardTitle className="text-lg line-clamp-1">
                  Target Job
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {session.jobDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4">
                <Link href={`/practice-with-ai/report/${session.id}`} className="w-full">
                  <Button variant="outline" className="w-full cursor-pointer">View Full Report</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}