"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export default function PracticeWithAI() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleStart = async () => {
    if (!resumeText || !jobDescription) {
      
      toast({
        title: "Missing Information",
        description: "Please provide both resume text and job description.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'}/api/interview/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ resumeText, jobDescription })
      });

      if (!response.ok) {
        throw new Error('Failed to create interview session');
      }

      const data = await response.json();
      router.push(`/practice-with-ai/session/${data.id}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to start session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-8 mx-auto">
      <div className="flex justify-between mb-4">
        <Link href="/dashboard" className="">
              <ArrowLeft/>
            </Link>
        <Link href="/practice-with-ai/history">
          <Button className='cursor-pointer' variant="outline">View Previous Interviews</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">AI Interview Practice</CardTitle>
          <CardDescription>
            Paste your resume and the job description to generate targeted interview questions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="resume">Resume Text</Label>
            <Textarea 
              id="resume" 
              placeholder="Paste your resume here..." 
              className="min-h-[150px]"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jd">Job Description</Label>
            <Textarea 
              id="jd" 
              placeholder="Paste the job description here..." 
              className="min-h-[150px]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleStart} className="cursor-pointer" disabled={loading}>
            {loading ? "Generating Questions..." : "Start Interview Practice"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}