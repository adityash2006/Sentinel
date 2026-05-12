"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AudioRecorder } from '@/components/AudioRecorder';
import { useToast } from '@/hooks/use-toast';
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  question: string;
  category: string;
  answer?: any;
}

interface Session {
  id: string;
  questions: Question[];
}

export default function InterviewSession({ params }: { params: Promise<{ sessionId: string }> }) {
  const unwrappedParams = use(params);
  const [session, setSession] = useState<Session | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/interview/${unwrappedParams.sessionId}/questions`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch session');
        const data = await response.json();
        setSession(data);
      } catch (err) {
        toast({ title: 'Error', description: 'Could not load interview session.', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [unwrappedParams.sessionId]);

  const handleAudioSubmit = async (audioBlob: Blob) => {
    if (!session) return;
    const currentQuestion = session.questions[currentQuestionIndex];
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'answer.webm');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/interview/${currentQuestion.id}/answer`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to submit answer');

      toast({ title: 'Success', description: 'Answer recorded and evaluated!' });
      
      if (currentQuestionIndex < session.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        router.push(`/practice-with-ai/report/${session.id}`);
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to evaluate answer. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (session && currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (session) {
      router.push(`/practice-with-ai/report/${session.id}`);
    }
  }

  if (loading) return <div className="text-center mt-20">Loading interview...</div>;
  if (!session || !session.questions.length) return <div className="text-center mt-20">No session found.</div>;

  const currentQuestion = session.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / session.questions.length) * 100;

  return (
    <div className="container max-w-3xl py-12 mx-auto space-y-8">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestionIndex + 1} of {session.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <Card className="min-h-[400px] flex flex-col">
        <CardHeader className="flex-1 justify-center space-y-6">
          <div className="text-sm font-medium text-blue-500 uppercase tracking-wider text-center">
            {currentQuestion.category || "General"}
          </div>
          <CardTitle className="text-2xl md:text-3xl text-center leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AudioRecorder 
            onRecordingComplete={handleAudioSubmit} 
            disabled={isSubmitting} 
          />
          {isSubmitting && (
            <div className="text-center text-sm text-muted-foreground animate-pulse">
              Analyzing your answer with AI...
            </div>
          )}
          <div className="flex justify-between pt-4">
            <Button variant="ghost" onClick={handleSkip} disabled={isSubmitting}>
              Skip Question
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}